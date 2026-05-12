import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SourcesFooter = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [droppedSources, setDroppedSources] = useState([]);

  const sources = [
    { id: 'wearable', label: 'Wearables', sub: 'HRV, sleep', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 6v6l4 2"/></svg> },
    { id: 'voice', label: 'Voice', sub: 'voice input', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg> },
    { id: 'medical', label: 'Medical', sub: 'tests, labs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { id: 'food', label: 'Food', sub: 'meal photos', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><circle cx="12" cy="12" r="3"/></svg> },
    { id: 'genetics', label: 'Genetics', sub: 'DNA test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6l-2.5-2.5"/><path d="M14 8l-1-1"/><path d="M7 18l2.5 2.5"/><path d="M3.5 14.5l.5.5"/><path d="M20 9l.5.5"/><path d="M6.5 12.5l1 1"/></svg> },
    { id: 'mental', label: 'Mental', sub: 'meditation', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg> },
  ];

  const handleDragStart = useCallback((e, source) => {
    e.dataTransfer.setData('application/json', JSON.stringify(source));
    e.dataTransfer.setData('text', source.id);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const source = JSON.parse(data);
        if (!droppedSources.includes(source.id)) {
          setDroppedSources(prev => [...prev, source.id]);
        }
      }
    } catch (err) {
      const text = e.dataTransfer.getData('text');
      if (text && !droppedSources.includes(text)) {
        setDroppedSources(prev => [...prev, text]);
      }
    }
  }, [droppedSources]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="sources-footer">
      <div
        className="footer-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="footer-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          <span>Data Sources</span>
          <span className="source-count">{droppedSources.length} active</span>
        </div>
        <span className="toggle-icon">{isExpanded ? '▼' : '▲'}</span>
      </div>

      {isExpanded && (
        <div className="footer-content">
          <div className="drag-instruction">
            Drag sources to Digital Twin panel to add data
          </div>

          <div className="sources-grid">
            {sources.map(source => (
              <div
                key={source.id}
                className="source-card"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, source)}
              >
                <span className="source-icon">{source.icon}</span>
                <span className="source-label">{source.label}</span>
                <span className="source-sub">{source.sub}</span>
              </div>
            ))}
          </div>

          {droppedSources.length > 0 && (
            <div className="active-sources">
              <h4>Active in Twin:</h4>
              <div className="active-tags">
                {droppedSources.map(s => (
                  <span key={s} className="active-tag">{s} &#10003;</span>
                ))}
              </div>
            </div>
          )}

          <div
            className="drop-zone-footer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="drop-hint">Drop here to configure profile</div>
          </div>

            <button
              className="digital-twin-btn"
              onClick={() => navigate('/digital-twin')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="M1 12h6m6 0h6"/><path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24"/><path d="M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"/></svg>
              <span>Open Digital Twin</span>
            </button>
        </div>
      )}

      <style>{`
        .sources-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 2px solid #6b21c8;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }

        .footer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 15px;
          cursor: pointer;
          background: linear-gradient(135deg, #6b21c8, #4a148c);
          color: white;
        }

        .footer-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .source-count {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
        }

        .toggle-icon {
          font-size: 10px;
        }

        .footer-content {
          padding: 15px;
          max-height: 300px;
          overflow-y: auto;
          background: #fafafa;
        }

        .drag-instruction {
          font-size: 11px;
          color: #757575;
          margin-bottom: 12px;
          text-align: center;
        }

        .sources-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin-bottom: 15px;
        }

        .source-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: grab;
          transition: all 0.3s;
          text-align: center;
        }

        .source-card:hover {
          border-color: #6b21c8;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(107, 33, 200, 0.2);
        }

        .source-card:active {
          cursor: grabbing;
        }

        .source-icon {
          font-size: 20px;
        }

        .source-label {
          font-size: 11px;
          font-weight: 600;
          color: #311b92;
        }

        .source-sub {
          font-size: 9px;
          color: #757575;
        }

        .active-sources {
          margin-bottom: 12px;
        }

        .active-sources h4 {
          font-size: 11px;
          color: #311b92;
          margin: 0 0 8px 0;
        }

        .active-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .active-tag {
          padding: 4px 8px;
          background: #e8eaf6;
          color: #3f51b5;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .drop-zone-footer {
          padding: 15px;
          border: 2px dashed #6b21c8;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 12px;
          background: rgba(107, 33, 200, 0.05);
        }

        .drop-hint {
          font-size: 11px;
          color: #6b21c8;
          font-weight: 500;
        }

        .digital-twin-btn {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #6b21c8, #4a148c);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .digital-twin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(107, 33, 200, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SourcesFooter;
