import React, { useState } from 'react';

const GOAL_BADGES = [
  { id: 'sleep', icon: '🌙', label: 'Улучшить сон', keywords: 'сон спать бессонница' },
  { id: 'weight', icon: '⚖️', label: 'Снизить вес', keywords: 'вес похудеть жир ожирение' },
  { id: 'glucose', icon: '🩸', label: 'Контроль сахара', keywords: 'сахар глюкоза диабет' },
  { id: 'heart', icon: '❤️', label: 'Здоровье сердца', keywords: 'сердце давление пульс' },
  { id: 'stress', icon: '🧘', label: 'Снизить стресс', keywords: 'стресс тревога депрессия' },
  { id: 'brain', icon: '🧠', label: 'Когнитивное здоровье', keywords: 'мозг память когнитив' },
  { id: 'longevity', icon: '⏳', label: 'Долголетие', keywords: 'долголетие возраст старение' },
  { id: 'hormones', icon: '🔬', label: 'Гормональный фон', keywords: 'гормон щитовидка' },
  { id: 'inflammation', icon: '🔥', label: 'Снизить воспаление', keywords: 'воспаление биомаркер' },
  { id: 'nutrition', icon: '🥗', label: 'Питание / добавки', keywords: 'еда питание диета добавки витамин' },
];

export default function GoalBadges({ profileId, profile, onPlanCreated, onClose }) {
  const [selected, setSelected] = useState([]);
  const [freeText, setFreeText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState('select');

  async function handleSuggest(text) {
    const q = text || selected.map(s => s.keywords.split(' ')[0]).join(' ');
    if (!q) return;
    const r = await fetch(`/api/goal/suggest?q=${encodeURIComponent(q)}`);
    const d = await r.json();
    setSuggestions(d.suggestions || []);
    if (d.suggestions.length > 0) setStep('confirm');
  }

  function toggleBadge(b) {
    setSelected(prev =>
      prev.find(s => s.id === b.id) ? prev.filter(s => s.id !== b.id) : [...prev, b]
    );
  }

  async function generatePlan(protocolId) {
    setGenerating(true);
    try {
      const literacyScore = profile?.health_literacy_score;
      const r = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: profileId, protocol_id: protocolId, options: { duration_days: 14, health_literacy_score: literacyScore } })
      });
      const d = await r.json();
      if (d.plan) {
        onPlanCreated(d.plan);
        setStep('done');
      }
    } catch (e) {
      alert('Ошибка: ' + e.message);
    }
    setGenerating(false);
  }

  return (
    <div className="goal-badges-overlay" onClick={onClose}>
      <div className="goal-badges-popup" onClick={e => e.stopPropagation()}>
        <div className="goal-badges-header">
          <span>🎯 Выбор цели</span>
          <button className="goal-badges-close" onClick={onClose}>×</button>
        </div>

        {step === 'select' && (
          <div className="goal-badges-body">
            <div className="goal-badges-grid">
              {GOAL_BADGES.map(b => (
                <button
                  key={b.id}
                  className={`goal-badge-btn ${selected.find(s => s.id === b.id) ? 'selected' : ''}`}
                  onClick={() => toggleBadge(b)}
                >
                  <span className="goal-badge-icon">{b.icon}</span>
                  <span className="goal-badge-label">{b.label}</span>
                </button>
              ))}
            </div>
            <div className="goal-badges-free">
              <input
                className="goal-badges-input"
                placeholder="Или напишите свою цель..."
                value={freeText}
                onChange={e => setFreeText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSuggest(freeText)}
              />
              <button
                className="goal-badges-submit"
                onClick={() => handleSuggest(freeText)}
                disabled={!freeText && selected.length === 0}
              >
                Подобрать протокол
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="goal-badges-body">
            <p className="goal-badges-hint">Найдены подходящие протоколы:</p>
            {suggestions.map(s => (
              <div key={s.protocol_id} className="goal-badges-suggestion">
                <div>
                  <strong>{s.name}</strong>
                  <p className="goal-badges-goal">{s.goal}</p>
                </div>
                <button
                  className="goal-badges-generate"
                  onClick={() => generatePlan(s.protocol_id)}
                  disabled={generating}
                >
                  {generating ? '⏳' : '📋 Создать план'}
                </button>
              </div>
            ))}
            <button className="goal-badges-back" onClick={() => setStep('select')}>← Назад</button>
          </div>
        )}

        {step === 'done' && (
          <div className="goal-badges-body">
            <div className="goal-badges-done">
              <span className="goal-badges-done-icon">✅</span>
              <p>План создан! Откройте его в профиле.</p>
              <button className="goal-badges-close-btn" onClick={onClose}>Готово</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
