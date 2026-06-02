# Модели непрерывного поиска и валидации знаний

> **Дата:** 01.06.2026
> **Цель:** Исследовать архитектуры и инструменты (MCP, open-source AI-агенты) для непрерывного сбора, структурирования и валидации медицинских/научных знаний о здоровом образе жизни, ожирении и долголетии.

---

## 1. Предпосылки

**Текущее состояние Healora:**
- 23 домена знаний в `docs/domain/knowledge/` — статические markdown + JSON
- RAG-пайплайн спроектирован, но не реализован
- System prompt собирается вручную (`buildSystemPrompt()` в `server.js:305`)
- Нет подключения к внешним источникам (PubMed, WHO, Минздрав)
- Бэклог: ES.1 (PubMed connector, 8ч), ES.2 (guidelines parser, 6ч), ES.3 (LLM extraction, 8ч), ES.4 (expert validation, 4ч)
- Knowledge Agent архитектура: 5 агентов (Collection, Structuring, Search, Update, Prompt)
- Enriched protocol catalog: 40 протоколов, 143 research links, 122 foods, 116 supplements, 91 inhibitors

**Потребность:** система, которая не просто однократно собирает данные, а непрерывно мониторит новые публикации, валидирует их и интегрирует в базу знаний.

---

## 2. Исследование MCP (Model Context Protocol)

### 2.1 Что такое MCP

MCP — открытый стандарт (аналог USB-C для AI) для подключения AI-приложений к внешним системам. Позволяет LLM получать доступ к данным (файлы, БД) и инструментам (поиск, API).

Архитектура: **Host → Client → Server** (transport: stdio или SSE).

### 2.2 Экосистема MCP

- **MCP Registry:** registry.modelcontextprotocol.io — каталог опубликованных серверов
- **Reference Servers** (github.com/modelcontextprotocol/servers, 86.6k ★):
  - Everything (тестовый), Fetch (веб-контент), Filesystem (файлы), Git (репозитории)
  - Memory (граф знаний), Sequential Thinking, Time (таймзоны)
- **MCP SDKs:** TypeScript, Python, Go, Java, C#, Rust, Ruby, Swift, Kotlin, PHP
- **16,852** репозитория с топиком `mcp-server` на GitHub

### 2.3 Ключевые проекты в экосистеме MCP (релевантные для Healora)

| Проект | Звёзды | Релевантность |
|--------|--------|---------------|
| **n8n** (n8n-io/n8n) | 191k ★ | Workflow automation с MCP. Можно строить пайплайны сбора данных |
| **GPT Researcher** (assafelovic/gpt-researcher) | 27.4k ★ | **Deep research агент.** Planner + Execution + Publisher. Работает как MCP server и MCP client |
| **Activepieces** (activepieces/activepieces) | 22.5k ★ | ~400 MCP серверов для AI-агентов. Workflow automation |
| **MaxKB** (1Panel-dev/MaxKB) | 21.1k ★ | Open-source RAG платформа. Knowledge base + агенты |
| **trigger.dev** (triggerdotdev/trigger.dev) | 15.2k ★ | Managed AI agents и workflows с scheduler |
| **Serena** (oraios/serena) | 24.8k ★ | MCP toolkit для кодинга (интересен как пример MCP-клиента) |

### 2.4 MCP-архитектура для сбора знаний

MCP может использоваться в двух ролях:

1. **MCP Server** — наш сервер предоставляет инструменты (поиск по знаниям, обновление) для внешних AI-клиентов
2. **MCP Client** — наш агент подключается к внешним MCP-серверам (PubMed, WHO) как клиент через MCP-протокол

**Вывод:** для Healora MCP имеет смысл как:
- стандартный интерфейс для подключения источников (PubMed, WHO)
- способ интеграции с GPT Researcher и другими AI-агентами
- протокол для внешних AI-клиентов (Claude, ChatGPT), которые хотят искать по базе знаний Healora

---

## 3. Исследование GPT Researcher

### 3.1 Архитектура

GPT Researcher использует подход plan-and-solve:

```
Research Query
    │
    ▼
┌─────────────────┐
│   Planner Agent  │ ← генерирует исследовательские вопросы
└────────┬────────┘
         │
    ┌────▼────┐
    │  Вопросы │
    └────┬────┘
         │
    ┌────▼───────────────────┐
    │ Execution Agents (N)   │ ← параллельный сбор данных
    │  - Tavily (веб-поиск)   │
    │  - MCP (доп.источники)  │
    │  - Local documents      │
    └────┬───────────────────┘
         │
    ┌────▼────┐
    │  Summaries │ ← каждый источник → summary + source tracking
    └────┬────┘
         │
    ┌────▼────────────┐
    │  Publisher Agent │ ← агрегация в финальный отчёт
    └─────────────────┘
```

### 3.2 Ключевые возможности

- **Deep Research** (рекурсивный обход: ~5 мин, ~$0.4 на o3-mini)
- **MCP Client** — подключается к любым MCP-серверам (GitHub, БД, кастомные)
- **MCP Server** (gptr-mcp) — предоставляет tools: `deep_research`, `quick_search`, `write_report`
- **Multi-agent** — поддержка LangGraph и AG2 для команд специализированных агентов
- **Local docs** — исследование по локальным документам (PDF, DOCX, MD)
- **Image generation** — AI-иллюстрации Google Gemini

### 3.3 Интеграция с Healora

GPT Researcher можно использовать как:
1. **MCP-клиент** — подключается к нашему PubMed-коннектору и загружает статьи
2. **MCP-сервер** — предоставляет deep research для AI-ассистента Healora
3. **Шаблон архитектуры** — planner + execution агенты для непрерывного мониторинга

---

## 4. Обзор источников знаний

### 4.1 PubMed (E-utilities API)

| Параметр | Значение |
|----------|----------|
| **API** | `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/` |
| **Без API key** | 3 запроса/сек |
| **С API key** | 10 запросов/сек |
| **Форматы** | JSON (с 2025), XML |
| **Поиск** | `esearch.fcgi?db=pubmed&term=...` |
| **Загрузка** | `efetch.fcgi?db=pubmed&id=PMID&rettype=abstract` |
| **MeSH** | Поддержка MeSH-терминов (Medical Subject Headings) |

**Пример поиска по "obesity AND lifestyle intervention":**
```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi
  ?db=pubmed
  &term=obesity+AND+lifestyle+intervention
  &sort=date  // или relevance
  &retmax=20
  &retmode=json
```

**Ограничения:** free full-text доступен не для всех статей. Для полного текста нужен PubMed Central (PMC) API.

### 4.2 ClinicalTrials.gov API

- REST API: `https://clinicaltrials.gov/api/v2/studies`
- Поддержка полей: condition, intervention, status, phase
- Форматы: JSON, CSV
- Без API key (rate-limited)

### 4.3 WHO (Всемирная организация здравоохранения)

- WHO API: `https://www.who.int/data/gho/api/`
- WHO guidelines: через RSS + парсинг PDF
- ICD-11 API: `https://icd.who.int/icdapi`

### 4.4 Минздрав РФ

- Официальные клинические рекомендации: `https://cr.minzdrav.gov.ru/`
- Нет официального API — нужен парсинг

### 4.5 Дополнительные источники

- **Cochrane Library** (систематические обзоры) — ограниченный API
- **OpenAlex** (открытая база научных работ, альтернатива PubMed)
- **Semantic Scholar API** (AI-powered поиск по научным статьям)
- **Crossref API** (метаданные публикаций, DOI resolution)

---

## 5. Архитектурные подходы

### 5.1 Чистый MCP-подход (MCP-only)

```
Scheduler → MCP Client → MCP Server (PubMed) → Collection Agent
                          MCP Server (WHO)    →
                          MCP Server (RSS)    →
```

**Pro:** Стандартизация, переиспользование MCP-серверов сообщества
**Con:** Мало готовых MCP-серверов для медицинских БД (PubMed, WHO)
**Вердикт:** MCP хорош как транспорт, но sources придётся писать самим

### 5.2 GPT Researcher-like подход

```
Scheduler → Planner Agent (LLM) → Research Questions
              ↓
          Execution Agents (N):
            - PubMed Retriever
            - WHO Retriever
            - Web Crawler
              ↓
          Publisher → Structured Knowledge
```

**Pro:** Проверен на 27.4k★, поддерживает MCP, локальные документы, deep research
**Con:** Ориентирован на одноразовые отчёты, не на непрерывное пополнение БЗ
**Вердикт:** Отличная архитектурная модель, потребуется адаптация под continuous mode

### 5.3 Гибридный подход (рекомендуемый)

```
┌──────────────────────────────────────────────────────┐
│                    Scheduler                           │
│  (node-cron / trigger.dev / Bull + Redis)            │
└──┬──────┬──────┬────────┬────────┬────────────────────┘
   │      │      │        │        │
   ▼      ▼      ▼        ▼        ▼
┌────┐ ┌────┐ ┌────┐ ┌────────┐ ┌────────┐
│PubMed││WHO ││RSS ││Clinical││Semantic│
│Pull ││Pull││Watch││Trials  ││Scholar │
│     ││    ││    ││        ││        │
└──┬──┘ └──┬─┘ └──┬─┘ └───┬────┘ └───┬────┘
   │       │      │        │          │
   └───────┴──────┴────────┴──────────┘
                      │
               ┌──────▼──────┐
               │  Dedup &    │
               │  Relevance  │
               │  Filter     │
               │  (LLM-judge)│
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │  Structured  │
               │  Extraction  │
               │  (LLM)       │
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │  Validation  │
               │  Queue       │
               │  (auto + HITL)│
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │  Knowledge   │
               │  Store       │
               │  (Vector DB +│
               │   Catalog    │
               │   JSON)      │
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │  MCP Server  │
               │  → внешние AI│
               └─────────────┘
```

**Рекомендуемые компоненты:**

| Слой | Технология |
|------|-----------|
| **Scheduler** | `node-cron` (простые расписания) / `Bull` + Redis (продвинутые очереди) |
| **Pull-сервисы** | Custom Node.js-модули с `axios` + `cheerio` |
| **Dedup & Relevance** | LLM-as-a-Judge (GigaChat или OpenAI) |
| **Extraction** | LLM с JSON schema constraint |
| **Validation** | Auto (LLM confidence > 0.9) → approve; else → expert queue |
| **Vector DB** | Qdrant (самостоятельно) / pgvector |
| **MCP Interface** | Python SDK (у GPT Researcher) или TypeScript SDK |

---

## 6. Стратегии валидации

### 6.1 Автоматическая (LLM-as-a-Judge)

```
Новая статья
    │
    ▼
┌──────────────────────┐
│ Evidence Level Tagger │ ← проверка: journal IF, study type (RCT > cohort > review)
└──────────┬───────────┘
           │
    ┌──────▼──────┐
    │ LLM-Judge   │ ← проверка: релевантность, непротиворечивость
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │ Confidence  │
    │  > 0.9?     │
    │ /   \       │
    │ Yes  No     │
    │  │    │     │
    │  │    ▼     │
    │  │  Expert  │
    │  │  Queue   │
    │  │          │
    ▼  ▼          │
  Approve         │
```

**Критерии оценки:**
1. **Journal Impact Factor** — парсинг SCImago Journal Rank
2. **Study type** — RCT = A, meta-analysis = A, cohort = B, case-control = C, expert opinion = D
3. **Sample size** — n > 1000 = бонус
4. **Date** — last 5 years = актуально
5. **LLM relevance score** — по ключевым словам топиков Healora

### 6.2 Экспертная (HITL)

- UI для просмотра очереди новых записей (ES.4)
- Режимы: Approve / Reject / Edit / Defer
- Changelog для каждой записи (кто одобрил, когда)
- Периодический аудит: случайная выборка 10% авто-одобренных записей

### 6.3 Комбинированная (рекомендуемая)

| Confidence | Действие |
|------------|----------|
| 0.95–1.0 | Auto-approve, помечается для периодического аудита |
| 0.80–0.94 | Auto-approve с пометкой "требует экспертной проверки" |
| < 0.80 | В очередь эксперту |

---

## 7. Сравнение подходов

| Критерий | MCP-only | GPT Researcher-like | Гибридный (рекомендуемый) |
|----------|----------|-------------------|--------------------------|
| **Непрерывность** | Ручная настройка | Одноразовые отчёты | Scheduler + Cron |
| **Сложность** | Средняя (писать свои серверы) | Средняя (адаптация под continuous) | Высокая (нужен scheduler + queue) |
| **Гибкость** | Высокая (стандарт) | Средняя (агент для отчётов) | Высокая (слои независимы) |
| **Масштабирование** | Через MCP registry | Через multi-agent | Через очередь + workers |
| **Валидация** | Отсутствует | Отсутствует | LLM-judge + HITL |
| **Интеграция с Healora** | Нужен MCP-клиент | Через MCP server | Прямая интеграция в API |
| **Оценка времени** | ~20-30ч на источники | ~16-24ч на адаптацию | ~30-40ч (все слои) |

---

## 8. Рекомендации

### 8.1 Начать с гибридного подхода (Фаза 1)

1. **PubMed Pull-сервис** (ES.1, 8ч) — прямой HTTP-клиент к E-utilities, без MCP
2. **Dedup + Relevance** (ES.3, 8ч) — LLM-extraction + фильтр
3. **Expert validation queue** (ES.4, 4ч) — простой UI
4. **Scheduler** — `node-cron` раз в день/неделю

### 8.2 Добавить MCP (Фаза 2)

1. **MCP Server** для базы знаний Healora — чтобы Claude/ChatGPT могли искать
2. **MCP Client** для интеграции с GPT Researcher
3. **MCP PubMed server** — если появится community implementation

### 8.3 Интегрировать GPT Researcher (Фаза 3)

1. Использовать как deep research engine для сложных запросов
2. Подключить его MCP client к нашему PubMed-коннектору
3. Использовать multi-agent режим с LangGraph для параллельного исследования

---

## 9. Принятые решения (01.06.2026)

| Решение | Выбор | Обоснование |
|---------|-------|-------------|
| **Расписание** | Daily + on demand + лог | Ежедневный поиск + ручной запуск + полный лог результатов |
| **Триггеры** | Both | Cron-расписание + webhook/ручной запуск |
| **Приоритетные домены** | 6+3 | 1) Ожирение и метаболизм, 2) Нутрициология, 3) Долголетие и anti-age, 4) Стресс и нейропластичность, 5) Сон и циркадные ритмы, 6) Микробиом, + дизайн среды, привычки ЗОЖ, литература |
| **Валидация** | Auto + HITL | LLM-as-a-Judge с очередью эксперта для низкодоверительных записей |
| **PubMed API key** | Потребуется | Для 10 запросов/сек (daily search по 6+ доменам) |
| **MCP vs HTTP** | Прямой HTTP сначала | MCP — Фаза 2 |

---

## 10. Roadmap

### Фаза 1 (текущая): PubMed Pull Service + Validation

**Шаг 0 — UI мониторинга и настройки поиска**
Интерфейс для управления и наблюдения за процессом сбора знаний.
Режим на старте: **HITL** (все новые статьи проходят через эксперта).

**Аналитика базы знаний (Knowledge Analytics):**
- Общая статистика: всего статей в базе, по источникам (PubMed/WHO/...), по доменам (ожирение/нутрициология/...)
- Распределение по evidence level (A/B/C/D) — круговая диаграмма
- Динамика пополнения: график новых статей по дням/неделям
- Топ-журналы, топ-авторы, топ-MeSH-термины
- Coverage map: какие домены сколько статей имеют, где пробелы (heatmap)
- Экспорт аналитики в JSON/CSV

**Expert Validation Queue (главный режим — HITL):**
- Таблица новых записей: источник, заголовок, аннотация (первые 200 символов), релевантность (0–1), evidence level (A/B/C/D), LLM confidence, домен, дата сбора
- Фильтры: по источнику, домену, evidence level, статусу
- Действия: **Approve** (в базу), **Reject** (с комментарием), **Edit** (редактор JSON-записи), **Defer** (отложить)
- Массовые действия: Approve All / Reject All для отфильтрованного списка
- Changelog: кто, когда, какое действие и комментарий — для каждой записи
- Уведомления при появлении новых статей в очереди

**Настройка поиска (Search Config):**
- Выбор активных источников (PubMed, WHO, ClinicalTrials.gov, ...) с чекбоксами
- Управление поисковыми запросами по каждому домену:
  - Список keyword/MeSH-терминов (например, `obesity AND lifestyle intervention`, `microbiome AND probiotics`)
  - Дата последнего запуска и интервал (daily/weekly/custom cron)
  - Статус (active/paused)
- Поле для PubMed API key (сохраняется в .env)
- Настройка лимитов: max статей за запуск, порог релевантности, минимальный evidence level
- Кнопка ручного запуска поиска "Run Now" с выбором домена/источника

**Лог сессий поиска (Search Log):**
- Таблица сессий: дата, тип (scheduled/manual), источник, домен, найдено, после dedup, отправлено в очередь, ошибки
- Статусы: in progress / completed / failed / skipped
- Детальный лог: список PMID с результатами dedup и confidence scores
- Повтор проблемных сессий одной кнопкой

- [ ] PubMed HTTP-клиент (E-utilities REST, 3→10 req/sec с API key)
- [ ] Dedup + Relevance filter (LLM-as-a-Judge)
- [ ] Daily scheduler + on-demand trigger + лог
- [ ] Expert validation queue (UI)
- [ ] Охват: 6 приоритетных доменов

### Фаза 2: MCP-интеграция
- [ ] MCP Server для базы знаний Healora (внешние AI-клиенты)
- [ ] MCP Client для GPT Researcher
- [ ] Дополнительные источники (WHO, ClinicalTrials.gov, Минздрав)

### Фаза 3: GPT Researcher + Multi-agent
- [ ] Deep research engine для сложных запросов
- [ ] Multi-agent с LangGraph для параллельного исследования
- [ ] Интеграция с Knowledge Graph (v2)

---

*Документ создан: 01.06.2026 | На основе: MCP Registry, GPT Researcher (v3.5.0), Healora Knowledge Agent architecture, Healora BACKLOG.md*
*Решения приняты: 01.06.2026*
