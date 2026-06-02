import React, { useState } from 'react';
import '../assets/css/InterventionsPanel.css';
import '../assets/css/CategoryBadges.css';
import catalogData from '../assets/data/interventions_catalog.json';
import supplementsCatalog from '../assets/data/supplements_catalog.json';
import dietsCatalog from '../assets/data/diets_catalog.json';
import protocolsCatalog from '../assets/data/protocols_catalog.json';
import backlogMd from '../../../../docs/development/BACKLOG.md?raw';

const backlogVersion = (() => {
  const lines = backlogMd.split('\n');
  const verLine = lines.find(l => l.startsWith('> ver '));
  return verLine ? verLine.replace(/^>\s*/, '').replace(/, \d{2}:\d{2}$/, '').replace(' | ', ' · ') : '0.10.3';
})();

const InterventionsPanel = ({ profileId, onDragStart, cartItems, onAddToCart, onRemoveFromCart, onOrderPlan }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [supplementGroup, setSupplementGroup] = useState('all');
  const [foodGroup, setFoodGroup] = useState('all');
  const [tab, setTab] = useState('interventions');
  const [expandedProtocol, setExpandedProtocol] = useState(null);
  const [showBacklog, setShowBacklog] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [protocolCategory, setProtocolCategory] = useState('all');
  const [showLegend, setShowLegend] = useState(false);

  const protocolCategories = [
    { key: 'all', label: 'Все', color: '#6b21c8' },
    { key: 'nutritional', label: 'Питание', color: '#f57c00' },
    { key: 'medical', label: 'Медицина', color: '#d32f2f' },
    { key: 'mental', label: 'Ментальный', color: '#7b1fa2' },
    { key: 'physical', label: 'Физический', color: '#388e3c' },
  ];

  const filteredProtocols = protocolCategory === 'all'
    ? protocolsCatalog
    : protocolsCatalog.filter(p => p.category === protocolCategory);

  const categories = [
    { key: 'all', label: 'Все', color: '#6b21c8' },
    { key: 'sleep', label: 'Сон', color: '#1976d2' },
    { key: 'physical', label: 'Физический', color: '#388e3c' },
    { key: 'mental', label: 'Ментальный', color: '#7b1fa2' },
    { key: 'food', label: 'Питание', color: '#f57c00' },
    { key: 'medical', label: 'мед', color: '#d32f2f' },
    { key: 'supplement', label: 'Добавки', color: '#795548' },
  ];

  const supplementGroups = [
    { key: 'all', label: 'Все', color: '#6b21c8' },
    { key: 'vitamins', label: 'Витамины', color: '#2196f3' },
    { key: 'vitamin_like', label: 'Витаминоподобные', color: '#9c27b0' },
    { key: 'minerals', label: 'Минералы', color: '#4caf50' },
  ];

  const foodGroups = [
    { key: 'all', label: 'Все', color: '#6b21c8' },
    { key: 'diet', label: 'Диеты', color: '#e65100' },
    { key: 'habit', label: 'Пищевые привычки', color: '#f9a825' },
  ];

  const interventions = [];
  Object.entries(catalogData.interventions || {}).forEach(([code, entry]) => {
    interventions.push({
      code,
      name: entry.name,
      category: entry.category,
      color: entry.color,
      impact: entry.impact,
      regularity: entry.regularity || 'D',
      type: entry.type,
      evidence: entry.evidence,
      description: entry.short_description || entry.full_description,
    });
  });

  const filteredSupplements = supplementGroup === 'all'
    ? supplementsCatalog
    : supplementsCatalog.filter(s => s.group === supplementGroup);

  const filteredDiets = foodGroup === 'all'
    ? dietsCatalog
    : dietsCatalog.filter(d => d.foodGroup === foodGroup);

  const filteredInterventions = activeCategory === 'supplement'
    ? filteredSupplements
    : activeCategory === 'food'
      ? filteredDiets
      : activeCategory === 'all'
        ? [...interventions, ...supplementsCatalog]
        : interventions.filter(i => i.category === activeCategory);

  const getImpactColor = (impact) => {
    if (impact >= 9) return '#d50000';
    if (impact >= 8) return '#ff9100';
    return '#ffd600';
  };

  const getEvidenceBadge = (evidence) => {
    const colors = { A: '#00c853', B: '#ff9100', C: '#ffd600', D: '#d50000' };
    return colors[evidence] || '#757575';
  };

  const getCategoryColor = (category) => {
    const catColors = {
      sleep: '#1976d2',
      physical: '#388e3c',
      mental: '#7b1fa2',
      food: '#f57c00',
      medical: '#d32f2f',
      supplement: '#795548',
    };
    return catColors[category] || '#6b21c8';
  };

  return (
    <div className="interventions-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          <button className={`panel-tab ${tab === 'interventions' ? 'active' : ''}`} onClick={() => setTab('interventions')}>Интервенции</button>
          <button className={`panel-tab ${tab === 'protocols' ? 'active' : ''}`} onClick={() => setTab('protocols')}>Протоколы</button>
        </div>
        <span className="version-link" onClick={() => setShowBacklog(true)}>ver {backlogVersion}</span>
      </div>

      {/* Compact Cart Widgets */}
      {cartItems && cartItems.length > 0 && (
        <div className="cart-widgets-panel">
          <div className="cart-widgets-header">
            <span>Корзина ({cartItems.length})</span>
            <button className="cart-clear-btn" onClick={() => cartItems.forEach(i => onRemoveFromCart(i.code))}>×</button>
          </div>
          <button
            className="order-plan-btn"
            onClick={() => onOrderPlan && onOrderPlan(cartItems)}
            title="Разместить все интервенции из корзины на таймлайне"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            Заказать План
          </button>
          <div className="cart-widgets-wrap">
            {cartItems.map(item => {
              const catColor = item.color || '#6b21c8';
              return (
                <div
                  key={item.code}
                  className="compact-cart-badge"
                  style={{ '--cat-color': catColor }}
                  title={item.name}
                >
                  <span className="badge-index">{item.code}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'interventions' && (
        <>
          <div className="category-filters">
              {categories.map(cat => (
              <button
                key={cat.key}
                className={`cat-btn cat-${cat.key} ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
              <button className="cat-btn legend-btn" onClick={() => setShowLegend(!showLegend)} title="Пояснение сокращений">?</button>
          </div>

          {activeCategory === 'supplement' && (
            <div className="supplement-subgroups">
              {supplementGroups.map(g => (
                <button
                  key={g.key}
                  className={`cat-btn sm sup-${g.key} ${supplementGroup === g.key ? 'active' : ''}`}
                  onClick={() => setSupplementGroup(g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {activeCategory === 'food' && (
            <div className="supplement-subgroups">
              {foodGroups.map(g => (
                <button
                  key={g.key}
                  className={`cat-btn sm food-${g.key} ${foodGroup === g.key ? 'active' : ''}`}
                  onClick={() => setFoodGroup(g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          <div className="interventions-table">
            <div className="table-header">
              <span className="col-code">Код</span>
              <span className="col-name">Название</span>
              {activeCategory === 'supplement' && <span className="col-class">Тип</span>}
              <span className="col-impact">I</span>
              <span className="col-evidence">E</span>
              <span className="col-regularity">Per</span>
            </div>
            {filteredInterventions.map(intervention => {
              const isSubItem = intervention.classification || intervention.foodGroup;
              return (
              <div
                key={intervention.code}
                className={`table-row ${isSubItem ? 'sup-row' : ''}`}
                onClick={() => {
                  if (isSubItem) {
                    setSelectedSupplement(intervention);
                  } else {
                    setSelectedIntervention(intervention);
                  }
                }}
                style={{ cursor: 'pointer', borderLeftColor: getCategoryColor(intervention.category || 'supplement') }}
                title={isSubItem ? 'Клик: подробная информация' : 'Клик: карточка интервенции'}
              >
                 <span className="col-code">{intervention.code}</span>
                 <span className="col-name">{intervention.name}</span>
                 {activeCategory === 'supplement' && (
                    <span className={`col-class ${intervention.classification === 'мед' ? 'class-med' : 'class-nutr'}`}>
                     {intervention.classification}
                   </span>
                 )}
                 <span className="col-impact" style={{ color: getImpactColor(intervention.impact) }}>
                  {intervention.impact}
                 </span>
                 <span className="col-evidence" style={{ color: getEvidenceBadge(intervention.evidence) }}>
                  {intervention.evidence}
                 </span>
                  <span className="col-regularity">
                   {intervention.regularity}
                  </span>
                  <span className="col-actions">
                    {cartItems && cartItems.find(c => c.code === intervention.code) ? (
                      <button className="cart-toggle-btn remove" onClick={(e) => { e.stopPropagation(); onRemoveFromCart(intervention.code); }}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    ) : (
                      <button className="cart-toggle-btn add" onClick={(e) => { e.stopPropagation(); onAddToCart(intervention); }}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    )}
                  </span>
               </div>
              );
            })}
          </div>

          {showLegend && (
            <div className="supplement-popup-overlay" onClick={() => setShowLegend(false)}>
              <div className="supplement-popup" onClick={e => e.stopPropagation()} style={{ maxWidth: '320px' }}>
                <div className="supplement-popup-header" style={{ borderLeftColor: '#6b21c8' }}>
                  <h3 style={{ margin: 0, fontSize: '14px' }}>Пояснение сокращений</h3>
                  <button className="supplement-popup-close" onClick={() => setShowLegend(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="supplement-popup-body">
                  <div className="legend-item">
                    <span className="legend-symbol">I</span>
                    <span className="legend-desc">Impact — сила воздействия (1–10)<br/><span className="legend-example">9–10: высокая &nbsp; 5–8: средняя &nbsp; 1–4: низкая</span></span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-symbol">E</span>
                    <span className="legend-desc">Evidence — уровень доказательности (A–D)<br/><span className="legend-example">A: мета-анализы &nbsp; B: РКИ &nbsp; C: наблюд. &nbsp; D: эксперты</span></span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-symbol">Per</span>
                    <span className="legend-desc">Period — периодичность<br/><span className="legend-example">D: ежедневно &nbsp; W: еженедельно &nbsp; M: ежемесячно &nbsp; Y: ежегодно &nbsp; P: по требованию</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {tab === 'protocols' && (
        <>
          <div className="protocol-category-filters">
            {protocolCategories.map(cat => (
              <button key={cat.key} className={`cat-btn ${protocolCategory === cat.key ? 'active' : ''}`} style={protocolCategory === cat.key ? {background:cat.color,borderColor:cat.color,color:'#fff'} : {}}
                onClick={() => setProtocolCategory(cat.key)}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="protocols-list">
          {filteredProtocols.map(p => {
            const isExpanded = expandedProtocol === p.id;
            const toggle = () => setExpandedProtocol(isExpanded ? null : p.id);
            return (
              <div key={p.id} className={`protocol-card ${p.id === 'OZEMPIC_JUMPERS' ? 'protocol-danger' : ''} ${isExpanded ? 'expanded' : ''}`}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', p.id);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={toggle}>
                <div className="protocol-card-header">
                  <span className="protocol-card-name">{p.name_ru} <span className="protocol-card-count">{p.interventions.length}</span></span>
                  <span className="protocol-card-id">{p.protocol_id}</span>
                  <span className={`protocol-card-cat ${p.category}`}>{p.category === 'nutritional' ? 'Питание' : p.category === 'medical' ? 'Медицина' : p.category === 'mental' ? 'Ментальный' : p.category === 'physical' ? 'Физический' : p.category}</span>
                  <button className="protocol-info-btn" onClick={(e) => { e.stopPropagation(); setSelectedProtocol(p); }} title="Подробнее">ℹ️</button>
                  <span className="protocol-chevron">{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div className="protocol-card-body" onClick={e => e.stopPropagation()}>
                    <p className="protocol-card-goal">{p.goal_ru}</p>
                    <div className="protocol-card-interventions">
                      {p.interventions.map(code => {
                        const interv = interventions.find(i => i.code === code);
                        return interv ? (
                          <span key={code} className="protocol-interv-badge" style={{ borderLeftColor: getCategoryColor(interv.category) }}>
                            {interv.name}
                          </span>
                        ) : (
                          <span key={code} className="protocol-interv-badge" style={{ borderLeftColor: '#d50000' }}>{code}</span>
                        );
                      })}
                    </div>
                    {p.red_flags && p.red_flags.length > 0 && (
                      <div className="protocol-section">
                        <div className="protocol-section-title">🚩 Красные флаги</div>
                        {p.red_flags.map((rf, i) => (
                          <div key={i} className="protocol-flag-item" title={rf.action}>
                            <span className="protocol-flag-metric">{rf.metric}</span>
                            <span className="protocol-flag-threshold">{rf.threshold}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {p.recommendations && p.recommendations.length > 0 && (
                      <div className="protocol-section">
                        <div className="protocol-section-title">✓ Рекомендации</div>
                        {p.recommendations.map((r, i) => (
                          <div key={i} className="protocol-rec-item">{r}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </>
      )}

      {selectedProtocol && (
        <div className="supplement-popup-overlay" onClick={() => setSelectedProtocol(null)}>
          <div className="supplement-popup" onClick={e => e.stopPropagation()}>
            <div className="supplement-popup-header" style={{ borderLeftColor: selectedProtocol.category === 'medical' ? '#d32f2f' : selectedProtocol.category === 'nutritional' ? '#f57c00' : selectedProtocol.category === 'mental' ? '#7b1fa2' : '#388e3c' }}>
              <span className="supplement-popup-code">{selectedProtocol.protocol_id}</span>
              <h3>{selectedProtocol.name_ru}</h3>
              <button className="supplement-popup-close" onClick={() => setSelectedProtocol(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="supplement-popup-body">
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Цель</span>
                <span className="supplement-popup-value">{selectedProtocol.goal_ru}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Категория</span>
                <span className="supplement-popup-value">{selectedProtocol.category === 'nutritional' ? 'Питание' : selectedProtocol.category === 'medical' ? 'Медицина' : selectedProtocol.category === 'mental' ? 'Ментальный' : selectedProtocol.category === 'physical' ? 'Физический' : selectedProtocol.category}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Интервенций</span>
                <span className="supplement-popup-value">{selectedProtocol.interventions.length}</span>
              </div>
              <div className="supplement-popup-row" style={{display:'block',padding:'8px 0'}}>
                <span className="supplement-popup-label" style={{display:'block',marginBottom:4}}>Интервенции</span>
                <div className="protocol-card-interventions">
                  {selectedProtocol.interventions.map(code => {
                    const interv = interventions.find(i => i.code === code);
                    return interv ? (
                      <span key={code} className="protocol-interv-badge" style={{ borderLeftColor: getCategoryColor(interv.category) }}>{interv.name}</span>
                    ) : (
                      <span key={code} className="protocol-interv-badge" style={{ borderLeftColor: '#d50000' }}>{code}</span>
                    );
                  })}
                </div>
              </div>
              {selectedProtocol.red_flags && selectedProtocol.red_flags.length > 0 && (
                <div className="supplement-popup-row" style={{display:'block',padding:'8px 0'}}>
                  <span className="supplement-popup-label" style={{display:'block',marginBottom:4}}>🚩 Красные флаги</span>
                  {selectedProtocol.red_flags.map((rf, i) => (
                    <div key={i} className="protocol-flag-item" style={{marginBottom:2}}>
                      <span className="protocol-flag-metric">{rf.metric}</span>
                      <span className="protocol-flag-threshold">{rf.threshold}</span>
                    </div>
                  ))}
                </div>
              )}
              {selectedProtocol.recommendations && selectedProtocol.recommendations.length > 0 && (
                <div className="supplement-popup-row" style={{display:'block',padding:'8px 0'}}>
                  <span className="supplement-popup-label" style={{display:'block',marginBottom:4}}>✓ Рекомендации</span>
                  {selectedProtocol.recommendations.map((r, i) => (
                    <div key={i} className="protocol-rec-item" style={{marginBottom:2}}>{r}</div>
                  ))}
                </div>
              )}
              {selectedProtocol.relevance_params && (
                <div className="supplement-popup-row">
                  <span className="supplement-popup-label">Параметры ЦД</span>
                  <span className="supplement-popup-value" style={{fontSize:10}}>{selectedProtocol.relevance_params}</span>
                </div>
              )}
              {selectedProtocol.name_en && (
                <div className="supplement-popup-row">
                  <span className="supplement-popup-label">English</span>
                  <span className="supplement-popup-value">{selectedProtocol.name_en}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedSupplement && (
        <div className="supplement-popup-overlay" onClick={() => setSelectedSupplement(null)}>
          <div className="supplement-popup" onClick={e => e.stopPropagation()}>
            <div className="supplement-popup-header" style={{ borderLeftColor: selectedSupplement.classification === 'мед' ? '#d32f2f' : '#795548' }}>
              <span className="supplement-popup-code">{selectedSupplement.code}</span>
              <h3>{selectedSupplement.name}</h3>
              <button className="supplement-popup-close" onClick={() => setSelectedSupplement(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="supplement-popup-body">
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Описание</span>
                <span className="supplement-popup-value">{selectedSupplement.description || 'Нет данных'}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Тип</span>
                <span className={`supplement-popup-value ${selectedSupplement.classification === 'мед' ? 'class-med' : 'class-nutr'}`}>
                  {selectedSupplement.classification === 'мед' ? '🏥 мед' : '🌿 нутри'}
                </span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Воздействие</span>
                <span className="supplement-popup-value" style={{ color: getImpactColor(selectedSupplement.impact) }}>{selectedSupplement.impact}/10</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Доказательность</span>
                <span className="supplement-popup-value" style={{ color: getEvidenceBadge(selectedSupplement.evidence) }}>{selectedSupplement.evidence}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Периодичность</span>
                <span className="supplement-popup-value">Ежедневно</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Источник</span>
                <span className="supplement-popup-value">{selectedSupplement.file || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedIntervention && (
        <div className="supplement-popup-overlay" onClick={() => setSelectedIntervention(null)}>
          <div className="supplement-popup" onClick={e => e.stopPropagation()}>
            <div className="supplement-popup-header" style={{ borderLeftColor: getCategoryColor(selectedIntervention.category) }}>
              <span className="supplement-popup-code">{selectedIntervention.code}</span>
              <h3>{selectedIntervention.name}</h3>
              <button className="supplement-popup-close" onClick={() => setSelectedIntervention(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="supplement-popup-body">
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Описание</span>
                <span className="supplement-popup-value">{selectedIntervention.description || 'Нет данных'}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Категория</span>
                <span className="supplement-popup-value" style={{ color: getCategoryColor(selectedIntervention.category) }}>
                  {categories.find(c => c.key === selectedIntervention.category)?.label || selectedIntervention.category}
                </span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Воздействие</span>
                <span className="supplement-popup-value" style={{ color: getImpactColor(selectedIntervention.impact) }}>{selectedIntervention.impact}/10</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Доказательность</span>
                <span className="supplement-popup-value" style={{ color: getEvidenceBadge(selectedIntervention.evidence) }}>{selectedIntervention.evidence}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Периодичность</span>
                <span className="supplement-popup-value">{selectedIntervention.regularity}</span>
              </div>
              <div className="supplement-popup-row">
                <span className="supplement-popup-label">Протоколы</span>
                <span className="supplement-popup-value">
                  {(() => {
                    const linked = protocols.filter(p => p.interventions.includes(selectedIntervention.code));
                    return linked.length > 0
                      ? linked.map(p => (
                          <span key={p.id} className={`protocol-interv-badge ${p.id === 'OZEMPIC_JUMPERS' ? 'protocol-danger' : ''}`} style={{ display: 'inline-block', margin: '2px 4px', borderLeftColor: p.category === 'medical' ? '#d32f2f' : p.category === 'nutritional' ? '#f57c00' : p.category === 'mental' ? '#7b1fa2' : '#388e3c' }}>
                            {p.name}
                          </span>
                        ))
                      : 'Не входит в протоколы';
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBacklog && (
        <div className="backlog-overlay" onClick={() => setShowBacklog(false)}>
          <div className="backlog-modal" onClick={e => e.stopPropagation()}>
            <div className="backlog-header">
              <span>Healora — Backlog <span className="backlog-summary"><strong>101</strong>/128 · <strong>312</strong>/670 ч</span></span>
              <span className="version-build">ver 0.10.3 · 13.05.2026</span>
              <span className="backlog-close" onClick={() => setShowBacklog(false)}>×</span>
            </div>
            <div className="backlog-body">

              <h2 className="md-h2">Recent Updates (14–15.05.2026)</h2>

              <h3 className="md-h3">15.05.2026</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Voice popup redesign</b> — Always-visible form with per-field inputs, settings gear (language 8 langs, mic device picker with level meter via AnalyserNode), transcript preview with correction, per-field record button</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Parameter history</b> — profileOverrides + paramHistory in localStorage, getAttrCurrent helper, 7 weekday columns in attr table showing recent values</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Export twin data</b> — JSON download with profile, overrides, history, plans, interventions</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Preference badges</b> — Toggle badges (вегетарианство, только РКИ) + custom text field, persisted in localStorage, included in export</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Icon cleanup</b> — Mic icon replaced with pencil edit icon in section header, voice popup header, per-field buttons</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Profile header mic→edit</b> — Mic button moved to bullet position, opens editor popup</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Weekday column fix</b> — Only show values that differ from original (<code>attr.current</code>), loose comparison</li>
              </ul>

              <h3 className="md-h3">14.05.2026</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Inline edit persistence</b> — saveEdit writes to profileOverrides + paramHistory</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Weekday columns</b> — 7 columns (today + 6 previous) in attr grid, CSS grid <code>repeat(7, 45px)</code></li>
                <li className="md-done"><span className="md-check">✓</span> <b>Deploy cleanup</b> — Stale asset cleanup on server</li>
              </ul>

              <h2 className="md-h2">Recent Updates (12–13.05.2026)</h2>

              <h3 className="md-h3">13.05.2026</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Backlog modal</b> — Displays structured BACKLOG.md view (✓/□ checkboxes, h2/h3 headers, hr, clickable repo link, version footer)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Chat interface</b> — Full chat UI with intervention cards (checkbox, points, category badge), task states, optimistic UI, colorful timeline badges grouped by day</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Treatment plans</b> — Medical prescription popup layout with protocols/interventions table, plan per twin in localStorage, plan status badge in profile header</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Collapsible track timeline</b> — N интервенций · M всего summary line, chevron toggle, Дни/Недели/Фазы view switcher</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan search dropdown</b> — Searchable window by client name/ID, lists all saved plans with counts and status</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Enhanced intervention log</b> — Day separators with date (YYYY.MM.DD), day nav buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Tasks popup</b> — Unique plan intervention codes with assignment count, completed count, percentage</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan prescription table</b> — Alternating rows (#fafaff), hover (#f0edff), purple protocol/intervention status dots</li>
              </ul>

              <h3 className="md-h3">12.05.2026 (afternoon)</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Supplements catalog</b> — Loaded from <code>supplements_catalog.json</code> with group field (vitamins/vitamin-like/minerals), classification (мед/нутри), popup detail view</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Diets catalog</b> — Loaded from <code>diets_catalog.json</code> with foodGroup field (diet/habit), subgroup filter buttons</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Protocol cards</b> — Expand/collapse with red flags (🚩), recommendations, category badges, danger style for Ozempic protocol</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Intervention detail popup</b> — Shows description, category, impact/10, evidence (A–D), regularity, linked protocols</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Legend popup</b> — I/E/Per explanation with examples (I: 1–10, E: A–D, Per: D/W/M/Y/P)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Cart widgets panel</b> — Compact badges with remove button, "Заказать План" button, item count</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Tab split</b> — Интервенции / Протоколы tabs in interventions panel</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Chat timeline badges</b> — Colored intervention badges in rows grouped by day, opacity matches timeline dots (1/0.2), filtered to simulationDay-3 window</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Stop button</b> — Chat header stop button</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Profile-id</b> — Hidden by default, shown on card hover (below avatar + parentheses after name)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Panels resize</b> — 200px sidebar / 320px interventions panel</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Main-content padding</b> — Reduced to 7px</li>
                <li className="md-done"><span className="md-check">✓</span> <b>UserAvatarPanel styles</b> — Moved from inline to CSS</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Vite config fix</b> — loadEnv for base path to avoid Git Bash BASE_PATH conflict</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Diary storage</b> — API (JSON POST/GET), UI with day switching, food photo display, KBZU, NDI</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Proxy config</b> — Vite dev proxy + nginx prod config</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Duplicate CSS removal</b> — .profile-card dups cleaned from shared.css</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Backlog-modal width</b> — Increased to 580px</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Favicon</b> — Added to www root + digital-twin subfolder</li>
              </ul>

              <hr className="md-hr" />

              <h2 className="md-h2">MVP (Phase 1: 1-3 months)</h2>

              <h3 className="md-h3">Core UX</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Backlog Modal</b> — Structured BACKLOG.md view with version info</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Favicon</b> — Add favicon.svg to www root, fix 404 error</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Profile-screen</b> — Fix switchScreen() to locate profile-screen div</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Context Tips Panel</b> — Add bottom 15% panel with explanations in info-panel</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Drag & Drop Logging</b> — Log drag actions to right "Under the Hood" panel</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Close Button</b> — Ensure redirect to https://healora.ru/</li>
              </ul>

              <h3 className="md-h3">Onboarding</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Slide 1</b> — Stars motivation screen (earn stars for completed tasks)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Slide 2</b> — 5 upgrade directions (Knowledge, Activity, Recovery, Nutrition, Specialists)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Slide 3</b> — Quick level test intro</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Quiz</b> — 5 questions to calculate Healora Score (0-100)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Quiz Logic</b> — Map score to tiers (Emerging → Transformational)</li>
              </ul>

              <h3 className="md-h3">Chat Interface (Сообщения)</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Chat Timeline Badges</b> — Colored intervention badges in rows, grouped by day, opacity matched</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Badge Filter</b> — Filtered to simulationDay-3 window</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Stop Button</b> — Chat header stop button</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Full Badge History</b> — Show full history in chat</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Task Cards</b> — Cards with checkbox, points, category badge</li>
                <li className="md-done"><span className="md-check">✓</span> <b>States</b> — Not started → In progress → Completed (with animation)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Optimistic UI</b> — Instant points update</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Filters</b> — All, Питание, Активность, Знания badges</li>
              </ul>

              <h3 className="md-h3">Intervention Buttons</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>"Что поесть"</b> — Nutrition recommendations</li>
                <li className="md-todo"><span className="md-box"> </span> <b>"Что почитать"</b> — PubMed articles</li>
                <li className="md-todo"><span className="md-box"> </span> <b>"Научи"</b> — Scientific facts and mechanisms</li>
                <li className="md-todo"><span className="md-box"> </span> <b>"Новости"</b> — Weight management latest discoveries</li>
              </ul>

              <h3 className="md-h3">Navigation (Bottom)</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Сообщения</b> — Chat/tasks screen</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Путь</b> — Longevity Path progress</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Цели</b> — Goal tracking (weight, activity, sleep)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Профиль</b> — Stats, level, stars, 52 biomedical parameters</li>
              </ul>

              <h3 className="md-h3">Digital Twin</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Enhanced Intervention Log</b> — Day separators with date, day nav buttons (◀ Все дни ▶), tasks badge/popup, activated/skipped highlighting, stars, day filter</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Tasks Popup</b> — Unique plan intervention codes with assignment count, completed count, percentage</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan Search Dropdown</b> — Searchable by client name/ID, lists all saved plans with counts and status</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Collapsible Track Timeline</b> — Summary line, chevron toggle, Дни/Недели/Фазы view switcher</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan Prescription Table</b> — Alternating rows (#fafaff), hover (#f0edff), purple status dots</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Protocol Cards</b> — Expand/collapse with red flags, recommendations, category badges, protocol-danger style</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Supplements Catalog</b> — Groups (vitamins/vitamin-like/minerals), classification (мед/нутри), detail popup</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Diets Catalog</b> — Food groups (diet/habit), subgroup filters</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Intervention Detail Popup</b> — Description, category, impact, evidence, regularity, linked protocols</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Legend Popup</b> — I/E/Per explanations with examples</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Cart Widgets Panel</b> — Compact badges, order plan button, remove from cart</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Tab Split</b> — Интервенции / Протоколы tabs</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Treatment Plan Popup</b> — Medical prescription layout with protocols/interventions table</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan per twin</b> — Each twin has own plan stored in localStorage via PlansProvider context</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan Status Badge</b> — Inline indicator in profile-header-card (protocol/intervention counts)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Interventions Panel</b> — 290px wide, category filters</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Category Badge Colors</b> — Per-category `.cat-*`/`.sup-*`/`.food-*` styles in separate CSS</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Action Buttons</b> — Green/blue/orange/purple per button role</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Simulation 30 days</b> — Reduced from 90 to 30 days across all locations</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Empty Plan Guide</b> — Positive wishes + step-by-step guidance when no interventions</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Data Sources Panel</b> (left) — Draggable items: Wearables, Voice, Medical, Food Photos, Genetics, Mental</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Drop Zone</b> — Accept dropped sources → trigger AI analysis</li>
                <li className="md-done"><span className="md-check">✓</span> <b>ML Model Stub</b> — Input (HRrest, HRpeak, HRR, BMI, waist, BP) → risk output</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Adaptivity</b> — Difficulty based on Health Literacy Score</li>
              </ul>

              <h3 className="md-h3">Points System</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Basic Tasks</b> — 5-10 points (water, steps, sleep)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Medium Tasks</b> — 15-25 points (recipes, 20-30 min workouts)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Hard Tasks</b> — 30-50 points (meal prep, sugar-free)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Streak Bonus</b> — +5 for consecutive days</li>
                <li className="md-todo"><span className="md-box"> </span> <b>On-time Bonus</b> — +10 for completing in time</li>
                <li className="md-todo"><span className="md-box"> </span> <b>No penalties</b> — Positive reinforcement only</li>
              </ul>

              <h3 className="md-h3">Categories (5 tracks)</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Знания</b> — Knowledge tasks (320 pts example)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Активность</b> — Activity tasks (280 pts example)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Восстановление</b> — Recovery tasks (140 pts example)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Питание</b> — Nutrition tasks (240 pts example)</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Специалисты</b> — Specialists tasks (180 pts example)</li>
              </ul>

              <h3 className="md-h3">Goals & Progress</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Weight Goal</b> — Track weight loss progress (-3.2kg / -5kg)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Activity Goal</b> — Steps tracking (8,432 / 10,000)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Sleep Goal</b> — Hours tracking (7.5h / 8h)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Progress Bars</b> — Visual percentage display</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Healora Score</b> — 6-metric radar chart, stars display, profile health assessment</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Health Radar</b> — SVG radar chart (sleep, stress, steps, BMI, BP, glucose)</li>
              </ul>

              <h3 className="md-h3">Achievements</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Первый шаг</b> — 3 tasks in a row</li>
                <li className="md-todo"><span className="md-box"> </span> <b>На огне</b> — 7 days without missing</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Баланс</b> ≥50 points in each category per week</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Минус 2 кг</b> — Weight tracker integration</li>
              </ul>

              <h3 className="md-h3">Under the Hood Panel</h3>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Healora Score Display</b> — Show current tier and score</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Action Log</b> — Log: completed tasks, uploads, quiz results, bonuses</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Technical Info</b> — Show risk assessment output</li>
              </ul>

              <h3 className="md-h3">Profile & Assets</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Profile-id UI</b> — Hidden by default, shown on card hover (below avatar + parentheses)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Panel Resize</b> — Sidebar 200px, interventions panel 320px</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Main-content padding</b> — Reduced to 7px</li>
                <li className="md-done"><span className="md-check">✓</span> <b>UserAvatarPanel CSS</b> — Extracted from inline to dedicated stylesheet</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Profile Photos</b> — 30 avatar images with 32×32 and 150×150 thumbnails</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Image Optimization</b> — PNG8 quantization, ≤512KB per source image</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Classification Rename</b> — "Медицинский" → "мед", "Нутрицевтик" → "нутри"</li>
              </ul>

              <h3 className="md-h3">Plan Templates</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Template Library</b> — 11 protocol-aligned treatment plan templates (markdown + JS module)</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Plan Popup Redesign</b> — Medical prescription header, template selector, QR code, PDF export</li>
                <li className="md-done"><span className="md-check">✓</span> <b>QR Code</b> — qrcode.react v4 (QRCodeSVG) for plan sharing</li>
              </ul>

              <h3 className="md-h3">Infrastructure</h3>
              <ul className="md-list">
                <li className="md-done"><span className="md-check">✓</span> <b>Vite config fix</b> — loadEnv for base path, Git Bash BASE_PATH conflict resolved</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Diary storage API</b> — JSON POST/GET endpoints with profile_id + day validation</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Proxy config</b> — Vite dev proxy + nginx production config</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Duplicate CSS cleanup</b> — Removed .profile-card dups from shared.css</li>
              </ul>

              <hr className="md-hr" />

              <h2 className="md-h2">V1 (Phase 2: 4-8 months)</h2>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>Liquid Biopsy Integration</b> — Blood test results import</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Bayesian Calibration</b> — probabilistic health scoring</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Wearable Sync</b> — Apple Watch, Oura, Whoop API integration</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Genetic Data Import</b> — 23andMe, AncestryDNA parser</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Food Photo Analysis</b> — Computer vision KBJU calculation</li>
                <li className="md-done"><span className="md-check">✓</span> <b>Voice Input</b> — Speech-to-text symptom logging, editable transcripts, per-field recording, settings with language/mic selection</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Advanced ML Model</b> — Multi-parameter risk prediction</li>
              </ul>

              <hr className="md-hr" />

              <h2 className="md-h2">Scale (Phase 3: 9-18 months)</h2>
              <ul className="md-list">
                <li className="md-todo"><span className="md-box"> </span> <b>RL Optimizer</b> — Reinforcement learning for task recommendations</li>
                <li className="md-todo"><span className="md-box"> </span> <b>FDA/EMA Pathway</b> — Regulatory compliance</li>
                <li className="md-todo"><span className="md-box"> </span> <b>B2B White-label API</b> — For clinics</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Pro Plan for Nutriologists</b> — $49/month, saves 10h/week</li>
                <li className="md-todo"><span className="md-box"> </span> <b>Genetic Add-on</b> — $29.99 one-time upsell</li>
              </ul>

              <hr className="md-hr" />

              <h2 className="md-h2">Tech Stack</h2>
              <ul className="md-list md-tech">
                <li><b>Frontend:</b> React + Vite (JSX components)</li>
                <li><b>Backend:</b> Beget server (217.114.8.5), Node.js API</li>
                <li><b>Deploy:</b> devops.sh script</li>
                <li><b>Repo:</b> <a href="https://github.com/NutriLabAdm/healora" target="_blank" rel="noopener">github.com/NutriLabAdm/healora</a></li>
                <li><b>Storage:</b> localStorage for per-twin plans (PlansProvider context)</li>
                <li><b>QR:</b> qrcode.react v4 (QRCodeSVG)</li>
                <li><b>Charts:</b> SVG inline (no heavy lib)</li>
              </ul>

              <div className="md-footer">Created: April 2026 | ver 0.10.3 | Based on PRODUCT_DESCRIPTION.md</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionsPanel;
