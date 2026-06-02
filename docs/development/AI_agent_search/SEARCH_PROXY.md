# Архитектура Proxy для поиска знаний

> См. также: [ETL_FLOW.md](./ETL_FLOW.md) — детальный ETL-пайплайн,
> [puml/](./puml/) — PlantUML диаграммы архитектуры.

## Контекст

Текущая архитектура: Vite (3001) → Express (3054) → SQLite. Нужен слой оркестрации, который:
1. Принимает поисковый запрос из Admin UI
2. Параллельно шлёт запросы в N поисковых引擎 + LLM
3. Агрегирует, дедуплицирует, обогащает, сохраняет результат

---

## Предлагаемая архитектура

```
┌────────────────────────────────────────────────────────────────────┐
│                     Knowledge Search Proxy                         │
│                                                                    │
│  ┌────────────────────┐    ┌────────────────────────────┐          │
│  │   Search Runner    │──> │    Orchestrator (core)     │          │
│  │   (node-cron)      │    │  - dispatches requests     │          │
│  │   + manual trigger │    │  - collects results        │          │
│  └────────────────────┘    │  - dedup + merge           │          │
│                            │  - enrich with LLM         │          │
│                            │  - save to DB              │          │
│                            └───────────┬────────────────┘          │
│                                        │                           │
│                ┌───────────────────────┼──────────────────┐        │
│                ▼                       ▼                  ▼        │
│        ┌─────────────────┐    ┌────────────────────┐  ┌──────────┐ │
│        │ Search APIs     │    │   LLM Models       │  │  Cache   │ │
│        │                 │    │                    │  │  (LRU)   │ │
│        │ • PubMed        │    │ • BigPickle        │  └──────────┘ │
│        │ • Google        │    │ • HuggingFace      │               │
│        │   Scholar       │    │   (Serverless)     │               │
│        │ • Cochrane      │    │ • GigaChat         │               │
│        │ • ClinicalTrials│    │ • OpenAI (fallback)│               │
│        │ • WHO           │    └────────────────────┘               │
│        │ • FDA           │                                         │
│        └─────────────────┘                                         │
└────────────────────────────────────────────────────────────────────┘
```

## Компоненты

### 1. Search Runner (`tools/search_runner.js`)
- Читает активные запросы из `search_queries`
- По cron или вручную запускает сессию поиска
- Передаёт в Orchestrator

### 2. Orchestrator (`tools/orchestrator.js`)
- Получает: `{ query, domain, sources, llm_prompt, search_format }`
- Параллельный запуск всех указанных search engines + LLM
- Этапы:
  1. **Search** — параллельные запросы ко всем search engines
  2. **Dedup** — по PMID/DOI/URL/title
  3. **LLM Enrich** — каждый найденный артикул → LLM: релевантность, evidence level, domain match
  4. **Save** — batch insert в `articles` + `article_sources`
- Обновляет статус сессии на каждом этапе

### 3. Search Connectors (`tools/connectors/`)
Каждый connector — единый интерфейс:

```js
// interface Connector
async function search({ query, domain, maxResults }) → Article[]
// Article = { title, authors, journal, year, doi, pmid, url, abstract, source }
```

#### PubMed (E-utilities)
- `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=...&retmax=20&retmode=json`
- `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=...&retmode=xml`
- Бесплатно, rate limit ~10 req/s, API key не обязателен

#### Google Scholar (через SerpAPI/Scraper)
- Официального API нет. Варианты:
  - **SerpAPI** (платный, $50/мес на 5000 запросов)
  - **Scraper** (бесплатно, но хрупко)
  - **CrossRef API** (бесплатно, 50 req/s) — хорошо для DOI
- Рекомендация: пока CrossRef как fallback

#### Cochrane
- `https://www.cochranelibrary.com/api/...`
- Бесплатно

#### ClinicalTrials.gov
- `https://clinicaltrials.gov/api/query/field_values?expr=...`
- Бесплатно, без лимитов

#### WHO
- `https://www.who.int/api/...` — нестабильно
- Альтернатива: PubMed + filter `(jsubsetaim[ALL])` для MEDLINE

#### FDA
- `https://api.fda.gov/drug/event.json?search=...`
- Бесплатно, rate limit ~240 req/min

### 4. LLM Model Adapter (`tools/models/`)
Единый интерфейс:

```js
async function analyze({ articles, llm_prompt, search_format }) → EnrichedArticle[]
// EnrichedArticle = Article + { relevance, evidence_level, domain_match, llm_summary }
```

#### Приоритет (бесплатные → fallback)

| Модель | Тип | Доступ | Лимиты | Заметки |
|--------|-----|--------|--------|---------|
| **BigPickle** 🥇 | LLM | big-pickle | unknown | Рекомендуется как primary |
| **Hugging Face Serverless** | Inference API | `huggingface.co/api` | 30K tokens/мес бесплатно | Meta-Llama, Mixtral, Qwen2 |
| **GigaChat** | LLM | уже интегрирован | 100 req/день бесплатно | Работает, но РФ-ориентирован |
| **OpenAI** | LLM | платный | $0.0015/1K токенов | fallback, gpt-4o-mini |

**HuggingFace Serverless** — лучший бесплатный вариант:

```
POST https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct
Headers: Authorization: Bearer hf_xxxxxxxxxx
Body: { inputs: "...", parameters: { max_new_tokens: 500 } }
```

Рекомендуемые модели HF для анализа мед. текстов:

| Модель | Размер | Особенность |
|--------|--------|-------------|
| `meta-llama/Meta-Llama-3-8B-Instruct` | 8B | Лучшая для инструкций |
| `mistralai/Mixtral-8x7B-Instruct-v0.1` | 46B (MoE) | Высокое качество |
| `Qwen/Qwen2-7B-Instruct` | 7B | Хороша для русского |
| `microsoft/Phi-3-mini-4k-instruct` | 3.8B | Лёгкая, быстрая |
| `teknium/OpenHermes-2.5-Mistral-7B` | 7B | Fine-tuned на инструкции |

### 5. Кэш (LRU)
- In-memory LRU cache (200 entry, TTL 1 час)
- Ключ: `{source}:{query_md5}`
- Избегает повторных запросов к search engines

---

## Поток выполнения

```
User clicks ▶ (run query)
        │
        ▼
POST /api/knowledge-admin/sessions
  → creates session with status='in_progress'
  → returns session_id
        │
        ▼
Admin UI опрашивает GET /sessions/:id
  (polling каждые 3 секунды)
        │
        ▼
Search Runner (отдельный процесс или in-process thread):
  1. SELECT from search_queries WHERE is_active=1
  2. Для каждого:
     a. Получает sources из поля source (split by comma)
     b. Параллельно вызывает все Connectors
     c. Дедуплицирует (по pmid → doi → title)
     d. Обновляет session.articles_found, .articles_after_dedup
     e. Параллельно вызывает LLM для каждого артикула
     f. LLM возвращает: релевантно/нет, evidence_level
     g. Обновляет session.articles_queued
     h. Сохраняет релевантные в articles (INSERT OR IGNORE)
     i. Создаёт changelog записи
     j. Обновляет session.articles_approved, status='completed'
```

---

## Файловая структура

```
api/
  knowledgeAdmin.js       ← маршруты (без изменений)
  knowledgeDb.js          ← запросы к БД (без изменений)
tools/
  search_runner.js        ← основная логика, cron
  orchestrator.js          ← координация коннекторов + LLM
  connectors/
    pubmed.js              ← PubMed E-utilities
    googleScholar.js       ← SerpAPI или CrossRef
    cochrane.js            ← Cochrane Library
    clinicalTrials.js      ← ClinicalTrials.gov
    who.js                 ← WHO API (если работает)
    fda.js                 ← openFDA
  models/
    adapter.js             ← единый интерфейс для всех LLM
    bigPickle.js           ← BigPickle connector
    huggingface.js         ← HuggingFace Serverless
    gigachat.js            ← уже есть (реиспользовать)
    openai.js              ← уже есть (реиспользовать)
  cache.js                 ← LRU cache
```

---

## Конфигурация (.env)

```env
# ── LLM Models Priority ──
LLM_PRIORITY=bigPickle,huggingface,gigachat,openai

# ── BigPickle (Ollama local) ──
OLLAMA_URL=http://localhost:11434
BIGPICKLE_MODEL=big-pickle

# ── HuggingFace Serverless ──
HF_API_TOKEN=hf_xxxxxxxxxx
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct
# Multi-key: добавить строки в БД (таблица api_keys), не в .env

# ── GigaChat ──
GIGACHAT_CREDENTIALS=base64_encoded_credentials

# ── OpenAI ──
OPENAI_API_KEY=sk-...
# Multi-key: добавить строки в БД (таблица api_keys)

# ── Search Connectors ──
PUBMED_API_KEY=              # опционально (повышает лимит до 10 req/s)
SERPAPI_KEY=                 # опционально (Google Scholar, платный)
CROSSREF_EMAIL=user@host.com # обязателен для CrossRef (повышает лимит)
```

---

## Почему BigPickle + HuggingFace

1. **BigPickle** — если доступен локально (Ollama), то 0 cost, 0 latency, полный контроль данных
2. **HuggingFace Serverless** — 30K токенов/мес бесплатно, Llama-3/Mixtral качественно анализируют мед.тексты
3. **GigaChat** — уже интегрирован, ~100 req/день бесплатно
4. **OpenAI** — только fallback, gpt-4o-mini ($0.15/1M input tokens)

Рекомендация: начать с HuggingFace (Meta-Llama-3-8B-Instruct) как primary, BigPickle как secondary, GigaChat/OpenAI как fallback.

---

## Решение

### Что строим

**Knowledge Search Proxy** — Node.js-модуль, который работает как in-process служба внутри Express-сервера (не отдельный микросервис). Запускается:
1. **По расписанию** — `node-cron` читает `search_queries` с `cron_expr` и `is_active=1`
2. **Вручную** — POST `/sessions` создаёт сессию, `search_runner` немедленно её обрабатывает

### Принцип работы

```
search_runner.js (cron или ручной вызов)
  │
  ├─► orchestrator.js
  │     ├─► connectors/pubmed.js       │
  │     ├─► connectors/cochrane.js     │— параллельно
  │     ├─► connectors/clinicalTrials.js│
  │     └─► connectors/crossref.js     │
  │
  ├─► dedup (Set по pmid → doi → title hash)
  │
  ├─► models/adapter.js → huggingface.js
  │     └─ для каждого артикула: релевантность, evidence_level, domain
  │
  └─► knowledgeDb.js → INSERT в articles + article_sources
```

### Ключевые решения

| Решение | Выбор | Обоснование |
|---------|-------|-------------|
| Запуск | In-process (не отдельный микросервис) | Меньше complexity, общая БД, единый процесс |
| Очередь | Не нужна | Поиск запускается не чаще 1/час, последовательная обработка |
| LLM primary | HuggingFace Serverless | Бесплатно, 30K токенов/мес, лучшие open-source модели |
| LLM fallback 1 | GigaChat | Уже интегрирован, 100 req/день |
| LLM fallback 2 | OpenAI gpt-4o-mini | $0.15/1M input, только при недоступности HF/GigaChat |
| PubMed | E-utilities (esearch + efetch) | Бесплатно, стабильно, 10 req/s |
| Google Scholar | CrossRef API | Бесплатно, 50 req/s, хорош для DOI |
| Кэш | LRU in-memory (200 entry, 1h TTL) | PubMed результаты стабильны, нет смысла повторять |
| Статус | Polling (клиент опрашивает сессию каждые 3 сек) | Проще websocket'ов для admin UI |

### HuggingFace Serverless — как подключаем

```js
// tools/models/huggingface.js
const HF_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct';

async function analyze({ articles, llm_prompt, search_format }) {
  const results = await Promise.all(articles.map(async (article) => {
    const prompt = `${llm_prompt || 'Оцени релевантность статьи для health/longevity тематики.'}

Статья: ${article.title}
Аннотация: ${article.abstract}

Формат ответа (JSON):
${search_format || '{ "relevance": 0-100, "evidence_level": "A/B/C/D", "domain": "...", "summary": "..." }'}`;

    const res = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 500, temperature: 0.1 },
        }),
      }
    );

    if (!res.ok) throw new Error(`HF API error: ${res.status}`);
    const data = await res.json();
    return { ...article, llm_output: data[0]?.generated_text || '' };
  }));
  return results;
}
```

**Важно:** HuggingFace Serverless имеет очередь — если модель не кэширована, первый запрос может ждать 10-30 сек. Последующие — быстрые (100-300 мс). Для batch из 20 артикулов это приемлемо.

### Как search_runner обновляет сессию (real-time статус)

Сессия в БД обновляется на каждом этапе. Admin UI отслеживает через **polling**:

```js
// Клиент (KnowledgeAdmin.jsx)
useEffect(() => {
  if (!sessionId || session.status === 'completed') return;
  const t = setInterval(async () => {
    const s = await fetchJson(`${API}/sessions/${sessionId}`);
    setSession(s);
  }, 3000);
  return () => clearInterval(t);
}, [sessionId, session.status]);
```

Это даёт PipelineTracker'у динамические обновления:
- 🔍 **Поиск** → `articles_found > 0`
- 🤖 **LLM** → `articles_after_dedup > 0`
- 👤 **Review** → `articles_queued > 0` (ждут HITL)
- 💾 **БЗ** → `articles_approved > 0` (сохранено)

---

## Бэклог (обновлён 2026-06-02)

### Phase 1 — Core ETL (3-4 дня)

| # | Задача | Файл | Описание |
|---|--------|------|----------|
| 1.1 | Создать `registry.json` | `tools/connectors/registry.json` | Конфигурация всех источников: baseUrl, rateLimit, retry, timeout |
| 1.2 | Создать PubMed connector | `tools/connectors/pubmed.js` | E-utilities: esearch + efetch, парсинг XML в Article[] |
| 1.3 | Создать CrossRef connector | `tools/connectors/crossref.js` | REST API: поиск по DOI/title, бесплатно 50 req/s |
| 1.4 | Создать ClinicalTrials connector | `tools/connectors/clinicalTrials.js` | REST API: field_values + study, бесплатно |
| 1.5 | Создать RateLimiter | `tools/connectors/lib/RateLimiter.js` | Token bucket: PubMed 10/s, FDA 240/m, CrossRef 50/s |
| 1.6 | Создать Normalizer | `tools/connectors/lib/Normalizer.js` | Приведение полей от разных источников к Article[] |
| 1.7 | Создать DedupEngine | `tools/connectors/lib/DedupEngine.js` | Fingerprint (PMID→DOI→URL→title fuzzy), индекс в памяти |
| 1.8 | Создать TempManager | `tools/connectors/lib/TempManager.js` | Управление `/tmp/search_sessions/{id}/raw/ normalized/ dedup/ enriched/` |
| 1.9 | Создать ETLPipeline | `tools/connectors/lib/ETLPipeline.js` | 4 стадии: normalize → dedup → enrich(LRU) → save(DB) |
| 1.10 | Создать Orchestrator | `tools/orchestrator.js` | Параллельный запуск connectors → ETLPipeline |
| 1.11 | Создать Search Runner | `tools/search_runner.js` | Чтение active queries, запуск по session_id (cron + manual) |
| 1.12 | Добавить `fingerprint` колонку в articles | `api/knowledgeDb.js` | `ALTER TABLE articles ADD COLUMN fingerprint TEXT UNIQUE` |

### Phase 2 — Connectors Expansion (2-3 дня)

| # | Задача | Файл | Описание |
|---|--------|------|----------|
| 2.1 | Cochrane connector | `tools/connectors/cochrane.js` | Cochrane Library REST API |
| 2.2 | WHO connector | `tools/connectors/who.js` | WHO API (если работает) или PubMed-filter |
| 2.3 | FDA connector | `tools/connectors/fda.js` | openFDA drug/event endpoint |
| 2.4 | Google Scholar (CrossRef upgrade) | `tools/connectors/googleScholar.js` | SerpAPI (платный) или семантический поиск |
| 2.5 | Configs для каждого connector | `tools/connectors/configs/*.json` | Endpoint paths, headers, response mapping |

### Phase 3 — LLM Enrichment (2 дня)

| # | Задача | Файл | Описание |
|---|--------|------|----------|
| 3.1 | BigPickle adapter ✅ | `tools/models/bigPickle.js` | Ollama, модель llama3.2:3b (0.6s/article, 60% accuracy) |
| 3.2 | Model router ✅ | `tools/models/adapter.js` | Приоритет: BigPickle → GigaChat → OpenAI → HuggingFace |
| 3.3 | GigaChat adapter | `tools/models/gigachat.js` | Обёртка над `api/gigachat.js`, лимит 100 req/день |
| 3.4 | OpenAI adapter | `tools/models/openai.js` | gpt-4o-mini для evidence level + summary (финальный этап) |
| 3.5 | Промпт-инжиниринг | `tools/models/prompts.js` | Шаблоны: relevance+domain (8B), evidence+summary (API) |
| 3.6 | Batch LLM (pack 5-10 articles) | `tools/models/adapter.js` | Группировка для экономии токенов API |

### Phase 4 — Admin UI Improvements (1 день)

| # | Задача | Файл | Описание |
|---|--------|------|----------|
| 4.1 | Polling в PipelineTracker | `KnowledgeAdmin.jsx` | Автообновление статуса сессии каждые 3 сек |
| 4.2 | Error display в PipelineTracker | `KnowledgeAdmin.jsx` | Показывать `error_message` из сессии при failed |
| 4.3 | Просмотр temp-директории из UI | `KnowledgeAdmin.jsx` | Кнопка "Логи" — показать содержимое raw/normalized/dedup |
| 4.4 | Re-run failed sessions | `KnowledgeAdmin.jsx` | Кнопка "Повторить" для сессий со статусом error |

### Phase 5 — Production Hardening (1 день)

| # | Задача | Описание |
|---|--------|----------|
| 5.1 | Graceful shutdown | Завершение текущих поисков при остановке сервера |
| 5.2 | Logging (winston/pino) | Все запросы к external APIs, ошибки, duration |
| 5.3 | Periodic cleanup temp | Удаление сессий старше 24ч из `/tmp/search_sessions/` |

### Итого: 9-11 дней

| Phase | Дней | Статус |
|-------|------|--------|
| 1 — Core ETL | 3-4 | 🎯 Следующий |
| 2 — Connectors Expansion | 2-3 | После Phase 1 |
| 3 — LLM Enhancement | 2 | После Phase 1 (BigPickle ✅, router ✅) |
| 4 — Admin UI | 1 | После Phase 1 |
| 5 — Production | 1 | После Phase 1-4 |
| **Итого** | **9-11** | |

---

## Модели LLM — результаты тестирования (2026-06-02)

### Сравнение локальных моделей

Тест на 15 эталонных статьях (domain classification + evidence level):

| Модель | Domain | Evidence | Время/ст | Размер | Вердикт |
|--------|--------|----------|----------|--------|---------|
| **llama3.2:3b** | **60%** | **60%** | **0.6s** | 2.0 GB | ✅ Primary для relevance+domain |
| deepseek-r1:8b | 27% | ~60%* | 21s | 5.2 GB | ❌ Слишком медленный, CoT не соблюдает формат |
| qwen3:8b-q8_0 | — | — | — | 8.9 GB | ❌ Сломан (пустой ответ от Ollama) |
| gemma3:4b | — | — | — | 3.3 GB | Не тестировалась |
| qwen3:4b | — | — | — | 2.5 GB | Не тестировалась |

\* deepseek-r1: evidence level ~60% из-за fallback-значений (парсер не мог распарсить CoT-ответ)

### Итоговая стратегия

```
Пайплайн:
  1. Search connectors (PubMed, CrossRef...) — бесплатно
  2. Relevance + Domain → llama3.2:3b (0.6s/статья, 0 cost) ← 8B достаточно
  3. Evidence Level + Summary → gpt-4o-mini / GigaChat (API)
  4. Если API недоступен → llama3.2:3b (fallback, меньшая точность)
```

HuggingFace Inference API (`api-inference.huggingface.co`) заблокирован на уровне DNS (Beget) и CloudFront WAF. Оставлен в adapter для работы через VPN/Proxy.

### Настройка

`.env`:
```
BIGPICKLE_MODEL=llama3.2:3b
```

`tools/models/bigPickle.js` auto-resolve: если указанная модель не найдена → первый доступный из `ollama list`.

## BigPickle — локальный флоу (dev → test → deploy)

### 1. Установка Ollama локально

```bash
# Windows (PowerShell)
winget install Ollama.Ollama

# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Загрузка модели BigPickle

```bash
# Скачать модель (если есть в registry)
ollama pull big-pickle

# Или создать Modelfile, если модель кастомная
echo 'FROM /path/to/big-pickle.gguf
TEMPLATE """{{ .Prompt }}
"""
PARAMETER temperature 0.1
PARAMETER num_ctx 4096' > Modelfile

ollama create big-pickle -f Modelfile
```

### 3. Локальный тест

```bash
# Прямой запрос
curl http://localhost:11434/api/generate -d '{
  "model": "big-pickle",
  "prompt": "Оцени релевантность статьи про влияние омега-3 на когнитивные функции. Ответь JSON: {\"relevance\": 0-100}",
  "stream": false
}'

# Через Node.js
node -e "
const res = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'big-pickle',
    prompt: 'test prompt',
    stream: false,
    options: { temperature: 0.1 }
  })
});
console.log(await res.json());
"
```

### 4. Адаптер для BigPickle

```js
// tools/models/bigPickle.js
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.BIGPICKLE_MODEL || 'big-pickle';

async function analyze({ articles, llm_prompt, search_format }) {
  const results = [];
  for (const article of articles) {
    const prompt = `${llm_prompt || 'Оцени релевантность статьи для health/longevity.'}

Статья: ${article.title}
Аннотация: ${article.abstract}

Формат ответа (строгий JSON, без лишнего текста):
${search_format || '{"relevance":0-100,"evidence_level":"A|B|C|D","domain":"...","summary":"..."}'}`;

    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
        options: { temperature: 0.1, num_predict: 500 },
      }),
    });

    if (!res.ok) throw new Error(`BigPickle error: ${res.status}`);
    const data = await res.json();
    let parsed;
    try {
      // Ollama иногда оборачивает JSON в markdown-код
      const cleaned = data.response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { relevance: 50, evidence_level: 'C', domain: 'general', summary: data.response.slice(0, 200) };
    }
    results.push({ ...article, ...parsed });
  }
  return results;
}
```

### 5. Тестирование качества

Скрипт для замера точности BigPickle против эталонных оценок:

```js
// tools/models/test_bigpickle.js
const TEST_SET = [
  { title: 'Omega-3 fatty acids and cognitive function', expected_domain: 'nutrition', expected_ev: 'A' },
  { title: 'Exercise timing and circadian rhythm', expected_domain: 'habits', expected_ev: 'B' },
  // ... 20-30 тестовых артикулов из已有的 базы
];

async function run() {
  const results = await analyze({ articles: TEST_SET });
  let score = 0;
  results.forEach((r, i) => {
    const domainOk = r.domain === TEST_SET[i].expected_domain;
    const evOk = r.evidence_level === TEST_SET[i].expected_ev;
    if (domainOk) score++;
    if (evOk) score++;
    console.log(`${domainOk ? '✓' : '✗'} ${r.title} → domain:${r.domain} ev:${r.evidence_level}`);
  });
  console.log(`Accuracy: ${score}/${TEST_SET.length * 2}`);
}
run();
```

### 6. Деплой на хостинг

```yaml
# docker-compose.yml (продакшен)
version: '3'
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: serve

  node-api:
    build: .
    ports:
      - "3054:3054"
    environment:
      - OLLAMA_URL=http://ollama:11434
      - BIGPICKLE_MODEL=big-pickle
    depends_on:
      - ollama

volumes:
  ollama_data:
```

**Без GPU (CPU only):**
```bash
# На хостинге без GPU — BigPickle работает на CPU, но медленнее
ollama serve
# ~5-10 токенов/сек на 8B модели vs 50-100 с GPU
# Для batch из 20 артикулов × 500 токенов = ~1000 сек на CPU
# Рекомендация: использовать GPU или HuggingFace Serverless как primary, BigPickle как secondary
```

### 7. Production VS Code

| Сценарий | BigPickle | HuggingFace |
|----------|-----------|-------------|
| Есть GPU на хостинге | primary (0 cost) | fallback |
| Нет GPU | fallback (CPU ~5 tok/s) | primary |
| Локальная разработка | primary (0 cost, 0 latency) | fallback |
| Тестирование качества | запустить `test_bigpickle.js` | — |

### 8. Pipeline выбора модели

```js
// tools/models/adapter.js
const MODELS = {
  bigPickle:   { adapters: ['./bigPickle'],   requires: 'ollama' },
  huggingface: { adapters: ['./huggingface'], requires: 'hf_token' },
  gigachat:    { adapters: ['./gigachat'],    requires: 'gigachat_creds' },
  openai:      { adapters: ['./openai'],      requires: 'openai_key' },
};

const PRIORITY = (process.env.LLM_PRIORITY || 'bigPickle,huggingface,gigachat,openai').split(',');

async function analyze(opts) {
  for (const name of PRIORITY) {
    const cfg = MODELS[name];
    if (!checkAvailable(name, cfg)) continue;
    try {
      const mod = require(cfg.adapters[0]);
      return await mod.analyze(opts);
    } catch (err) {
      console.warn(`[adapter] ${name} failed: ${err.message}, next...`);
    }
  }
  throw new Error('All LLM models unavailable');
}

function checkAvailable(name, cfg) {
  if (cfg.requires === 'ollama') {
    // Проверяем, отвечает ли Ollama
    return true; // health check реализовать отдельно
  }
  if (cfg.requires === 'hf_token') return !!process.env.HF_API_TOKEN;
  if (cfg.requires === 'gigachat_creds') return !!process.env.GIGACHAT_CREDENTIALS;
  if (cfg.requires === 'openai_key') return !!process.env.OPENAI_API_KEY;
  return false;
}
```

---

## Контроль токенов (биллинг, утилизация, мульти-ключи)

### Проблема

Платные API (OpenAI, SerpAPI, HuggingFace Pro) требуют контроля расходов. Бесплатные имеют лимиты, после которых возвращают 429/503. Нужна система, которая:
1. Считает токены/запросы по каждому провайдеру
2. Автоматически переключается между API-ключами при исчерпании лимита
3. Даёт visibility в Admin UI

### 1. Модель данных (таблица в SQLite)

```sql
CREATE TABLE api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,          -- 'openai', 'huggingface', 'serpapi', 'pubmed', 'gigachat'
  key_value TEXT NOT NULL,         -- сам API key
  label TEXT,                      -- понятное имя: 'OpenAI Prod', 'HF Dev'
  is_active INTEGER DEFAULT 1,     -- можно отключить без удаления
  priority INTEGER DEFAULT 0,      -- порядок перебора (0 = primary)
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE api_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,          -- 'openai', 'huggingface', etc.
  model TEXT,                      -- 'gpt-4o-mini', 'Meta-Llama-3-8B', etc.
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  requests INTEGER DEFAULT 1,
  cost NUMERIC DEFAULT 0,          -- в USD (с точностью до 6 знаков)
  billed_to TEXT,                  -- 'monthly_free', 'prepaid', 'postpaid'
  period_start TEXT,               -- начало учётного периода
  period_end TEXT,                 -- конец учётного периода
  created_at TEXT DEFAULT (datetime('now'))
);

-- Для быстрых агрегатов за период
CREATE INDEX idx_api_usage_period ON api_usage(provider, period_start, period_end);
```

### 2. Модуль троттлинга и ротации ключей

```js
// tools/apiKeyManager.js
const db = require('../api/knowledgeDb'); // использует ту же БД (или свою)

class ApiKeyManager {
  constructor() {
    this.keys = this.loadKeys();
    this.usage = new Map(); // provider → { tokens_in, tokens_out, requests }
  }

  loadKeys() {
    // Загружает все активные ключи из БД, сгруппированные по provider
    const rows = getDb().prepare(
      'SELECT * FROM api_keys WHERE is_active = 1 ORDER BY provider, priority'
    ).all();
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.provider]) grouped[row.provider] = [];
      grouped[row.provider].push(row);
    }
    return grouped;
  }

  // Получить следующий доступный ключ для провайдера
  getKey(provider) {
    const keys = this.keys[provider] || [];
    for (const key of keys) {
      if (!this.isExhausted(provider, key)) return key;
    }
    return null; // все ключи исчерпаны
  }

  // Проверить, не превышен ли лимит для ключа
  isExhausted(provider, key) {
    // HuggingFace: 30K tokens/месяц бесплатно
    if (provider === 'huggingface') {
      const usage = this.getUsage(provider, key.id, 'month');
      return usage.tokens_in + usage.tokens_out >= 30000;
    }
    // OpenAI: checks budget
    // SerpAPI: 5000 запросов/месяц
    return false;
  }

  // Учесть использованные токены
  track(provider, model, tokensIn, tokensOut, cost, keyId) {
    const period = this.getPeriodStart(); // начало текущего месяца
    getDb().prepare(`
      INSERT INTO api_usage (provider, model, tokens_in, tokens_out, requests, cost, period_start, period_end)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?)
    `).run(provider, model, tokensIn, tokensOut, cost, period, this.getPeriodEnd());
  }

  // Агрегированная статистика за период
  getStats(provider, period) {
    return getDb().prepare(`
      SELECT provider, model,
             SUM(tokens_in) as tokens_in,
             SUM(tokens_out) as tokens_out,
             SUM(requests) as requests,
             SUM(cost) as cost
      FROM api_usage
      WHERE provider = ? AND period_start >= ?
      GROUP BY provider, model
    `).all(provider, period);
  }

  // Полный дашборд утилизации
  getDashboard() {
    const period = this.getPeriodStart();
    return getDb().prepare(`
      SELECT provider,
             SUM(tokens_in) as tokens_in,
             SUM(tokens_out) as tokens_out,
             SUM(requests) as requests,
             SUM(cost) as cost
      FROM api_usage
      WHERE period_start >= ?
      GROUP BY provider
      ORDER BY cost DESC
    `).all(period);
  }
}
```

### 3. Интеграция с адаптерами

```js
// tools/models/huggingface.js — с контролем токенов
const keyManager = new ApiKeyManager();

async function analyze({ articles, ... }) {
  const key = keyManager.getKey('huggingface');
  if (!key) throw new Error('HuggingFace: all keys exhausted');

  const results = [];
  for (const article of articles) {
    // ... формируем prompt ...

    const start = Date.now();
    const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      headers: { 'Authorization': `Bearer ${key.key_value}` },
      // ...
    });
    const duration = Date.now() - start;

    // Примерная оценка токенов (1 token ≈ 4 символа для English)
    const tokensIn = Math.ceil(prompt.length / 4);
    const tokensOut = Math.ceil((await res.clone().text()).length / 4);

    // HuggingFace Serverless — бесплатно
    keyManager.track('huggingface', HF_MODEL, tokensIn, tokensOut, 0, key.id);

    results.push({ ...article, ...parsed });
  }
  return results;
}
```

### 4. API для управления ключами и статистикой

```js
// api/knowledgeAdmin.js — новые маршруты

// CRUD для API-ключей
router.get('/api-keys', (req, res) => {
  res.json(getDb().prepare('SELECT * FROM api_keys ORDER BY provider, priority').all());
});

router.post('/api-keys', (req, res) => {
  const { provider, key_value, label, priority } = req.body;
  const r = getDb().prepare(
    'INSERT INTO api_keys (provider, key_value, label, priority) VALUES (?, ?, ?, ?)'
  ).run(provider, key_value, label || null, priority || 0);
  res.json({ id: r.lastInsertRowid });
});

router.delete('/api-keys/:id', (req, res) => {
  getDb().prepare('DELETE FROM api_keys WHERE id = ?').run(Number(req.params.id));
  res.json({ status: 'ok' });
});

// Дашборд утилизации
router.get('/api-usage', (req, res) => {
  const period = req.query.period || 'month';
  const provider = req.query.provider || null;
  const db = getDb(); // используем ту же БД

  let sql = `
    SELECT provider, model,
           SUM(tokens_in) as tokens_in,
           SUM(tokens_out) as tokens_out,
           SUM(requests) as requests,
           SUM(cost) as cost
    FROM api_usage
    WHERE period_start >= date('now', 'start of month')
  `;
  const params = [];
  if (provider) { sql += ' AND provider = ?'; params.push(provider); }
  sql += ' GROUP BY provider, model ORDER BY cost DESC';

  res.json({
    usage: db.prepare(sql).all(...params),
    period: 'current_month',
    total: db.prepare(`
      SELECT SUM(requests) as requests, SUM(cost) as cost,
             SUM(tokens_in) as tokens_in, SUM(tokens_out) as tokens_out
      FROM api_usage WHERE period_start >= date('now', 'start of month')
    `).get()
  });
});
```

### 5. Admin UI — вкладка "API Keys & Billing"

```
┌────────────────────────────────────────────────────────┐
│  API Keys & Billing                                    │
├────────────────────────────────────────────────────────┤
│  ┌─ Провайдер ───┬─ Ключ ───────────┬─ Статус ──┬─ ⟳ │
│  │ OpenAI        │ sk-...a1b2       │ Активен   │ ✕  │
│  │ HuggingFace   │ hf_...x9y8       │ Лимит 78% │ ✕  │
│  │ HuggingFace   │ hf_...z3w4       │ Активен   │ ✕  │
│  └───────────────┴──────────────────┴───────────┴─────┘
│  [+ Добавить ключ]                                     │
│                                                        │
│  ┌─ Утилизация за месяц ─────────────────────────────┐ │
│  │ Провайдер    │ Запросов │ Токенов in/out │ Стоимость│ │
│  │──────────────+──────────+────────────────+─────────│ │
│  │ OpenAI       │ 1,234    │ 89K / 12K      │ $0.15   │ │
│  │ HuggingFace  │ 456      │ 28K / 4K       │ $0.00   │ │
│  │ SerpAPI      │ 89       │ —              │ $1.78   │ │
│  │──────────────+──────────+────────────────+─────────│ │
│  │ Total        │ 1,779    │ 117K / 16K     │ $1.93   │ │
│  └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 6. Лимиты по умолчанию

| Провайдер | Бесплатный лимит | После лимита | Multi-key support |
|-----------|-----------------|--------------|-------------------|
| HuggingFace Serverless | 30K tokens/мес | 429 ошибка | Да — ротация ключей |
| HuggingFace Pro | $9/мес (включено) | $0.1/1M токенов | Да |
| OpenAI gpt-4o-mini | Нет бесплатного | $0.15/1M in, $0.60/1M out | Да |
| OpenAI gpt-4o | Нет бесплатного | $2.50/1M in, $10/1M out | Да |
| SerpAPI (Google Scholar) | Нет бесплатного | $50/мес = 5000 req | Да |
| GigaChat | 100 req/день | Платные пакеты | Нет (один credentials) |
| PubMed | 10 req/s без ключа | rate limit | Нет (один API key) |

### 7. Бэклог по токенам

| # | Задача | Оценка |
|---|--------|--------|
| T.1 | Создать таблицы `api_keys`, `api_usage` в БД | 2ч |
| T.2 | Реализовать `apiKeyManager.js` (getKey, track, ротация) | 4ч |
| T.3 | Интегрировать key tracking во все model adapters | 3ч |
| T.4 | Добавить CRUD `/api-keys` в API | 2ч |
| T.5 | Добавить `/api-usage` (статистика) | 1ч |
| T.6 | Admin UI вкладка "API Keys & Billing" | 4ч |
| T.7 | Alert при приближении к лимиту (80%, 95%, 100%) | 2ч |
| T.8 | Ежемесячный сброс счётчиков (cron 1-го числа) | 1ч |
| **Итого** | | **19ч (~2.5 дня)** |
