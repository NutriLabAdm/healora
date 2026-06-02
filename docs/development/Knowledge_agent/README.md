# Knowledge Agent System — Архитектура

> **Статус:** Предпроект | **Дата:** 28.05.2026
> **Контекст:** Healora Digital Twin, NutriChat, Plan-Journal, RAG (v1 Hybrid)

---

## 1. Проблема

Текущее состояние:
- **23 домена знаний** в `docs/domain/knowledge/` — статические markdown + JSON
- **RAG-пайплайн** спроектирован (predevelop_interview.md), но не реализован
- **System prompt** собирается вручную (`buildSystemPrompt()` в `server.js:305`)
- **Нет единого агента**, который бы искал, собирал, структурировал, актуализировал знания и подавал их в промпты
- **PubMed / внешние источники** не подключены (ES.1-ES.4 в бэклоге, ~26 ч)
- **Knowledge Graph** отложен на v2 (KL.1-KL.4, ~30 ч)

**Следствие:** AI-ассистент опирается только на зашитые промпты + базовый keyword fallback. Нет семантического поиска по базе знаний, нет автообновления, нет персонализированной подачи контента.

---

## 2. Концепция: Knowledge Agent System

Система из **5 специализированных агентов**, каждый отвечает за свой этап жизненного цикла знаний:

```
                  ┌──────────────────┐
                  │  Внешние миры     │
                  │ (PubMed, WHO,     │
                  │  Минздрав, NCCIH) │
                  └────────┬─────────┘
                           │
              ┌────────────▼────────────┐
              │  1. Collection Agent    │  Сбор данных
              │  (парсинг, коннекторы)  │
              └────────────┬────────────┘
                           │ сырые данные
              ┌────────────▼────────────┐
              │  2. Structuring Agent   │  Структурирование
              │  (LLM-extraction, граф) │
              └────────────┬────────────┘
                           │ структ. записи
              ┌────────────▼────────────┐
              │  3. Knowledge Store     │  Хранилище
              │  (Vector DB + Graph +   │
              │   Catalog JSON)         │
              └──┬──────────┬───────────┘
                 │          │
    ┌────────────▼──┐  ┌───▼────────────┐
    │ 4. Search     │  │ 5. Update      │
    │ Agent         │  │ Agent          │
    │ (семант.поиск)│  │ (актуализация) │
    └───────┬───────┘  └───────┬────────┘
            │                  │
            └──────┬───────────┘
                   │
          ┌────────▼────────┐
          │ Prompt Agent    │  Сборка промптов
          │ (Assembly +     │
          │  Injection)     │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │ Чат / Сайт /    │
          │ NutriChat / API │
          └─────────────────┘
```

---

## 3. Спецификация агентов

### 3.1 Collection Agent (Агент сбора)

**Назначение:** Автоматический сбор знаний из внешних источников.

| Функция | Описание | Приоритет | Связь с бэклогом |
|---------|----------|-----------|------------------|
| **PubMed Connector** | E-utilities API: поиск статей по MeSH-терминам, фильтр релевантности, скачивание abstracts/full-text | Must | ES.1 (8 ч) |
| **Clinical Guidelines Parser** | Загрузка клинических рекомендаций (Минздрав РФ, NIH, WHO, NCCIH) | Must | ES.2 (6 ч) |
| **RSS/Journal Watcher** | Мониторинг новых публикаций по подписанным топикам | Should | — |
| **Wearable Data Ingest** | Приём данных от Apple Watch, Oura, Whoop через API | Nice | V1 (20 ч) |

**Архитектура:**

```python
class CollectionAgent:
    sources: list[DataSource]  # PubMed, WHO, Минздрав, RSS
    queue: AsyncQueue          # буфер необработанных данных
    scheduler: CronJob         # периодичность проверки

    async def collect(topic: str) -> list[RawDocument]:
        # 1. Определить какие источники релевантны теме
        # 2. Параллельный опрос источников
        # 3. Дедупликация по DOI/PMID
        # 4. Оценка релевантности (LLM + metadata filter)
        # 5. Поместить в очередь на структурирование
```

**Технологии:** `node-cron` / `bull` (Node.js), `axios` + `cheerio` для парсинга, PubMed E-utilities REST API.

---

### 3.2 Structuring Agent (Агент структурирования)

**Назначение:** Преобразование сырых данных в структурированные записи базы знаний.

| Функция | Описание | Приоритет | Связь с бэклогом |
|---------|----------|-----------|------------------|
| **LLM Extraction** | Извлечение ключевых фактов из статей: intervention, biomarker, condition, evidence_level, dosage | Must | ES.3 (8 ч) |
| **Entity Linking** | Привязка к сущностям графа: протокол → интервенция → биомаркер → противопоказание | Must | KL.1 (8 ч) |
| **Drug-Nutrient Graph** | Построение графа лекарственных и пищевых взаимодействий | Should | KL.3 (6 ч) |
| **Evidence Tagger** | Автоматическая оценка уровня доказательности (A/B/C/D) на основе PMID, journal IF, study type | Must | — |
| **Contraindication Parser** | Извлечение противопоказаний из статей и инструкций | Must | — |

**Архитектура:**

```python
class StructuringAgent:
    llm: GigaChat | OpenAI
    extractor: EntityExtractor
    linker: KnowledgeGraphLinker

    async def structure(doc: RawDocument) -> StructuredEntry:
        # 1. Chunking документа (hierarchical, 128 token overlap)
        # 2. LLM-извлечение фактов (entity extraction)
        # 3. Линковка к существующим узлам графа
        # 4. Оценка evidence_level
        # 5. Генерация embedding для vector store
        # 6. Сохранение + экспертная валидация (ES.4)
```

**Промпт для LLM-извлечения:**

```
Ты — Structuring Agent Healora. Извлеки из текста структурированные факты.

Формат ответа — JSON:
{
  "entities": [
    { "type": "intervention|biomarker|condition|drug|nutrient|protocol",
      "name": "...",
      "relation": "treats|contraindicates|interacts|affects|measured_by",
      "target": "...",
      "evidence": { "level": "A|B|C|D", "source": "PMID:...", "study_type": "RCT|meta-analysis|cohort|review" },
      "dose": { "value": 100, "unit": "mg", "regimen": "daily" }
    }
  ],
  "contraindications": ["...", "..."],
  "tags": ["...", "..."],
  "confidence": 0.85
}

Текст:
{text}
```

**Технологии:** LLM-as-a-Judge, GigaChat/OpenAI, JSON schema validation, Graph DB (Neo4j / Apache TinkerPop).

---

### 3.3 Search Agent (Поисковый агент)

**Назначение:** Семантический поиск по базе знаний для всех потребителей (чат, сайт, NutriChat, Plan-Journal).

| Функция | Описание | Приоритет | Связь с бэклогом |
|---------|----------|-----------|------------------|
| **Hybrid Retrieval** | Dense (vector) + Sparse (BM25) с фильтрацией | Must | Q7 + KL.2 (12 ч) |
| **Metadata Filtering** | Фильтр по возрасту, полу, лабам, противопоказаниям | Must | Q2 (Level 2) |
| **Re-ranker** | Cross-encoder для топ-K результатов | Should | Q8 (v2) |
| **Knowledge Sync API** | `POST /api/knowledge/search` для внешних потребителей | Must | KL.4 (4 ч) |
| **Federated Search** | Поиск по всем 23 доменам знаний одновременно | Should | — |
| **Explainability** | Возврат источника и confidence для каждого чанка | Must | Q2 |

**Архитектура:**

```python
class SearchAgent:
    vector_db: VectorDB        # FAISS / pgvector / Qdrant
    sparse_index: BM25         # Apache Lucene / FlexSearch
    re_ranker: CrossEncoder    # (v2)
    metadata_filter: FilterEngine

    async def search(query: str, profile: UserProfile, top_k: int = 5) -> list[Chunk]:
        # 1. Классификация интента (context/general/status)
        # 2. Гибридный поиск: dense + sparse
        # 3. Фильтрация по профилю (возраст, лабы, противопоказания)
        # 4. Порог релевантности 0.7
        # 5. Дедупликация
        # 6. (v2) Re-ranking cross-encoder
        # 7. Возврат топ-K чанков с источниками
```

**API:**

```json
POST /api/knowledge/search
{
  "query": "как снизить глюкозу при диабете 2 типа",
  "profile_id": "TEST_002",
  "domains": ["protocols", "diets", "supplements"],
  "top_k": 5,
  "min_relevance": 0.7
}

Response:
{
  "results": [
    {
      "chunk": "Метформин — препарат первой линии...",
      "source": "protocols/glycemic_control.md",
      "domain": "protocols",
      "relevance": 0.89,
      "evidence": { "level": "A", "source": "PMID: 34567890" },
      "metadata": { "protocol_id": "PTL_GLYCEMIC" }
    }
  ],
  "query_info": { "intent": "general", "latency_ms": 340 }
}
```

**Технологии:** Qdrant (self-hosted / cloud), `@qdrant/js-client-rest`, BM25 via `lunr.js` или `flexsearch`.

---

### 3.4 Update Agent (Агент актуализации)

**Назначение:** Поддержание базы знаний в актуальном состоянии.

| Функция | Описание | Приоритет | Связь |
|---------|----------|-----------|-------|
| **Embedding Refresh** | Пересчёт эмбеддингов при изменении данных | Must | Q4 |
| **Evidence Deprecation** | Понижение уровня доказательности старых источников | Should | — |
| **Version Management** | Changelog для каждого документа в базе знаний | Must | — |
| **Consistency Check** | Проверка целостности графа знаний (орфанные узлы, missing links) | Nice | — |
| **Expert Validation Queue** | Очередь новых данных на проверку экспертом | Must | ES.4 (4 ч) |

**Стратегия обновления (из Q4):**

| Данные | Режим | Механизм |
|--------|-------|----------|
| Протоколы / интервенции | По изменению файла | git push → webhook → re-index |
| Профили пользователей | При каждом обновлении лаб | API-триггер |
| Дневник питания | Real-time | Immediate feedback |
| Каталоги (еда, практики) | Раз в релиз | Batch update |
| PubMed / внешние | По расписанию (daily/weekly) | Cron job |

---

### 3.5 Prompt Agent (Агент сборки промптов)

**Назначение:** Динамическая сборка system prompt с инжекцией релевантных знаний.

| Функция | Описание | Приоритет |
|---------|----------|-----------|
| **Context Assembly** | Сборка промпта из: профиль + план + knowledge chunks | Must |
| **Window Optimization** | Управление длиной промпта (макс. токенов для контекста) | Must |
| **Source Citation** | Автоматическое добавление ссылок на источники в ответ | Must |
| **Multi-agent Routing** | Маршрутизация запроса к нужному агенту | Should |
| **A/B Template Testing** | Переключение между версиями промптов | Nice |

**Архитектура:**

```python
class PromptAgent:
    max_context_tokens: int = 3000
    templates: dict[str, PromptTemplate]

    async def assemble(request: ChatRequest) -> SystemPrompt:
        # 1. Загрузка профиля пользователя
        # 2. Загрузка активного плана (Plan-Journal)
        # 3. Классификация интента (classifyIntent)
        # 4. Поиск релевантных знаний (Search Agent)
        # 5. Тримминг чанков под лимит токенов
        # 6. Сборка промпта по шаблону
        # 7. Оптимизация: priority ranking within context
```

**Текущее vs Целевое:**

| Аспект | Сейчас (`buildSystemPrompt`) | Цель (Prompt Agent) |
|--------|------------------------------|---------------------|
| Профиль | Статические поля из JSON | Динамические + computed fields |
| План | Опционально, если передан tasks | Всегда из Plan-Journal |
| Знания | Только зашитые правила | RAG-чанки из Search Agent |
| Длина | Фиксированная | Адаптивная под контекст |
| Персонализация | По возрасту/полу/ИМТ | По всем 52 параметрам + история |
| Источники | Не указываются | PMID, DOI, evidence level |

**Шаблон промпта (v2):**

```
Ты — Healora AI, персональный ассистент здоровья.

## Профиль пользователя
{profile_section}

## Активный план терапии
{plan_section}

## Релевантные знания (из базы знаний Healora)
{knowledge_chunks}

## Инструкции
{rules_section}
```

---

## 4. Интеграция в приложения

### 4.1 Healora Digital Twin (Веб)

| Компонент | Агент | Что даёт |
|-----------|-------|----------|
| ChatInterface.jsx | Prompt + Search | Персонализированные ответы с источниками |
| Protocol Picker | Search | Рекомендация протоколов по профилю |
| Context Tips Panel | Search | Подсказки на основе текущего контекста |
| Intervention Catalog | Update | Авто-обновление каталогов |
| Under the Hood Panel | Все | Прозрачность: какие чанки использованы |

### 4.2 NutriChat (Платформа)

| Функция | Агент | Механизм |
|---------|-------|----------|
| Ответы на вопросы по питанию | Search + Prompt | RAG по базам `food/`, `diets/`, `supplements/` |
| Персонализация рациона | Search + Structuring | Фильтр по лабам, аллергиям, предпочтениям |
| Обновление базы продуктов | Collection + Structuring | Парсинг новых исследований по нутрициологии |
| Объяснение "почему это работает" | Search + Graph | Граф связей нутриент → механизм → эффект |

### 4.3 Plan-Journal

| Функция | Агент | Механизм |
|---------|-------|----------|
| Подбор протокола по цели | Search + Prompt | Goal Parser → Search Agent → Protocol Matcher |
| Проверка противопоказаний | Search + Structuring | Граф contraindications × профиль пользователя |
| Адаптация сложности | Prompt | Health Literacy Score → адаптация инструкций |
| Обоснование рекомендаций | Search | Evidence-level + ссылки в каждом шаге плана |

### 4.4 Мобильное приложение (React Native)

| Функция | Агент | Ограничения |
|---------|-------|-------------|
| ChatScreen (сейчас placeholder) | Prompt + Search | Те же, что веб — API те же |
| Офлайн-режим | Update | Кэширование последних N чанков |
| Уведомления | Collection + Update | Push при появлении новых релевантных статей |

### 4.5 Внешние потребители (B2B, White-label)

| Вариант | Агент | API |
|---------|-------|-----|
| Клиники | Search | `POST /api/knowledge/search` с OAuth2 |
| Нутрициологи | Search + Prompt | White-label API (Phase 3) |
| Интеграция с EMR | Structuring | Экспорт структурированных записей в FHIR |

---

## 5. Технологический стек

| Компонент | Технология | Альтернатива |
|-----------|-----------|--------------|
| **Vector DB** | Qdrant (self-hosted) | pgvector, ChromaDB |
| **Graph DB** | Neo4j (v2) | Apache TinkerPop |
| **LLM** | GigaChat-Max (основной), OpenAI gpt-3.5-turbo (fallback) | — |
| **Embeddings** | GigaChat Embedding API | OpenAI text-embedding-ada-002 |
| **Search** | Hybrid: Qdrant (dense) + BM25 (sparse) via FlexSearch | Elasticsearch |
| **Queue** | Bull (Redis) | RabbitMQ |
| **Scheduler** | node-cron | Agenda |
| **API** | Express (существующий) + новые маршруты | Fastify |
| **Monitoring** | LangFuse | MLflow |
| **Metrics** | RAGAS + DeepEval | Custom |
| **Auth** | JWT (существующий) | — |

---

## 6. Поэтапный план реализации

### Фаза 1: Search + Prompt (v1, ~2 недели)
- [ ] **1.1** Индексация существующих 23 доменов знаний в Qdrant (chunking + embedding)
- [ ] **1.2** Search Agent: гибридный поиск (dense + sparse), metadata filter
- [ ] **1.3** Prompt Agent: инжекция RAG-чанков в system prompt
- [ ] **1.4** API: `POST /api/knowledge/search` + обновлённый `/api/chat`
- [ ] **1.5** UI: отображение источников в чате (citation badges)

### Фаза 2: Collection + Structuring (v2, ~3 недели)
- [ ] **2.1** PubMed Connector (ES.1)
- [ ] **2.2** Clinical Guidelines Parser (ES.2)
- [ ] **2.3** LLM Extraction (ES.3) — авто-структурирование
- [ ] **2.4** Prototype Knowledge Graph (KL.1)
- [ ] **2.5** Expert Validation Queue (ES.4)

### Фаза 3: Update + Graph (v3, ~2 недели)
- [ ] **3.1** Update Agent: embedding refresh, deprecation, versioning
- [ ] **3.2** Drug-Nutrient Interactions Graph (KL.3)
- [ ] **3.3** Knowledge Sync API в production (KL.4)
- [ ] **3.4** Mobile ChatScreen integration

### Фаза 4: Production (v4, ongoing)
- [ ] **4.1** Monitoring: LangFuse / MLflow
- [ ] **4.2** Synthetic Interviews pipeline (Q17)
- [ ] **4.3** A/B testing framework
- [ ] **4.4** B2B White-label API

---

## 7. Бэклог (в часах)

| # | Задача | Агент | Часы | Фаза |
|---|--------|-------|------|------|
| KA.1 | Chunking + embedding 23 доменов | Search | 6 | 1 |
| KA.2 | Qdrant setup + indexing pipeline | Search | 8 | 1 |
| KA.3 | Hybrid retrieval (dense + sparse) | Search | 8 | 1 |
| KA.4 | Metadata filter engine | Search | 4 | 1 |
| KA.5 | RAG injection в system prompt | Prompt | 4 | 1 |
| KA.6 | `/api/knowledge/search` endpoint | Search | 4 | 1 |
| KA.7 | Chat citation UI (badges) | Prompt | 3 | 1 |
| KA.8 | PubMed connector | Collection | 8 | 2 |
| KA.9 | Clinical guidelines parser | Collection | 6 | 2 |
| KA.10 | LLM extraction pipeline | Structuring | 8 | 2 |
| KA.11 | Entity linking engine | Structuring | 6 | 2 |
| KA.12 | Expert validation queue UI | Structuring | 4 | 2 |
| KA.13 | Knowledge Graph prototype (Neo4j) | Structuring | 10 | 2 |
| KA.14 | Embedding refresh scheduler | Update | 4 | 3 |
| KA.15 | Evidence deprecation logic | Update | 3 | 3 |
| KA.16 | Drug-nutrient interactions graph | Structuring | 6 | 3 |
| KA.17 | Mobile chat integration | Prompt | 8 | 3 |
| KA.18 | LangFuse monitoring | All | 4 | 4 |
| KA.19 | Synthetic interviews pipeline | All | 8 | 4 |
| KA.20 | A/B testing framework | All | 6 | 4 |
| | **Итого:** | | **~118 ч** | |

---

## 8. Вопросы для обсуждения

### Архитектурные
1. **Q1:** Knowledge Graph — стартовать сразу с Neo4j или сначала flat vector search (как в RAG predevelop interview)?
2. **Q2:** Единая векторная коллекция для всех 23 доменов или раздельные по доменам?
3. **Q3:** Embeddings — GigaChat API (как в Q5) или OpenAI ada-002 как fallback?
4. **Q4:** Expert validation — делать UI для ручного апрува или автоматический LLM-judge с выборочным аудитом?

### Интеграционные
5. **Q5:** NutriChat — это отдельный бренд/фронтенд поверх того же API или другое приложение?
6. **Q6:** Mobile ChatScreen — сейчас placeholder. Встраивать Knowledge Agents сразу или сначала базовый чат?
7. **Q7:** Plan-Journal — как глубоко знания должны влиять на генерацию плана? Сейчас только Goal Parser + keyword.

### Приоритетные
8. **Q8:** Какой primary use case для Knowledge Agent на первой итерации? 
   - (A) Чат-ассистент с RAG-ответами
   - (B) Авто-обновление каталогов протоколов
   - (C) Подбор интервенций по профилю пользователя
   - (D) Всё сразу

9. **Q9:** PubMed — какие топики в приоритете? 
   - Нутрициология, диетология, микробиом, долголетие, когнитивное здоровье, сон, стресс?

### Организационные
10. **Q10:** Есть ли доступ к GigaChat Embedding API (уже есть credentials)?
11. **Q11:** Бюджет на Qdrant Cloud или self-hosted на сервере Beget?
12. **Q12:** Кто будет экспертом для валидации (ES.4) — есть контакт?

---

## 9. Приложение: Карта существующих знаний

| Домен | Файлов | Тип | Приоритет индексации |
|-------|--------|-----|---------------------|
| `protocols/` | ~18 | protocol | 🥇 |
| `intervention/` | ~59 кодов | catalog | 🥇 |
| `supplements/` | ~50 | knowledge | 🥇 |
| `vitamins/` | ~15 | knowledge | 🥇 |
| `minerals/` | ~10 | knowledge | 🥇 |
| `diets/` | ~20 | catalog | 🥇 |
| `food/` | ~30 | reference | 🥇 |
| `drugs/` | ~10 | knowledge | 🥇 |
| `med_traditional_practices/` | 13 | practice | 🥈 |
| `psyhotypes/` | ~10 | guide | 🥈 |
| `environment_design/` | ~5 | guide | 🥈 |
| `genetics/` | ~5 | knowledge | 🥈 |
| `behavior_design/` | ~5 | guide | 🥈 |
| `protocol_obecity/` | ~10 | protocol | 🥈 |
| `treatment_plans/` | 11 | template | 🥈 |
| `diet_preferences/` | ~3 | reference | 🥉 |
| `diet_restrictions/` | ~3 | reference | 🥉 |
| `superfoods/` | ~5 | knowledge | 🥉 |
| `vitamin_like/` | ~5 | knowledge | 🥉 |
| `cjm/` | ~3 | guide | 🥉 |
| `diary/` | ~2 | reference | 🥉 |
| `plans_per_twin/` | ~3 | template | 🥉 |

---

*Документ создан: 28.05.2026 | Автор: Knowledge Agent Design*
*Основание: RAG predevelop interview (Q1-Q17), BACKLOG.md, PLAN_JOURNAL_ARCHITECTURE.md, ARCHITECTURE.md*
