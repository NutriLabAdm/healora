/**
 * Knowledge Agent — HTML Generator
 * ====================================
 * 
 * Генерирует статический HTML-справочник протоколов из protocols_catalog.json
 * с cross-ссылками, поиском, фильтрацией и карточками.
 * 
 * Запуск: node tools/knowledge_agent_html.js
 * Результат: docs/development/Knowledge_agent/knowledge_base.html
 * 
 * Особенности:
 *   - Единый self-contained HTML (CSS + JS встроены)
 *   - Категории: nutritional, medical, mental, physical
 *   - Cross-ссылки: продукты → протоколы, БАДы → протоколы, ингибиторы
 *   - Поиск по всем полям
 *   - Фильтрация по категории
 *   - PubMed ссылки с иконками
 *   - Print-friendly CSS
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROTOCOLS_PATH = path.join(ROOT, 'www', 'dev.healora.ru', 'src', 'assets', 'data', 'protocols_catalog.json');
const OUTPUT_PATH = path.join(ROOT, 'docs', 'development', 'Knowledge_agent', 'knowledge_base.html');

const protocols = JSON.parse(fs.readFileSync(PROTOCOLS_PATH, 'utf8'));

const CATEGORY_NAMES = {
  nutritional: '🥗 Нутрициология',
  medical: '🏥 Медицинские',
  mental: '🧠 Ментальные',
  physical: '💪 Физические'
};

const CATEGORY_ORDER = ['nutritional', 'medical', 'mental', 'physical'];

// ── Инвертированные индексы для cross-ссылок ──
function buildIndexes(protocols) {
  const foodToProtocols = {};
  const suppToProtocols = {};
  const inhibitorToProtocols = {};
  const allFoods = new Set();
  const allSupps = new Set();
  const allInhibitors = {};

  for (const p of protocols) {
    if (p.combinations) {
      for (const f of (p.combinations.foods || [])) {
        const key = f.toLowerCase().trim();
        if (!foodToProtocols[key]) foodToProtocols[key] = [];
        foodToProtocols[key].push(p.id);
        allFoods.add(f);
      }
      for (const s of (p.combinations.supplements || [])) {
        const key = s.toLowerCase().trim();
        if (!suppToProtocols[key]) suppToProtocols[key] = [];
        suppToProtocols[key].push(p.id);
        allSupps.add(s);
      }
    }
    for (const inh of (p.inhibitors || [])) {
      const key = inh.factor.toLowerCase().trim();
      if (!inhibitorToProtocols[key]) inhibitorToProtocols[key] = [];
      inhibitorToProtocols[key].push(p.id);
      allInhibitors[inh.factor] = inh.effect;
    }
  }
  return { foodToProtocols, suppToProtocols, inhibitorToProtocols, allFoods, allSupps, allInhibitors };
}

const idx = buildIndexes(protocols);

// ── HTML-генерация ──
function escapeHTML(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderProtocolCard(p) {
  const catColor = {
    nutritional: '#4caf50',
    medical: '#f44336',
    mental: '#9c27b0',
    physical: '#2196f3'
  }[p.category] || '#666';

  const evLevelBadge = (p.type === 'medical_protocol' || p.type === 'red_flag')
    ? `<span class="badge badge-${p.type}">${p.type === 'medical_protocol' ? 'Протокол' : 'Флаг-риска'}</span>`
    : '';

  return `
  <div class="protocol-card" data-category="${p.category}" data-id="${p.id}">
    <div class="card-header" style="border-left: 4px solid ${catColor}">
      <h2>${escapeHTML(p.name_ru)}</h2>
      <div class="card-meta">
        ${evLevelBadge}
        <span class="badge badge-cat" style="background:${catColor}20;color:${catColor}">${CATEGORY_NAMES[p.category] || p.category}</span>
        <code class="protocol-id">${p.protocol_id || p.id}</code>
      </div>
      <p class="goal">${escapeHTML(p.goal_ru || p.goal || '')}</p>
    </div>

    <div class="card-body">

      ${p.recommendations && p.recommendations.length ? `
      <section class="card-section">
        <h3>📋 Рекомендации</h3>
        <ul>${p.recommendations.map(r => `<li>${escapeHTML(r)}</li>`).join('')}</ul>
      </section>` : ''}

      ${p.usage_methods && p.usage_methods.length ? `
      <section class="card-section">
        <h3>🔧 Способы применения</h3>
        <ol>${p.usage_methods.map(u => `<li>${escapeHTML(u)}</li>`).join('')}</ol>
      </section>` : ''}

      ${p.red_flags && p.red_flags.length ? `
      <section class="card-section">
        <h3>🚩 Красные флаги</h3>
        <table class="flags-table">
          <tr><th>Метрика</th><th>Порог</th><th>Действие</th></tr>
          ${p.red_flags.map(f => `<tr><td>${escapeHTML(f.metric)}</td><td>${escapeHTML(f.threshold)}</td><td>${escapeHTML(f.action)}</td></tr>`).join('')}
        </table>
      </section>` : ''}

      ${p.combinations && (p.combinations.foods?.length || p.combinations.supplements?.length) ? `
      <section class="card-section">
        <h3>🤝 Сочетания</h3>
        ${p.combinations.foods?.length ? `
        <div class="combo-group">
          <h4>🍎 Продукты</h4>
          <div class="tags">${p.combinations.foods.map(f => `<span class="tag tag-food" data-food="${escapeHTML(f)}">${escapeHTML(f)}</span>`).join('')}</div>
        </div>` : ''}
        ${p.combinations.supplements?.length ? `
        <div class="combo-group">
          <h4>💊 Биодобавки</h4>
          <div class="tags">${p.combinations.supplements.map(s => `<span class="tag tag-supp" data-supp="${escapeHTML(s)}">${escapeHTML(s)}</span>`).join('')}</div>
        </div>` : ''}
      </section>` : ''}

      ${p.inhibitors && p.inhibitors.length ? `
      <section class="card-section">
        <h3>⚠️ Факторы-ингибиторы</h3>
        <ul class="inhibitor-list">
          ${p.inhibitors.map(i => `<li><strong>${escapeHTML(i.factor)}</strong> — ${escapeHTML(i.effect)}</li>`).join('')}
        </ul>
      </section>` : ''}

      ${p.research_links && p.research_links.length ? `
      <section class="card-section">
        <h3>📄 Источники</h3>
        <ul class="research-links">
          ${p.research_links.map(r => `<li><a href="${escapeHTML(r.url)}" target="_blank" rel="noopener">${escapeHTML(r.title)}</a></li>`).join('')}
        </ul>
      </section>` : ''}

    </div>
  </div>`;
}

function renderIndexes() {
  const sortedFoods = [...idx.allFoods].sort();
  const sortedSupps = [...idx.allSupps].sort();
  const sortedInhibitors = Object.entries(idx.allInhibitors).sort((a, b) => a[0].localeCompare(b[0]));

  return `
  <div class="index-section" id="index-foods">
    <h2>🍎 Все продукты (${sortedFoods.length})</h2>
    <div class="index-tags">
      ${sortedFoods.map(f => {
        const key = f.toLowerCase().trim();
        const protCount = (idx.foodToProtocols[key] || []).length;
        return `<span class="tag tag-food idx-tag" data-food="${escapeHTML(f)}" title="Упоминается в ${protCount} протоколах">${escapeHTML(f)} <sup>${protCount}</sup></span>`;
      }).join('')}
    </div>
  </div>

  <div class="index-section" id="index-supps">
    <h2>💊 Все биодобавки (${sortedSupps.length})</h2>
    <div class="index-tags">
      ${sortedSupps.map(s => {
        const key = s.toLowerCase().trim();
        const protCount = (idx.suppToProtocols[key] || []).length;
        return `<span class="tag tag-supp idx-tag" data-supp="${escapeHTML(s)}" title="Упоминается в ${protCount} протоколах">${escapeHTML(s)} <sup>${protCount}</sup></span>`;
      }).join('')}
    </div>
  </div>

  <div class="index-section" id="index-inhibitors">
    <h2>⚠️ Все факторы-ингибиторы (${sortedInhibitors.length})</h2>
    <div class="inhibitor-index-list">
      ${sortedInhibitors.map(([factor, effect]) => {
        const key = factor.toLowerCase().trim();
        const protCount = (idx.inhibitorToProtocols[key] || []).length;
        return `<div class="inhibitor-index-item"><strong>${escapeHTML(factor)}</strong> — ${escapeHTML(effect)} <sup class="prot-count">${protCount} протоколов</sup></div>`;
      }).join('')}
    </div>
  </div>`;
}

const HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Healora — База знаний протоколов</title>
<style>
:root {
  --bg: #f8f9fc;
  --card-bg: #fff;
  --text: #1a1a2e;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --accent: #7c3aed;
  --accent-light: #ede9fe;
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
}
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg); color: var(--text); line-height: 1.6;
  display: flex; min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: 280px; background: var(--card-bg); border-right: 1px solid var(--border);
  padding: 24px 16px; position: sticky; top: 0; height: 100vh; overflow-y: auto;
  flex-shrink: 0;
}
.sidebar h1 { font-size: 18px; margin-bottom: 4px; }
.sidebar .subtitle { font-size: 12px; color: var(--text-muted); margin-bottom: 20px; }
.sidebar nav { margin-bottom: 24px; }
.sidebar nav a {
  display: block; padding: 8px 12px; border-radius: 8px; color: var(--text);
  text-decoration: none; font-size: 14px; margin-bottom: 2px; transition: .15s;
}
.sidebar nav a:hover { background: var(--accent-light); color: var(--accent); }
.sidebar nav a.active { background: var(--accent); color: #fff; }
.sidebar .nav-cat { font-size: 11px; text-transform: uppercase; color: var(--text-muted); padding: 8px 12px 4px; letter-spacing: .5px; }

/* ── Search ── */
.search-box { position: relative; margin-bottom: 16px; }
.search-box input {
  width: 100%; padding: 10px 12px 10px 36px; border: 1px solid var(--border);
  border-radius: 8px; font-size: 14px; outline: none; transition: .15s;
}
.search-box input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.search-box:before {
  content: '🔍'; position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
  font-size: 14px;
}

/* ── Main ── */
.main { flex: 1; padding: 32px 40px; max-width: 1000px; }
.main-header { margin-bottom: 24px; }
.main-header h1 { font-size: 28px; }
.main-header p { color: var(--text-muted); font-size: 14px; }

/* ── Category filter pills ── */
.filter-bar { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.filter-pill {
  padding: 6px 16px; border-radius: 20px; border: 1px solid var(--border);
  background: var(--card-bg); cursor: pointer; font-size: 13px; transition: .15s;
  user-select: none;
}
.filter-pill:hover { border-color: var(--accent); }
.filter-pill.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.filter-pill .count { font-size: 11px; opacity: .7; }

/* ── Protocol Card ── */
.protocol-card {
  background: var(--card-bg); border-radius: var(--radius); box-shadow: var(--shadow);
  margin-bottom: 20px; overflow: hidden; transition: .2s;
}
.protocol-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.12); }
.card-header { padding: 20px 24px 12px; }
.card-header h2 { font-size: 20px; margin-bottom: 6px; }
.card-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
.goal { color: var(--text-muted); font-size: 14px; }
.protocol-id { font-size: 11px; color: var(--text-muted); background: var(--bg); padding: 2px 8px; border-radius: 4px; }
.card-body { padding: 0 24px 20px; }
.card-section { margin-top: 16px; }
.card-section h3 { font-size: 15px; margin-bottom: 8px; color: var(--text); }
.card-section h4 { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
.card-section ul, .card-section ol { padding-left: 20px; font-size: 14px; }
.card-section li { margin-bottom: 4px; }

/* ── Tags ── */
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px;
  cursor: pointer; transition: .15s; border: 1px solid transparent;
}
.tag-food { background: #dcfce7; color: #166534; }
.tag-food:hover { border-color: #166534; }
.tag-supp { background: #fef3c7; color: #92400e; }
.tag-supp:hover { border-color: #92400e; }

/* ── Badges ── */
.badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
.badge-medical_protocol { background: #fef2f2; color: #991b1b; }
.badge-red_flag { background: #fff7ed; color: #9a3412; }

/* ── Tables ── */
.flags-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.flags-table th { text-align: left; padding: 6px 12px; background: var(--bg); border-bottom: 1px solid var(--border); font-weight: 600; }
.flags-table td { padding: 6px 12px; border-bottom: 1px solid var(--border); }

/* ── Research Links ── */
.research-links { list-style: none; padding: 0; }
.research-links li { margin-bottom: 4px; }
.research-links a {
  font-size: 13px; color: #2563eb; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
}
.research-links a:hover { text-decoration: underline; }
.research-links a:before { content: '📄 '; font-size: 12px; }

/* ── Inhibitors ── */
.inhibitor-list { list-style: none; padding: 0; }
.inhibitor-list li { padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.inhibitor-list li:last-child { border-bottom: none; }

/* ── Index sections ── */
.index-section { margin-top: 32px; }
.index-section h2 { font-size: 20px; margin-bottom: 12px; }
.index-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.idx-tag sup { font-size: 10px; opacity: .6; margin-left: 2px; }
.inhibitor-index-list { display: flex; flex-direction: column; gap: 4px; }
.inhibitor-index-item { font-size: 13px; padding: 4px 0; border-bottom: 1px solid var(--border); }
.prot-count { font-size: 11px; color: var(--text-muted); }

/* ── Tab navigation ── */
.tabs { display: flex; gap: 2px; margin-bottom: 24px; border-bottom: 2px solid var(--border); }
.tab {
  padding: 8px 20px; cursor: pointer; font-size: 14px; color: var(--text-muted);
  border-bottom: 2px solid transparent; margin-bottom: -2px; transition: .15s;
}
.tab:hover { color: var(--text); }
.tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }
.tab-content { display: none; }
.tab-content.active { display: block; }

/* ── Responsive ── */
@media (max-width: 768px) {
  body { flex-direction: column; }
  .sidebar { width: 100%; height: auto; position: static; padding: 16px; }
  .main { padding: 16px; }
}

/* ── Print ── */
@media print {
  .sidebar, .filter-bar, .tabs, .search-box { display: none; }
  .main { max-width: 100%; padding: 0; }
  .protocol-card { break-inside: avoid; box-shadow: none; border: 1px solid #ddd; }
  .tag { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}
</style>
</head>
<body>

<!-- ─── Sidebar ─── -->
<aside class="sidebar">
  <h1>🧬 Healora</h1>
  <div class="subtitle">База знаний протоколов</div>

  <div class="search-box">
    <input type="text" id="search" placeholder="Поиск протоколов..." oninput="filterCards()">
  </div>

  <nav>
    <div class="nav-cat">Разделы</div>
    <a href="#" class="active" onclick="switchTab('protocols', this)">📋 Протоколы (${protocols.length})</a>
    <a href="#" onclick="switchTab('foods', this)">🍎 Продукты (${idx.allFoods.size})</a>
    <a href="#" onclick="switchTab('supps', this)">💊 Биодобавки (${idx.allSupps.size})</a>
    <a href="#" onclick="switchTab('inhibitors', this)">⚠️ Ингибиторы (${Object.keys(idx.allInhibitors).length})</a>

    <div class="nav-cat" style="margin-top:16px;">Категории</div>
    ${CATEGORY_ORDER.map(cat => {
      const count = protocols.filter(p => p.category === cat).length;
      return `<a href="#" data-cat="${cat}" onclick="filterByCategory('${cat}', this)">${CATEGORY_NAMES[cat]} <span class="count">${count}</span></a>`;
    }).join('')}
    <a href="#" onclick="filterByCategory('all', this)" style="margin-top:8px;">📋 Все (${protocols.length})</a>
  </nav>
</aside>

<!-- ─── Main ─── -->
<div class="main">
  <div class="main-header">
    <h1 id="page-title">📋 Протоколы</h1>
    <p id="page-subtitle">Полная база протоколов с источниками, сочетаниями и ингибиторами</p>
  </div>

  <div class="tabs" id="tab-bar">
    <div class="tab active" data-tab="protocols" onclick="switchTab('protocols')">📋 Протоколы</div>
    <div class="tab" data-tab="foods" onclick="switchTab('foods')">🍎 Продукты (${idx.allFoods.size})</div>
    <div class="tab" data-tab="supps" onclick="switchTab('supps')">💊 Биодобавки (${idx.allSupps.size})</div>
    <div class="tab" data-tab="inhibitors" onclick="switchTab('inhibitors')">⚠️ Ингибиторы (${Object.keys(idx.allInhibitors).length})</div>
  </div>

  <div class="filter-bar" id="filter-bar">
    <span class="filter-pill active" data-cat="all" onclick="filterByCategory('all', this)">Все <span class="count">${protocols.length}</span></span>
    ${CATEGORY_ORDER.map(cat => {
      const count = protocols.filter(p => p.category === cat).length;
      return `<span class="filter-pill" data-cat="${cat}" onclick="filterByCategory('${cat}', this)">${CATEGORY_NAMES[cat]} <span class="count">${count}</span></span>`;
    }).join('')}
  </div>

  <!-- Tab: Protocols -->
  <div class="tab-content active" id="tab-protocols">
    <div id="protocols-container">
      ${protocols.map(renderProtocolCard).join('\n')}
    </div>
    <p id="no-results" style="display:none;text-align:center;padding:40px;color:var(--text-muted)">😕 Ничего не найдено. Попробуйте другой запрос.</p>
  </div>

  <!-- Tab: Foods -->
  <div class="tab-content" id="tab-foods">${renderIndexes().match(/<div class="index-section" id="index-foods">.*?<\/div>/s)[0]}</div>

  <!-- Tab: Supps -->
  <div class="tab-content" id="tab-supps">${renderIndexes().match(/<div class="index-section" id="index-supps">.*?<\/div>/s)[0]}</div>

  <!-- Tab: Inhibitors -->
  <div class="tab-content" id="tab-inhibitors">${renderIndexes().match(/<div class="index-section" id="index-inhibitors">.*?<\/div>/s)[0]}</div>
</div>

<script>
// ── Tab switching ──
function switchTab(tab, el) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  const tabEl = el || document.querySelector('.tab[data-tab="' + tab + '"]');
  if (tabEl) tabEl.classList.add('active');

  // Show/hide filter bar and sidebar nav highlight
  document.getElementById('filter-bar').style.display = tab === 'protocols' ? 'flex' : 'none';

  // Update sidebar
  document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
  const sidebarLink = document.querySelector('.sidebar nav a[onclick*="' + tab + '"]');
  if (sidebarLink) {
    // Find nearest ancestor that's a direct child of nav
    const target = document.querySelector('.sidebar nav a[href="#"]:not([data-cat])');
    // Actually, just find by onclick text
  }

  const titles = {
    protocols: { h1: '📋 Протоколы', p: 'Полная база протоколов с источниками, сочетаниями и ингибиторами' },
    foods: { h1: '🍎 Все продукты (' + ${idx.allFoods.size} + ')', p: 'Продукты, рекомендованные в протоколах. Нажмите на продукт, чтобы увидеть связанные протоколы.' },
    supps: { h1: '💊 Все биодобавки (' + ${idx.allSupps.size} + ')', p: 'Биодобавки, рекомендованные в протоколах. Нажмите на БАД, чтобы увидеть связанные протоколы.' },
    inhibitors: { h1: '⚠️ Все факторы-ингибиторы (' + ${Object.keys(idx.allInhibitors).length} + ')', p: 'Факторы, которые снижают эффективность протоколов.' }
  };
  document.getElementById('page-title').textContent = titles[tab].h1;
  document.getElementById('page-subtitle').textContent = titles[tab].p;
}

// ── Category filter ──
function filterByCategory(cat, el) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');

  document.querySelectorAll('.protocol-card').forEach(card => {
    if (cat === 'all') {
      card.style.display = '';
    } else {
      card.style.display = card.dataset.category === cat ? '' : 'none';
    }
  });

  // Update sidebar highlights
  document.querySelectorAll('.sidebar nav a[data-cat]').forEach(a => {
    a.classList.toggle('active', a.dataset.cat === cat);
  });

  filterCards();
}

// ── Search ──
function filterCards() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  let visibleCount = 0;

  document.querySelectorAll('.protocol-card').forEach(card => {
    if (card.style.display === 'none') return; // Already hidden by category filter
    if (!q) { card.style.display = ''; visibleCount++; return; }

    const text = card.textContent.toLowerCase();
    const match = text.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });

  document.getElementById('no-results').style.display = visibleCount === 0 ? 'block' : 'none';
}

// ── Tag click → search ──
document.addEventListener('click', function(e) {
  const tag = e.target.closest('.tag-food, .tag-supp');
  if (tag) {
    const text = tag.dataset.food || tag.dataset.supp || tag.textContent;
    // Normalize: remove superscript count
    const clean = text.replace(/\\s*<sup>.*?<\\/sup>\\s*$/, '').trim();
    // Switch to protocols tab
    switchTab('protocols');
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.filter-pill[data-cat="all"]').classList.add('active');
    document.getElementById('search').value = clean;
    filterCards();
    document.getElementById('search').focus();
  }
});
</script>

</body>
</html>`;

// ── Write HTML ──
fs.writeFileSync(OUTPUT_PATH, HTML, 'utf8');
const sizeKB = (Buffer.byteLength(HTML, 'utf8') / 1024).toFixed(1);

console.log('══════════════════════════════════════════════');
console.log('  Knowledge Agent — HTML Generator');
console.log('══════════════════════════════════════════════\n');
console.log(`📄 Generated: ${path.relative(ROOT, OUTPUT_PATH)}`);
console.log(`📏 Size: ${sizeKB} KB`);
console.log(`🔢 Protocols: ${protocols.length}`);
console.log(`🍎 Foods: ${idx.allFoods.size}`);
console.log(`💊 Supplements: ${idx.allSupps.size}`);
console.log(`⚠️  Inhibitors: ${Object.keys(idx.allInhibitors).length}`);
console.log(`📚 Research links: ${protocols.reduce((s, p) => s + (p.research_links?.length || 0), 0)}`);
console.log('\n✅ Done! Open in browser to view.');
