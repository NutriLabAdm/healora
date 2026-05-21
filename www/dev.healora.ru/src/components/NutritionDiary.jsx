import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
});

const NutritionDiary = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState(0);
  const [form, setForm] = useState(defaultDiaryData(0));

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
          updateMeal(idx, 'description', (form.meals[idx].description ? form.meals[idx].description + '; ' : '') + desc);
        }
      });
      const wm = text.match(/вод[ыа]?\s*(около|примерно|~)?\s*(\d+(?:[.,]\d+)?)\s*л/i);
      if (wm) setForm(prev => ({ ...prev, waterMl: Math.round(parseFloat(wm[2].replace(',', '.')) * 1000) }));
    };
    sr.onerror = () => alert('Ошибка распознавания речи');
    sr.start();
  };

  const submitDiary = () => {
    fetch('/api/diary', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: null, day: form.day, meals: form.meals, water_ml: form.waterMl, mood: form.mood, voice_note: form.voiceNote || null, audio: null, comment: form.comment || null }),
    }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(() => navigate('/chat'))
      .catch(() => alert('Ошибка отправки: бэкенд недоступен'));
  };

  const goDay = (d) => {
    if (d < 0 || d > 30) return;
    setDay(d);
    setForm(defaultDiaryData(d));
  };

  const moodLevel = (key) => {
    const v = form.mood[key];
    return v === 'red' ? 25 : v === 'yellow' ? 55 : v === 'green' ? 85 : 0;
  };

  const setMood = (key, val) => {
    const level = val < 40 ? 'red' : val < 70 ? 'yellow' : 'green';
    setForm(prev => ({ ...prev, mood: { ...prev.mood, [key]: level } }));
  };

  return (
    <div className="diary-mobile">
      <div className="diary-mobile-header">
        <button className="diary-mobile-back" onClick={() => navigate('/chat')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="diary-mobile-day-nav">
          <button onClick={() => goDay(day - 1)} disabled={day <= 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h3>Дневник питания — День {day}</h3>
          <button onClick={() => goDay(day + 1)} disabled={day >= 30}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <div className="diary-body">
        <div className="diary-form">
          {/* Meals */}
          <div className="diary-meals-row">
            {form.meals.map((meal, idx) => (
              <div key={meal.type} className="diary-meal">
                <div className="diary-meal-header">
                  <span>{meal.label}</span>
                  <span className="diary-meal-time">
                    <input type="time" value={meal.time} onChange={e => updateMeal(idx, 'time', e.target.value)}
                      style={{ width: 80, border: 'none', fontSize: 11, outline: 'none', background: 'transparent' }}/>
                    <input type="number" min="1" max="180" value={meal.duration}
                      onChange={e => updateMeal(idx, 'duration', e.target.value)}
                      style={{ width: 40, border: 'none', fontSize: 11, outline: 'none', background: 'transparent', textAlign: 'right' }}/>
                    <span style={{ fontSize: 10, color: '#999' }}>мин</span>
                  </span>
                </div>
                <div className="diary-meal-body">
                  <div className="diary-photo-upload" onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file'; input.accept = 'image/*';
                    input.onchange = (e) => handlePhoto(idx, e.target.files[0]);
                    input.click();
                  }}>
                    {meal.photo ? (
                      <img src={meal.photo} alt="" className="diary-photo-preview" onClick={(e) => { e.stopPropagation(); updateMeal(idx, 'photo', ''); }}/>
                    ) : (
                      <div className="diary-photo-btn" title="Выбрать фото">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="diary-meal-fields">
                    <div className="diary-kbzu">
                      <input type="number" placeholder="ккал" value={meal.calories} onChange={e => updateMeal(idx, 'calories', e.target.value)}/>
                      <input type="number" placeholder="белки" value={meal.protein} onChange={e => updateMeal(idx, 'protein', e.target.value)}/>
                      <input type="number" placeholder="жиры" value={meal.fat} onChange={e => updateMeal(idx, 'fat', e.target.value)}/>
                      <input type="number" placeholder="углев." value={meal.carbs} onChange={e => updateMeal(idx, 'carbs', e.target.value)}/>
                      <input type="number" placeholder="NDI" value={meal.ndi} onChange={e => updateMeal(idx, 'ndi', e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="diary-meal-desc-row">
                  <textarea placeholder="Описание блюда" rows={1} value={meal.description}
                    onChange={e => updateMeal(idx, 'description', e.target.value)}/>
                  <button className="diary-mic-btn" type="button" onClick={() => {
                    const sr = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                    sr.lang = 'ru-RU'; sr.interimResults = false;
                    sr.onresult = (ev) => updateMeal(idx, 'description', form.meals[idx].description + (form.meals[idx].description ? '; ' : '') + ev.results[0][0].transcript);
                    sr.onerror = () => {};
                    sr.start();
                  }} title="Голосовое описание">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="22"/>
                    </svg>
                  </button>
                </div>
                <textarea className="diary-meal-recs" placeholder="Рекомендации" rows={1} value={meal.recommendations}
                  onChange={e => updateMeal(idx, 'recommendations', e.target.value)}/>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="diary-section">
            <label className="diary-section-label">Показатели</label>
            <div className="diary-metrics-grid">
              <div className="diary-metric">
                <span className="diary-metric-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M12 2C8 8 6 12 6 16a6 6 0 0 0 12 0c0-4-2-8-6-14z"/>
                  </svg>
                </span>
                <span className="diary-metric-label">Вода</span>
                <span className="diary-metric-value">{form.waterMl}мл</span>
                <input type="range" min="0" max="3000" step="100" value={form.waterMl}
                  onChange={e => setForm(prev => ({ ...prev, waterMl: Number(e.target.value) }))}/>
              </div>
              {[
                { key: 'energy', label: 'Энергия', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/> },
                { key: 'mood', label: 'Настроение', icon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></> },
                { key: 'sleep', label: 'Сон', icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/> },
                { key: 'stress', label: 'Стресс', icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></> },
                { key: 'digestion', label: 'ЖКТ', icon: <><path d="M4 12h16M4 12l2-4h12l2 4M4 12l2 4h12l2-4"/><path d="M8 4v4M16 4v4"/></> },
              ].map(({ key, label, icon }) => (
                <div key={key} className="diary-metric">
                  <span className="diary-metric-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">{icon}</svg>
                  </span>
                  <span className="diary-metric-label">{label}</span>
                  <span className="diary-metric-value">{Math.round(moodLevel(key))}%</span>
                  <input type="range" min="0" max="100" step="1" value={moodLevel(key)}
                    onChange={e => setMood(key, Number(e.target.value))}/>
                </div>
              ))}
            </div>
          </div>

          {/* Voice input */}
          <div className="diary-section">
            <label className="diary-section-label">Голосовой ввод</label>
            <div className="diary-voice-row">
              <button className="diary-voice-btn" onClick={startVoice}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
                Записать
              </button>
              {form.voiceNote && <span className="diary-voice-status">✓ Распознано</span>}
            </div>
            <textarea placeholder="Распознанный текст появится здесь..." rows={3} value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}/>
          </div>

          {/* Audio file upload */}
          <div className="diary-section">
            <label className="diary-section-label">Аудиофайл (разговор с врачом)</label>
            <input type="file" accept=".mp3,.wav,.ogg,.m4a" className="diary-audio-input"
              onChange={e => setForm(prev => ({ ...prev, audioFile: e.target.files[0] }))}/>
            {form.audioFile && <span className="diary-voice-status">✓ {form.audioFile.name}</span>}
          </div>

          {/* Submit */}
          <button className="diary-submit" onClick={submitDiary}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 2L11 13"/>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
            Сохранить запись
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionDiary;
