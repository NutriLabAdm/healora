# AI API Integration — GigaChat + Phone Simulator Chat

## Current State

### Backend (`api/`)
- **`api/gigachat.js`** — GigaChat client:
  - OAuth2 auth  against `ngw.devices.sberbank.ru:9443/api/v2/oauth`
  - Token caching with 1 min buffer before expiry
  - `chatCompletion({ model, messages, max_tokens, temperature })` → calls `gigachat.devices.sberbank.ru/api/v1/chat/completions`
  - Supports `GigaChat-Max` model
- **`api/server.js`** — Express server:
  - `POST /api/chat` — accepts `{ message, profile }`, returns `{ reply, source }`
  - Builds system prompt from profile data (age, sex, BMI, glucose, cholesterol)
  - Falls back to keyword-based replies if both GigaChat and OpenAI fail
  - Config via `.env`: `AI_PROVIDER=gigachat`, `GIGACHAT_CREDENTIALS` in `gigachat.env`
  - **Limitation:** only sends single user message per request, no conversation history
- **`api/.env`** — `AI_PROVIDER=gigachat`, `PORT=3051`

### Frontend (`www/dev.healora.ru/`)
- **`PhoneSimulator.jsx`** — Chat tab:
  - `handleSend()`: pushes user message → clears input → after 1200ms adds **hardcoded** AI reply
  - **No API calls for chat** — all demo messages are hardcoded strings
  - `localMessages` state initialized once in `useState(() => ...)` — not reactive to diary data
  - Only API call is `GET /api/diary/:profileId/:viewDay` for food photos

## Architecture

```
PhoneSimulator                    api/server.js                    GigaChat API
     │                                │                                │
     │──POST /api/chat────────────────▶│                                │
     │  { message,                    │                                │
     │    profile,                     │                                │
     │    history: [...] }             │                                │
     │                                │──chatCompletion()─────────────▶│
     │                                │  { model: 'GigaChat-Max',      │
     │                                │    messages: [                  │
     │                                │      { role: 'system', ... },   │
     │                                │      ...history...,             │
     │                                │      { role: 'user', ... }      │
     │                                │    ]}                          │
     │                                │                                │
     │◀──{ reply, source }────────────│◀──{ choices[0].message }───────│
```

## Implementation Plan

### 1. Backend: `/api/chat` — support conversation history

**File:** `api/server.js`

**Change:** Accept `history` array in request body, pass full conversation to LLM.

```js
// Request: POST /api/chat
{ message: string, profile?: string, history?: Array<{role: string, content: string}> }

// Build messages array for LLM:
const systemMsg = { role: 'system', content: buildSystemPrompt(profileText) };
const historyMsgs = (history || []).map(m => ({ role: m.role, content: m.content }));
const userMsg = { role: 'user', content: message };
const messages = [systemMsg, ...historyMsgs, userMsg];
```

**Added:** `buildSystemPrompt(profile)` — generate rich system prompt from full digital twin:
- Demographics (age, sex, name)
- Anthropometrics (BMI, weight, height)
- Labs (glucose, HbA1c, cholesterol, HDL, etc.)
- Current interventions for today
- Active plan/protocol name
- Instructions: answer in Russian, be concise (2-3 sentences), reference profile data, suggest interventions

### 2. Frontend: PhoneSimulator — connect to API

**File:** `PhoneSimulator.jsx`

**Changes:**

#### a. Add state for chat loading

```js
const [chatLoading, setChatLoading] = useState(false);
```

#### b. Rewrite `handleSend` to call API

```js
const handleSend = async () => {
  if (!chatInput.trim() || chatLoading) return;
  const now = new Date();
  const t = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const userMsg = { id: `u-${Date.now()}`, side: 'right', type: 'text', text: chatInput.trim(), time: t };

  // Build history for API (last N messages in OpenAI format)
  const history = localMessages
    .filter(m => m.type === 'text')
    .slice(-20)
    .map(m => ({ role: m.side === 'right' ? 'user' : 'assistant', content: m.text }));

  setLocalMessages(prev => [...prev, userMsg]);
  setChatInput('');
  setChatLoading(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: chatInput.trim(),
        profile: profileId,
        history,
      }),
    });
    const data = await res.json();
    const replyTime = `${pad(now.getHours())}:${pad(now.getMinutes() + 1)}`;
    setLocalMessages(prev => [...prev, {
      id: `a-${Date.now()}`, side: 'left', type: 'text', time: replyTime,
      text: data.reply || 'Не удалось получить ответ.',
    }]);
  } catch (err) {
    setLocalMessages(prev => [...prev, {
      id: `a-${Date.now()}`, side: 'left', type: 'text',
      time: `${pad(now.getHours())}:${pad(now.getMinutes() + 1)}`,
      text: 'Ошибка соединения с сервером. Попробуйте позже.',
    }]);
  } finally {
    setChatLoading(false);
  }
};
```

#### c. Add loading indicator in chat

Show typing dots or spinner when `chatLoading` is true:

```jsx
{chatLoading && (
  <div className="chat-typing" style={{ textAlign: 'left', padding: '4px 8px', fontSize: 11, color: '#999' }}>
    GigaChat печатает<span className="dots">...</span>
  </div>
)}
```

### 3. System Prompt Enhancement

**File:** `api/server.js` (new helper)

Build a rich system prompt that includes:

```js
function buildSystemPrompt(profile) {
  if (!profile) return 'You are Healora AI Coach. Be positive, brief, answer in Russian.';
  return `Ты — Healora AI, персональный ассистент здоровья.
  
Информация о пользователе:
- Имя: ${profile.name || 'Пользователь'}
- Возраст: ${profile.age} лет
- Пол: ${profile.sex}
- Рост: ${profile.height} см
- Вес: ${profile.weight} кг
- ИМТ: ${profile.bmi}
- Целевой вес: ${profile.targetWeight} кг

Лабораторные показатели:
- Глюкоза: ${profile.glucose} ммоль/л
- HbA1c: ${profile.hba1c} %
- Холестерин общий: ${profile.cholesterol} ммоль/л
- HDL: ${profile.hdl} ммоль/л
- Артериальное давление: ${profile.bpSystolic}/${profile.bpDiastolic} мм рт.ст.

Правила:
1. Отвечай на русском языке.
2. Будь кратким (2-4 предложения).
3. Используй данные пользователя для персонализации.
4. Если вопрос о плане — напомни о текущих интервенциях.
5. Будь поддерживающим и мотивирующим.
6. Не давай медицинских диагнозов.`;
}
```

### 4. Frontend: keep initial greeting but real replies

Keep the initial greeting and intervention badges from the `useState` lazy initializer, but replace the hardcoded auto-reply in `handleSend` with actual API call. The initial messages remain as onboarding context.

### 5. Error Handling

- Backend: if GigaChat fails, return `{ reply: '...', source: 'fallback' }` with keyword fallback
- Frontend: if fetch fails, show "Ошибка соединения" message, keep chat usable
- Loading state prevents double-send

## Files to Modify

| File | Change |
|------|--------|
| `api/server.js` | Accept `history` in POST /api/chat, build system prompt from full profile |
| `www/dev.healora.ru/src/components/PhoneSimulator.jsx` | Replace hardcoded `handleSend` with API call, add `chatLoading` state |
| `www/dev.healora.ru/src/components/PhoneSimulator.css` | Add `.chat-typing` styles |
| `api/gigachat.js` | (no changes needed — already supports full messages array) |

## Verification

1. Start backend: `node api/server.js` (port 3051)
2. Start frontend: `npm run dev` (port 3001, proxies /api → 3051)
3. Open phone simulator → Chat tab
4. Type message → Enter → see GigaChat reply appear after network delay
5. Check loading indicator shows during request
6. Continue conversation — history should be maintained
