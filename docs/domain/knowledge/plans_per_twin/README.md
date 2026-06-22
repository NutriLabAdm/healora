# Plans Per Twin — Architecture

## Decision
**Combination: React Context (PlansProvider) + localStorage persistence**

Selected: Option 2 + 5

## Why
- Each digital twin (`profileId`) has its own plan (interventions timeline)
- Plans survive page refresh (localStorage)
- No backend dependency needed
- Context keeps it accessible across components without prop drilling

## How it works

### PlansProvider (`src/context/PlansProvider.jsx`)
- Wraps the entire app in `App.jsx`
- Stores `{ [profileId]: Intervention[] }` map in React state
- Hydrates from `localStorage` key `healora_plans` on mount
- Auto-syncs to `localStorage` on every state change via `useEffect`
- Exposes:
  - `getPlan(profileId)` → returns `Intervention[]`
  - `setPlan(profileId, interventions)`
  - `removePlan(profileId)`

### DigitalTwin integration (`src/components/DigitalTwin.jsx`)
- Local `timelineInterventions` state kept as working copy (minimal diff)
- On `profileId` change → hydrate local state from PlansProvider
- On local state change → persist to PlansProvider (guarded by `syncedPlanKeyRef` to prevent infinite loops)
- "Очистить план" button also calls `removePlan(profileId)` to clear from storage

### Sync guard
```js
const syncedPlanKeyRef = useRef('');
// Build a key from profileId + length + codes+days
// Only persist when key differs from last sync
```

## Data flow
```
User modifies plan
  → setTimelineInterventions(newPlan) [local state, instant UI]
  → useEffect detects change → setPlan(profileId, newPlan)
  → PlansProvider state updates → localStorage auto-syncs

User switches twin (profileId changes)
  → useEffect detects new profileId
  → getPlan(newProfileId) from PlansProvider
  → setTimelineInterventions(loadedPlan)
```

## localStorage schema
```json
{
  "healora_plans": {
    "profile_1": [{ "code": "L1_SUP_VITD", "day": 1, ... }, ...],
    "profile_7": [{ "code": "M_NUTR_B12", "day": 3, ... }, ...]
  }
}
```

## Files
- `src/context/PlansProvider.jsx` — Context + Provider
- `src/components/DigitalTwin.jsx` — Consumer (keep local state, sync on change)
- `src/App.jsx` — Wraps with `<PlansProvider>`


## Промпты для презентации

### Для клиента
> **Заголовок:** «Plans Per Twin — Architecture: план действий для улучшения здоровья»
>
> **Теория:**
> - Цель протокола: улучшение показателей здоровья
> - Кому подходит и когда начинать
> - Основные шаги и их последовательность
> - Ожидаемые результаты и сроки
>
> **Практика:**
> - Пошаговый план на неделю/месяц
> - Чек-лист ежедневных действий
> - Трекер прогресса (что записывать)
> - Когда ждать первых результатов
>
> **Дисклеймер:** Протокол носит ознакомительный характер. Индивидуальная программа составляется специалистом.

### Для специалиста
> **Заголовок:** «Plans Per Twin — Architecture: клинический протокол ведения»
>
> **Теория:**
> - Обоснование протокола (биологические механизмы)
> - Показания и противопоказания (стратификация пациентов)
> - Доказательная база и уровни рекомендаций
>
> **Практика:**
> - Алгоритм: скрининг → стратификация → интервенция → мониторинг
> - 
> - Критерии эффективности и точки коррекции
> - Протокол безопасности (побочные эффекты, лабораторный контроль)
>
> **Дисклеймер:** Референсные протоколы. Адаптируются под конкретного пациента.