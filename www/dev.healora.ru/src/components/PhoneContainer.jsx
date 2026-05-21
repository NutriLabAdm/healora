import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav';

const PhoneContainer = ({ children, title = "Healora", showBottomNav = true }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const fmtTime = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="phone-container">
      <div className="phone">
        <div className="phone-header" id="EL_COMP_003">
          <div className="status-bar">
            <span className="status-time">{fmtTime}</span>
            <div className="status-icons">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="status-wifi">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" className="status-battery">
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
                <line x1="23" y1="10" x2="23" y2="14"/>
                <rect x="3" y="8" width="14" height="8" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="header-content">
            <div className="header-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="mood-indicator" id="EL_ICON_015">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <div className="mood-dot"></div>
            </div>
            <div className="header-info">
              <div className="score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" id="EL_ICON_010">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span id="healora-score">47</span>
                <span className="score-label">Functional Application</span>
              </div>
              <div className="progress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="streak-icon">
                  <path d="M12 2l2.5 8.5L22 12l-7.5 1.5L12 22l-2.5-8.5L2 12l7.5-1.5z"/>
                </svg>
                <span>5 дней подряд</span>
                <span className="progress-sep">|</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="plan-icon">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <span>68% плана</span>
              </div>
            </div>
          </div>
        </div>
        <div className="screen">
          {children}
        </div>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default PhoneContainer;
