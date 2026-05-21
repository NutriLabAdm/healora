import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const PlanView = ({
  profile,
  profileId,
  plans,
  fallbackProfiles,
  planTemplateId,
  planDoctorNote,
  planStatus,
  timelineInterventions,
  interventionCatalog,
  planTemplates,
  getTemplateById,
  simulationDay,
  onSetPlanTemplateId,
  onSetPlanDoctorNote,
  onSetPlanStatus,
  onRemoveIntervention,
  onCreatePlan,
  onSavePlan,
  onClose,
  compact,
}) => {
  const template = getTemplateById(planTemplateId);
  const uniqueCodes = [...new Set(timelineInterventions.map(i => i.code))];
  const hasPlan = uniqueCodes.length > 0;
  const items = hasPlan
    ? uniqueCodes.map(code => timelineInterventions.find(i => i.code === code))
    : template.interventions;

  const dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const [schedPopup, setSchedPopup] = React.useState(null);
  const [editRow, setEditRow] = React.useState(null);
  const [refineField, setRefineField] = React.useState(null);
  const [refineValue, setRefineValue] = React.useState('');
  const [refinedData, setRefinedData] = React.useState({});
  const [chartParam, setChartParam] = React.useState(null);

  const affectMap = {
    sleep:           { g:'lifestyle', f:'sleep_hours',         unit:'ч',      label:'Сон' },
    systolic_bp:     { g:'vitals',    f:'systolic_bp_mmhg',    unit:'мм рт.ст.', label:'АД сист.' },
    diastolic_bp:    { g:'vitals',    f:'diastolic_bp_mmhg',   unit:'мм рт.ст.', label:'АД диаст.' },
    resting_hr:      { g:'vitals',    f:'resting_hr_bpm',      unit:'уд/мин', label:'Пульс' },
    hrv:             { g:'vitals',    f:'hrv_ms',              unit:'мс',     label:'HRV' },
    weight:          { g:'anthropometrics', f:'weight_kg',     unit:'кг',     label:'Вес' },
    glucose:         { g:'labs',      f:'glucose_mg_dl',       unit:'мг/дл',  label:'Глюкоза' },
    cholesterol:     { g:'labs',      f:'total_cholesterol_mg_dl', unit:'мг/дл', label:'Холестерин' },
    triglycerides:   { g:'labs',      f:'triglycerides_mg_dl', unit:'мг/дл',  label:'Триглицериды' },
    hba1c:           { g:'labs',      f:'hba1c_percent',       unit:'%',      label:'HbA1c' },
    vitamin_d:       { g:'labs',      f:'vitamin_d',           unit:'нг/мл',  label:'Витамин D' },
    crp:             { g:'labs',      f:'crp_mg_l',            unit:'мг/л',   label:'CRP' },
    ferritin:        { g:'labs',      f:'ferritin',            unit:'нг/мл',  label:'Ферритин' },
    tsh:             { g:'labs',      f:'tsh',                 unit:'мкМЕ/мл',label:'ТТГ' },
    stress:          { g:'lifestyle', f:'stress_level_0_10',   unit:'/10',    label:'Стресс' },
    anxiety:         { g:'lifestyle', f:'stress_level_0_10',   unit:'/10',    label:'Тревога' },
    inflammation:    { g:'labs',      f:'crp_mg_l',            unit:'мг/л',   label:'CRP' },
  };

  const fieldGroups = [
    { label: 'Антропометрия', key: 'anthropometrics', fields: [
      { id: 'weight_kg', label: 'Вес', unit: 'кг' },
      { id: 'height_cm', label: 'Рост', unit: 'см' },
      { id: 'waist_cm', label: 'Талия', unit: 'см' },
    ]},
    { label: 'Витальные', key: 'vitals', fields: [
      { id: 'systolic_bp_mmhg', label: 'АД сист.', unit: 'мм рт.ст.' },
      { id: 'diastolic_bp_mmhg', label: 'АД диаст.', unit: 'мм рт.ст.' },
      { id: 'resting_hr_bpm', label: 'Пульс', unit: 'уд/мин' },
      { id: 'hrv_ms', label: 'HRV', unit: 'мс' },
      { id: 'spo2_percent', label: 'SpO₂', unit: '%' },
    ]},
    { label: 'Лабораторные', key: 'labs', fields: [
      { id: 'glucose_mg_dl', label: 'Глюкоза', unit: 'мг/дл' },
      { id: 'total_cholesterol_mg_dl', label: 'Холестерин', unit: 'мг/дл' },
      { id: 'hdl_mg_dl', label: 'HDL', unit: 'мг/дл' },
      { id: 'ldl_mg_dl', label: 'LDL', unit: 'мг/дл' },
      { id: 'triglycerides_mg_dl', label: 'Триглицериды', unit: 'мг/дл' },
      { id: 'hba1c_percent', label: 'HbA1c', unit: '%' },
      { id: 'vitamin_d', label: 'Витамин D', unit: 'нг/мл' },
    ]},
    { label: 'Образ жизни', key: 'lifestyle', fields: [
      { id: 'sleep_hours', label: 'Сон', unit: 'ч' },
      { id: 'stress_level_0_10', label: 'Стресс', unit: '/10' },
      { id: 'daily_steps', label: 'Шаги', unit: 'шагов' },
      { id: 'water_l_day', label: 'Вода', unit: 'л' },
    ]},
  ];

  const tipsMap = {
    SL_BED: 'Ложитесь в одно и то же время, проветрите комнату, уберите телефон за час до сна.',
    SL_DUR: 'Спите 7–9 часов. Просыпайтесь без будильника — признак достаточной продолжительности.',
    SL_QLT: 'Темнота, тишина, прохлада (18–20°C). Если просыпаетесь — не смотрите на часы.',
    SL_HYG: 'Ритуал отхода: тёплый душ, чтение, дыхание 4-7-8. Никаких экранов за 30 мин.',
    PH_HIIT: '20 мин 3 раза/нед. Контроль пульса: 80–95% от макс. Разминка обязательна.',
    PH_STR: '2–3 раза/нед, 8–12 повторений. Отдых между подходами 60–90 сек.',
    PH_AER: '150 мин/нед умеренной или 75 мин высокой интенсивности. Разбивайте на 30 мин/день.',
    PH_FLEX: 'Растяжка после тренировки, йога 2–3 раза/нед. Без резких движений.',
    PH_Z2: 'Зона 2: 60–70% от макс ЧСС. Должно быть легко говорить. Начинайте с 20 мин.',
    MN_MDT: 'Начните с 5 мин/день. Используйте приложения или таймер. Главное — регулярность.',
    MN_BRTH: 'Техника 4-7-8: вдох 4 сек, задержка 7, выдох 8. При стрессе — 3 цикла.',
    MN_STR: 'Записывайте 3 повода для благодарности ежедневно. Планируйте дела заранее.',
    MN_DTOX: 'Час без экрана перед сном. Уведомления — только от близких. Цифровой шаббат 1 день/нед.',
    FD_WATER: 'Стакан воды сразу после пробуждения. Пейте каждые 1.5–2 ч. Травяной чай без сахара.',
    FD_ELEC: 'Добавьте щепотку соли в воду при тренировках. Банан или авокадо — источник калия.',
    FD_CAL: 'Дефицит 300–500 ккал/день. Не голодайте — распределите на 3–4 приёма.',
    FD_CRB: 'Замените быстрые углеводы на медленные: цельнозерновые, бобовые, овощи.',
    FD_SUG: 'Исключите сладкие напитки. Замените сахар на стевию или ягоды.',
    FD_IF: 'Окно питания 8–10 ч. Последний приём за 3 ч до сна. Вода в «голодные» часы.',
    FD_EAT: 'Не пропускайте завтрак. Ешьте каждые 3–4 ч. Ужин не позднее 19:00–20:00.',
    FD_FIB: '30 г клетчатки/день: овощи, фрукты, цельнозерновые, бобовые, орехи.',
    FD_CAF: 'Не более 2 чашек кофе в день, последняя — до 14:00. Замените на цикорий или маття.',
    FD_ANTI: 'Овощи 5 порций/день, жирная рыба 2/нед, оливковое масло, куркума, имбирь.',
    SP_D3: '2000–5000 МЕ/день, с жирной пищей для усвоения. Контроль крови раз в 3 мес.',
    SP_MG: '300–400 мг магния цитрата или глицината вечером. При дефиците — до 600 мг.',
    SP_O3: '1–2 г Омега-3/день (EPA+DHA). Выбирайте концентрат с IFOS-сертификатом.',
    SP_BC: 'Принимайте утром после еды. В-12 отдельно от высоких доз С.',
    SP_ADP: 'Родиола или ашваганда курсами 4–6 нед. Перерыв 2 нед. Контроль АД.',
    BIO_BP: 'Измеряйте утром и вечером после 5 мин покоя. Ведите дневник. Цель: <130/80.',
    DG_CARD: 'Повторная консультация через 3 мес после коррекции терапии. ЭКГ раз в год.',
    DG_CHK: 'Чекап раз в год: биохимия, гормоны, УЗИ органов. После 40 — гастроскопия.',
    FD_TIM: 'Завтрак в течение 1 ч после пробуждения. Интервалы между едой не более 4 ч.',
    FD_VOL: 'Тарелка: ½ овощи, ¼ белок, ¼ углеводы. Используйте маленькие тарелки. Оценивайте насыщение по шкале 0–10. Ешьте медленно.',
    PH_HRV: 'Измеряйте HRV утром лёжа. Тренд важнее абсолютных значений. Снижение ± сигнал.',
    M_CAR01: 'Принимайте ежедневно в одно время. Не пропускайте. Контроль АД 2 р/день.',
    M_CAR02: 'Принимайте вечером. Контроль липидограммы через 3 мес. Избегайте грейпфрута.',
    M_CAR03: 'Носите 24–48 ч. Ведите дневник симптомов. Избегайте воды.',
    M_END01: 'Подготовьте список вопросов и анализов за последние 3 мес.',
    M_END02: 'Коррекция дозы только под контролем врача. Контроль глюкозы ежедневно.',
    M_END03: 'Принимайте утром натощак за 30 мин до еды. Не совмещайте с кальцием/железом.',
    M_GAS01: 'Запишите жалобы. Приносите список лекарств. Диетический дневник за 3 дня.',
    M_GAS02: 'Гастроскопия натощак. За 2 дня — без острого, жирного, алкоголя.',
    M_GAS03: 'Колоноскопия: за 3 дня — без клетчатки. Слабительное по схеме.',
    M_LAB01: 'Строго натощак, 10–12 ч голода. За сутки — без алкоголя и физнагрузок.',
    M_LAB02: 'Сдавайте утром. Женщинам — на 3–5 день цикла. Отмена биотина за 3 дня.',
    M_LAB03: 'Не ешьте жирного за 24 ч. Капсулы с Омега-3 отмените за 3 дня.',
    M_NEU01: 'Подготовьте дневник головной боли или симптомов. Приносите снимки МРТ/КТ.',
    M_NEU02: 'Противопоказания: металл, кардиостимулятор, клаустрофобия. За 4 ч без еды.',
    SP_NTRP: 'Циклами 2–3 мес, перерыв 1 мес. Не сочетайте более 3 компонентов.',
    FD_WTR: 'Объём ввода не менее 30 мл/кг. При активности — +500 мл/ч тренировки.',
    ED_MA: 'Ешьте без телефона/ТВ. Жуйте медленно, ощущайте вкус текстуру. Остановитесь когда насытились на 7/10.',
    ED_SCH: 'Завтрак, обед, ужин — без пропусков. Перекус через 2–3 ч после основного приёма. Не голодайте!',
    ED_EMO: 'При позыве «заесть» — пауза 5 мин. Запишите эмоцию. Выберите альтернативу: прогулка, дыхание, чай.',
    ED_BODY: 'Ежедневно записывайте 1 качество тела, за которое благодарны. Не сравнивайте с другими.',
    ED_SUP: 'Делитесь успехами и трудностями. Помните: срыв — не провал, а опыт для анализа и роста.',
  };

  const bmi = profile?.anthropometrics?.bmi;
  const stress = profile?.lifestyle?.stress_level_0_10;
  const lowWater = profile?.lifestyle?.water_l_day < 1.0;
  const extremeDiet = profile?.lifestyle?.diet === 'голодание' || profile?.lifestyle?.diet === 'очень строгая';
  const savedRpp = profile?.lifestyle?.rpp;
  const hasSavedRppTypes = savedRpp?.types && savedRpp.types.length > 0;
  const rppIndicated = hasSavedRppTypes || ((bmi && (bmi < 18.5 || bmi > 30)) && stress >= 7);
  const rppMild = (bmi && (bmi < 19 || bmi > 28)) || stress >= 6 || lowWater || extremeDiet || hasSavedRppTypes;
  const hasEdInterventions = items.some(it => it.code?.startsWith('ED_'));

  return (
    <div className="plan-popup plan-prescription" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="plan-popup-header" style={{ flexShrink: 0 }}>
        <div className="plan-popup-header-left">
          <div className="plan-popup-badge">🏥 НАЗНАЧЕНИЕ HEALORA</div>
        </div>
        <div className="plan-popup-header-actions">
          {!compact && (
            <select className="plan-template-select" value={planTemplateId} onChange={e => onSetPlanTemplateId?.(e.target.value)}>
              {planTemplates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          )}
          {!compact && (
            <button className="daw-btn" onClick={() => window.print()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Скачать PDF
            </button>
          )}
          {onClose && (
            <button className="plan-popup-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
      </div>
      <div className="plan-popup-body" style={{ flex: 1, overflow: 'auto' }}>
        <div className="plan-doctor-block">
          <div className="plan-doctor-info">
            <div className="plan-info-row"><span className="plan-info-label">Пациент:</span><span className="plan-info-value">{profile?.name || profileId || '—'}</span></div>
            <div className="plan-info-row"><span className="plan-info-label">Ассистент:</span><span className="plan-info-value">{template.doctor}</span></div>
            <div className="plan-info-row"><span className="plan-info-label">Дата:</span><span className="plan-info-value">{new Date().toLocaleDateString('ru-RU')}</span></div>
            <div className="plan-info-row"><span className="plan-info-label">Срок:</span><span className="plan-info-value">30 дней{(simulationDay ?? 0) > 0 ? <span style={{fontSize:9,color:'#888',marginLeft:4}}> (пройдено {Math.min(simulationDay ?? 0, 30)}/{30})</span> : ''}</span>
              {(simulationDay ?? 0) > 0 && <div style={{flex:'1 1 100%',height:3,background:'#eee',borderRadius:2,marginTop:2,overflow:'hidden'}}>
                <div style={{width:`${Math.min((simulationDay ?? 0) / 30 * 100, 100)}%`,height:'100%',background:'#613CF5',borderRadius:2,transition:'width 0.3s'}}/>
              </div>}
            </div>
          </div>
        </div>

        <div style={{padding:'10px 14px',background:'linear-gradient(135deg,#f5f0ff,#fafafa)',borderBottom:'1px solid #e0d8ff'}}>
          <div style={{fontSize:10,fontWeight:600,color:'#613CF5',marginBottom:6}}>Целевые параметры программы</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {(() => {
              const trackedSet = new Set();
              items.forEach(it => {
                const c = interventionCatalog?.[it.code];
                (c?.affects||[]).forEach(a => { if (affectMap[a]) trackedSet.add(a); });
              });
              const tracked = ['weight','bmi','sleep','stress','glucose','systolic_bp','diastolic_bp','cholesterol','hba1c','vitamin_d'].filter(k => trackedSet.has(k));
              return tracked.length === 0 ? [
                { key:'weight', label:'Вес', start:profile?.anthropometrics?.weight_kg, current:profile?.anthropometrics?.weight_kg, target:null, unit:'кг', field:'weight_kg', group:'anthropometrics' },
                { key:'bmi', label:'ИМТ', start:profile?.anthropometrics?.bmi, current:profile?.anthropometrics?.bmi, target:null, unit:'', field:'bmi', group:'anthropometrics' },
              ] : tracked.map(k => {
                const m = affectMap[k];
                const val = m ? (refinedData[m.g+'.'+m.f] ?? profile?.[m.g]?.[m.f]) : null;
                const target = val ? (k === 'weight' || k === 'bmi' ? +(val * (k==='bmi'?0.95:0.97)).toFixed(1) : null) : null;
                return { key:k, label:m?.label||k, start:profile?.[m.g]?.[m.f], current:val, target, unit:m?.unit||'', field:m?.f, group:m?.g };
              });
            })().map(p => (
              <div key={p.key} style={{display:'flex',flexDirection:'column',gap:2,background:'#fff',border:'1px solid #e0d8ff',borderRadius:8,padding:'6px 10px',cursor:'pointer',minWidth:120,transition:'0.15s'}}
                onClick={() => setChartParam(chartParam === p.key ? null : p.key)}>
                <div style={{fontSize:9,color:'#888'}}>{p.label}</div>
                <div style={{display:'flex',gap:8,fontSize:10}}>
                  {p.start != null && <span style={{color:'#999'}}>С: <strong>{p.start}</strong></span>}
                  {p.current != null && <span style={{color:'#613CF5'}}>Т: <strong>{p.current}</strong></span>}
                  {p.target != null && <span style={{color:'#4caf50'}}>Ц: <strong>{p.target}</strong></span>}
                  {p.unit && <span style={{color:'#bbb',fontSize:9}}>{p.unit}</span>}
                </div>
                {chartParam === p.key && (
                  <div style={{marginTop:4,borderTop:'1px solid #eee',paddingTop:4}}>
                    <svg viewBox="0 0 200 40" width="100%" height="40">
                      <line x1="10" y1="35" x2="190" y2="35" stroke="#ddd" strokeWidth="1"/>
                      {p.start != null && <circle cx="20" cy="5" r="3" fill="#999"/>}
                      {p.start != null && <text x="20" y="18" textAnchor="middle" fontSize="7" fill="#999">{p.start}</text>}
                      {p.current != null && <circle cx="100" cy="20" r="3" fill="#613CF5"/>}
                      {p.current != null && <text x="100" y="10" textAnchor="middle" fontSize="7" fill="#613CF5">{p.current}</text>}
                      {p.target != null && <circle cx="180" cy="28" r="3" fill="#4caf50"/>}
                      {p.target != null && <text x="180" y="18" textAnchor="middle" fontSize="7" fill="#4caf50">{p.target}</text>}
                      {p.start != null && p.current != null && <line x1="20" y1="5" x2="100" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="3,2"/>}
                      {p.current != null && p.target != null && <line x1="100" y1="20" x2="180" y2="28" stroke="#4caf50" strokeWidth="1" strokeDasharray="3,2"/>}
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="plan-summary-block">
          <h4 className="plan-section-title">Заключение</h4>
          <p className="plan-summary-text">{template.summary}</p>
          <div className="plan-highlight">
            <div style={{fontSize:11,fontWeight:600,color:'#613CF5',marginBottom:6}}>📋 Данные для более точных рекомендаций</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {(() => {
                const neededFields = new Set();
                items.forEach(it => {
                  const c = interventionCatalog?.[it.code];
                  (c?.affects||[]).forEach(a => {
                    const m = affectMap[a];
                    if (m) neededFields.add(m.g+'.'+m.f);
                  });
                });
                return fieldGroups.map(g => g.fields.filter(f => {
                  const profVal = profile?.[g.key]?.[f.id];
                  const isEmpty = profVal === null || profVal === undefined || profVal === '' || profVal === '—';
                  return neededFields.has(g.key+'.'+f.id) || (isEmpty && ['weight_kg','height_cm','waist_cm','systolic_bp_mmhg','diastolic_bp_mmhg','resting_hr_bpm','glucose_mg_dl','total_cholesterol_mg_dl','hdl_mg_dl','ldl_mg_dl','triglycerides_mg_dl','hba1c_percent','vitamin_d','sleep_hours','stress_level_0_10','daily_steps','water_l_day'].includes(f.id));
                }).map(f => {
                  const val = profile?.[g.key]?.[f.id];
                  const cur = refinedData[g.key+'.'+f.id] ?? val;
                  const editing = refineField === g.key+'.'+f.id;
                  return (
                    <span key={g.key+'.'+f.id} style={{display:'inline-flex',alignItems:'center',gap:3,background:editing?'#f0edff':'#f5f5ff',border:'1px solid '+(editing?'#613CF5':'#e0d8ff'),borderRadius:6,padding:'2px 6px',fontSize:10,cursor:'pointer',transition:'0.15s'}}
                      onClick={() => { if(!editing){ setRefineField(g.key+'.'+f.id); setRefineValue(cur??''); } }}>
                      <span style={{color:'#666'}}>{f.label}:</span>
                      {editing ? (
                        <input autoFocus size={4} value={refineValue} onChange={e => setRefineValue(e.target.value)}
                          onBlur={() => { setRefinedData(p=>({...p,[g.key+'.'+f.id]:refineValue})); setRefineField(null); }}
                          onKeyDown={e => { if(e.key==='Enter'){ setRefinedData(p=>({...p,[g.key+'.'+f.id]:refineValue})); setRefineField(null); } }}
                          style={{width:40,border:'1px solid #613CF5',borderRadius:3,padding:'1px 3px',fontSize:10,outline:'none'}} />
                      ) : (
                        <><strong>{cur ?? '—'}</strong>{f.unit && <span style={{color:'#999'}}>{f.unit}</span>}</>
                      )}
                      {!editing && <svg viewBox="0 0 24 24" fill="none" stroke="#613CF5" strokeWidth="2" width="8" height="8"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>}
                    </span>
                  );
                }));
              })()}
            </div>
          </div>
        </div>

        {(rppIndicated || hasEdInterventions) && (
          <div style={{background:'linear-gradient(135deg,#fce4ec,#fff5f5)',border:'1px solid #f8bbd0',borderRadius:8,padding:'8px 10px',marginBottom:10}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
              <span style={{fontSize:14}}>⚠️</span>
              <strong style={{color:'#c62828',fontSize:11}}>Рекомендации по коррекции РПП</strong>
              {hasSavedRppTypes && <span style={{fontSize:9,color:'#ad1457',marginLeft:'auto'}}>{savedRpp.types.join(', ')}</span>}
            </div>
            {hasSavedRppTypes && savedRpp.frequency && (
              <div style={{fontSize:9,color:'#888',marginBottom:4,paddingLeft:18}}>
                Частота: {savedRpp.frequency}{savedRpp.triggers ? ` · Триггеры: ${savedRpp.triggers}` : ''}
              </div>
            )}
            <ul style={{margin:0,paddingLeft:18,fontSize:10,color:'#555',lineHeight:1.6}}>
              {hasSavedRppTypes ? (
                <>
                  <li>На основании ваших данных подобраны интервенции для коррекции пищевого поведения</li>
                  <li>Регулярно отмечайте состояние в дневнике для отслеживания динамики</li>
                </>
              ) : (
                <>
                  <li>Проконсультируйтесь с психотерапевтом, специализирующимся на расстройствах пищевого поведения</li>
                  <li>Ведите дневник питания с отметкой эмоционального состояния перед каждым приёмом пищи</li>
                </>
              )}
              <li>Не пропускайте приёмы пищи — регулярность важнее объёма</li>
              <li>Исключите «запрещённые» продукты: все продукты разрешены в адекватных количествах</li>
              <li>Практикуйте осознанное питание: ешьте без отвлечений, медленно, прислушиваясь к сигналам тела</li>
              {bmi < 18.5 && <li><strong>Недостаточная масса тела (ИМТ {bmi})</strong> — приоритет: набор веса под контролем диетолога</li>}
              {bmi > 30 && <li><strong>Избыточная масса тела (ИМТ {bmi})</strong> — снижение веса только после стабилизации пищевого поведения</li>}
              {stress >= 7 && <li><strong>Высокий уровень стресса ({stress}/10)</strong> — техники релаксации перед едой обязательны</li>}
            </ul>
            <div style={{marginTop:4}}>
              <button style={{background:'#c62828',border:'none',borderRadius:6,color:'#fff',fontSize:10,padding:'3px 10px',cursor:'pointer'}}
                onClick={() => onSetPlanTemplateId?.('rpp')}>
                Открыть протокол «Коррекция РПП»
              </button>
            </div>
          </div>
        )}

        <div className="plan-interventions-section">
          <h4 className="plan-section-title">План назначений</h4>
          {items.length === 0 ? (
            <div className="plan-empty-guide">
              <div className="plan-empty-wishes">
                <p>🌟 Ваш путь к здоровью начинается здесь!</p>
                <p>HEALORA поможет вам выработать полезные привычки, улучшить сон, питание и физическую активность.</p>
              </div>
              <div className="plan-empty-steps">
                <h4>Как начать:</h4>
                <ol>
                  <li><strong>Оцените здоровье</strong> — нажмите кнопку «Оценить здоровье» в панели профиля.</li>
                  <li><strong>Выберите цели</strong> — отметьте атрибуты, которые хотите улучшить.</li>
                  <li><strong>Назначьте интервенции</strong> — перетащите протоколы из каталога на таймлайн.</li>
                  <li><strong>Следуйте плану</strong> — отмечайте выполненные интервенции в чате.</li>
                </ol>
              </div>
              <button className="plan-create-btn" onClick={() => { onCreatePlan?.(); onSetPlanStatus?.('active'); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                Создать план
              </button>
            </div>
          ) : (
            <table className="plan-table plan-table-prescription">
              <thead><tr><th>№</th><th className="plan-col-per">Пер</th><th className="plan-col-interv">Интервенция</th>{!compact && <th>Код</th>}<th>Интервал</th><th style={{width:28}}></th></tr></thead>
              <tbody>
                {items.map((item, i) => {
                  const sched = item.schedule || (interventionCatalog?.[item.code] && interventionCatalog[item.code].schedule);
                  const schedStr = sched ? (sched.days.map(d => dayNames[d]).join(',') + (sched.time ? ' ' + sched.time : '')) : '';
                  const show = schedPopup === i;
                  const expanded = editRow === i;
                  const cat = interventionCatalog?.[item.code];
                  const affect = (cat?.affects||[]).find(a => affectMap[a]);
                  const am = affect ? affectMap[affect] : null;
                  const raw = am ? (refinedData[am.g+'.'+am.f] ?? profile?.[am.g]?.[am.f]) : null;
                  const num = parseFloat(raw);
                  const hash = [...(item.code||'')].reduce((a,c)=>a+c.charCodeAt(0),0);
                  const spreadPct = 0.05 + (hash % 20) / 100;
                  // fallback defaults when profile value or catalog missing
                  const defVals = { sleep:7.5, systolic_bp:120, diastolic_bp:80, resting_hr:70, hrv:50, weight:70, glucose:95, cholesterol:200, triglycerides:150, hba1c:5.5, vitamin_d:30, crp:1.5, ferritin:80, tsh:2.5, stress:5, inflammation:1.5 };
                  const fallbackVal = affect ? defVals[affect] : null;
                  // for codes not in catalog, use generic interval 0–100%
                  const genericNum = fallbackVal != null ? null : (40 + hash % 50);
                  const genericUnit = fallbackVal != null ? null : '%';
                  const effectiveNum = genericNum != null ? genericNum : (!isNaN(num) ? num : fallbackVal);
                  const unitLo = effectiveNum != null ? (effectiveNum * (1 - spreadPct)).toFixed(effectiveNum<10?1:0) : null;
                  const unitHi = effectiveNum != null ? (effectiveNum * (1 + spreadPct)).toFixed(effectiveNum<10?1:0) : null;
                  return (
                    <React.Fragment key={item.code || i}>
                      <tr>
                        <td className="plan-num">{i + 1}</td>
                        <td className="plan-reg" style={{cursor:'pointer', position:'relative'}} onClick={() => setSchedPopup(show ? null : i)}>
                          {item.regularity === 'D' ? 'Д' : item.regularity === 'W' ? 'Н' : item.regularity === 'M' ? 'М' : item.regularity === 'Y' ? 'Г' : item.regularity || 'Д'}
                          {show && (
                            <span style={{position:'absolute', bottom:'calc(100% + 4px)', left:'50%', transform:'translateX(-50%)', background:'#333', color:'#fff', padding:'3px 8px', borderRadius:4, fontSize:10, whiteSpace:'nowrap', zIndex:10}}>
                              {schedStr || '—'}
                            </span>
                          )}
                        </td>
                        <td className="plan-col-interv" onClick={() => setEditRow(expanded ? null : i)} style={{cursor:'pointer'}}>{item.name}</td>
                        {!compact && <td className="plan-code">{item.code}</td>}
                        <td style={{fontSize:10,color:'#666',textAlign:'center',whiteSpace:'nowrap'}}>
                          {unitLo !== null ? `${unitLo}–${unitHi} ${am?.unit||genericUnit||''}` : '—'}
                          {unitLo !== null && <>
                            <div style={{width:40,height:3,background:'#eee',borderRadius:2,margin:'2px auto 0',position:'relative',overflow:'hidden'}}>
                              <div style={{position:'absolute',top:0,left:0,height:'100%',width:((1-spreadPct)*100)+'%',background:spreadPct>0.15?'#ff9800':spreadPct>0.08?'#ffc107':'#4caf50',borderRadius:2}}/>
                            </div>
                            <div style={{fontSize:8,color:'#888',marginTop:1}}>{Math.round((simulationDay??0)/30*100)}% плана</div>
                          </>}
                        </td>
                        <td style={{textAlign:'center'}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke={expanded?'#613CF5':'#999'} strokeWidth="2" width="14" height="14" style={{cursor:'pointer'}}
                            onClick={() => setEditRow(expanded ? null : i)}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </td>
                      </tr>
                      {expanded && (
                        <tr>
                          <td colSpan={!compact ? 6 : 5} style={{padding:'8px 12px',background:'#fafaff',borderBottom:'1px solid #e0d8ff'}}>
                            <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:11}}>
                              {cat?.full_description && <div style={{flex:'1 1 200px'}}><strong style={{color:'#613CF5'}}>Описание:</strong><p style={{margin:'2px 0',color:'#444',lineHeight:1.4}}>{cat.full_description}</p></div>}
                              {cat?.benefits?.length > 0 && <div style={{flex:'1 1 200px'}}><strong style={{color:'#613CF5'}}>Эффект:</strong><ul style={{margin:'2px 0',paddingLeft:14,color:'#444',lineHeight:1.4}}>{cat.benefits.map((b,j) => <li key={j} style={{listStyle:'disc'}}>{b}</li>)}</ul></div>}
                              {tipsMap[item.code] && <div style={{flex:'1 1 200px'}}><strong style={{color:'#613CF5'}}>💡 Совет:</strong><p style={{margin:'2px 0',color:'#444',lineHeight:1.4}}>{tipsMap[item.code]}</p></div>}
                              {!cat && <div style={{color:'#999'}}>Нет дополнительных данных</div>}
                              <div style={{display:'flex',gap:6,alignItems:'flex-end',marginLeft:'auto'}}>
                                <button style={{background:'none',border:'1px solid #613CF5',borderRadius:4,color:'#613CF5',fontSize:10,padding:'2px 8px',cursor:'pointer'}}
                                  onClick={() => onRemoveIntervention?.(item.code)}>✕ Убрать</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {hasPlan && (
          <div className="plan-doctor-note-block">
            <h4 className="plan-section-title">Рекомендации врача / нутрициолога</h4>
            <textarea className="plan-doctor-note" placeholder="Добавьте рекомендации, пояснения к назначениям, режим приёма, особые указания..."
              value={planDoctorNote} onChange={e => onSetPlanDoctorNote?.(e.target.value)} rows={3} />
          </div>
        )}

        {hasPlan && (
          <div className="plan-actions-section">
            <div className="plan-status-info">
              Статус: <span className={`plan-status-tag plan-status-${planStatus}`}>
                {planStatus === 'active' ? 'Активен' : planStatus === 'stopped' ? 'Остановлен' : 'Архивирован'}
              </span>
            </div>
            <div className="plan-action-buttons">
              <button className="btn-plan-action btn-plan-save" onClick={() => onSavePlan?.()}>💾 Сохранить</button>
              <button className="btn-plan-action btn-plan-stop" onClick={() => onSetPlanStatus?.(prev => prev === 'stopped' ? 'active' : 'stopped')}>
                {planStatus === 'stopped' ? '▶ Возобновить' : '⏹ Остановить'}
              </button>
              <button className="btn-plan-action btn-plan-archive" onClick={() => onSetPlanStatus?.('archived')}>📦 Архивировать</button>
            </div>
          </div>
        )}

        <div className="plan-footer-block">
          {!compact ? (
            <>
              <div className="plan-qr-block">
                <QRCodeSVG value={`https://healora.ru/digital-twin/?plan=${template.id}&profile=${profileId || 'anon'}`} size={100} fgColor="#1a1a2e" />
              </div>
              <div className="plan-app-mockup">
                <svg viewBox="0 0 120 220" width="100%" style={{ maxWidth: 90 }}>
                  <rect x="10" y="0" width="100" height="210" rx="18" fill="#1a1a2e" stroke="#333" strokeWidth="1"/>
                  <rect x="14" y="3" width="92" height="18" rx="4" fill="#2d2d5e"/>
                  <text x="55" y="15" textAnchor="middle" fontSize="6" fill="#fff" fontFamily="sans-serif" fontWeight="bold">HEALORA</text>
                  <circle cx="55" cy="40" r="12" fill="#613CF5" opacity="0.3"/>
                  <circle cx="45" cy="36" r="8" fill="#613CF5" opacity="0.5"/>
                  <circle cx="65" cy="36" r="8" fill="#022374" opacity="0.5"/>
                  <circle cx="55" cy="36" r="2.5" fill="#fff"/>
                  <text x="55" y="70" textAnchor="middle" fontSize="4" fill="#aaa" fontFamily="sans-serif">Цифровой двойник</text>
                  <rect x="20" y="80" width="80" height="4" rx="2" fill="#FEAAE6"/>
                  <rect x="20" y="80" width="50" height="4" rx="2" fill="#613CF5"/>
                  <text x="55" y="95" textAnchor="middle" fontSize="4" fill="#666" fontFamily="sans-serif">25/30 · 15/45</text>
                  <rect x="20" y="105" width="80" height="12" rx="4" fill="#2d2d5e"/>
                  <text x="24" y="113" fontSize="3.5" fill="#fff" fontFamily="sans-serif">Сон: время отхода</text>
                  <text x="85" y="113" fontSize="3.5" fill="#4caf50" fontFamily="sans-serif">✓</text>
                  <rect x="20" y="120" width="80" height="12" rx="4" fill="#2d2d5e"/>
                  <text x="24" y="128" fontSize="3.5" fill="#fff" fontFamily="sans-serif">Прогулка 30 мин</text>
                  <rect x="84" y="122" width="14" height="8" rx="2" fill="#333"/>
                  <circle cx="62" cy="155" r="16" fill="none" stroke="#FEAAE6" strokeWidth="2"/>
                  <circle cx="62" cy="155" r="16" fill="none" stroke="#613CF5" strokeWidth="2" strokeDasharray="50 50" strokeDashoffset="0" transform="rotate(-90 62 155)"/>
                  <text x="62" y="159" textAnchor="middle" fontSize="5" fill="#fff" fontFamily="sans-serif">32</text>
                  <rect x="35" y="190" width="55" height="8" rx="4" fill="#FEAAE6"/>
                  <text x="62" y="196" textAnchor="middle" fontSize="3.5" fill="#1a1a2e" fontFamily="sans-serif">Напишите сообщение...</text>
                </svg>
              </div>
              <div className="plan-app-caption">Установите HEALORA для повышения эффективности выполнения рекомендаций</div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlanView;
