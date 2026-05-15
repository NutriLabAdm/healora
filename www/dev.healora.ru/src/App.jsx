import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import ProgressPath from './components/ProgressPath';
import Profile from './components/Profile';
import DigitalTwin from './components/DigitalTwin';
import Goals from './components/Goals';
import PhoneContainer from './components/PhoneContainer';
import UserAvatarPanel from './components/UserAvatarPanel';
import InterventionsPanel from './components/InterventionsPanel';
import SourcesFooter from './components/SourcesFooter';
import { PlansProvider } from './context/PlansProvider';
import './assets/css/shared.css';

function App() {
  const getProfileFromHash = () => {
    try {
      const h = window.location.hash.replace('#', '');
      return h || null;
    } catch { return null; }
  };

  const [selectedProfile, setSelectedProfile] = useState(getProfileFromHash());
  const [draggedIntervention, setDraggedIntervention] = useState(null);
  const [cartInterventions, setCartInterventions] = useState([]);
  const [authEmail, setAuthEmail] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const basePath = import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '') : '';

  // Sync selectedProfile from URL hash
  useEffect(() => {
    const handler = () => setSelectedProfile(getProfileFromHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const handleSelectProfile = (profileId) => {
    setSelectedProfile(profileId);
    window.location.hash = profileId;
  };

  const addToCart = (intervention) => {
    if (cartInterventions.find(i => i.code === intervention.code)) return;
    setCartInterventions(prev => [...prev, intervention]);
  };

  const removeFromCart = (code) => {
    setCartInterventions(prev => prev.filter(i => i.code !== code));
  };

  return (
    <PlansProvider>
      <Router basename={basePath}>
      <div className="app-topbar">
        <div className="app-topbar-inner">
          <div className="app-topbar-left">
            <span className="app-topbar-title">Healora</span>
            <span className="app-topbar-sep">·</span>
            <span className="app-topbar-platform">платформа Нутричат</span>
            <img className="app-topbar-logo" src="https://bmitech.ru/assets/images/logos/nutrichat.png" alt="Нутричат" width="25" height="25" />
          </div>
          <div className="app-topbar-center">
            <span className="app-topbar-tagline">мы формируем привычки для здоровья и долголетия на научных знаниях и современных технологиях</span>
            <a className="app-topbar-project" href="https://bmitech.ru" target="_blank" rel="noopener">проект BMITECH.ru</a>
          </div>
          <div className="app-topbar-right">
            {!authEmail ? (
              <button className="auth-btn" onClick={() => setShowAuthPopup(!showAuthPopup)}>Войти</button>
            ) : (
              <span className="auth-email">{authEmail}</span>
            )}
          </div>
        </div>
        {showAuthPopup && (
          <div className="auth-popup">
            <button className="auth-close" onClick={() => setShowAuthPopup(false)}>×</button>
            <div className="auth-tabs">
              <button className={`auth-tab ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Войти</button>
              <button className={`auth-tab ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>Регистрация</button>
            </div>
            <input className="auth-input" type="email" placeholder="Email" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
            <input className="auth-input" type="password" placeholder="Пароль" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
            <button className="auth-submit" onClick={() => {
              if (emailInput && passwordInput) {
                setAuthEmail(emailInput);
                setShowAuthPopup(false);
                setEmailInput('');
                setPasswordInput('');
              }
            }}>{authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
          </div>
        )}
      </div>
      <div className="app-layout-4col">
        <UserAvatarPanel
          selectedProfile={selectedProfile}
          onSelectProfile={handleSelectProfile}
        />

        <div className="main-content">
          <Routes>
            {basePath ? (
              <Route path="/" element={<DigitalTwin
                profileId={selectedProfile}
                selectedProtocol={draggedIntervention}
                cartItems={cartInterventions}
                onRemoveFromCart={removeFromCart}
              />} />
            ) : (
              <Route path="/" element={<Navigate replace to="/digital-twin" />} />
            )}
            <Route path="/chat" element={
              <PhoneContainer title="Healthora AI" onBack={() => window.history.back()}>
                <ChatInterface />
              </PhoneContainer>
            } />
            <Route path="/path" element={
              <PhoneContainer title="Ваш Путь" onBack={() => window.history.back()}>
                <ProgressPath />
              </PhoneContainer>
            } />
            <Route path="/profile" element={
              <PhoneContainer title="Профиль" onBack={() => window.history.back()}>
                <Profile />
              </PhoneContainer>
            } />
            <Route path="/digital-twin" element={
              <DigitalTwin
                profileId={selectedProfile}
                selectedProtocol={draggedIntervention}
                cartItems={cartInterventions}
                onRemoveFromCart={removeFromCart}
              />
            } />
            <Route path="/goals" element={
              <PhoneContainer title="Ваши Цели" onBack={() => window.history.back()}>
                <Goals />
              </PhoneContainer>
            } />
            <Route path="*" element={<Navigate replace to={basePath ? '/' : '/digital-twin'} />} />
          </Routes>
        </div>

        <InterventionsPanel
          profileId={selectedProfile}
          onDragStart={setDraggedIntervention}
          selectedProtocol={draggedIntervention}
          cartItems={cartInterventions}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />

        <SourcesFooter />
      </div>
    </Router>
    </PlansProvider>
  );
}

export default App;
