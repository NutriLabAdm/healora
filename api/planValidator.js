const VALID_STATUSES = ['draft', 'active', 'paused', 'completed', 'cancelled'];
const VALID_SOURCES = ['engine', 'hitl'];
const VALID_INTERVENTION_STATUSES = ['pending', 'done', 'skipped', 'modified', 'rescheduled', 'cancelled'];

function validate(data) {
  const errors = [];

  if (!data.plan_id || typeof data.plan_id !== 'string') {
    errors.push('plan_id: required string');
  }
  if (!data.profile_id || typeof data.profile_id !== 'string') {
    errors.push('profile_id: required string');
  }
  if (!data.protocol_id || typeof data.protocol_id !== 'string') {
    errors.push('protocol_id: required string');
  }
  if (!data.title) {
    errors.push('title: required');
  }
  if (!VALID_STATUSES.includes(data.status)) {
    errors.push(`status: must be one of ${VALID_STATUSES.join(', ')}`);
  }
  if (!VALID_SOURCES.includes(data.source)) {
    errors.push(`source: must be one of ${VALID_SOURCES.join(', ')}`);
  }
  if (!Array.isArray(data.schedule)) {
    errors.push('schedule: required array');
  } else {
    for (let i = 0; i < data.schedule.length; i++) {
      const s = data.schedule[i];
      if (!s.id) errors.push(`schedule[${i}].id: required`);
      if (typeof s.day !== 'number') errors.push(`schedule[${i}].day: required number`);
      if (!s.code) errors.push(`schedule[${i}].code: required`);
      if (!VALID_INTERVENTION_STATUSES.includes(s.status)) {
        errors.push(`schedule[${i}].status: invalid (${s.status})`);
      }
    }
  }

  if (!data.computed || typeof data.computed.progress_pct !== 'number') {
    errors.push('computed.progress_pct: required number');
  }

  return errors;
}

function newPlan(profileId, protocolId, protocolName, schedule) {
  const now = new Date().toISOString();
  return {
    plan_id: '',
    profile_id: profileId,
    protocol_id: protocolId,
    title: `${protocolName} — ${schedule.length} interventions`,
    status: 'draft',
    created_at: now,
    source: 'engine',
    approved_by: null,
    schedule: schedule.map(s => ({
      id: s.id,
      day: s.day,
      date: s.date,
      code: s.code,
      type: s.type || 'behavior',
      scheduled_time: s.scheduled_time || '09:00',
      params: s.params || {},
      status: 'pending',
      result: null,
      completed_at: null,
      comment: null
    })),
    computed: {
      progress_pct: 0,
      done_count: 0,
      total_count: schedule.length,
      streak_days: 0,
      missed_streak: 0,
      next_intervention: null
    },
    changelog: [
      { at: now, action: 'created', by: 'engine' }
    ]
  };
}

module.exports = { validate, newPlan, VALID_STATUSES, VALID_INTERVENTION_STATUSES };
