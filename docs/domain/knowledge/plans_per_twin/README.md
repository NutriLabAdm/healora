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
