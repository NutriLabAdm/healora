const fs = require('fs');
const path = require('path');

const PLANS_DIR = process.env.PLANS_DIR || path.join(__dirname, 'user_data', 'plans');
const planCache = new Map();

function filePath(planId) {
  return path.join(PLANS_DIR, `${planId}.json`);
}

function ensureDir() {
  if (!fs.existsSync(PLANS_DIR)) {
    fs.mkdirSync(PLANS_DIR, { recursive: true });
  }
}

function loadAll() {
  ensureDir();
  planCache.clear();
  const files = fs.readdirSync(PLANS_DIR).filter(f => f.endsWith('.json'));
  for (const f of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(PLANS_DIR, f), 'utf-8'));
      if (data.plan_id) {
        planCache.set(data.plan_id, data);
      }
    } catch (err) {
      console.error(`[planStorage] Corrupted plan file: ${f}`, err.message);
    }
  }
  console.log(`[planStorage] Loaded ${planCache.size} plans from ${PLANS_DIR}`);
}

function get(planId) {
  return planCache.get(planId) || null;
}

function save(planId, data) {
  ensureDir();
  planCache.set(planId, data);
  fs.writeFileSync(filePath(planId), JSON.stringify(data, null, 2), 'utf-8');
  return data;
}

function remove(planId) {
  planCache.delete(planId);
  const fp = filePath(planId);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
}

function list(filter = {}) {
  const results = [];
  for (const plan of planCache.values()) {
    let match = true;
    if (filter.profile_id && plan.profile_id !== filter.profile_id) match = false;
    if (filter.status && plan.status !== filter.status) match = false;
    if (match) results.push(plan);
  }
  results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return results;
}

function generateId() {
  return 'plan_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

loadAll();

module.exports = { get, save, remove, list, generateId, loadAll, planCache };
