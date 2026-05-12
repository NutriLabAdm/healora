# Healora Backlog

## MVP (Phase 1: 1-3 months)

### Core UX
- [ ] **Favicon** — Add favicon.svg to www root, fix 404 error
- [ ] **Profile-screen** — Fix switchScreen() to locate profile-screen div
- [ ] **Context Tips Panel** — Add bottom 15% panel with explanations in info-panel
- [ ] **Drag & Drop Logging** — Log drag actions to right "Under the Hood" panel
- [ ] **Close Button** — Ensure redirect to https://healora.ru/

### Onboarding
- [ ] **Slide 1** — Stars motivation screen (earn stars for completed tasks)
- [ ] **Slide 2** — 5 upgrade directions (Knowledge, Activity, Recovery, Nutrition, Specialists)
- [ ] **Slide 3** — Quick level test intro
- [ ] **Quiz** — 5 questions to calculate Healora Score (0-100)
- [ ] **Quiz Logic** — Map score to tiers (Emerging → Transformational)

### Chat Interface (Сообщения)
- [ ] **Task Cards** — Cards with checkbox, points, category badge
- [ ] **States** — Not started → In progress → Completed (with animation)
- [ ] **Optimistic UI** — Instant points update
- [ ] **Filters** — All, Питание, Активность, Знания badges

### Intervention Buttons
- [ ] **"Что поесть"** — Nutrition recommendations
- [ ] **"Что почитать"** — PubMed articles
- [ ] **"Научи"** — Scientific facts and mechanisms
- [ ] **"Новости"** — Weight management latest discoveries

### Navigation (Bottom)
- [ ] **Сообщения** — Chat/tasks screen
- [ ] **Путь** — Longevity Path progress
- [ ] **Цели** — Goal tracking (weight, activity, sleep)
- [ ] **Профиль** — Stats, level, stars, 52 biomedical parameters

### Digital Twin
- [ ] **Data Sources Panel** (left) — Draggable items:
  - [ ] Wearables (HRV, sleep, steps)
  - [ ] Voice (symptoms, notes input)
  - [ ] Medical (blood tests)
  - [ ] Food Photos (KBJU calculation)
  - [ ] Genetics (23andMe integration)
  - [ ] Mental (meditation, stress, HRV)
- [ ] **Drop Zone** — Accept dropped sources → trigger AI analysis
- [ ] **ML Model Stub** — Input (HRrest, HRpeak, HRR, BMI, waist, BP) → risk output
- [ ] **Adaptivity** — Difficulty based on Health Literacy Score

### Points System
- [ ] **Basic Tasks** — 5-10 points (water, steps, sleep)
- [ ] **Medium Tasks** — 15-25 points (recipes, 20-30 min workouts)
- [ ] **Hard Tasks** — 30-50 points (meal prep, sugar-free)
- [ ] **Streak Bonus** — +5 for consecutive days
- [ ] **On-time Bonus** — +10 for completing in time
- [ ] **No penalties** — Positive reinforcement only

### Categories (5 tracks)
- [ ] **Знания** — Knowledge tasks (320 pts example)
- [ ] **Активность** — Activity tasks (280 pts example)
- [ ] **Восстановление** — Recovery tasks (140 pts example)
- [ ] **Питание** — Nutrition tasks (240 pts example)
- [ ] **Специалисты** — Specialists tasks (180 pts example)

### Goals & Progress
- [ ] **Weight Goal** — Track weight loss progress (-3.2kg / -5kg)
- [ ] **Activity Goal** — Steps tracking (8,432 / 10,000)
- [ ] **Sleep Goal** — Hours tracking (7.5h / 8h)
- [ ] **Progress Bars** — Visual percentage display

### Achievements
- [ ] **Первый шаг** — 3 tasks in a row
- [ ] **На огне** — 7 days without missing
- [ ] **Баланс** — ≥50 points in each category per week
- [ ] **Минус 2 кг** — Weight tracker integration

### Under the Hood Panel
- [ ] **Healora Score Display** — Show current tier and score
- [ ] **Action Log** — Log: completed tasks, uploads, quiz results, bonuses
- [ ] **Technical Info** — Show risk assessment output

---

## V1 (Phase 2: 4-8 months)

- [ ] **Liquid Biopsy Integration** — Blood test results import
- [ ] **Bayesian Calibration** — probabilistic health scoring
- [ ] **Wearable Sync** — Apple Watch, Oura, Whoop API integration
- [ ] **Genetic Data Import** — 23andMe, AncestryDNA parser
- [ ] **Food Photo Analysis** — Computer vision KBJU calculation
- [ ] **Voice Input** — Speech-to-text symptom logging
- [ ] **Advanced ML Model** — Multi-parameter risk prediction

---

## Scale (Phase 3: 9-18 months)

- [ ] **RL Optimizer** — Reinforcement learning for task recommendations
- [ ] **FDA/EMA Pathway** — Regulatory compliance
- [ ] **B2B White-label API** — For clinics
- [ ] **Pro Plan for Nutriologists** — $49/month, saves 10h/week
- [ ] **Genetic Add-on** — $29.99 one-time upsell

---

## Tech Stack
- Frontend: HTML/CSS/JS (static prototype)
- Backend: Beget server (217.114.8.5)
- Deploy: devops.sh script
- Repo: https://github.com/NutriLabAdm/healora

---

*Created: April 2026 | Based on PRODUCT_DESCRIPTION.md*