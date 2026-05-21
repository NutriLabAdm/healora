import React, { useState, useEffect } from 'react';

const rppTypes = [
  { id: 'anorexia', label: 'Анорексия', desc: 'Ограничение питания, страх набора веса' },
  { id: 'bulimia', label: 'Булимия', desc: 'Переедание + компенсация (рвота, слабительные)' },
  { id: 'binge', label: 'Компульсивное переедание', desc: 'Неконтролируемые эпизоды переедания' },
  { id: 'orthorexia', label: 'Орторексия', desc: 'Навязчивое стремление к «правильному» питанию' },
  { id: 'purging', label: 'Приступообразное переедание', desc: 'Эпизоды с чувством потери контроля' },
];

const defaultDiaryData = (day) => ({
  day,
  waterMl: 0,
  mood: { energy: '', mood: '', sleep: '', stress: '', digestion: '' },
  voiceNote: '', audioFile: null, comment: '',
  meals: [
    { type: 'breakfast', label: 'Завтрак', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '08:00', duration: '20' },
    { type: 'lunch', label: 'Обед', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '13:00', duration: '30' },
    { type: 'dinner', label: 'Ужин', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '19:00', duration: '30' },
    { type: 'snack', label: 'Перекус', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '16:00', duration: '10' },
  ],
  rppEnabled: false,
  rppTypes: [],
  rppFrequency: '',
  rppTriggers: '',
  rppNote: '',
});

const DiaryView = ({ profileId, day = 0, onClose }) => {
  const [form, setForm] = useState(defaultDiaryData(day));
  const [loading, setLoading] = useState(false);
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [selectedFoodMealIdx, setSelectedFoodMealIdx] = useState(null);

  useEffect(() => {
    setForm(defaultDiaryData(day));
    if (profileId) {
      fetch(`/api/diary/${profileId}/${day}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setForm(prev => ({ ...prev, ...data, meals: data.meals || prev.meals })); })
        .catch(() => {});
    }
  }, [profileId, day]);

  const updateMeal = (idx, field, val) => {
    setForm(prev => {
      const m = [...prev.meals];
      m[idx] = { ...m[idx], [field]: val };
      return { ...prev, meals: m };
    });
  };

  const handlePhoto = (idx, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => updateMeal(idx, 'photo', r.result);
    r.readAsDataURL(file);
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Голосовой ввод не поддерживается в этом браузере'); return; }
    const sr = new SpeechRecognition();
    sr.lang = 'ru-RU'; sr.interimResults = false;
    sr.onresult = (ev) => {
      const text = ev.results[0][0].transcript;
      setForm(prev => ({ ...prev, voiceNote: text, comment: prev.comment + text }));
      const mealMap = { 'завтрак': 0, 'завтрак:': 0, 'обед': 1, 'обед:': 1, 'ужин': 2, 'ужин:': 2, 'перекус': 3, 'перекус:': 3 };
      Object.entries(mealMap).forEach(([key, idx]) => {
        const re = new RegExp(`${key}\\s*([^.!]+)`, 'i');
        const m = text.match(re);
        if (m) {
          const desc = m[1].trim().replace(/\s+\d+[гмл]?\s*/g, '');
          updateMeal(idx, 'description', form.meals[idx].description + (form.meals[idx].description ? '; ' : '') + desc);
        }
      });
      const wm = text.match(/вод[ыа]?\s*(около|примерно|~)?\s*(\d+(?:[.,]\d+)?)\s*л/i);
      if (wm) setForm(prev => ({ ...prev, waterMl: Math.round(parseFloat(wm[2].replace(',', '.')) * 1000) }));
    };
    sr.onerror = () => alert('Ошибка распознавания речи');
    sr.start();
  };

  const submitDiary = () => {
    setLoading(true);
    const payload = {
      profile_id: profileId,
      day: form.day,
      meals: form.meals.map(m => ({
        type: m.type, photo: m.photo || null, description: m.description,
        time: m.time || null, duration: m.duration ? Number(m.duration) : null,
        calories: m.calories ? Number(m.calories) : null,
        protein: m.protein ? Number(m.protein) : null,
        fat: m.fat ? Number(m.fat) : null,
        carbs: m.carbs ? Number(m.carbs) : null,
        ndi: m.ndi ? Number(m.ndi) : null,
        recommendations: m.recommendations || null,
      })),
      water_ml: form.waterMl,
      mood: form.mood,
      voice_note: form.voiceNote || null,
      audio: null,
      comment: form.comment || null,
      rpp: form.rppEnabled ? {
        types: form.rppTypes,
        frequency: form.rppFrequency || null,
        triggers: form.rppTriggers || null,
        note: form.rppNote || null,
      } : null,
    };
    fetch('/api/diary', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(() => { setLoading(false); if (onClose) onClose(); })
      .catch((err) => { console.warn('Diary submit failed:', err); alert('Ошибка отправки: бэкенд недоступен'); setLoading(false); });
  };

  return (
    <div className="dv-container">
      <div className="dv-header">
        <h3 className="dv-title">Дневник питания — День {day}</h3>
      </div>
      <div className="dv-body">
        {/* Meals */}
        <div className="dv-meals">
          {form.meals.map((meal, idx) => (
            <div key={meal.type} className="dv-meal">
              <div className="dv-meal-header">
                <span className="dv-meal-lbl">{meal.label}</span>
                <span className="dv-meal-time">
                  <input type="time" value={meal.time} onChange={e => updateMeal(idx, 'time', e.target.value)}
                    className="dv-time-input"/>
                  <input type="number" min="1" max="180" value={meal.duration}
                    onChange={e => updateMeal(idx, 'duration', e.target.value)}
                    className="dv-dur-input"/>
                  <span className="dv-dur-unit">мин</span>
                </span>
              </div>
              <div className="dv-meal-body">
                <div className="dv-photo" onClick={() => document.getElementById(`food-upload-${idx}`).click()}>
                  {meal.photo ? (
                    <img src={meal.photo?.startsWith('/images/food/') ? meal.photo.replace('/images/food/', '/images/food/thumbs/') : meal.photo} alt="" className="dv-photo-img" onClick={(e) => { e.stopPropagation(); updateMeal(idx, 'photo', ''); }}/>
                  ) : (
                    <div className="dv-photo-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2" width="18" height="18">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                    </div>
                  )}
                  <input id={`food-upload-${idx}`} type="file" accept="image/*" capture="environment"
                    style={{display:'none'}} onChange={e => {
                      if (e.target.files?.[0]) handlePhoto(idx, e.target.files[0]);
                      e.target.value = '';
                    }} />
                </div>
                <button className="dv-cat-btn" title="Выбрать из каталога" onClick={() => { setSelectedFoodMealIdx(idx); setShowFoodSelector(true); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2" width="12" height="12"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </button>
                <div className="dv-kbzu">
                  <input type="number" placeholder="ккал" value={meal.calories ?? ''} onChange={e => updateMeal(idx, 'calories', e.target.value)} className="dv-input-sm"/>
                  <input type="number" placeholder="белки" value={meal.protein ?? ''} onChange={e => updateMeal(idx, 'protein', e.target.value)} className="dv-input-sm"/>
                  <input type="number" placeholder="жиры" value={meal.fat ?? ''} onChange={e => updateMeal(idx, 'fat', e.target.value)} className="dv-input-sm"/>
                  <input type="number" placeholder="углев." value={meal.carbs ?? ''} onChange={e => updateMeal(idx, 'carbs', e.target.value)} className="dv-input-sm"/>
                </div>
              </div>
              <div className="dv-meal-extras">
                <textarea placeholder="Описание блюда" rows={1} value={meal.description} onChange={e => updateMeal(idx, 'description', e.target.value)} className="dv-textarea"/>
                <button className="dv-mic-btn" onClick={() => {
                  const sr = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                  sr.lang = 'ru-RU'; sr.interimResults = false;
                  sr.onresult = (ev) => updateMeal(idx, 'description', form.meals[idx].description + (form.meals[idx].description ? '; ' : '') + ev.results[0][0].transcript);
                  sr.onerror = () => {}; sr.start();
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Water + Mood */}
        <div className="dv-section">
          <div className="dv-metric">
            <span className="dv-metric-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0288d1" strokeWidth="2" width="16" height="16">
                <path d="M12 2C8 8 6 12 6 16a6 6 0 0 0 12 0c0-4-2-8-6-14z"/>
              </svg>
            </span>
            <span className="dv-metric-lbl">Вода</span>
            <span className="dv-metric-val">{form.waterMl} мл</span>
            <input type="range" min="0" max="3000" step="100" value={form.waterMl}
              onChange={e => setForm(prev => ({ ...prev, waterMl: Number(e.target.value) }))} className="dv-range"/>
          </div>
          <div className="dv-mood">
            {[
              { key: 'energy', label: 'Энергия', color: '#ff9800' },
              { key: 'mood', label: 'Настроение', color: '#e91e63' },
              { key: 'sleep', label: 'Сон', color: '#5c6bc0' },
              { key: 'stress', label: 'Стресс', color: '#ab47bc' },
              { key: 'digestion', label: 'ЖКТ', color: '#66bb6a' },
            ].map(({ key, label, color }) => (
              <div key={key} className="dv-mood-item">
                <span style={{ color, fontSize: 10, fontWeight: 600 }}>{label}</span>
                <div className="dv-mood-btns">
                  {['green', 'yellow', 'red'].map(level => (
                    <button key={level}
                      className={`dv-mood-btn ${form.mood[key] === level ? 'active-' + level : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, mood: { ...prev.mood, [key]: level } }))}
                      style={{ background: form.mood[key] === level ? (level === 'green' ? '#4caf50' : level === 'yellow' ? '#ff9800' : '#e53935') : '#eee' }}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* РПП */}
        <div className="dv-section" style={{border:'1px solid '+(form.rppEnabled?'#e91e63':'#e0e0e0'),borderRadius:8}}>
          <div style={{display:'flex',alignItems:'center',gap:6,padding:'4px 0',cursor:'pointer'}} onClick={() => setForm(p=>({...p,rppEnabled:!p.rppEnabled}))}>
            <div style={{width:14,height:14,borderRadius:3,border:'2px solid '+(form.rppEnabled?'#e91e63':'#bbb'),background:form.rppEnabled?'#e91e63':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:10,fontWeight:'bold'}}>{form.rppEnabled?'✓':''}</div>
            <span style={{fontSize:11,fontWeight:600,color:form.rppEnabled?'#e91e63':'#888'}}>Расстройство пищевого поведения (РПП)</span>
          </div>
          {form.rppEnabled && (
            <div style={{marginTop:6}}>
              <div style={{fontSize:10,fontWeight:600,color:'#e91e63',marginBottom:4}}>Тип РПП:</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:6}}>
                {rppTypes.map(t => {
                  const sel = form.rppTypes.includes(t.id);
                  return (
                    <span key={t.id} style={{padding:'2px 6px',borderRadius:12,border:'1px solid '+ (sel?'#e91e63':'#ddd'),background:sel?'#fce4ec':'#fff',fontSize:9,cursor:'pointer',color:sel?'#c62828':'#666',whiteSpace:'nowrap'}}
                      onClick={() => setForm(p=>({...p,rppTypes:sel?p.rppTypes.filter(x=>x!==t.id):[...p.rppTypes,t.id]}))}>
                      {t.label}
                    </span>
                  );
                })}
              </div>
              <div style={{display:'flex',gap:6,marginBottom:6,flexWrap:'wrap'}}>
                <select value={form.rppFrequency} onChange={e=>setForm(p=>({...p,rppFrequency:e.target.value}))} style={{flex:1,minWidth:120,border:'1px solid #ddd',borderRadius:6,padding:'3px 6px',fontSize:10}}>
                  <option value="">Частота эпизодов</option>
                  <option value="daily">Ежедневно</option>
                  <option value="few_week">Несколько раз в неделю</option>
                  <option value="weekly">Раз в неделю</option>
                  <option value="few_month">Несколько раз в месяц</option>
                  <option value="rare">Реже</option>
                </select>
                <input type="text" placeholder="Триггеры (стресс, еда, эмоции...)" value={form.rppTriggers} onChange={e=>setForm(p=>({...p,rppTriggers:e.target.value}))} style={{flex:2,minWidth:150,border:'1px solid #ddd',borderRadius:6,padding:'3px 6px',fontSize:10}}/>
              </div>
              <textarea placeholder="Дополнительные наблюдения..." rows={2} value={form.rppNote} onChange={e=>setForm(p=>({...p,rppNote:e.target.value}))} style={{width:'100%',border:'1px solid #ddd',borderRadius:6,padding:'4px 6px',fontSize:10,resize:'vertical',boxSizing:'border-box'}}/>
            </div>
          )}
        </div>

        {/* Voice */}
        <div className="dv-section">
          <label className="dv-section-lbl">Голосовой ввод</label>
          <div className="dv-voice-row">
            <button className="dv-voice-btn" onClick={startVoice}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
              Записать
            </button>
            {form.voiceNote && <span className="dv-voice-ok">✓ Распознано</span>}
          </div>
          <textarea placeholder="Распознанный текст..." rows={2} value={form.comment}
            onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))} className="dv-textarea"/>
        </div>

        {/* Submit */}
        <button className="dv-submit" onClick={submitDiary} disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить запись'}
        </button>
      </div>

      <style>{`
        .dv-container { padding: 10px; height: 100%; overflow-y: auto; background: #fafafa; }
        .dv-header { margin-bottom: 10px; }
        .dv-title { font-size: 15px; color: #311b92; margin: 0; }
        .dv-body { display: flex; flex-direction: column; gap: 10px; }
        .dv-meals { display: flex; flex-direction: column; gap: 8px; }
        .dv-meal { background: #fff; border-radius: 10px; padding: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .dv-meal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .dv-meal-lbl { font-size: 12px; font-weight: 600; color: #311b92; }
        .dv-meal-time { display: flex; align-items: center; gap: 4px; }
        .dv-time-input { width: 60px; border: 1px solid #e0e0e0; border-radius: 4px; padding: 2px 4px; font-size: 10px; }
        .dv-dur-input { width: 30px; border: 1px solid #e0e0e0; border-radius: 4px; padding: 2px 4px; font-size: 10px; }
        .dv-dur-unit { font-size: 9px; color: #999; }
        .dv-meal-body { display: flex; gap: 8px; }
        .dv-photo { width: 50px; height: 50px; border-radius: 8px; border: 1px dashed #d1c4e9; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; overflow: hidden; }
        .dv-photo-img { width: 100%; height: 100%; object-fit: cover; }
        .dv-photo-btn { padding: 4px; }
        .dv-cat-btn { background: #fff; border: 1px solid #d1c4e9; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; align-self: flex-start; margin-top: 15px; }
        .dv-kbzu { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; flex: 1; }
        .dv-input-sm { border: 1px solid #e0e0e0; border-radius: 4px; padding: 3px 4px; font-size: 10px; width: 100%; box-sizing: border-box; }
        .dv-meal-extras { display: flex; gap: 4px; margin-top: 6px; }
        .dv-textarea { flex: 1; border: 1px solid #e0e0e0; border-radius: 6px; padding: 4px 8px; font-size: 10px; resize: none; font-family: inherit; }
        .dv-mic-btn { background: #f3e5f5; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #7b1fa2; }
        .dv-section { background: #fff; border-radius: 10px; padding: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .dv-section-lbl { font-size: 11px; font-weight: 600; color: #311b92; display: block; margin-bottom: 6px; }
        .dv-metric { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f3e5f5; }
        .dv-metric-icon { display: flex; }
        .dv-metric-lbl { font-size: 11px; color: #555; width: 50px; }
        .dv-metric-val { font-size: 11px; font-weight: 600; color: #311b92; width: 40px; text-align: right; }
        .dv-range { flex: 1; height: 4px; }
        .dv-mood { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .dv-mood-item { text-align: center; }
        .dv-mood-btns { display: flex; gap: 3px; justify-content: center; margin-top: 3px; }
        .dv-mood-btn { width: 14px; height: 14px; border: none; border-radius: 50%; cursor: pointer; }
        .dv-mood-btn.active-green { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #4caf50; }
        .dv-mood-btn.active-yellow { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #ff9800; }
        .dv-mood-btn.active-red { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #e53935; }
        .dv-voice-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .dv-voice-btn { background: #f3e5f5; border: 1px solid #d1c4e9; border-radius: 16px; padding: 4px 12px; font-size: 10px; color: #7b1fa2; cursor: pointer; display: flex; align-items: center; gap: 4px; }
        .dv-voice-ok { font-size: 10px; color: #4caf50; }
        .dv-submit { background: linear-gradient(135deg, #6b21c8, #4a148c); color: #fff; border: none; border-radius: 8px; padding: 10px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .dv-submit:disabled { opacity: 0.5; }
      `}</style>
    </div>
  );
};

export default DiaryView;
