import React, { useState, useEffect, useRef } from 'react';
import ProfileView from './ProfileView';
import DiaryView from './DiaryView';
import PlanView from './PlanView';
import '../assets/css/PhoneSimulator.css';

const SIMULATION_HISTORY = {
  "description": "История симуляции дней 1–10 для профиля Дмитрий",
  "days": [
    {"day":1,"date":"2026-05-01","adherence_pct":70,"tasks":[{"datetime":"2026-05-01 22:15:00","code":"SL_BED","status":"done","comment":"Отбой в 22:15"},{"datetime":"2026-05-02 05:45:00","code":"SL_DUR","status":"done","comment":"7.5 часов сна"},{"datetime":"2026-05-01 08:00:00","code":"MN_MDT","status":"done","comment":"Утренняя медитация 10 мин"},{"datetime":"2026-05-01 12:30:00","code":"MN_BRTH","status":"done","comment":"Дыхательные 5 мин"},{"datetime":"2026-05-01 20:00:00","code":"FD_CAL","status":"done","comment":"1850 ккал"},{"datetime":"","code":"FD_WATER","status":"missed","comment":"Не пил воду"},{"datetime":"","code":"PH_HIIT","status":"pending","comment":""}],"Z_score":42,"notes":"Первый день. Заполнил дневник, но пропустил воду. ВИИТ не сделал."},
    {"day":2,"date":"2026-05-02","adherence_pct":86,"tasks":[{"datetime":"2026-05-02 22:30:00","code":"SL_BED","status":"done","comment":"Отбой в 22:30"},{"datetime":"2026-05-03 05:30:00","code":"SL_DUR","status":"done","comment":"7 часов сна"},{"datetime":"2026-05-02 07:45:00","code":"MN_MDT","status":"done","comment":"Медитация после пробуждения"},{"datetime":"2026-05-02 18:00:00","code":"MN_BRTH","status":"done","comment":"Дыхательные вечером"},{"datetime":"2026-05-02 20:00:00","code":"FD_CAL","status":"done","comment":"1950 ккал"},{"datetime":"2026-05-02 15:00:00","code":"FD_WATER","status":"done","comment":"1.6 литра"},{"datetime":"2026-05-02 19:00:00","code":"PH_AER","status":"done","comment":"Прогулка 30 мин"}],"Z_score":48,"notes":"Выполнил почти всё. Прогулка 30 мин. Калории в норме."},
    {"day":3,"date":"2026-05-03","adherence_pct":75,"tasks":[{"datetime":"2026-05-03 23:00:00","code":"SL_BED","status":"done","comment":"Отбой в 23:00"},{"datetime":"2026-05-04 05:30:00","code":"SL_DUR","status":"done","comment":"6.5 часов сна"},{"datetime":"2026-05-03 08:30:00","code":"MN_MDT","status":"done","comment":"Медитация утром"},{"datetime":"","code":"MN_BRTH","status":"missed","comment":"Пропущено — аврал"},{"datetime":"","code":"FD_CAL","status":"missed","comment":"Перебор по калориям"},{"datetime":"2026-05-03 14:00:00","code":"FD_WATER","status":"done","comment":"1.8 литра"},{"datetime":"2026-05-03 20:00:00","code":"FD_CRB","status":"done","comment":"Углеводы в норме"}],"Z_score":45,"notes":"Сложный день на работе. Перебор по калориям."},
    {"day":4,"date":"2026-05-04","adherence_pct":88,"tasks":[{"datetime":"2026-05-04 22:00:00","code":"SL_BED","status":"done","comment":"Отбой в 22:00"},{"datetime":"2026-05-05 06:00:00","code":"SL_DUR","status":"done","comment":"8 часов сна"},{"datetime":"2026-05-04 07:30:00","code":"MN_MDT","status":"done","comment":"Медитация утром"},{"datetime":"2026-05-04 13:00:00","code":"MN_BRTH","status":"done","comment":"Дыхательные после обеда"},{"datetime":"2026-05-04 20:00:00","code":"FD_CAL","status":"done","comment":"1800 ккал"},{"datetime":"2026-05-04 16:00:00","code":"FD_WATER","status":"done","comment":"2.0 литра"},{"datetime":"2026-05-04 07:00:00","code":"PH_HIIT","status":"done","comment":"ВИИТ 20 мин"}],"Z_score":52,"notes":"Отличный день! ВИИТ утром, хороший сон."},
    {"day":5,"date":"2026-05-05","adherence_pct":78,"tasks":[{"datetime":"2026-05-05 22:45:00","code":"SL_BED","status":"done","comment":"Отбой в 22:45"},{"datetime":"2026-05-06 05:15:00","code":"SL_DUR","status":"done","comment":"6.5 часов сна"},{"datetime":"2026-05-05 09:00:00","code":"MN_MDT","status":"done","comment":"Медитация"},{"datetime":"2026-05-05 15:00:00","code":"MN_BRTH","status":"done","comment":"Дыхательные днём"},{"datetime":"2026-05-05 20:00:00","code":"FD_CAL","status":"done","comment":"2100 ккал"},{"datetime":"","code":"FD_WATER","status":"missed","comment":"Забыл пить воду"},{"datetime":"","code":"FD_SUG","status":"missed","comment":"Сорвался на сладкое"}],"Z_score":47,"notes":"Недосып. Сорвался на сладкое."},
    {"day":6,"date":"2026-05-06","adherence_pct":90,"tasks":[{"datetime":"2026-05-06 22:00:00","code":"SL_BED","status":"done","comment":"Отбой в 22:00"},{"datetime":"2026-05-07 06:00:00","code":"SL_DUR","status":"done","comment":"8 часов сна"},{"datetime":"2026-05-06 07:00:00","code":"MN_MDT","status":"done","comment":"Медитация утром"},{"datetime":"2026-05-06 12:00:00","code":"MN_BRTH","status":"done","comment":"Дыхательные"},{"datetime":"2026-05-06 20:00:00","code":"FD_CAL","status":"done","comment":"1900 ккал"},{"datetime":"2026-05-06 17:00:00","code":"FD_WATER","status":"done","comment":"2.2 литра"},{"datetime":"2026-05-06 18:30:00","code":"PH_AER","status":"done","comment":"Прогулка 45 мин"}],"Z_score":56,"notes":"Выходной. Всё отлично, Z растёт."},
    {"day":7,"date":"2026-05-07","adherence_pct":82,"tasks":[{"datetime":"2026-05-07 22:30:00","code":"SL_BED","status":"done","comment":"Отбой в 22:30"},{"datetime":"2026-05-08 05:30:00","code":"SL_DUR","status":"done","comment":"7 часов сна"},{"datetime":"2026-05-07 08:15:00","code":"MN_MDT","status":"done","comment":"Медитация"},{"datetime":"","code":"MN_BRTH","status":"missed","comment":"Не успел"},{"datetime":"2026-05-07 20:00:00","code":"FD_CAL","status":"done","comment":"1850 ккал"},{"datetime":"2026-05-07 16:00:00","code":"FD_WATER","status":"done","comment":"1.8 литра"},{"datetime":"2026-05-07 12:00:00","code":"FD_IF","status":"done","comment":"Окно 16/8"}],"Z_score":51,"notes":"Начал 16/8. Запись на гастроскопию."},
    {"day":8,"date":"2026-05-08","adherence_pct":85,"tasks":[{"datetime":"2026-05-08 22:00:00","code":"SL_BED","status":"done","comment":"Отбой в 22:00"},{"datetime":"2026-05-09 05:30:00","code":"SL_DUR","status":"done","comment":"7.5 часов сна"},{"datetime":"2026-05-08 07:00:00","code":"SL_QLT","status":"done","comment":"Качество сна: хорошее"},{"datetime":"2026-05-08 07:45:00","code":"MN_MDT","status":"done","comment":"Медитация утром"},{"datetime":"2026-05-08 11:30:00","code":"MN_BRTH","status":"done","comment":"Дыхательные"},{"datetime":"2026-05-08 20:00:00","code":"FD_CAL","status":"done","comment":"1900 ккал"},{"datetime":"2026-05-08 15:00:00","code":"FD_WATER","status":"done","comment":"2.0 литра"},{"datetime":"2026-05-08 06:45:00","code":"PH_HIIT","status":"done","comment":"ВИИТ 25 мин"},{"datetime":"2026-05-08 21:00:00","code":"SP_MG","status":"done","comment":"Магний 200 мг"}],"Z_score":55,"notes":"Добавил магний. ВИИТ прошёл хорошо."},
    {"day":9,"date":"2026-05-09","adherence_pct":72,"tasks":[{"datetime":"2026-05-09 23:30:00","code":"SL_BED","status":"done","comment":"Поздний отбой"},{"datetime":"2026-05-10 05:30:00","code":"SL_DUR","status":"done","comment":"6 часов сна"},{"datetime":"","code":"SL_QLT","status":"missed","comment":"Не оценил"},{"datetime":"","code":"MN_MDT","status":"missed","comment":"Не было времени"},{"datetime":"","code":"MN_BRTH","status":"missed","comment":"Не было времени"},{"datetime":"","code":"FD_CAL","status":"missed","comment":"Не считал"},{"datetime":"2026-05-09 14:00:00","code":"FD_WATER","status":"done","comment":"1.2 литра"},{"datetime":"","code":"MN_STR","status":"missed","comment":"Сильный стресс"}],"Z_score":38,"notes":"Аврал. Все практики пропущены. Z упал."},
    {"day":10,"date":"2026-05-10","adherence_pct":92,"tasks":[{"datetime":"2026-05-10 22:00:00","code":"SL_BED","status":"done","comment":"Отбой в 22:00"},{"datetime":"2026-05-11 06:00:00","code":"SL_DUR","status":"done","comment":"8 часов сна"},{"datetime":"2026-05-10 07:00:00","code":"MN_MDT","status":"done","comment":"Медитация утром"},{"datetime":"2026-05-10 12:30:00","code":"MN_BRTH","status":"done","comment":"Дыхательные 10 мин"},{"datetime":"2026-05-10 19:00:00","code":"FD_CAL","status":"done","comment":"1750 ккал"},{"datetime":"2026-05-10 16:00:00","code":"FD_WATER","status":"done","comment":"2.0 литра"},{"datetime":"2026-05-10 17:00:00","code":"PH_AER","status":"done","comment":"Прогулка 40 мин"},{"datetime":"2026-05-10 21:30:00","code":"SP_MG","status":"done","comment":"Магний 200 мг"}],"Z_score":60,"notes":"Компенсировал провал. Z достиг 60."}
  ],
  "summary": {"total_days":10,"avg_adherence":81.8,"avg_calories":1998,"avg_diary_entries":2.6,"start_Z":42,"end_Z":60}
};

const THERAPY_EXECUTION = {
  "plan_id":"DMITRY_57_30D_01","start_date":"2026-05-17","end_date":"2026-06-15",
  "days":[
    {"day":1,"date":"2026-05-17","weight_kg":88,"adherence_pct":67,"tasks":[{"code":"FD_CAL","status":"done","comment":"Спланировал меню на день","datetime":"2026-05-17  20:00:00"},{"code":"PH_WALK","status":"done","comment":"6200 шагов — чуть меньше цели","datetime":"2026-05-17  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара, отказался от десерта","datetime":"2026-05-17  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи на обед и ужин","datetime":"2026-05-17  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром 5 мин, вечером пропустил","datetime":"2026-05-17  07:15:00"},{"code":"SL_BED","status":"undone","comment":"Лёг в 23:30 — доделывал отчёт","datetime":"2026-05-17  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"Запланировано на день 14","datetime":"2026-05-17  08:00:00"},{"code":"FD_WATER","status":"done","comment":"1.8 л воды","datetime":"2026-05-17  15:00:00"}],"mood":"neutral","note":"Первый день — непривычно, но вечером почувствовал контроль"},
    {"day":2,"date":"2026-05-18","weight_kg":87.6,"adherence_pct":75,"tasks":[{"code":"FD_CAL","status":"done","comment":"Соблюдал дефицит","datetime":"2026-05-18  20:00:00"},{"code":"PH_WALK","status":"done","comment":"7800 шагов — почти достиг!","datetime":"2026-05-18  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Без сахара весь день","datetime":"2026-05-18  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи + овсянка","datetime":"2026-05-18  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером по 5 мин","datetime":"2026-05-18  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 23:00","datetime":"2026-05-18  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-18  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-05-18  15:00:00"}],"mood":"good","note":"Прилив энергии к вечеру. Сон глубже."},
    {"day":3,"date":"2026-05-19","weight_kg":87.3,"adherence_pct":50,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-05-19  20:00:00"},{"code":"PH_WALK","status":"undone","comment":"3500 шагов — весь день в совещаниях","datetime":"2026-05-19  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Удержался от сладкого","datetime":"2026-05-19  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Салат на обед","datetime":"2026-05-19  13:00:00"},{"code":"MN_BRTH","status":"undone","comment":"Забыл — накладка с дедлайном","datetime":"2026-05-19  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 23:00","datetime":"2026-05-19  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-19  08:00:00"},{"code":"FD_WATER","status":"done","comment":"1.5 л — маловато","datetime":"2026-05-19  15:00:00"}],"mood":"tired","note":"Рабочий день вымотал. Шаги и дыхание провалил."},
    {"day":4,"date":"2026-05-20","weight_kg":87.5,"adherence_pct":62,"tasks":[{"code":"FD_CAL","status":"done","comment":"Норма","datetime":"2026-05-20  20:00:00"},{"code":"PH_WALK","status":"done","comment":"6500 шагов — компенсировал","datetime":"2026-05-20  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-05-20  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи с каждым приёмом","datetime":"2026-05-20  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-20  07:15:00"},{"code":"SL_BED","status":"undone","comment":"Лёг в 23:45","datetime":"2026-05-20  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-20  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.2 л","datetime":"2026-05-20  15:00:00"}],"mood":"neutral","note":"Стараюсь не ругать себя за срывы."},
    {"day":5,"date":"2026-05-21","weight_kg":87.1,"adherence_pct":83,"tasks":[{"code":"FD_CAL","status":"done","comment":"Полностью соблюдён","datetime":"2026-05-21  20:00:00"},{"code":"PH_WALK","status":"done","comment":"8200 шагов — рекорд!","datetime":"2026-05-21  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Ноль сахара","datetime":"2026-05-21  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи + ягоды","datetime":"2026-05-21  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-21  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 22:55","datetime":"2026-05-21  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-21  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.5 л — норма","datetime":"2026-05-21  15:00:00"}],"mood":"great","note":"Лучший день! Вес -0.9 кг за 5 дней."}
  ],
  "stats_at_day5":{"total_days":5,"avg_adherence_pct":67.4,"weight_delta_kg":-0.9,"avg_steps":6440,"best_day":5,"worst_day":3,"tasks_total":40,"tasks_done":27,"tasks_undone":8,"tasks_pending":5}
};

function ChatBubble({ side, children, time, style, id }) {
  return (
    <div id={id} style={{ display:'flex', flexDirection:'column', alignItems: side==='right'?'flex-end':'flex-start', marginBottom:2, ...style }}>
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

function InterventionBadge({ code, name, done, skipped, comment, description }) {
  const statusColor = done ? '#e8f5e9' : skipped ? '#ffebee' : '#fff3e0';
  const statusText = done ? '✅ Выполнено' : skipped ? '❌ Пропущено' : '⏳ Ожидает';
  return (
    <div style={{display:'flex',alignItems:'center',gap:6,background:statusColor,borderRadius:8,padding:'6px 8px',marginBottom:4,border:'1px solid '+(done?'#a5d6a7':skipped?'#ef9a9a':'#ffe0b2')}}>
      <div style={{width:6,height:6,borderRadius:'50%',background:done?'#4caf50':skipped?'#f44336':'#ff9800',flexShrink:0}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:9,fontWeight:600,color:'#333'}}>{code}</div>
        {description && <div style={{fontSize:8,color:'#666',marginTop:1}}>{description}</div>}
        {comment && <div style={{fontSize:8,color:'#555',marginTop:0.5}}>{comment}</div>}
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
  onCreatePlan,
}) {
  const [viewDay, setViewDay] = useState(simulationDay);
  const [expandedGoal, setExpandedGoal] = useState(null);
  useEffect(() => { setViewDay(simulationDay); }, [simulationDay]);
  const chatEndRef = useRef(null);

  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [completedTaskKeys, setCompletedTaskKeys] = useState(() => new Set());
  const [diaryMeals, setDiaryMeals] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [apiProvider, setApiProvider] = useState(() => localStorage.getItem('healora_api_provider') || 'gigachat');
  const [showPrompt, setShowPrompt] = useState(false);
  const prevZRef = useRef(0);
  const historyInsertedRef = useRef(false);
  const planInsertedRef = useRef(0);
  const getDesc = code => interventionCatalog?.[code]?.description || '';

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

  const todayTasks = (() => {
    const tasks = (timelineInterventions || []).filter(i => i.day === viewDay).map(i => ({
      key: `int-${i.code}-${i.day}`,
      code: i.code,
      name: i.name,
      type: 'intervention',
      done: i.done || completedTaskKeys.has(`int-${i.code}-${i.day}`),
    }));
    const hasDiary = diaryMeals.some(m => m.calories && Number(m.calories) > 0);
    const totalCals = diaryMeals.reduce((s, m) => s + (Number(m.calories) || 0), 0);
    const calLimit = 2200;
    tasks.unshift({ key:'diary', code:'DIARY', name:'Заполнить дневник питания', type:'diary', done: completedTaskKeys.has('diary'), alert: !hasDiary });
    tasks.unshift({ key:'calories', code:'KCAL', name:`Калории ≤ ${calLimit} ккал (сейчас ${totalCals})`, type:'calories', done: completedTaskKeys.has('calories'), alert: totalCals > calLimit });
    return tasks;
  })();

  // Z-фактор — регрессионная оценка эффективности похудения
  const zFactors = (() => {
    const total = todayTasks.length;
    const done = todayTasks.filter(t => t.done).length;
    const adherence = total > 0 ? done / total : 0;
    const hasDiary = diaryMeals.some(m => m.calories && Number(m.calories) > 0);
    const totalCals = diaryMeals.reduce((s, m) => s + (Number(m.calories) || 0), 0);
    const calOk = totalCals <= 2200;
    const w_adherence = 0.35;
    const w_calories  = 0.25;
    const w_diary     = 0.15;
    const w_evidence  = 0.15;
    const w_genetics  = 0.10;
    const vals = {
      adherence:   adherence,
      calories:    calOk ? 1 : 0,
      diary:       hasDiary ? 1 : 0,
      evidence:    0.8,
      genetics:    (profile?.anthropometrics?.bmi || 25) > 30 ? 0.6 : (profile?.anthropometrics?.bmi || 25) > 25 ? 0.8 : 1.0,
    };
    const Z = Math.round((
      w_adherence * vals.adherence +
      w_calories  * vals.calories +
      w_diary     * vals.diary +
      w_evidence  * vals.evidence +
      w_genetics  * vals.genetics
    ) * 100);
    return { Z: Math.min(100, Math.max(0, Z)), factors: vals, weights: { w_adherence, w_calories, w_diary, w_evidence, w_genetics } };
  })();

  useEffect(() => { if (prevZRef.current === 0) prevZRef.current = zFactors.Z; }, [zFactors.Z]);

  const initChatMessages = () => {
    const today = chatMessages.filter(m => m.day === viewDay);
    const now = new Date();
    const t = n => `${String(now.getHours()).padStart(2,'0')}:${String(n).padStart(2,'0')}`;
    const msgs = [];

    msgs.push({ id:'w1', side:'left', time:t(1), type:'text', text:`Здравствуйте, ${profile?.name || 'пользователь'}! Я ваш AI-ассистент Healora 🤖` });
    msgs.push({ id:'w2', side:'left', time:t(2), type:'text', text:'У вас отличный прогресс! Healora Score вырос на **15 пунктов** за последнюю неделю.' });

    // Show today's interventions from execution_history as badges with datetime
    const execDay = THERAPY_EXECUTION.days.find(d => d.day === viewDay);
    if (execDay && execDay.tasks.length > 0) {
      msgs.push({ id:'w3', side:'left', time:t(3), type:'text', text:`📋 **День ${viewDay} (${execDay.date})** — интервенции:` });
      execDay.tasks.forEach(t => {
        msgs.push({
          id:`ib-exec-${t.code}`, side:'left', time: t.datetime || '', type:'intervention-badge',
          code: t.code, name: '', comment: t.comment, description: getDesc(t.code),
          done: t.status === 'done',
          skipped: t.status === 'undone' || t.status === 'missed',
        });
      });
    } else {
      const dayMsgs = today.filter(m => m.type === 'intervention').slice(0, 4);
      if (dayMsgs.length > 0) {
        msgs.push({ id:'w3', side:'left', time:t(3), type:'text', text:`На сегодня (день ${viewDay}) у вас запланированы интервенции:` });
        dayMsgs.forEach(m => {
          msgs.push({ id:`ib-${m.id}`, side:'left', time:t(3), type:'intervention-badge', code:m.code, name:m.name, description: getDesc(m.code), done:m.done, skipped:m.skipped });
        });
      } else {
        const interventions = timelineInterventions.filter(i => i.day === viewDay).slice(0, 3);
        if (interventions.length > 0) {
          msgs.push({ id:'w3b', side:'left', time:t(3), type:'text', text:`На сегодня (день ${viewDay}) запланировано:` });
          interventions.forEach(i => {
            msgs.push({ id:`ib-${i.code}`, side:'left', time:t(3), type:'intervention-badge', code:i.code, name:i.name, description: getDesc(i.code), done:false, skipped:false });
          });
        }
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
        text:`📋 **Итоги дня ${viewDay}:**\n• ${doneCount} из ${totalCount} интервенций выполнено (${Math.round(doneCount/totalCount*100)}%)\n• Z: ${profile?.digital_twin_scores?.current_stars || 0}\n• Продолжайте в том же духе!`
      });
    }

    msgs.push({ id:'w8', side:'left', time:t(11), type:'text', text:'Хотите скорректировать план на завтра? Просто напишите, что изменить.' });
    msgs.push({ id:'u3', side:'right', time:t(12), type:'text', text:'Да, убери HIIT завтра, оставлю только растяжку.' });
    msgs.push({ id:'w9', side:'left', time:t(13), type:'text', text:'✅ Готово! Убрал PH_HIIT из завтрашнего плана, добавил PH_FLEX. Новый план уже синхронизирован.' });
    msgs.push({ id:'u4', side:'right', time:t(14), type:'text', text:'Спасибо! 😊' });
    msgs.push({ id:'w10', side:'left', time:t(15), type:'text', text:'Всегда пожалуйста! Завтра в 8:00 у вас медитация MN_MDT + лёгкая растяжка. Хорошего вечера! 🌙' });

    return msgs;
  };

  const [localMessages, setLocalMessages] = useState(() => initChatMessages());

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [localMessages]);

  // Reset chat and reload when viewDay changes via navigation
  useEffect(() => {
    historyInsertedRef.current = false;
    planInsertedRef.current = 0;
    setLocalMessages(initChatMessages());
  }, [viewDay]);

  // Add todayTasks badges to chat (once per viewDay)
  useEffect(() => {
    if (todayTasks.length === 0 || planInsertedRef.current === viewDay) return;
    planInsertedRef.current = viewDay;
    const msgs = [];
    msgs.push({ id:`plan-hdr-${viewDay}`, side:'left', time:'', type:'text',
      text:`📋 **План на день ${viewDay}** (${todayTasks.length} задач)` });
    todayTasks.forEach((t, i) => {
      const status = t.done ? 'done' : (t.alert ? 'undone' : 'pending');
      msgs.push({
        id:`plan-badge-${viewDay}-${t.code}`, side:'left', time:'', type:'intervention-badge',
        code: t.code, name: '', comment: t.name, description: getDesc(t.code),
        done: status === 'done',
        skipped: status === 'undone',
      });
    });
    setLocalMessages(prev => [...prev, ...msgs]);
  }, [viewDay, todayTasks.length]);

  useEffect(() => {
    if (viewDay > 0) {
      const el = document.getElementById(`auto-hist-${viewDay}`);
      if (el) { el.scrollIntoView({ behavior:'smooth', block:'start' }); return; }
    }
  }, [viewDay]);

  useEffect(() => {
    if (viewDay > 0 && !historyInsertedRef.current) {
      historyInsertedRef.current = true;
      const msgs = [];
      const daysToShow = SIMULATION_HISTORY.days.filter(d => d.day <= viewDay);
      const questions = ['Как вы оцениваете своё самочувствие?', 'Какие изменения заметили?', 'Готовы ли скорректировать план?', 'Есть ли вопросы по питанию?', 'Как сон?', 'Как уровень энергии?', 'Нужна ли помощь с режимом?', 'Что хотите изменить в тренировках?', 'Как стресс сегодня?', 'Какие планы на завтра?'];
      daysToShow.forEach((d, di) => {
        const done = d.tasks.filter(x => x.status === 'done').length;
        const total = d.tasks.length;
        const emoji = d.adherence_pct >= 85 ? '🔥' : d.adherence_pct >= 70 ? '👍' : '⚠️';
        // Show day header
        msgs.push({ id:`auto-hist-${d.day}`, side:'left', time: d.date, type:'text',
          text:`📅 **День ${d.day}** ${emoji} ${done}/${total} · adherence ${d.adherence_pct}% · Z=${d.Z_score}` });
        // Show each task as badge with datetime
        d.tasks.forEach(x => {
          msgs.push({
            id:`auto-badge-${d.day}-${x.code}`, side:'left', time: x.datetime || '', type:'intervention-badge',
            code: x.code, name: '', comment: x.comment, description: getDesc(x.code),
            done: x.status === 'done',
            skipped: x.status === 'missed' || x.status === 'undone',
          });
        });
        msgs.push({ id:`auto-note-${d.day}`, side:'left', time:`${d.date} · примечание`, type:'text',
          text:`_${d.notes}_` });
        msgs.push({ id:`auto-q-${d.day}`, side:'left', time: `${d.date}  · вопрос`, type:'text',
          text: `🤔 ${questions[di % questions.length]}` });
      });
      msgs.push({ id:'auto-summary', side:'left', time:`Итог ${viewDay} дней`, type:'text',
        text:`📊 **${viewDay} дней позади:** Z ${daysToShow[0].Z_score} → ${daysToShow[daysToShow.length-1].Z_score} (${daysToShow[daysToShow.length-1].Z_score - daysToShow[0].Z_score > 0 ? '+' : ''}${daysToShow[daysToShow.length-1].Z_score - daysToShow[0].Z_score}) · В среднем ${Math.round(daysToShow.reduce((s,d)=>s+d.adherence_pct,0)/daysToShow.length)}%` });
      setLocalMessages(prev => [...prev, ...msgs]);
    }
  }, [viewDay]);

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
        body:JSON.stringify({ message: msg, profile: profileId, history, provider: apiProvider, tasks: todayTasks }),
      });
      const data = await res.json();
      const prompt = buildPrompt();
      const promptMessages = [
        { role:'system', content: prompt.slice(0,200) + '...' },
        ...history.slice(-3),
        { role:'user', content: msg },
      ];
      setLocalMessages(prev => [...prev, { id:`a-${Date.now()}`, side:'left', type:'text', time:t, text:data.reply || '_Нет ответа_', prompt: promptMessages }]);
    } catch {
      setLocalMessages(prev => [...prev, { id:`a-${Date.now()}`, side:'left', type:'text', time:t, text:'⚠️ Ошибка соединения с сервером. Попробуйте позже.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSend(); };

  const switchProvider = (p) => { setApiProvider(p); localStorage.setItem('healora_api_provider', p); };

  const buildPrompt = () => {
    const d = profile?.demographics || {};
    const a = profile?.anthropometrics || {};
    const v = profile?.vitals || {};
    const l = profile?.labs || {};
    const ls = profile?.lifestyle || {};
    const planSection = todayTasks.length > 0
      ? `\nПлан терапии на сегодня (день ${viewDay}):\n${todayTasks.map(t => `  ${t.done ? '✅ [ВЫПОЛНЕНО]' : t.alert ? '🔴 [ПРОПУЩЕНО]' : '⬜ [ОЖИДАЕТСЯ]'} ${t.name} (${t.code})`).join('\n')}`
      : '\nПлан терапии: данные не загружены.';
    return `Ты — Healora AI, персональный ассистент здоровья.

Информация о пользователе:
- Имя: ${d.name || 'Пользователь'}
- Возраст: ${d.age || '?'} лет
- Пол: ${d.sex === 'male' ? 'Мужской' : d.sex === 'female' ? 'Женский' : d.sex || '?'}
- Рост: ${a.height_cm || '?'} см
- Вес: ${a.weight_kg || '?'} кг
- ИМТ: ${a.bmi || '?'}
- Давление: ${v.systolic_bp_mmhg || '?'}/${v.diastolic_bp_mmhg || '?'} мм рт.ст.
- Пульс: ${v.resting_hr_bpm || '?'} уд/мин

Лабораторные показатели:
- Глюкоза: ${l.glucose_mg_dl || '?'} мг/дл
- HbA1c: ${l.hba1c_percent || '?'} %
- Холестерин общий: ${l.total_cholesterol_mg_dl || '?'} мг/дл
- HDL: ${l.hdl_mg_dl || '?'} мг/дл
- LDL: ${l.ldl_mg_dl || '?'} мг/дл
- Триглицериды: ${l.triglycerides_mg_dl || '?'} мг/дл
- Витамин D: ${l.vitamin_d_ng_ml || '?'} нг/мл
- Железо: ${l.iron_mcg_dl || '?'} мкг/дл
- Ферритин: ${l.ferritin_ng_ml || '?'} нг/мл

Образ жизни:
- Сон: ${ls.sleep_hours || '?'} ч/сут
- Стресс: ${ls.stress_level || '?'}/10
- Шаги: ${ls.steps_per_day || '?'} шагов/день
- Вода: ${ls.water_ml_per_day || '?'} мл/день
- Курение: ${ls.smoking || '?'}
- Алкоголь: ${ls.alcohol || '?'}
${planSection}
Правила:
1. Отвечай на русском языке.
2. Будь кратким (2-4 предложения).
3. Используй данные пользователя для персонализации ответов.
4. Если вопрос касается здоровья — ссылайся на показатели пользователя и план терапии.
5. Если какое-то задание из плана отмечено 🔴 [ПРОПУЩЕНО] — мягко напомни о нём и предложи выполнить.
6. Если все задания выполнены — похвали пользователя.
7. Задавай 1 уточняющий вопрос в конце каждого ответа: спроси о самочувствии, выполнении задания или потребностях на завтра.
8. Будь поддерживающим и мотивирующим.
9. НЕ ставь медицинских диагнозов — рекомендую проконсультироваться с врачом.
10. Если спрашивают про питание — предложи конкретные продукты с учётом КБЖУ.`;
  };

  const addHistoryToChat = () => {
    const msgs = [];
    let idx = 0;
    SIMULATION_HISTORY.days.forEach(d => {
      const done = d.tasks.filter(t => t.status === 'done').length;
      const total = d.tasks.length;
      msgs.push({
        id:`hist-hdr-${d.day}`, side:'left', time: d.date, type:'text',
        text:`📅 **День ${d.day}** (${d.date}) — ${done}/${total} (${d.adherence_pct}%) · Z=${d.Z_score}`
      });
      d.tasks.forEach(t => {
        const taskTime = t.datetime || '';
        msgs.push({
          id:`hist-badge-${d.day}-${t.code}`, side:'left', time: taskTime, type:'intervention-badge',
          code: t.code, name: '', comment: t.comment, description: getDesc(t.code),
          done: t.status === 'done',
          skipped: t.status === 'missed',
        });
      });
      msgs.push({
        id:`hist-note-${d.day}`, side:'left', time:`${d.date} · примечание`, type:'text',
        text:`_${d.notes}_`
      });
    });
    msgs.push({
      id:'hist-summary', side:'left', time:`Итог 10 дней`, type:'text',
      text:`📊 **Итог:** Z ${SIMULATION_HISTORY.days[0].Z_score} → ${SIMULATION_HISTORY.days[9].Z_score} (+${SIMULATION_HISTORY.days[9].Z_score-SIMULATION_HISTORY.days[0].Z_score}) · Средний adherence: ${SIMULATION_HISTORY.summary.avg_adherence}%`
    });
    setLocalMessages(prev => [...prev, ...msgs]);
  };

  const [showZFormula, setShowZFormula] = useState(false);
  const [viewPrompt, setViewPrompt] = useState(null);
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
        <button className="phone-overlay-tab" onClick={() => setShowSettings(p => !p)} style={{padding:'6px 8px',border:'none',background:'none',cursor:'pointer',color:showSettings?'#6b21c8':'#999',display:'flex'}} title="Настройки">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
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
                <span className="z-badge" onClick={() => setShowZFormula(true)} title="Z — регрессионная оценка эффективности">
                  <span className="z-badge-prefix">Z=</span>{SIMULATION_HISTORY.days.find(d => d.day === viewDay)?.Z_score ?? zFactors.Z}
                </span>
                <span className="score-label">{profile?.name || ''}</span>
              </div>
              <div className="progress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="streak-icon"><path d="M12 2l2.5 8.5L22 12l-7.5 1.5L12 22l-2.5-8.5L2 12l7.5-1.5z"/></svg>
                <span>{profile?.lifestyle?.sleep_hours || 0} ч сна</span>
                <span className="progress-sep">|</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="plan-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <span>{profile?.digital_twin_scores?.current_stars || 0} очков</span>
              </div>
            </div>
            </div>
            <div className="header-demographics">
              <span>{profile?.name || ''}</span>
              <span className="demo-sep">·</span>
              <span>{profile?.demographics?.age || '?'} лет</span>
              <span className="demo-sep">·</span>
              <span>{profile?.demographics?.sex === 'male' ? 'М' : profile?.demographics?.sex === 'female' ? 'Ж' : '?'}</span>
              <span className="demo-sep">·</span>
              <span>{profile?.anthropometrics?.weight_kg || '?'} кг</span>
              <span className="demo-sep">·</span>
              <span>{profile?.anthropometrics?.height_cm || '?'} см</span>
            </div>
            <div className="day-nav">
            <button className="day-nav-btn" onClick={() => setViewDay(Math.max(0, viewDay - 1))} disabled={viewDay<=0}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="day-nav-label">День {viewDay} / 30</span>
            <button className="day-nav-btn" onClick={() => setViewDay(Math.min(30, viewDay + 1))} disabled={viewDay>=30}>
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
                      <div key={msg.id} id={msg.id} style={{display:'flex',flexDirection:'column',alignItems:'flex-start',marginBottom:2}}>
                        <InterventionBadge code={msg.code} name={msg.name} done={msg.done} skipped={msg.skipped} comment={msg.comment} description={msg.description} />
                        {msg.time && <span style={{fontSize:7,color:'#aaa',marginTop:1,marginLeft:4}}>{msg.time}</span>}
                      </div>
                    );
                  }
                  if (msg.type === 'food-photo') {
                    const thumbSrc = msg.photo
                      ? msg.photo.replace('/images/food/', '/images/food/thumbs/')
                      : '/images/food/thumbs/12. 20260219_204535.jpg';
                    return (
                      <ChatBubble key={msg.id} id={msg.id} side="right" time={msg.time}>
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
                      <ChatBubble key={msg.id} id={msg.id} side="right" time={msg.time}>
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
                    <div key={msg.id} id={msg.id} onClick={() => { if (msg.prompt) setViewPrompt(msg); }} style={{cursor:msg.prompt?'pointer':'default'}}>
                      <ChatBubble side={msg.side} time={msg.time}>
                        <span style={{whiteSpace:'pre-wrap'}} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                      </ChatBubble>
                    </div>
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
                  placeholder={chatLoading ? 'GigaChat печатает...' : 'Напишите сообщение...'}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ flex: 1, border: '1px solid #d1c4e9', borderRadius: 16, padding: '6px 10px', fontSize: 11, outline: 'none', opacity: chatLoading ? 0.5 : 1 }}
                  disabled={chatLoading}
                />
                <button style={{ background: '#6b21c8', border: 'none', borderRadius: '50%', width: 26, height: 26, color: '#fff', cursor: chatLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: chatLoading ? 0.5 : 1 }} onClick={handleSend} disabled={chatLoading}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
              <button onClick={() => setShowTasks(p => !p)} style={{display:'flex',alignItems:'center',gap:4,width:'100%',border:'none',borderTop:'1px solid #e0e0e0',background:showTasks?'#f3e5f5':'#fafafa',padding:'5px 10px',fontSize:10,color:'#7b1fa2',cursor:'pointer',fontWeight:showTasks?600:400}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Мои задания
                <span style={{marginLeft:'auto',fontSize:9,color:'#999'}}>{todayTasks.filter(t => t.done).length}/{todayTasks.length}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10" style={{transform:showTasks?'rotate(180deg)':'none',transition:'0.2s'}}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {showTasks && (
                <div style={{padding:'4px 8px 6px',background:'#fafafa',borderTop:'1px solid #e0e0e0',display:'flex',flexDirection:'column',gap:3}}>
                  {todayTasks.map(t => (
                    <div key={t.key} onClick={() => {
                      const wasDone = t.done;
                      setCompletedTaskKeys(prev => {
                        const next = new Set(prev);
                        if (next.has(t.key)) next.delete(t.key); else next.add(t.key);
                        return next;
                      });
                      const now = new Date();
                      const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
                      const totalTasks = todayTasks.length;
                      let delta = 0;
                      if (t.type === 'intervention' && totalTasks > 0) {
                        delta = wasDone ? -Math.round(35/totalTasks) : Math.round(35/totalTasks);
                      } else if (t.type === 'diary') {
                        delta = wasDone ? -15 : 15;
                      } else if (t.type === 'calories') {
                        delta = wasDone ? -25 : 25;
                      }
                      const prevZ = prevZRef.current;
                      const newZ = Math.min(100, Math.max(0, prevZ + delta));
                      const sign = delta >= 0 ? '+' : '';
                      const emoji = delta >= 0 ? '🔥' : '⚠️';
                      const msg = wasDone
                        ? `❌ Задание "${t.name}" отменено. ${emoji} Z: ${prevZ} → ${newZ} (${sign}${delta})`
                        : `✅ Задание "${t.name}" выполнено! ${emoji} Z: ${prevZ} → ${newZ} (${sign}${delta})`;
                      prevZRef.current = newZ;
                      setLocalMessages(prev => [...prev, { id:`z-${Date.now()}`, side:'left', time, type:'text', text: msg }]);
                    }} style={{display:'flex',alignItems:'center',gap:6,padding:'3px 6px',borderRadius:6,cursor:'pointer',background:t.done?'#e8f5e9':t.alert?'#ffebee':'#fff',border:'1px solid',borderColor:t.done?'#c8e6c9':t.alert?'#ffcdd2':'#e0e0e0',fontSize:10,transition:'0.15s'}}>
                      <span style={{width:14,height:14,borderRadius:3,border:'2px solid',borderColor:t.done?'#4caf50':t.alert?'#e53935':'#bbb',display:'flex',alignItems:'center',justifyContent:'center',background:t.done?'#4caf50':'transparent',flexShrink:0}}>
                        {t.done && <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="10" height="10"><polyline points="20 6 9 17 4 12"/></svg>}
                      </span>
                      <span style={{color:t.alert&&!t.done?'#c62828':'#333',fontWeight:t.alert&&!t.done?600:400,flex:1}}>{t.name}</span>
                      <span style={{fontSize:7,color:'#999',background:'#eee',padding:'1px 4px',borderRadius:4,fontWeight:600}}>{t.code}</span>
                    </div>
                  ))}
                </div>
              )}
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
              onCreatePlan={onCreatePlan}
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
          {showSettings && (
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.3)',zIndex:100,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:20}} onClick={() => setShowSettings(false)}>
              <div style={{background:'#fff',borderRadius:12,padding:14,width:'85%',maxWidth:260,boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
                <div style={{fontSize:12,fontWeight:600,color:'#311b92',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Настройки AI
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10,color:'#888',marginBottom:4}}>API провайдер</div>
                  <div style={{display:'flex',gap:4}}>
                    {['gigachat','openai'].map(p => (
                      <button key={p} onClick={() => { switchProvider(p); }}
                        style={{flex:1,padding:'5px 0',border:'1px solid',borderColor:apiProvider===p?'#6b21c8':'#e0e0e0',borderRadius:6,background:apiProvider===p?'#f3e5f5':'#fff',fontSize:10,fontWeight:apiProvider===p?600:400,color:apiProvider===p?'#6b21c8':'#666',cursor:'pointer'}}>
                        {p === 'gigachat' ? 'GigaChat' : 'OpenAI'}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowPrompt(true)}
                  style={{width:'100%',padding:'5px 0',border:'1px solid #e0e0e0',borderRadius:6,background:'#fff',fontSize:10,color:'#333',cursor:'pointer',marginBottom:8}}>
                  📄 Отобразить полный промпт
                </button>
                <button onClick={() => setShowSettings(false)}
                  style={{width:'100%',padding:'5px 0',border:'none',borderRadius:6,background:'#f5f5f5',fontSize:10,color:'#999',cursor:'pointer'}}>
                  Закрыть
                </button>
              </div>
            </div>
          )}
          {showPrompt && (
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',zIndex:110,display:'flex',alignItems:'center',justifyContent:'center',padding:12}} onClick={() => setShowPrompt(false)}>
              <div style={{background:'#fff',borderRadius:12,padding:14,width:'100%',maxWidth:300,maxHeight:'80%',overflow:'auto',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
                <div style={{fontSize:11,fontWeight:600,color:'#311b92',marginBottom:8}}>System Prompt</div>
                <pre style={{fontSize:8,lineHeight:1.4,color:'#333',whiteSpace:'pre-wrap',wordBreak:'break-word',background:'#f5f5f5',padding:8,borderRadius:6,margin:0,maxHeight:300,overflow:'auto'}}>{buildPrompt()}</pre>
                <button onClick={() => setShowPrompt(false)}
                  style={{width:'100%',padding:'5px 0',border:'none',borderRadius:6,background:'#f5f5f5',fontSize:10,color:'#999',cursor:'pointer',marginTop:8}}>
                  Закрыть
                </button>
              </div>
            </div>
          )}
          {showZFormula && (
            <div className="z-overlay" onClick={() => setShowZFormula(false)}>
              <div className="z-modal" onClick={e => e.stopPropagation()}>
                <div className="z-title">
                  <span className="z-title-letter">Z</span> — регрессионная оценка эффективности
                </div>
                <div className="z-formula">
                  Z = β₀ + β₁·Adherence + β₂·Калории + β₃·Дневник + β₄·Evidence + β₅·Генетика
                </div>
                <div className="z-factors">
                  {[
                    { label:'Adherence к плану',     weight:'β₁=0.35', val:zFactors.factors.adherence,   pct:Math.round(zFactors.factors.adherence * 100) },
                    { label:'Калорийный контроль',   weight:'β₂=0.25', val:zFactors.factors.calories,    pct:Math.round(zFactors.factors.calories * 100) },
                    { label:'Ведение дневника',      weight:'β₃=0.15', val:zFactors.factors.diary,       pct:Math.round(zFactors.factors.diary * 100) },
                    { label:'Доказательность плана', weight:'β₄=0.15', val:zFactors.factors.evidence,    pct:Math.round(zFactors.factors.evidence * 100) },
                    { label:'Генетическая предрасп.', weight:'β₅=0.10', val:zFactors.factors.genetics,   pct:Math.round(zFactors.factors.genetics * 100) },
                  ].map(f => {
                    const c = f.val >= 0.8 ? '#4caf50' : f.val >= 0.5 ? '#ff9800' : '#e53935';
                    return (
                      <div key={f.label} className="z-row">
                        <span className="z-label">{f.label}</span>
                        <span className="z-weight">{f.weight}</span>
                        <div className="z-bar-bg">
                          <div className="z-bar-fill" style={{width:`${f.pct}%`,background:c}} />
                        </div>
                        <span className="z-pct" style={{color:c}}>{f.pct}%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="z-chart-wrap">
                  <div className="z-chart-title">Динамика Z по дням</div>
                  <svg viewBox="0 0 280 60" width="100%" height="60">
                    {(() => {
                      const W=280, H=60, P=8;
                      const days = SIMULATION_HISTORY.days;
                      const zVals = days.map(d => d.Z_score);
                      const zMin = Math.min(...zVals) - 5;
                      const zMax = Math.max(...zVals) + 5;
                      const zRng = zMax - zMin || 1;
                      const x = i => P + (i / (days.length-1 || 1)) * (W-2*P);
                      const y = v => H - P - ((v - zMin) / zRng) * (H-2*P);
                      const pts = days.map((d,i) => `${x(i)},${y(d.Z_score)}`).join(' ');
                      const curDay = days.find(d => d.day === viewDay);
                      return (<>
                        <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="#e0e0e0" strokeWidth="0.5"/>
                        <polyline points={pts} fill="none" stroke="#6b21c8" strokeWidth="1.5" strokeLinejoin="round"/>
                        {days.map((d,i) => (
                          <circle key={i} cx={x(i)} cy={y(d.Z_score)} r={d.day===viewDay?3:1.5}
                            fill={d.day===viewDay?'#6b21c8':'#b39ddb'} stroke="#fff" strokeWidth="1"/>
                        ))}
                        {curDay && (<>
                          <text x={x(days.indexOf(curDay))} y={y(curDay.Z_score)-5} fontSize="7" fill="#6b21c8" textAnchor="middle" fontWeight="bold">{curDay.Z_score}</text>
                          <text x={x(days.indexOf(curDay))} y={H-2} fontSize="6" fill="#999" textAnchor="middle">{curDay.day}д</text>
                        </>)}
                      </>);
                    })()}
                  </svg>
                </div>
                <div className="z-summary">
                  <span className="z-summary-label">Текущий Z</span>
                  <span className="z-summary-value">{zFactors.Z}</span>
                </div>
                <div className="z-desc">
                  Z пересчитывается автоматически при отметке заданий, заполнении дневника и изменении калорий. Диапазон: 0–100. Чем выше, тем эффективнее план.
                </div>
                <button className="z-close" onClick={() => setShowZFormula(false)}>
                  Закрыть
                </button>
              </div>
            </div>
          )}
          {viewPrompt && (
              <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',zIndex:130,display:'flex',alignItems:'center',justifyContent:'center',padding:12}} onClick={() => setViewPrompt(null)}>
              <div style={{background:'#fff',borderRadius:12,padding:16,width:'100%',maxWidth:340,maxHeight:'88%',overflow:'auto',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
                <div style={{fontSize:14,fontWeight:600,color:'#311b92',marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Prompt → Ответ
                </div>
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#7b1fa2',marginBottom:4}}>ЗАПРОС (messages[])</div>
                  {viewPrompt.prompt?.map((m, i) => (
                    <div key={i} style={{marginBottom:6,fontSize:11,lineHeight:1.4}}>
                      <span style={{fontWeight:600,color:m.role==='system'?'#e53935':m.role==='user'?'#1976d2':'#2e7d32'}}>{m.role}</span>
                      <span style={{color:'#666'}}>: {m.content.length > 250 ? m.content.slice(0,250)+'…' : m.content}</span>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:'1px solid #e0e0e0',paddingTop:8}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#2e7d32',marginBottom:4}}>ОТВЕТ</div>
                  <div style={{fontSize:12,lineHeight:1.5,color:'#333',background:'#f5f5f5',padding:8,borderRadius:8,whiteSpace:'pre-wrap'}}>{viewPrompt.text}</div>
                </div>
                <button onClick={() => setViewPrompt(null)}
                  style={{width:'100%',padding:'6px 0',border:'none',borderRadius:8,background:'#f5f5f5',fontSize:12,color:'#666',cursor:'pointer',marginTop:10}}>
                  Закрыть
                </button>
              </div>
            </div>
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
