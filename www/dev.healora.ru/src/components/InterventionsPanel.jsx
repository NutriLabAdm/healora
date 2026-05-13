import React, { useState } from 'react';
import '../assets/css/InterventionsPanel.css';
import catalogData from '../assets/data/interventions_catalog.json';
import supplementsCatalog from '../assets/data/supplements_catalog.json';
import dietsCatalog from '../assets/data/diets_catalog.json';

const __BUILD_TIME__ = import.meta.env.VITE_BUILD_TIME || new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

const InterventionsPanel = ({ profileId, onDragStart, cartItems, onAddToCart, onRemoveFromCart, onOrderPlan }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [supplementGroup, setSupplementGroup] = useState('all');
  const [foodGroup, setFoodGroup] = useState('all');
  const [tab, setTab] = useState('interventions');
  const [expandedProtocol, setExpandedProtocol] = useState(null);
  const [showBacklog, setShowBacklog] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [showLegend, setShowLegend] = useState(false);

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

  const protocols = [
    { id: 'GLYCEMIC_CONTROL', name: 'Гликемический контроль', category: 'nutritional', goal: 'Контроль уровня глюкозы и гликированного гемоглобина', interventions: ['04_1','04_2','04_3','04_6','02_3','03_5'], red_flags: [{metric:'Глюкоза натощак',threshold:'>7.0 ммоль/л',action:'Консультация эндокринолога'},{metric:'HbA1c',threshold:'>7%',action:'Интенсификация терапии'}], recommendations:['Ограничить простые углеводы','Увеличить клетчатку','Контроль порций','Регулярный мониторинг глюкозы'] },
    { id: 'CIRCADIAN_EATING', name: 'Циркадное питание', category: 'nutritional', goal: 'Синхронизация питания с циркадными ритмами', interventions: ['04_4','04_5','01_1','03_5'], red_flags: [{metric:'Время последнего приема',threshold:'после 20:00',action:'Перенести ужин на 18:00-19:00'},{metric:'Пропуск завтрака',threshold:'>3 раза в неделю',action:'Установить регулярный завтрак'}], recommendations:['Ужин за 3-4 часа до сна','Завтрак в течение 1 часа после пробуждения','Пищевое окно 8-10 часов'] },
    { id: 'SLEEP_HYGIENE', name: 'Гигиена сна', category: 'nutritional', goal: 'Улучшение качества и продолжительности сна', interventions: ['01_1','01_2','01_3','03_1','03_7'], red_flags: [{metric:'Длительность сна',threshold:'<6 часов',action:'Сдвиг отхода ко сну на 15 мин раньше'},{metric:'Вариабельность пробуждения',threshold:'>2 часа',action:'Установить постоянное время пробуждения'}], recommendations:['Ложиться и вставать в одно время','Без экранов за 60 мин до сна','Прохлада 18-20°C','Ритуал расслабления 30 мин'] },
    { id: 'HYDRATION', name: 'Гидратация', category: 'nutritional', goal: 'Оптимизация водного баланса', interventions: ['03_9','03_10','04_7'], red_flags: [{metric:'Цвет мочи',threshold:'Темный',action:'Увеличить потребление воды'},{metric:'Суточное потребление',threshold:'<1.5 л',action:'Пить 2-3 л воды в день'}], recommendations:['2-3 л воды в день','Снизить кофеин до 1-2 чашек','Электролиты при нагрузках'] },
    { id: 'NUTRITIONAL_BASELINE', name: 'Базовые добавки', category: 'nutritional', goal: 'Коррекция нутритивного статуса', interventions: ['05_1','05_2','05_3','05_4','07_1'], red_flags: [{metric:'Уровень 25(OH)D',threshold:'<30 нг/мл',action:'Коррекция дозы D3'},{metric:'Омега-3 индекс',threshold:'<4%',action:'Увеличить дозу Омега-3'}], recommendations:['D3: 2000-5000 МЕ/день','Омега-3: 2-3 г/день','Магний: 300-400 мг/день','В-комплекс: 1 капсула/день'] },
    { id: 'METABOLIC_CARDIO_RISKS', name: 'Метаболические риски', category: 'medical', goal: 'Снижение метаболических и сердечно-сосудистых рисков', interventions: ['02_1','02_2','04_1','07_1','07_2'], red_flags: [{metric:'АД',threshold:'>140/90',action:'Консультация кардиолога'},{metric:'Холестерин ЛПНП',threshold:'>3.0 ммоль/л',action:'Диета + статины'}], recommendations:['ВИИТ 2-3 раза в неделю','Силовые 2 раза в неделю','Дефицит калорий 300-500 ккал','Чекап раз в 6 мес'] },
    { id: 'CARDIOVASCULAR_HEALTH', name: 'Сердечно-сосудистое здоровье', category: 'medical', goal: 'Улучшение кардиоваскулярных показателей', interventions: ['02_1','02_3','02_6','08_1','04_6','05_2','07_1'], red_flags: [{metric:'ЧСС покоя',threshold:'>100 уд/мин',action:'Консультация кардиолога'},{metric:'Вариабельность ЧСС',threshold:'<20 мс',action:'Снизить стресс, улучшить сон'}], recommendations:['Зона 2: 150 мин/нед','ВИИТ: 1 раз/нед','Омега-3: 2-3 г/день','Ежедневный мониторинг ЧСС'] },
    { id: 'INFLAMMATORY_SYSTEMIC', name: 'Противовоспалительный', category: 'medical', goal: 'Снижение системного воспаления', interventions: ['05_6','04_6','05_2','03_6','02_3','05_5'], red_flags: [{metric:'СРБ',threshold:'>3 мг/л',action:'Усилить противовоспалительную диету'},{metric:'ФНО-α',threshold:'>2.8 пг/мл',action:'Добавить куркумин/Омега-3'}], recommendations:['Противовоспалительная диета','Исключить трансжиры и сахар','Омега-3 3 г/день','Адаптогены: ашваганда/родиола'] },
    { id: 'RAPID_WEIGHT_LOSS', name: 'Быстрое снижение веса', category: 'medical', goal: 'Интенсивное снижение веса под контролем', interventions: ['04_1','04_2','02_1','02_2','07_1'], red_flags: [{metric:'Темп снижения',threshold:'>2 кг/нед',action:'Увеличить калорийность'},{metric:'Мышечная масса',threshold:'Потеря >1 кг/мес',action:'Увеличить белок + силовые'}], recommendations:['Дефицит 500-800 ккал/день','Белок 1.6-2 г/кг','ВИИТ 3 раза/нед','Силовые 2 раза/нед','Чекап каждые 2 нед'] },
    { id: 'OZEMPIC_JUMPERS', name: 'Протокол GLP-1 агонистов (Оземпик)', category: 'medical', goal: 'Сопровождение терапии GLP-1 агонистами с сохранением мышечной массы', interventions: ['OZ_01','OZ_02','OZ_03','OZ_04','OZ_05','OZ_06','OZ_10'], red_flags: [{metric:'Потеря мышечной массы',threshold:'>1.5 кг/мес',action:'Белок 2.2 г/кг + силовые'},{metric:'Тошнота/рвота',threshold:'>3 дней',action:'Консультация врача'}], recommendations:['Белок 1.6-2.2 г/кг','Силовые 3-4 раза/нед','Гидратация 2.5-3 л/день','Электролиты ежедневно','Дробное питание 5-6 раз/день'] },
    { id: 'COGNITIVE_HEALTH', name: 'Когнитивное здоровье', category: 'mental', goal: 'Улучшение когнитивных функций и профилактика нейродегенерации', interventions: ['05_7','03_1','03_6','05_2','02_2'], red_flags: [{metric:'Ухудшение памяти',threshold:'Прогрессирующее',action:'Невролог + когнитивное тестирование'},{metric:'Концентрация',threshold:'Снижение >3 мес',action:'Проверить дефициты B12, D, ферритин'}], recommendations:['Медитация 10-15 мин/день','Омега-3 2-3 г/день','Силовые тренировки','Ноотропы курсами','Цифровой детокс вечером'] },
    { id: 'PAIN_MANAGEMENT', name: 'Управление болью', category: 'mental', goal: 'Снижение хронической боли', interventions: ['03_2','03_6','05_3','03_1'], red_flags: [{metric:'Интенсивность боли',threshold:'7/10 >3 дней',action:'Консультация невролога'},{metric:'Качество сна',threshold:'<5 часов',action:'Усилить протокол гигиены сна'}], recommendations:['Дыхательные практики 5-10 мин','Магний 300-400 мг/день','Медитация сканирования тела','Управление стрессом'] },
    { id: 'DEPRESSION', name: 'Поддержка при депрессии', category: 'mental', goal: 'Улучшение настроения и эмоционального фона', interventions: ['02_3','03_1','03_6','05_5','03_7','05_2','05_3'], red_flags: [{metric:'Суицидальные мысли',threshold:'Любые',action:'Немедленно к психиатру'},{metric:'Апатия',threshold:'>2 нед',action:'Психотерапия + антидепрессанты'}], recommendations:['Аэробные нагрузки 30 мин/день','Медитация 2 раза/день','Цифровой детокс','Омега-3 3 г/день','Витамин D 5000 МЕ/день'] },
    { id: 'RECOVERY_REGENERATION', name: 'Восстановление и регенерация', category: 'physical', goal: 'Ускорение восстановления после нагрузок', interventions: ['05_1','05_2','05_3','03_6','03_7','01_1','02_6'], red_flags: [{metric:'Креатинкиназа',threshold:'>500 Ед/л',action:'Снизить нагрузку на 50%'},{metric:'Субъективное восстановление',threshold:'<2/10',action:'Доп. день отдыха'}], recommendations:['Сон 8-9 часов','Магний 400 мг/день','D3 5000 МЕ/день','Зона 2 восстановление','Контрастный душ'] },
    { id: 'EATING_DISORDERS', name: 'Расстройства пищевого поведения', category: 'mental', goal: 'Нормализация пищевого поведения', interventions: ['04_4','04_5','03_1','03_6','03_7'], red_flags: [{metric:'Пропуск приемов пищи',threshold:'>1 раза/день',action:'Психотерапия + регулярное питание'},{metric:'Переедание',threshold:'>2 раз/нед',action:'Дневник питания + психолог'}], recommendations:['3+1 приемов пищи в день','Осознанное питание','Медитация перед едой','Исключить диеты','Цифровой детокс'] },
    { id: 'HORMONAL_ENDOCRINE', name: 'Гормональный/эндокринный', category: 'medical', goal: 'Балансировка гормонального фона', interventions: ['07_1','04_6','05_1','05_3','05_2','02_2','03_6'], red_flags: [{metric:'ТТГ',threshold:'>4.0 мМЕ/л',action:'Эндокринолог'},{metric:'Тестостерон (муж)',threshold:'<12 нмоль/л',action:'Андролог'}], recommendations:['Чекап гормонов раз в 6 мес','Силовые 3 раза/нед','D3 5000 МЕ/день','Магний 400 мг/день','Омега-3 2 г/день'] },
    { id: 'LONGEVITY', name: 'Долголетие', category: 'nutritional', goal: 'Комплексная программа для активного долголетия', interventions: ['04_1','04_6','02_1','02_2','03_6','05_1','05_2','07_1'], red_flags: [{metric:'Показатель Healora Score',threshold:'<60',action:'Комплексная коррекция образа жизни'},{metric:'Биологический возраст',threshold:'>хронологического на 5+ лет',action:'Интенсификация протокола'}], recommendations:['Ограничение калорий (CR)','ВИИТ + силовые','Противовоспалительная диета','D3 5000 МЕ/день','Омега-3 2-3 г/день','Чекап раз в год'] },
  ];

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
        <span className="version-link" onClick={() => setShowBacklog(true)}>ver 0.7 | {__BUILD_TIME__}</span>
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
        <div className="protocols-list">
          {protocols.map(p => {
            const isExpanded = expandedProtocol === p.id;
            const toggle = () => setExpandedProtocol(isExpanded ? null : p.id);
            return (
              <div key={p.id} className={`protocol-card ${p.id === 'OZEMPIC_JUMPERS' ? 'protocol-danger' : ''} ${isExpanded ? 'expanded' : ''}`} onClick={toggle}>
                <div className="protocol-card-header">
                  <span className="protocol-card-name">{p.name}</span>
                  <span className={`protocol-card-cat ${p.category}`}>{p.category === 'nutritional' ? 'Питание' : p.category === 'medical' ? 'Медицина' : p.category === 'mental' ? 'Ментальный' : 'Физический'}</span>
                  <span className="protocol-chevron">{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div className="protocol-card-body">
                    <p className="protocol-card-goal">{p.goal}</p>
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
              <span>Healora — Backlog</span>
              <span className="version-build">{__BUILD_TIME__}</span>
              <span className="backlog-close" onClick={() => setShowBacklog(false)}>×</span>
            </div>
            <div className="backlog-body">
              <div className="backlog-section">
                <div className="backlog-section-title">✓ Реализовано</div>
                <ul className="backlog-list">
                  <li><b>Digital Twin</b> с D3.js графиками: Life Expectancy Dial, Weight Projection, Habit Impact, Biomarker Radar, Adherence Ring, Weight Timeline, Risk Reduction, Network Graph — 24ч</li>
                  <li><b>Каталог интервенций</b> (32 шт) с категориями, evidence-level, impact score — 6ч</li>
                  <li><b>Drag & drop</b> на таймлайн с корзиной — 8ч</li>
                  <li><b>Дневник питания</b> с загрузкой/отображением фото, KBZU, NDI — 12ч</li>
                  <li><b>API хранения дневника</b> (JSON, POST/GET) — 4ч</li>
                  <li><b>Протоколы</b> (17 шт) с red flags, рекомендациями, expand/collapse — 10ч</li>
                  <li><b>Корзина интервенций</b> (+/- из каталога) — 3ч</li>
                  <li><b>Healora Score</b> — алгоритм и визуализация — 6ч</li>
                  <li><b>Адаптивная вёрстка</b> 400px панели + табы Интервенции/Протоколы — 5ч</li>
                  <li><b>Профили пользователей</b> (TEST_001–TEST_003) — 3ч</li>
                  <li><b>Дашборд</b> с выборкой профиля — 4ч</li>
                  <li><b>Food-каталог</b> (17 блюд с фото, нутриентами, NDI) — 5ч</li>
                  <li><b>Proxy API</b> через Vite (dev) + nginx (prod) — 2ч</li>
                  <li><b>SSL + CI/CD</b> devops.sh, deploy-dev.sh — 4ч</li>
                  <li><b>Дизайн-система</b>: шрифты Sora/DM Sans, цветовая схема — 6ч</li>
                  <li><b>Модальное окно беклога</b> с версией — 1ч</li>
                  <li><b>Диаграмма Gantt</b> для таймлайна интервенций — 8ч</li>
                  <li><b>Интеграция с GLP-1 протоколом</b> (Ozempic Jumpers) с красной маркировкой — 3ч</li>
                  <li><b>Сохранение состояния</b> дневника при переключении дней — 4ч</li>
                  <li><b>Валидация API</b> (profile_id, day обязательны) — 1ч</li>
                  <li><b>Структура проекта</b>: www/dev.healora.ru + api/ + docs/ — 3ч</li>
                  <li><b>Документация протоколов</b> (17 JSON-файлов с метриками) — 8ч</li>
                  <li><b>Разметка веб-страницы</b> healora.ru (landing) — 6ч</li>
                  <li><b>Мнемонические коды</b> интервенций (≤7 символов: SL_, PH_, MN_, FD_, SP_, DG_, M_) — 4ч</li>
                  <li><b>Клик → попап</b> вместо корзины: карточка интервенции с описанием и протоколами — 3ч</li>
                  <li><b>Регулярность</b> односимвольными кодами (D/W/M/Y/P) — 1ч</li>
                  <li><b>Легенда I/E/Per</b> с модальным пояснением и примерами — 1ч</li>
                  <li><b>Чат-модалка</b>: панель быстрых действий (Профиль/План/Дневник/Фото еды) — 1ч</li>
                  <li><b>CSS-переменные</b> вместо inline-стилей для кнопок категорий — 1ч</li>
                  <li><b>Yandex Metrika</b> с setTimeout(0) — 1ч</li>
                  <li><b>Build timestamp</b> VITE_BUILD_TIME в версии и беклоге — 1ч</li>
                </ul>
              </div>
              <div className="backlog-section">
                <div className="backlog-section-title">○ В плане</div>
                <ul className="backlog-list planned">
                  <li>AI-рекомендации на основе NDI</li>
                  <li>Интеграция с носимыми устройствами</li>
                  <li>Чат-интерфейс</li>
                  <li>Модуль тренировок с прогрессом</li>
                  <li>Социальные функции (группы)</li>
                  <li>Маркетплейс добавок</li>
                  <li>ML-модель для предсказаний</li>
                  <li>Мобильное приложение (PWA)</li>
                  <li>Многоязычность (EN/DE)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionsPanel;
