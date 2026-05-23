import React, { useState, useEffect } from 'react';

const STATUS_COLORS = {
  pending: '#b39ddb',
  done: '#00c853',
  skipped: '#ff9100',
  modified: '#2979ff',
  rescheduled: '#ff6d00',
  cancelled: '#d50000'
};

const STATUS_LABELS = {
  pending: 'Ожидается',
  done: 'Выполнено',
  skipped: 'Пропущено',
  modified: 'Изменено',
  rescheduled: 'Перенесено',
  cancelled: 'Отменено'
};

export default function PlanJournalView({ planId, profileId, onClose }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('timeline');
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  useEffect(() => {
    if (planId) fetchPlan();
    else if (profileId) fetchPlansList();
  }, [planId, profileId]);

  async function fetchPlan() {
    setLoading(true);
    try {
      const r = await fetch(`/api/plan/${planId}`);
      const d = await r.json();
      if (d.error) { setError(d.error); return; }
      setPlan(d.plan);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function fetchPlansList() {
    setLoading(true);
    try {
      const r = await fetch(`/api/plans?profile_id=${profileId}`);
      const d = await r.json();
      if (d.plans?.length > 0) {
        setPlan(d.plans[0]);
      } else {
        setError('Нет планов для этого профиля');
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handlePatch(intId, status) {
    const r = await fetch(`/api/plan/${plan.plan_id}/intervention/${intId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const d = await r.json();
    if (d.plan) setPlan(d.plan);
  }

  async function handleReschedule(intId) {
    const r = await fetch(`/api/plan/${plan.plan_id}/reschedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intervention_id: intId, new_date: rescheduleDate, new_time: rescheduleTime })
    });
    const d = await r.json();
    if (d.plan) setPlan(d.plan);
    setRescheduleId(null);
  }

  function openReschedule(s) {
    setRescheduleId(s.id);
    setRescheduleDate(s.date);
    setRescheduleTime(s.scheduled_time);
  }

  async function handleApprove() {
    const r = await fetch(`/api/plan/${plan.plan_id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved_by: 'doctor' })
    });
    const d = await r.json();
    if (d.plan) setPlan(d.plan);
  }

  async function handleExport() {
    window.open(`/api/plan/${plan.plan_id}/export`, '_blank');
  }

  if (loading) return <div className="pjl-loading">Загрузка плана...</div>;
  if (error) return <div className="pjl-error">{error}</div>;
  if (!plan) return null;

  const days = {};
  plan.schedule.forEach(s => {
    if (!days[s.date]) days[s.date] = [];
    days[s.date].push(s);
  });
  const sortedDates = Object.keys(days).sort();

  return (
    <div className="pjl-overlay" onClick={onClose}>
      <div className="pjl-popup" onClick={e => e.stopPropagation()}>
        <div className="pjl-header">
          <div>
            <h2>{plan.title}</h2>
            <span className="pjl-status" style={{ background: plan.status === 'active' ? '#00c853' : plan.status === 'draft' ? '#ff9100' : '#b39ddb' }}>
              {plan.status}
            </span>
            <span className="pjl-meta">Plan: {plan.plan_id.slice(0, 12)}…</span>
          </div>
          <button className="pjl-close" onClick={onClose}>×</button>
        </div>

        <div className="pjl-progress-bar">
          <div className="pjl-progress-fill" style={{ width: `${plan.computed.progress_pct}%` }} />
          <span className="pjl-progress-label">{plan.computed.done_count}/{plan.computed.total_count} · {plan.computed.progress_pct}%</span>
        </div>

        <div className="pjl-tabs">
          <button className={`pjl-tab ${tab === 'timeline' ? 'active' : ''}`} onClick={() => setTab('timeline')}>📅 Дни</button>
          <button className={`pjl-tab ${tab === 'approve' ? 'active' : ''}`} onClick={() => setTab('approve')}>✅ Апрув</button>
          <button className={`pjl-tab ${tab === 'export' ? 'active' : ''}`} onClick={() => setTab('export')}>📤 Экспорт</button>
        </div>

        <div className="pjl-body">
          {tab === 'timeline' && (
            <div className="pjl-timeline">
              {sortedDates.map(date => (
                <div key={date} className="pjl-day-group">
                  <div className="pjl-day-header">{date}</div>
                  {days[date].map(s => (
                    <div key={s.id} className="pjl-intervention" data-status={s.status}>
                      <div className="pjl-int-left">
                        <span className="pjl-int-code">{s.code}</span>
                        <span className="pjl-int-time">{s.scheduled_time}</span>
                        {s.comment && <span className="pjl-int-comment">— {s.comment}</span>}
                      </div>
                      <div className="pjl-int-right">
                        <span className="pjl-int-status" style={{ color: STATUS_COLORS[s.status] }}>
                          {STATUS_LABELS[s.status]}
                        </span>
                        {s.status === 'pending' && (
                          <div className="pjl-int-actions">
                            <button className="pjl-btn-done" onClick={() => handlePatch(s.id, 'done')}>✓</button>
                            <button className="pjl-btn-skip" onClick={() => handlePatch(s.id, 'skipped')}>✕</button>
                            <button className="pjl-btn-resched" onClick={() => openReschedule(s)} title="Перенести">🔄</button>
                          </div>
                        )}
                        {rescheduleId === s.id && (
                          <div className="pjl-resched-picker">
                            <input type="date" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)}
                              className="pjl-resched-input" />
                            <input type="time" value={rescheduleTime} onChange={e => setRescheduleTime(e.target.value)}
                              className="pjl-resched-input" />
                            <button className="pjl-btn-confirm" onClick={() => handleReschedule(s.id)}>✓</button>
                            <button className="pjl-btn-cancel" onClick={() => setRescheduleId(null)}>✕</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {tab === 'approve' && (
            <div className="pjl-approve">
              {plan.status === 'draft' ? (
                <>
                  <table className="pjl-approve-table">
                    <thead>
                      <tr><th>Параметр</th><th>Значение</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Plan ID</td><td>{plan.plan_id}</td></tr>
                      <tr><td>Протокол</td><td>{plan.protocol_id}</td></tr>
                      <tr><td>Интервенций</td><td>{plan.schedule.length}</td></tr>
                      <tr><td>Длительность</td><td>{sortedDates.length} дней</td></tr>
                      <tr><td>Статус</td><td style={{ color: '#ff9100' }}>Черновик (ожидает апрува)</td></tr>
                      <tr><td>Прогресс</td><td>{plan.computed.progress_pct}%</td></tr>
                    </tbody>
                  </table>
                  <div className="pjl-approve-actions">
                    <button className="pjl-btn-approve" onClick={handleApprove}>✅ Утвердить план</button>
                    <button className="pjl-btn-reject" onClick={() => alert('Отправлено на доработку')}>🔄 Отправить на доработку</button>
                  </div>
                </>
              ) : (
                <div className="pjl-approved-info">
                  ✅ План утверждён {plan.approved_by ? `(кем: ${plan.approved_by})` : ''}
                </div>
              )}
            </div>
          )}

          {tab === 'export' && (
            <div className="pjl-export">
              <p>Скачать Plan-Journal как JSON-файл. Файл можно сохранить на USB, отправить в Telegram, открыть на другом устройстве.</p>
              <button className="pjl-btn-export" onClick={handleExport}>📥 Скачать plan.json</button>
              <textarea className="pjl-json-preview" readOnly value={JSON.stringify(plan, null, 2)} rows={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
