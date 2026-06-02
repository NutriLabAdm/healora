const Database = require('better-sqlite3');
const db = new Database('../api/knowledge.db');

// Update source based on source_url path (first directory component)
const rows = db.prepare("SELECT id, source_url FROM articles WHERE source = 'local'").all();
const update = db.prepare('UPDATE articles SET source = ?, updated_at = datetime("now") WHERE id = ?');

let updated = 0;
for (const r of rows) {
  if (!r.source_url) continue;
  const parts = r.source_url.replace(/\\/g, '/').split('/');
  const sourceName = parts[0];
  if (sourceName && sourceName !== 'local') {
    update.run(sourceName, r.id);
    updated++;
  }
}

console.log(`Updated ${updated} articles with directory-based source names`);

const bySource = db.prepare('SELECT source, COUNT(*) as count FROM articles GROUP BY source ORDER BY count DESC').all();
console.log('\nBy source:');
for (const s of bySource) console.log(`  ${s.source}: ${s.count}`);

db.close();
