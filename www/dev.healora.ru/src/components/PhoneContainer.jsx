import React from 'react';
import BottomNav from './BottomNav';

const PhoneContainer = ({ children, title = "Healora", showBottomNav = true }) => {
  return (
    <div className="phone-container">
      <div className="phone">
        <div className="phone-header" id="EL_COMP_003">
          <img src="/images/healora.png" alt="Healora" className="logo" />
          <div>
            <div className="score">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" id="EL_ICON_010">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span id="total-stars">840</span> звёзд
            </div>
            <div className="progress">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" id="EL_ICON_014">
                <path d="M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 18c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1v-1c0-.5.5-1 1-1zm10-8c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1h-1c-.5 0-1 .5-1 1zM2 12c0 .5.5 1 1 1h1c.5 0 1-.5 1-1s-.5-1-1-1H3c-.5 0-1 .5-1 1zm16.95-7.95c.4.4.4 1 0 1.4l-.71.71c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l.71-.71c.4-.39 1.03-.39 1.41 0z"/>
              </svg>
              68% плана | 5 дней подряд
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
