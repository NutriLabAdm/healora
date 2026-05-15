# Healora Backlog
> ver 0.10.3 | 13.05.2026, 07:25
> **101**/128 задач · **312**/670 ч

## Recent Updates (14–15.05.2026)

### 15.05.2026
- [x] **Voice popup redesign** — Always-visible form with per-field inputs, settings gear (language 8 langs, mic device picker with level meter via AnalyserNode), transcript preview with correction, per-field record button (10 ч)
- [x] **Parameter history** — profileOverrides + paramHistory in localStorage, getAttrCurrent helper, 7 weekday columns in attr table showing recent values (6 ч)
- [x] **Export twin data** — JSON download with profile, overrides, history, plans, interventions (1 ч)
- [x] **Preference badges** — Toggle badges (вегетарианство, только РКИ) + custom text field, persisted in localStorage, included in export (2 ч)
- [x] **Icon cleanup** — Mic icon→pencil edit icon in section header, voice popup header, per-field buttons (1 ч)
- [x] **Profile header mic→edit** — Mic button moved to bullet position, opens editor popup (1 ч)
- [x] **Weekday column fix** — Only show changed values (differs from `attr.current`), loose comparison fixes false negatives (1.5 ч)
- [x] **Protocol picker checkbox** — ☐/☑ replaces row background highlight for selection state (1 ч)
- [x] **Practice name+applic 2 lines** — Vertical stack layout in protocol picker rows (0.5 ч)
- [x] **13 practice descriptions** — MD files in `docs/domain/med_traditional_practices/` with 8 sections each (3 ч)
- [x] **Practice popup** — Build-time `import.meta.glob` loads MD, regulatory-info banner, full markdown renderer (3 ч)
- [x] **Интегративная медицина regulatory** — Made official: true, added regulatory text (0.5 ч)
- [x] **Prohibitions in practice MDs** — Section added to all 13 files (1 ч)
- [x] **RCT/publication refs** — Key references added to section 6 of all 13 practice MDs (1 ч)

### 14.05.2026
- [x] **Inline edit persistence** — saveEdit writes to profileOverrides + paramHistory (2 ч)
- [x] **Weekday columns** — 7 columns (today + 6 previous) in attr grid, CSS grid `repeat(7, 45px)` (3 ч)
- [x] **Deploy cleanup** — Stale asset cleanup on server (0.5 ч)

## Recent Updates (12–13.05.2026)

### 13.05.2026
- [x] **Backlog modal** — Displays structured BACKLOG.md view (✓/□ checkboxes, h2/h3 headers, hr, clickable repo link, version footer) (3 ч)
- [x] **Chat interface** — Full chat UI with intervention cards (checkbox, points, category badge), task states (not started → in progress → completed with animation), optimistic UI instant points update, colorful timeline badges grouped by day (12 ч)
- [x] **Treatment plans** — Medical prescription popup layout with protocols/interventions table, plan per twin in localStorage, plan status badge in profile header (8 ч)
- [x] **Collapsible track timeline** — N интервенций · M всего summary line, chevron toggle (16px SVG), Дни/Недели/Фазы view switcher (4 ч)
- [x] **Plan search dropdown** — Searchable window by client name/ID, lists all saved plans with counts and status (3 ч)
- [x] **Enhanced intervention log** — Day separators with date (YYYY.MM.DD), day navigation buttons (◀ Все дни ▶), plan tasks badge with popup, activated/skipped row highlighting, stars display, filter by selected day (5 ч)
- [x] **Tasks popup** — Lists unique plan intervention codes with name, assignment count, completed count, percentage (2 ч)
- [x] **Plan prescription table** — Alternating rows (#fafaff), hover (#f0edff), purple protocol/intervention status dots (2 ч)

### 12.05.2026 (afternoon)
- [x] **Supplements catalog** — Loaded from `supplements_catalog.json` with group field (vitamins/vitamin-like/minerals), classification (мед/нутри), popup detail view (4 ч)
- [x] **Diets catalog** — Loaded from `diets_catalog.json` with foodGroup field (diet/habit), subgroup filter buttons (3 ч)
- [x] **Protocol cards** — Expand/collapse with red flags (🚩), recommendations, category badges, danger style for Ozempic protocol (5 ч)
- [x] **Intervention detail popup** — Shows description, category, impact/10, evidence (A–D), regularity, linked protocols (3 ч)
- [x] **Legend popup** — I/E/Per explanation with examples (I: 1–10, E: A–D, Per: D/W/M/Y/P) (1 ч)
- [x] **Cart widgets panel** — Compact badges with remove button, "Заказать План" button, item count (2 ч)
- [x] **Tab split** — Интервенции / Протоколы tabs in interventions panel (2 ч)
- [x] **Chat timeline badges** — Colored intervention badges in rows grouped by day, opacity matches timeline dots (1/0.2), filtered to simulationDay-3 window (4 ч)
- [x] **Stop button** — Chat header stop button (1 ч)
- [x] **Profile-id** — Hidden by default, shown on card hover (below avatar + parentheses after name) (2 ч)
- [x] **Panels resize** — 200px sidebar / 320px interventions panel (1 ч)
- [x] **Main-content padding** — Reduced to 7px (0.5 ч)
- [x] **UserAvatarPanel styles** — Moved from inline to CSS (1 ч)
- [x] **Vite config fix** — loadEnv for base path to avoid Git Bash BASE_PATH conflict (2 ч)
- [x] **Diary storage** — API (JSON POST/GET), UI with day switching, food photo display, KBZU, NDI (6 ч)
- [x] **Proxy config** — Vite dev proxy + nginx prod config (2 ч)
- [x] **Duplicate CSS removal** — .profile-card dups cleaned from shared.css (1 ч)
- [x] **Backlog-modal width** — Increased to 580px (0.5 ч)
- [x] **Favicon** — Added to www root + digital-twin subfolder (1 ч)

---

## MVP (Phase 1: 1-3 months)

### Core UX
- [x] **Backlog Modal** — Structured BACKLOG.md view with version info (3 ч)
- [x] **Favicon** — Add favicon.svg to www root, fix 404 error (1 ч)
- [x] **Profile-screen** — Fix switchScreen() to locate profile-screen div (2 ч)
- [x] **Context Tips Panel** — Add bottom 15% panel with explanations in info-panel (3 ч)
- [x] **Drag & Drop Logging** — Log drag actions to right "Under the Hood" panel (2 ч)
- [x] **Close Button** — Ensure redirect to https://healora.ru/ (1 ч)

### Onboarding
- [ ] **Slide 1** — Stars motivation screen (earn stars for completed tasks) (4 ч)
- [ ] **Slide 2** — 5 upgrade directions (Knowledge, Activity, Recovery, Nutrition, Specialists) (3 ч)
- [ ] **Slide 3** — Quick level test intro (3 ч)
- [ ] **Quiz** — 5 questions to calculate Healora Score (0-100) (6 ч)
- [ ] **Quiz Logic** — Map score to tiers (Emerging → Transformational) (4 ч)

### Chat Interface (Сообщения)
- [x] **Chat Timeline Badges** — Colored intervention badges in rows, grouped by day, opacity matched (4 ч)
- [x] **Badge Filter** — Filtered to simulationDay-3 window (2 ч)
- [x] **Stop Button** — Chat header stop button (1 ч)
- [x] **Full Badge History** — Show full history in chat (2 ч)
- [x] **Task Cards** — Cards with checkbox, points, category badge (6 ч)
- [x] **States** — Not started → In progress → Completed (with animation) (4 ч)
- [x] **Optimistic UI** — Instant points update (3 ч)
- [ ] **Filters** — All, Питание, Активность, Знания badges (3 ч)

### Intervention Buttons
- [ ] **"Что поесть"** — Nutrition recommendations (4 ч)
- [ ] **"Что почитать"** — PubMed articles (3 ч)
- [ ] **"Научи"** — Scientific facts and mechanisms (3 ч)
- [ ] **"Новости"** — Weight management latest discoveries (3 ч)

### Navigation (Bottom)
- [x] **Сообщения** — Chat/tasks screen (4 ч)
- [x] **Путь** — Longevity Path progress (3 ч)
- [x] **Цели** — Goal tracking (weight, activity, sleep) (4 ч)
- [x] **Профиль** — Stats, level, stars, 52 biomedical parameters (5 ч)

### Digital Twin
- [x] **Enhanced Intervention Log** — Day separators with date, day navigation buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter (5 ч)
- [x] **Tasks Popup** — Unique plan intervention codes with assignment count, completed count, percentage (2 ч)
- [x] **Plan Search Dropdown** — Searchable by client name/ID, lists all saved plans with counts and status (4 ч)
- [x] **Collapsible Track Timeline** — Summary line, chevron toggle, Дни/Недели/Фазы view switcher (4 ч)
- [x] **Plan Prescription Table** — Alternating rows (#fafaff), hover (#f0edff), purple status dots (2 ч)
- [x] **Protocol Cards** — Expand/collapse with red flags, recommendations, category badges, protocol-danger style (6 ч)
- [x] **Supplements Catalog** — Groups (vitamins/vitamin-like/minerals), classification (мед/нутри), detail popup (5 ч)
- [x] **Diets Catalog** — Food groups (diet/habit), subgroup filters (3 ч)
- [x] **Intervention Detail Popup** — Description, category, impact, evidence, regularity, linked protocols (3 ч)
- [x] **Legend Popup** — I/E/Per explanations with examples (1 ч)
- [x] **Cart Widgets Panel** — Compact badges, order plan button, remove from cart (2 ч)
- [x] **Tab Split** — Интервенции / Протоколы tabs (2 ч)
- [x] **Treatment Plan Popup** — Medical prescription layout with protocols/interventions table (8 ч)
- [x] **Plan per twin** — Each twin has own plan stored in localStorage via PlansProvider context (6 ч)
- [x] **Plan Status Badge** — Inline indicator in profile-header-card (protocol/intervention counts) (3 ч)
- [x] **Interventions Panel** — 290px wide, category filters (6 ч)
- [x] **Category Badge Colors** — Per-category `.cat-*`/`.sup-*`/`.food-*` styles in separate CSS (2 ч)
- [x] **Action Buttons** — Green/blue/orange/purple per button role (3 ч)
- [x] **Simulation 30 days** — Reduced from 90 to 30 days across all locations (1 ч)
- [x] **Empty Plan Guide** — Positive wishes + step-by-step guidance when no interventions (2 ч)
- [x] **Data Sources Panel** (left) — Draggable items: Wearables, Voice, Medical, Food Photos, Genetics, Mental (6 ч)
- [x] **Drop Zone** — Accept dropped sources → trigger AI analysis (3 ч)
- [x] **ML Model Stub** — Input (HRrest, HRpeak, HRR, BMI, waist, BP) → risk output (4 ч)
- [ ] **Adaptivity** — Difficulty based on Health Literacy Score (5 ч)

### Points System
- [ ] **Basic Tasks** — 5-10 points (water, steps, sleep) (3 ч)
- [ ] **Medium Tasks** — 15-25 points (recipes, 20-30 min workouts) (3 ч)
- [ ] **Hard Tasks** — 30-50 points (meal prep, sugar-free) (3 ч)
- [ ] **Streak Bonus** — +5 for consecutive days (2 ч)
- [ ] **On-time Bonus** — +10 for completing in time (2 ч)
- [ ] **No penalties** — Positive reinforcement only (1 ч)

### Categories (5 tracks)
- [ ] **Знания** — Knowledge tasks (320 pts example) (2 ч)
- [ ] **Активность** — Activity tasks (280 pts example) (2 ч)
- [ ] **Восстановление** — Recovery tasks (140 pts example) (2 ч)
- [ ] **Питание** — Nutrition tasks (240 pts example) (2 ч)
- [ ] **Специалисты** — Specialists tasks (180 pts example) (2 ч)

### Goals & Progress
- [x] **Weight Goal** — Track weight loss progress (-3.2kg / -5kg) (4 ч)
- [x] **Activity Goal** — Steps tracking (8,432 / 10,000) (3 ч)
- [x] **Sleep Goal** — Hours tracking (7.5h / 8h) (3 ч)
- [x] **Progress Bars** — Visual percentage display (3 ч)
- [x] **Healora Score** — 6-metric radar chart, stars display, profile health assessment (8 ч)
- [x] **Health Radar** — SVG radar chart (sleep, stress, steps, BMI, BP, glucose) (6 ч)

### Achievements
- [ ] **Первый шаг** — 3 tasks in a row (2 ч)
- [ ] **На огне** — 7 days without missing (2 ч)
- [ ] **Баланс** — ≥50 points in each category per week (2 ч)
- [ ] **Минус 2 кг** — Weight tracker integration (2 ч)

### Under the Hood Panel
- [ ] **Healora Score Display** — Show current tier and score (3 ч)
- [ ] **Action Log** — Log: completed tasks, uploads, quiz results, bonuses (4 ч)
- [ ] **Technical Info** — Show risk assessment output (2 ч)

### Profile & Assets
- [x] **Profile-id UI** — Hidden by default, shown on card hover (below avatar + parentheses) (2 ч)
- [x] **Panel Resize** — Sidebar 200px, interventions panel 320px (1 ч)
- [x] **Main-content padding** — Reduced to 7px (0.5 ч)
- [x] **UserAvatarPanel CSS** — Extracted from inline to dedicated stylesheet (1 ч)
- [x] **Profile Photos** — 30 avatar images with 32×32 and 150×150 thumbnails (4 ч)
- [x] **Image Optimization** — PNG8 quantization, ≤512KB per source image (3 ч)
- [x] **Classification Rename** — "Медицинский" → "мед", "Нутрицевтик" → "нутри" (1 ч)

### Plan Templates
- [x] **Template Library** — 11 protocol-aligned treatment plan templates (markdown + JS module) (8 ч)
- [x] **Plan Popup Redesign** — Medical prescription header, template selector, QR code, PDF export (6 ч)
- [x] **QR Code** — qrcode.react v4 (QRCodeSVG) for plan sharing (2 ч)

### Infrastructure
- [x] **Vite config fix** — loadEnv for base path, Git Bash BASE_PATH conflict resolved (2 ч)
- [x] **Diary storage API** — JSON POST/GET endpoints with profile_id + day validation (6 ч)
- [x] **Proxy config** — Vite dev proxy + nginx production config (2 ч)
- [x] **Duplicate CSS cleanup** — Removed .profile-card dups from shared.css (1 ч)

---

## V1 (Phase 2: 4-8 months)

- [ ] **Liquid Biopsy Integration** — Blood test results import (16 ч)
- [ ] **Bayesian Calibration** — probabilistic health scoring (12 ч)
- [ ] **Wearable Sync** — Apple Watch, Oura, Whoop API integration (20 ч)
- [ ] **Genetic Data Import** — 23andMe, AncestryDNA parser (12 ч)
- [ ] **Food Photo Analysis** — Computer vision KBJU calculation (16 ч)
- [ ] **Voice Input** — Speech-to-text symptom logging (8 ч)
- [ ] **Advanced ML Model** — Multi-parameter risk prediction (24 ч)

---

## Scale (Phase 3: 9-18 months)

- [ ] **RL Optimizer** — Reinforcement learning for task recommendations (40 ч)
- [ ] **FDA/EMA Pathway** — Regulatory compliance (80 ч)
- [ ] **B2B White-label API** — For clinics (40 ч)
- [ ] **Pro Plan for Nutriologists** — $49/month, saves 10h/week (30 ч)
- [ ] **Genetic Add-on** — $29.99 one-time upsell (10 ч)

---

## Tech Stack
- Frontend: React + Vite (JSX components)
- Backend: Beget server (217.114.8.5), Node.js API
- Deploy: devops.sh script
- Repo: https://github.com/NutriLabAdm/healora
- Storage: localStorage for per-twin plans (PlansProvider context)
- QR: qrcode.react v4 (QRCodeSVG)
- Charts: SVG inline (no heavy lib)

---

*Created: April 2026 | ver 0.10.3 | Based on PRODUCT_DESCRIPTION.md*
