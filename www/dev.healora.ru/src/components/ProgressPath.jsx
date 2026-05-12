import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceDropZone from './DeviceDropZone.jsx';

const ProgressPath = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [digitalTwin, setDigitalTwin] = useState({
    energy: 75,
    focus: 60,
    stress: 40,
    sleep: 70,
    mood: 65
  });
  const [droppedItems, setDroppedItems] = useState([]);

  // Load previously dropped data from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('healora_drop_data');
    if (raw) {
      try { setDroppedItems(JSON.parse(raw)); } catch {}
    }
  }, []);

  // Persist dropped data to localStorage
  useEffect(() => {
    localStorage.setItem('healora_drop_data', JSON.stringify(droppedItems));
  }, [droppedItems]);

  // Basic preview renderer for a dropped item
  const renderDropPreview = (item) => {
    const t = item.type || (item.payload?.type ?? 'unknown');
    const name = item.payload?.name ?? item.payload?.device_id ?? item.payload?.title ?? 'Данные';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{t === 'wearable' ? 'Wearable' : t}</span>
        <span style={{ fontWeight: 600 }}>{name}</span>
      </div>
    );
  };

  // Handler from drop zone
  const handleDrop = (payload) => {
    const item = {
      id: Date.now(),
      type: payload?.type ?? (payload?.device_type ?? 'unknown'),
      payload,
      time: new Date().toLocaleTimeString()
    };
    setDroppedItems(prev => [item, ...prev]);
    // Optional: push to backend
    // if (typeof fetch === 'function') {
    //   fetch('/api/drop', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    // }
  };
  const [loading, setLoading] = useState(true);

  // Load profiles
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await fetch('/docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        if (!response.ok) throw new Error('Failed to fetch profiles');
        const data = await response.json();
        setProfiles(data.healora_test_profiles || []);
      } catch (error) {
        console.error('Error loading profiles:', error);
        // Fallback mock data
        const mockProfiles = [
          { profile_id: 'TEST_001', demographics: { age: 34, sex: 'Male', bmi: 22.1 } },
          { profile_id: 'TEST_002', demographics: { age: 28, sex: 'Female', bmi: 20.5 } },
          { profile_id: 'TEST_003', demographics: { age: 45, sex: 'Male', bmi: 28.3 } },
          { profile_id: 'TEST_004', demographics: { age: 32, sex: 'Female', bmi: 24.7 } },
          { profile_id: 'TEST_005', demographics: { age: 29, sex: 'Male', bmi: 26.1 } }
        ];
        setProfiles(mockProfiles);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, []);

  // Mock interventions
  useEffect(() => {
    setInterventions([
      {
        title: "Утренняя медитация 10 минут",
        description: "Начните день с осознанности и спокойствия",
        source_url: "https://healora.ru/articles/morning-meditation",
        type: "mental"
      },
      {
        title: "Холодный душ после тренировки",
        description: "Ускорьте восстановление и бодрость",
        source_url: "https://healora.ru/articles/cold-shower",
        type: "physical"
      },
      {
        title: "Прогулка на природе 30 минут",
        description: "Повысьте настроение и креативность",
        source_url: "https://healora.ru/articles/nature-walk",
        type: "lifestyle"
      }
    ]);
  }, []);

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles(prev => {
      if (prev.includes(profileId)) {
        return prev.filter(id => id !== profileId);
      } else {
        return [...prev, profileId];
      }
    });
  };

  const selectIntervention = (intervention) => {
    navigate(`/chat?intervention=${encodeURIComponent(JSON.stringify(intervention))}`);
  };

  if (loading) {
    return (
      <div className="progress-container">
        <div className="progress-header">
          <div className="phone-header" onClick={() => navigate('/chat')}>
            <img src="/images/healora.png" alt="Healora" className="logo" />
            <div>
              <div className="score">
                <span id="total-stars">840</span> звёзд
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="phone-header" onClick={() => navigate('/chat')}>
          <img src="/images/healora.png" alt="Healora" className="logo" />
          <div>
            <div className="score">
              <span id="total-stars">840</span> звёзд
            </div>
            <div className="progress">68% плана | 5 дней подряд</div>
            <div className="streak">Уровень: Functional Application (41-60)</div>
          </div>
        </div>
        <h2>Ваш Путь к Здоровью</h2>
      </div>

      <div className="progress-content">
        {/* Profile selector */}
        <div className="profile-section">
          <h3>Выберите свой профиль Digital Twin:</h3>
          <div className="profiles-grid">
            {profiles.map(profile => (
              <div
                key={profile.profile_id}
                className={`profile-card ${selectedProfiles.includes(profile.profile_id) ? 'selected' : ''}`}
                onClick={() => handleProfileToggle(profile.profile_id)}
              >
                <div className="profile-id">{profile.profile_id}</div>
                <div className="profile-name">
                  {profile.demographics?.age} лет, {profile.demographics?.sex}, BMI {profile.demographics?.bmi}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#7b1fa2', marginTop: '10px' }}>
            Выбрано профилей: {selectedProfiles.length}
          </p>
        </div>

        {/* Progress stats */}
        <div className="profile-section">
          <h3>Прогресс пути</h3>
          <div className="param-row">
            <span className="param-name">Дней в пути</span>
            <span className="param-value">42 дня</span>
            <span className="param-status status-good"></span>
          </div>
          <div className="param-row">
            <span className="param-name">Текущий этап</span>
            <span className="param-value">Фаза 2: Стабилизация</span>
            <span className="param-status status-good"></span>
          </div>
          <div className="param-row">
            <span className="param-name">Общий прогресс</span>
            <span className="param-value">68% (42/62 задач выполнено)</span>
            <span className="param-status status-good"></span>
          </div>
        </div>

        {/* Recommended interventions */}
        <div className="profile-section">
          <h3>Рекомендуемые интервенции:</h3>
          <div className="interventions-grid">
            {interventions.map((intervention, idx) => (
              <div
                key={idx}
                className="intervention-card"
                onClick={() => selectIntervention(intervention)}
              >
                <h4>{intervention.title}</h4>
                <p>{intervention.description}</p>
                <div style={{ fontSize: '11px', color: '#607d8b', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                   Читать статью
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop zone data for path (wearables / bio_check / bio_anamnes) */}
        <div className="path-dropzone-section" style={{ padding: 12 }}>
          <DeviceDropZone onDrop={handleDrop} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 180px)', gap: 12, marginTop: 12 }}>
            {droppedItems.map(item => (
              <div key={item.id} className="drop-preview-card" style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}>
                {renderDropPreview(item)}
                <div style={{ fontSize: 10, color: '#777' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Twin state */}
        <div className="profile-section">
          <h3>Состояние вашего Digital Twin:</h3>
          <div className="state-indicators">
            {Object.entries(digitalTwin).map(([key, value]) => (
              <div key={key} className="state-item">
                <label>{key === 'energy' ? 'Энергия' : key === 'focus' ? 'Фокус' : key === 'stress' ? 'Стресс' : key === 'sleep' ? 'Сон' : 'Настроение'}</label>
                <div className="state-value">{value}%</div>
                <div className="state-bar">
                  <div className="state-fill" style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPath;
