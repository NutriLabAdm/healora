# Healora Mobile — API Audit

> Анализ текущего API на предмет готовности к мобильному приложению

---

## 1. Текущие endpoint'ы (работают сейчас)

| Endpoint | Метод | Описание | Готовность для Mobile |
|----------|-------|----------|-----------------------|
| `/api/profiles` | `GET` | Все профили | ✅ Готов |
| `/api/profiles/:id` | `GET` | Один профиль | ✅ Готов |
| `/api/profiles/:id` | `PUT` | Обновить профиль (полная замена) | ⚠️ Не хватает partial PATCH |
| `/api/profiles` | `POST` | Создать профиль (upsert) | ✅ Готов |
| `/api/profiles/:id` | `DELETE` | Удалить профиль | ✅ Готов |
| `/api/chat` | `POST` | AI-чат с историей + профилем + планом | ✅ Готов (но нет streaming) |
| `/api/provider` | `GET` | Текущий AI-провайдер | ✅ Готов |
| `/api/provider` | `POST` | Сменить AI-провайдера | ✅ Готов |
| `/api/plan/generate` | `POST` | Создать план (draft) | ✅ Готов |
| `/api/plan/:id` | `GET` | Получить план | ✅ Готов |
| `/api/plan/:id/intervention/:int_id` | `PATCH` | Обновить статус интервенции | ✅ Готов |
| `/api/plan/:id/approve` | `POST` | Draft → Active (HITL) | ✅ Готов |
| `/api/plan/:id/reschedule` | `POST` | Сдвиг интервенции | ✅ Готов |
| `/api/plan/:id/export` | `GET` | Скачать plan.json | ✅ Готов |
| `/api/plans?profile_id=` | `GET` | Список планов пользователя | ✅ Готов |
| `/api/goal/suggest` | `GET` | Ключевые слова → протоколы | ✅ Готов |
| `/api/goal/parse` | `POST` | LLM-парсинг цели | ✅ Готов (fallback на keyword) |
| `/api/protocols` | `GET` | Список протоколов | ✅ Готов |
| `/api/diary` | `POST` | Сохранить дневник (upsert) | ✅ Готов |
| `/api/diary/:profile_id/:day` | `GET` | Загрузить дневник за день | ✅ Готов |
| `/api/generate-quiz` | `POST` | Сгенерировать квиз по тексту | ⚠️ Не критично для MVP |
| `/api/health` | `GET` | Healthcheck | ✅ Готов |

---

## 2. Проблемы текущего API (что мешает мобильному приложению)

### 2.1. Нет авторизации
**Проблема:** API полностью открыт, нет JWT, нет регистрации, нет разделения пользователей.
**Для Mobile:** Нельзя публиковать приложение в AppStore/PlayStore без auth. Профили сейчас — это синтетические тестовые данные (`TEST_001` — `TEST_010`).
**Статус:** ❌ Нет

### 2.2. Нет mobile-friendly форматов
**Проблема:** Все ответы — полные JSON-объекты (весь профиль, весь план). На мобильном нужны:
- Пагинация
- Частичные обновления (PATCH вместо PUT)
- Сжатие/минификация
- Адаптивные лимиты
**Статус:** ⚠️ Работает, но не оптимально

### 2.3. Нет upload-эндпоинтов
**Проблема:** Фото еды, аудио-заметки — фронтенд работал с inline data (base64) и localStorage. В мобильном нужен мультипарт upload.
**Статус:** ❌ Нет

### 2.4. Нет push-уведомлений
**Проблема:** Нет endpoint'а для регистрации FCM/APNS токенов.
**Статус:** ❌ Нет

### 2.5. Нет streaming в /api/chat
**Проблема:** Сейчас ответ приходит целиком (2-10 сек ожидания). На мобильном нужен SSE/streaming для UX.
**Статус:** ⚠️ Работает (blocking), нужен streaming

### 2.6. Нет офлайн-синхронизации
**Проблема:** Сервер — single source of truth через file system, нет конфликт-резолюции, нет временных меток изменений.
**Статус:** ⚠️ Работает, но sync protocol не реализован

### 2.7. Хранение на файловой системе
**Проблема:** Все данные — JSON-файлы на сервере. При масштабировании нужна БД (PostgreSQL).
**Статус:** ⚠️ Работает для MVP, не масштабируется

---

## 3. Что нужно добавить для Mobile MVP

### Essential (блокирует первую сборку)

| Endpoint | Метод | Описание | Зачем | Приоритет |
|----------|-------|----------|------|-----------|
| **`POST /api/auth/register`** | `POST` | Регистрация (email + password) | Без этого никак | 🔴 CRITICAL |
| **`POST /api/auth/login`** | `POST` | Логин → JWT токен | Аутентификация | 🔴 CRITICAL |
| **`POST /api/auth/refresh`** | `POST` | Refresh JWT токена | Поддержание сессии | 🔴 CRITICAL |
| **`POST /api/auth/biometric`** | `POST` | Регистрация biometric key | FaceID / TouchID | 🔴 CRITICAL |
| **`GET /api/auth/me`** | `GET` | Текущий пользователь | Профиль при старте | 🔴 CRITICAL |
| **`PATCH /api/profiles/:id`** | `PATCH` | Partial update профиля | Вместо полной замены | 🟡 HIGH |
| **`POST /api/upload/image`** | `POST` | Загрузка изображения (multipart) | Фото еды, аватар | 🟡 HIGH |
| **`POST /api/upload/audio`** | `POST` | Загрузка аудио (multipart) | Голосовые заметки | 🟡 HIGH |
| **`POST /api/notifications/register`** | `POST` | Регистрация FCM/APNS токена | Push-уведомления | 🟡 HIGH |
| **`DELETE /api/notifications/register`** | `DELETE` | Удаление push-токена | Logout | 🟡 HIGH |

### Important (сильно улучшает UX)

| Endpoint | Метод | Описание | Зачем | Приоритет |
|----------|-------|----------|------|-----------|
| **`GET /api/chat/stream`** | `GET` | SSE streaming чата | Постепенная отрисовка ответа | 🟡 HIGH |
| **`POST /api/sync`** | `POST` | Офлайн-синхронизация (batch) | Sync изменений без сети | 🟡 HIGH |
| **`GET /api/profiles/:id/history`** | `GET` | История изменений параметров | Чарты изменений | 🟢 MEDIUM |
| **`POST /api/profiles/:id/photo`** | `POST` | Загрузка аватара | Смена фото профиля | 🟢 MEDIUM |
| **`GET /api/plans?profile_id=&status=`** | `GET` | (уже есть) | — | ✅ |
| **`GET /api/plan/:id/export`** | `GET` | (уже есть) | — | ✅ |

### Nice-to-have (после MVP)

| Endpoint | Зачем |
|----------|-------|
| `GET /api/wearables/connect` | OAuth-ссылки для Apple Health, Google Fit |
| `POST /api/wearables/data` | Приём данных с wearable |
| `GET /api/achievements` | Список достижений пользователя |
| `POST /api/achievements/claim` | Получение награды |
| `GET /api/analytics/dashboard` | Агрегированные метрики для дашборда |
| `GET /api/doctor/patients` | Список пациентов (B2B) |
| `GET /api/doctor/patients/:id` | Детали пациента (B2B) |

---

## 4. Изменения в существующих endpoint'ах

### /api/chat — добавить streaming
Сейчас:
```js
res.json({ reply, source });
```
Нужно для Mobile:
```
SSE: data: {"chunk": "текст", "done": false}
     data: {"chunk": "", "done": true, "source": "gigachat"}
```
Протокол SSE, постепенная отрисовка токенов.

### /api/profiles/:id — добавить PATCH
Сейчас только PUT (полная замена объекта). Нужен PATCH для partial update.
```json
// PATCH body — только изменяемые поля
{ "anthropometrics": { "weight_kg": 82.5 } }
```

### /api/diary — добавить медиа
Сейчас base64 в JSON. Нужен multipart:
```
POST /api/diary
Content-Type: multipart/form-data
Fields: profile_id, day, meals[], water_ml, mood
Files: meal_photo_0, meal_photo_1, voice_note
```

---

## 5. Схема данных пользователя (нужна новая)

Сейчас нет таблицы users. Нужна:

```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "password_hash": "$2b$10$...",
  "created_at": "2026-05-24T12:00:00Z",
  "last_login": "2026-05-24T12:00:00Z",
  "biometric_key_hash": "optional",
  "fcm_tokens": ["token1", "token2"],
  "profile_ids": ["TEST_001", "..."]  // связь с цифровыми двойниками
}
```

---

## 6. Диаграмма: Current vs Needed

```
                Current API                          Mobile-Needed API
                ───────────                         ────────────────
┌───────────────┐                                ┌──────────────────┐
│ GET /profiles │                                │ POST /auth/login │──→ JWT
├───────────────┤                                ├──────────────────┤
│ POST /chat   │── blocking response             │ GET /chat/stream │──→ SSE streaming
├───────────────┤                                ├──────────────────┤
│ PUT /profile │── full replacement              │ PATCH /profile   │──→ partial update
├───────────────┤                                ├──────────────────┤
│ No auth      │── anyone can read/write         │ JWT middleware   │──→ protected routes
├───────────────┤                                ├──────────────────┤
│ base64 files │── inside JSON body              │ multipart upload │──→ separate files
├───────────────┤                                ├──────────────────┤
│ No push      │── no notification support       │ FCM/APNS reg     │──→ push tokens
└───────────────┘                                └──────────────────┘
```

---

---

## 7. Принятые архитектурные решения

| Решение | Выбор | Обоснование |
|---------|-------|-------------|
| **Auth** | PostgreSQL + JWT | Правильная архитектура, миграции, нормализация |
| **Media Storage** | Локальный сервер (`api/uploads/`) | Простота, Beget server, nginx static |
| **Chat Streaming** | SSE (Server-Sent Events) | Односторонний поток, HTTP, просто |

---

## 8. План миграции API (поэтапно)

### Phase A — Infrastructure (до мобильного кода)
- [ ] Установка PostgreSQL на сервер
- [ ] Создание таблиц: `users`, `profiles` (link), `push_tokens`
- [ ] JWT middleware в Express
- [ ] bcrypt для паролей

### Phase B — Mobile-Needed Endpoints
- [ ] `POST /api/auth/register`
- [ ] `POST /api/auth/login` → JWT
- [ ] `POST /api/auth/refresh`
- [ ] `GET /api/auth/me`
- [ ] `PATCH /api/profiles/:id`
- [ ] `POST /api/upload/image`
- [ ] `POST /api/upload/audio`
- [ ] `POST /api/notifications/register`
- [ ] `DELETE /api/notifications/register`

### Phase C — Chat Streaming
- [ ] SSE endpoint: `GET /api/chat/stream`
- [ ] Модификация GigaChat/OpenAI клиента для streaming
- [ ] EventSource на клиенте (React Native)

### Phase D — Data Migration
- [ ] Перенос profiles из JSON-файла в PostgreSQL
- [ ] Перенос diary в PostgreSQL
- [ ] Перенос plans в PostgreSQL
- [ ] Написание скрипта миграции данных

---

*Created: 24.05.2026 | Healora Mobile API Audit | AIMLEI-2026*
