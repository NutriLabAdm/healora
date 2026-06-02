const HF_API_BASE = process.env.HF_API_BASE || 'https://router.huggingface.co';
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct';
const token = () => process.env.HF_API_TOKEN;
const kb = require('../../api/knowledgeDb');

function resolveToken() {
  const t = process.env.HF_API_TOKEN;
  if (t) return t;
  const keys = kb.getApiKeys();
  const hf = keys.find(k => k.provider === 'huggingface' && k.is_active);
  return hf?.key_value || null;
}

async function healthCheck() {
  if (!resolveToken()) return false;
  const url = `${HF_API_BASE}/models/${HF_MODEL}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resolveToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: 'ok', parameters: { max_new_tokens: 5 } }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok || res.status === 503;
  } catch { return false; }
}

async function generate({ model, prompt, options = {} }) {
  const m = model || HF_MODEL;
  const t = resolveToken();
  if (!t) throw new Error('HF_API_TOKEN not configured');
  const url = `${HF_API_BASE}/models/${m}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 500, temperature: 0.1, ...options },
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HuggingFace error (${res.status}): ${text}`);
  }
  const data = await res.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return { response: data[0].generated_text };
  }
  return { response: JSON.stringify(data) };
}

async function analyze({ articles, llm_prompt, search_format }) {
  const results = [];
  for (const article of articles) {
    const prompt = `${llm_prompt || 'Оцени релевантность статьи для health/longevity.'}

Статья: ${article.title}
Аннотация: ${article.abstract || ''}

Формат ответа (строгий JSON, без лишнего текста):
${search_format || '{"relevance":0-100,"evidence_level":"A|B|C|D","domain":"...","summary":"..."}'}`;

    const data = await generate({ prompt });
    let parsed;
    try {
      const cleaned = (data.response || '')
        .replace(/```json\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        relevance: 50,
        evidence_level: 'C',
        domain: 'general',
        summary: (data.response || '').slice(0, 200),
      };
    }
    results.push({ ...article, ...parsed, llm_confidence: parsed.relevance || 50 });
  }
  return results;
}

module.exports = { analyze, healthCheck, generate };
