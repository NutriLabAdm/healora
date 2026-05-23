import React, { useState, useEffect } from 'react';

const STATUS_COLORS = { draft: '#ff9100', active: '#00c853', paused: '#2979ff', completed: '#b39ddb', cancelled: '#d50000' };
const STATUS_LABELS = { draft: 'Черновик', active: 'Активен', paused: 'На паузе', completed: 'Завершён', cancelled: 'Отменён' };

export default function PlanList({ profileId, onSelectPlan }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) return;
    setLoading(true);
    fetch(`/api/plans?profile_id=${profileId}`)
      .then(r => r.json())
      .then(d => setPlans(d.plans || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [profileId]);

  if (loading) return <div className="plan-list-loading" style={{ padding: 12, color: 'var(--text-muted)', fontSize: 13 }}>Загрузка...</div>;
  if (plans.length === 0) return <div className="plan-list-empty" style={{ padding: 12, color: 'var(--text-muted)', fontSize: 13 }}>Нет планов</div>;

  return (
    <div className="plan-list">
      {plans.map(p => (
        <div key={p.plan_id} className="plan-list-item" onClick={() => onSelectPlan(p.plan_id)}>
          <div>
            <div className="plan-list-title">{p.title}</div>
            <div className="plan-list-meta">{p.plan_id.slice(0, 12)}… · {p.computed.done_count}/{p.computed.total_count} · {p.computed.progress_pct}%</div>
          </div>
          <span className="plan-list-status" style={{ background: STATUS_COLORS[p.status] }}>{STATUS_LABELS[p.status]}</span>
        </div>
      ))}
    </div>
  );
}
