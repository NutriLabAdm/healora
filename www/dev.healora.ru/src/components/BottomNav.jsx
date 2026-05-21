import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      path: '/chat', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ), 
      label: 'Chat',
      active: location.pathname === '/chat'
    },
    { 
      path: '/flow', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ), 
      label: 'Flow',
      active: location.pathname === '/flow'
    },
    { 
      path: '/path', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ), 
      label: 'Path',
      active: location.pathname === '/path'
    },
    { 
      path: '/goals', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ), 
      label: 'Goals',
      active: location.pathname === '/goals'
    },
    { 
      path: '/diary', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ), 
      label: 'Diary',
      active: location.pathname === '/diary'
    },
    { 
      path: '/profile', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ), 
      label: 'Profile',
      active: location.pathname === '/profile'
    }
  ];

  return (
    <div className="bottom-nav" id="EL_COMP_010">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${item.active ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
      
      <style>{`
        .bottom-nav {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border-top: 1px solid #d1c4e9;
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          z-index: 100;
          flex-shrink: 0;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s;
          color: #7b1fa2;
        }
        
        .nav-item:hover {
          background: #f3e5f5;
        }
        
        .nav-item.active {
          background: #6b21c8;
          color: white;
        }
        
        .nav-item.active .nav-icon svg {
          stroke: white;
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
        }
        
        .nav-icon svg {
          width: 100%;
          height: 100%;
        }
        
        .nav-label {
          font-size: 10px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default BottomNav;