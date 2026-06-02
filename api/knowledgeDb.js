const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'knowledge.db');

let db;

function init() {
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Add new columns to existing table if missing (safe to run repeatedly)
  try { db.exec('ALTER TABLE search_queries ADD COLUMN title TEXT DEFAULT \'\''); } catch {}
  try { db.exec('ALTER TABLE search_queries ADD COLUMN llm_prompt TEXT DEFAULT \'\''); } catch {}
  try { db.exec('ALTER TABLE search_queries ADD COLUMN search_format TEXT DEFAULT \'\''); } catch {}
  try { db.exec('ALTER TABLE search_queries ADD COLUMN cron_expr TEXT DEFAULT \'\''); } catch {}
  try { db.exec('ALTER TABLE articles ADD COLUMN fingerprint TEXT'); } catch {}
  try { db.exec('CREATE INDEX IF NOT EXISTS idx_articles_fingerprint ON articles(fingerprint)'); } catch {}
  try { db.exec('ALTER TABLE search_sessions ADD COLUMN normalizing_at TEXT'); } catch {}
  try { db.exec('ALTER TABLE search_sessions ADD COLUMN dedup_at TEXT'); } catch {}
  try { db.exec('ALTER TABLE search_sessions ADD COLUMN enriching_at TEXT'); } catch {}
  try { db.exec('ALTER TABLE search_sessions ADD COLUMN saving_at TEXT'); } catch {}
  try { db.exec('ALTER TABLE search_sessions ADD COLUMN error_message TEXT'); } catch {}

  db.exec(`
    CREATE TABLE IF NOT EXISTS search_queries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT DEFAULT '',
      domain TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'PubMed',
      keywords TEXT NOT NULL,
      mesh_terms TEXT DEFAULT '',
      llm_prompt TEXT DEFAULT '',
      search_format TEXT DEFAULT '',
      cron_expr TEXT DEFAULT '',
      interval_minutes INTEGER DEFAULT 1440,
      is_active INTEGER DEFAULT 1,
      last_run_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS search_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query_id INTEGER,
      search_type TEXT NOT NULL DEFAULT 'scheduled',
      domain TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      articles_found INTEGER DEFAULT 0,
      articles_after_dedup INTEGER DEFAULT 0,
      articles_queued INTEGER DEFAULT 0,
      articles_approved INTEGER DEFAULT 0,
      articles_rejected INTEGER DEFAULT 0,
      error_message TEXT,
      started_at TEXT,
      completed_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id TEXT,
      source_url TEXT,
      title TEXT NOT NULL,
      abstract TEXT,
      authors TEXT,
      journal TEXT,
      pub_date TEXT,
      doi TEXT,
      domain TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'PubMed',
      relevance REAL DEFAULT 0,
      evidence_level TEXT DEFAULT 'D',
      llm_confidence REAL DEFAULT 0,
      llm_summary TEXT,
      keywords TEXT DEFAULT '[]',
      mesh_terms TEXT DEFAULT '[]',
      session_id INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      status_changed_at TEXT,
      status_changed_by TEXT,
      expert_comment TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS changelog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER,
      action TEXT NOT NULL,
      old_status TEXT,
      new_status TEXT,
      user_email TEXT,
      comment TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      url TEXT,
      type TEXT DEFAULT 'org' CHECK(type IN ('journal','database','org','publisher','wearable','other','guideline')),
      authority_score INTEGER DEFAULT 50,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS article_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      source_id INTEGER REFERENCES sources(id),
      reference_text TEXT,
      source_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      key_value TEXT NOT NULL,
      label TEXT DEFAULT '',
      is_active INTEGER DEFAULT 1,
      priority INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS api_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      model TEXT DEFAULT '',
      tokens_in INTEGER DEFAULT 0,
      tokens_out INTEGER DEFAULT 0,
      requests INTEGER DEFAULT 1,
      cost REAL DEFAULT 0,
      period_start TEXT DEFAULT (date('now', 'start of month')),
      period_end TEXT DEFAULT (date('now', 'start of month', '+1 month', '-1 day')),
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  return db;
}

function getDb() {
  if (!db) init();
  return db;
}

// ── Search Queries ──

function getSearchQueries(domain) {
  const d = getDb();
  if (domain) {
    return d.prepare('SELECT * FROM search_queries WHERE domain = ? ORDER BY domain, source').all(domain);
  }
  return d.prepare('SELECT * FROM search_queries ORDER BY domain, source').all();
}

function upsertSearchQuery(q) {
  const d = getDb();
  if (q.id) {
    d.prepare(`UPDATE search_queries SET title=?, domain=?, source=?, keywords=?, mesh_terms=?,
      llm_prompt=?, search_format=?, cron_expr=?, interval_minutes=?, is_active=?, updated_at=datetime('now') WHERE id=?`)
      .run(q.title || '', q.domain, q.source, q.keywords, q.mesh_terms,
        q.llm_prompt || '', q.search_format || '', q.cron_expr || '', q.interval_minutes, q.is_active ? 1 : 0, q.id);
    return q.id;
  }
  const r = d.prepare(`INSERT INTO search_queries (title, domain, source, keywords, mesh_terms, llm_prompt, search_format, cron_expr, interval_minutes, is_active) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      q.title || '', q.domain, q.source, q.keywords, q.mesh_terms,
      q.llm_prompt || '', q.search_format || '', q.cron_expr || '', q.interval_minutes, q.is_active ? 1 : 0);
  return r.lastInsertRowid;
}

function deleteSearchQuery(id) {
  getDb().prepare('DELETE FROM search_queries WHERE id = ?').run(id);
}

// ── Search Sessions ──

function createSession(session) {
  const d = getDb();
  const r = d.prepare(`INSERT INTO search_sessions (query_id, search_type, domain, source, status, started_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))`).run(
    session.query_id || null, session.search_type || 'manual',
    session.domain, session.source, 'in_progress'
  );
  return r.lastInsertRowid;
}

function completeSession(id, updates) {
  const d = getDb();
  const allowed = ['status', 'articles_found', 'articles_after_dedup', 'articles_queued',
    'articles_approved', 'articles_rejected', 'error_message', 'started_at', 'completed_at',
    'normalizing_at', 'dedup_at', 'enriching_at', 'saving_at'];
  const setClauses = ['completed_at = datetime(\'now\')'];
  const params = [];
  for (const key of allowed) {
    if (updates[key] !== undefined) {
      setClauses.push(`${key} = ?`);
      params.push(updates[key]);
    }
  }
  params.push(id);
  d.prepare(`UPDATE search_sessions SET ${setClauses.join(', ')} WHERE id=?`).run(...params);
}

function cancelSession(id) {
  getDb().prepare(`UPDATE search_sessions SET status='cancelled_by_user', completed_at=datetime('now') WHERE id=?`).run(id);
}

function getSearchSessions(opts) {
  const d = getDb();
  let sql = 'SELECT * FROM search_sessions';
  const params = [];
  const where = [];
  if (opts.domain) { where.push('domain = ?'); params.push(opts.domain); }
  if (opts.source) { where.push('source = ?'); params.push(opts.source); }
  if (opts.status) { where.push('status = ?'); params.push(opts.status); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY created_at DESC';
  if (opts.limit) sql += ' LIMIT ?';
  if (opts.limit) params.push(opts.limit);
  return d.prepare(sql).all(...params);
}

// ── Articles ──

function insertArticle(a) {
  const d = getDb();
  const r = d.prepare(`INSERT OR IGNORE INTO articles (source_id, source_url, title, abstract, authors, journal,
    pub_date, doi, domain, source, relevance, evidence_level, llm_confidence, llm_summary,
    keywords, mesh_terms, session_id, fingerprint)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    a.source_id || null, a.source_url || null, a.title, a.abstract || null, a.authors || null,
    a.journal || null, a.pub_date || null, a.doi || null, a.domain, a.source || 'PubMed',
    a.relevance || 0, a.evidence_level || 'D', a.llm_confidence || 0, a.llm_summary || null,
    JSON.stringify(a.keywords || []), JSON.stringify(a.mesh_terms || []), a.session_id || null,
    a.fingerprint || null
  );
  return r.lastInsertRowid;
}

function articleExists(sourceId) {
  if (!sourceId) return false;
  const r = getDb().prepare('SELECT id FROM articles WHERE source_id = ?').get(sourceId);
  return !!r;
}

function getArticles(opts) {
  const d = getDb();
  let sql = 'SELECT * FROM articles';
  const params = [];
  const where = [];
  if (opts.status) { where.push('status = ?'); params.push(opts.status); }
  if (opts.domain) { where.push('domain = ?'); params.push(opts.domain); }
  if (opts.source) { where.push('source = ?'); params.push(opts.source); }
  if (opts.evidence_level) { where.push('evidence_level = ?'); params.push(opts.evidence_level); }
  if (opts.session_id) { where.push('session_id = ?'); params.push(opts.session_id); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY created_at DESC';
  if (opts.limit) sql += ' LIMIT ?';
  if (opts.limit) params.push(opts.limit);
  return d.prepare(sql).all(...params);
}

function updateArticleStatus(id, status, userEmail, comment) {
  const d = getDb();
  const old = d.prepare('SELECT status FROM articles WHERE id = ?').get(id);
  d.prepare(`UPDATE articles SET status=?, status_changed_at=datetime('now'),
    status_changed_by=?, expert_comment=?, updated_at=datetime('now') WHERE id=?`)
    .run(status, userEmail || null, comment || null, id);
  d.prepare(`INSERT INTO changelog (article_id, action, old_status, new_status, user_email, comment)
    VALUES (?, ?, ?, ?, ?, ?)`).run(id, status, old ? old.status : null, status, userEmail || null, comment || null);
}

function getArticleStats() {
  const d = getDb();
  const total = d.prepare('SELECT COUNT(*) as count FROM articles').get();
  const byStatus = d.prepare('SELECT status, COUNT(*) as count FROM articles GROUP BY status').all();
  const byDomain = d.prepare('SELECT domain, COUNT(*) as count FROM articles GROUP BY domain ORDER BY count DESC').all();
  const bySource = d.prepare('SELECT source, COUNT(*) as count FROM articles GROUP BY source ORDER BY count DESC').all();
  const byEvidence = d.prepare('SELECT evidence_level, COUNT(*) as count FROM articles GROUP BY evidence_level').all();
  const byDay = d.prepare(`SELECT date(created_at) as day, COUNT(*) as count 
    FROM articles GROUP BY date(created_at) ORDER BY day DESC LIMIT 30`).all();
  const topJournals = d.prepare(`SELECT journal, COUNT(*) as count FROM articles 
    WHERE journal IS NOT NULL AND journal != '' GROUP BY journal ORDER BY count DESC LIMIT 10`).all();
  return { total: total.count, byStatus, byDomain, bySource, byEvidence, byDay, topJournals };
}

function getChangelog(articleId) {
  if (articleId) {
    return getDb().prepare('SELECT * FROM changelog WHERE article_id = ? ORDER BY created_at DESC').all(articleId);
  }
  return getDb().prepare('SELECT * FROM changelog ORDER BY created_at DESC LIMIT 100').all();
}

// ── Sources ──

function upsertSource(name, url, type, authorityScore) {
  const d = getDb();
  const existing = d.prepare('SELECT id FROM sources WHERE name = ?').get(name);
  if (existing) {
    if (url && authorityScore) {
      d.prepare('UPDATE sources SET url = COALESCE(NULLIF(?,\'\'), url), authority_score = COALESCE(?, authority_score) WHERE id = ?')
        .run(url, authorityScore, existing.id);
    }
    return existing.id;
  }
  const r = d.prepare('INSERT INTO sources (name, url, type, authority_score) VALUES (?, ?, ?, ?)')
    .run(name, url || null, type || 'org', authorityScore || 50);
  return r.lastInsertRowid;
}

function linkArticleSource(articleId, sourceId, referenceText, sourceUrl) {
  const d = getDb();
  d.prepare('INSERT INTO article_sources (article_id, source_id, reference_text, source_url) VALUES (?, ?, ?, ?)')
    .run(articleId, sourceId, referenceText || null, sourceUrl || null);
}

function getSourceStats() {
  const d = getDb();
  const bySource = d.prepare(`
    SELECT s.id, s.name, s.url, s.type, s.authority_score, COUNT(as2.article_id) as article_count
    FROM sources s
    LEFT JOIN article_sources as2 ON s.id = as2.source_id
    GROUP BY s.id
    ORDER BY article_count DESC, s.authority_score DESC
  `).all();
  const byAuthority = d.prepare(`
    SELECT 
      CASE 
        WHEN s.authority_score >= 90 THEN 'A'
        WHEN s.authority_score >= 70 THEN 'B'
        WHEN s.authority_score >= 50 THEN 'C'
        ELSE 'D'
      END as tier,
      COUNT(DISTINCT s.id) as source_count,
      COUNT(as2.article_id) as article_count
    FROM sources s
    LEFT JOIN article_sources as2 ON s.id = as2.source_id
    GROUP BY tier
    ORDER BY tier
  `).all();
  const total = d.prepare('SELECT COUNT(*) as count FROM sources').get();
  return { total: total.count, bySource, byAuthority };
}

// ── API Keys ──

function getApiKeys() {
  return getDb().prepare('SELECT * FROM api_keys ORDER BY provider, priority').all();
}

function upsertApiKey(key) {
  if (key.id) {
    getDb().prepare(`UPDATE api_keys SET provider=?, key_value=?, label=?, is_active=?, priority=? WHERE id=?`)
      .run(key.provider, key.key_value, key.label || '', key.is_active ?? 1, key.priority || 0, key.id);
    return key.id;
  }
  const r = getDb().prepare(`INSERT INTO api_keys (provider, key_value, label, is_active, priority) VALUES (?,?,?,?,?)`)
    .run(key.provider, key.key_value, key.label || '', key.is_active ?? 1, key.priority || 0);
  return r.lastInsertRowid;
}

function deleteApiKey(id) {
  getDb().prepare('DELETE FROM api_keys WHERE id = ?').run(id);
}

// ── API Usage ──

function trackApiUsage({ provider, model, tokens_in, tokens_out, cost }) {
  getDb().prepare(`INSERT INTO api_usage (provider, model, tokens_in, tokens_out, requests, cost) VALUES (?,?,?,?,1,?)`)
    .run(provider, model || '', tokens_in || 0, tokens_out || 0, cost || 0);
}

function getApiUsage(provider) {
  let sql = `SELECT provider, model, SUM(tokens_in) as tokens_in, SUM(tokens_out) as tokens_out,
             SUM(requests) as requests, SUM(cost) as cost
             FROM api_usage WHERE period_start >= date('now', 'start of month')`;
  const params = [];
  if (provider) { sql += ' AND provider = ?'; params.push(provider); }
  sql += ' GROUP BY provider, model ORDER BY cost DESC';
  const usage = getDb().prepare(sql).all(...params);
  const total = getDb().prepare(`SELECT SUM(requests) as requests, SUM(cost) as cost,
    SUM(tokens_in) as tokens_in, SUM(tokens_out) as tokens_out
    FROM api_usage WHERE period_start >= date('now', 'start of month')`).get();
  return { usage, total, period: 'current_month' };
}

function getDailyUsage(provider) {
  let sql = `SELECT provider, SUM(requests) as requests, SUM(tokens_in) as tokens_in,
               SUM(tokens_out) as tokens_out, SUM(cost) as cost
               FROM api_usage WHERE date(created_at) = date('now')`;
  const params = [];
  if (provider) { sql += ' AND provider = ?'; params.push(provider); }
  const row = getDb().prepare(sql).get(...params);
  if (!row || row.requests === null) return { provider: provider || 'all', requests: 0, tokens_in: 0, tokens_out: 0, cost: 0 };
  return row;
}

module.exports = {
  init, getDb,
  getSearchQueries, upsertSearchQuery, deleteSearchQuery,
  createSession, completeSession, cancelSession, getSearchSessions,
  insertArticle, articleExists, getArticles, updateArticleStatus,
  getArticleStats, getChangelog,
  upsertSource, linkArticleSource, getSourceStats,
  getApiKeys, upsertApiKey, deleteApiKey,
  trackApiUsage, getApiUsage, getDailyUsage
};
