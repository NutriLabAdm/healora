import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPanel = () => {
  const [activeTip, setActiveTip] = useState(null);
  const navigate = useNavigate();

  // SVG Icons
  const IconTwin = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6"/>
      <path d="M1 12h6m6 0h6"/>
      <path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"/>
      <path d="M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"/>
    </svg>
  );

  const IconArrowRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );

  const tips = [
    "Blood sugar is measured on empty stomach. Normal: 3.3-5.5 mmol/L. Elevated indicates diabetes risk.",
    "Total cholesterol is highest in the morning (6-8 AM) and lowest in the evening (18-20).",
    "L-carnitine can improve insulin sensitivity when taking 500-2000 mg per day.",
    "Chronic stress increases cardiovascular disease risk by 40%.",
    "LDL cholesterol <1.8 mmol/L reduces heart attack risk by 30%.",
    "Regular sleep 7-9 hours reduces inflammation by 30%.",
    "Intermittent fasting 16:8 improves insulin sensitivity in 4 weeks.",
    "Vitamin D3 with deficiency (<30 ng/mL) requires 2000-4000 IU per day."
  ];

  // Digital Twin summary data
  const dtSummary = {
    totalAttributes: 51,
    categories: 6,
    goodPercent: 65,
    lastUpdate: '2026-05-01 10:30'
  };

  const toggleTip = (index) => {
    setActiveTip(activeTip === index ? null : index);
  };

  return (
    <div className="info-panel">
      <h3>Information Panel</h3>
      
      {/* Digital Twin Summary Card */}
      <div className="info-section" style={{ 
        background: 'linear-gradient(135deg, #6b21c8, #4a1488)', 
        borderRadius: '12px', 
        padding: '15px',
        marginBottom: '15px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconTwin /> Digital Twin
          </h4>
          <button 
            onClick={() => navigate('/digital-twin')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '4px 10px',
              color: 'white',
              fontSize: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Open <IconArrowRight />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800' }}>{dtSummary.totalAttributes}</div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>Attributes</div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800' }}>{dtSummary.categories}</div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>Categories</div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800' }}>{dtSummary.goodPercent}%</div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>Normal</div>
          </div>
        </div>
      </div>
      
      <div className="info-section">
        <h4>Target Metrics</h4>
        <div className="info-item">
          <span className="label">Glucose (fasting)</span>
          <span className="value">5.2 mmol/L</span>
          <span className="status status-warning"></span>
        </div>
        <div className="info-item">
          <span className="label">Total Cholesterol</span>
          <span className="value">4.8 mmol/L</span>
          <span className="status status-warning"></span>
        </div>
        <div className="info-item">
          <span className="label">LDL Cholesterol</span>
          <span className="value">2.9 mmol/L</span>
          <span className="status status-warning"></span>
        </div>
        <div className="info-item">
          <span className="label">HDL Cholesterol</span>
          <span className="value">1.4 mmol/L</span>
          <span className="status status-good"></span>
        </div>
        <div className="info-item">
          <span className="label">Hemoglobin</span>
          <span className="value">135 g/L</span>
          <span className="status status-good"></span>
        </div>
      </div>

      <div className="info-section">
        <h4>Action Log</h4>
        <div className="info-log">
          <div className="log-entry">
            <div className="time">10:25</div>
            <div>Added source: Wearables</div>
          </div>
          <div className="log-entry">
            <div className="time">10:30</div>
            <div>Added source: Medical</div>
          </div>
          <div className="log-entry">
            <div className="time">10:35</div>
            <div>Completed: Drink water (+10 &#9734;)</div>
          </div>
        </div>
      </div>

      {/* Context Tips (Collapsible) */}
      <div className="context-tips">
        <div className="tips-header" onClick={() => toggleTip(activeTip ? null : 0)}>
          Context Tips
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: activeTip !== null ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`tips-content ${activeTip !== null ? 'show' : ''}`}>
          {tips.map((tip, index) => (
            <div key={index} className="tip-item" onClick={() => toggleTip(index)}>
              <strong>Fact #{index + 1}:</strong> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
