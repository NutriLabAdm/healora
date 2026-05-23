const fs = require('fs');
const path = require('path');
const { recompute } = require('./computedFields');
const { newPlan } = require('./planValidator');

const PROTOCOLS_PATH = path.join(__dirname, 'protocols_catalog.json');
let protocolsCatalog = [];

function loadProtocols() {
  try {
    protocolsCatalog = JSON.parse(fs.readFileSync(PROTOCOLS_PATH, 'utf-8'));
    console.log(`[scheduleGenerator] Loaded ${protocolsCatalog.length} protocols`);
  } catch (e) {
    console.error('[scheduleGenerator] Failed to load protocols:', e.message);
    protocolsCatalog = [];
  }
}

function getProtocol(protocolId) {
  return protocolsCatalog.find(p => p.protocol_id === protocolId) || null;
}

function listProtocols() {
  return protocolsCatalog.map(p => ({
    protocol_id: p.protocol_id,
    name: p.name,
    category: p.category,
    goal: p.goal,
    intervention_count: p.interventions.length
  }));
}

const REGULARITY_MAP = {
  D: { type: 'daily', days: [0, 1, 2, 3, 4, 5, 6] },
  W: { type: 'weekly', days: null },
  Y: { type: 'yearly', days: [0] },
  P: { type: 'ondemand', days: [] }
};

function generateSchedule(protocolId, profileId, options = {}) {
  const protocol = getProtocol(protocolId);
  if (!protocol) return { error: `Protocol ${protocolId} not found` };

  const durationDays = options.duration_days || 14;
  const codes = protocol.interventions;
  const startDate = options.start_date || new Date().toISOString().slice(0, 10);

  // ── Adaptivity: adjust intensity based on health literacy score ──────
  const literacyScore = options.health_literacy_score;
  const intensityOverride = options.intensity; // 'low' | 'medium' | 'high' | undefined
  let skipModulo = 1;
  if (intensityOverride) {
    if (intensityOverride === 'low')      skipModulo = 3;
    else if (intensityOverride === 'medium') skipModulo = 2;
    /* high → 1 (daily) */
  } else if (literacyScore != null) {
    if (literacyScore < 34)       skipModulo = 3;  // every 3rd day
    else if (literacyScore < 67)  skipModulo = 2;  // every other day
  }
  // skipModulo=1 means every day (no skipping)

  const schedule = [];
  let idCounter = 0;

  for (const code of codes) {
    const regularity = 'D';
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];

    for (let day = 1; day <= durationDays; day++) {
      if (skipModulo > 1 && day % skipModulo !== 1) continue; // skip days per adaptivity

      const date = new Date(startDate);
      date.setDate(date.getDate() + day - 1);
      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().slice(0, 10);

      if (!daysOfWeek.includes(dayOfWeek)) continue;

      idCounter++;
      schedule.push({
        id: `${code}_${String(idCounter).padStart(3, '0')}`,
        day,
        date: dateStr,
        code,
        type: 'behavior',
        scheduled_time: '09:00',
        params: {},
        status: 'pending',
        result: null,
        completed_at: null,
        comment: null
      });
    }
  }

  const plan = newPlan(profileId, protocolId, protocol.name, schedule);
  const computed = recompute(plan.schedule);
  plan.computed = computed;

  return plan;
}

loadProtocols();

module.exports = { generateSchedule, getProtocol, listProtocols };
