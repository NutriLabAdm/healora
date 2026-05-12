# 📊 Обзор структуры проекта NutriChat

> **Путь:** `E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\`  
> **Версия:** 1.0 | **Дата:** 08.05.2026 | **Статус:** Актуально

---

## 🗺 Полная структура проекта

```
healora.ru/
├── 📂 docs/
│   ├── 🎨 design/
│   │   ├── 📄 DESIGN.md                     # Требования к дизайну + реестр артефактов (ID_EL)
│   │   └── 📁 assets/
│   │       └── 🌐 ui_library.html              # Библиотека UI-компонентов (CSS + ID_EL)
│   │
│   ├── 📂 domain/
│   │   ├── 📂 vitamin/                         # 🧬 База знаний по витаминам и минералам
│   │   │   ├── 📄 vitamin_prompt.md             # (пустой)
│   │   │   ├── 📄 vitamin_prompt_big_pickle.md # Промпт для генерации базы
│   │   │   ├── 📄 index.md                     # Сводная таблица всех нутриентов
│   │   │   ├── 📄 data.json                    # JSON-база (синхронизирована с MD)
│   │   │   ├── 📄 foods_crosswalk.json         # Перекрёстная таблица продуктов ↔ нутриентов
│   │   │   ├── 📂 vitamins/                    # Витамины (13 файлов)
│   │   │   │   ├── 📄 vit_A_retinol.md
│   │   │   │   ├── 📄 vit_B1_thiamin.md
│   │   │   │   ├── 📄 vit_B2_riboflavin.md
│   │   │   │   ├── 📄 vit_B3_niacin.md
│   │   │   │   ├── 📄 vit_B5_pantothenic.md
│   │   │   │   ├── 📄 vit_B6_pyridoxine.md
│   │   │   │   ├── 📄 vit_B7_biotin.md
│   │   │   │   ├── 📄 vit_B9_folate.md
│   │   │   │   ├── 📄 vit_B12_cobalamin.md
│   │   │   │   ├── 📄 vit_C_ascorbic.md
│   │   │   │   ├── 📄 vit_D_calciferol.md
│   │   │   │   ├── 📄 vit_E_tocopherol.md
│   │   │   │   └── 📄 vit_K_phylloquinone.md
│   │   │   └── 📂 minerals/                    # Минералы (13 файлов)
│   │   │       ├── 📄 min_Ca_calcium.md
│   │   │       ├── 📄 min_Fe_iron.md
│   │   │       ├── 📄 min_Mg_magnesium.md
│   │   │       ├── 📄 min_Zn_zinc.md
│   │   │       ├── 📄 min_I_iodine.md
│   │   │       ├── 📄 min_Se_selenium.md
│   │   │       ├── 📄 min_K_potassium.md
│   │   │       ├── 📄 min_Cu_copper.md
│   │   │       ├── 📄 min_P_phosphorus.md
│   │   │       ├── 📄 min_Na_sodium.md
│   │   │       ├── 📄 min_Cl_chloride.md
│   │   │       ├── 📄 min_Mn_manganese.md
│   │   │       └── 📄 min_Cr_chromium.md
│   │   │
│   │   └── 📂 NUTRICAH_BRIEF/               # Бриф проекта Нутричат
│   │       ├── 📄 PROJECT_BRIEF.md           # Бриф (перенесён из исходного места)
│   │       ├── 📂 html/                       # HTML-макеты (пусто)
│   │       └── 📂 png/                       # PNG-макеты (пусто)
│   │
│   └── 📂 prototype/
│       ├── 📄 phone_mockup.html           # Интерактивный прототип (телефон, 5 экранов)
│       └── 📄 preview.html                 # (если есть)
│
├── 📄 prototype_view.md                   # Главная страница с кнопкой "Посмотреть прототип"
└── 📂 www/                                # Веб-сайт (deploy)
    └── (файлы сайта)
```

---

## 📋 Схема связей между файлами

```
prototype_view.md
    │
    └── 🔗 "Посмотреть прототип" ───▶ phone_mockup.html (5 экранов: Chat, Scan, Reminders, Goals, Achievements)

docs/design/DESIGN.md
    │
    ├── 🔗 Ссылается на COMP_001...COMP_015 (UI Components)
    ├── 🔗 Ссылается на ICON_001...ICON_015 (Icons)
    ├── 🔗 Ссылается на BADGE_001...BADGE_008 (Badges)
    └── 🔗 assets/ui_library.html (реализация всех компонентов с ID_EL)

docs/domain/vitamin/
    │
    ├── data.json ←── 🔗 Синхронизирован с ↓
    │                  ├── vitamins/vit_*.md (13 файлов)
    │                  └── minerals/min_*.md (13 файлов)
    │
    ├── foods_crosswalk.json ←── 🔗 Использует данные из vit_*.md и min_*.md
    │
    └── index.md ←── 🔗 Сводная таблица всех 26 нутриентов
```

---

## 🎯 Цветовая схема (из DESIGN.md)

```
Primary:    ████ #4CAF50 (Green 500)
Secondary:  ████ #2196F3 (Blue 500)
Accent:     ████ #FF9800 (Orange 500)
BG Main:    ████ #F5F5F5 (Grey 50)
BG Card:    ████ #FFFFFF (White)
Text:       ████ #212121 (Grey 900)
Error:      ████ #F44336 (Red 500)
Success:    ████ #4CAF50 (Green 500)
Warning:    ████ #FFC107 (Amber 500)
```

---

## 📱 Реестр артефактов (ID_EL)

### 🖥 Экраны (Screens)
| ID_EL | Название | Тип | Статус |
|-------|-----------|------|--------|
| `SCREEN_001` | `chat_coach_mobile` | Мобильный | ✅ Готов |
| `SCREEN_002` | `food_scan_mobile` | Мобильный | ✅ Готов |
| `SCREEN_003` | `reminders_mobile` | Мобильный | ✅ Готов |
| `SCREEN_004` | `goals_mobile` | Мобильный | ✅ Готов |
| `SCREEN_005` | `achievements_mobile` | Мобильный | ✅ Готов |
| `SCREEN_006` | `chat_coach_web` | Веб | 🔄 В разработке |
| `SCREEN_007` | `dashboard_web` | Веб | 🔄 В разработке |
| `SCREEN_008` | `nutrition_diary` | Веб/Моб | 🔄 В разработке |
| `SCREEN_009` | `profile_settings` | Веб/Моб | 🔄 В разработке |
| `SCREEN_010` | `onboarding_flow` | Моб/Веб | 🔄 В разработке |

### 🧩 UI-компоненты
| ID_EL | Название | Ссылается на assets/ui_library.html# |
|-------|-----------|-----------------------------------|
| `COMP_001` | `recommendation_bubble` | `EL_COMP_001` |
| `COMP_002` | `swipeable_card` | `EL_COMP_002` |
| `COMP_003` | `header_progress` | `EL_COMP_003` |
| `COMP_004` | `achievements_modal` | `EL_COMP_004` |
| `COMP_005` | `score_toast` | `EL_COMP_005` |
| `COMP_006` | `food_card` | `EL_COMP_006` |
| `COMP_007` | `nutrient_badge` | `EL_COMP_007` |
| `COMP_008` | `goal_progress_bar` | `EL_COMP_008` |
| `COMP_009` | `streak_calendar` | `EL_COMP_009` |
| `COMP_010` | `bottom_nav_mobile` | `EL_COMP_010` |
| `COMP_011` | `toggle_switch` | `EL_COMP_011` |
| `COMP_012` | `notification_chip` | `EL_COMP_012` |
| `COMP_013` | `food_search_bar` | `EL_COMP_013` |
| `COMP_014` | `meal_section` | `EL_COMP_014` |
| `COMP_015` | `avatar_mood` | `EL_COMP_015` |

---

## 🚀 Быстрые ссылки

- **Главная страница:** [prototype_view.md](../prototype_view.md)
- **Интерактивный прототип:** [phone_mockup.html](../prototype/phone_mockup.html)
- **Дизайн-система:** [DESIGN.md](DESIGN.md)
- **UI-библиотека:** [ui_library.html](assets/ui_library.html)
- **База витаминов:** [index.md](../domain/vitamin/index.md)
- **JSON-база:** [data.json](../domain/vitamin/data.json)
- **Перекрёстная таблица:** [foods_crosswalk.json](../domain/vitamin/foods_crosswalk.json)
- **Промпт для Figma:** [vitamin_prompt_big_pickle.md](../domain/vitamin/vitamin_prompt_big_pickle.md)

---

## 📌 Памятка по навигации

1. **Работа с дизайном:**
   - Откройте `DESIGN.md` → найдите нужный `ID_EL` → откройте `assets/ui_library.html#EL_XXX`

2. **Работа с базой знаний:**
   - Откройте `index.md` → выберите нутриент → откройте `vitamins/` или `minerals/`

3. **Прототипирование:**
   - Откройте `prototype_view.md` → нажмите кнопку "Посмотреть прототип" → откроется `phone_mockup.html`

4. **Подготовка к деплою:**
   - Убедитесь, что `www/` содержит актуальные файлы
   - Запустите деплой на `healora.ru`

---

## 🔧 Статус готовности

| Раздел | Прогресс | Примечание |
|---------|----------|-------------|
| 🎨 Дизайн (DESIGN.md) | ███████████ 100% | Полный реестр артефактов |
| 🌐 UI-библиотека | ███████████ 100% | Все 15 компонентов + CSS |
| 🧬 База витаминов (MD) | ███████████ 100% | 26 файлов (13 вит + 13 мин) |
| 📊 JSON-база | ███████████ 100% | Синхронизирована с MD |
| 🔀 Food Crosswalk | ███████████ 100% | 20 продуктов, все нутриенты |
| 📱 Прототип (5 экранов) | ███████████ 100% | Телефон-мокап готов |
| 🌐 Веб-версия | ████░░░░░░░  20% | Только концепт |
| 🚀 Деплой (healora.ru) | ██░░░░░░░░░  10% | Настроить CI/CD |
