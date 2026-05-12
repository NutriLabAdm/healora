import React, { useState } from 'react';
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
import './assets/css/shared.css';

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [draggedIntervention, setDraggedIntervention] = useState(null);
  const [cartInterventions, setCartInterventions] = useState([]);

  const addToCart = (intervention) => {
    if (cartInterventions.find(i => i.code === intervention.code)) return;
    setCartInterventions(prev => [...prev, intervention]);
  };

  const removeFromCart = (code) => {
    setCartInterventions(prev => prev.filter(i => i.code !== code));
  };

  return (
    <Router basename={import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '') : ''}>
      <div className="app-layout-4col">
        <UserAvatarPanel
          selectedProfile={selectedProfile}
          onSelectProfile={setSelectedProfile}
        />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/digital-twin" />} />
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
  );
}

export default App;
