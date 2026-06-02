import React, { useState, useMemo } from 'react';
import protocolsCatalog from '../assets/data/protocols_catalog.json';
import '../assets/css/KnowledgeModule.css';

const CATEGORY_COLORS = {
  nutritional: '#f57c00', medical: '#d32f2f', mental: '#7b1fa2',
  physical: '#388e3c', nutrition: '#f57c00',
};

const CATEGORY_LABELS = {
  nutritional: 'Питание', medical: 'Медицина', mental: 'Ментальный',
  physical: 'Физический', nutrition: 'Питание',
};

const KnowledgeModule = () => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const keys = [...new Set(protocolsCatalog.map(p => p.category))];
    const labels = {};
    keys.forEach(k => { labels[k] = CATEGORY_LABELS[k] || k; });
    return { keys, labels };
  }, []);

  const filtered = useMemo(() => {
    let list = protocolsCatalog;
    if (catFilter !== 'all') list = list.filter(p => p.category === catFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.name_ru || '').toLowerCase().includes(q) ||
        (p.name_en || '').toLowerCase().includes(q) ||
        (p.protocol_id || '').toLowerCase().includes(q) ||
        (p.goal_ru || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [catFilter, search]);

  return (
    <div className="km2">
      {/* LEFT PANEL - список */}
      <div className="km2-left">
        <div className="km2-left-header">
          <h1 className="km2-title">База знаний</h1>
          <p className="km2-subtitle">{protocolsCatalog.length} протоколов</p>
        </div>
        <div className="km2-controls">
          <input className="km2-search" type="text" placeholder="Поиск протоколов..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="km2-filters">
            <button className={`km2-fbtn ${catFilter === 'all' ? 'active' : ''}`} onClick={() => setCatFilter('all')}>Все</button>
            {categories.keys.map(k => (
              <button key={k} className={`km2-fbtn ${catFilter === k ? 'active' : ''}`}
                style={catFilter === k ? { background: CATEGORY_COLORS[k] || '#6b21c8', borderColor: CATEGORY_COLORS[k] || '#6b21c8', color: '#fff' } : {}}
                onClick={() => setCatFilter(k)}>
                {CATEGORY_LABELS[k] || k}
              </button>
            ))}
          </div>
        </div>
        <div className="km2-list">
          {filtered.map(p => (
            <div key={p.id} className={`km2-row ${selected && selected.id === p.id ? 'active' : ''}`}
              onClick={() => setSelected(p)}>
              <div className="km2-row-top">
                <span className="km2-row-badge" style={{ background: CATEGORY_COLORS[p.category] || '#6b21c8', color: '#fff' }}>{CATEGORY_LABELS[p.category] || p.category}</span>
                <span className="km2-row-id">{p.protocol_id}</span>
              </div>
              <div className="km2-row-title">{p.name_ru}</div>
              <div className="km2-row-goal">{p.goal_ru}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL - детальная страница */}
      <div className="km2-right">
        {!selected ? (
          <div className="km2-empty">Выберите протокол из списка</div>
        ) : (
          <div className="km2-detail">
            <div className="km2-detail-header">
              <span className="km2-detail-badge" style={{ background: CATEGORY_COLORS[selected.category] || '#6b21c8' }}>{selected.protocol_id}</span>
              <h2 className="km2-detail-title">{selected.name_ru}</h2>
              <button className="km2-detail-close" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="km2-detail-body">
              {/* Инфо */}
              <section className="km2-section">
                <div className="km2-info-grid">
                  <div className="km2-info-item">
                    <span className="km2-info-label">Категория</span>
                    <span className="km2-info-value">{CATEGORY_LABELS[selected.category] || selected.category}</span>
                  </div>
                  <div className="km2-info-item">
                    <span className="km2-info-label">Цель</span>
                    <span className="km2-info-value">{selected.goal_ru}</span>
                  </div>
                  {selected.name_en && (
                    <div className="km2-info-item">
                      <span className="km2-info-label">English</span>
                      <span className="km2-info-value">{selected.name_en}</span>
                    </div>
                  )}
                  <div className="km2-info-item">
                    <span className="km2-info-label">Интервенции</span>
                    <span className="km2-info-value">
                      <div className="km2-badges">
                        {selected.interventions.map(code => (
                          <span key={code} className="km2-badge-item">{code}</span>
                        ))}
                      </div>
                    </span>
                  </div>
                </div>
              </section>

              {/* Красные флаги */}
              {selected.red_flags && selected.red_flags.length > 0 && (
                <section className="km2-section">
                  <h3 className="km2-section-title">Красные флаги</h3>
                  {selected.red_flags.map((rf, i) => (
                    <div key={i} className="km2-flag-row">
                      <span className="km2-flag-metric">{rf.metric}</span>
                      <span className="km2-flag-threshold">{rf.threshold}</span>
                      {rf.action && <span className="km2-flag-action">→ {rf.action}</span>}
                    </div>
                  ))}
                </section>
              )}

              {/* Рекомендации */}
              {selected.recommendations && selected.recommendations.length > 0 && (
                <section className="km2-section">
                  <h3 className="km2-section-title">Рекомендации</h3>
                  <ul className="km2-rec-list">
                    {selected.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </section>
              )}

              {/* Ссылки на исследования */}
              <section className="km2-section">
                <h3 className="km2-section-title">Ссылки на исследования</h3>
                {selected.research_links && selected.research_links.length > 0 ? (
                  <ul className="km2-ref-list">
                    {selected.research_links.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} target="_blank" rel="noopener">{link.title || link.url}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="km2-muted">Нет данных. Добавьте ссылки в protocols_catalog.json → research_links[].</p>
                )}
              </section>

              {/* Способы применения */}
              <section className="km2-section">
                <h3 className="km2-section-title">Способы применения</h3>
                {selected.usage_methods && selected.usage_methods.length > 0 ? (
                  <ul className="km2-rec-list">
                    {selected.usage_methods.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                ) : (
                  <p className="km2-muted">Нет данных. Добавьте usage_methods[] в protocols_catalog.json.</p>
                )}
              </section>

              {/* Сочетания с продуктами и БАДами */}
              <section className="km2-section">
                <h3 className="km2-section-title">Сочетания с продуктами и биодобавками</h3>
                {selected.combinations ? (
                  <div className="km2-combo-grid">
                    {selected.combinations.foods && selected.combinations.foods.length > 0 && (
                      <div>
                        <h4 className="km2-combo-sub">Продукты</h4>
                        <div className="km2-badges">
                          {selected.combinations.foods.map((f, i) => <span key={i} className="km2-badge-item green">{f}</span>)}
                        </div>
                      </div>
                    )}
                    {selected.combinations.supplements && selected.combinations.supplements.length > 0 && (
                      <div>
                        <h4 className="km2-combo-sub">БАДы</h4>
                        <div className="km2-badges">
                          {selected.combinations.supplements.map((s, i) => <span key={i} className="km2-badge-item purple">{s}</span>)}
                        </div>
                      </div>
                    )}
                    {(!selected.combinations.foods || selected.combinations.foods.length === 0) && (!selected.combinations.supplements || selected.combinations.supplements.length === 0) && (
                      <p className="km2-muted">Нет данных. Добавьте combinations.foods[] / .supplements[] в protocols_catalog.json.</p>
                    )}
                  </div>
                ) : (
                    <p className="km2-muted">Нет данных. Добавьте combinations (foods + supplements) в protocols_catalog.json.</p>
                )}
              </section>

              {/* Факторы-ингибиторы */}
              <section className="km2-section">
                <h3 className="km2-section-title">Факторы-ингибиторы</h3>
                {selected.inhibitors && selected.inhibitors.length > 0 ? (
                  <ul className="km2-inhib-list">
                    {selected.inhibitors.map((inh, i) => (
                      <li key={i}>
                        <span className="km2-inhib-factor">{inh.factor}</span>
                        {inh.effect && <span className="km2-inhib-effect"> — {inh.effect}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                   <p className="km2-muted">Нет данных. Добавьте inhibitors[] (factor + effect) в protocols_catalog.json.</p>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeModule;
