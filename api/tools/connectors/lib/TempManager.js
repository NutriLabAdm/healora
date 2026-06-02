const fs = require('fs');
const path = require('path');

const BASE_DIR = process.env.SEARCH_TEMP_DIR || path.join(require('os').tmpdir(), 'search_sessions');

function sessionDir(sessionId) {
  return path.join(BASE_DIR, String(sessionId));
}

async function ensure(sessionId) {
  const base = sessionDir(sessionId);
  for (const sub of ['raw', 'normalized', 'dedup', 'enriched']) {
    fs.mkdirSync(path.join(base, sub), { recursive: true });
  }
  return base;
}

function rawPath(sessionId, source) {
  return path.join(sessionDir(sessionId), 'raw', `${source}.json`);
}

function normalizedPath(sessionId, source) {
  return path.join(sessionDir(sessionId), 'normalized', `${source}.ndjson`);
}

function dedupPath(sessionId) {
  return path.join(sessionDir(sessionId), 'dedup', 'merged.ndjson');
}

function enrichedPath(sessionId) {
  return path.join(sessionDir(sessionId), 'enriched', 'final.ndjson');
}

function fingerprintIndexPath(sessionId) {
  return path.join(sessionDir(sessionId), 'dedup', 'fingerprints.json');
}

function saveRaw(sessionId, source, data) {
  fs.writeFileSync(rawPath(sessionId, source), JSON.stringify(data, null, 2));
}

function loadRaw(sessionId, source) {
  const p = rawPath(sessionId, source);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function appendNdjson(filePath, items) {
  const str = items.map(i => JSON.stringify(i)).join('\n') + '\n';
  fs.appendFileSync(filePath, str);
}

function loadNdjson(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

function listRaw(sessionId) {
  const dir = path.join(sessionDir(sessionId), 'raw');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

async function cleanup(sessionId) {
  const dir = sessionDir(sessionId);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function cleanupOld(maxAgeMs = 24 * 60 * 60 * 1000) {
  if (!fs.existsSync(BASE_DIR)) return;
  for (const entry of fs.readdirSync(BASE_DIR)) {
    const p = path.join(BASE_DIR, entry);
    try {
      const stat = fs.statSync(p);
      if (stat.isDirectory() && Date.now() - stat.mtimeMs > maxAgeMs) {
        fs.rmSync(p, { recursive: true, force: true });
      }
    } catch { }
  }
}

module.exports = {
  ensure, sessionDir, saveRaw, loadRaw, listRaw,
  normalizedPath, dedupPath, enrichedPath, fingerprintIndexPath,
  appendNdjson, loadNdjson, cleanup, cleanupOld,
};
