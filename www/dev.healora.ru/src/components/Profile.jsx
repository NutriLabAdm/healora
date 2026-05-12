import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  const stats = {
    totalStars: 840,
    streak: 5,
    level: 12,
    healthScore: 65,
    rank: 'Emerging Awareness'
  };

  const achievements = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, name: 'Первый шаг', condition: '3 задания подряд', earned: true },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0zM6.34 17.66c.4.4.4 1 0 1.41l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0zM17.66 17.66c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41zM6.34 6.34c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41z"/></svg>, name: 'На огне', condition: '7 дней без пропусков', earned: true },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M12 3v18M3 12h18"/></svg>, name: 'Баланс', condition: '≥50 очков в каждой категории', earned: false },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M3 17l6-6 4 4 8-8M16 9h6v6"/></svg>, name: 'Минус 2 кг', condition: 'Привязка к трекеру веса', earned: false }
  ];

  const profileData = {
    name: 'Анна',
    age: 28,
    weight: 55,
    height: 165,
    bmi: 20.2
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-large" id="EL_ICON_013">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="60" height="60">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2>{profileData.name}</h2>
        <p className="profile-subtitle">Уровень {stats.level}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" id="EL_COMP_003">
          <span className="stat-icon" id="EL_ICON_010">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </span>
          <span className="stat-value">{stats.totalStars}</span>
          <span className="stat-label">Звёзд</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon" id="EL_ICON_014">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0z"/>
            </svg>
          </span>
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">Дней подряд</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon" id="EL_ICON_015">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
          </span>
          <span className="stat-value">{stats.healthScore}</span>
          <span className="stat-label">Healora Score</span>
        </div>
      </div>

      <div className="health-score-section">
        <h3>Healora Score</h3>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${stats.healthScore}%` }}></div>
        </div>
        <p className="score-label">{stats.rank} (0-100)</p>
      </div>

      <div className="profile-info">
        <h3>Профиль</h3>
        <div className="info-row">
          <span>Возраст</span>
          <span>{profileData.age} лет</span>
        </div>
        <div className="info-row">
          <span>Вес</span>
          <span>{profileData.weight} кг</span>
        </div>
        <div className="info-row">
          <span>Рост</span>
          <span>{profileData.height} см</span>
        </div>
        <div className="info-row">
          <span>ИМТ</span>
          <span>{profileData.bmi}</span>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Достижения</h3>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`achievement-card ${achievement.earned ? 'earned' : ''}`}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-name">{achievement.name}</span>
              <span className="achievement-condition">{achievement.condition}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .profile-container {
          padding: 15px;
          background: #fafafa;
          height: 100%;
          overflow-y: auto;
          padding-bottom: 60px;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .avatar-large {
          font-size: 60px;
          margin-bottom: 10px;
        }

        .profile-header h2 {
          font-size: 20px;
          color: #311b92;
          margin: 0;
        }

        .profile-subtitle {
          font-size: 12px;
          color: #7b1fa2;
          margin: 5px 0 0 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #6b21c8;
          display: block;
        }

        .stat-label {
          font-size: 10px;
          color: #757575;
        }

        .health-score-section {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .health-score-section h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 10px 0;
        }

        .score-bar {
          height: 12px;
          background: #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .score-fill {
          height: 100%;
          background: linear-gradient(90deg, #6b21c8, #9c27ca);
          border-radius: 6px;
          transition: width 0.5s ease;
        }

        .score-label {
          font-size: 11px;
          color: #757575;
          margin: 0;
        }

        .profile-info {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .profile-info h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 12px 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f3e5f5;
          font-size: 12px;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row span:first-child {
          color: #757575;
        }

        .info-row span:last-child {
          color: #311b92;
          font-weight: 600;
        }

        .achievements-section {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .achievements-section h3 {
          font-size: 14px;
          color: #311b92;
          margin: 0 0 12px 0;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .achievement-card {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          opacity: 0.5;
        }

        .achievement-card.earned {
          background: #f3e5f5;
          opacity: 1;
        }

        .achievement-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }

        .achievement-name {
          font-size: 12px;
          font-weight: 600;
          color: #311b92;
          display: block;
        }

        .achievement-condition {
          font-size: 9px;
          color: #757575;
        }
      `}</style>
    </div>
  );
};

export default Profile;