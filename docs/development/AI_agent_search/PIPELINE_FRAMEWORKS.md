# Анализ фреймворков для организации pipeline поиска и валидации знаний

> **Дата:** 01.06.2026
> **Цель:** Сравнить OpenClaw и альтернативные фреймворки для построения ETL-пайплайна непрерывного поиска научных материалов, их обработки LLM и валидации экспертом (HITL) в Healora Knowledge Base.

---

## 1. OpenClaw

**GitHub:** https://github.com/openclaw/openclaw — 376k★
**Сайт:** https://openclaw.ai
**Лицензия:** MIT
**Язык:** TypeScript (91.8%), Node.js

### Суть

OpenClaw — self-hosted multi-channel AI gateway. Позволяет запустить AI-агента на своём железе и общаться с ним через Telegram, WhatsApp, Slack, Discord, Signal и т.д. (20+ каналов). Не является фреймворком для построения ETL/search-пайплайнов.

### Ключевые возможности

- **Multi-channel gateway** — единый процесс для всех мессенджеров
- **Multi-agent routing** — изолированные сессии на агента/workspace/отправителя
- **Plugin SDK** — кастомные плагины (bundled: Matrix, Nostr, Twitch, Zalo)
- **Skills registry (ClawHub)** — кастомные навыки в формате `SKILL.md`
- **Cron jobs** — встроенное планирование задач
- **Web Control UI** — браузерная панель управления
- **Canvas (A2UI)** — визуальный workspace агента
- **Voice Wake + Talk Mode** — macOS/iOS/Android

### Применимость к Healora

| Задача | Применимость |
|--------|-------------|
| Периодический поиск PubMed/Google Scholar | ⚠️ Можно через cron + skills, но нет встроенного ETL |
| Обработка статей LLM (summarization, extraction) | ✅ Skills могут вызывать LLM |
| HITL-валидация | ⚠️ Через чат-каналы (Telegram/WhatsApp), но не через Web UI |
| Хранение результатов в SQLite | ⚠️ Нет встроенной БД — нужно писать плагин |
| Управление расписанием (cron) | ✅ Встроенный cron |
| Web UI для администрирования | ✅ Есть Control UI, но кастомный |

### Вердикт

OpenClaw — это gateway для AI-ассистента, а не фреймворк для ETL/search-пайплайна. Использовать его как pipeline-оркестратор возможно (через skills + cron + plugin SDK), но потребует значительной кастомной разработки. **Нет преимуществ** перед специализированными инструментами.

---

## 2. Альтернативные фреймворки

### 2.1 n8n

**GitHub:** https://github.com/n8n-io/n8n — 55k★
**Лицензия:** Sustainable Use License (бесплатно для self-hosted)
**Язык:** TypeScript, Node.js

**Суть:** Визуальный workflow automation (альтернатива Zapier/Make) с 400+ нодами. Позволяет строить пайплайны из блоков: HTTP → Code → LLM → DB.

**Плюсы:**
- Визуальный редактор — наглядно
- 400+ готовых интеграций (HTTP, SQL, Slack, Telegram, LLM)
- Встроенный execution queue + retry + error handling
- Webhook-триггеры + cron-расписание
- Self-hosted (Docker), API-first
- Активное сообщество

**Минусы:**
- Не предназначен специфически для научного поиска
- Ограниченная обработка PDF/научных форматов
- Нет встроенной HITL-валидации
- Лицензия не MIT (ограничения для коммерции)

**Применимость к Healora:**
```
PubMed HTTP → Code (парсинг XML) → OpenAI (summarization) → SQLite (save) → Slack (notify expert)
```
Можно построить полный pipeline визуально за часы.

---

### 2.2 Temporal

**GitHub:** https://github.com/temporalio/temporal — 12k★
**Лицензия:** MIT
**Язык:** Go (server), TypeScript/Python/Java/Go (SDK)

**Суть:** Durable workflow engine — гарантирует выполнение долгих бизнес-процессов с автоматическими retry, восстановлением после сбоев и сохранением состояния.

**Плюсы:**
- **Durable execution** — workflow переживает перезагрузки
- Автоматические retry + timeout + backoff
- Долгие процессы (часы/дни) — идеально для медленных поисков
- Cron-триггеры + сигналы (manual run)
- TypeScript SDK (наш стек)
- Open source, self-hosted

**Минусы:**
- Требует запущенного Temporal Server (отдельная инфра)
- Нет визуального редактора
- Крутой learning curve
- Нужен свой код для интеграции LLM, БД, поиска

**Применимость к Healora:**
```
Workflow: SearchPubMed → Dedup → LLMExtract → ExpertReview
```
Durable execution — ключевое преимущество для long-running search-сессий.

---

### 2.3 LangGraph (LangChain)

**GitHub:** https://github.com/langchain-ai/langgraph — 10k★
**Лицензия:** MIT
**Язык:** Python, TypeScript

**Суть:** Graph-based orchestration для AI-агентов. Позволяет строить сложные workflow с циклами, conditional branching, состоянием.

**Плюсы:**
- Нативное LLM-взаимодействие
- Графовая архитектура (циклы, conditional edges)
- Поддержка инструментов (API calls, DB, search)
- Human-in-the-loop (interrupt/approve)
- TypeScript SDK
- Большое сообщество LangChain

**Минусы:**
- Сложный API
- Оверхед LangChain
- Нет встроенного планировщика (нужен внешний cron)
- Нет durable execution (без Temporal)
- Python-first (TS SDK менее зрелый)

**Применимость к Healora:**
```python
graph = StateGraph(SearchState)
graph.add_node("fetch_pubmed", fetch_pubmed)
graph.add_node("llm_extract", extract_with_llm)
graph.add_node("expert_review", human_review)
```
HITL — встроенная поддержка прерывания на утверждение эксперта.

---

### 2.4 Haystack (deepset)

**GitHub:** https://github.com/deepset-ai/haystack — 18k★
**Лицензия:** Apache 2.0
**Язык:** Python

**Суть:** Фреймворк для построения RAG-пайплайнов. Конвейеры: indexing → retrieval → generation.

**Плюсы:**
- Готовые компоненты: PDFConverter, TextSplitter, EmbeddingRetriever
- Поддержка множества LLM (OpenAI, Cohere, HuggingFace)
- Webcrawler, FileConverter
- Pipeline YAML-конфигурация
- Хорошая документация

**Минусы:**
- Python only
- Ориентирован на RAG (question-answering), не на поиск/ETL
- Нет встроенного планировщика
- Нет durable execution
- Сложно сделать HITL

**Применимость к Healora:** Ограниченная. Haystack хорош для ответа на вопросы по готовой БЗ, но не для построения пайплайна поиска.

---

### 2.5 CrewAI

**GitHub:** https://github.com/crewAIInc/crewAI — 27k★
**Лицензия:** MIT
**Язык:** Python

**Суть:** Multi-agent orchestration. Определяются агенты с ролями (Researcher, Writer, Reviewer) и tasks — они выполняются последовательно/параллельно.

**Плюсы:**
- Простая концепция (Agent + Task + Crew)
- Поддержка tool use
- Process.sequential / Process.hierarchical
- Хорош для прототипирования

**Минусы:**
- Python only
- LLM-зависимый (результаты нестабильны)
- Нет HITL (всё автоматически)
- Не production-ready (нет durable execution, retry, мониторинга)
- Нет планирования

**Применимость к Healora:** Для прототипа — да. Для продакшена — нет.

---

### 2.6 GPT Researcher / AI Research Agent

**GitHub:** https://github.com/assafelovic/gpt-researcher — 27.4k★
**Лицензия:** Apache 2.0
**Язык:** Python

**Суть:** Автономный AI-агент для проведения онлайн-исследований. Генерирует отчёты на основе поиска в интернете.

**Плюсы:**
- Готовый пайплайн: search → scrape → aggregate → report
- Поддержка источников: web, local docs
- Поддержка LLM (OpenAI, Anthropic, Ollama)
- Настраиваемые report types

**Минусы:**
- Python only
- Не designed для continuous pipeline (одноразовый research)
- Нет планировщика
- Нет HITL
- Нет кастомного хранения (только генерация отчёта)

**Применимость к Healora:** Можно адаптировать как seed-генератор для базы знаний, но не для continuous pipeline.

---

### 2.7 Apache Airflow

**GitHub:** https://github.com/apache/airflow — 38k★
**Лицензия:** Apache 2.0
**Язык:** Python

**Суть:** De-facto стандарт для оркестрации DAG-пайплайнов. Используется в data engineering.

**Плюсы:**
- Зрелый (10+ лет), огромное сообщество
- DAG-based + планировщик (cron)
- Мониторинг, retry, алерты, логи
- UI для просмотра/ручного запуска
- Интеграции (HTTP, SQL, Slack)
- Self-hosted (Docker/Kubernetes)

**Минусы:**
- Python only
- Тяжёлый (PostgreSQL, Redis, scheduler, worker)
- Не предназначен для AI/LLM (нет встроенных LLM-нод)
- Learning curve

**Применимость к Healora:** Избыточен. Для 10-20 поисковых запросов Airflow — это too much.

---

### 2.8 Prefect

**GitHub:** https://github.com/PrefectHQ/prefect — 18k★
**Лицензия:** Apache 2.0
**Язык:** Python

**Суть:** Современная альтернатива Airflow — легче, декларативнее, с Python decorator API.

**Плюсы:**
- Python decorators (`@flow`, `@task`)
- Встроенный планировщик (cron)
- Retry, timeouts, caching
- UI-дашборд
- Self-hosted (Docker)
- Гораздо легче Airflow

**Минусы:**
- Python only
- Нет LLM-интеграций из коробки
- Не designed для HITL

**Применимость к Healora:** Легче Airflow, но всё ещё Python-only.

---

### 2.9 Apache Camel / Kafka

**Не подходят.** Camel — enterprise интеграционная шина (Java). Kafka — event streaming. Не designed для AI/LLM workflows.

---

## 3. Сводное сравнение

| Фреймворк | Stars | Язык | Scheduled | Durable | LLM-native | HITL | Web UI | PubMed-ready |
|-----------|-------|------|-----------|---------|------------|------|--------|-------------|
| **OpenClaw** | 376k | TS | ✅ cron | ❌ | ✅ | ⚠️ skills | ✅ | ❌ |
| **n8n** | 55k | TS | ✅ cron | ✅ retry | ⚠️ ноды | ❌ | ✅ visual | ❌ (HTTP) |
| **Temporal** | 12k | TS/Py | ✅ cron | ✅✅ | ❌ | ❌ | ❌ (Web UI есть) | ❌ |
| **LangGraph** | 10k | TS/Py | ❌ | ❌ | ✅✅ | ✅ interrupt | ❌ | ❌ |
| **Haystack** | 18k | Py | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **CrewAI** | 27k | Py | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **GPT Researcher** | 27k | Py | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ (web) |
| **Airflow** | 38k | Py | ✅✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Prefect** | 18k | Py | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |

> **Durable** — сохранение состояния workflow при сбоях
> **LLM-native** — встроенная поддержка LLM (OpenAI, Claude, etc.)
> **HITL** — Human-in-the-loop (прерывание на утверждение экспертом)
> **PubMed-ready** — есть интеграция/коннектор к PubMed

---

## 4. Рекомендация для Healora

### Текущая архитектура (уже реализовано)

```
React Admin UI ──HTTP──> Express API ──> SQLite
                            │
                  knowledgeDb.js (CRUD)
                  search_queries, articles, sessions, changelog
```

### Предлагаемая архитектура pipeline

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│  Scheduler  │───>│  Search      │───>│  LLM         │───>│  Expert     │
│  (cron/Bull) │    │  PubMed      │    │  Summarize   │    │  Validation │
│             │    │  Google Sch. │    │  Extract     │    │  (HITL)     │
│             │    │  gigachat    │    │  Classify    │    │             │
└─────────────┘    └──────────────┘    └──────────────┘    └─────────────┘
                                                                    │
                                                                    ▼
                                                             ┌─────────────┐
                                                             │  SQLite     │
                                                             │  Knowledge  │
                                                             │  Base       │
                                                             └─────────────┘
```

### Почему НЕ OpenClaw

OpenClaw — multi-channel AI gateway для персонального ассистента. Его core competency — маршрутизация сообщений между мессенджерами и AI-агентом. Использовать его как ETL/search pipeline — **misuse of the tool**. Потребуется:

- Писать кастомный plugin для PubMed/Google Scholar
- Писать кастомный плагин для сохранения в SQLite
- Использовать cron skills для планирования
- Делать HITL через чат-каналы (Telegram/WhatsApp), а не через веб
- Обходить отсутствие durable execution

Это больше работы, чем написать native pipeline на Node.js.

### Рекомендуемый подход (3 варианта)

#### Вариант A: Node.js-native pipeline (рекомендуется)

**Использовать то, что уже есть.** У нас уже есть:
- `search_queries` с cron_expr, llm_prompt, search_format
- `search_sessions` с отслеживанием статусов
- `articles` с status (pending → approved/rejected)
- `changelog` с историей действий
- Web UI (React Admin)

**Добавить:**
1. `tools/search_runner.js` — Node.js скрипт, который читает активные запросы, выполняет поиск по источникам, вызывает LLM, сохраняет результаты
2. `node-cron` или `node-schedule` для планирования (CRON из `search_queries.cron_expr`)
3. Ручной запуск через API (уже есть POST `/sessions`)
4. LLM-обработка через OpenAI/gigachat API (уже есть `OPENAI_API_KEY` в `server.js`)

**Плюсы:** Минимум зависимостей, полный контроль, TypeScript, уже working codebase.
**Минусы:** Нет durable execution (при падении процесс теряется — но это ок для dev).

#### Вариант B: n8n

Если хочется визуального управления пайплайном:
- Развернуть n8n в Docker
- Настроить Webhook → HTTP PubMed → Code (XML parse) → OpenAI → SQLite
- Cron-триггеры + ручной запуск через Webhook
- Slack/Telegram нода для уведомления эксперта

**Плюсы:** Визуально, быстро прототипировать, 400+ нод.
**Минусы:** Ещё один сервис в инфре, ограничения лицензии.

#### Вариант C: Temporal + LangGraph (production)

Для максимальной надёжности:
- Temporal Server (Docker) — durable orchestration
- LangGraph — графовая логика с HITL
- TypeScript SDK на обоих

**Плюсы:** Production-grade, durable, HITL.
**Минусы:** Сложная инфраструктура, избыточно для текущего масштаба.

---

## 5. Вывод

| Критерий | OpenClaw | n8n | Node.js-native | Temporal |
|----------|----------|-----|----------------|----------|
| Соответствие задаче | ❌ | ✅ | ✅✅ | ✅ |
| Сложность внедрения | Высокая | Средняя | **Низкая** | Высокая |
| Durable execution | Нет | Частично | Нет | ✅✅ |
| HITL | ❌ | ❌ | ✅ (уже есть) | ❌ |
| LLM-интеграция | ⚠️ | ⚠️ | ✅✅ | ❌ |
| Наш стек | ✅ TS | ✅ TS | ✅✅ TS | ✅ TS |
| Доп. инфра | ❌ | Docker | ❌ | Docker + Server |

**Рекомендация: Вариант A — Node.js-native pipeline.**

- Уже есть вся необходимая инфраструктура (БД, API, админка)
- `tools/search_runner.js` — это ~300 строк кода
- `node-cron` — одна зависимость
- LLM-вызовы — уже есть в проекте
- Результат: работающий continuous search pipeline без внешних зависимостей

Переход на Temporal или n8n возможен в будущем, когда:
- Количество запросов > 50
- Появится требование guaranteed delivery
- Понадобится распределённое выполнение
