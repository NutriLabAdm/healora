import React, { useState } from 'react';

const sectionMeta = {
  demographics: { title: 'Демография', color: '#6b21c8', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' },
  vitals: { title: 'Витальные', color: '#1976d2', icon: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z' },
  labs: { title: 'Лаборатории', color: '#0288d1', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
  lifestyle: { title: 'Образ жизни', color: '#388e3c', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  genetics: { title: 'Генетика', color: '#7b1fa2', icon: 'M19.5 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H4.5C3.67 2 3 2.67 3 3.5v18c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-18c0-.83-.67-1.5-1.5-1.5zm-7.5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3 11.5l2-2 2 2 4-4 1.5 1.5-5.5 5.5-3.5-3.5-2 2-2-2-2 2-1.5-1.5 3.5-3.5z' },
  medical: { title: 'Медицина', color: '#c62828', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z' },
};

const riskColor = (v) => {
  if (v === undefined || v === null) return '#999';
  if (v === 'low') return '#4caf50';
  if (v === 'high') return '#e53935';
  return '#ff9800';
};

const formatVal = (v) => {
  if (v === null || v === undefined || v === '') return '—';
  if (typeof v === 'boolean') return v ? 'Да' : 'Нет';
  return v;
};

const ProfileView = ({ profile, compact = false }) => {
  const [activeSection, setActiveSection] = useState('overview');

  if (!profile) return null;

  const s = profile.digital_twin_scores || {};
  const riskLevelText = s.risk_level === 'low' ? 'Низкий риск' : s.risk_level === 'high' ? 'Высокий риск' : 'Средний риск';

  const catalog = {
    demographics: {
      title: '01 Демография', color: '#6b21c8',
      attributes: [
        { id:'age', name:'Возраст', current:profile?.demographics?.age, target:null, unit:'лет', norm:'18-65' },
        { id:'sex', name:'Пол', current:profile?.demographics?.sex==='male'?'Мужской':'Женский', target:null, unit:'', norm:'-' },
        { id:'height', name:'Рост', current:profile?.anthropometrics?.height_cm, target:null, unit:'см', norm:'150-200' },
        { id:'weight', name:'Вес', current:profile?.anthropometrics?.weight_kg, target:80, unit:'кг', norm:'50-120' },
        { id:'bmi', name:'ИМТ', current:profile?.anthropometrics?.bmi, target:22, unit:'кг/м²', norm:'18.5-25' },
        { id:'waist', name:'Талия', current:profile?.anthropometrics?.waist_cm, target:90, unit:'см', norm:'60-100' },
        { id:'ethnicity', name:'Этническая принадлежность', current:profile?.demographics?.ethnicity_or_background, target:null, unit:'', norm:'-' },
      ]
    },
    vitals: {
      title: '02 Витальные', color: '#1976d2',
      attributes: [
        { id:'bp_syst', name:'АД систолическое', current:profile?.vitals?.systolic_bp_mmhg, target:120, unit:'мм рт.ст.', norm:'90-130' },
        { id:'bp_diast', name:'АД диастолическое', current:profile?.vitals?.diastolic_bp_mmhg, target:80, unit:'мм рт.ст.', norm:'60-85' },
        { id:'hr', name:'ЧСС покоя', current:profile?.vitals?.resting_hr_bpm, target:72, unit:'уд/мин', norm:'60-80' },
        { id:'hrv', name:'HRV', current:profile?.vitals?.hrv_ms, target:60, unit:'мс', norm:'40-100' },
        { id:'spo2', name:'SpO2', current:profile?.vitals?.spo2_percent, target:98, unit:'%', norm:'95-100' },
      ]
    },
    labs: {
      title: '03 Лаборатории', color: '#0288d1',
      attributes: [
        { id:'glucose', name:'Глюкоза', current:profile?.labs?.glucose_mg_dl, target:95, unit:'мг/дл', norm:'70-100' },
        { id:'hba1c', name:'HbA1c', current:profile?.labs?.hba1c_percent, target:5.5, unit:'%', norm:'4.0-5.6' },
        { id:'tchol', name:'Холестерин общий', current:profile?.labs?.total_cholesterol_mg_dl, target:200, unit:'мг/дл', norm:'<200' },
        { id:'hdl', name:'ЛПВП', current:profile?.labs?.hdl_mg_dl, target:50, unit:'мг/дл', norm:'>40' },
        { id:'ldl', name:'ЛПНП', current:profile?.labs?.ldl_mg_dl, target:100, unit:'мг/дл', norm:'<100' },
        { id:'tg', name:'Триглицериды', current:profile?.labs?.triglycerides_mg_dl, target:150, unit:'мг/дл', norm:'<150' },
        { id:'crp', name:'CRP', current:profile?.labs?.crp_mg_l, target:1, unit:'мг/л', norm:'<3' },
        { id:'vitd', name:'Витамин D', current:profile?.labs?.vitamin_d, target:40, unit:'нг/мл', norm:'30-100' },
        { id:'ferritin', name:'Ферритин', current:profile?.labs?.ferritin, target:80, unit:'нг/мл', norm:'20-200' },
        { id:'tsh', name:'ТТГ', current:profile?.labs?.tsh, target:2.5, unit:'мМЕ/л', norm:'0.4-4.0' },
      ]
    },
    lifestyle: {
      title: '04 Образ жизни', color: '#388e3c',
      attributes: [
        { id:'sleep', name:'Сон', current:profile?.lifestyle?.sleep_hours, target:7.5, unit:'ч', norm:'7-9' },
        { id:'stress', name:'Стресс', current:profile?.lifestyle?.stress_level_0_10, target:3, unit:'/10', norm:'<5' },
        { id:'steps', name:'Шаги', current:profile?.lifestyle?.daily_steps, target:8000, unit:'/день', norm:'8000-12000' },
        { id:'water', name:'Вода', current:profile?.lifestyle?.water_l_day, target:2.5, unit:'л/день', norm:'2-3' },
        { id:'smoking', name:'Курение', current:profile?.lifestyle?.smoking, target:null, unit:'', norm:'Нет' },
        { id:'alcohol', name:'Алкоголь', current:profile?.lifestyle?.alcohol, target:null, unit:'', norm:'Редко' },
        { id:'exercise_freq', name:'Тренировки', current:profile?.lifestyle?.physical_activity, target:null, unit:'', norm:'3-5/нед' },
        { id:'exercise_type', name:'Тип активности', current:profile?.lifestyle?.exercise_type, target:null, unit:'', norm:'-' },
        { id:'diet', name:'Питание', current:profile?.lifestyle?.diet, target:null, unit:'', norm:'Сбалансир.' },
        { id:'rpp', name:'РПП', current:profile?.lifestyle?.rpp?.types?.length ? `Есть (${profile.lifestyle.rpp.types.length} типа)` : 'Нет', target:'Нет', unit:'', norm:'Нет' },
      ]
    },
    genetics: {
      title: '05 Генетика', color: '#7b1fa2',
      attributes: [
        { id:'apoe', name:'APOE', current:profile?.genetics?.apoe, target:null, unit:'', norm:'-' },
        { id:'mthfr', name:'MTHFR', current:profile?.genetics?.mthfr, target:null, unit:'', norm:'-' },
        { id:'lactase', name:'Лактаза', current:profile?.genetics?.lactase_persistence, target:null, unit:'', norm:'-' },
        { id:'brca', name:'BRCA', current:profile?.genetics?.brca_status, target:null, unit:'', norm:'-' },
      ]
    },
    medical: {
      title: '06 Медицина', color: '#c62828',
      attributes: [
        { id:'medications', name:'Лекарства', current:profile?.medical_history?.current_medications?.length ? profile.medical_history.current_medications.join(', ') : '—', target:null, unit:'', norm:'-' },
        { id:'allergies', name:'Аллергии', current:profile?.medical_history?.allergies || '—', target:null, unit:'', norm:'Нет' },
        { id:'cvd', name:'CVD', current:profile?.medical_history?.cardiovascular_disease === 'yes' ? 'Да' : profile?.medical_history?.cardiovascular_disease === 'no' ? 'Нет' : '—', target:null, unit:'', norm:'Нет' },
        { id:'diabetes', name:'Диабет', current:profile?.medical_history?.diabetes === 'yes' ? 'Да' : profile?.medical_history?.diabetes === 'no' ? 'Нет' : '—', target:null, unit:'', norm:'Нет' },
        { id:'family_history', name:'Сем. история', current:profile?.medical_history?.family_history || '—', target:null, unit:'', norm:'-' },
      ]
    }
  };

  const overviewStats = [
    { label: 'Звёзд', value: s.current_stars || 0, icon: 'star', color: '#ffb300' },
    { label: 'ИМТ', value: profile?.anthropometrics?.bmi || '—', icon: 'weight', color: (profile?.anthropometrics?.bmi || 0) > 30 ? '#e53935' : (profile?.anthropometrics?.bmi || 0) > 25 ? '#ff9800' : '#4caf50' },
    { label: 'АД Сис.', value: profile?.vitals?.systolic_bp_mmhg || '—', icon: 'heart', color: (profile?.vitals?.systolic_bp_mmhg || 0) > 140 ? '#e53935' : (profile?.vitals?.systolic_bp_mmhg || 0) > 130 ? '#ff9800' : '#4caf50' },
    { label: 'Глюкоза', value: profile?.labs?.glucose_mg_dl || '—', icon: 'blood', color: (profile?.labs?.glucose_mg_dl || 0) > 126 ? '#e53935' : (profile?.labs?.glucose_mg_dl || 0) > 100 ? '#ff9800' : '#4caf50' },
    { label: 'Сон', value: profile?.lifestyle?.sleep_hours || '—', icon: 'sleep', color: '#5c6bc0' },
    { label: 'Риск', value: s.health_risk_score || 0, icon: 'risk', color: riskColor(s.risk_level) },
  ];

  return (
    <div className="pv-container">
      <div className="pv-header">
        <div className="pv-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="#6b21c8" strokeWidth="1.5" width="48" height="48">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <div className="pv-mood" style={{ background: riskColor(s.risk_level) }}></div>
        </div>
        <h2 className="pv-name">{profile.name || '—'}</h2>
        <p className="pv-subtitle">{profile?.demographics?.sex === 'male' ? 'Муж.' : 'Жен.'}, {profile?.demographics?.age || '—'} лет</p>
        <p className="pv-subtitle" style={{ fontSize: 10 }}>Уровень {Math.floor((s.current_stars || 0) / 100)} · {riskLevelText}</p>
      </div>

      <div className="pv-nav">
        <button className={`pv-nav-btn ${activeSection === 'overview' ? 'active' : ''}`} onClick={() => setActiveSection('overview')}>Обзор</button>
        {Object.entries(catalog).map(([key, section]) => {
          const hasData = section.attributes.some(a => a.current !== null && a.current !== undefined && a.current !== '');
          if (!hasData) return null;
          return (
            <button key={key} className={`pv-nav-btn ${activeSection === key ? 'active' : ''}`} onClick={() => setActiveSection(key)}>
              {sectionMeta[key]?.title || key}
            </button>
          );
        })}
      </div>

      <div className="pv-body">
        {activeSection === 'overview' ? (
          <>
            <div className="pv-stats">
              {overviewStats.map((stat, i) => (
                <div key={i} className="pv-stat" style={{ borderTop: `3px solid ${stat.color}` }}>
                  <span className="pv-stat-val" style={{ color: stat.color }}>{formatVal(stat.value)}</span>
                  <span className="pv-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="pv-card">
              <div className="pv-card-title">Healora Score</div>
              <div className="pv-score-bar">
                <div className="pv-score-fill" style={{ width: `${Math.min(100, (s.current_stars || 0) / 10)}%` }}></div>
              </div>
              <div className="pv-score-lbl">{riskLevelText}</div>
            </div>

            {Object.entries(catalog).map(([key, section]) => {
              const hasData = section.attributes.some(a => a.current !== null && a.current !== undefined && a.current !== '');
              if (!hasData) return null;
              const meta = sectionMeta[key];
              return (
                <div key={key} className="pv-card">
                  <div className="pv-card-title" style={{ color: section.color || meta?.color || '#311b92' }}>
                    {section.title}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {section.attributes.map(attr => (
                      <div key={attr.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:4}}>
                        <span style={{fontSize:10,color:'#555',flex:'0 0 auto'}}>{attr.name}{attr.unit ? <span style={{fontSize:8,color:'#999',marginLeft:2}}>{attr.unit}</span> : ''}</span>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <span style={{fontSize:11,fontWeight:600,color:'#311b92'}}>
                            {formatVal(attr.current)}
                          </span>
                          {attr.target != null && (
                            <span style={{fontSize:9,color:'#4caf50',background:'#e8f5e9',padding:'1px 5px',borderRadius:4}}>
                              {attr.target}
                            </span>
                          )}
                          <span style={{fontSize:8,color:'#aaa',background:'#f5f5f5',padding:'1px 4px',borderRadius:3}}>
                            {attr.norm}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="pv-card">
            <div className="pv-card-title" style={{ color: catalog[activeSection]?.color || '#311b92' }}>
              {catalog[activeSection]?.title || activeSection}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {(catalog[activeSection]?.attributes || []).map(attr => (
                <div key={attr.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:4}}>
                  <span style={{fontSize:10,color:'#555',flex:'0 0 auto'}}>{attr.name}{attr.unit ? <span style={{fontSize:8,color:'#999',marginLeft:2}}>{attr.unit}</span> : ''}</span>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{fontSize:11,fontWeight:600,color:'#311b92'}}>
                      {formatVal(attr.current)}
                    </span>
                    {attr.target != null && (
                      <span style={{fontSize:9,color:'#4caf50',background:'#e8f5e9',padding:'1px 5px',borderRadius:4}}>
                        Цель {attr.target}
                      </span>
                    )}
                    <span style={{fontSize:8,color:'#aaa',background:'#f5f5f5',padding:'1px 4px',borderRadius:3}}>
                      {attr.norm}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .pv-container { padding: 12px 16px; height: 100%; overflow-y: auto; background: #fafafa; }
        .pv-header { text-align: center; margin-bottom: 12px; }
        .pv-avatar { position: relative; display: inline-block; margin-bottom: 4px; }
        .pv-mood { width: 12px; height: 12px; border-radius: 50%; position: absolute; bottom: 0; right: 0; border: 2px solid #fff; }
        .pv-name { font-size: 18px; color: #311b92; margin: 2px 0; }
        .pv-subtitle { font-size: 12px; color: #7b1fa2; margin: 0; }
        .pv-nav { display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 8px; flex-wrap: wrap; }
        .pv-nav-btn { padding: 4px 10px; border: 1px solid #d1c4e9; background: #fff; border-radius: 12px; font-size: 10px; color: #7b1fa2; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .pv-nav-btn.active { background: #6b21c8; color: #fff; border-color: #6b21c8; }
        .pv-body { display: flex; flex-direction: column; gap: 8px; }
        .pv-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .pv-stat { background: #fff; border-radius: 10px; padding: 10px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .pv-stat-val { font-size: 16px; font-weight: 700; display: block; }
        .pv-stat-lbl { font-size: 9px; color: #888; margin-top: 2px; display: block; }
        .pv-card { background: #fff; border-radius: 12px; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .pv-card-title { font-size: 13px; font-weight: 600; color: #311b92; margin-bottom: 10px; }
        .pv-score-bar { height: 8px; background: #eee; border-radius: 4px; overflow: hidden; margin: 6px 0; }
        .pv-score-fill { height: 100%; background: linear-gradient(90deg, #ffb300, #ff6f00); border-radius: 4px; transition: width 0.5s; }
        .pv-score-lbl { font-size: 10px; color: #888; text-align: center; }
      `}</style>
    </div>
  );
};

export default ProfileView;
