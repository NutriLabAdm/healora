const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
let _availableModels = null;

async function getAvailableModels() {
  if (_availableModels) return _availableModels;
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      _availableModels = data.models?.map(m => m.name) || [];
    }
  } catch { _availableModels = []; }
  return _availableModels;
}

function resolveModel(preferred) {
  return preferred || process.env.BIGPICKLE_MODEL || 'llama3.2:3b';
}

async function healthCheck() {
  try {
    const models = await getAvailableModels();
    return models.length > 0;
  } catch { return false; }
}

async function generate({ model, prompt, options = {} }) {
  let m = resolveModel(model);
  const available = await getAvailableModels();
  if (available.length > 0 && !available.includes(m)) {
    m = available[0];
  }
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: m,
      prompt,
      stream: false,
      options: { temperature: 0.1, num_predict: 500, ...options },
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama error (${res.status}): ${text}`);
  }
  return res.json();
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

module.exports = { analyze, healthCheck, generate, getAvailableModels };
