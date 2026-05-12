import React, { useState } from 'react';
import '../assets/css/InterventionsPanel.css';

const InterventionsPanel = ({ profileId, onDragStart, cartItems, onAddToCart, onRemoveFromCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tab, setTab] = useState('interventions');
  const [expandedProtocol, setExpandedProtocol] = useState(null);
  const [showBacklog, setShowBacklog] = useState(false);

  const categories = [
    { key: 'all', label: 'Все', color: '#6b21c8' },
    { key: 'sleep', label: 'Сон', color: '#1976d2' },
    { key: 'physical', label: 'Физический', color: '#388e3c' },
    { key: 'mental', label: 'Ментальный', color: '#7b1fa2' },
    { key: 'food', label: 'Питание', color: '#f57c00' },
    { key: 'medical', label: 'Медицинский', color: '#d32f2f' },
    { key: 'supplement', label: 'Добавки', color: '#795548' },
  ];

  const interventions = [
    { code: '01_1', name: 'Сон: время отхода', category: 'sleep', impact: 9.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Фиксированное время отхода ко сну для стабилизации циркадных ритмов' },
    { code: '01_2', name: 'Сон: продолжительность', category: 'sleep', impact: 8.5, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Рекомендовано 7-9 часов сна' },
    { code: '01_3', name: 'Сон: качество', category: 'sleep', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Улучшение качества сна через гигиену сна' },
    { code: '02_1', name: 'Тренировки: ВИИТ', category: 'physical', impact: 9.0, type: 'behavior', evidence: 'A', regularity: 'weekly', description: 'Высокоинтенсивный интервальный тренинг для кардио' },
    { code: '02_2', name: 'Тренировки: силовые', category: 'physical', impact: 8.5, type: 'behavior', evidence: 'A', regularity: 'weekly', description: 'Регулярные силовые тренировки для мышечной массы' },
    { code: '02_3', name: 'Тренировки: аэробные', category: 'physical', impact: 9.0, type: 'behavior', evidence: 'A', regularity: 'weekly', description: 'Бег, плавание, велосипед' },
    { code: '02_4', name: 'Тренировки: гибкость', category: 'physical', impact: 7.5, type: 'behavior', evidence: 'B', regularity: 'weekly', description: 'Растяжка и йога для гибкости' },
    { code: '02_6', name: 'Тренировки: зона 2', category: 'physical', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'weekly', description: 'Тренировки в зоне 2 для выносливости' },
    { code: '03_1', name: 'Медитация', category: 'mental', impact: 8.5, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Медитация и осознанность для снижения стресса' },
    { code: '03_2', name: 'Дыхательные упражнения', category: 'mental', impact: 7.0, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Глубокое дыхание для активации парасимпатической системы' },
    { code: '03_5', name: 'Сон', category: 'sleep', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Гигиена сна и режим' },
    { code: '03_6', name: 'Управление стрессом', category: 'mental', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Техники управления стрессом' },
    { code: '03_7', name: 'Цифровой детокс', category: 'mental', impact: 7.5, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Отказ от экранов за 1-2 часа до сна' },
    { code: '03_9', name: 'Водный режим', category: 'food', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Оптимальный водный баланс' },
    { code: '03_10', name: 'Баланс электролитов', category: 'food', impact: 7.0, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Поддержание баланса электролитов' },
    { code: '04_1', name: 'Ограничение калорий', category: 'food', impact: 8.5, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Умеренное ограничение калорий для долголетия' },
    { code: '04_2', name: 'Контроль углеводов', category: 'food', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Контроль потребления углеводов' },
    { code: '04_3', name: 'Снижение сахара', category: 'food', impact: 7.5, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Снижение потребления сахара' },
    { code: '04_4', name: 'Ограничение по времени', category: 'food', impact: 8.0, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Питание в ограниченное время (16:8)' },
    { code: '04_5', name: 'Ранние приемы пищи', category: 'food', impact: 7.5, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Ранние приемы пищи для циркадного питания' },
    { code: '04_6', name: 'Богатая клетчаткой диета', category: 'food', impact: 7.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Диета с высоким содержанием клетчатки' },
    { code: '04_7', name: 'Снижение кофеина', category: 'food', impact: 6.5, type: 'behavior', evidence: 'B', regularity: 'daily', description: 'Снижение потребления кофеина' },
    { code: '05_1', name: 'Витамин D3', category: 'supplement', impact: 8.0, type: 'supplement', evidence: 'A', regularity: 'daily', description: 'Прием витамина D3 для костей и иммунитета' },
    { code: '05_2', name: 'Омега-3', category: 'supplement', impact: 8.5, type: 'supplement', evidence: 'A', regularity: 'daily', description: 'Прием Омега-3 для сердца и мозга' },
    { code: '05_3', name: 'Магний', category: 'supplement', impact: 7.5, type: 'supplement', evidence: 'A', regularity: 'daily', description: 'Прием магния для мышц и сна' },
    { code: '05_4', name: 'В-комплекс', category: 'supplement', impact: 7.0, type: 'supplement', evidence: 'B', regularity: 'daily', description: 'Комплекс витаминов группы B' },
    { code: '05_5', name: 'Адаптогены', category: 'supplement', impact: 7.5, type: 'supplement', evidence: 'B', regularity: 'daily', description: 'Адаптогены для стрессоустойчивости' },
    { code: '05_6', name: 'Противовоспалительная диета', category: 'food', impact: 8.0, type: 'behavior', evidence: 'A', regularity: 'daily', description: 'Диета для снижения воспаления' },
    { code: '05_7', name: 'Ноотропы', category: 'supplement', impact: 7.0, type: 'supplement', evidence: 'B', regularity: 'daily', description: 'Ноотропы для когнитивных функций' },
    { code: '07_1', name: 'Регулярный чекап', category: 'medical', impact: 9.0, type: 'diagnostic', evidence: 'A', regularity: 'yearly', description: 'Ежегодные медицинские осмотры' },
    { code: '07_2', name: 'Направление к кардиологу', category: 'medical', impact: 9.0, type: 'diagnostic', evidence: 'A', regularity: 'yearly', description: 'При подозрении на сердечно-сосудистые риски' },
    { code: '08_1', name: 'Мониторинг ЧСС', category: 'physical', impact: 8.5, type: 'device', evidence: 'B', regularity: 'daily', description: 'Отслеживание вариабельности сердечного ритма' },
  ];

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

  const filteredInterventions = activeCategory === 'all'
    ? interventions
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

  const isInCart = (code) => {
    return cartItems && cartItems.find(i => i.code === code);
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.color : '#757575';
  };

  const toggleCart = (intervention) => {
    if (isInCart(intervention.code)) {
      if (onRemoveFromCart) onRemoveFromCart(intervention.code);
    } else {
      if (onAddToCart) onAddToCart(intervention);
    }
  };

  return (
    <div className="interventions-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          <button className={`panel-tab ${tab === 'interventions' ? 'active' : ''}`} onClick={() => setTab('interventions')}>Интервенции</button>
          <button className={`panel-tab ${tab === 'protocols' ? 'active' : ''}`} onClick={() => setTab('protocols')}>Протоколы</button>
        </div>
        <span className="count">{cartItems ? cartItems.length : 0} в корзине</span>
        <span className="version-link" onClick={() => setShowBacklog(true)}>ver 0.7</span>
      </div>

      {tab === 'interventions' && (
        <>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`cat-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                style={activeCategory === cat.key ? { background: cat.color, color: 'white' } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="interventions-table">
            <div className="table-header">
              <span className="col-code">Код</span>
              <span className="col-name">Название</span>
              <span className="col-impact">I</span>
              <span className="col-evidence">E</span>
              <span className="col-regularity">Период</span>
              <span className="col-status">Статус</span>
            </div>
            {filteredInterventions.map(intervention => (
              <div
                key={intervention.code}
                className={`table-row ${isInCart(intervention.code) ? 'in-cart' : ''}`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify(intervention));
                  if (onDragStart) onDragStart(intervention);
                }}
                onClick={() => toggleCart(intervention)}
                style={{ cursor: 'grab', borderLeftColor: getCategoryColor(intervention.category) }}
                title="Клик: добавить/убрать из корзины, перетащите на таймлайн"
              >
                 <span className="col-code">{intervention.code}</span>
                 <span className="col-name">{intervention.name}</span>
                 <span className="col-impact" style={{ color: getImpactColor(intervention.impact) }}>
                  {intervention.impact}
                 </span>
                 <span className="col-evidence" style={{ color: getEvidenceBadge(intervention.evidence) }}>
                  {intervention.evidence}
                 </span>
                 <span className="col-regularity">
                  {intervention.regularity === 'daily' ? 'Ежедн.' : intervention.regularity === 'weekly' ? 'Еженед.' : intervention.regularity === 'yearly' ? 'Ежегодно' : intervention.regularity}
                 </span>
                 <span className="col-status">
                  {isInCart(intervention.code) ? '✕' : '+'}
                 </span>
              </div>
            ))}
          </div>
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

      {showBacklog && (
        <div className="backlog-overlay" onClick={() => setShowBacklog(false)}>
          <div className="backlog-modal" onClick={e => e.stopPropagation()}>
            <div className="backlog-header">
              <span>Healora — Backlog</span>
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
