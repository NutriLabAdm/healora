# DESIGN.md — Требования к дизайну и реестр артефактов Healora

> Версия: 2.0 | Дата: 09.05.2026 | Статус: Актуально

---

## Оглавление

1. [Цветовая схема](#цветовая-схема-color-palette)
2. [Типографика](#типографика-typography)
3. [Отступы и сетка](#отступы-и-сетка-spacing--grid)
4. [Digital Twin](#digital-twin)
   - [Profile Header Card](#profile-header-card)
   - [Attribute Catalog Table](#attribute-catalog-table)
   - [Timeline](#timeline)
5. [Реестр артефактов](#реестр-артефактов-artifact-registry)
6. [Figma Guidelines](#figma-guidelines)
7. [Беклог](#беклог)
8. [Статус эмодзи](#статус-исправления-эмодзи-09052026)

---

## Цветовая схема

| Переменная | Значение | Название | Назначение |
|-----------|-----------|-----------|-----------|
| `--primary` | `#4CAF50` | Green 500 | Основной цвет (кнопки, акценты) |
| `--primary-dark` | `#388E3C` | Green 700 | Hover-состояния |
| `--primary-light` | `#C8E6C9` | Green 100 | Фоны, подложки |
| `--secondary` | `#2196F3` | Blue 500 | Вторичный (ссылки, иконки) |
| `--secondary-dark` | `#1565C0` | Blue 800 | Hover вторичного |
| `--accent` | `#FF9800` | Orange 500 | Акценты (уведомления, streak) |
| `--bg-main` | `#F5F5F5` | Grey 50 | Основной фон приложения |
| `--bg-card` | `#FFFFFF` | White | Фон карточек |
| `--text-primary` | `#212121` | Grey 900 | Основной текст |
| `--text-secondary` | `#757575` | Grey 600 | Вторичный текст |
| `--border` | `#E0E0E0` | Grey 200 | Границы |
| `--error` | `#F44336` | Red 500 | Ошибки |
| `--success` | `#4CAF50` | Green 500 | Успех |
| `--warning` | `#FFC107` | Amber 500 | Предупреждения |

### Типографика (Typography)

| Класс | Шрифт | Размер | Вес | Назначение | ID_EL |
|--------|-------|--------|------|----------------|-------|
| `.font-h1` | SF Pro Display / Roboto | 28px | 700 | Заголовки экранов | `EL_FONT_001` |
| `.font-h2` | SF Pro Display / Roboto | 22px | 600 | Подзаголовки | `EL_FONT_002` |
| `.font-body` | SF Pro Text / Roboto | 16px | 400 | Основной текст | `EL_FONT_003` |
| `.font-caption` | SF Pro Text / Roboto | 12px | 400 | Подписи, мета | `EL_FONT_004` |
| `.font-score` | SF Pro Display / Roboto | 32px | 700 | Счёт очков | `EL_FONT_005` |
| `.font-mono` | SF Mono / Roboto Mono | 14px | 400 | Цифры (калории, БЖУ) | `EL_FONT_006` |

## Отступы и сетка

| Переменная | Значение | Назначение | ID_EL |
|-----------|-----------|----------------|-------|
| `--space-xs` | 4px | Микро-отступы | `EL_SPACING_001` |
| `--space-sm` | 8px | Малые отступы | `EL_SPACING_002` |
| `--space-md` | 16px | Стандартные отступы | `EL_SPACING_003` |
| `--space-lg` | 24px | Большие отступы | `EL_SPACING_004` |
| `--space-xl` | 32px | Макро-отступы | `EL_SPACING_005` |
| `--radius-sm` | 8px | Малый радиус | `EL_RADIUS_001` |
| `--radius-md` | 16px | Стандартный радиус | `EL_RADIUS_002` |
| `--radius-lg` | 24px | Большой радиус | `EL_RADIUS_003` |

---

## 📋 Реестр артефактов (Artifact Registry)

### Макеты экранов (Screens)

| ID_EL | Уникальное название | Тип | Описание | Статус |
|-------|-------------------|-----|------------|--------|
| `SCREEN_001` | `chat_coach_mobile` | Экран | Главный чат-лента с AI-коучем (мобильная версия) | ✅ Готов |
| `SCREEN_002` | `food_scan_mobile` | Экран | Распознавание еды через камеру | ✅ Готов |
| `SCREEN_003` | `reminders_mobile` | Экран | Напоминания и streak-система | ✅ Готов |
| `SCREEN_004` | `goals_mobile` | Экран | Цели и прогресс | ✅ Готов |
| `SCREEN_005` | `achievements_mobile` | Экран | Достижения и бейджи | ✅ Готов |
| `SCREEN_006` | `chat_coach_web` | Экран | Главный чат-лента (веб-версия) | 🔄 В разработке |
| `SCREEN_007` | `dashboard_web` | Экран | Дашборд аналитики (веб) | 🔄 В разработке |
| `SCREEN_008` | `nutrition_diary` | Экран | Дневник питания | 🔄 В разработке |
| `SCREEN_009` | `profile_settings` | Экран | Профиль и настройки | 🔄 В разработке |
| `SCREEN_010` | `onboarding_flow` | Экран | Первичная настройка (онбординг) | 🔄 В разработке |

### Компоненты UI (UI Components)

| ID_EL | Уникальное название | Тип | Описание | Ссылка на assets |
|-------|-------------------|-----|------------|-------------------|
| `COMP_001` | `recommendation_bubble` | Компонент | Карточка-сообщение с чекбоксом и очками | `assets/ui_library.html#EL_COMP_001` |
| `COMP_002` | `swipeable_card` | Компонент | Карточка со свайпами → выполнено / ← отложить | `assets/ui_library.html#EL_COMP_002` |
| `COMP_003` | `header_progress` | Компонент | Шапка с очками, прогресс-баром, streak | `assets/ui_library.html#EL_COMP_003` |
| `COMP_004` | `achievements_modal` | Компонент | Модалка с гридом бейджей и графиками | `assets/ui_library.html#EL_COMP_004` |
| `COMP_005` | `score_toast` | Компонент | Всплывающее +15 с конфетти-эффектом | `assets/ui_library.html#EL_COMP_005` |
| `COMP_006` | `food_card` | Компонент | Карточка продукта с КБЖУ | `assets/ui_library.html#EL_COMP_006` |
| `COMP_007` | `nutrient_badge` | Компонент | Бейдж нутриента (иконка + значение) | `assets/ui_library.html#EL_COMP_007` |
| `COMP_008` | `goal_progress_bar` | Компонент | Прогресс-бар цели (цветной, с подписью) | `assets/ui_library.html#EL_COMP_008` |
| `COMP_009` | `streak_calendar` | Компонент | Календарь серии дней | `assets/ui_library.html#EL_COMP_009` |
| `COMP_010` | `bottom_nav_mobile` | Компонент | Нижняя навигация (мобильная) | `assets/ui_library.html#EL_COMP_010` |
| `COMP_011` | `toggle_switch` | Компонент | Переключатель настроек | `assets/ui_library.html#EL_COMP_011` |
| `COMP_012` | `notification_chip` | Компонент | Чип-уведомление (иконка + текст) | `assets/ui_library.html#EL_COMP_012` |
| `COMP_013` | `food_search_bar` | Компонент | Поиск продуктов с автозаполнением | `assets/ui_library.html#EL_COMP_013` |
| `COMP_014` | `meal_section` | Компонент | Секция приёма пищи (завтрак, обед, ужин) | `assets/ui_library.html#EL_COMP_014` |
| `COMP_015` | `avatar_mood` | Компонент | Аватар ИИ с настроением (🔥, 🥺, 🎯) | `assets/ui_library.html#EL_COMP_015` |

### Иконки (Icons)

| ID_EL | Уникальное название | Описание | HTML-сущность |
|-------|-------------------|------------|-------------------|
| `ICON_001` | `ic_chat` | Чат-пузырь | `<span class="icon">💬</span>` |
| `ICON_002` | `ic_scan` | Камера/сканер | `<span class="icon">📷</span>` |
| `ICON_003` | `ic_bell` | Колокольчик (уведомления) | `<span class="icon">🔔</span>` |
| `ICON_004` | `ic_calendar` | Календарь | `<span class="icon">📅</span>` |
| `ICON_005` | `ic_goal` | Цель/мишень | `<span class="icon">🎯</span>` |
| `ICON_006` | `ic_trophy` | Трофей/достижения | `<span class="icon">🏆</span>` |
| `ICON_007` | `ic_user` | Пользователь | `<span class="icon">👤</span>` |
| `ICON_008` | `ic_check` | Галочка | `<span class="icon">✅</span>` |
| `ICON_009` | `ic_fire` | Огонь (streak) | `<span class="icon">🔥</span>` |
| `ICON_010` | `ic_star` | Звезда (рейтинг) | `<span class="icon">⭐</span>` |
| `ICON_011` | `ic_water` | Вода | `<span class="icon">💧</span>` |
| `ICON_012` | `ic_food` | Еда | `<span class="icon">🥗</span>` |
| `ICON_013` | `ic_run` | Бег/активность | `<span class="icon">🏃</span>` |
| `ICON_014` | `ic_moon` | Сон | `<span class="icon">🌙</span>` |
| `ICON_015` | `ic_settings` | Настройки | `<span class="icon">⚙️</span>` |

### Бейджи (Badges)

| ID_EL | Уникальное название | Иконка | Условие получения |
|-------|-------------------|--------|----------------------|
| `BADGE_001` | `badge_first_step` | 🌱 | Выполнить 3 задания подряд |
| `BADGE_002` | `badge_on_fire` | 🔥 | 7 дней без пропусков |
| `BADGE_003` | `badge_balance` | ⚖️ | ≥50 очков в каждой категории за неделю |
| `BADGE_004` | `badge_minus2` | 📉 | Сбросить 2 кг (трекер веса) |
| `BADGE_005` | `badge_marathoner` | 🏃 | Пробежать 42км за месяц |
| `BADGE_006` | `badge_chef` | 🥗 | Приготовить 10 рецептов здорового питания |
| `BADGE_007` | `badge_master` | 💎 | Набрать 5000 очков |
| `BADGE_008` | `badge_early_bird` | 🐦 | Выполнить задание до 08:00 утра |

---

## 📐 Состояния компонентов (States)

| Состояние | CSS-класс | Описание | ID_EL |
|-----------|-----------|------------|-------|
| Default | `.state-default` | Стандартное состояние | `EL_STATE_001` |
| Hover | `.state-hover` | При наведении (веб) | `EL_STATE_002` |
| Active | `.state-active` | Нажатое состояние | `EL_STATE_003` |
| Disabled | `.state-disabled` | Отключено (opacity: 0.5) | `EL_STATE_004` |
| Done | `.state-done` | Выполнено (зелёная галочка) | `EL_STATE_005` |
| Missed | `.state-missed` | Пропущено (оранжевый тег) | `EL_STATE_006` |
| Loading | `.state-loading` | Загрузка (spinner) | `EL_STATE_007` |
| Error | `.state-error` | Ошибка (красная рамка) | `EL_STATE_008` |

---

## 📱 Адаптивность (Responsive Breakpoints)

| Точка | Ширина | Назначение | ID_EL |
|--------|--------|------------|-------|
| Mobile S | 320px | Малые смартфоны | `EL_BP_001` |
| Mobile M | 375px | Стандартные смартфоны (iPhone) | `EL_BP_002` |
| Mobile L | 414px | Большие смартфоны | `EL_BP_003` |
| Tablet | 768px | Планшеты | `EL_BP_004` |
| Desktop S | 1024px | Ноутбуки | `EL_BP_005` |
| Desktop L | 1440px | Большие экраны | `EL_BP_006` |

---

## 🔗 Навигация (Navigation Map)

```
SCREEN_001 (Chat) ←→ SCREEN_002 (Scan)
     ↓            ↓
SCREEN_003 (Reminders) ←→ SCREEN_004 (Goals)
     ↓            ↓
SCREEN_005 (Achievements) ←→ SCREEN_009 (Profile)
```

---

## 🎨 Figma Guidelines

1. Используйте **Auto Layout** для всех контейнеров
2. Привяжите **Figma Variables** к переменным `--primary`, `--bg-main` и др.
3. Создавайте **Component Sets** для каждого компонента (варианты: default, hover, active, disabled)
4. Используйте **Smart Animate** для переходов между экранами
5. **Все элементы в Figma (фреймы, компоненты, слои) должны содержать `ID_EL` в названии** (напр., `COMP_001_recommendation_bubble`, `SCREEN_001_chat_coach_mobile`)
6. **БЕЗ ЭМОДЗИ** — в названиях слоёв, компонентов и текстах интерфейса используйте только текст. Эмодзи запрещены (кроме как отдельных иконок в UI-библиотеке `assets/ui_library.html`)
6. **Без эмодзи** — в названиях слоёв, компонентов и тексте интерфейса используйте только текст. Эмодзи запрещены (кроме как отдельных иконок в UI библиотеке `assets/ui_library.html`, которые должны быть заменены на SVG-иконки или иконочные шрифты при экспорте в код)
6. **БЕЗ ЭМОДЗИ** — в названиях слоёв, компонентов и текстах интерфейса используйте только текст, эмодзи запрещены (кроме как отдельных иконок в UI библиотеке)

## 🌐 Соответствие элементов www/dev.healora.ru

Все элементы дизайна должны соответствовать реализации в `www/dev.healora.ru/src/`. Эмодзи запрещены — используйте SVG-иконки.

### Типографика (EL_FONT_*)
| ID_EL | Элемент DESIGN.md | Реализация | Файл |
|-------|-------------------|------------|------|
| `EL_FONT_001` | `.font-h1` (28px, 700) | CSS variable `--font-h1` | `src/index.css` |
| `EL_FONT_002` | `.font-h2` (22px, 600) | CSS variable `--font-h2` | `src/index.css` |
| `EL_FONT_003` | `.font-body` (16px, 400) | CSS variable `--font-body` | `src/index.css` |

### Компоненты (EL_COMP_*)
| ID_EL | Элемент DESIGN.md | Реализация | Файл | Статус эмодзи |
|-------|-------------------|------------|------|---------------|
| `EL_COMP_001` | Chat Bubble (AI) | `<div class="message ai-message">` | `ChatInterface.jsx` | ✅ SVG |
| `EL_COMP_002` | Chat Bubble (User) | `<div class="message user-message">` | `ChatInterface.jsx` | ✅ SVG |
| `EL_COMP_003` | Phone Header (Stars) | `<div class="phone-header">` | `PhoneContainer.jsx` | ✅ SVG |
| `EL_COMP_004` | Quiz Modal | `<div class="quiz-container">` | `ChatInterface.jsx` | ✅ SVG |
| `EL_COMP_005` | Info Panel | `<div class="info-panel">` | `InfoPanel.jsx` | ✅ SVG |
| `EL_COMP_006` | Intervention Badges | `<div class="interventions-badges">` | `InterventionsPanel.jsx` | ✅ SVG |
| `EL_COMP_007` | Progress Path | `<div class="progress-path">` | `ProgressPath.jsx` | ✅ SVG |
| `EL_COMP_008` | Goals List | `<div class="goals-list">` | `Goals.jsx` | ✅ SVG |
| `EL_COMP_009` | Achievements | `<div class="achievements-grid">` | `Profile.jsx` | ✅ SVG |
| `EL_COMP_010` | Bottom Nav | `<div class="bottom-nav">` | `BottomNav.jsx` | ✅ SVG |
| `EL_COMP_011` | Digital Twin | `<div class="digital-twin">` | `DigitalTwin.jsx` | ✅ SVG |
| `EL_COMP_012` | Sources Footer | `<div class="sources-footer">` | `SourcesFooter.jsx` | ✅ SVG |
| `EL_COMP_013` | Device DropZone | `<div class="drop-zone">` | `DeviceDropZone.jsx` | ✅ SVG |
| `EL_COMP_014` | Info Panel (Tips) | `<div class="context-tips">` | `InfoPanel.jsx` | ✅ SVG |
| `EL_COMP_015` | Mood Indicator | `<span class="mood-indicator">` | `PhoneContainer.jsx` | ✅ SVG |

### Иконки (EL_ICON_*)
| ID_EL | Иконка | SVG в файле | Файл |
|-------|--------|-------------|------|
| `EL_ICON_001` | Chat Bubble | Встроенный SVG | `BottomNav.jsx` |
| `EL_ICON_002` | Path/Check | Встроенный SVG | `BottomNav.jsx` |
| `EL_ICON_003` | Goals/Target | Встроенный SVG | `BottomNav.jsx` |
| `EL_ICON_004` | Digital Twin | Встроенный SVG | `BottomNav.jsx` |
| `EL_ICON_005` | Profile | Встроенный SVG | `BottomNav.jsx` |
| `EL_ICON_006` | Close (X) | Встроенный SVG | `ChatInterface.jsx` |
| `EL_ICON_007` | Star | Встроенный SVG | `PhoneContainer.jsx`, `Profile.jsx` |
| `EL_ICON_008` | Fire (Streak) | Встроенный SVG | `PhoneContainer.jsx`, `Profile.jsx` |
| `EL_ICON_009` | Chart (Score) | Встроенный SVG | `Profile.jsx` |
| `EL_ICON_010` | Wearable (Watch) | Встроенный SVG | `SourcesFooter.jsx` |
| `EL_ICON_011` | Voice | Встроенный SVG | `SourcesFooter.jsx` |
| `EL_ICON_012` | Medical | Встроенный SVG | `SourcesFooter.jsx` |
| `EL_ICON_013` | Food | Встроенный SVG | `SourcesFooter.jsx` |
| `EL_ICON_014` | Genetics | Встроенный SVG | `SourcesFooter.jsx` |
| `EL_ICON_015` | Mental (Brain) | Встроенный SVG | `SourcesFooter.jsx` |

> **Важно:** При изменении дизайна в Figma, обязательно обновляйте реализацию в `www/dev.healora.ru/src/`!
> **Правило:** Все иконки должны быть в формате SVG, эмодзи в коде запрещены.

### ✅ Статус исправления эмодзи (09.05.2026)
- [x] `BottomNav.jsx` — SVG иконки
- [x] `ChatInterface.jsx` — SVG иконки
- [x] `PhoneContainer.jsx` — SVG иконки
- [x] `Profile.jsx` — SVG иконки
- [x] `SourcesFooter.jsx` — SVG иконки
- [x] `InfoPanel.jsx` — SVG иконки
- [x] `DigitalTwin.jsx` — SVG иконки
- [x] `InterventionsPanel.jsx` — SVG иконки
- [x] `ProgressPath.jsx` — SVG иконки
- [x] `ui_library.html` — SVG иконки

**Сборка:** `npm run build` — успешно
**Проверка эмодзи:** 0 matches

---

## Беклог

### Реализованные компоненты (v2.0)

| ID | Компонент | Описание | Файл | Статус |
|----|-----------|----------|------|--------|
| `DT_001` | Profile Header Card | Карточка профиля с фото 150x150, мета-данными, кнопками действий | `DigitalTwin.jsx` | ✅ Готово |
| `DT_002` | Attribute Catalog Table | Таблица атрибутов с 6 колонками (Код, Параметр, Текущее, Цель, Норма, Интервенции) | `DigitalTwin.jsx` | ✅ Готово |
| `DT_003` | Section Collapse | Сворачиваемые секции по категориям (Демография, Витальные, Лаборатории, Образ жизни, Генетика, Медицина) | `DigitalTwin.jsx` | ✅ Готово |
| `DT_004` | Target Badges | Бейджи целей в Profile Header с цветовой подсветкой по alert-статусу | `DigitalTwin.jsx` | ✅ Готово |
| `DT_005` | Intervention Popup | Popup с деталями интервенции (код, название, описание, impact, biomarkers, регулярность) | `DigitalTwin.jsx` | ✅ Готово |
| `DT_006` | Timeline by Categories | Таймлайн интервенций по категориям (sleep, physical, mental, food, medical, supplement) | `DigitalTwin.jsx` | ✅ Готово |
| `DT_007` | Health Assessment | Оценка здоровья с анализом BMI, BP, HR, glucose, cholesterol, sleep, stress, vitamin D | `DigitalTwin.jsx` | ✅ Готово |
| `DT_008` | Target Edit | Редактирование целей в таблице с ± кнопками и inline input | `DigitalTwin.jsx` | ✅ Готово |

### Компоненты в разработке

| ID | Компонент | Описание | Приоритет |
|----|-----------|----------|-----------|
| `DT_009` | Target Selection | Выбор целей (чекбоксы) с фильтрацией интервенций | Высокий |
| `DT_010` | Profile CRUD | Создание/редактирование/удаление профилей | Высокий |
| `DT_011` | Photo Selector Modal | Выбор фото из галереи для профиля | Средний |
| `DT_012` | Progress Visualization | Визуализация прогресса по целям (графики, прогресс-бары) | Средний |
| `DT_013` | Export Plan | Экспорт плана интервенций (PDF, CSV) | Низкий |

### Запланированные улучшения

| ID | Улучшение | Описание |
|----|-----------|----------|
| `IMPR_001` | Responsive Layout | Адаптивная верстка для мобильных устройств |
| `IMPR_002` | Animation | Анимации переходов и микро-взаимодействий |
| `IMPR_003` | Dark Mode | Поддержка темной темы |

---

## Digital Twin

### Profile Header Card

Карточка профиля отображается в верхней части панели Digital Twin.

**Структура:**
```html
<div class="profile-header-card">
  <img class="profile-header-photo" src="..." />
  <div class="profile-header-content">
    <div class="profile-header-top">
      <div class="profile-header-info">
        <h2 class="profile-header-name">...</h2>
        <div class="profile-header-meta">
          <span>возраст лет</span>
          <span>М/Ж</span>
          <span class="profile-stars">★ stars</span>
        </div>
      </div>
      <div class="profile-header-actions">
        <button class="assess-health-btn">Оценить здоровье</button>
        <button class="assess-health-btn generate-btn">Создать план</button>
      </div>
    </div>
    <div class="profile-targets">
      <span class="targets-label">Цели:</span>
      <div class="targets-badges">
        <span class="target-badge">
          <span class="target-badge-dot"></span>
          <span class="target-badge-name">...</span>
          <span class="target-badge-value">...ед.</span>
        </span>
      </div>
    </div>
  </div>
</div>
```

**Стили:**
- Фото: `150x150px`, `border-radius: 12px`, `border: 3px solid white`, `box-shadow`
- Фон карточки: градиент `#ede7f5` → `#e3f2fd`, `border-radius: 12px`, `border: 1px solid #d1c4e9`
- Кнопки: фиолетовый `#6b21c8`, hover `#5a189a`, disabled `#b39ddb` (opacity: 0.7)
- Бейджи целей: белый фон, `border-radius: 20px`, цветные точки по категориям
- Цветовая маркировка: critical `#ffebee`/`#d50000`, warning `#fff8e1`/`#ff9100`, good `#e8f5e9`/`#00c853`

**Состояния:**
- Default: базовые стили
- Hover (кнопки): `transform: scale(1.02)`, darker background
- Disabled (Создать план): `opacity: 0.7`, `cursor: not-allowed`

### Attribute Catalog Table

Таблица атрибутов с группировкой по 6 категориям.

**Структура:**
```html
<div class="data-panel">
  <div class="data-section" style="border-left: 3px solid {color}">
    <div class="section-header">
      <div class="section-title-row">
        <span class="section-dot" style="background-color: {color}"></span>
        <h4>01 Демография</h4>
      </div>
      <button class="collapse-btn">...</button>
    </div>
    <div class="attr-table">
      <div class="attr-row header">
        <span>Код</span><span>Параметр</span><span>Текущее</span><span>Цель</span><span>Норма</span><span>Интервенции</span>
      </div>
      <div class="attr-row">
        <span class="attr-code">01_1_DEMO_AGE</span>
        <span class="attr-name">Возраст</span>
        <div class="attr-cell current">...</div>
        <div class="attr-cell target">[-] [input] [+] </div>
        <span class="attr-cell norm">18-65</span>
        <div class="attr-cell interventions">
          <div class="interv-group">
            <span class="interv-count">4</span>
            <div class="interv-badges">
              <div class="interv-badge-item">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Стили:**
- Grid: `90px | 130px | 110px | 90px | 55px | 1fr`
- Header: sticky, uppercase, letter-spacing 0.5px
- Категории (border-left): Демография `#6b21c8`, Витальные `#1976d2`, Лаборатории `#0288d1`, Образ жизни `#388e3c`, Генетика `#7b1fa2`, Медицина `#c62828`

**Цветовая маркировка строк:**
- Critical: `background: #ffebee`
- Warning: `background: #fff8e1`
- Good: `background: #e8f5e9`

### Timeline

См. компонент `DAWContainer` в `DigitalTwin.jsx`.

**Заголовок (daw-header):**
```html
<div class="daw-header">
  <div class="daw-title">План интервенций</div>
  <div class="daw-controls">
    <button class="daw-btn">Копировать</button>  <!-- SVG: clipboard icon -->
    <button class="daw-btn">Очистить</button>     <!-- SVG: trash icon -->
    <button class="daw-btn">Стоп/Старт</button>
    <div class="daw-day-display">День: X/90</div>
    <div class="zoom-controls">[-] 100% [+] </div>
  </div>
</div>
```

**Кнопки:**
- `Копировать`: копирует план в буфер как JSON (format: `{day, code, name, category}`)
- `Очистить`: удаляет все интервенции из timeline
- `Старт/Стоп`: запускает/останавливает симуляцию

**Стили:**
- Кнопки: белый фон, border `#e0e0e0`, border-radius 4px, font-size 12px
- Hover: `#f5f5f5`, border `#bdbdbd`
- Active: `transform: scale(0.98)`

---

## 📦 Ссылки

- **UI Library:** `assets/ui_library.html`
- **Прототип телефона:** `../prototype/phone_mockup.html`
- **База витаминов:** `../domain/vitamin/`
- **Digital Twin Catalog:** `../domain/digital-twin/Каталог Атрибутов Digital Twin.md`
- **CJM:** `../domain/cjm/DIGITAL_TWIN_PLANNING.md`
