const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'docs/domain/knowledge');
const DB_PATH = path.join(__dirname, '..', 'api', 'knowledge.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Ensure tables exist (in case knowledgeDb.init() wasn't called yet)
db.exec(`
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
`);

// ── Known source authority mapping ──
const SOURCE_AUTHORITY = {
  // Tier A (90-100)
  'thelancet.com':       { name: 'The Lancet',        type: 'journal',  score: 98 },
  'nejm.org':           { name: 'NEJM',               type: 'journal',  score: 98 },
  'nature.com':         { name: 'Nature',             type: 'journal',  score: 97 },
  'cell.com':           { name: 'Cell',               type: 'journal',  score: 96 },
  'science.org':        { name: 'Science',            type: 'journal',  score: 96 },
  'cochranelibrary.com':{ name: 'Cochrane Library',   type: 'journal',  score: 95 },
  'who.int':            { name: 'WHO',                type: 'org',      score: 95 },
  'nih.gov':            { name: 'NIH',                type: 'org',      score: 93 },
  'ods.od.nih.gov':     { name: 'NIH ODS',            type: 'database', score: 93 },
  'pubmed.ncbi.nlm.nih.gov': { name: 'PubMed',        type: 'database', score: 90 },
  'ncbi.nlm.nih.gov':   { name: 'PubMed Central',     type: 'database', score: 90 },
  'who':                { name: 'WHO',                type: 'org',      score: 95 },
  'world health organization': { name: 'WHO',         type: 'org',      score: 95 },

  // Tier B (70-89)
  'bmj.com':            { name: 'BMJ',                type: 'journal',  score: 88 },
  'jamanetwork.com':    { name: 'JAMA',               type: 'journal',  score: 88 },
  'endocrine.org':      { name: 'Endocrine Society',  type: 'org',      score: 85 },
  'diabetesjournals.org': { name: 'ADA Diabetes Care', type: 'journal', score: 85 },
  'academic.oup.com':   { name: 'Oxford Academic',    type: 'publisher',score: 82 },
  'springer.com':       { name: 'Springer',           type: 'publisher',score: 80 },
  'link.springer.com':  { name: 'Springer',           type: 'publisher',score: 80 },
  'elsevier.com':       { name: 'Elsevier',           type: 'publisher',score: 80 },
  'sciencedirect.com':  { name: 'Elsevier',           type: 'publisher',score: 80 },
  'tandfonline.com':    { name: 'Taylor & Francis',   type: 'publisher',score: 78 },
  'wiley.com':          { name: 'Wiley',              type: 'publisher',score: 78 },
  'cdc.gov':            { name: 'CDC',                type: 'org',      score: 88 },
  'fda.gov':            { name: 'FDA',                type: 'org',      score: 85 },
  'heart.org':          { name: 'American Heart Association', type: 'org', score: 85 },
  'sleepfoundation.org':{ name: 'Sleep Foundation',   type: 'org',      score: 75 },
  'nationalacademies.org': { name: 'National Academies', type: 'org',   score: 88 },
  'pubchem.ncbi.nlm.nih.gov': { name: 'PubChem',      type: 'database', score: 82 },
  'harvard.edu':        { name: 'Harvard',            type: 'org',      score: 85 },
  'who.int':            { name: 'WHO',                type: 'org',      score: 95 },
  'nlm.nih.gov':        { name: 'NLM',                type: 'database', score: 85 },
  'mayoclinic.org':     { name: 'Mayo Clinic',        type: 'org',      score: 82 },
  'medscape.com':       { name: 'Medscape',           type: 'database', score: 70 },
  'webmd.com':          { name: 'WebMD',              type: 'database', score: 60 },

  // Tier C (50-69)
  'examine.com':        { name: 'Examine.com',        type: 'database', score: 68 },
  'issfal.org':         { name: 'ISSFAL',             type: 'org',      score: 72 },
  'cgon.rospotrebnadzor.ru': { name: 'Роспотребнадзор', type: 'org',    score: 70 },
  'probl-endojournals.ru': { name: 'Проблемы эндокринологии', type: 'journal', score: 65 },
  'diabetes.org':       { name: 'American Diabetes Association', type: 'org', score: 80 },
  'eatright.org':       { name: 'Academy of Nutrition and Dietetics', type: 'org', score: 72 },

  // Wearable / Consumer (D — 30-49)
  'whoop.com':          { name: 'WHOOP',              type: 'wearable', score: 40 },
  'ouraring.com':       { name: 'Oura Ring',          type: 'wearable', score: 40 },
  'fitbit.com':         { name: 'Fitbit',             type: 'wearable', score: 35 },
  'garmin.com':         { name: 'Garmin',             type: 'wearable', score: 35 },
  'apple.com':          { name: 'Apple Health',       type: 'wearable', score: 30 },
  'levels.com':         { name: 'Levels',             type: 'wearable', score: 35 },
  'nutrisense.io':      { name: 'NutriSense',         type: 'wearable', score: 30 },
  'withings.com':       { name: 'Withings',           type: 'wearable', score: 35 },
  'biostrapp.com':      { name: 'Biostrap',           type: 'wearable', score: 30 },
  'dexcom.com':         { name: 'Dexcom',             type: 'wearable', score: 35 },
  'joovv.com':          { name: 'Joovv',              type: 'wearable', score: 20 },
  'saunaspace.com':     { name: 'Sunlighten Sauna',   type: 'wearable', score: 15 },
  'therising.com':      { name: 'Rising',             type: 'wearable', score: 15 },

  // Russian health orgs
  'rpn.gov.ru':         { name: 'Роспотребнадзор',    type: 'org',      score: 70 },

  // Known org short names
  'ada':                { name: 'American Diabetes Association', type: 'org', score: 80 },
  'nih':                { name: 'NIH',                type: 'org',      score: 93 },
  'fda':                { name: 'FDA',                type: 'org',      score: 85 },
  'cdc':                { name: 'CDC',                type: 'org',      score: 88 },
  'who':                { name: 'WHO',                type: 'org',      score: 95 },
  'cochrane':           { name: 'Cochrane Library',   type: 'journal',  score: 95 },
  'easo':               { name: 'EASO',               type: 'org',      score: 78 },
  'nice':               { name: 'NICE',               type: 'org',      score: 85 },
  'us preventive services task force': { name: 'USPSTF', type: 'org',  score: 82 },
  'aace':               { name: 'AACE',               type: 'org',      score: 78 },
  'american academy of pediatrics': { name: 'AAP',    type: 'org',      score: 80 },
  'american heart association': { name: 'American Heart Association', type: 'org', score: 85 },
  'american diabetes association': { name: 'American Diabetes Association', type: 'org', score: 80 },
  'efsa':               { name: 'EFSA',               type: 'org',      score: 80 },
  'european food safety authority': { name: 'EFSA',   type: 'org',      score: 80 },
  'us preventive services task force': { name: 'USPSTF', type: 'org',   score: 82 },
  'uspstf':             { name: 'USPSTF',             type: 'org',      score: 82 },
  'hrcak':              { name: 'Hrčak',              type: 'publisher',score: 50 },
  'provisor':           { name: 'Provisor',           type: 'other',    score: 30 },
  'fdc':                { name: 'USDA FDC',           type: 'database', score: 70 },
  'aap':                { name: 'American Academy of Pediatrics', type: 'org', score: 80 },
};

// ── Helpers ──

function getArticlesByPath() {
  const articles = db.prepare('SELECT id, source_url, title, domain FROM articles').all();
  const map = {};
  for (const a of articles) {
    if (a.source_url) map[a.source_url.replace(/\\/g, '/')] = a;
  }
  return map;
}

function extractDomain(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    return u.hostname.replace('www.', '');
  } catch { return null; }
}

function lookupAuthority(domain) {
  if (!domain) return null;
  // Exact match
  if (SOURCE_AUTHORITY[domain]) return SOURCE_AUTHORITY[domain];
  // Substring match
  for (const [key, val] of Object.entries(SOURCE_AUTHORITY)) {
    if (domain.includes(key) || key.includes(domain)) return val;
  }
  // Generic domain-based scoring
  if (domain.endsWith('.gov'))   return { name: domain.replace('.gov','').toUpperCase(), type: 'org',      score: 80 };
  if (domain.endsWith('.edu'))   return { name: domain.replace('.edu','').toUpperCase(), type: 'org',      score: 75 };
  if (domain.endsWith('.org'))   return { name: domain.split('.')[0],                      type: 'org',      score: 55 };
  if (domain.endsWith('.mil'))   return { name: domain,                                     type: 'org',      score: 60 };
  // Commercial default
  return { name: domain.split('.')[0], type: 'other', score: 30 };
}

// ── Extraction functions ──

const PMID_RE = /PMID:\s*(\d{7,8})/gi;
const DOI_RE = /DOI:\s*(10\.\S+?)(?=[,;.\s)\]])/gi;
const URL_RE = /https?:\/\/(?:www\.)?([a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}(?:\/[^\s)]*)?)/gi;
const ORG_REF_RE = /\b(WHO|NIH|FDA|CDC|ADA|EFSA|NICE|EASO|AACE|ISSFAL|Cochrane|USPSTF)\b/gi;

function extractReferences(content) {
  const refs = [];

  // 1. PMIDs
  let m;
  while ((m = PMID_RE.exec(content)) !== null) {
    const pmid = m[1];
    refs.push({
      type: 'pmid',
      id: pmid,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      name: `PubMed (PMID: ${pmid})`,
      authority: SOURCE_AUTHORITY['pubmed.ncbi.nlm.nih.gov'],
    });
  }

  // 2. DOIs — map prefix to publisher
  const DOI_PREFIX_MAP = {
    '10.1056': { name: 'NEJM',           type: 'journal',  score: 98, url: 'https://www.nejm.org' },
    '10.1016': { name: 'Elsevier',       type: 'publisher',score: 80, url: 'https://www.sciencedirect.com' },
    '10.1002': { name: 'Wiley',          type: 'publisher',score: 78, url: 'https://onlinelibrary.wiley.com' },
    '10.1186': { name: 'Springer',       type: 'publisher',score: 80, url: 'https://link.springer.com' },
    '10.1080': { name: 'Taylor & Francis', type: 'publisher',score: 78, url: 'https://www.tandfonline.com' },
    '10.1038': { name: 'Nature',         type: 'journal',  score: 97, url: 'https://www.nature.com' },
    '10.1111': { name: 'Wiley',          type: 'publisher',score: 78, url: 'https://onlinelibrary.wiley.com' },
    '10.1155': { name: 'Hindawi',        type: 'publisher',score: 60, url: 'https://www.hindawi.com' },
    '10.3390': { name: 'MDPI',           type: 'publisher',score: 55, url: 'https://www.mdpi.com' },
    '10.1177': { name: 'SAGE',           type: 'publisher',score: 75, url: 'https://journals.sagepub.com' },
    '10.1093': { name: 'Oxford Academic', type: 'publisher',score: 82, url: 'https://academic.oup.com' },
    '10.1371': { name: 'PLOS',           type: 'publisher',score: 75, url: 'https://journals.plos.org' },
    '10.1126': { name: 'Science',        type: 'journal',  score: 96, url: 'https://www.science.org' },
    '10.1146': { name: 'Annual Reviews', type: 'publisher',score: 85, url: 'https://www.annualreviews.org' },
    '10.2337': { name: 'ADA Diabetes Care', type: 'journal', score: 85, url: 'https://diabetesjournals.org/care' },
  };
  while ((m = DOI_RE.exec(content)) !== null) {
    const doi = m[1].replace(/\.$/, '');
    const prefix = doi.substring(0, doi.indexOf('/'));
    const doiAuth = DOI_PREFIX_MAP[prefix];
    if (doiAuth) {
      refs.push({
        type: 'doi',
        id: doi,
        url: `https://doi.org/${doi}`,
        name: doiAuth.name,
        authority: doiAuth,
      });
    } else {
      refs.push({
        type: 'doi',
        id: doi,
        url: `https://doi.org/${doi}`,
        name: `DOI: ${doi}`,
        authority: null,
      });
    }
  }

  // 3. URLs
  while ((m = URL_RE.exec(content)) !== null) {
    const fullUrl = m[0].replace(/[).,;]+$/, '');
    const domain = m[1];
    const auth = lookupAuthority(domain);
    refs.push({
      type: 'url',
      id: fullUrl,
      url: fullUrl.startsWith('http') ? fullUrl : 'https://' + fullUrl,
      name: auth ? auth.name : domain,
      authority: auth,
    });
  }

  // 4. Named org references in text
  while ((m = ORG_REF_RE.exec(content)) !== null) {
    const org = m[1].toLowerCase();
    const auth = lookupAuthority(org) || lookupAuthority(m[1]);
    if (auth) {
      refs.push({
        type: 'org',
        id: m[1],
        url: null,
        name: auth.name,
        authority: auth,
      });
    }
  }

  // Deduplicate by name+url
  const seen = new Set();
  return refs.filter(r => {
    const key = r.name + '|' + (r.url || '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Main ──

function walkDir(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const articleMap = getArticlesByPath();
  const allFiles = walkDir(KNOWLEDGE_DIR);
  console.log(`Found ${allFiles.length} markdown files, ${Object.keys(articleMap).length} articles in DB`);

  const upsertSourceStmt = db.prepare(
    'INSERT OR IGNORE INTO sources (name, url, type, authority_score) VALUES (?, ?, ?, ?)'
  );
  const getSourceStmt = db.prepare('SELECT id FROM sources WHERE name = ?');
  const linkStmt = db.prepare(
    'INSERT OR IGNORE INTO article_sources (article_id, source_id, reference_text, source_url) VALUES (?, ?, ?, ?)'
  );

  let totalRefs = 0;
  let linked = 0;

  const tx = db.transaction(() => {
    for (const filePath of allFiles) {
      // Calculate relative path matching source_url
      const relPath = path.relative(KNOWLEDGE_DIR, filePath).replace(/\\/g, '/');
      const article = articleMap[relPath];
      if (!article) {
        // Try matching by exact filename inside source_url
        const fname = path.basename(filePath);
        const match = Object.values(articleMap).find(a => a.source_url && a.source_url.endsWith(fname));
        if (!match) continue;
      }

      const a = article || Object.values(articleMap).find(a => a.source_url && a.source_url.endsWith(path.basename(filePath)));
      if (!a) continue;

      const content = fs.readFileSync(filePath, 'utf-8');
      const refs = extractReferences(content);

      for (const ref of refs) {
        totalRefs++;
        const auth = ref.authority || { name: ref.name, type: 'other', score: 50 };

        // Upsert source
        upsertSourceStmt.run(auth.name, ref.url || null, auth.type, auth.score);
        const s = getSourceStmt.get(auth.name);
        if (!s) continue;

        // Link
        try {
          linkStmt.run(a.id, s.id, ref.type + ':' + (ref.id || ''), ref.url || null);
          linked++;
        } catch { /* ignore duplicates */ }
      }
    }
  });

  tx();

  console.log(`Extracted ${totalRefs} references, linked ${linked} article-source pairs`);

  const sourceCount = db.prepare('SELECT COUNT(*) as c FROM sources').get();
  const linkCount = db.prepare('SELECT COUNT(*) as c FROM article_sources').get();
  console.log(`Sources in DB: ${sourceCount.c}, Links: ${linkCount.c}`);

  db.close();
}

main();
