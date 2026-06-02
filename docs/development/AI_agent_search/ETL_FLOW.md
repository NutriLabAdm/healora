# ETL Flow — Search & Validation Pipeline

> Результаты обсуждения архитектуры ETL для модуля поиска и сбора информации.
> Дата: 2026-06-02

---

## 1. Конфигурация Connectors

**Решение:** Гибрид — БД `sources` + JSON-конфиги.

| Аспект | DB (sources table) | JSON-конфиги |
|--------|--------------------|--------------|
| **Что храним** | name, type, base_url, rate_limit, is_active, priority | endpoint paths, headers, query params, response mapping, retry policy |
| **Управление** | CRUD через Admin UI | Редактирование файлов (git-трекинг) |
| **Частота изменений** | Редко (подключение нового источника) | Часто (парсинг ответов, параметры запросов) |
| **Пример** | PubMed, type=search, base_url=eutils.ncbi.nlm.nih.gov | pubmed.json: esearch/efetch paths, XML→JSON mapping, date format |

**Структура:**

```
tools/
  connectors/
    registry.json          ← маппинг { source_name: { file, handler, config } }
    pubmed.js              ← handler
    crossref.js
    clinicalTrials.js
    ...
    configs/
      pubmed.json          ← endpoint paths, headers, rate limit, retry
      crossref.json
      ...
```

**registry.json** (пример):
```json
{
  "PubMed": {
    "handler": "pubmed.js",
    "config": "configs/pubmed.json",
    "type": "search",
    "baseUrl": "https://eutils.ncbi.nlm.nih.gov/entrez/eutils",
    "rateLimit": 10,
    "rateUnit": "sec",
    "retryCount": 2,
    "timeout": 15000
  },
  "CrossRef": {
    "handler": "crossref.js",
    "config": "configs/crossref.json",
    "type": "search",
    "baseUrl": "https://api.crossref.org/works",
    "rateLimit": 50,
    "rateUnit": "sec",
    "retryCount": 2,
    "timeout": 10000
  }
}
```

**DB `sources` table** — для Admin UI и статистики:
```sql
-- уже существует
sources (id, name, url, type, authority_score)
```

---

## 2. Rate Limiting

**Решение:** Общий rate limiter + индивидуальные лимиты из registry.json.

```
Orchestrator
  └── RateLimiter (общий, token bucket)
        ├── PubMed      — 10 req/s
        ├── CrossRef    — 50 req/s
        ├── ClinicalTrials — без лимита
        ├── Cochrane    — без лимита
        ├── WHO         — 10 req/s
        └── FDA         — 240 req/min
```

- Token bucket на каждый источник
- Очередь запросов если лимит исчерпан
- Начальное заполнение + replenish rate из registry

```
class RateLimiter {
  buckets: Map<source, { tokens, maxTokens, refillRate, refillInterval }>
  async acquire(source): Promise<void>  // ждёт пока появится токен
  release(source): void                 // возвращает токен
}
```

---

## 3. Error Handling & Fallback

**Решение:** Параллельный сбор в временную папку + ETL по успешным.

```
┌─────────────────────────────────────────────────────────┐
│  Session Run                                             │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ PubMed       │  │ CrossRef     │  │ ClinicalTrials│   │
│  │ ──► fetch() │  │ ──► fetch()  │  │ ──► fetch()  │   │
│  │    ↓ ok/err  │  │    ↓ ok/err  │  │    ↓ ok/err  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         ↓                  ↓                  ↓          │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Temp-директория сессии                    │    │
│  │  /tmp/search_sessions/{session_id}/               │    │
│  │    ├── raw/                                       │    │
│  │    │   ├── pubmed.json     ← сырые ответы         │    │
│  │    │   ├── crossref.json   ← сырые ответы         │    │
│  │    │   └── clinicaltrials.json                    │    │
│  │    ├── normalized/                                │    │
│  │    │   ├── pubmed.ndjson   ← приведённые Article[]│    │
│  │    │   ├── crossref.ndjson                        │    │
│  │    │   └── clinicaltrials.ndjson                  │    │
│  │    ├── dedup/                                     │    │
│  │    │   └── merged.ndjson   ← дедуплицированные    │    │
│  │    └── enriched/                                  │    │
│  │        └── final.ndjson    ← LLM-обогащённые      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ETL Script (запускается после таймаута или по готовности│
│  всех источников):                                       │
│    1. Читает raw/ → нормализует в normalized/            │
│    2. Сливает normalized/ → dedup/merged.ndjson          │
│    3. Передаёт на LLM-обогащение → enriched/final.ndjson │
│    4. Batch INSERT в БД                                  │
└─────────────────────────────────────────────────────────┘
```

**Правила:**
- Каждый connector работает независимо, параллельно
- Таймаут на каждый источник: 15-30 секунд (из registry)
- Если источник упал (timeout/network error) → логируем, продолжаем без него
- ETL запускается когда **все источники ответили** ИЛИ **прошёл maxWait** (30s)
- Partial results сохраняются всегда (3 из 5 ответили → обрабатываем 3)
- Retry policy: 2 попытки с exponential backoff (1s, 3s)

---

## 4. Dedup Strategy

**Решение:** Многоуровневая дедупликация с fingerprint.

**Приоритет идентификаторов:**
```
1. PMID (PubMed ID)
2. DOI (Digital Object Identifier)
3. URL (полный URL статьи)
4. Title (fuzzy match, Levenshtein distance < 3)
```

**Fingerprint** — хеш от первого доступного идентификатора:
```
fingerprint = SHA256( PMID || DOI || URL || normalize(title) )
```

**Хранение:**
- В `articles` таблице: добавить колонку `fingerprint TEXT UNIQUE`
- В `dedup/merged.ndjson`: fingerprint рядом с каждой записью
- В temp-директории: `dedup/fingerprints.json` — индекс уже известных fingerprint

**Алгоритм:**
```
1. Для каждого normalized-файла:
   - Вычислить fingerprint для каждой статьи
   - Если fingerprint есть в индексе → skip
   - Если нет → добавить в merged.ndjson + индекс
2. Для title fuzzy match:
   - Если fingerprint отсутствует (нет PMID/DOI/URL)
   - Сравнить normalize(title) со всеми title в merged.ndjson
   - Levenshtein < 3 → merge (добавить source к существующей)
```

---

## 5. Partial Results

**Решение:** Всегда сохранять частичные результаты.

```
Session status flow:
  pending → searching → collecting → normalizing →
  dedup → enriching → saving → completed

  Если таймаут сбора данных (30s):
    collecting → partial_collected → normalizing → ...
    (лог: "2/5 sources collected; 3 timed out")

  Если таймаут обогащения (LLM):
    enriching → partial_enriched → saving → completed
    (лог: "LLM enrich: 8/15 articles processed; 7 skipped")
```

**Temp-директория сессии** сохраняется 24 часа после завершения для:
- Повторного запуска ETL если что-то пошло не так
- Отладки (можно посмотреть сырые ответы)
- Возобновления после падения сервера

---

## 6. Хранение статей

**Текущая схема (оставить как есть):**
- `articles`: основная таблица, поле `source` — comma-joined список источников
- `article_sources`: связи многие-ко-многим (уже создана)

**Connector пишет:**
```sql
-- Основная статья
INSERT INTO articles (title, abstract, authors, journal, doi, pmid, domain, source, ...)

-- Связь с источником (для каждого найденного reference)
INSERT INTO article_sources (article_id, source_id, reference_text, source_url)
```

**article_sources** используется для:
- Статистики "по каким источникам найдена статья"
- Authority score агрегации
- Отслеживания provenance (откуда конкретно взята информация)

---

## 7. Итог: ETL Pipeline Flow

```
1. Admin создаёт search_query (через UI)
2. Search Runner получает сигнал (cron / manual)
3. Создаётся search_session (status=pending)
4. Создаётся temp-директория:
     /tmp/search_sessions/{session_id}/
5. Параллельный запуск всех выбранных connectors
   - Каждый connector → RateLimiter → fetch() → raw/{source}.json
   - Таймаут 30s на все источники
6. ETL Script:
   a. normalize:  raw/*.json → normalized/*.ndjson
                  (парсинг, приведение полей, ошибки формата)
   b. dedup:      normalized/*.ndjson → dedup/merged.ndjson
                  (fingerprint + fuzzy title)
   c. enrich:     dedup/merged.ndjson → enriched/final.ndjson
                  (LLM: relevance, domain, evidence_level, summary)
   d. save:       enriched/final.ndjson → SQLite
                  (batch INSERT + changelog + session update)
7. Session status → completed (или completed_with_errors)
8. Temp-директория доступна 24ч для отладки
9. Admin UI обновляется (PipelineTracker → ✅)
```

---

## 8. Структура директорий

```
tools/
  connectors/
    registry.json              ← конфигурация всех connectors
    pubmed.js                  ← PubMed handler
    crossref.js                ← CrossRef handler
    clinicalTrials.js          ← ClinicalTrials.gov handler
    cochrane.js                ← Cochrane handler
    who.js                     ← WHO handler
    fda.js                     ← FDA handler
    configs/
      pubmed.json              ← PubMed endpoint params
      crossref.json            ← CrossRef endpoint params
      clinicalTrials.json
      cochrane.json
      who.json
      fda.json
    lib/
      RateLimiter.js           ← token bucket rate limiter
      DedupEngine.js           ← fingerprint + fuzzy match
      Normalizer.js            ← приведение полей к Article
      ETLPipeline.js           ← orchestrator ETL stages
      TempManager.js           ← управление временными файлами
  models/
    adapter.js                 ← LLM router (bigPickle → GigaChat → OpenAI)
    bigPickle.js               ← Ollama adapter (llama3.2:3b)
  orchestrator.js              ← главный оркестратор (точка входа)
  search_runner.js             ← cron/event триггер
  cache.js                     ← LRU cache (Phase 2)
```
