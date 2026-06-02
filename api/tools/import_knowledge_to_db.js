const fs = require('fs');
const path = require('path');
const kb = require('../api/knowledgeDb');

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'docs', 'domain', 'knowledge');
kb.init();

const DIR_TO_DOMAIN = {
  behavior_design: 'habits',
  cjm: 'literature',
  client_care: 'literature',
  diary: 'nutrition',
  diet_preferences: 'nutrition',
  diet_restrictions: 'nutrition',
  diets: 'nutrition',
  drugs: 'longevity',
  environment_design: 'environment',
  food: 'nutrition',
  genetics: 'longevity',
  intervention: 'nutrition',
  interview_design: 'literature',
  med_traditional_practices: 'longevity',
  minerals: 'nutrition',
  plans_per_twin: 'literature',
  protocol_obecity: 'obesity',
  protocols: 'obesity',
  psyhotypes: 'stress',
  superfoods: 'nutrition',
  supplements: 'nutrition',
  treatment_plans: 'obesity',
  vitamin_like: 'nutrition',
  vitamins: 'nutrition',
};

const EXT_EVIDENCE = {
  md: 'C', json: 'D', js: 'D', txt: 'D',
};

function guessEvidence(filename) {
  const ext = path.extname(filename).slice(1).toLowerCase();
  return EXT_EVIDENCE[ext] || 'D';
}

function guessTitle(filename, content) {
  const basename = path.basename(filename, path.extname(filename));
  const fromMd = content.match(/^#\s+(.+)/m);
  if (fromMd) return fromMd[1].trim();
  const fromJson = content.match(/"name_ru"\s*:\s*"([^"]+)"/);
  if (fromJson) return fromJson[1];
  return basename.replace(/[_-]/g, ' ');
}

function getFilesRecursive(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getFilesRecursive(full));
    else if (e.isFile() && !e.name.startsWith('.')) files.push(full);
  }
  return files;
}

let totalInserted = 0;
let totalSkipped = 0;
let errors = [];

const dirs = fs.readdirSync(KNOWLEDGE_DIR, { withFileTypes: true }).filter(d => d.isDirectory());

for (const dir of dirs) {
  const domain = DIR_TO_DOMAIN[dir.name] || 'literature';
  const files = getFilesRecursive(path.join(KNOWLEDGE_DIR, dir.name));

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8').trim();
      if (!content) { totalSkipped++; continue; }

      const relPath = path.relative(KNOWLEDGE_DIR, filePath);
      const sourceId = 'local:' + relPath.replace(/\\/g, '/');
      if (kb.articleExists(sourceId)) { totalSkipped++; continue; }

      const title = guessTitle(filePath, content);
      const first200 = content.slice(0, 500).replace(/```[\s\S]*?```/g, '').trim();
      const ext = path.extname(filePath).slice(1);

      kb.insertArticle({
        source_id: sourceId,
        source_url: relPath.replace(/\\/g, '/'),
        title,
        abstract: first200.length > 100 ? first200.slice(0, 300) + '...' : (first200 || title),
        authors: '',
        journal: 'Healora Knowledge Base',
        pub_date: '',
        doi: '',
        domain,
        source: 'local',
        relevance: 1.0,
        evidence_level: guessEvidence(filePath),
        llm_confidence: 1.0,
        llm_summary: '',
        keywords: [dir.name, ext],
        mesh_terms: [],
        session_id: null,
      });
      totalInserted++;
    } catch (err) {
      errors.push({ file: filePath, error: err.message });
    }
  }
}

const stats = kb.getArticleStats();
console.log(`\nInserted: ${totalInserted}`);
console.log(`Skipped (empty/dup): ${totalSkipped}`);
console.log(`Errors: ${errors.length}`);
console.log(`Total in DB now: ${stats.total}`);
console.log(`\nBy domain:`);
for (const d of stats.byDomain) console.log(`  ${d.domain}: ${d.count}`);
console.log(`\nBy source:`);
for (const s of stats.bySource) console.log(`  ${s.source}: ${s.count}`);
console.log(`\nBy status:`);
for (const s of stats.byStatus) console.log(`  ${s.status}: ${s.count}`);

if (errors.length) {
  console.log('\nErrors:');
  errors.forEach(e => console.log(`  ${e.file}: ${e.error}`));
}
