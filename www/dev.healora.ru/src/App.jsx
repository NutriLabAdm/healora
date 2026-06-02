import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import ProgressPath from './components/ProgressPath';
import Profile from './components/Profile';
import DigitalTwin from './components/DigitalTwin';
import Goals from './components/Goals';
import DecisionFlowSimulation from './components/DecisionFlowSimulation';
import NutritionDiary from './components/NutritionDiary';
import PhoneContainer from './components/PhoneContainer';
import UserAvatarPanel from './components/UserAvatarPanel';
import InterventionsPanel from './components/InterventionsPanel';
import SourcesFooter from './components/SourcesFooter';
import KnowledgeModule from './components/KnowledgeModule';
import KnowledgeAdmin from './components/KnowledgeAdmin';
import { PlansProvider } from './context/PlansProvider';
import './assets/css/shared.css';

function AppContent() {
  const location = useLocation();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [draggedIntervention, setDraggedIntervention] = useState(null);
  const [cartInterventions, setCartInterventions] = useState([]);
  const [authEmail, setAuthEmail] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const getProfileFromHash = () => {
    try {
      const h = window.location.hash.replace('#', '');
      return h || null;
    } catch { return null; }
  };

  const basePath = import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '') : '';

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

  const isKnowledgePage = location.pathname.replace(basePath, '').replace(/\/+$/, '').startsWith('/knowledge');
  const isKnowledgeAdmin = location.pathname.replace(basePath, '').replace(/\/+$/, '').startsWith('/knowledge-admin');

  return (
    <>
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
          <div className="app-topbar-links">
            <Link className="topbar-link" to="/knowledge" title="База знаний">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                <line x1="8" y1="7" x2="16" y2="7"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              <span>база знаний</span>
            </Link>
            <Link className="topbar-link topbar-link-admin" to="/knowledge-admin" title="Управление знаниями">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <span>админ</span>
            </Link>
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

      {isKnowledgeAdmin ? (
        <KnowledgeAdmin />
      ) : isKnowledgePage ? (
        <KnowledgeModule />
      ) : (
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
            <Route path="/profile" element={<Navigate replace to="/digital-twin" />} />
            {!basePath && <Route path="/digital-twin" element={
              <DigitalTwin
                profileId={selectedProfile}
                selectedProtocol={draggedIntervention}
                cartItems={cartInterventions}
                onRemoveFromCart={removeFromCart}
              />
            } />}
            <Route path="/goals" element={
              <PhoneContainer title="Ваши Цели" onBack={() => window.history.back()}>
                <Goals />
              </PhoneContainer>
            } />
            <Route path="/diary" element={
              <PhoneContainer title="Дневник питания">
                <NutritionDiary />
              </PhoneContainer>
            } />
            <Route path="/knowledge-admin" element={<KnowledgeAdmin />} />
            <Route path="/flow" element={
              <PhoneContainer title="Подбор протокола">
                <DecisionFlowSimulation />
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
      )}
    </>
  );
}

function App() {
  const basePath = import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '') : '';
  return (
    <PlansProvider>
      <Router basename={basePath}>
        <AppContent />
      </Router>
    </PlansProvider>
  );
}

export default App;
