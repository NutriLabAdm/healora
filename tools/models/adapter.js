const path = require('path');
const fs = require('fs');
const bigPickle = require('./bigPickle');

function resolveKnowledgeDb() {
  const candidates = [
    path.join(__dirname, '..', '..', 'api', 'knowledgeDb'),
    path.join(__dirname, '..', '..', 'knowledgeDb'),
  ];
  for (const c of candidates) {
    try { return require(c); } catch {}
  }
  throw new Error('Cannot locate knowledgeDb module');
}
const kb = resolveKnowledgeDb();

const ADAPTERS = {
  bigPickle:   { file: './bigPickle',   requires: 'ollama', module: bigPickle },
  huggingface: { file: './huggingface', requires: 'hf_token' },
  gigachat:    { file: '../../api/gigachat', requires: 'gigachat_creds' },
  openai:      { file: './openai',      requires: 'openai_key' },
};

const PRIORITY = (process.env.LLM_PRIORITY || 'bigPickle,huggingface,gigachat,openai').split(',');

function checkAvailable(name) {
  const cfg = ADAPTERS[name];
  if (!cfg) return false;
  if (cfg.requires === 'ollama') return true;
  if (cfg.requires === 'hf_token') return !!(process.env.HF_API_TOKEN || kb.getApiKeys().some(k => k.provider === 'huggingface' && k.is_active));
  if (cfg.requires === 'gigachat_creds') return !!process.env.GIGACHAT_CREDENTIALS;
  if (cfg.requires === 'openai_key') return !!(process.env.OPENAI_API_KEY || kb.getApiKeys().some(k => k.provider === 'openai' && k.is_active));
  return false;
}

async function analyze({ articles, llm_prompt, search_format, domain }) {
  let lastError = null;

  for (const name of PRIORITY) {
    if (!checkAvailable(name)) {
      console.log(`[adapter] ${name}: unavailable, skip`);
      continue;
    }

    try {
      const mod = require(ADAPTERS[name].file);
      const start = Date.now();
      const results = await mod.analyze({ articles, llm_prompt, search_format, domain });
      const duration = Date.now() - start;

      console.log(`[adapter] ${name}: ${articles.length} articles → ${results.length} results in ${duration}ms`);

      kb.trackApiUsage({
        provider: name,
        model: process.env.BIGPICKLE_MODEL || 'big-pickle',
        tokens_in: 0,
        tokens_out: 0,
        cost: 0,
      });

      return results;
    } catch (err) {
      lastError = err;
      console.warn(`[adapter] ${name} failed: ${err.message}, trying next...`);
    }
  }

  console.warn(`[adapter] All LLM models failed: ${lastError?.message}. Returning articles with defaults.`);
  return articles.map(a => ({ ...a, relevance: 50, evidence_level: 'D', llm_confidence: 0, llm_summary: '' }));
}

async function healthCheck() {
  const results = {};
  for (const name of PRIORITY) {
    const cfg = ADAPTERS[name];
    if (!cfg) continue;
    try {
      const mod = require(cfg.file);
      results[name] = mod.healthCheck ? await mod.healthCheck() : checkAvailable(name);
    } catch {
      results[name] = false;
    }
  }
  return results;
}

module.exports = { analyze, healthCheck, PRIORITY };
