const fs = require('fs');
const path = require('path');

const ALL_STATUSES = ['pending', 'done', 'skipped', 'modified', 'rescheduled', 'cancelled'];

const TYPE_PARAMS = {
  behavior: {
    duration: { type: 'number', min: 5, max: 180, unit: 'minutes' },
    notes: { type: 'string', maxLength: 500 }
  },
  supplement: {
    dosage_mg: { type: 'number', min: 1, max: 10000 },
    form: { type: 'string', enum: ['capsule', 'tablet', 'liquid', 'powder'] }
  },
  diagnostic: {
    referral_notes: { type: 'string', maxLength: 1000 }
  },
  device: {
    duration: { type: 'number', min: 1, max: 1440, unit: 'minutes' },
    notes: { type: 'string', maxLength: 500 }
  }
};

const files = [
  path.join(__dirname, '..', 'www', 'dev.healora.ru', 'src', 'assets', 'data', 'interventions_catalog.json'),
  path.join(__dirname, '..', 'docs', 'domain', 'intervention', 'interventions_catalog.json')
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${filePath}`);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const catalog = JSON.parse(raw);
  let modified = 0;

  for (const [code, entry] of Object.entries(catalog.interventions)) {
    if (!entry.allowed_statuses) {
      entry.allowed_statuses = ALL_STATUSES;
    }
    const intType = entry.type || 'behavior';
    const defaultParams = TYPE_PARAMS[intType] || TYPE_PARAMS.behavior;
    if (!entry.params_schema) {
      entry.params_schema = defaultParams;
    }
    modified++;
  }

  catalog.metadata.total_interventions = Object.keys(catalog.interventions).length;
  catalog.metadata.last_updated = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(filePath, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(`OK: ${filePath} — ${modified} interventions extended`);
}
