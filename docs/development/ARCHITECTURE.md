# Healora — Архитектура данных и компонентов

## Data Architecture

### JSON Catalogs (`www/dev.healora.ru/src/assets/data/`)

| Файл | Назначение | Ключевые поля |
|------|-----------|---------------|
| `interventions_catalog.json` | 46 интервенций: sleep, physical, mental, food, medical | `code` (≤7 символов: SL_, PH_, MN_, FD_, M_), `category`, `impact` (1-10), `evidence` (A-D), `regularity` (D/W/M/Y/P) |
| `supplements_catalog.json` | 40 добавок с группировкой | `group` (vitamins/vitamin_like/minerals), `classification` (нутрицевтик/медицинский) |
| `diets_catalog.json` | 19 диет и пищевых привычек | `foodGroup` (diet/habit) |
| `food_catalog.json` | Каталог блюд с фото и нутриентами | `nutrition.calories`, `.ndi` |
| `protocol_mappings.json` | Связи интервенций в протоколы | `interventions[]` (массив кодов) |

### Flow данных

```
JSON → import → React Components
  interventions_catalog.json → DigitalTwin.jsx, InterventionsPanel.jsx
  supplements_catalog.json   → InterventionsPanel.jsx  
  diets_catalog.json          → InterventionsPanel.jsx
  food_catalog.json           → DigitalTwin.jsx (diary food selector)
  protocol_mappings.json      → DigitalTwin.jsx, InterventionsPanel.jsx
```

### API endpoints

| Маршрут | Метод | Назначение |
|---------|-------|------------|
| `/api/profiles/:id` | GET | Загрузка профиля (демография, витальные, лабы, образ жизни, генетика) |
| `/api/diary/:profileId/:day` | GET | Загрузка дневника за день |
| `/api/diary` | POST | Сохранение дневника (meals, water, mood) |
| `/api/meal-photo` | POST | Загрузка фото еды |

### Profile Data Model

```
profile: {
  profile_id, name, photo,
  demographics: { sex, age, ethnicity_or_background },
  anthropometrics: { weight_kg, height_cm, bmi, waist_cm },
  vitals: { systolic_bp_mmhg, diastolic_bp_mmhg, resting_hr_bpm, hrv_ms, spo2_percent },
  labs: { glucose_mg_dl, hba1c_percent, total_cholesterol_mg_dl, hdl_mg_dl, ldl_mg_dl, 
          triglycerides_mg_dl, crp_mg_l, vitamin_d, ferritin, tsh },
  lifestyle: { sleep_hours, stress_level_0_10, daily_steps, water_l_day, 
               smoking, alcohol, physical_activity, diet },
  genetics: { apoe, mthfr, lactase_persistence, brca_status },
  medical_history: { current_medications[], allergies, cardiovascular_disease, diabetes },
  digital_twin_scores: { current_stars, health_risk_score, risk_level }
}
```

### Diary Data Model

```
diary: {
  day: number, waterMl: number,
  mood: { energy, mood, sleep, stress, digestion } (1-5),
  comment: string, voiceNote: string,
  meals: [{ type, label, photo (base64), description,
            calories, protein, fat, carbs, ndi, time, duration }]
}
```

### Mnemonic Code System

| Префикс | Домен | Примеры |
|---------|-------|---------|
| `SL_` | Sleep | SL_BED, SL_DUR, SL_QLT, SL_HYG |
| `PH_` | Physical | PH_HIIT, PH_STR, PH_AER, PH_FLEX, PH_Z2, PH_HRV |
| `MN_` | Mental | MN_MDT, MN_BRTH, MN_STR, MN_DTOX |
| `FD_` | Food | FD_WATER, FD_ELEC, FD_CAL, FD_CRB, FD_SUG, FD_IF |
| `SP_` | Supplement | SP_D3, SP_O3, SP_MG, SP_BC, SP_ADP, SP_NTRP |
| `DG_` | Diagnostic | DG_CHK, DG_CARD |
| `M_` | Medical | M_END01-M_END03, M_CAR01-M_CAR03, M_GAS01-M_GAS03 |
| `OZ_` | GLP-1 Protocol | OZ_01-OZ_10 |

Regularity: `D` (daily), `W` (weekly), `M` (monthly), `Y` (yearly), `P` (on demand)

---

## Component Architecture

```
App.jsx
├── UserAvatarPanel    — Выбор профиля (P005, P008, etc.)
├── ProgressPath       — Путь долголетия
├── InterventionsPanel — Каталог интервенций + протоколы + беклог
│   ├── Категории (сон/физический/ментальный/питание/медицинский/добавки)
│   ├── Подгруппы добавок (витамины/витаминоподобные/минералы)
│   ├── Подгруппы еды (диеты/привычки)
│   ├── Таблица: Код | Название | I | E | Per
│   │   └── Клик → попап с описанием и протоколами
│   ├── Вкладка "Протоколы" (17 протоколов с expand/collapse)
│   └── Беклог (список реализованного и планов)
└── DigitalTwin       — Основной экран
    ├── Шапка (профиль, звёзды, цели)
    ├── Таймлайн (Gantt-диаграмма на 90 дней)
    ├── Панель данных (атрибуты с целями)
    ├── d3.js графики (8 визуализаций)
    ├── Diary Modal (дневник питания с фото)
    ├── Food Selector (выбор блюд из каталога)
    └── Chat Modal (HEALORA)
        ├── Шапка: имя, звёзды, прогресс-бар, счётчик дня
        ├── Сообщения-интервенции с кнопками ✓/✗ и дедлайном
        ├── Inline-формы: Профиль, План, Дневник, Фото еды
        └── Панель быстрых действий
```

### Chat Modal Features

- **Day counter**: `25/90 · 15/45` (текущий день / выполнено+скипнуто)
- **Stars progress bar**: `840 ⭐` + мини-бар к цели 2000
- **Inline forms** (Telegram-style, появляются в переписке):
  - Профиль: имя, возраст, пол, вес, рост, ИМТ, Healora Score, риск
  - План: список интервенций с днями выполнения (подсветка пройденных)
  - Дневник: 4 приёма пищи (описание, ккал, БЖУ, фото), вода, mood
  - Фото еды: upload с превью, отправка в чат + сохранение в дневник

---

## CJM (Customer Journey Map)

См. `docs/domain/cjm/DIGITAL_TWIN_PLANNING.md` — полное описание карты пути пользователя.

### Текущий flow (chat-first):

```
Профиль → [Чат] → План интервенций → Симуляция
                ↓                         ↓
          Inline-формы              Интерактивные
          (Профиль/План/            карточки с ✓/✗
           Дневник/Фото)            и дедлайнами
```

### Tariff models

| Тариф | Планирование | Правка | AI |
|-------|--------------|--------|-----|
| Free | Протокол → автоплан | Нет | Нет |
| Basic+ | Цели → AI → план | ✓ | ✓ |
| Premium | + история → AI+эксперт | ✓ | ✓+эксперт |

---

## Build & Deploy

- **Dev**: `npm run dev` (Vite, порт 3001, proxy :3051)
- **Build**: `npm run build` → `dist/`
- **CI/CD**: `docs/sh/devops.sh`, `deploy-dev.sh`
- **Server**: Beget (217.114.8.5), Nginx + SSL (Let's Encrypt)
- **Base path**: `/digital-twin` (env: `VITE_BASE_PATH`)

*v.2026.05 | Healora.ru*
