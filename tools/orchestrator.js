const path = require('path');
const TempManager = require('./connectors/lib/TempManager');
const ETLPipeline = require('./connectors/lib/ETLPipeline');
const registry = require('./connectors/registry.json');
const adapter = require('./models/adapter');

const connectorCache = new Map();

function loadConnector(name) {
  if (connectorCache.has(name)) return connectorCache.get(name);
  try {
    const cfg = registry[name];
    if (!cfg) return null;
    const mod = require(`./connectors/${cfg.handler}`);
    connectorCache.set(name, mod);
    return mod;
  } catch {
    return null;
  }
}

async function runSearch({ query, sources, domain, keywords, mesh_terms, llm_prompt, search_format, sessionId, queryId, maxResults, kb }) {
  const start = Date.now();
  const results = {};

  await TempManager.ensure(sessionId);

  const tasks = [];
  const connectorNames = sources && sources.length > 0 ? sources : Object.keys(registry);

  for (const name of connectorNames) {
    const connector = loadConnector(name);
    if (!connector) {
      results[name] = { status: 'error', reason: 'connector not found' };
      continue;
    }
    tasks.push((async () => {
      try {
        const articles = await connector.search({
          keywords: keywords || query,
          domain,
          mesh_terms,
          maxResults: maxResults || 20,
        });
        TempManager.saveRaw(sessionId, name, articles.length > 0 ? { items: articles } : { items: [], note: 'no results' });
        results[name] = { status: 'ok', articles: articles.length };
        return articles;
      } catch (err) {
        TempManager.saveRaw(sessionId, name, { error: err.message });
        results[name] = { status: 'error', reason: err.message };
        return [];
      }
    })());
  }

  await Promise.all(tasks);

  const totalFound = Object.values(results).reduce((sum, r) => sum + (r.articles || 0), 0);
  const errorSources = Object.entries(results).filter(([, r]) => r.status === 'error').map(([k]) => k);

  let etlResult = null;
  if (totalFound > 0) {
    const llmAdapter = adapter.analyze ? adapter : null;
    etlResult = await ETLPipeline.run(sessionId, queryId, domain, llmAdapter, kb);
  }

  return {
    sessionId,
    duration: Date.now() - start,
    sources: results,
    totalFound,
    errorSources,
    etl: etlResult,
  };
}

module.exports = { runSearch };
