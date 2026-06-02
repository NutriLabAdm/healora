const Normalizer = require('./Normalizer');
const DedupEngine = require('./DedupEngine');
const TempManager = require('./TempManager');
const path = require('path');

function createFullArticle(article, sessionId, queryId, domain) {
  return {
    title: article.title,
    abstract: article.abstract,
    authors: article.authors,
    journal: article.journal,
    pub_date: article.pub_date,
    doi: article.doi,
    source_id: article.pmid || article.doi || article.source_id,
    source_url: article.url,
    domain: domain || article.domain || 'literature',
    source: article.source,
    relevance: article.relevance || 50,
    evidence_level: article.evidence_level || 'D',
    llm_confidence: article.llm_confidence || 0,
    llm_summary: article.llm_summary || '',
    keywords: JSON.stringify([]),
    mesh_terms: JSON.stringify([]),
    session_id: sessionId,
    fingerprint: article.fingerprint,
    status: 'pending',
  };
}

class ETLPipeline {
  async normalize(sessionId, queryDomain) {
    const sources = TempManager.listRaw(sessionId);
    let total = 0;
    for (const src of sources) {
      const raw = TempManager.loadRaw(sessionId, src);
      if (!raw) continue;
      const articles = Normalizer.normalize(raw, src, queryDomain);
      if (articles.length > 0) {
        TempManager.appendNdjson(TempManager.normalizedPath(sessionId, src), articles);
        total += articles.length;
      }
    }
    return { sources: sources.length, articles: total };
  }

  async dedup(sessionId) {
    const engine = new DedupEngine();
    const sources = TempManager.listRaw(sessionId);
    let totalBefore = 0;
    let totalAfter = 0;

    for (const src of sources) {
      const nPath = TempManager.normalizedPath(sessionId, src);
      const articles = TempManager.loadNdjson(nPath);
      totalBefore += articles.length;
      const newArticles = engine.merge(articles);
      totalAfter += newArticles.length;
    }

    const merged = engine.getMerged();
    if (merged.length > 0) {
      TempManager.appendNdjson(TempManager.dedupPath(sessionId), merged);
    }
    const fingerprints = engine.getFingerprintIndex();
    require('fs').writeFileSync(TempManager.fingerprintIndexPath(sessionId), JSON.stringify(fingerprints, null, 2));

    return { before: totalBefore, after: totalAfter, unique: merged.length };
  }

  async enrich(sessionId, llmAdapter) {
    const articles = TempManager.loadNdjson(TempManager.dedupPath(sessionId));
    if (articles.length === 0) return { articles: 0, enriched: 0 };

    if (!llmAdapter) {
      TempManager.appendNdjson(TempManager.enrichedPath(sessionId), articles);
      return { articles: articles.length, enriched: 0 };
    }

    const enriched = await llmAdapter.analyze({
      articles,
      llm_prompt: process.env.LLM_ENRICH_PROMPT || `Оцени релевантность (0-100), домен и уровень доказательности (A/B/C/D). Ответь JSON.`,
      search_format: '{"relevance":0-100,"evidence_level":"A|B|C|D","domain":"...","summary":"..."}',
    });

    const final = articles.map((a, i) => ({
      ...a,
      relevance: enriched[i]?.relevance ?? a.relevance,
      evidence_level: enriched[i]?.evidence_level ?? a.evidence_level,
      domain: enriched[i]?.domain ?? a.domain,
      llm_summary: enriched[i]?.summary ?? a.llm_summary,
      llm_confidence: enriched[i]?.relevance ?? a.llm_confidence,
    }));

    TempManager.appendNdjson(TempManager.enrichedPath(sessionId), final);
    return { articles: articles.length, enriched: enriched.length };
  }

  async save(sessionId, queryId, domain, kb) {
    const articles = TempManager.loadNdjson(TempManager.enrichedPath(sessionId));
    let saved = 0;
    let skipped = 0;

    for (const a of articles) {
      try {
        const full = createFullArticle(a, sessionId, queryId, domain);
        kb.insertArticle(full);
        saved++;
      } catch {
        skipped++;
      }
    }
    return { saved, skipped };
  }

  async run(sessionId, queryId, domain, llmAdapter, kb) {
    const step = async (name, fn) => {
      if (kb) {
        try { kb.completeSession(sessionId, { [name + '_at']: new Date().toISOString() }); } catch {}
      }
      return fn();
    };

    const norm = await step('normalizing', () => this.normalize(sessionId, domain));
    const dedup = await step('dedup', () => this.dedup(sessionId));
    const enrich = await step('enriching', () => this.enrich(sessionId, llmAdapter));
    const saved = await step('saving', () => this.save(sessionId, queryId, domain, kb));

    return {
      normalized: norm.articles,
      dedupBefore: dedup.before,
      dedupAfter: dedup.after,
      dedupUnique: dedup.unique,
      enriched: enrich.enriched,
      saved: saved.saved,
      skipped: saved.skipped,
    };
  }
}

module.exports = new ETLPipeline();
