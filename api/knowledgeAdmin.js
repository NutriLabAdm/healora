const express = require('express');
const router = express.Router();
const kb = require('./knowledgeDb');
const { optionalAuth } = require('./middleware');
const fs = require('fs');
const path = require('path');
const runnerPath = path.join(__dirname, '..', 'tools', 'search_runner');
const searchRunner = require(fs.existsSync(runnerPath + '.js') ? runnerPath : path.join(__dirname, 'tools', 'search_runner'));

kb.init();

// Dev mode: all endpoints work without auth
router.use(optionalAuth);

// ── Stats / Analytics ──
router.get('/stats', (req, res) => {
  try {
    const stats = kb.getArticleStats();
    stats.sourceStats = kb.getSourceStats();
    res.json(stats);
  } catch (err) {
    console.error('GET /stats error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Search Queries ──
router.get('/queries', (req, res) => {
  try {
    res.json(kb.getSearchQueries(req.query.domain));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/queries', (req, res) => {
  try {
    const id = kb.upsertSearchQuery(req.body);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/queries/:id', (req, res) => {
  try {
    kb.deleteSearchQuery(Number(req.params.id));
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/queries/:id', (req, res) => {
  try {
    kb.updateSearchQuery(Number(req.params.id), req.body);
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Search Sessions ──
router.get('/sessions', (req, res) => {
  try {
    res.json(kb.getSearchSessions(req.query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const id = kb.createSession({
      query_id: req.body.query_id,
      search_type: req.body.search_type || 'manual',
      domain: req.body.domain,
      source: req.body.source || 'manual',
    });
    const session = { id, query_id: req.body.query_id, domain: req.body.domain, source: req.body.source || 'manual', keywords: req.body.keywords || '', mesh_terms: req.body.mesh_terms || '' };
    searchRunner.triggerSearch(session, kb).then(result => {
      console.log(`[search] Session ${id} completed: ${result.status}, ${result.totalFound || 0} articles`);
    }).catch(err => {
      console.error(`[search] Session ${id} failed:`, err.message);
    });
    res.json({ id, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/sessions/:id/cancel', async (req, res) => {
  try {
    await searchRunner.cancelSearch(Number(req.params.id));
    kb.cancelSession(Number(req.params.id));
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Articles ──
router.get('/articles', (req, res) => {
  try {
    res.json(kb.getArticles(req.query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/articles/:id/status', (req, res) => {
  try {
    kb.updateArticleStatus(Number(req.params.id), req.body.status, req.user_email, req.body.comment);
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Changelog ──
router.get('/changelog', (req, res) => {
  try {
    res.json(kb.getChangelog(req.query.article_id ? Number(req.query.article_id) : null));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── API Keys ──
router.get('/api-keys', (req, res) => {
  try { res.json(kb.getApiKeys()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/api-keys', (req, res) => {
  try { const id = kb.upsertApiKey(req.body); res.json({ id }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/api-keys/:id', (req, res) => {
  try { kb.deleteApiKey(Number(req.params.id)); res.json({ status: 'ok' }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

// ── API Usage ──
router.get('/api-usage', (req, res) => {
  try { res.json(kb.getApiUsage(req.query.provider)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/api-usage/daily', (req, res) => {
  try { res.json(kb.getDailyUsage(req.query.provider)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

// ── Test Source ──
router.post('/test-source', async (req, res) => {
  try {
    const { source } = req.body;
    if (!source) return res.status(400).json({ error: 'source required' });

    const start = Date.now();
    let result = { source, status: 'unknown', request: null, response: null, duration: 0 };

    switch (source) {
      case 'PubMed': {
        result.request = 'GET https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=obesity[MeSH]...';
        try {
          const pubRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=obesity%5BMeSH%5D+AND+nutrition%5BMeSH%5D&retmax=3&retmode=json`, { signal: AbortSignal.timeout(10000) });
          const pubData = await pubRes.json();
          result.response = { status: pubRes.status, count: pubData.esearchresult?.count || 0, ids: pubData.esearchresult?.idlist || [] };
          result.status = pubRes.ok ? 'ok' : 'error';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'Google Scholar': {
        result.request = 'GET https://api.crossref.org/works?query=obesity+nutrition&rows=3';
        try {
          const crossRes = await fetch(`https://api.crossref.org/works?query=obesity+nutrition&rows=3`, { signal: AbortSignal.timeout(10000) });
          const crossData = await crossRes.json();
          result.response = { status: crossRes.status, items: crossData.message?.items?.map(i => ({ title: i.title?.[0], doi: i.DOI })) || [] };
          result.status = crossRes.ok ? 'ok' : 'error';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'Cochrane': {
        result.request = 'GET https://www.cochranelibrary.com/api/search?q=obesity';
        try {
          const coRes = await fetch(`https://www.cochranelibrary.com/api/search?q=obesity`, { signal: AbortSignal.timeout(10000) });
          result.response = { status: coRes.status, statusText: coRes.statusText };
          result.status = coRes.ok ? 'ok' : 'warning';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'ClinicalTrials.gov': {
        result.request = 'GET https://clinicaltrials.gov/api/query/field_values?expr=obesity&field=Condition&fmt=json';
        try {
          const ctRes = await fetch(result.request, { signal: AbortSignal.timeout(10000) });
          const ctData = await ctRes.json();
          result.response = { status: ctRes.status, fieldValues: ctData.FieldValuesResponse?.FieldValues?.Count || 0 };
          result.status = ctRes.ok ? 'ok' : 'error';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'WHO': {
        result.request = 'GET https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=obesity+AND(jsubsetaim[ALL])...';
        try {
          const whoRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=obesity+AND(jsubsetaim%5BALL%5D)&retmax=3&retmode=json`, { signal: AbortSignal.timeout(10000) });
          const whoData = await whoRes.json();
          result.response = { status: whoRes.status, via: 'PubMed AIM filter', count: whoData.esearchresult?.count || 0 };
          result.status = whoRes.ok ? 'ok' : 'error';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'FDA': {
        result.request = 'GET https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:obesity&limit=3';
        try {
          const fdaRes = await fetch(result.request, { signal: AbortSignal.timeout(10000) });
          const fdaData = await fdaRes.json();
          result.response = { status: fdaRes.status, results: fdaData.results?.length || 0, error: fdaData.error || null };
          result.status = fdaRes.ok ? 'ok' : 'warning';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'openAI': {
        const oaKey = kb.getApiKeys().find(k => k.provider === 'openai' && k.is_active);
        if (!oaKey) { result.status = 'no_key'; result.response = 'API-ключ не настроен'; break; }
        result.request = 'POST https://api.openai.com/v1/chat/completions (gpt-4o-mini)';
        try {
          const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST', headers: { 'Authorization': `Bearer ${oaKey.key_value}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: 'Test. Reply "ok".' }], max_tokens: 10 }),
            signal: AbortSignal.timeout(15000)
          });
          const oaData = await oaRes.json();
          result.response = { status: oaRes.status, reply: oaData.choices?.[0]?.message?.content, error: oaData.error };
          result.status = oaRes.ok ? 'ok' : 'error';
        } catch (e) { result.status = 'error'; result.response = e.message; }
        break;
      }
      case 'gigachat': {
        const gigaKey = kb.getApiKeys().find(k => k.provider === 'gigachat' && k.is_active);
        if (!gigaKey) { result.status = 'no_key'; result.response = 'API-ключ не настроен'; break; }
        result.request = 'GigaChat API (через gigachat.js)';
        try {
          const gigachat = require('./gigachat');
          const gRes = await gigachat.chatCompletion({ model: 'GigaChat-Max', messages: [{ role: 'user', content: 'Test. Reply "ok".' }], max_tokens: 10 });
          result.response = { status: 200, reply: gRes.choices?.[0]?.message?.content };
          result.status = 'ok';
        } catch (e) {
          result.response = { error: e.message };
          result.status = 'error';
        }
        break;
      }
      case 'HuggingFace': {
        const hfKey = kb.getApiKeys().find(k => k.provider === 'huggingface' && k.is_active);
        const token = hfKey?.key_value || process.env.HF_API_TOKEN;
        if (!token) { result.status = 'no_key'; result.response = 'API-ключ не настроен. Добавьте HuggingFace ключ или HF_API_TOKEN в .env'; break; }
        const endpoint = 'https://router.huggingface.co/v1/chat/completions';
        result.request = `POST ${endpoint}`;
        try {
          const hfRes = await fetch(endpoint, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'meta-llama/Meta-Llama-3-8B-Instruct', messages: [{ role: 'user', content: 'Reply with just the word "ok".' }], max_tokens: 10 }),
            signal: AbortSignal.timeout(30000)
          });
          const hfText = await hfRes.text();
          result.response = { status: hfRes.status, reply: hfText.slice(0, 300) };
          result.status = hfRes.ok ? 'ok' : 'warning';
        } catch (e) {
          let msg = e.message;
          if (msg.includes('fetch failed') || msg.includes('ENOTFOUND') || msg.includes('ETIMEDOUT') || msg.includes('ECONNREFUSED')) {
            msg = 'API недоступен — DNS/сеть блокирует router.huggingface.co. Проверьте на production-сервере или используйте BigPickle локально.';
          }
          result.status = 'error';
          result.response = msg;
        }
        break;
      }
      case 'BigPickle': {
        const bpUrl = `${process.env.OLLAMA_URL || 'http://localhost:11434'}/api/tags`;
        result.request = `GET ${bpUrl}`;
        try {
          const bigOk = await fetch(bpUrl, { signal: AbortSignal.timeout(5000) });
          if (bigOk.ok) {
            const tags = await bigOk.json();
            const models = tags.models?.map(m => m.name) || [];
            const expected = process.env.BIGPICKLE_MODEL || 'big-pickle';
            const hasExact = models.some(m => m === expected);
            result.response = { status: bigOk.status, models, hasExact, suggested: models[0] || null };
            result.status = hasExact ? 'ok' : 'warning';
            if (!hasExact && models.length > 0) {
              result.response._note = `Модель ${expected} не найдена. Используется: ${models[0]}`;
            }
          } else {
            result.response = { status: bigOk.status };
            result.status = 'error';
          }
        } catch (e) {
          result.response = 'Ollama не запущен. Запустите: ollama serve (отдельный терминал)';
          result.status = 'error';
        }
        break;
      }
      default:
        result.status = 'unknown';
        result.response = `Неизвестный источник: ${source}`;
    }

    result.duration = Date.now() - start;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
