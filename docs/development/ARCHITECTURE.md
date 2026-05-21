# Healora Digital Twin — Architecture

## Deployment

| Site | URL | Root | Build |
|------|-----|------|-------|
| Production | `https://healora.ru/digital-twin/` | `/var/www/healora.ru/digital-twin/` | `VITE_BASE_PATH=/digital-twin/` |
| Development | `https://dev.healora.ru/` | `/var/www/dev.healora.ru/` | no env var |
| Local dev | `http://localhost:3001/` | Vite dev server | source files |

## Backend

| Component | Port | Tech |
|-----------|------|------|
| Node.js API | 3000 | Express | 
| Python API | 3051 | FastAPI (legacy) |

## Proxy

- **Dev:** Vite proxy (`vite.config.js`) → `localhost:3051`
- **Prod:** nginx `location /api/` → `127.0.0.1:3000`

## Profiles Storage

- File: `docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json`
- Key: `healora_test_profiles[]` — array of profile objects
- Each profile has `profile_id`, `photo`, demographics, anthropometrics, vitals, labs, lifestyle, genetics, medical_history, digital_twin_scores, `history` (param edit history)
- State reset on profile switch: `profileOverrides = {}`, `paramHistory = {}`, `hasUnsavedEdits = false`

## URL Anchors

- Profile ID stored in URL hash: `/digital-twin/#TEST_002`
- Read on mount via `window.location.hash`
- Synced via `hashchange` event

## Key Decisions

1. **No localStorage for param state** — `profileOverrides` and `paramHistory` are in-memory only; persisted via API
2. **Save triggers PUT** — falls back to POST on 404/405; POST upserts (creates or updates)
3. **BMI auto-calc** — on weight/height change (manual + voice)
4. **Router basename** — from `VITE_BASE_PATH` env var; `/digital-twin/` on production, empty on dev
5. **Catch-all route** — `path="*"` redirects to root

## Diagrams

See `architecture.puml`, `flows.puml`, `components.puml` in this directory.
