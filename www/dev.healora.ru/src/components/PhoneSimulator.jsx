import React, { useState, useEffect, useRef } from 'react';
import ProfileView from './ProfileView';
import DiaryView from './DiaryView';
import PlanView from './PlanView';
import '../assets/css/PhoneSimulator.css';

function ChatBubble({ side, children, time, style }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems: side==='right'?'flex-end':'flex-start', marginBottom:2, ...style }}>
      <div style={{
        maxWidth:'85%',
        padding:'8px 12px',
        borderRadius:12,
        borderBottomRightRadius: side==='right'?4:12,
        borderBottomLeftRadius: side==='left'?4:12,
        background: side==='right' ? '#6b21c8' : '#f3e5f5',
        color: side==='right' ? '#fff' : '#333',
        fontSize:10,
        lineHeight:1.4,
        boxShadow:'0 1px 2px rgba(0,0,0,0.06)',
      }}>
        {children}
      </div>
      {time && <span style={{fontSize:7,color:'#aaa',marginTop:1,marginLeft:side==='left'?4:0,marginRight:side==='right'?4:0}}>{time}</span>}
    </div>
  );
}

function InterventionBadge({ code, name, done, skipped }) {
  const statusColor = done ? '#e8f5e9' : skipped ? '#ffebee' : '#fff3e0';
  const statusText = done ? '✅ Выполнено' : skipped ? '❌ Пропущено' : '⏳ Ожидает';
  return (
    <div style={{display:'flex',alignItems:'center',gap:6,background:statusColor,borderRadius:8,padding:'6px 8px',marginBottom:4,border:'1px solid '+(done?'#a5d6a7':skipped?'#ef9a9a':'#ffe0b2')}}>
      <div style={{width:6,height:6,borderRadius:'50%',background:done?'#4caf50':skipped?'#f44336':'#ff9800',flexShrink:0}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:9,fontWeight:600,color:'#333'}}>{code}</div>
        <div style={{fontSize:8,color:'#666'}}>{name}</div>
        <div style={{fontSize:8,color:'#888',marginTop:1}}>{statusText}</div>
      </div>
    </div>
  );
}

function GoalChart({ g, expanded, onClick, viewDay }) {
  const { label, current, target, unit, color, allowedLo, allowedHi, start } = g;
  const W = 280, H = 48, PAD = 6;
  const cX = (v) => allowedHi !== allowedLo && v != null ? PAD + ((v - allowedLo) / (allowedHi - allowedLo)) * (W - 2 * PAD) : null;
  const tX = cX(target);
  const curX = cX(current);
  const loX = cX(allowedLo);
  const hiX = cX(allowedHi);
  const midY = H / 2;

  // generate time series: 30 days from start→target, current at viewDay
  const days = 30;
  const series = Array.from({length: days + 1}, (_, i) => {
    const t = i / days;
    const s = start != null ? start : current;
    const e = target != null ? target : current;
    return s + (e - s) * t;
  });

  const CH = 100, CW = 280, CPAD = 8;
  const yMin = Math.min(...series, target, current, allowedLo) * 0.9;
  const yMax = Math.max(...series, target, current, allowedHi) * 1.1;
  const yRn = yMax - yMin || 1;
  const xScale = i => CPAD + (i / days) * (CW - 2 * CPAD);
  const yScale = v => CH - CPAD - ((v - yMin) / yRn) * (CH - 2 * CPAD);

  return (
    <div onClick={onClick} style={{cursor:'pointer',background:'#fff',borderRadius:8,padding:'4px 6px',boxShadow:'0 1px 2px rgba(0,0,0,0.04)',borderLeft:`3px solid ${color||'#6b21c8'}`,fontSize:9}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:1}}>
        <span style={{fontWeight:600,color:'#444'}}>{label}{unit ? ` (${unit})` : ''}</span>
        <span style={{color:'#888'}}>{current ?? '—'} {target ? `→ ${target}` : ''}</span>
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
        <rect x={PAD} y={midY-6} width={W-2*PAD} height={12} rx={3} fill="#f0f0f0" />
        {allowedLo != null && allowedHi != null && loX != null && hiX != null && (
          <>
            <rect x={loX} y={midY-6} width={hiX-loX} height={12} rx={3} fill="#d5f5e3" />
            <line x1={loX} y1={midY-8} x2={loX} y2={midY+8} stroke="#999" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1={hiX} y1={midY-8} x2={hiX} y2={midY+8} stroke="#999" strokeWidth="0.5" strokeDasharray="2,2" />
          </>
        )}
        {tX != null && <line x1={tX} y1={midY+10} x2={tX} y2={midY-10} stroke="#666" strokeWidth="1" strokeDasharray="4,3" />}
        {curX != null && <circle cx={curX} cy={midY} r={4} fill={color||'#311b92'} stroke="#fff" strokeWidth="1.5" />}
        <text x={PAD} y={H-2} fontSize="7" fill="#999">{allowedLo != null ? allowedLo : ''}</text>
        <text x={W-PAD} y={H-2} fontSize="7" fill="#999" textAnchor="end">{allowedHi != null ? allowedHi : ''}</text>
        {tX != null && <text x={tX} y={midY-12} fontSize="7" fill="#666" textAnchor="middle">{target}</text>}
      </svg>
      {expanded && (
        <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{display:'block',marginTop:4}}>
          <rect x={CPAD} y={CPAD} width={CW-2*CPAD} height={CH-2*CPAD} rx={4} fill="#fafafa" stroke="#eee" strokeWidth="0.5" />
          <line x1={CPAD} y1={yScale(target)} x2={CW-CPAD} y2={yScale(target)} stroke="#666" strokeWidth="1" strokeDasharray="4,3" />
          <polyline fill="none" stroke={color||'#311b92'} strokeWidth="1.5" points={series.map((v,i) => `${xScale(i)},${yScale(v)}`).join(' ')} />
          {series.filter((_,i) => i % 5 === 0 || i === Math.round(viewDay)).map((v,i) => (
            <text key={i} x={xScale(i*5<=30?i*5:i)} y={CH-2} fontSize="6" fill="#999" textAnchor="middle">{i*5<=30?i*5:''}</text>
          ))}
          <circle cx={xScale(Math.round(viewDay))} cy={yScale(series[Math.round(viewDay)])} r={3} fill={color||'#311b92'} stroke="#fff" strokeWidth="1.5" />
          <text x={CW/2} y={CH-2} fontSize="7" fill="#888" textAnchor="middle">→ день</text>
          <text x={CPAD} y={yScale(target)-2} fontSize="6" fill="#666">{target}</text>
        </svg>
      )}
    </div>
  );
}

export default function PhoneSimulator({
  profile,
  profileId,
  phoneOverlayTab,
  setPhoneOverlayTab,
  chatMessages,
  simulationDay,
  plans,
  fallbackProfiles,
  planTemplateId, setPlanTemplateId,
  planDoctorNote, setPlanDoctorNote,
  planStatus, setPlanStatus,
  timelineInterventions,
  removeIntervention,
  interventionCatalog,
  planTemplates,
  getTemplateById,
  savePlan,
}) {
  const [viewDay, setViewDay] = useState(simulationDay);
  const [expandedGoal, setExpandedGoal] = useState(null);
  useEffect(() => { setViewDay(simulationDay); }, [simulationDay]);
  const chatEndRef = useRef(null);

  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [diaryMeals, setDiaryMeals] = useState([]);

  useEffect(() => {
    if (profileId) {
      fetch(`/api/diary/${profileId}/${viewDay}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data?.meals) setDiaryMeals(data.meals); })
        .catch(() => {});
    }
  }, [profileId, viewDay]);

  const firstMealWithPhoto = diaryMeals.find(m => m.photo && m.calories);
  const mealCals = firstMealWithPhoto?.calories || 486;
  const mealProtein = firstMealWithPhoto?.protein || 24;
  const mealFat = firstMealWithPhoto?.fat || 12;
  const mealCarbs = firstMealWithPhoto?.carbs || 52;
  const mealPhoto = firstMealWithPhoto?.photo || null;
  const mealDesc = firstMealWithPhoto?.description || 'Обед (из дневника питания)';

  const [localMessages, setLocalMessages] = useState(() => {
    const today = chatMessages.filter(m => m.day === viewDay);
    const now = new Date();
    const t = n => `${String(now.getHours()).padStart(2,'0')}:${String(n).padStart(2,'0')}`;
    const msgs = [];

    msgs.push({ id:'w1', side:'left', time:t(1), type:'text', text:`Здравствуйте, ${profile?.name || 'пользователь'}! Я ваш AI-ассистент Healora 🤖` });
    msgs.push({ id:'w2', side:'left', time:t(2), type:'text', text:'У вас отличный прогресс! Healora Score вырос на **15 пунктов** за последнюю неделю.' });

    const dayMsgs = today.filter(m => m.type === 'intervention').slice(0, 4);
    if (dayMsgs.length > 0) {
      msgs.push({ id:'w3', side:'left', time:t(3), type:'text', text:`На сегодня (день ${viewDay}) у вас запланированы интервенции:` });
      dayMsgs.forEach(m => {
        msgs.push({ id:`ib-${m.id}`, side:'left', time:t(3), type:'intervention-badge', code:m.code, name:m.name, done:m.done, skipped:m.skipped });
      });
    } else {
      const interventions = timelineInterventions.filter(i => i.day === viewDay).slice(0, 3);
      if (interventions.length > 0) {
        msgs.push({ id:'w3b', side:'left', time:t(3), type:'text', text:`На сегодня (день ${viewDay}) запланировано:` });
        interventions.forEach(i => {
          msgs.push({ id:`ib-${i.code}`, side:'left', time:t(3), type:'intervention-badge', code:i.code, name:i.name, done:false, skipped:false });
        });
      }
    }

    msgs.push({ id:'w4', side:'left', time:t(4), type:'text', text:'Как прошёл ваш день? Прикрепите фото обеда, и я проанализирую КБЖУ.' });
    msgs.push({ id:'u1', side:'right', time:t(5), type:'food-photo', text:'Обед (из дневника питания)', calories:mealCals, protein:mealProtein, fat:mealFat, carbs:mealCarbs, photo:mealPhoto });
    msgs.push({
      id:'w5', side:'left', time:t(6), type:'text',
      text:`📊 **Анализ приёма пищи:**\n• Белки: ${mealProtein} г ✅ (в норме)\n• Жиры: ${mealFat} г ✅\n• Углеводы: ${mealCarbs} г ${mealCarbs > 50 ? '⚠️ (немного выше)' : '✅'}\n• Калорийность: ${mealCals} ккал\n\n💡 Совет: добавьте больше овощей для баланса клетчатки.`
    });

    msgs.push({ id:'u2', side:'right', time:t(8), type:'voice', duration:'0:23' });

    msgs.push({
      id:'w6', side:'left', time:t(9), type:'text',
      text:'🎧 Получил ваше голосовое сообщение. Понял — вы отмечаете, что чувствуете прилив энергии после утренней зарядки. Отлично! Это признак того, что PH_HIIT даёт результат.'
    });

    const doneCount = today.filter(m => m.done).length;
    const totalCount = today.filter(m => m.type === 'intervention').length;
    if (totalCount > 0) {
      msgs.push({
        id:'w7', side:'left', time:t(10), type:'text',
        text:`📋 **Итоги дня ${viewDay}:**\n• ${doneCount} из ${totalCount} интервенций выполнено (${Math.round(doneCount/totalCount*100)}%)\n• Набрано звезд: ${profile?.digital_twin_scores?.current_stars || 0}\n• Продолжайте в том же духе!`
      });
    }

    msgs.push({ id:'w8', side:'left', time:t(11), type:'text', text:'Хотите скорректировать план на завтра? Просто напишите, что изменить.' });
    msgs.push({ id:'u3', side:'right', time:t(12), type:'text', text:'Да, убери HIIT завтра, оставлю только растяжку.' });
    msgs.push({ id:'w9', side:'left', time:t(13), type:'text', text:'✅ Готово! Убрал PH_HIIT из завтрашнего плана, добавил PH_FLEX. Новый план уже синхронизирован.' });
    msgs.push({ id:'u4', side:'right', time:t(14), type:'text', text:'Спасибо! 😊' });
    msgs.push({ id:'w10', side:'left', time:t(15), type:'text', text:'Всегда пожалуйста! Завтра в 8:00 у вас медитация MN_MDT + лёгкая растяжка. Хорошего вечера! 🌙' });

    return msgs;
  });

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [localMessages]);

  const handleSend = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const msg = chatInput.trim();
    setLocalMessages(prev => [...prev, { id:`u-${Date.now()}`, side:'right', type:'text', text:msg, time:t }]);
    setChatInput('');
    setChatLoading(true);
    const history = localMessages.filter(m => m.type === 'text').slice(-20).map(m => ({ role: m.side === 'right' ? 'user' : 'assistant', content: m.text }));
    try {
      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ message: msg, profile: profileId, history }),
      });
      const data = await res.json();
      setLocalMessages(prev => [...prev, { id:`a-${Date.now()}`, side:'left', type:'text', time:t, text:data.reply || '_Нет ответа_' }]);
    } catch {
      setLocalMessages(prev => [...prev, { id:`a-${Date.now()}`, side:'left', type:'text', time:t, text:'⚠️ Ошибка соединения с сервером. Попробуйте позже.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSend(); };


  const goals = [
    { id:'g1', label:'Вес', current:profile?.anthropometrics?.weight_kg, target:70, unit:'кг', color:'#311b92', allowedLo:30, allowedHi:200, start:92 },
    { id:'g2', label:'ИМТ', current:profile?.anthropometrics?.bmi, target:22, unit:'кг/м²', color:'#1976d2', allowedLo:14, allowedHi:45, start:29 },
    { id:'g3', label:'АД сист.', current:profile?.vitals?.systolic_bp_mmhg, target:120, unit:'мм рт.ст.', color:'#e53935', allowedLo:70, allowedHi:200, start:142 },
    { id:'g4', label:'АД диаст.', current:profile?.vitals?.diastolic_bp_mmhg, target:80, unit:'мм рт.ст.', color:'#e53935', allowedLo:40, allowedHi:130, start:92 },
    { id:'g5', label:'Глюкоза', current:profile?.labs?.glucose_mg_dl, target:100, unit:'мг/дл', color:'#0288d1', allowedLo:40, allowedHi:300, start:112 },
    { id:'g6', label:'HbA1c', current:profile?.labs?.hba1c_percent, target:5.5, unit:'%', color:'#0288d1', allowedLo:3, allowedHi:10, start:5.9 },
    { id:'g7', label:'Холестерин', current:profile?.labs?.total_cholesterol_mg_dl, target:200, unit:'мг/дл', color:'#0288d1', allowedLo:100, allowedHi:350, start:235 },
    { id:'g8', label:'ЛПВП', current:profile?.labs?.hdl_mg_dl, target:60, unit:'мг/дл', color:'#2e7d32', allowedLo:20, allowedHi:100, start:38 },
    { id:'g9', label:'Сон', current:profile?.lifestyle?.sleep_hours, target:7.5, unit:'ч', color:'#5c6bc0', allowedLo:3, allowedHi:14, start:6 },
    { id:'g10', label:'Стресс', current:profile?.lifestyle?.stress_level_0_10, target:3, unit:'/10', color:'#9c27b0', allowedLo:0, allowedHi:10, start:7 },
    { id:'g11', label:'Шаги', current:profile?.lifestyle?.daily_steps, target:10000, unit:'/день', color:'#388e3c', allowedLo:0, allowedHi:30000, start:3500 },
    { id:'g12', label:'Вода', current:profile?.lifestyle?.water_l_day, target:2.5, unit:'л/день', color:'#388e3c', allowedLo:0, allowedHi:5, start:1.2 },
    { id:'g13', label:'SpO₂', current:profile?.vitals?.spo2_percent, target:98, unit:'%', color:'#1976d2', allowedLo:85, allowedHi:100, start:95 },
    { id:'g14', label:'HRV', current:profile?.vitals?.hrv_ms, target:60, unit:'мс', color:'#1976d2', allowedLo:10, allowedHi:200, start:28 },
  ];

  return (
    <div className="phone-overlay" id="EL_COMP_001">
      <div className="phone-overlay-tabs">
        <button className={`phone-overlay-tab ${phoneOverlayTab === 'chat' ? 'active' : ''}`} onClick={() => setPhoneOverlayTab('chat')}>Чат</button>
        <button className={`phone-overlay-tab ${phoneOverlayTab === 'profile' ? 'active' : ''}`} onClick={() => setPhoneOverlayTab('profile')}>Профиль</button>
        <button className={`phone-overlay-tab ${phoneOverlayTab === 'diary' ? 'active' : ''}`} onClick={() => setPhoneOverlayTab('diary')}>Дневник</button>
        <button className="phone-overlay-close" onClick={() => setPhoneOverlayTab(prev => prev === 'none' ? 'profile' : 'none')}>×</button>
      </div>
      <div className="phone">
        <div className="phone-header" id="EL_COMP_003">
          <div className="status-bar">
            <span className="status-time">20:35</span>
            <div className="status-icons">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="status-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" className="status-battery"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="10" x2="23" y2="14"/><rect x="3" y="8" width="14" height="8" rx="1" fill="currentColor"/></svg>
            </div>
          </div>
          <div className="header-content">
            <div className="header-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="mood-indicator" id="EL_ICON_015"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              <div className="mood-dot"></div>
            </div>
            <div className="header-info">
              <div className="score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" id="EL_ICON_010"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span id="healora-score">{profile?.digital_twin_scores?.current_stars || 0}</span>
                <span className="score-label">{profile?.name || ''}</span>
              </div>
              <div className="progress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="streak-icon"><path d="M12 2l2.5 8.5L22 12l-7.5 1.5L12 22l-2.5-8.5L2 12l7.5-1.5z"/></svg>
                <span>{profile?.lifestyle?.sleep_hours || 0} ч сна</span>
                <span className="progress-sep">|</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="plan-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <span>Уровень {Math.floor((profile?.digital_twin_scores?.current_stars || 0) / 100)}</span>
              </div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginTop:6,paddingTop:6,borderTop:'1px solid rgba(255,255,255,0.2)'}}>
            <button onClick={() => setViewDay(Math.max(0, viewDay - 1))} style={{background:'none',border:'none',color:'#fff',cursor:'pointer',opacity:viewDay<=0?0.3:1,display:'flex',alignItems:'center'}} disabled={viewDay<=0}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span style={{fontSize:13,fontWeight:600,color:'#fff'}}>День {viewDay < 30 ? viewDay : 30} / 30</span>
            <button onClick={() => setViewDay(Math.min(simulationDay, viewDay + 1))} style={{background:'none',border:'none',color:'#fff',cursor:'pointer',opacity:viewDay>=simulationDay?0.3:1,display:'flex',alignItems:'center'}} disabled={viewDay>=simulationDay}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
        <div className="screen">
          {phoneOverlayTab === 'chat' ? (
            <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '8px 12px', background: '#f3e5f5', borderBottom: '1px solid #d1c4e9', fontSize: 11, fontWeight: 600, color: '#311b92', display:'flex', alignItems:'center', gap:6 }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6b21c8" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Healora AI
                <span style={{fontSize:8,fontWeight:400,color:'#888',marginLeft:'auto'}}>День {viewDay}</span>
              </div>
              <div style={{ flex: 1, overflow: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }} className="chat-scroll">
                {localMessages.map(msg => {
                  if (msg.type === 'intervention-badge') {
                    return (
                      <div key={msg.id} style={{display:'flex',flexDirection:'column',alignItems:'flex-start',marginBottom:2}}>
                        <InterventionBadge code={msg.code} name={msg.name} done={msg.done} skipped={msg.skipped} />
                      </div>
                    );
                  }
                  if (msg.type === 'food-photo') {
                    const thumbSrc = msg.photo
                      ? msg.photo.replace('/images/food/', '/images/food/thumbs/')
                      : '/images/food/thumbs/12. 20260219_204535.jpg';
                    return (
                      <ChatBubble key={msg.id} side="right" time={msg.time}>
                        <div style={{display:'flex',flexDirection:'column',gap:4,alignItems:'center'}}>
                          <img src={thumbSrc} alt="" style={{width:80,height:80,borderRadius:8,objectFit:'cover',background:'#fff3e0'}} />
                          <span style={{fontSize:9,color:'rgba(255,255,255,0.9)'}}>{msg.text}</span>
                          <div style={{display:'flex',gap:6,fontSize:8,color:'rgba(255,255,255,0.7)'}}>
                            <span>🔥 {msg.calories} ккал</span>
                            <span>🥩 {msg.protein}г</span>
                            <span>🧀 {msg.fat}г</span>
                            <span>🌾 {msg.carbs}г</span>
                          </div>
                        </div>
                      </ChatBubble>
                    );
                  }
                  if (msg.type === 'voice') {
                    return (
                      <ChatBubble key={msg.id} side="right" time={msg.time}>
                        <div style={{display:'flex',alignItems:'center',gap:8,minWidth:140}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M17 8v3a5 5 0 0 1-10 0V8"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                          <div style={{flex:1,display:'flex',flexDirection:'column',gap:2}}>
                            <div style={{display:'flex',alignItems:'center',gap:3}}>
                              {[4,7,5,9,6,8,3,10,5].map((h,i) => (
                                <div key={i} style={{width:3,height:h,borderRadius:1.5,background:'rgba(255,255,255,0.9)',transition:'height 0.2s'}}/>
                              ))}
                            </div>
                            <span style={{fontSize:8,opacity:0.8}}>{msg.duration}</span>
                          </div>
                        </div>
                      </ChatBubble>
                    );
                  }
                  return (
                    <ChatBubble key={msg.id} side={msg.side} time={msg.time}>
                      <span style={{whiteSpace:'pre-wrap'}} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                    </ChatBubble>
                  );
                })}
                {chatLoading && (
                  <div style={{display:'flex',justifyContent:'flex-start',marginBottom:2}}>
                    <div style={{background:'#f3e5f5',borderRadius:'12px 12px 12px 4px',padding:'6px 10px',fontSize:10,color:'#7b1fa2',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{display:'inline-flex',gap:2}}>
                        <span style={{width:4,height:4,background:'#7b1fa2',borderRadius:'50%',animation:'pulse 1.2s infinite'}} />
                        <span style={{width:4,height:4,background:'#7b1fa2',borderRadius:'50%',animation:'pulse 1.2s infinite 0.2s'}} />
                        <span style={{width:4,height:4,background:'#7b1fa2',borderRadius:'50%',animation:'pulse 1.2s infinite 0.4s'}} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div style={{ padding: '6px 8px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 4, alignItems:'center', background:'#fafafa' }}>
                <button style={{background:'none',border:'none',cursor:'pointer',padding:4,color:'#6b21c8',display:'flex'}} title="Голосовое сообщение">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M17 8v3a5 5 0 0 1-10 0V8"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                </button>
                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ flex: 1, border: '1px solid #d1c4e9', borderRadius: 16, padding: '6px 10px', fontSize: 11, outline: 'none' }}
                />
                <button style={{ background: '#6b21c8', border: 'none', borderRadius: '50%', width: 26, height: 26, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleSend}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          ) : phoneOverlayTab === 'profile' ? (
            <ProfileView profile={profile} compact />
          ) : phoneOverlayTab === 'plan' ? (
            <PlanView profile={profile} profileId={profileId} plans={plans} fallbackProfiles={fallbackProfiles}
              planTemplateId={planTemplateId} planDoctorNote={planDoctorNote} planStatus={planStatus}
              timelineInterventions={timelineInterventions} interventionCatalog={interventionCatalog}
              planTemplates={planTemplates} getTemplateById={getTemplateById} simulationDay={viewDay}
              onSetPlanTemplateId={setPlanTemplateId} onSetPlanDoctorNote={setPlanDoctorNote}
              onSetPlanStatus={setPlanStatus} onRemoveIntervention={removeIntervention}
              onSavePlan={() => savePlan(profileId, { interventions: timelineInterventions, note: planDoctorNote, status: planStatus, templateId: planTemplateId })}
              onClose={() => setPhoneOverlayTab('chat')} compact />
          ) : phoneOverlayTab === 'goals' ? (
            <div style={{padding:'12px 14px',height:'100%',overflowY:'auto',background:'#fafafa'}}>
              <h3 style={{fontSize:14,color:'#311b92',margin:'0 0 4px'}}>Цели программы</h3>
              <p style={{fontSize:10,color:'#888',margin:'0 0 10px'}}>День {viewDay} — прогресс к целевым показателям</p>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {goals.map(g => <GoalChart key={g.id} g={g} expanded={expandedGoal === g.id} onClick={() => setExpandedGoal(expandedGoal === g.id ? null : g.id)} viewDay={viewDay} />)}
              </div>
                <div style={{marginTop:12,padding:'8px 10px',background:'#f3e5f5',borderRadius:8,fontSize:9,color:'#7b1fa2',textAlign:'center'}}>
                  🎯 Всего: {goals.length} · В допуске: {goals.filter(g => g.current != null && g.allowedLo != null && g.allowedHi != null && g.current >= g.allowedLo && g.current <= g.allowedHi).length}
                </div>
            </div>
          ) : (
            <DiaryView profileId={profileId} day={viewDay} onClose={() => setPhoneOverlayTab('chat')} />
          )}
        </div>
        <div className="bottom-nav" id="EL_COMP_010">
          {[
            { label:'Chat',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            { label:'План',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
            { label:'Goals',   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
            { label:'Diary',   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg> },
            { label:'Profile', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          ].map(({label, icon}) => (
            <button key={label} className={`nav-item ${label === (phoneOverlayTab === 'chat' ? 'Chat' : phoneOverlayTab === 'profile' ? 'Profile' : phoneOverlayTab === 'diary' ? 'Diary' : phoneOverlayTab === 'plan' ? 'План' : phoneOverlayTab === 'goals' ? 'Goals' : '') ? 'active' : ''}`}
              onClick={() => { if (label === 'План') setPhoneOverlayTab('plan'); else if (label === 'Chat') setPhoneOverlayTab('chat'); else if (label === 'Profile') setPhoneOverlayTab('profile'); else if (label === 'Diary') setPhoneOverlayTab('diary'); else if (label === 'Goals') setPhoneOverlayTab('goals'); }}>
              <span className="nav-icon">{icon}</span>
              <span className="nav-label" style={{ fontSize: 8 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
