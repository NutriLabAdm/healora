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
      path: '/digital-twin', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="M1 12h6m6 0h6"/>
          <path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"/>
          <path d="M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"/>
        </svg>
      ), 
      label: 'Twin',
      active: location.pathname === '/digital-twin'
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