import React, { useState, useEffect } from 'react';
import '../assets/css/KnowledgeAdmin.css';

const API = '/api/knowledge-admin';

function fetchJson(url, opts = {}) {
  const token = localStorage.getItem('token');
  return fetch(url, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers },
  }).then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); });
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="ka-tabs">
      {tabs.map(t => (
        <button key={t.key} className={`ka-tab ${active === t.key ? 'active' : ''}`} onClick={() => onChange(t.key)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function AnalyticsTab() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetchJson(`${API}/stats`).then(setStats).catch(console.error); }, []);

  if (!stats) return <div className="ka-loading">Загрузка аналитики...</div>;

  const palette = ['#4dabf7', '#69db7c', '#ffd43b', '#ff8787', '#da77f2', '#20c997'];
  const total = stats.total;
  const pending = stats.byStatus?.find(s => s.status === 'pending')?.count || 0;
  const approved = stats.byStatus?.find(s => s.status === 'approved')?.count || 0;

  return (
    <div className="ka-dashboard">
      <div className="ka-metrics">
        <div className="ka-metric"><span className="ka-metric-value">{total}</span><span className="ka-metric-label">Total</span></div>
        <div className="ka-metric"><span className="ka-metric-value">{approved}</span><span className="ka-metric-label">Approved</span></div>
        <div className="ka-metric"><span className="ka-metric-value">{pending}</span><span className="ka-metric-label">Pending</span></div>
        <div className="ka-metric"><span className="ka-metric-value">{stats.byDomain?.length || 0}</span><span className="ka-metric-label">Domains</span></div>
        <div className="ka-metric"><span className="ka-metric-value">{stats.bySource?.length || 0}</span><span className="ka-metric-label">Sources</span></div>
      </div>

      <div className="ka-panels">
        <div className="ka-panel">
          <div className="ka-panel-title">По доменам</div>
          {stats.byDomain?.map((d, i) => {
            const pct = total ? (d.count / total * 100).toFixed(1) : 0;
            return (
              <div key={d.domain} className="ka-bar">
                <span className="ka-bar-l">{d.domain}</span>
                <div className="ka-bar-t"><div className="ka-bar-f" style={{ width: `${pct}%`, background: palette[i % palette.length] }} /></div>
                <span className="ka-bar-r">{d.count}<span className="ka-bar-pct">{pct}%</span></span>
              </div>
            );
          })}
        </div>

        <div className="ka-panel">
          <div className="ka-panel-title">По источникам</div>
          {stats.bySource?.map((s, i) => {
            const pct = total ? (s.count / total * 100).toFixed(1) : 0;
            return (
              <div key={s.source} className="ka-bar">
                <span className="ka-bar-l">{s.source}</span>
                <div className="ka-bar-t"><div className="ka-bar-f" style={{ width: `${pct}%`, background: palette[3] }} /></div>
                <span className="ka-bar-r">{s.count}<span className="ka-bar-pct">{pct}%</span></span>
              </div>
            );
          })}
          {(!stats.bySource || stats.bySource.length === 0) && <div className="ka-empty">Нет данных</div>}
        </div>
      </div>

      <div className="ka-panels">
        <div className="ka-panel">
          <div className="ka-panel-title">Уровень доказательности</div>
          <div className="ka-evidence-row">
            {['A','B','C','D'].map(level => {
              const item = stats.byEvidence?.find(e => e.evidence_level === level);
              const pct = total ? Math.round((item?.count || 0) / total * 100) : 0;
              return (
                <div key={level} className="ka-evidence-cell">
                  <div className={`ka-ev-badge ka-ev-${level.toLowerCase()}`}>{level}</div>
                  <div className="ka-ev-count">{item?.count || 0}</div>
                  <div className="ka-ev-pct">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-title">Динамика (14 дней)</div>
          <div className="ka-timeline">
            {stats.byDay?.slice(0, 14).reverse().map(d => {
              const max = Math.max(...stats.byDay.map(x => x.count), 1);
              return (
                <div key={d.day} className="ka-tl-bar" title={`${d.day}: ${d.count}`}>
                  <div className="ka-tl-fill" style={{ height: `${d.count / max * 100}%` }} />
                </div>
              );
            })}
            {(!stats.byDay || stats.byDay.length === 0) && <div className="ka-empty">Нет данных</div>}
          </div>
        </div>
      </div>

      <div className="ka-panel ka-panel-wide">
        <div className="ka-panel-title">Первоисточники, публикации и доказательства</div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {['A','B','C','D'].map(t => {
            const tier = stats.sourceStats?.byAuthority?.find(x => x.tier === t);
            const tierColor = { A: '#4ecdc4', B: '#7c5cfc', C: '#ffd93d', D: '#ff6b6b' }[t];
            return (
              <div key={t} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', background: '#f8f8fe', borderRadius: 4, fontSize: 11 }}>
                <span style={{ display: 'inline-block', width: 20, height: 20, lineHeight: '20px', borderRadius: '50%', background: tierColor, color: '#fff', fontWeight: 700, fontSize: 11 }}>{t}</span>
                <div style={{ marginTop: 2, fontWeight: 600 }}>{tier?.source_count || 0} ист.</div>
                <div style={{ color: '#999' }}>{tier?.article_count || 0} ссылок</div>
              </div>
            );
          })}
        </div>
        <table className="ka-sci-table">
          <thead><tr>
            <th>Источник</th><th>Тип</th><th>Рейтинг</th><th>Ссылок</th><th>Доля</th>
          </tr></thead>
          <tbody>
            {stats.sourceStats?.bySource?.map(s => {
              const pct = total ? (s.article_count / total * 100).toFixed(1) : 0;
              const tier = s.authority_score >= 90 ? 'A' : s.authority_score >= 70 ? 'B' : s.authority_score >= 50 ? 'C' : 'D';
              const tierColor = { A: '#4ecdc4', B: '#7c5cfc', C: '#ffd93d', D: '#ff6b6b' }[tier];
              return (
                <tr key={s.id}>
                  <td>
                    {s.url
                      ? <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#7c5cfc', textDecoration: 'none' }}>{s.name}</a>
                      : <span>{s.name}</span>}
                  </td>
                  <td style={{ fontSize: 10, color: '#999' }}>{s.type}</td>
                  <td>
                    <span style={{ display: 'inline-block', width: 20, height: 20, lineHeight: '20px', borderRadius: '50%', background: tierColor, color: '#fff', fontWeight: 700, fontSize: 11, textAlign: 'center' }}>{tier}</span>
                    <span style={{ marginLeft: 4, fontSize: 11, color: '#888' }}>{s.authority_score}</span>
                  </td>
                  <td className="ka-num">{s.article_count}</td>
                  <td className="ka-num">{pct}%</td>
                </tr>
              );
            })}
            {(!stats.sourceStats || stats.sourceStats.bySource.length === 0) && (
              <tr><td colSpan={5} className="ka-empty">Нет данных о первоисточниках</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ValidationQueueTab() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [domainFilter, setDomainFilter] = useState('');
  const [msg, setMsg] = useState(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100' });
    if (statusFilter) params.set('status', statusFilter);
    if (domainFilter) params.set('domain', domainFilter);
    fetchJson(`${API}/articles?${params}`).then(d => { setArticles(d); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
  };
  useEffect(() => { load(); }, [statusFilter, domainFilter]);

  const updateStatus = async (id, status) => {
    try {
      await fetchJson(`${API}/articles/${id}/status`, {
        method: 'PATCH', body: JSON.stringify({ status })
      });
      setMsg(`Статья #${id}: ${status}`);
      setTimeout(() => setMsg(null), 2000);
      load();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="ka-tab-content">
      {msg && <div className="ka-toast">{msg}</div>}

      <div className="ka-filter-row">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="ka-select">
          <option value="">Все статусы</option>
          <option value="pending">В очереди</option>
          <option value="approved">Одобрено</option>
          <option value="rejected">Отклонено</option>
        </select>
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} className="ka-select">
          <option value="">Все домены</option>
          <option value="obesity">Ожирение</option>
          <option value="nutrition">Нутрициология</option>
          <option value="longevity">Долголетие</option>
          <option value="stress">Стресс</option>
          <option value="sleep">Сон</option>
          <option value="microbiome">Микробиом</option>
          <option value="environment">Дизайн среды</option>
          <option value="habits">Привычки ЗОЖ</option>
          <option value="literature">Литература</option>
        </select>
        <button className="ka-btn" onClick={load}>Обновить</button>
        {articles.filter(a => a.status === 'pending').length > 0 && (
          <button className="ka-btn ka-btn-approve-all" onClick={async () => {
            for (const a of articles.filter(x => x.status === 'pending')) {
              await fetchJson(`${API}/articles/${a.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'approved' }) });
            }
            setMsg(`Одобрено ${articles.filter(x => x.status === 'pending').length} статей`);
            setTimeout(() => setMsg(null), 2000);
            load();
          }}>Одобрить все</button>
        )}
      </div>

      {loading ? <div className="ka-loading">Загрузка...</div> : (
        <div className="ka-table-wrap">
          <table className="ka-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Источник</th>
                <th>Домен</th>
                <th>Релевантность</th>
                <th>Evidence</th>
                <th>Уверенность LLM</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} className={`ka-row-${a.status}`}>
                  <td className="ka-cell-id">{a.id}</td>
                  <td className="ka-cell-title">
                    <div className="ka-title">{a.title}</div>
                    {a.abstract && <div className="ka-abstract">{a.abstract.slice(0, 200)}...</div>}
                    {a.doi && <div className="ka-doi">DOI: {a.doi}</div>}
                  </td>
                  <td>{a.source}{a.source_id && <div className="ka-source-id">PMID: {a.source_id}</div>}</td>
                  <td><span className="ka-domain-tag">{a.domain}</span></td>
                  <td>{a.relevance ? `${Math.round(a.relevance * 100)}%` : '—'}</td>
                  <td><span className={`ka-ev-badge ka-ev-${a.evidence_level?.toLowerCase()}`}>{a.evidence_level || 'D'}</span></td>
                  <td>{a.llm_confidence ? `${Math.round(a.llm_confidence * 100)}%` : '—'}</td>
                  <td><span className={`ka-status-badge ka-status-${a.status}`}>{a.status}</span></td>
                  <td className="ka-cell-actions">
                    {a.status === 'pending' && (
                      <>
                        <button className="ka-btn-sm ka-btn-approve" onClick={() => updateStatus(a.id, 'approved')} title="Одобрить">✓</button>
                        <button className="ka-btn-sm ka-btn-reject" onClick={() => updateStatus(a.id, 'rejected')} title="Отклонить">✕</button>
                      </>
                    )}
                    {a.status === 'approved' && (
                      <button className="ka-btn-sm ka-btn-reject" onClick={() => updateStatus(a.id, 'rejected')} title="Отклонить">✕</button>
                    )}
                    {a.status === 'rejected' && (
                      <button className="ka-btn-sm ka-btn-approve" onClick={() => updateStatus(a.id, 'approved')} title="Одобрить">✓</button>
                    )}
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr><td colSpan="9" className="ka-empty">Нет статей</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const SVG_ICONS = {
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  llm: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-3-3H7v-2h10v2zm0-4H7V7h10v2z',
  review: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  store: 'M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4-3.58-4-8-4-8 1.79-8 4zm0 4c0 2.21 3.58 4 8 4s8-1.79 8-4M4 15c0 2.21 3.58 4 8 4s8-1.79 8-4',
};

function Icon({ path, size }) {
  return (
    <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
      <path d={path} />
    </svg>
  );
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}с`;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}м ${sec}с`;
}

function StepTime({ label, dt, st }) {
  if (!dt || st === 'idle') return null;
  const d = new Date(dt);
  return (
    <span style={{ fontSize: 9, color: st === 'completed' ? '#2b8a3e' : '#e6a700', whiteSpace: 'nowrap', marginTop: 1 }}>
      {label} {d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

function PipelineTracker({ session, showTimes, onStop }) {
  const steps = [
    { id: 'search', label: 'Поиск', icon: SVG_ICONS.search },
    { id: 'llm', label: 'LLM', icon: SVG_ICONS.llm },
    { id: 'review', label: 'Review', icon: SVG_ICONS.review },
    { id: 'store', label: 'БЗ', icon: SVG_ICONS.store },
  ];

  const getStatus = (stepId) => {
    const s = session || {};
    if (s.status === 'failed') return 'failed';
    if (s.status === 'cancelled_by_user') return 'cancelled';
    switch (stepId) {
      case 'search':
        return s.articles_found > 0 ? 'completed' : (s.status === 'in_progress' ? 'running' : 'idle');
      case 'llm':
        return s.articles_after_dedup > 0 ? 'completed' : (s.articles_found > 0 ? 'running' : 'idle');
      case 'review':
        return s.articles_approved > 0 ? 'completed' : (s.articles_queued > 0 ? 'running' : (s.articles_after_dedup > 0 ? 'idle' : 'idle'));
      case 'store':
        return s.status === 'completed' ? 'completed' : (s.articles_approved > 0 ? 'running' : 'idle');
      default: return 'idle';
    }
  };

  const statusColor = { completed: '#4ecdc4', running: '#ffd43b', failed: '#ff6b6b', idle: '#d0d0da', cancelled: '#999' };
  const statusBg = { completed: '#e8faf5', running: '#fff8e1', failed: '#ffe8e6', idle: '#f5f5f8', cancelled: '#f0f0f0' };

  const runningIdx = steps.findIndex(s => getStatus(s.id) === 'running');
  const startedAt = session?.started_at;
  const completedAt = session?.completed_at;

  const duration = startedAt && completedAt
    ? formatDuration(new Date(completedAt) - new Date(startedAt))
    : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((step, i) => {
          const st = getStatus(step.id);
          const isLast = i === steps.length - 1;
          return (
            <React.Fragment key={step.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: statusBg[st], borderRadius: 4, padding: '2px 6px', fontSize: 11 }}>
                <Icon path={step.icon} size={14} />
                <span style={{ fontWeight: st === 'completed' || st === 'running' ? 600 : 400, color: st === 'failed' ? '#c92a2a' : '#555' }}>
                  {step.label}
                </span>
                {st === 'running' && <span className="ka-spin" style={{ color: '#e6a700', fontSize: 10, display: 'inline-block' }}>⟳</span>}
              </div>
              {!isLast && (
                <div style={{ width: 16, height: 2, background: st === 'completed' ? statusColor.completed : '#d0d0da', margin: '0 2px', flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {(showTimes || runningIdx >= 0 || session?.status === 'cancelled_by_user') && startedAt && (
        <div style={{ marginTop: 2, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <StepTime label="Запуск:" dt={startedAt} st="running" />
          {completedAt && <StepTime label="Завершено:" dt={completedAt} st="completed" />}
          {duration && <span style={{ fontSize: 9, color: '#888', whiteSpace: 'nowrap' }}>⏱ {duration}</span>}
          {session?.status === 'cancelled_by_user' && <span style={{ fontSize: 9, color: '#999', fontWeight: 600 }}>Остановлен пользователем</span>}
          {runningIdx >= 0 && onStop && (
            <button className="ka-btn-sm" style={{ color: '#e74c3c', borderColor: '#e74c3c', fontSize: 10, padding: '1px 6px' }} onClick={() => onStop(session.id)}>✕</button>
          )}
        </div>
      )}
    </div>
  );
}

function SearchConfigTab() {
  const [queries, setQueries] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editQuery, setEditQuery] = useState(null);
  const [modalTab, setModalTab] = useState('settings');
  const [searchSubTab, setSearchSubTab] = useState('queries');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [articlesModal, setArticlesModal] = useState(null);
  const [articlesList, setArticlesList] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [q, s, st] = await Promise.all([
        fetchJson(`${API}/queries`),
        fetchJson(`${API}/sessions?limit=100`),
        fetchJson(`${API}/stats`)
      ]);
      setQueries(q);
      setSessions(s);
      setStats(st);
    } catch (e) { console.error(e); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const saveQuery = async () => {
    if (!editQuery.domain || !editQuery.keywords) return;
    await fetchJson(`${API}/queries`, { method: 'POST', body: JSON.stringify(editQuery) });
    setEditQuery(null);
    load();
  };

  const deleteQuery = async (id) => {
    await fetchJson(`${API}/queries/${id}`, { method: 'DELETE' });
    load();
  };

  const triggerRun = async (q) => {
    if (!q.is_active) return;
    await fetchJson(`${API}/sessions`, {
      method: 'POST', body: JSON.stringify({ query_id: q.id, search_type: 'manual', domain: q.domain, source: q.source })
    }).catch(() => null);
    load();
  };

  const stopSession = async (id) => {
    await fetchJson(`${API}/sessions/${id}/cancel`, { method: 'PATCH' }).catch(() => null);
    load();
  };

  const openArticles = async (sessionId, column, label) => {
    setArticlesModal({ sessionId, column, label });
    setArticlesLoading(true);
    try {
      const statusMap = { articles_found: '', articles_after_dedup: '', articles_queued: 'pending', articles_approved: 'approved', articles_rejected: 'rejected' };
      const status = statusMap[column] || '';
      const url = `${API}/articles?session_id=${sessionId}${status ? '&status=' + status : ''}`;
      const data = await fetchJson(url);
      setArticlesList(data);
    } catch (e) { setArticlesList([]); }
    setArticlesLoading(false);
  };

  if (loading) return <div className="ka-loading">Загрузка...</div>;

  const SOURCE_CHIPS = ['PubMed', 'Google Scholar', 'Cochrane', 'ClinicalTrials.gov', 'gigachat', 'openAI', 'WHO', 'FDA'];
  const defaultQuery = { title: '', domain: '', source: 'PubMed', keywords: '', mesh_terms: '', llm_prompt: '', search_format: '', cron_expr: '', interval_minutes: 1440, is_active: true };

  const toggleSource = (src) => {
    const current = editQuery.source ? editQuery.source.split(',').map(s => s.trim()).filter(Boolean) : [];
    const idx = current.indexOf(src);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(src);
    setEditQuery({ ...editQuery, source: current.join(', ') || 'PubMed' });
  };

  const totalLocal = stats?.total || 0;

  return (
    <div className="ka-tab-content">
      <div className="ka-tabs" style={{ marginBottom: 16 }}>
        {['queries', 'history'].map(t => (
          <button key={t} className={`ka-tab ${searchSubTab === t ? 'active' : ''}`} onClick={() => setSearchSubTab(t)}>
            {t === 'queries' ? 'Поисковые запросы' : 'История поиска'}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 16, background: '#fafafe', border: '1px solid #e8e8f0', borderRadius: 8, padding: 12, fontSize: 11, display: 'flex', gap: 12, alignItems: 'center' }}>
        <svg width="520" height="60" viewBox="0 0 520 60" fill="none" style={{ flexShrink: 0 }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0l10 5-10 5z" fill="#d0d0da"/></marker>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cfc"/><stop offset="1" stopColor="#6b4be0"/></linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ecdc4"/><stop offset="1" stopColor="#3dbdb5"/></linearGradient>
            <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd93d"/><stop offset="1" stopColor="#f0c929"/></linearGradient>
            <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff6b6b"/><stop offset="1" stopColor="#e05555"/></linearGradient>
          </defs>
          <rect x="2" y="2" width="116" height="56" rx="8" fill="url(#g1)" />
          <text x="60" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">🔍 Search</text>
          <text x="60" y="42" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8">PubMed / CrossRef</text>
          <text x="60" y="52" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">ClinicalTrials / FDA</text>
          <line x1="120" y1="30" x2="140" y2="30" stroke="#d0d0da" strokeWidth="2" markerEnd="url(#arrow)"/>
          <rect x="142" y="2" width="116" height="56" rx="8" fill="url(#g2)" />
          <text x="200" y="24" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">🧠 LLM 8B</text>
          <text x="200" y="36" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8">Relevance</text>
          <text x="200" y="46" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8">Domain</text>
          <text x="200" y="56" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">0 cost / быстрая</text>
          <line x1="260" y1="30" x2="280" y2="30" stroke="#d0d0da" strokeWidth="2"/>
          <rect x="282" y="2" width="116" height="56" rx="8" fill="url(#g3)" />
          <text x="340" y="22" textAnchor="middle" fill="#5a4a00" fontSize="9" fontWeight="700">🤖 API Model</text>
          <text x="340" y="34" textAnchor="middle" fill="rgba(90,74,0,0.7)" fontSize="8">Evidence Level</text>
          <text x="340" y="44" textAnchor="middle" fill="rgba(90,74,0,0.7)" fontSize="8">Summary</text>
          <text x="340" y="56" textAnchor="middle" fill="rgba(90,74,0,0.5)" fontSize="7">gpt-4o / GigaChat</text>
          <line x1="400" y1="30" x2="420" y2="30" stroke="#d0d0da" strokeWidth="2"/>
          <rect x="422" y="2" width="96" height="56" rx="8" fill="url(#g4)" />
          <text x="470" y="24" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">⬇ Fallback</text>
          <text x="470" y="36" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8">8B модель</text>
          <text x="470" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">если API</text>
          <text x="470" y="58" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">недоступен</text>
          <path d="M340 58 Q340 68 60 68 Q10 68 10 58" stroke="#ffd93d" strokeWidth="1.5" strokeDasharray="3,3" fill="none"/>
          <text x="200" y="76" textAnchor="middle" fill="#999" fontSize="7">Dedup (PMID → DOI → title)</text>
        </svg>
        <div style={{ color: '#666', lineHeight: 1.5, fontSize: 11 }}>
          <b style={{ color: '#333' }}>Pipeline поиска:</b><br/>
          1. <b style={{ color: '#7c5cfc' }}>Search</b> — параллельные запросы к PubMed, CrossRef, ClinicalTrials, FDA<br/>
          2. <b style={{ color: '#4ecdc4' }}>LLM 8B</b> — релевантность + домен (локально, бесплатно)<br/>
          3. <b style={{ color: '#d4a800' }}>API</b> — evidence level + summary (gpt-4o-mini / GigaChat)<br/>
          4. <b style={{ color: '#e05555' }}>Fallback</b> — 8B если API недоступен
        </div>
      </div>

      {searchSubTab === 'queries' && (
        <>
          <div className="ka-section-header">
            <h3>Поисковые запросы</h3>
            <span style={{ fontSize: 12, color: '#999' }}>{queries.length} запросов</span>
            <button className="ka-btn" onClick={() => setEditQuery({ ...defaultQuery })}>+ Добавить</button>
          </div>

          <div className="ka-table-wrap">
            <table className="ka-table">
              <thead><tr>
                <th>ID</th><th>Название</th><th>Домен</th><th>Источник</th><th>Ключевые слова</th>
                <th>MeSH</th><th>Интервал</th><th>Активен</th><th>Последний запуск</th><th></th>
              </tr></thead>
              <tbody>
                {queries.map(q => (
                  <tr key={q.id}>
                    <td className="ka-cell-id">{q.id}</td>
                    <td style={{ fontWeight: 500 }}>{q.title || q.keywords?.slice(0, 40)}</td>
                    <td><span className="ka-domain-tag">{q.domain}</span></td>
                    <td>{q.source}</td>
                    <td className="ka-cell-keywords">{q.keywords}</td>
                    <td className="ka-cell-keywords">{q.mesh_terms || '—'}</td>
                    <td>{q.interval_minutes >= 1440 ? `${q.interval_minutes / 1440}д` : `${q.interval_minutes}мин`}</td>
                    <td>{q.is_active ? '✓' : '✕'}</td>
                    <td className="ka-cell-date">{q.last_run_at ? new Date(q.last_run_at).toLocaleString('ru-RU') : '—'}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="ka-btn-sm" onClick={() => triggerRun(q)} title="Запустить поиск" disabled={!q.is_active} style={q.is_active ? { background: '#e8faf0', color: '#2b8a3e', borderColor: '#2b8a3e' } : {}}>▶</button>
                      <button className="ka-btn-sm" onClick={() => setEditQuery({ ...q, is_active: !!q.is_active })} title="Редактировать">✎</button>
                      <button className="ka-btn-sm ka-btn-reject" onClick={() => deleteQuery(q.id)} title="Удалить">✕</button>
                    </td>
                  </tr>
                ))}
                {queries.length === 0 && <tr><td colSpan={10} className="ka-empty">Нет поисковых запросов</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}

      {searchSubTab === 'history' && (
        <>
          <div className="ka-section-header">
            <h3>История поиска</h3>
          </div>
          <div className="ka-filter-row">
            {['all', 'manual', 'scheduled', 'knowledge'].map(f => (
              <button key={f} className={`ka-btn ${historyFilter === f ? 'ka-btn-primary' : ''}`}
                onClick={() => setHistoryFilter(f)}
                style={historyFilter === f ? {} : {}}>
                {f === 'all' ? 'Все' : f === 'manual' ? 'Ручная' : f === 'scheduled' ? 'Cron' : 'Из knowledge'}
              </button>
            ))}
          </div>
          <div className="ka-table-wrap" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
            <table className="ka-table">
              <thead><tr>
                <th>ID</th><th>Название поиска</th><th>Дата / время</th><th>Тип</th><th>Домен</th>
                <th>Pipeline</th><th>Найдено</th><th>После dedup</th><th>В БЗ</th><th>Одобрено</th><th>Отклонено</th>
              </tr></thead>
              <tbody>
                {historyFilter === 'knowledge' && (
                  <tr>
                    <td className="ka-cell-id">—</td>
                    <td style={{ fontWeight: 500 }}>Все источники (knowledge)</td>
                    <td className="ka-cell-date">01.06.2026, 10:00</td>
                    <td><span className="ka-search-type" style={{ background: '#e8f0fe', color: '#1967d2' }}>knowledge</span></td>
                    <td><span className="ka-domain-tag">all</span></td>
                    <td><PipelineTracker session={{ status: 'completed', articles_found: totalLocal, articles_after_dedup: totalLocal, articles_queued: totalLocal, articles_approved: totalLocal }} /></td>
                    <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(0, 'articles_found', 'Найдено')}>{totalLocal}</span></td>
                    <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(0, 'articles_after_dedup', 'После dedup')}>{totalLocal}</span></td>
                    <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(0, 'articles_queued', 'В БЗ')}>{totalLocal}</span></td>
                    <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(0, 'articles_approved', 'Одобрено')}>{totalLocal}</span></td>
                    <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(0, 'articles_rejected', 'Отклонено')}>0</span></td>
                  </tr>
                )}
                {sessions
                  .filter(s => historyFilter === 'all' || s.search_type === historyFilter)
                  .map(s => (
                    <tr key={s.id}>
                      <td className="ka-cell-id">{s.query_id || '—'}</td>
                      <td style={{ fontWeight: 500, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.query_title || ''}>{s.query_title || '—'}</td>
                      <td className="ka-cell-date">{new Date(s.created_at).toLocaleString('ru-RU')}</td>
                      <td><span className={`ka-search-type ${s.search_type}`}>{s.search_type}</span></td>
                      <td><span className="ka-domain-tag">{s.domain}</span></td>
                      <td><PipelineTracker session={s} showTimes onStop={stopSession} /></td>
                      <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(s.id, 'articles_found', 'Найдено')}>{s.articles_found}</span></td>
                      <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(s.id, 'articles_after_dedup', 'После dedup')}>{s.articles_after_dedup}</span></td>
                      <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(s.id, 'articles_queued', 'В БЗ')}>{s.articles_queued}</span></td>
                      <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(s.id, 'articles_approved', 'Одобрено')}>{s.articles_approved}</span></td>
                      <td className="ka-num"><span className="ka-count-link" onClick={() => openArticles(s.id, 'articles_rejected', 'Отклонено')}>{s.articles_rejected}</span></td>
                    </tr>
                  ))}
                {historyFilter !== 'knowledge' && sessions.filter(s => historyFilter === 'all' || s.search_type === historyFilter).length === 0 && (
                  <tr><td colSpan={11} className="ka-empty">Нет записей</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {articlesModal && (
        <div className="ka-modal-overlay" onClick={() => setArticlesModal(null)}>
          <div className="ka-modal ka-modal-wide" onClick={e => e.stopPropagation()}>
            <div className="ka-modal-header">
              <h3>Статьи: {articlesModal.label}</h3>
              <span style={{ fontSize: 12, color: '#999' }}>Сессия #{articlesModal.sessionId}</span>
            </div>
            <div className="ka-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {articlesLoading ? (
                <div className="ka-loading">Загрузка...</div>
              ) : articlesList.length === 0 ? (
                <div className="ka-empty">Нет статей</div>
              ) : (
                <table className="ka-table">
                  <thead><tr>
                    <th>ID</th><th>Название</th><th>Источник</th><th>Релевантность</th><th>Evidence</th><th>Статус</th>
                  </tr></thead>
                  <tbody>
                    {articlesList.map(a => (
                      <tr key={a.id}>
                        <td className="ka-cell-id">{a.id}</td>
                        <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={a.title}>
                          {a.doi ? <a href={`https://doi.org/${a.doi}`} target="_blank" rel="noopener noreferrer">{a.title}</a> : a.title}
                        </td>
                        <td>{a.source}</td>
                        <td className="ka-num">{a.relevance}</td>
                        <td>{a.evidence_level}</td>
                        <td><span className={`ka-status-${a.status}`}>{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="ka-modal-actions">
              <button className="ka-btn" onClick={() => setArticlesModal(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}

      {editQuery && (
        <div className="ka-modal-overlay" onClick={() => { setEditQuery(null); setModalTab('settings'); }}>
          <div className="ka-modal ka-modal-wide" onClick={e => e.stopPropagation()}>
            <h3>{editQuery.id ? 'Настройка поиска #' + editQuery.id : 'Настройка поиска'}</h3>

            {editQuery.id && (
              <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '2px solid #e8e8f0' }}>
                {['settings', 'schedule', 'history'].map(t => (
                  <button key={t}
                    onClick={() => setModalTab(t)}
                    style={{
                      padding: '6px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                      color: modalTab === t ? '#7c5cfc' : '#666', borderBottom: modalTab === t ? '2px solid #7c5cfc' : '2px solid transparent',
                      marginBottom: -2, transition: 'all 0.15s'
                    }}>
                    {t === 'settings' ? 'Настройки' : t === 'schedule' ? 'Расписание' : 'История поиска'}
                  </button>
                ))}
              </div>
            )}

            {modalTab === 'schedule' && (
              <div style={{ padding: '8px 0' }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                  Cron-выражение
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 400, marginBottom: 4 }}>
                    Формат: минута час день-месяца месяц день-недели. Пример: <code>0 6 * * *</code> — ежедневно в 6:00
                  </div>
                  <input value={editQuery.cron_expr || ''} onChange={e => setEditQuery({ ...editQuery, cron_expr: e.target.value })}
                    placeholder="0 6 * * *" style={{ fontFamily: 'monospace' }} />
                </label>

                <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <label className="ka-checkbox-label" style={{ margin: 0 }}>
                    <input type="checkbox" checked={editQuery.is_active} onChange={e => setEditQuery({ ...editQuery, is_active: e.target.checked })} />
                    Расписание активно
                  </label>
                  <button className="ka-btn" onClick={() => triggerRun(editQuery)}
                    style={{ background: '#e8faf0', color: '#2b8a3e', borderColor: '#2b8a3e' }}>
                    ▶ Запустить вручную
                  </button>
                </div>

                <div style={{ marginTop: 20, fontSize: 12, color: '#888', background: '#f8f8fe', padding: 12, borderRadius: 6 }}>
                  <b>Примеры cron:</b><br />
                  <code>0 6 * * *</code> — ежедневно в 6:00<br />
                  <code>0 */6 * * *</code> — каждые 6 часов<br />
                  <code>0 9 * * 1</code> — каждый понедельник в 9:00<br />
                  <code>0 0 1 * *</code> — 1-го числа каждого месяца
                </div>
              </div>
            )}

            {modalTab === 'settings' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label>Название
                      <input value={editQuery.title} onChange={e => setEditQuery({ ...editQuery, title: e.target.value })} placeholder="Например: Поиск по ожирению" />
                    </label>
                    {editQuery.id && (
                      <label style={{ color: '#999', fontSize: 12 }}>ID: {editQuery.id}</label>
                    )}
                    <label>Домен
                      <select value={editQuery.domain} onChange={e => setEditQuery({ ...editQuery, domain: e.target.value })}>
                        <option value="">—</option>
                        <option value="obesity">Ожирение</option>
                        <option value="nutrition">Нутрициология</option>
                        <option value="longevity">Долголетие</option>
                        <option value="stress">Стресс</option>
                        <option value="sleep">Сон</option>
                        <option value="microbiome">Микробиом</option>
                        <option value="environment">Дизайн среды</option>
                        <option value="habits">Привычки ЗОЖ</option>
                        <option value="literature">Литература</option>
                      </select>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: '#555' }}>Где искать</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                      {SOURCE_CHIPS.map(src => {
                        const active = editQuery.source?.split(',').map(s => s.trim()).includes(src);
                        return (
                          <span key={src}
                            onClick={() => toggleSource(src)}
                            style={{
                              display: 'inline-block', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                              background: active ? '#7c5cfc' : '#f0f0f6', color: active ? '#fff' : '#555', border: active ? 'none' : '1px solid #d0d0da',
                              transition: 'all 0.15s'
                            }}>
                            {src}
                          </span>
                        );
                      })}
                    </div>
                    <label style={{ color: '#999', fontSize: 11 }}>Выбрано: {editQuery.source}</label>
                  </div>
                </div>

                <label>Ключевые слова <textarea value={editQuery.keywords} onChange={e => setEditQuery({ ...editQuery, keywords: e.target.value })} rows={2} /></label>

                <label style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                  MeSH-термины
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 400, marginBottom: 4 }}>Medical Subject Headings — контролируемый словарь для индексации PubMed</div>
                  <input value={editQuery.mesh_terms} onChange={e => setEditQuery({ ...editQuery, mesh_terms: e.target.value })} placeholder="Например: Obesity/diet therapy, Exercise, Caloric Restriction" />
                </label>

                <label style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                  Промпт для LLM
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 400, marginBottom: 4 }}>Инструкция для LLM (gigachat/openAI) — как анализировать и summarировать найденные статьи</div>
                  <textarea value={editQuery.llm_prompt} onChange={e => setEditQuery({ ...editQuery, llm_prompt: e.target.value })} rows={4}
                    style={{ fontFamily: 'monospace', fontSize: 12 }} placeholder="Ты — научный ассистент. Проанализируй найденные статьи по теме..." />
                </label>

                <label style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                  Формат запроса к поисковикам
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 400, marginBottom: 4 }}>Шаблон поискового запроса для PubMed / Google Scholar и других БД</div>
                  <textarea value={editQuery.search_format} onChange={e => setEditQuery({ ...editQuery, search_format: e.target.value })} rows={3}
                    style={{ fontFamily: 'monospace', fontSize: 12 }} placeholder='("obesity" OR "overweight") AND ("diet" OR "nutrition") AND "clinical trial"[pt]' />
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label>Интервал (минут) <input type="number" value={editQuery.interval_minutes} onChange={e => setEditQuery({ ...editQuery, interval_minutes: Number(e.target.value) })} /></label>
                  <label className="ka-checkbox-label" style={{ marginTop: 24 }}>
                    <input type="checkbox" checked={editQuery.is_active} onChange={e => setEditQuery({ ...editQuery, is_active: e.target.checked })} />
                    Активен
                  </label>
                </div>
              </>
            )}

            {modalTab === 'history' && (
              <div className="ka-table-wrap" style={{ maxHeight: 300, overflowY: 'auto' }}>
                <table className="ka-sci-table" style={{ fontSize: 12 }}>
                  <thead><tr>
                    <th>Дата / время</th><th>Тип</th><th>Pipeline</th><th>Найдено</th><th>После dedup</th><th>В БЗ</th>
                  </tr></thead>
                  <tbody>
                    {sessions.filter(s => s.query_id === editQuery.id).length === 0 && (
                      <tr><td colSpan={6} className="ka-empty">История поиска пуста</td></tr>
                    )}
                    {sessions.filter(s => s.query_id === editQuery.id).map(s => (
                      <tr key={s.id}>
                        <td className="ka-cell-date">{new Date(s.created_at).toLocaleString('ru-RU')}</td>
                        <td><span className={`ka-search-type ${s.search_type}`}>{s.search_type}</span></td>
                        <td><PipelineTracker session={s} showTimes onStop={stopSession} /></td>
                        <td className="ka-num">{s.articles_found}</td>
                        <td className="ka-num">{s.articles_after_dedup}</td>
                        <td className="ka-num">{s.articles_queued}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {modalTab !== 'settings' && modalTab !== 'schedule' && modalTab !== 'history' && (
              <div className="ka-empty">Выберите вкладку</div>
            )}

            <div className="ka-modal-actions">
              <button className="ka-btn" onClick={() => { setEditQuery(null); setModalTab('settings'); }}>Закрыть</button>
              {(modalTab === 'settings' || modalTab === 'schedule') && <button className="ka-btn ka-btn-primary" onClick={saveQuery}>Сохранить</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const [apiKeys, setApiKeys] = useState([]);
  const [usage, setUsage] = useState(null);
  const [gigachatDaily, setGigachatDaily] = useState(null);
  const [subTab, setSubTab] = useState('sources');
  const [editKey, setEditKey] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(null);

  const SOURCES = [
    { name: 'BigPickle', type: 'llm', desc: 'Ollama локально (0 cost, 0 latency)' },
    { name: 'PubMed', type: 'search', desc: 'PubMed E-utilities (бесплатно)' },
    { name: 'Google Scholar', type: 'search', desc: 'CrossRef API (бесплатный fallback)' },
    { name: 'Cochrane', type: 'search', desc: 'Cochrane Library REST API' },
    { name: 'ClinicalTrials.gov', type: 'search', desc: 'ClinicalTrials.gov API (бесплатно)' },
    { name: 'WHO', type: 'search', desc: 'WHO API / PubMed AIM filter' },
    { name: 'FDA', type: 'search', desc: 'openFDA drug/event endpoint' },
    { name: 'openAI', type: 'llm', desc: 'ChatGPT / GPT-4o-mini (платный)' },
    { name: 'gigachat', type: 'llm', desc: 'GigaChat (Сбер, 100 req/день)' },
    { name: 'HuggingFace', type: 'llm', desc: 'HuggingFace Serverless Inference' },
  ];

  const load = async () => {
    try {
      const [k, u, d] = await Promise.all([
        fetchJson(`${API}/api-keys`),
        fetchJson(`${API}/api-usage`),
        fetchJson(`${API}/api-usage/daily?provider=gigachat`),
      ]);
      setApiKeys(k);
      setUsage(u);
      setGigachatDaily(d);
    } catch (e) { console.error(e); }
  };
  useEffect(() => { load(); }, []);

  const saveKey = async () => {
    if (!editKey.provider || !editKey.key_value) return;
    await fetchJson(`${API}/api-keys`, { method: 'POST', body: JSON.stringify(editKey) });
    setEditKey(null);
    load();
  };

  const deleteKey = async (id) => {
    await fetchJson(`${API}/api-keys/${id}`, { method: 'DELETE' });
    load();
  };

  const testSource = async (name) => {
    setTesting(name);
    setTestResult(null);
    try {
      const r = await fetchJson(`${API}/test-source`, { method: 'POST', body: JSON.stringify({ source: name }) });
      setTestResult(r);
    } catch (e) {
      setTestResult({ source: name, status: 'error', response: e.message });
    }
    setTesting(null);
  };

  const PROVIDERS = ['openai', 'huggingface', 'serpapi', 'pubmed', 'gigachat'];

  return (
    <div>
      <div className="ka-tabs" style={{ marginBottom: 16 }}>
        <button className={`ka-tab ${subTab === 'sources' ? 'active' : ''}`} onClick={() => setSubTab('sources')}>Источники</button>
        <button className={`ka-tab ${subTab === 'billing' ? 'active' : ''}`} onClick={() => setSubTab('billing')}>Биллинг</button>
      </div>

      {subTab === 'sources' && (
        <div>
          <div className="ka-table-wrap" style={{ marginBottom: 16 }}>
            <div className="ka-section-header" style={{ padding: '8px 12px' }}>
              <h3 style={{ margin: 0, fontSize: 14 }}>Подключенные источники</h3>
            </div>
            <table className="ka-table">
              <thead><tr>
                <th>Источник</th><th>Тип</th><th>Описание</th><th>Статус</th><th></th>
              </tr></thead>
              <tbody>
                {SOURCES.map(s => {
                  const hasKey = apiKeys.some(k => k.provider === s.name.toLowerCase().replace(/\s/g, '') && k.is_active);
                  const isInEnv = (s.name === 'HuggingFace' || s.name === 'openAI' || s.name === 'gigachat');
                  return (
                    <tr key={s.name}>
                      <td><span className="ka-domain-tag">{s.name}</span></td>
                      <td><span className={`ka-search-type ${s.type}`} style={{ background: s.type === 'llm' ? '#e8f0fe' : '#f0edff', color: s.type === 'llm' ? '#1967d2' : '#7c5cfc' }}>{s.type === 'llm' ? 'LLM' : 'Search'}</span></td>
                      <td style={{ color: '#888', fontSize: 12 }}>{s.desc}</td>
                      <td>
                        {isInEnv ? (
                          <span className={`ka-status-badge ka-status-${hasKey ? 'approved' : 'pending'}`}>{hasKey ? 'Ключ есть' : 'Ключ не настроен'}</span>
                        ) : (
                          <span className="ka-status-badge ka-status-approved">Доступен</span>
                        )}
                      </td>
                      <td>
                        <button className="ka-btn-sm" onClick={() => testSource(s.name)} disabled={testing === s.name} style={{ background: testing === s.name ? '#f0f0f6' : '#e8faf0', color: '#2b8a3e', borderColor: '#2b8a3e' }}>
                          {testing === s.name ? '⟳' : 'Тест'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="ka-table-wrap">
            <div className="ka-section-header" style={{ padding: '8px 12px' }}>
              <h3 style={{ margin: 0, fontSize: 14 }}>API-ключи</h3>
              <button className="ka-btn ka-btn-primary" onClick={() => setEditKey({ provider: 'openai', key_value: '', label: '', is_active: 1, priority: 0 })}>+ Добавить ключ</button>
            </div>
            <table className="ka-table">
              <thead><tr>
                <th>Провайдер</th><th>Ключ</th><th>Метка</th><th>Приоритет</th><th>Статус</th><th></th>
              </tr></thead>
              <tbody>
                {apiKeys.map(k => (
                  <tr key={k.id}>
                    <td><span className="ka-domain-tag">{k.provider}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{k.key_value.slice(0, 12)}...{k.key_value.slice(-4)}</td>
                    <td style={{ color: '#888', fontSize: 12 }}>{k.label || '—'}</td>
                    <td className="ka-num">{k.priority}</td>
                    <td><span className={`ka-status-badge ka-status-${k.is_active ? 'approved' : 'rejected'}`}>{k.is_active ? 'Активен' : 'Отключён'}</span></td>
                    <td>
                      <button className="ka-btn-sm" onClick={() => setEditKey({ ...k })} title="Редактировать">✎</button>
                      <button className="ka-btn-sm ka-btn-reject" onClick={() => deleteKey(k.id)} title="Удалить">✕</button>
                    </td>
                  </tr>
                ))}
                {apiKeys.length === 0 && <tr><td colSpan={6} className="ka-empty">Нет API-ключей. Нажмите "+ Добавить ключ"</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'billing' && (
        <div>
          <div className="ka-metrics" style={{ marginBottom: 12 }}>
            <div className="ka-metric"><span className="ka-metric-value">{usage?.total?.requests || 0}</span><span className="ka-metric-label">Запросов</span></div>
            <div className="ka-metric"><span className="ka-metric-value">{((usage?.total?.tokens_in || 0) + (usage?.total?.tokens_out || 0)).toLocaleString()}</span><span className="ka-metric-label">Токенов всего</span></div>
            <div className="ka-metric"><span className="ka-metric-value">${(usage?.total?.cost || 0).toFixed(2)}</span><span className="ka-metric-label">Стоимость</span></div>
            <div className="ka-metric"><span className="ka-metric-value">{usage?.period || '—'}</span><span className="ka-metric-label">Период</span></div>
          </div>

          <div className="ka-panels-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {/* GigaChat daily limit */}
            <div className="ka-table-wrap">
              <div className="ka-section-header" style={{ padding: '8px 12px' }}>
                <h3 style={{ margin: 0, fontSize: 13 }}>GigaChat: дневной лимит</h3>
              </div>
              {gigachatDaily ? (
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: `conic-gradient(${gigachatDaily.requests >= 100 ? '#e05555' : gigachatDaily.requests >= 80 ? '#f0c929' : '#4ecdc4'} ${Math.min(gigachatDaily.requests / 100 * 360, 360)}deg, #eee 0deg)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: '#333',
                    }}>
                      {gigachatDaily.requests}
                    </div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: gigachatDaily.requests >= 100 ? '#e05555' : '#333' }}>
                        {gigachatDaily.requests}/100
                      </div>
                      <div style={{ fontSize: 11, color: '#888' }}>запросов сегодня</div>
                      <div style={{
                        width: 120, height: 4, borderRadius: 2, background: '#eee', marginTop: 4,
                      }}>
                        <div style={{
                          width: `${Math.min(gigachatDaily.requests, 100)}%`, height: '100%',
                          borderRadius: 2, background: gigachatDaily.requests >= 100 ? '#e05555' : '#4ecdc4',
                          transition: 'width 0.3s',
                        }} />
                      </div>
                    </div>
                  </div>
                  {gigachatDaily.requests >= 100 ? (
                    <div style={{ fontSize: 11, color: '#e05555', background: '#fff0f0', padding: '6px 10px', borderRadius: 4, marginTop: 4 }}>
                      ⚠ Дневной лимит GigaChat исчерпан. Пайплайн переключится на fallback (OpenAI / 8B).
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: '#888' }}>Бесплатный лимит: 100 запросов/день. Сброс в 00:00 MSK.</div>
                  )}
                </div>
              ) : (
                <div className="ka-loading" style={{ padding: 20 }}>Загрузка...</div>
              )}
            </div>

            {/* Cost estimation */}
            <div className="ka-table-wrap">
              <div className="ka-section-header" style={{ padding: '8px 12px' }}>
                <h3 style={{ margin: 0, fontSize: 13 }}>Оценка стоимости поиска</h3>
              </div>
              <div style={{ padding: '12px', fontSize: 12 }}>
                <div style={{ marginBottom: 8, color: '#666' }}>Стоимость обработки 100 статей:</div>
                {[
                  { model: 'gpt-4o-mini', in: 0.15, out: 0.6, tokens: 200, label: 'OpenAI' },
                  { model: 'GigaChat', in: 0, out: 0, tokens: 0, label: 'Бесплатно (100/день)' },
                  { model: 'HuggingFace', in: 0, out: 0, tokens: 0, label: 'Бесплатно (30K/мес)' },
                  { model: '8B Local', in: 0, out: 0, tokens: 0, label: '0 руб (локально)' },
                ].map(m => {
                  const costPer100 = m.model === 'gpt-4o-mini'
                    ? (100 * m.tokens / 1e6 * m.in / 2 + 100 * 80 / 1e6 * m.out / 2)
                    : 0;
                  return (
                    <div key={m.model} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f0f0f6' }}>
                      <span>{m.label}</span>
                      <span style={{ fontWeight: 600, color: costPer100 === 0 ? '#2b8a3e' : '#e05555' }}>
                        {costPer100 === 0 ? 'Бесплатно' : `~$${costPer100.toFixed(3)}`}
                      </span>
                    </div>
                  );
                })}
                <div style={{ marginTop: 8, padding: '6px 10px', background: '#f8f9ff', borderRadius: 4, fontSize: 11, color: '#555' }}>
                  <b>Рекомендация:</b> Relevance + Domain → 8B локально. Evidence Level + Summary → gpt-4o-mini (~$0.008 за 100 статей). GigaChat как fallback.
                </div>
              </div>
            </div>
          </div>

          <div className="ka-table-wrap">
            <table className="ka-table">
              <thead><tr>
                <th>Провайдер</th><th>Модель</th><th className="ka-num">Запросов</th><th className="ka-num">Токены in</th><th className="ka-num">Токены out</th><th className="ka-num">Стоимость</th>
              </tr></thead>
              <tbody>
                {usage?.usage?.map((u, i) => (
                  <tr key={i}>
                    <td><span className="ka-domain-tag">{u.provider}</span></td>
                    <td style={{ color: '#888', fontSize: 12 }}>{u.model || '—'}</td>
                    <td className="ka-num">{u.requests}</td>
                    <td className="ka-num">{u.tokens_in?.toLocaleString()}</td>
                    <td className="ka-num">{u.tokens_out?.toLocaleString()}</td>
                    <td className="ka-num">${(u.cost || 0).toFixed(4)}</td>
                  </tr>
                ))}
                {(!usage?.usage || usage.usage.length === 0) && <tr><td colSpan={6} className="ka-empty">Нет данных об использовании за текущий месяц</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {testResult && (
        <div className="ka-modal-overlay" onClick={() => setTestResult(null)}>
          <div className="ka-modal ka-modal-wide" onClick={e => e.stopPropagation()}>
            <h3>Тест: {testResult.source}</h3>
            <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className={`ka-status-badge ka-status-${testResult.status === 'ok' ? 'approved' : testResult.status === 'no_key' ? 'pending' : 'rejected'}`}>
                {testResult.status === 'ok' ? '✓ Успешно' : testResult.status === 'no_key' ? '✗ Нет ключа' : testResult.status === 'warning' ? '⚠ Предупреждение' : '✗ Ошибка'}
              </span>
              <span style={{ fontSize: 11, color: '#888' }}>⏱ {testResult.duration}ms</span>
            </div>
            {testResult.request && (
              <div style={{ marginBottom: 12 }}>
                <div className="ka-panel-title">Запрос</div>
                <pre style={{ background: '#f5f5f8', padding: 8, borderRadius: 4, fontSize: 11, overflow: 'auto', maxHeight: 120, margin: 0, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>{testResult.request}</pre>
              </div>
            )}
            <div>
              <div className="ka-panel-title">Ответ</div>
              <pre style={{ background: '#f5f5f8', padding: 8, borderRadius: 4, fontSize: 11, overflow: 'auto', maxHeight: 300, margin: 0, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>{JSON.stringify(testResult.response, null, 2)}</pre>
            </div>
            <div className="ka-modal-actions">
              <button className="ka-btn" onClick={() => setTestResult(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}

      {editKey && (
        <div className="ka-modal-overlay" onClick={() => setEditKey(null)}>
          <div className="ka-modal" onClick={e => e.stopPropagation()}>
            <h3>{editKey.id ? `Редактировать ключ: ${editKey.provider}` : `Новый API-ключ: ${editKey.provider}`}</h3>
            <label>Провайдер
              <select value={editKey.provider} onChange={e => setEditKey({ ...editKey, provider: e.target.value })}>
                {PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label>Ключ
              <input value={editKey.key_value} onChange={e => setEditKey({ ...editKey, key_value: e.target.value })} placeholder="sk-... / hf_... / etc" />
            </label>
            <label>Метка
              <input value={editKey.label} onChange={e => setEditKey({ ...editKey, label: e.target.value })} placeholder="OpenAI Prod, HF Dev..." />
            </label>
            <label>Приоритет
              <input type="number" value={editKey.priority} onChange={e => setEditKey({ ...editKey, priority: Number(e.target.value) })} />
            </label>
            <label className="ka-checkbox-label">
              <input type="checkbox" checked={!!editKey.is_active} onChange={e => setEditKey({ ...editKey, is_active: e.target.checked ? 1 : 0 })} />
              Активен
            </label>
            <div className="ka-modal-actions">
              <button className="ka-btn" onClick={() => setEditKey(null)}>Отмена</button>
              <button className="ka-btn ka-btn-primary" onClick={saveKey}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KnowledgeAdmin() {
  const getTabFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return ['analytics', 'validation', 'search', 'settings'].includes(hash) ? hash : 'analytics';
  };
  const [tab, setTab] = useState(getTabFromHash);

  useEffect(() => {
    const onHash = () => setTab(getTabFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const switchTab = (key) => {
    window.location.hash = key;
    setTab(key);
  };

  const tabs = [
    { key: 'analytics', label: 'Аналитика' },
    { key: 'validation', label: 'Валидация (HITL)' },
    { key: 'search', label: 'Поиск' },
    { key: 'settings', label: 'Настройка' },
  ];

  return (
    <div className="ka-container">
      <div className="ka-header">
        <h1>Управление знаниями</h1>
        <span className="ka-mode-badge">Режим: HITL</span>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={switchTab} />
      {tab === 'analytics' && <AnalyticsTab />}
      {tab === 'validation' && <ValidationQueueTab />}
      {tab === 'search' && <SearchConfigTab />}
      {tab === 'settings' && <SettingsTab />}
    </div>
  );
}
