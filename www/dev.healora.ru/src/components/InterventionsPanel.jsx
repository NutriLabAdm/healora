import React, { useState } from 'react';
import '../assets/css/InterventionsPanel.css';

const InterventionsPanel = ({ profileId, onDragStart, cartItems, onAddToCart, onRemoveFromCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tab, setTab] = useState('interventions');

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
    { id: 'GLYCEMIC_CONTROL', name: 'Гликемический контроль', category: 'nutritional', goal: 'Контроль уровня глюкозы и гликированного гемоглобина', interventions: ['04_1','04_2','04_3','04_6','02_3','03_5'] },
    { id: 'CIRCADIAN_EATING', name: 'Циркадное питание', category: 'nutritional', goal: 'Синхронизация питания с циркадными ритмами', interventions: ['04_4','04_5','01_1','03_5'] },
    { id: 'SLEEP_HYGIENE', name: 'Гигиена сна', category: 'nutritional', goal: 'Улучшение качества и продолжительности сна', interventions: ['01_1','01_2','01_3','03_1','03_7'] },
    { id: 'HYDRATION', name: 'Гидратация', category: 'nutritional', goal: 'Оптимизация водного баланса', interventions: ['03_9','03_10','04_7'] },
    { id: 'NUTRITIONAL_BASELINE', name: 'Базовые добавки', category: 'nutritional', goal: 'Коррекция нутритивного статуса', interventions: ['05_1','05_2','05_3','05_4','07_1'] },
    { id: 'METABOLIC_CARDIO_RISKS', name: 'Метаболические риски', category: 'medical', goal: 'Снижение метаболических и сердечно-сосудистых рисков', interventions: ['02_1','02_2','04_1','07_1','07_2'] },
    { id: 'CARDIOVASCULAR_HEALTH', name: 'Сердечно-сосудистое здоровье', category: 'medical', goal: 'Улучшение кардиоваскулярных показателей', interventions: ['02_1','02_3','02_6','08_1','04_6','05_2','07_1'] },
    { id: 'INFLAMMATORY_SYSTEMIC', name: 'Противовоспалительный', category: 'medical', goal: 'Снижение системного воспаления', interventions: ['05_6','04_6','05_2','03_6','02_3','05_5'] },
    { id: 'RAPID_WEIGHT_LOSS', name: 'Быстрое снижение веса', category: 'medical', goal: 'Интенсивное снижение веса под контролем', interventions: ['04_1','04_2','02_1','02_2','07_1'] },
    { id: 'OZEMPIC_JUMPERS', name: 'Протокол GLP-1 агонистов (Оземпик)', category: 'medical', goal: 'Сопровождение терапии GLP-1 агонистами с сохранением мышечной массы', interventions: ['OZ_01','OZ_02','OZ_03','OZ_04','OZ_05','OZ_06','OZ_10'] },
    { id: 'COGNITIVE_HEALTH', name: 'Когнитивное здоровье', category: 'mental', goal: 'Улучшение когнитивных функций и профилактика нейродегенерации', interventions: ['05_7','03_1','03_6','05_2','02_2'] },
    { id: 'PAIN_MANAGEMENT', name: 'Управление болью', category: 'mental', goal: 'Снижение хронической боли', interventions: ['03_2','03_6','05_3','03_1'] },
    { id: 'DEPRESSION', name: 'Поддержка при депрессии', category: 'mental', goal: 'Улучшение настроения и эмоционального фона', interventions: ['02_3','03_1','03_6','05_5','03_7','05_2','05_3'] },
    { id: 'RECOVERY_REGENERATION', name: 'Восстановление и регенерация', category: 'physical', goal: 'Ускорение восстановления после нагрузок', interventions: ['05_1','05_2','05_3','03_6','03_7','01_1','02_6'] },
    { id: 'EATING_DISORDERS', name: 'Расстройства пищевого поведения', category: 'mental', goal: 'Нормализация пищевого поведения', interventions: ['04_4','04_5','03_1','03_6','03_7'] },
    { id: 'HORMONAL_ENDOCRINE', name: 'Гормональный/эндокринный', category: 'medical', goal: 'Балансировка гормонального фона', interventions: ['07_1','04_6','05_1','05_3','05_2','02_2','03_6'] },
    { id: 'LONGEVITY', name: 'Долголетие', category: 'nutritional', goal: 'Комплексная программа для активного долголетия', interventions: ['04_1','04_6','02_1','02_2','03_6','05_1','05_2','07_1'] },
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
          {protocols.map(p => (
            <div key={p.id} className={`protocol-card ${p.id === 'OZEMPIC_JUMPERS' ? 'protocol-danger' : ''}`}>
              <div className="protocol-card-header">
                <span className="protocol-card-name">{p.name}</span>
                <span className={`protocol-card-cat ${p.category}`}>{p.category === 'nutritional' ? 'Питание' : p.category === 'medical' ? 'Медицина' : p.category === 'mental' ? 'Ментальный' : 'Физический'}</span>
              </div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterventionsPanel;
