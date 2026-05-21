import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Protocol catalog (simplified from protocol_obecity/) ───
const PROTOCOLS = [
  { id: 'MED_DIET', name: 'Средиземноморская диета', name_ru: 'Средиземноморская диета', effect: 0.35, adherence: 0.65, evidence: 1.0, category: 'dietary',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'hba1c', threshold: 5.7, imp: 3 },
      { path: 'ldl', threshold: 100, imp: 2 },
      { path: 'hdl', threshold: 50, imp: 1, direction: 'low' },
      { path: 'crp', threshold: 1.0, imp: 2 },
    ] },
  { id: 'DASH', name: 'DASH Diet', name_ru: 'DASH диета', effect: 0.30, adherence: 0.60, evidence: 1.0, category: 'dietary',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'sbp', threshold: 130, imp: 3 },
      { path: 'dbp', threshold: 80, imp: 2 },
      { path: 'ldl', threshold: 100, imp: 2 },
    ] },
  { id: 'TRE_168', name: 'Time-Restricted Eating 16:8', name_ru: 'Интервальное голодание 16:8', effect: 0.40, adherence: 0.60, evidence: 1.0, category: 'dietary',
    indications: [
      { path: 'bmi', threshold: 25, imp: 3 },
      { path: 'glucose', threshold: 100, imp: 2 },
      { path: 'hba1c', threshold: 5.7, imp: 2 },
    ] },
  { id: 'GLP1_RA', name: 'GLP-1 Receptor Agonists', name_ru: 'Агонисты GLP-1 (семаглутид)', effect: 0.85, adherence: 0.55, evidence: 1.0, category: 'pharma',
    indications: [
      { path: 'bmi', threshold: 30, imp: 3 },
      { path: 'hba1c', threshold: 6.5, imp: 3 },
      { path: 'glucose', threshold: 126, imp: 2 },
    ] },
  { id: 'CBT_WL', name: 'CBT for Weight Loss', name_ru: 'КПТ для снижения веса', effect: 0.25, adherence: 0.55, evidence: 1.0, category: 'behavioral',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'stress', threshold: 5, imp: 3 },
      { path: 'sleep', threshold: 7, imp: 1, direction: 'low' },
    ] },
  { id: 'VLCKD', name: 'Very Low-Calorie Ketogenic', name_ru: 'Кетодиета VLCD', effect: 0.70, adherence: 0.35, evidence: 0.7, category: 'dietary',
    indications: [
      { path: 'bmi', threshold: 30, imp: 3 },
      { path: 'glucose', threshold: 110, imp: 2 },
      { path: 'ldl', threshold: 160, imp: 1, direction: 'low' },
    ] },
  { id: 'ME_WL', name: 'Mindful Eating', name_ru: 'Осознанное питание', effect: 0.20, adherence: 0.45, evidence: 0.7, category: 'behavioral',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'stress', threshold: 5, imp: 2 },
    ] },
  { id: 'EXERCISE', name: 'Exercise Protocols', name_ru: 'Физическая активность', effect: 0.30, adherence: 0.40, evidence: 1.0, category: 'exercise',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'sbp', threshold: 130, imp: 1 },
      { path: 'glucose', threshold: 100, imp: 1 },
    ] },
  { id: 'HABIT_SHOP', name: 'Lab-Based Grocery Habit', name_ru: 'Закупка по анализам', effect: 0.25, adherence: 0.55, evidence: 0.7, category: 'behavioral',
    indications: [
      { path: 'bmi', threshold: 25, imp: 2 },
      { path: 'vitamin_d', threshold: 30, imp: 2 },
      { path: 'ferritin', threshold: 30, imp: 1, direction: 'low' },
    ] },
];

// ─── Default DT params (demo user) ───
const DEFAULT_DT = {
  bmi: 31, waist: 102, age: 34, gender: 'female',
  hba1c: null, glucose: null, ldl: 130, hdl: 38, crp: null,
  vitamin_d: null, ferritin: null, tsh: null,
  sbp: 135, dbp: 85, hr: 78,
  sleep: 6, stress: 7, steps: 4000,
  smoker: false, alcohol: 1,
};

// ─── Scoring helpers ───
const W = { match: 0.35, effect: 0.25, adherence: 0.20, evidence: 0.20 };

function matchQuality(p, dt) {
  let sum = 0, total = 0;
  for (const ind of p.indications) {
    const val = dt[ind.path];
    if (val === null || val === undefined) { total += ind.imp; continue; }
    const meets = ind.direction === 'low' ? val <= ind.threshold : val >= ind.threshold;
    sum += ind.imp * (meets ? 1.0 : 0.5);
    total += ind.imp;
  }
  return total === 0 ? 0 : sum / total;
}

function pSuccess(p, dt) {
  return W.match * matchQuality(p, dt) + W.effect * p.effect + W.adherence * p.adherence + W.evidence * p.evidence;
}

function personalization(p, dt) {
  let filled = 0, total = 0;
  for (const ind of p.indications) {
    total++;
    const val = dt[ind.path];
    if (val !== null && val !== undefined) {
      const meets = ind.direction === 'low' ? val <= ind.threshold : val >= ind.threshold;
      if (meets) filled++;
    }
  }
  return total === 0 ? { pct: 0, str: '0/0' } : { pct: Math.round(filled / total * 100), str: `${filled}/${total}` };
}

// ─── Data request catalog ───
const DATA_REQUESTS = [
  { path: 'hba1c', label: 'HbA1c', desc: 'гликированный гемоглобин', unit: '%', type: 'number', effort: 0.55 },
  { path: 'glucose', label: 'Глюкоза натощак', desc: 'уровень сахара в крови', unit: 'мг/дл', type: 'number', effort: 0.40 },
  { path: 'crp', label: 'CRP', desc: 'С-реактивный белок', unit: 'мг/л', type: 'number', effort: 0.55 },
  { path: 'vitamin_d', label: 'Витамин D', desc: '25-OH витамин D', unit: 'нг/мл', type: 'number', effort: 0.70 },
  { path: 'ferritin', label: 'Ферритин', desc: 'запасы железа', unit: 'мкг/л', type: 'number', effort: 0.65 },
  { path: 'tsh', label: 'ТТГ', desc: 'тиреотропный гормон', unit: 'мМЕ/л', type: 'number', effort: 0.60 },
];

// ─── Sim status enum ───
const PHASE = { WELCOME: 0, SHOW_TOP3: 1, REQUEST_DATA: 2, SELECTED: 3, DONE: 4 };

// ─── Probability bars ───
const ProbBar = ({ pct, color = '#6b21c8' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
    <div style={{ flex: 1, height: 8, background: '#f3e5f5', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: `${Math.round(pct * 100)}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.6s ease' }} />
    </div>
    <span style={{ fontSize: 12, fontWeight: 700, color: '#311b92', minWidth: 36, textAlign: 'right' }}>{Math.round(pct * 100)}%</span>
  </div>
);

// ─── Message components ───
const Msg = ({ text, time, type, children }) => (
  <div className="message ai" style={{ marginBottom: 12, animation: 'slideIn 0.3s ease' }}>
    <div className="avatar" style={{ background: '#e1bee7', marginRight: 10 }}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#6b21c8" strokeWidth="2"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="9" cy="11" r="2"/><circle cx="15" cy="11" r="2"/><path d="M9 16h6"/><path d="M12 3v3"/></svg></div>
    <div className="bubble" style={{ maxWidth: 280, padding: '12px 16px', borderRadius: 18, border: '2px solid #d1c4e9', borderBottomLeftRadius: 4, background: '#fff', fontSize: 13, lineHeight: 1.4 }}>
      {text && <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>}
      {children}
      {time && <div style={{ fontSize: 10, color: '#b39ddb', marginTop: 6 }}>{time}</div>}
    </div>
  </div>
);

const UserMsg = ({ text, time }) => (
  <div className="message user" style={{ marginBottom: 12, animation: 'slideIn 0.3s ease' }}>
    <div className="bubble" style={{ maxWidth: 280, padding: '12px 16px', borderRadius: 18, borderBottomRightRadius: 4, background: '#7b1fa2', color: '#fff', fontSize: 13 }}>
      {text}
      {time && <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>{time}</div>}
    </div>
  </div>
);

// ─── Main component ───
const DecisionFlowSimulation = ({ onClose, profileData }) => {
  const navigate = useNavigate();

  const profileToDt = (p) => ({
    bmi: p?.anthropometrics?.bmi ?? DEFAULT_DT.bmi,
    waist: p?.anthropometrics?.waist_cm ?? DEFAULT_DT.waist,
    age: p?.demographics?.age ?? DEFAULT_DT.age,
    gender: p?.demographics?.sex === 'male' ? 'male' : 'female',
    hba1c: p?.labs?.hba1c_percent ?? null,
    glucose: p?.labs?.glucose_mg_dl ?? null,
    ldl: p?.labs?.ldl_mg_dl ?? DEFAULT_DT.ldl,
    hdl: p?.labs?.hdl_mg_dl ?? DEFAULT_DT.hdl,
    crp: p?.labs?.crp_mg_l ?? null,
    vitamin_d: p?.labs?.vitamin_d ?? null,
    ferritin: p?.labs?.ferritin ?? null,
    tsh: p?.labs?.tsh ?? null,
    sbp: p?.vitals?.systolic_bp_mmhg ?? DEFAULT_DT.sbp,
    dbp: p?.vitals?.diastolic_bp_mmhg ?? DEFAULT_DT.dbp,
    hr: p?.vitals?.resting_hr_bpm ?? DEFAULT_DT.hr,
    sleep: p?.lifestyle?.sleep_hours ?? DEFAULT_DT.sleep,
    stress: p?.lifestyle?.stress_level_0_10 ?? DEFAULT_DT.stress,
    steps: p?.lifestyle?.daily_steps ?? DEFAULT_DT.steps,
    smoker: p?.lifestyle?.smoking === 'Курит',
    alcohol: p?.lifestyle?.alcohol === 'Регулярно' ? 2 : p?.lifestyle?.alcohol === '1-2/нед' ? 1 : 0,
  });

  // ── State ──
  const [dt, setDt] = useState(profileData ? profileToDt(profileData) : { ...DEFAULT_DT });
  const [phase, setPhase] = useState(PHASE.WELCOME);
  const [logs, setLogs] = useState([]);
  const [requested, setRequested] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [history, setHistory] = useState([]);

  const addLog = (text) => setLogs(p => [...p, { text, time: new Date().toLocaleTimeString().slice(0, 5) }]);

  // ── Computed: ranked protocols ──
  const ranked = useMemo(() => {
    return PROTOCOLS.map(p => ({
      ...p,
      score: pSuccess(p, dt),
      match: matchQuality(p, dt),
      pers: personalization(p, dt),
    })).sort((a, b) => b.score - a.score);
  }, [dt]);

  const top3 = ranked.slice(0, 3);

  // ── Computed: best next data request ──
  const bestNextRequest = useMemo(() => {
    const unfilled = DATA_REQUESTS.filter(r => dt[r.path] === null && !requested.includes(r.path));
    if (unfilled.length === 0) return null;

    const top1 = ranked[0];
    if (!top1) return unfilled[0];

    return unfilled.map(r => {
      const dtHyp = { ...dt, [r.path]: r.path === 'hba1c' ? 6.5 : r.path === 'glucose' ? 110 : r.path === 'crp' ? 2.0 : r.path === 'vitamin_d' ? 25 : r.path === 'ferritin' ? 40 : 3.0 };
      const newScore = pSuccess(top1, dtHyp);
      const deltaU = Math.abs(top1.score - newScore);
      return { ...r, deltaU, ratio: deltaU / r.effort };
    }).sort((a, b) => b.ratio - a.ratio)[0];
  }, [dt, requested, ranked]);

  // ── Init ──
  useEffect(() => {
    if (phase === PHASE.WELCOME) {
      setTimeout(() => {
        addLog('Загрузка параметров цифрового двойника...');
      }, 300);
      setTimeout(() => {
        addLog('Расчёт P_success для 9 протоколов...');
        setPhase(PHASE.SHOW_TOP3);
      }, 1200);
    }
  }, [phase]);

  // ── Handle answer submission ──
  const handleSubmitAnswer = () => {
    if (!pendingRequest || !inputVal.trim()) return;
    const val = parseFloat(inputVal);
    if (isNaN(val)) return;

    const newDt = { ...dt, [pendingRequest.path]: val };
    setDt(newDt);
    setRequested(p => [...p, pendingRequest.path]);
    setPendingRequest(null);
    setInputVal('');

    const oldScore = ranked[0]?.score || 0;
    const newRanked = PROTOCOLS.map(p => ({ ...p, score: pSuccess(p, newDt) })).sort((a, b) => b.score - a.score);
    const newTop = newRanked[0]?.score || 0;
    const delta = ((newTop - oldScore) * 100).toFixed(1);

    addLog(`📊 ${pendingRequest.label}: ${val} ${pendingRequest.unit}`);
    addLog(`Точность подбора: ${delta > 0 ? '+' : ''}${delta}%`);

    setTimeout(() => setPhase(PHASE.SHOW_TOP3), 400);
  };

  // ── Handle skip ──
  const handleSkip = () => {
    if (!pendingRequest) return;
    setRequested(p => [...p, pendingRequest.path]);
    setPendingRequest(null);
    addLog(`⏭ ${pendingRequest.label} пропущен`);
    setTimeout(() => setPhase(PHASE.SHOW_TOP3), 300);
  };

  // ── Request next data ──
  const requestNextData = () => {
    if (!bestNextRequest) {
      addLog('✅ Все доступные данные собраны. Точность подбора максимальна.');
      return;
    }
    setPendingRequest(bestNextRequest);
    setPhase(PHASE.REQUEST_DATA);
  };

  // ── Select protocol ──
  const handleSelect = (p) => {
    setSelectedProtocol(p);
    setPhase(PHASE.SELECTED);
    addLog(`🎯 Выбран протокол: ${p.name_ru}`);
    addLog(`Вероятность достижения цели: ${(p.score * 100).toFixed(0)}%`);
    setTimeout(() => setPhase(PHASE.DONE), 600);
  };

  // ── Render ──
  const timeStr = () => new Date().toLocaleTimeString().slice(0, 5);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#eceff1' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #6b21c8, #4a148c)', padding: '12px 16px', color: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onClose ? onClose() : navigate('/digital-twin')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Подбор протокола</span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11, opacity: 0.9 }}>
          <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'middle',marginRight:2}}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Вер. успеха: {ranked[0] ? (ranked[0].score * 100).toFixed(0) : '—'}%</span>
          <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'middle',marginRight:2}}><line x1="4" y1="20" x2="20" y2="20"/><line x1="6" y1="16" x2="6" y2="10"/><line x1="12" y1="16" x2="12" y2="6"/><line x1="18" y1="16" x2="18" y2="2"/></svg> Заполнено: {Object.values(dt).filter(v => v !== null).length}/{Object.keys(DEFAULT_DT).length}</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Welcome */}
        <Msg time={timeStr()}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>🧬 Анализ ваших данных</div>
          <div style={{ fontSize: 12, color: '#555' }}>Параметры цифрового двойника загружены. Рассчитываю оптимальные протоколы...</div>
        </Msg>

        {/* Quick stats */}
        <Msg time={timeStr()}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>📋 Текущие показатели</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 12px', fontSize: 12 }}>
            <span>ИМТ: <b>{dt.bmi}</b> {dt.bmi >= 30 ? '🔴' : dt.bmi >= 25 ? '🟡' : '🟢'}</span>
            <span>АД: <b>{dt.sbp}/{dt.dbp}</b> {dt.sbp >= 130 ? '🔴' : '🟢'}</span>
            <span>Сон: <b>{dt.sleep}ч</b> {dt.sleep < 7 ? '🔴' : '🟢'}</span>
            <span>Стресс: <b>{dt.stress}/10</b> {dt.stress > 5 ? '🔴' : '🟢'}</span>
            <span>ЛПНП: <b>{dt.ldl}</b> {dt.ldl > 100 ? '🔴' : '🟢'}</span>
            <span>ЛПВП: <b>{dt.hdl}</b> {dt.hdl < 50 ? '🔴' : '🟢'}</span>
          </div>
        </Msg>

        {/* Top 3 */}
        {phase >= PHASE.SHOW_TOP3 && (
          <Msg time={timeStr()}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>🏆 Топ-3 протокола</div>
            {top3.map((p, i) => {
              const colors = ['#6b21c8', '#7b1fa2', '#9c27ca'];
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={p.id} style={{ background: '#faf5ff', border: `2px solid ${colors[i]}`, borderRadius: 12, padding: '10px 12px', marginBottom: 8, cursor: phase < PHASE.SELECTED ? 'pointer' : 'default', transition: 'all 0.2s', opacity: selectedProtocol && selectedProtocol.id !== p.id ? 0.5 : 1 }}
                  onClick={() => phase < PHASE.SELECTED && handleSelect(p)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: colors[i] }}>{medals[i]} {p.name_ru}</span>
                    <span style={{ fontSize: 11, color: '#757575', background: '#f3e5f5', padding: '2px 8px', borderRadius: 8 }}>{p.category}</span>
                  </div>
                  <ProbBar pct={p.score} color={colors[i]} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginTop: 2 }}>
                    <span>Персонализация: {p.pers.str} ({p.pers.pct}%)</span>
                    <span>Match: {(p.match * 100).toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </Msg>
        )}

        {/* Request data prompt */}
        {phase === PHASE.SHOW_TOP3 && !selectedProtocol && (
          <Msg time={timeStr()}>
            <div style={{ fontSize: 13, marginBottom: 8 }}>📊 Для повышения точности подбора укажите дополнительные параметры:</div>
            <button onClick={requestNextData} style={{ width: '100%', padding: '10px', background: '#6b21c8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {bestNextRequest ? `Запросить данные (${bestNextRequest.label})` : 'Все данные собраны ✓'}
            </button>
          </Msg>
        )}

        {/* Data input form */}
        {phase === PHASE.REQUEST_DATA && pendingRequest && (
          <Msg time={timeStr()}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>📊 {pendingRequest.label}</div>
            <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>{pendingRequest.desc} ({pendingRequest.unit})</div>
            <div style={{ fontSize: 11, color: '#7b1fa2', marginBottom: 8, background: '#f3e5f5', padding: '6px 10px', borderRadius: 8 }}>
              ⚡ Влияние на точность: +{(bestNextRequest?.deltaU * 100).toFixed(1) || '~5'}% · Усилие: {(pendingRequest.effort * 100).toFixed(0)}%
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="number" step="0.1" value={inputVal} onChange={e => setInputVal(e.target.value)}
                placeholder={`Введите ${pendingRequest.label}`}
                style={{ flex: 1, padding: '10px 12px', border: '2px solid #d1c4e9', borderRadius: 10, fontSize: 14, outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && handleSubmitAnswer()} />
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <button onClick={handleSubmitAnswer} style={{ flex: 1, padding: '8px', background: '#6b21c8', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Подтвердить</button>
              <button onClick={handleSkip} style={{ padding: '8px 14px', background: '#f5f5f5', color: '#666', border: '1px solid #ddd', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>Пропустить</button>
            </div>
          </Msg>
        )}

        {/* Selected state */}
        {phase === PHASE.SELECTED && selectedProtocol && (
          <Msg time={timeStr()}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>🎯 Протокол активирован</div>
            <div style={{ fontSize: 13 }}><b>{selectedProtocol.name_ru}</b></div>
            <ProbBar pct={selectedProtocol.score} color="#00c853" />
            <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
              Персонализация: {selectedProtocol.pers.str} · Уровень: {selectedProtocol.evidence === 1.0 ? 'Высокий' : 'Средний'}
            </div>
          </Msg>
        )}

        {/* Done */}
        {phase === PHASE.DONE && (
          <Msg time={timeStr()}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>✅ Подбор завершён</div>
            <div style={{ fontSize: 12, color: '#555' }}>
              Протокол <b>{selectedProtocol?.name_ru}</b> активирован. Рекомендации и план мониторинга — в дашборде.
            </div>
            <button onClick={() => navigate('/digital-twin')} style={{ marginTop: 10, padding: '8px 20px', background: '#6b21c8', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              К дашборду
            </button>
          </Msg>
        )}

        {/* Log */}
        {logs.length > 0 && (
          <div style={{ marginTop: 4 }}>
            {logs.map((l, i) => (
              <div key={i} style={{ fontSize: 11, color: '#757575', padding: '2px 14px', fontFamily: 'monospace' }}>
                [{l.time}] {l.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionFlowSimulation;
