# Healora Mobile App — Backlog

> ver 0.3.0 | 25.05.2026
> Stack: React Native CLI · Phone-first · iOS + Android + Enterprise

---

## Environment Setup (Blockers)

> **Основание:** Node.js 20.17.0 < required 20.19.4, Java 1.8 < required JDK 17+

- [x] **ENV.1 Install fnm (Fast Node Manager)** — winget install Schniz.fnm (альтернатива nvm) (+1 ч)
- [x] **ENV.2 Node.js 22.14.0 LTS** — `fnm install 22.14.0` + .nvmrc в mobile/ (+0.5 ч)
- [x] **ENV.3 Java 21 JDK (Temurin)** — Eclipse Temurin JDK 21.0.11.10 установлен (+1 ч)
- [x] **ENV.3b Java 17 JDK (Temurin)** — JDK 17.0.19.10 установлен (требуется Gradle toolchain для RN settings-plugin) (+0.5 ч)
- [x] **ENV.4 JAVA_HOME настроен** — `JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot` (+0.5 ч)

## Backend Auth (v1: file-based) ✅

> **Решение:** bcryptjs + jsonwebtoken + users.json. PostgreSQL — после MVP.
> **Статус: реализовано 24.05.2026**

- [x] **AUTH.1 Install deps** — `npm install bcryptjs jsonwebtoken uuid` в api/ (+0.5 ч)
- [x] **AUTH.2 userStorage module** — `api/userStorage.js`: CRUD для users.json, bcrypt хэши (+3 ч)
- [x] **AUTH.3 JWT middleware** — `api/middleware.js`: requireAuth + optionalAuth (+2 ч)
- [x] **AUTH.4 POST /api/auth/register** — Email + password → bcrypt → JWT (+3 ч)
- [x] **AUTH.5 POST /api/auth/login** — Email + password → verify → JWT (+ refresh) (+2 ч)
- [x] **AUTH.6 POST /api/auth/refresh** — Refresh token → новый JWT (+2 ч)
- [x] **AUTH.7 GET /api/auth/me** — Текущий пользователь по JWT (+1 ч)
- [x] **AUTH.8 POST /api/auth/biometric** — Регистрация biometric key (+2 ч)
- [x] **AUTH.9 Защита существующих роутов** — optionalAuth на /api/*, requireAuth на /api/auth/me (+2 ч)

## Спринт 0: Foundation (Infrastructure)

### 0.1 Project Scaffolding

- [x] **0.1.1 Init React Native CLI project** — `npx react-native init HealoraMobile`, TypeScript template (+8 ч)
- [x] **0.1.2 Navigation shell** — React Navigation v7: Stack + Bottom Tabs + Deep Linking config (+4 ч)
- [x] **0.1.3 Theme system** — Порт UI Kit из веба: цвета, типографика (Sora/DM Sans), spacing, shadows (+6 ч)
- [x] **0.1.4 State management** — Выбор и настройка (Zustand / React Query / Context). Рекомендация: Zustand + React Query (+4 ч)
- [x] **0.1.5 API client** — Axios/fetch wrapper, base URL, JWT-авторизация, refresh token (+6 ч)
- [ ] **0.1.6 Error boundary + crash reporting** — Sentry / Firebase Crashlytics, глобальный ErrorBoundary (+4 ч)
- [ ] **0.1.7 CI/CD** — Fastlane + GitHub Actions: сборка, подпись, деплой в TestFlight / Play Console (+12 ч)
- [ ] **0.1.8 Enterprise distribution** — MDM-совместимая сборка (App Center / Firebase App Distribution) (+6 ч)

### 0.5 Mobile API (Backend доработки)

> **Основание:** API Audit — текущий API не имеет auth, streaming, upload, PATCH, push

- [x] **0.5.1 Auth перенесён в Backend Auth (file-based)** — Решение: bcryptjs + JWT + users.json вместо PostgreSQL для MVP
- [x] **0.5.2 `PATCH /api/profiles/:id`** — Deep merge partial update + валидация полей (+4 ч → ~2.5 ч)
- [x] **0.5.7 `POST /api/upload/image`** — Multipart upload (multer), nginx static через /uploads/ (+6 ч → ~2 ч)
- [x] **0.5.8 `POST /api/upload/audio`** — Multipart upload (multer), 20MB лимит (+4 ч → ~1 ч)
- [ ] **0.5.9 `POST /api/notifications/register`** — FCM/APNS token registration (+3 ч)
- [ ] **0.5.10 `DELETE /api/notifications/register`** — Remove push token при logout (+2 ч)
- [ ] **0.5.11 `GET /api/chat/stream`** — SSE streaming endpoint для чата (+10 ч)
- [ ] **0.5.12 Data migration (PostgreSQL later)** — Запланировано после MVP (+12 ч)

### 0.2 Shared Components (Design System)

- [ ] **0.2.1 UI primitives** — Button, Text, Card, Badge, ProgressBar, Icon (SVG from web), Chip (+10 ч)
- [ ] **0.2.2 Navigation components** — BottomTabBar, TopTabs, Header, BackButton (+6 ч)
- [ ] **0.2.3 Feedback components** — Toast, Modal, BottomSheet, LoadingOverlay (+6 ч)
- [ ] **0.2.4 Form components** — Input, Select, DatePicker, Slider, Toggle (+6 ч)
- [ ] **0.2.5 Charts** — Порт SVG-чартов с веба (Radar, Progress, Bar) в React Native SVG (+8 ч)

---

## Спринт 1: Authentication & Onboarding

- [x] **1.1 Auth screens (partial)** — LoginScreen + RegisterScreen (email/password), нет ForgotPassword (+10 ч → ~6 ч)
- [ ] **1.2 Biometric auth** — FaceID / TouchID / fingerprint для быстрого входа (+6 ч)
- [ ] **1.3 Onboarding** — 3 слайда + Quiz (порт с веба: звёзды, 5 направлений, quick test) (+12 ч)
- [ ] **1.4 Deep Linking** — Настройка схем (healora://plan/{id}, healora://profile/{id}) (+6 ч)
- [ ] **1.5 JWT storage** — SecureStore (expo-secure-store / react-native-keychain) для токенов (+4 ч)

---

## Спринт 2: Core Screens (Digital Twin)

### 2.1 Dashboard

- [ ] **2.1.1 Dashboard screen** — Приветствие, Healora Score, звёзды, summary дня (+8 ч)
- [ ] **2.1.2 Avatar panel** — Порт UserAvatarPanel: фото, имя, уровень, риск (+4 ч)
- [ ] **2.1.3 Quick stats cards** — Сон, шаги, вес, КБЖУ сегодня (+6 ч)
- [ ] **2.1.4 Today's interventions** — Список интервенций на сегодня с check-in (+8 ч)

### 2.2 Profile (Цифровой двойник)

- [ ] **2.2.1 Profile screen** — Порт ProfileView: секции с редактированием (+12 ч)
- [ ] **2.2.2 Inline edit** — Редактирование параметров, история изменений (+8 ч)
- [ ] **2.2.3 Parameter history chart** — 7-дневная визуализация изменений (+6 ч)

### 2.3 Plan (План терапии)

- [ ] **2.3.1 Plan list** — Список планов пользователя (порт PlanList) (+6 ч)
- [ ] **2.3.2 Plan detail** — Просмотр плана: интервенции, прогресс, статус (+10 ч)
- [ ] **2.3.3 Plan-Journal view** — Порт PlanJournalView: дни, check-in, прогресс-бар (+12 ч)
- [ ] **2.3.4 Goal badges** — Порт GoalBadges: выбор цели, генерация плана (+8 ч)
- [ ] **2.3.5 HITL approval** — Экран утверждения плана врачом (+6 ч)

### 2.4 Chat (AI-ассистент)

- [ ] **2.4.1 Chat screen** — Порт ChatInterface: лента сообщений, typing indicator (+10 ч)
- [ ] **2.4.2 Rich messages** — Intervention badges, food cards, voice messages (+8 ч)
- [ ] **2.4.3 Quick action buttons** — "Задания на день", "Совет", "Рандом" (+4 ч)
- [ ] **2.4.4 Provider toggle** — GigaChat / GPT переключение (+3 ч)

### 2.5 Diary (Дневник)

- [ ] **2.5.1 Meal diary** — 4 приёма пищи: фото, описание, КБЖУ (+12 ч)
- [ ] **2.5.2 Camera integration** — Съёмка еды, галерея, crop (+8 ч)
- [ ] **2.5.3 Wellbeing tracker** — Энергия, настроение, сон, стресс, пищеварение (+6 ч)
- [ ] **2.5.4 Water tracker** — Слайдер объёма воды (+3 ч)
- [ ] **2.5.5 Voice notes** — Голосовые заметки к дневнику (+4 ч)

### 2.6 Progress Path (Путь)

- [ ] **2.6.1 Progress path screen** — Визуализация прогресса, фазы, completion % (+8 ч)
- [ ] **2.6.2 Goals tracking** — Цели: вес, активность, сон (+6 ч)
- [ ] **2.6.3 Achievements** — Бейджи: "Первый шаг", "На огне", "Баланс", "Минус 2 кг" (+8 ч)

---

## Спринт 3: Mobile-Specific Features

### 3.1 Push Notifications

- [ ] **3.1.1 FCM + APNS setup** — Firebase Cloud Messaging, Apple Push Notification Service (+8 ч)
- [ ] **3.1.2 Notification scheduling** — Напоминания о интервенциях по расписанию (+6 ч)
- [ ] **3.1.3 Motivational notifications** — Ежедневные/еженедельные отчёты прогресса (+4 ч)
- [ ] **3.1.4 Notification deep links** — Тап по уведомлению → нужный экран (+4 ч)

### 3.2 Camera & Image Processing

- [ ] **3.2.1 Camera screen** — Кастомная камера для фото еды (react-native-vision-camera) (+10 ч)
- [ ] **3.2.2 Image upload** — Сжатие, загрузка на сервер, привязка к meal entry (+6 ч)
- [ ] **3.2.3 Food photo analysis stub** — Отправка фото на AI-анализ (+6 ч)

### 3.3 Voice Input

- [ ] **3.3.1 Speech-to-Text** — Нативная STT (iOS Speech / Android SpeechRecognizer) (+8 ч)
- [ ] **3.3.2 Voice popup** — Порт VoicePopup: язык, микрофон, level meter, transcript (+8 ч)
- [ ] **3.3.3 Voice command dispatch** — Распознанное → заполнение поля или действие (+4 ч)

### 3.4 Offline Mode

- [ ] **3.4.1 Local storage layer** — WatermelonDB / MMKV для кэширования профиля и плана (+12 ч)
- [ ] **3.4.2 Offline check-in** — Отметка интервенций без интернета, sync при подключении (+8 ч)
- [ ] **3.4.3 Offline viewer** — Просмотр плана и дневника в офлайне (+6 ч)
- [ ] **3.4.4 Sync conflict resolution** — Resolve при конфликте данных (last-write-wins / merge) (+8 ч)

### 3.5 Widgets (iOS + Android)

- [ ] **3.5.1 iOS Widget** — Today view: прогресс дня, следующая интервенция (WidgetKit, Swift) (+16 ч)
- [ ] **3.5.2 Android Widget** — App Widget: шаги, вода, прогресс плана (+12 ч)
- [ ] **3.5.3 Widget data sharing** — App Group / SharedPreferences для передачи данных в виджет (+6 ч)

### 3.6 Deep Links & Universal Links

- [ ] **3.6.1 Universal Links (iOS)** — Ассоциация домена, apple-app-site-association (+6 ч)
- [ ] **3.6.2 Android App Links** — Digital Asset Links, intent filters (+4 ч)
- [ ] **3.6.3 Deep link routing** — Маршрутизация по схеме healora:// + URL-ссылки (+4 ч)

---

## Спринт 4: B2B (Enterprise / Клиники)

### 4.1 Doctor Mode

- [ ] **4.1.1 Doctor profile switcher** — Переключение между режимом пациента и врача (+4 ч)
- [ ] **4.1.2 Patient list** — Список пациентов врача с фильтрацией (+8 ч)
- [ ] **4.1.3 Patient detail (doctor view)** — Просмотр двойника пациента, adherence, план (+10 ч)
- [ ] **4.1.4 Plan editing** — Создание/редактирование плана пациента (+10 ч)
- [ ] **4.1.5 HITL approval flow** — Утверждение плана, комментарии, changelog (+8 ч)

### 4.2 White-Label

- [ ] **4.2.1 Branding config** — Цвета, логотип, название клиники из конфига (+6 ч)
- [ ] **4.2.2 Enterprise SSO** — LDAP / SAML / Azure AD интеграция (+12 ч)
- [ ] **4.2.3 Audit log** — Логирование действий врача (HIPAA/GDPR compliance) (+8 ч)

---

## Спринт 5: Wearables & Integrations

- [ ] **5.1 Health Connect (Android)** — Google Health Connect API: шаги, пульс, сон, SpO₂ (+16 ч)
- [ ] **5.2 Apple HealthKit (iOS)** — HealthKit: шаги, HR, HRV, sleep, activeEnergy (+16 ч)
- [ ] **5.3 Apple Watch companion** — watchOS app: быстрый check-in, пульс, напоминания (+20 ч)
- [ ] **5.4 Oura / Whoop import** — API-коннекторы для сторонних колец/трекеров (+12 ч)

---

## Спринт 6: Quality & Polish

### 6.1 Performance

- [ ] **6.1.1 List optimization** — FlashList / RecyclerView для больших списков (+6 ч)
- [ ] **6.1.2 Image caching** — FastImage, prefetching (+4 ч)
- [ ] **6.1.3 Reduce bundle size** — Hermes, tree-shaking, Flipper (+6 ч)

### 6.2 Testing

- [ ] **6.2.1 Unit tests** — Jest + React Native Testing Library (+16 ч)
- [ ] **6.2.2 E2E tests** — Detox / Maestro: key user flows (+20 ч)
- [ ] **6.2.3 Integration test** — API mock + full screen rendering (+12 ч)

### 6.3 Accessibility

- [ ] **6.3.1 VoiceOver / TalkBack** — A11y labels, roles, live regions (+10 ч)
- [ ] **6.3.2 Dynamic type** — Поддержка крупного шрифта (+4 ч)
- [ ] **6.3.3 Color contrast** — WCAG AA compliance (+4 ч)

---

## Release Plan

| Релиз | Состав | Ориентир |
|-------|--------|----------|
| **v0.1 (Alpha)** | Спринт 0 + Auth + Dashboard + Profile (read-only) | 2 недели |
| **v0.2 (Beta Internal)** | + Plan view + Chat + Diary + Offline | 5 недель |
| **v0.3 (Beta Public)** | + Push + Camera + Voice + Widgets + Deep Links | 8 недель |
| **v1.0 (App Store + Play)** | + B2B Doctor mode + Wearables + Tests | 12 недель |
| **v1.1** | + White-label + Enterprise distribution | 14 недель |

---

## Оценка трудозатрат (Total)

| Этап | Часы |
|------|------|
| Спринт 0: Foundation | ~50 ч |
| Спринт 0.5: Mobile API (Backend) | ~67 ч |
| Спринт 1: Auth & Onboarding | ~38 ч |
| Спринт 2: Core Screens | ~139 ч |
| Спринт 3: Mobile Features | ~120 ч |
| Спринт 4: B2B | ~42 ч |
| Спринт 5: Wearables | ~64 ч |
| Спринт 6: Quality | ~62 ч |
| **Total** | **~582 ч** |

---

## Архитектурные решения (ADR)

### ADR-001: React Native CLI (не Expo)
**Контекст:** Нужна камера, нативные виджеты, HealthKit, Bluetooth для wearable.
**Решение:** React Native CLI с New Architecture (Fabric) для максимального контроля над нативным слоем.
**Последствия:** Ручная настройка iOS/Android проектов, но полный доступ к нативным API.

### ADR-002: Zustand + React Query
**Контекст:** Нужен лёгкий state management + кэширование API-запросов.
**Решение:** Zustand для UI-состояния, React Query (TanStack Query) для серверных данных и кэша.
**Последствия:** Меньше бойлерплейта чем Redux, встроенный stale-while-revalidate.

### ADR-003: WatermelonDB для офлайна
**Контекст:** Офлайн-режим требует реляционной БД на клиенте с синхронизацией.
**Решение:** WatermelonDB — SQLite-based, ленивая загрузка, sync-протокол.
**Последствия:** Высокая производительность даже на больших данных, встроенный sync adapter.

### ADR-004: Phone-first, не adaptive tablet
**Контекст:** Ресурсы ограничены, нужно быстро выпустить MVP.
**Решение:** Только phone layout. Планшеты получают масштабированный телефонный UI.
**Последствия:** iPad не будет использовать split-view до v2.0.

---

*Created: 24.05.2026 | Healora Mobile | AIMLEI-2026*
