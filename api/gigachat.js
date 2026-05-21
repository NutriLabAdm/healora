const GIGACHAT_AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
const GIGACHAT_API_URL = 'https://gigachat.devices.sberbank.ru/api/v1';

let cachedToken = null;
let tokenExpiresAt = 0;

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const credentials = process.env.GIGACHAT_CREDENTIALS;
  if (!credentials) {
    throw new Error('GIGACHAT_CREDENTIALS not set in .env');
  }

    const res = await fetch(GIGACHAT_AUTH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'RqUID': uuidv4(),
      'Accept': 'application/json',
    },
    body: 'scope=GIGACHAT_API_PERS',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GigaChat auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = (data.expires_at || 3600) * 1000;
  return cachedToken;
}

async function chatCompletion({ model, messages, max_tokens = 500, temperature = 0.7 }) {
  const token = await getToken();

  const res = await fetch(`${GIGACHAT_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'GigaChat-Max',
      messages,
      max_tokens,
      temperature,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GigaChat API error (${res.status}): ${text}`);
  }

  return res.json();
}

module.exports = { chatCompletion, getToken };
