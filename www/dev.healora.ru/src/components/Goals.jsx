import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // SVG Icons
  const IconScale = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-3 2 5 3 7 3z"/>
    </svg>
  );

  const IconRun = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <path d="M8 21l4-4 2 2"/>
      <path d="M15 21l-2-2"/>
      <path d="M9 17l-2-6"/>
      <path d="M8 11l3-3"/>
    </svg>
  );

  const IconSleep = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"/>
    </svg>
  );

  const IconWater = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  );

  const IconStar = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );

  const IconBook = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );

  const IconPill = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M12 2v20"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 0 0-7H7"/>
    </svg>
  );

  // Mock goals data
  useEffect(() => {
    setGoals([
      { id: 1, title: 'Пить 8 стаканов воды', progress: 75, category: 'Nutrition', icon: <IconWater /> },
      { id: 2, title: 'Спать 7-8 часов', progress: 60, category: 'Recovery', icon: <IconSleep /> },
      { id: 3, title: 'Ходить 10000 шагов', progress: 45, category: 'Activity', icon: <IconRun /> },
      { id: 4, title: 'Медитировать 10 мин', progress: 30, category: 'Recovery', icon: <IconScale /> },
      { id: 5, title: 'Читать 30 мин', progress: 50, category: 'Knowledge', icon: <IconBook /> }
    ]);
    setLoading(false);
  }, []);

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
        <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>
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
          </div>
        </div>
        <h2>Ваши Цели</h2>
      </div>

      <div className="progress-content">
        <div className="profile-section">
          <h3>Текущие цели:</h3>
          <div className="goals-list">
            {goals.map(goal => (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <span className="goal-icon">{goal.icon}</span>
                  <span className="goal-title">{goal.title}</span>
                  <span className="goal-category">{goal.category}</span>
                </div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories summary */}
        <div className="profile-section">
          <h3>Прогресс по категориям:</h3>
          <div className="categories-grid">
            {['Knowledge', 'Activity', 'Recovery', 'Nutrition', 'Specialists'].map(cat => {
              const catGoals = goals.filter(g => g.category === cat);
              const total = catGoals.reduce((sum, g) => sum + g.progress, 0);
              const avg = catGoals.length > 0 ? Math.round(total / catGoals.length) : 0;
              return (
                <div key={cat} className="category-card">
                  <div className="category-name">{cat}</div>
                  <div className="category-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${avg}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{avg}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;