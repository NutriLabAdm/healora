import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SourcesPanel = () => {
  const navigate = useNavigate();
  
  const sources = [
    { id: 'wearable', label: 'Wearables', sub: '(HRV, sleep)', icon: 'M20 21v-2a4 4 0 0 1-4-4H8a4 4 0 0 1-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
    { id: 'voice', label: 'Voice', sub: '(voice input)', icon: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 1-14 0v-2"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>' },
    { id: 'medical', label: 'Medical', sub: '(tests, analysis)', icon: 'M16 4h2a2 2 0 0 1 0 4h-1"/><path d="M2 8h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>' },
    { id: 'food', label: 'Food Photos', sub: '(meal photos)', icon: 'M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>' },
    { id: 'genetics', label: 'Genetics', sub: '(DNA test)', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
    { id: 'mental', label: 'Mental', sub: '(meditation)', icon: 'M12 2a10 10 0 1 1 0 20 10 10 0 1 1 0 20 10a10 10 0 1 1 0-20 10 10 0 1 1 0-20 10z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="12" y1="16" x2="12.01" y2="16"/>' }
  ];

  // Handle drag start
  const handleDragStart = useCallback((e, source) => {
    e.dataTransfer.setData('application/json', JSON.stringify(source));
    e.dataTransfer.setData('text', source.id);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  // SVG icon for Digital Twin button
  const IconTwin = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6"/>
      <path d="M1 12h6m6 0h6"/>
      <path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"/>
      <path d="M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"/>
    </svg>
  );

  return (
    <div className="sources-panel">
      <h3>Data Sources</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Digital Twin profiles (multi-select):</div>
        <div id="profile-checkboxes" style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', background: 'var(--bg-chat)', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
            <input type="checkbox" value="TEST_001" style={{ cursor: 'pointer' }} />
            <span>Anna 28 y.o., 55 kg, 165 cm</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', background: 'var(--bg-chat)', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
            <input type="checkbox" value="TEST_002" style={{ cursor: 'pointer' }} />
            <span>Nikolay 34 y.o., 78 kg, 180 cm</span>
          </label>
        </div>
      </div>

      {sources.map(source => (
        <div 
          key={source.id} 
          className="source-item" 
          draggable="true"
          onDragStart={(e) => handleDragStart(e, source)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" dangerouslySetInnerHTML={{ __html: source.icon }} />
          <span className="label">{source.label}<br/>{source.sub}</span>
        </div>
      ))}

      {/* Digital Twin Navigation Button */}
      <button 
        className="digital-twin-btn"
        onClick={() => navigate('/digital-twin')}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '15px',
          background: 'linear-gradient(135deg, #6b21c8, #4a148c)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'all 0.3s',
          boxShadow: '0 2px 8px rgba(107, 33, 200, 0.3)'
        }}
      >
        <IconTwin />
        <span>Open Digital Twin</span>
      </button>

      {/* Drop Zone */}
      <div className="drop-zone" id="drop-zone">
        <h4>Digital Twin</h4>
        <div>Drag source here to add</div>
        <div id="sources-added" style={{ marginTop: '10px', fontSize: '11px', color: '#4caf50' }}></div>
      </div>

      {/* Sample Data Display */}
      <div id="sample-data"></div>
    </div>
  );
};

export default SourcesPanel;
