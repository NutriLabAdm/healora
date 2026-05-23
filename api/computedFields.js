function recompute(schedule) {
  const total = schedule.length;
  const done = schedule.filter(s => s.status === 'done').length;
  const skipped = schedule.filter(s => s.status === 'skipped').length;
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;

  const sorted = [...schedule].sort((a, b) => new Date(a.date) - new Date(b.date));
  let streakDays = 0;
  let missedStreak = 0;
  const today = new Date().toISOString().slice(0, 10);

  for (let i = sorted.length - 1; i >= 0; i--) {
    const s = sorted[i];
    if (s.date > today) continue;
    if (s.status === 'done') {
      streakDays++;
      missedStreak = 0;
    } else if (s.status === 'skipped' || s.status === 'cancelled') {
      if (streakDays > 0) break;
      missedStreak++;
    } else if (s.status === 'pending' && s.date <= today) {
      if (streakDays > 0) break;
      missedStreak++;
    }
  }

  const next = sorted.find(s => s.status === 'pending' && s.date >= today);

  return {
    progress_pct: progressPct,
    done_count: done,
    total_count: total,
    streak_days: streakDays,
    missed_streak: missedStreak,
    next_intervention: next ? `${next.date}T${next.scheduled_time}:00Z` : null
  };
}

module.exports = { recompute };
