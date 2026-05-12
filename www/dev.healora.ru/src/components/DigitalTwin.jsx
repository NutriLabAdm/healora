import React, { useState, useCallback, useEffect, useRef } from 'react';
import '../assets/css/DigitalTwin.css';
import catalogData from '../assets/data/interventions_catalog.json';
import protocolData from '../assets/data/protocol_mappings.json';
import foodCatalog from '../assets/data/food_catalog.json';

const DigitalTwin = ({ profileId, selectedProtocol, cartItems, onRemoveFromCart }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulationDay, setSimulationDay] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const [timelineInterventions, setTimelineInterventions] = useState([]);
  const [clipStates, setClipStates] = useState({});
  const [interventionLog, setInterventionLog] = useState([]);
  const [stars, setStars] = useState(0);
  const [targetValues, setTargetValues] = useState({});
  const [parameterAlerts, setParameterAlerts] = useState({});
  const [showAssessment, setShowAssessment] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [recommendedProtocols, setRecommendedProtocols] = useState([]);
  const [interventionTab, setInterventionTab] = useState('interventions');
  const [collapsedSections, setCollapsedSections] = useState({
    demographics: false, vitals: false, labs: false, lifestyle: false, genetics: false, medical: false
  });
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [clipMultipliers, setClipMultipliers] = useState({});
  const [timelineView, setTimelineView] = useState('days'); // 'days' | 'weeks' | 'phases'
  const [draggedClip, setDraggedClip] = useState(null);
  const [showInterventionPopup, setShowInterventionPopup] = useState(false);
  const [selectedInterventionForPopup, setSelectedInterventionForPopup] = useState(null);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [diaryDay, setDiaryDay] = useState(null);
  const [diaryData, setDiaryData] = useState(null);
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [selectedFoodMealIdx, setSelectedFoodMealIdx] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [foodKeywordFilter, setFoodKeywordFilter] = useState(null);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [selectedProtocolForScheduling, setSelectedProtocolForScheduling] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showProtocolPopup, setShowProtocolPopup] = useState(false);
  const [selectedProtocolForPopup, setSelectedProtocolForPopup] = useState(null);
  const simulationSpeedRef = useRef(1);

  const defaultDiaryData = (day) => ({
    day, waterMl: 0, mood: { energy: '', mood: '', sleep: '', stress: '', digestion: '' },
    voiceNote: '', audioFile: null, comment: '',
    meals: [
      { type: 'breakfast', label: 'Завтрак', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '08:00', duration: '20' },
      { type: 'lunch', label: 'Обед', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '13:00', duration: '30' },
      { type: 'dinner', label: 'Ужин', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '19:00', duration: '30' },
      { type: 'snack', label: 'Перекус', photo: '', description: '', calories: '', protein: '', fat: '', carbs: '', ndi: '', recommendations: '', time: '16:00', duration: '10' },
    ],
  });

  // Full attribute catalog matching MD file
  const attributeCatalog = {
    demographics: {
      title: '01 Демография',
      color: '#6b21c8',
      code: '01_DEMO',
      attributes: [
        { id: 'age', code: '01_1_DEMO_AGE', name: 'Возраст', current: profile?.demographics?.age, target: null, unit: 'лет', norm: '18-65', editable: true },
        { id: 'sex', code: '01_2_DEMO_GENDER', name: 'Пол', current: profile?.demographics?.sex, target: null, unit: '', norm: 'M/F', editable: true },
        { id: 'height', code: '01_3_DEMO_HEIGHT', name: 'Рост', current: profile?.anthropometrics?.height_cm, target: null, unit: 'см', norm: '150-200', editable: true },
        { id: 'weight', code: '01_4_DEMO_WEIGHT', name: 'Вес', current: profile?.anthropometrics?.weight_kg, target: 70, unit: 'кг', norm: '50-120', editable: true },
        { id: 'bmi', code: '01_19_BIO_BMI', name: 'ИМТ', current: profile?.anthropometrics?.bmi, target: 22, unit: 'кг/м²', norm: '18.5-25', editable: false },
        { id: 'waist', code: '01_20_BIO_WAIST', name: 'Талия', current: profile?.anthropometrics?.waist_cm, target: 80, unit: 'см', norm: '60-100', editable: true },
        { id: 'ethnicity', code: '01_5_DEMO_ETHNICITY', name: 'Этническая принадлежность', current: profile?.demographics?.ethnicity_or_background, target: null, unit: '', norm: '-', editable: true },
      ]
    },
    vitals: {
      title: '02 Витальные',
      color: '#1976d2',
      code: '02_BIO_VITALS',
      attributes: [
        { id: 'bp_syst', code: '02_1_BIO_BP_SYST', name: 'АД систолическое', current: profile?.vitals?.systolic_bp_mmhg, target: 120, unit: 'мм рт.ст.', norm: '90-130', editable: true },
        { id: 'bp_diast', code: '02_2_BIO_BP_DIAST', name: 'АД диастолическое', current: profile?.vitals?.diastolic_bp_mmhg, target: 80, unit: 'мм рт.ст.', norm: '60-85', editable: true },
        { id: 'hr', code: '02_3_BIO_HR', name: 'ЧСС покоя', current: profile?.vitals?.resting_hr_bpm, target: 72, unit: 'уд/мин', norm: '60-80', editable: true },
        { id: 'hrv', code: '02_3_BIO_HRV', name: 'HRV', current: profile?.vitals?.hrv_ms, target: 60, unit: 'мс', norm: '40-100', editable: true },
        { id: 'spo2', code: '02_3_BIO_SPO2', name: 'SpO2', current: profile?.vitals?.spo2_percent, target: 98, unit: '%', norm: '95-100', editable: true },
      ]
    },
    labs: {
      title: '03 Лаборатории',
      color: '#0288d1',
      code: '03_BIO_LABS',
      attributes: [
        { id: 'glucose', code: '02_4_BIO_GLUCOSE', name: 'Глюкоза', current: profile?.labs?.glucose_mg_dl, target: 100, unit: 'мг/дл', norm: '70-100', editable: true },
        { id: 'hba1c', code: '02_4_BIO_HBA1C', name: 'HbA1c', current: profile?.labs?.hba1c_percent, target: 5.5, unit: '%', norm: '4.0-5.6', editable: true },
        { id: 'tchol', code: '02_5_BIO_TCHOL', name: 'Холестерин общий', current: profile?.labs?.total_cholesterol_mg_dl, target: 200, unit: 'мг/дл', norm: '<200', editable: true },
        { id: 'hdl', code: '02_6_BIO_HDL', name: 'ЛПВП', current: profile?.labs?.hdl_mg_dl, target: 60, unit: 'мг/дл', norm: '>40', editable: true },
        { id: 'ldl', code: '02_7_BIO_LDL', name: 'ЛПНП', current: profile?.labs?.ldl_mg_dl, target: 100, unit: 'мг/дл', norm: '<100', editable: true },
        { id: 'tg', code: '02_8_BIO_TG', name: 'Триглицериды', current: profile?.labs?.triglycerides_mg_dl, target: 150, unit: 'мг/дл', norm: '<150', editable: true },
        { id: 'crp', code: '02_9_BIO_CRP', name: 'CRP', current: profile?.labs?.crp_mg_l, target: 1, unit: 'мг/л', norm: '<3', editable: true },
        { id: 'vitd', code: '02_16_BIO_VITD', name: 'Витамин D', current: profile?.labs?.vitamin_d, target: 40, unit: 'нг/мл', norm: '30-100', editable: true },
        { id: 'ferritin', code: '02_18_BIO_FERRITIN', name: 'Ферритин', current: profile?.labs?.ferritin, target: 80, unit: 'нг/мл', norm: '20-200', editable: true },
        { id: 'tsh', code: '02_15_BIO_TSH', name: 'ТТГ', current: profile?.labs?.tsh, target: 2.5, unit: 'мМЕ/л', norm: '0.4-4.0', editable: true },
      ]
    },
    lifestyle: {
      title: '04 Образ жизни',
      color: '#388e3c',
      code: '04_LIFE',
      attributes: [
        { id: 'sleep', code: '03_5_LIFE_SLEEP', name: 'Сон', current: profile?.lifestyle?.sleep_hours, target: 7.5, unit: 'ч', norm: '7-9', editable: true },
        { id: 'stress', code: '03_6_LIFE_STRESS', name: 'Стресс', current: profile?.lifestyle?.stress_level_0_10, target: 3, unit: '/10', norm: '<5', editable: true },
        { id: 'steps', code: '03_8_LIFE_STEPS', name: 'Шаги', current: profile?.lifestyle?.daily_steps, target: 10000, unit: '/день', norm: '8000-12000', editable: true },
        { id: 'water', code: '03_9_LIFE_WATER', name: 'Вода', current: profile?.lifestyle?.water_l_day, target: 2.5, unit: 'л/день', norm: '2-3', editable: true },
        { id: 'smoking', code: '03_1_LIFE_SMOKE', name: 'Курение', current: profile?.lifestyle?.smoking, target: null, unit: '', norm: 'Нет', editable: true },
        { id: 'alcohol', code: '03_2_LIFE_ALCOHOL', name: 'Алкоголь', current: profile?.lifestyle?.alcohol, target: null, unit: '', norm: 'Редко', editable: true },
        { id: 'exercise_freq', code: '03_3_LIFE_EXERC_FREQ', name: 'Тренировки', current: profile?.lifestyle?.physical_activity, target: null, unit: '', norm: '3-5/нед', editable: true },
        { id: 'exercise_type', code: '03_4_LIFE_EXERC_TYPE', name: 'Тип активности', current: profile?.lifestyle?.exercise_type, target: null, unit: '', norm: '-', editable: true },
        { id: 'diet', code: '03_7_LIFE_DIET', name: 'Питание', current: profile?.lifestyle?.diet, target: null, unit: '', norm: 'Сбалансир.', editable: true },
      ]
    },
    genetics: {
      title: '05 Генетика',
      color: '#7b1fa2',
      code: '05_GENE',
      attributes: [
        { id: 'apoe', code: '04_1_GENE_APOE', name: 'APOE', current: profile?.genetics?.apoe, target: null, unit: '', norm: 'e3/e3', editable: true },
        { id: 'mthfr', code: '04_2_GENE_MTHFR', name: 'MTHFR', current: profile?.genetics?.mthfr, target: null, unit: '', norm: 'Нет', editable: true },
        { id: 'lactase', code: '04_3_GENE_LACTASE', name: 'Лактаза', current: profile?.genetics?.lactase_persistence, target: null, unit: '', norm: 'Да', editable: true },
        { id: 'brca', code: '04_4_GENE_BRCA', name: 'BRCA1/2', current: profile?.genetics?.brca_status, target: null, unit: '', norm: 'Neg', editable: true },
      ]
    },
    medical: {
      title: '06 Медицина',
      color: '#c62828',
      code: '06_MED',
      attributes: [
        { id: 'medications', code: '06_3_MED_MED', name: 'Препараты', current: profile?.medical_history?.current_medications?.join(', '), target: null, unit: '', norm: '-', editable: true },
        { id: 'allergies', code: '06_4_MED_ALLR', name: 'Аллергии', current: profile?.medical_history?.allergies, target: null, unit: '', norm: 'Нет', editable: true },
        { id: 'cv_history', code: '05_1_FAM_CVD', name: 'ССЗ в семье', current: profile?.medical_history?.cardiovascular_disease === 'yes' ? 'Есть' : 'Нет', target: null, unit: '', norm: 'Нет', editable: true },
        { id: 'dm_history', code: '05_2_FAM_DM', name: 'Диабет в семье', current: profile?.medical_history?.diabetes === 'yes' ? 'Есть' : 'Нет', target: null, unit: '', norm: 'Нет', editable: true },
        { id: 'family_history', code: '05_3_FAM_CA', name: 'Онкология в семье', current: profile?.medical_history?.family_history, target: null, unit: '', norm: 'Нет', editable: true },
      ]
    }
  };

  // Get interventions affecting this attribute
  const getInterventionsForAttribute = (attrId) => {
    const affected = [];
    Object.entries(interventionCatalog).forEach(([code, intervention]) => {
      if (intervention.biomarkers && intervention.biomarkers.some(b => b.toLowerCase().includes(attrId.toLowerCase()) || attrId.toLowerCase().includes(b.toLowerCase()))) {
        affected.push({ code, ...intervention });
      }
    });
    return affected;
  };

  const simulationRef = useRef(null);
  const playheadRef = useRef(null);
  const timelineRef = useRef(null);
  const lastProcessedDayRef = useRef(-1);
  const timelineInterventionsRef = useRef(timelineInterventions);
  timelineInterventionsRef.current = timelineInterventions;
  const applyInterventionRef = useRef();

  useEffect(() => { applyInterventionRef.current = applyInterventionEffect; });

  const TRACK_HEIGHT = 36;

  const protocols = protocolData;

  const interventionCatalog = {};
  Object.entries(catalogData.interventions).forEach(([code, entry]) => {
    interventionCatalog[code] = {
      code,
      name: entry.name,
      category: entry.category,
      color: entry.color,
      impact: entry.impact,
      regularity: entry.regularity || 'daily',
      type: entry.type,
      evidence: entry.evidence,
      probability: entry.probability ?? 0.5,
      description: entry.short_description,
      delivery_type: entry.delivery_type || 'chatbot',
      report_effort: entry.report_effort || 'light',
      sources: entry.sources || '-',
      biomarkers: entry.biomarkers || entry.affects || [],
    };
  });

  const protocolEffects = {
    '01_1': ['sleep', 'systolic_bp', 'diastolic_bp'],
    '02_1': ['resting_hr', 'systolic_bp', 'diastolic_bp', 'cholesterol', 'weight'],
    '02_3': ['resting_hr', 'systolic_bp', 'diastolic_bp', 'glucose'],
    '03_1': ['stress', 'hrv', 'sleep'],
    '03_5': ['sleep'],
    '04_1': ['glucose', 'cholesterol', 'weight'],
    '04_2': ['glucose'],
    '04_3': ['glucose'],
    '04_6': ['cholesterol'],
    '05_1': ['vitamin_d'],
    '05_2': ['cholesterol'],
    '05_3': ['stress'],
    '07_1': ['vitamin_d', 'ferritin', 'tsh'],
    '08_1': ['hrv', 'resting_hr']
  };

  const getDaysForIntervention = (regularity, startDay = 0) => {
    const days = [];
    switch (regularity) {
      case 'daily': for (let d = startDay; d <= 90; d++) days.push(d); break;
      case 'weekly': for (let d = startDay; d <= 90; d += 7) days.push(d); break;
      case 'monthly': for (let d = startDay; d <= 90; d += 30) days.push(d); break;
      case 'once': default: days.push(startDay); break;
    }
    return days;
  };

  const addProtocolToTimeline = (protocolKey) => {
    const protocol = protocols[protocolKey];
    if (!protocol) return;
    const newItems = [];
    protocol.interventions.forEach(code => {
      const intervention = interventionCatalog[code];
      if (!intervention || timelineInterventions.find(i => i.code === code)) return;
      const days = getDaysForIntervention(intervention.regularity, 0);
      days.forEach(day => newItems.push({ ...intervention, day, protocolKey }));
    });
    if (newItems.length > 0) setTimelineInterventions(prev => [...prev, ...newItems]);
    setSelectedProtocolForScheduling(protocolKey);
  };

  const createPlanByCategories = () => {
    const newItems = [];
    const added = new Set();
    const addFrom = (list) => {
      list.forEach(item => {
        const code = item.code || item;
        if (added.size >= 10) return;
        if (added.has(code)) return;
        const intervention = interventionCatalog[code];
        if (!intervention || timelineInterventions.find(i => i.code === code)) return;
        added.add(code);
        const days = getDaysForIntervention(intervention.regularity, 0);
        days.forEach(day => newItems.push({ ...intervention, day, categoryKey: intervention.category }));
      });
    };
    if (recommendedProtocols.length > 0) {
      recommendedProtocols.forEach(p => addFrom(p.interventions));
    } else {
      addFrom(Object.keys(interventionCatalog));
    }
    if (newItems.length > 0) setTimelineInterventions(prev => [...prev, ...newItems]);
  };

  const attrToBiomarker = {
    weight: 'weight', bmi: 'bmi', waist: 'waist',
    bp_syst: 'systolic_bp', bp_diast: 'diastolic_bp', hr: 'resting_hr',
    glucose: 'glucose', tchol: 'cholesterol',
    sleep: 'sleep', stress: 'stress', steps: 'daily_steps', water: 'water_l_day',
    vitd: 'vitamin_d', ferritin: 'ferritin', tsh: 'tsh', hrv: 'hrv',
  };

  const assessHealth = () => {
    const newAlerts = {};
    const alertedBiomarkers = [];
    Object.entries(attributeCatalog).forEach(([sectionKey, section]) => {
      (section.attributes || []).forEach(attr => {
        const target = targetValues[attr.id] ?? attr.target;
        if (attr.id === 'age' || attr.id === 'sex') return;
        if (attr.current != null && target != null && target > 0) {
          if (attr.current > target * 1.15) {
            newAlerts[attr.id] = `Высокий уровень (${attr.current} ${attr.unit || ''})`;
            const bio = attrToBiomarker[attr.id];
            if (bio) alertedBiomarkers.push(bio);
          } else if (attr.current < target * 0.85) {
            newAlerts[attr.id] = `Низкий уровень (${attr.current} ${attr.unit || ''})`;
            const bio = attrToBiomarker[attr.id];
            if (bio) alertedBiomarkers.push(bio);
          }
        }
      });
    });
    setParameterAlerts(newAlerts);
    setShowAssessment(true);

    const suggested = [];
    Object.entries(protocols).forEach(([key, proto]) => {
      const matches = (proto.interventions || []).some(code => {
        const effects = protocolEffects[code] || [];
        return effects.some(bio => alertedBiomarkers.includes(bio));
      });
      if (matches) suggested.push({ ...proto, protocolKey: key });
    });
    setRecommendedProtocols(suggested);
  };

  const fallbackProfiles = {
    'TEST_001': { profile_id: 'TEST_001', name: 'Анна', photo: '03_Natalia_42_salad.png', demographics: { sex: 'female', age: 28, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 58, height_cm: 168, bmi: 20.2, waist_cm: 72 }, vitals: { systolic_bp_mmhg: 105, diastolic_bp_mmhg: 68, resting_hr_bpm: 64, hrv_ms: 72, spo2_percent: 98 }, labs: { glucose_mg_dl: 88, total_cholesterol_mg_dl: 175, hdl_mg_dl: 55, ldl_mg_dl: 100, triglycerides_mg_dl: 120, hba1c_percent: 5.2, crp_mg_l: 0.8, vitamin_d: 32, ferritin: 65, tsh: 2.1 }, lifestyle: { sleep_hours: 7.5, stress_level_0_10: 3, daily_steps: 8200, water_l_day: 1.8, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-5/нед', exercise_type: 'бег', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 840, health_risk_score: 18, risk_level: 'low' } },
    'TEST_002': { profile_id: 'TEST_002', name: 'Михаил', photo: '10_Alex_48_soup.png', demographics: { sex: 'male', age: 42, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 96, height_cm: 182, bmi: 31.2, waist_cm: 104 }, vitals: { systolic_bp_mmhg: 142, diastolic_bp_mmhg: 91, resting_hr_bpm: 78, hrv_ms: 38, spo2_percent: 96 }, labs: { glucose_mg_dl: 112, total_cholesterol_mg_dl: 245, hdl_mg_dl: 38, ldl_mg_dl: 160, triglycerides_mg_dl: 210, hba1c_percent: 5.9, crp_mg_l: 3.2, vitamin_d: 18, ferritin: 140, tsh: 3.8 }, lifestyle: { sleep_hours: 6, stress_level_0_10: 7, daily_steps: 4200, water_l_day: 1.2, smoking: 'Курит', alcohol: 'Регулярно', physical_activity: '0-1/нед', diet: 'смешанная' }, genetics: { apoe: 'e3/e4', mthfr: 'Гетерозигота', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: ['статины'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'no', family_history: 'ИБС у отца' }, digital_twin_scores: { current_stars: 210, health_risk_score: 52, risk_level: 'high' } },
    'TEST_003': { profile_id: 'TEST_003', name: 'Елена', photo: '16_Anastasia_37_street.png', demographics: { sex: 'female', age: 34, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 64, height_cm: 170, bmi: 22.1, waist_cm: 76 }, vitals: { systolic_bp_mmhg: 118, diastolic_bp_mmhg: 76, resting_hr_bpm: 70, hrv_ms: 55, spo2_percent: 98 }, labs: { glucose_mg_dl: 95, total_cholesterol_mg_dl: 200, hdl_mg_dl: 52, ldl_mg_dl: 120, triglycerides_mg_dl: 140, hba1c_percent: 5.4, crp_mg_l: 1.2, vitamin_d: 24, ferritin: 80, tsh: 2.8 }, lifestyle: { sleep_hours: 7, stress_level_0_10: 5, daily_steps: 6500, water_l_day: 1.5, smoking: 'Нет', alcohol: 'По праздникам', physical_activity: '2-3/нед', exercise_type: 'йога', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 650, health_risk_score: 28, risk_level: 'medium' } },
    'P005': { profile_id: 'P005', name: 'Дмитрий', photo: '05_Дмитрий_55_notepad.png', demographics: { sex: 'male', age: 55, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 88, height_cm: 178, bmi: 27.8, waist_cm: 98 }, vitals: { systolic_bp_mmhg: 135, diastolic_bp_mmhg: 88, resting_hr_bpm: 72, hrv_ms: 35, spo2_percent: 96 }, labs: { glucose_mg_dl: 105, total_cholesterol_mg_dl: 220, hdl_mg_dl: 42, ldl_mg_dl: 140, triglycerides_mg_dl: 180, hba1c_percent: 5.7, crp_mg_l: 2.1, vitamin_d: 20, ferritin: 130, tsh: 2.8 }, lifestyle: { sleep_hours: 6.5, stress_level_0_10: 6, daily_steps: 5000, water_l_day: 1.4, smoking: 'Бросил', alcohol: '1-2/нед', physical_activity: '1-2/нед', diet: 'смешанная' }, genetics: { apoe: 'e3/e3', mthfr: 'Гетерозигота', lactase_persistence: 'Нет', brca_status: 'Neg' }, medical_history: { current_medications: ['гипотензивные'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'no', family_history: 'Гипертония' }, digital_twin_scores: { current_stars: 450, health_risk_score: 42, risk_level: 'medium' } },
    'P007': { profile_id: 'P007', name: 'Иван', photo: '07_Ivan_13_chips.png', demographics: { sex: 'male', age: 13, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 48, height_cm: 158, bmi: 19.2, waist_cm: 65 }, vitals: { systolic_bp_mmhg: 108, diastolic_bp_mmhg: 68, resting_hr_bpm: 78, hrv_ms: 58, spo2_percent: 99 }, labs: { glucose_mg_dl: 82, total_cholesterol_mg_dl: 140, hdl_mg_dl: 48, ldl_mg_dl: 80, triglycerides_mg_dl: 90, hba1c_percent: 4.8, crp_mg_l: 0.5, vitamin_d: 30, ferritin: 50, tsh: 1.9 }, lifestyle: { sleep_hours: 9, stress_level_0_10: 2, daily_steps: 10000, water_l_day: 1.0, smoking: 'Нет', alcohol: 'Нет', physical_activity: '5-7/нед', diet: 'домашняя' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 950, health_risk_score: 10, risk_level: 'low' } },
    'P014': { profile_id: 'P014', name: 'Екатерина', photo: '14_Ekaterina_39_wearable.png', demographics: { sex: 'female', age: 39, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 60, height_cm: 170, bmi: 20.8, waist_cm: 72 }, vitals: { systolic_bp_mmhg: 115, diastolic_bp_mmhg: 74, resting_hr_bpm: 66, hrv_ms: 58, spo2_percent: 98 }, labs: { glucose_mg_dl: 90, total_cholesterol_mg_dl: 180, hdl_mg_dl: 58, ldl_mg_dl: 105, triglycerides_mg_dl: 115, hba1c_percent: 5.1, crp_mg_l: 0.9, vitamin_d: 30, ferritin: 70, tsh: 2.2 }, lifestyle: { sleep_hours: 7.8, stress_level_0_10: 4, daily_steps: 8000, water_l_day: 1.7, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-4/нед', exercise_type: 'бег', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 780, health_risk_score: 22, risk_level: 'low' } },
    'P019b': { profile_id: 'P019b', name: 'Стас', photo: '19_Stas_35_dog_bike.png', demographics: { sex: 'male', age: 35, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 82, height_cm: 178, bmi: 24.8, waist_cm: 84 }, vitals: { systolic_bp_mmhg: 125, diastolic_bp_mmhg: 80, resting_hr_bpm: 68, hrv_ms: 50, spo2_percent: 98 }, labs: { glucose_mg_dl: 92, total_cholesterol_mg_dl: 190, hdl_mg_dl: 48, ldl_mg_dl: 115, triglycerides_mg_dl: 135, hba1c_percent: 5.3, crp_mg_l: 1.0, vitamin_d: 28, ferritin: 90, tsh: 2.4 }, lifestyle: { sleep_hours: 7.2, stress_level_0_10: 4, daily_steps: 7500, water_l_day: 1.8, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-4/нед', exercise_type: 'велосипед', diet: 'сбалансированная' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 680, health_risk_score: 26, risk_level: 'low' } },
    'P022': { profile_id: 'P022', name: 'Варя', photo: '22_Varya_30_yoga.png', demographics: { sex: 'female', age: 30, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 57, height_cm: 166, bmi: 20.2, waist_cm: 70 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70, resting_hr_bpm: 65, hrv_ms: 62, spo2_percent: 99 }, labs: { glucose_mg_dl: 86, total_cholesterol_mg_dl: 165, hdl_mg_dl: 62, ldl_mg_dl: 95, triglycerides_mg_dl: 100, hba1c_percent: 5.0, crp_mg_l: 0.6, vitamin_d: 35, ferritin: 60, tsh: 2.0 }, lifestyle: { sleep_hours: 8, stress_level_0_10: 3, daily_steps: 9000, water_l_day: 2.0, smoking: 'Нет', alcohol: 'Редко', physical_activity: '4-5/нед', exercise_type: 'йога', diet: 'вегетарианская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 900, health_risk_score: 14, risk_level: 'low' } },
    'P025': { profile_id: 'P025', name: 'Катя', photo: '25_Katya_29_office.png', demographics: { sex: 'female', age: 29, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 59, height_cm: 167, bmi: 20.7, waist_cm: 71 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70, resting_hr_bpm: 66, hrv_ms: 60, spo2_percent: 99 }, labs: { glucose_mg_dl: 88, total_cholesterol_mg_dl: 170, hdl_mg_dl: 60, ldl_mg_dl: 98, triglycerides_mg_dl: 105, hba1c_percent: 5.1, crp_mg_l: 0.7, vitamin_d: 32, ferritin: 62, tsh: 2.1 }, lifestyle: { sleep_hours: 7.5, stress_level_0_10: 4, daily_steps: 7000, water_l_day: 1.6, smoking: 'Нет', alcohol: 'Редко', physical_activity: '2-3/нед', exercise_type: 'фитнес', diet: 'сбалансированная' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 640, health_risk_score: 24, risk_level: 'low' } },
    'P008': { profile_id: 'P008', name: 'Галина', photo: '08_Galina_75_Vika_9_balcony.png', demographics: { sex: 'female', age: 75, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 68, height_cm: 160, bmi: 26.6, waist_cm: 86 }, vitals: { systolic_bp_mmhg: 148, diastolic_bp_mmhg: 88, resting_hr_bpm: 74, hrv_ms: 28, spo2_percent: 94 }, labs: { glucose_mg_dl: 110, total_cholesterol_mg_dl: 235, hdl_mg_dl: 40, ldl_mg_dl: 155, triglycerides_mg_dl: 195, hba1c_percent: 6.0, crp_mg_l: 3.5, vitamin_d: 14, ferritin: 105, tsh: 3.5 }, lifestyle: { sleep_hours: 6, stress_level_0_10: 3, daily_steps: 3500, water_l_day: 1.2, smoking: 'Нет', alcohol: 'Нет', physical_activity: '1/нед', diet: 'домашняя' }, genetics: { apoe: 'e3/e4', mthfr: 'Гетерозигота', lactase_persistence: 'Нет', brca_status: 'Neg' }, medical_history: { current_medications: ['гипотензивные', 'статины'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'yes', family_history: 'ИБС, СД 2 типа' }, digital_twin_scores: { current_stars: 320, health_risk_score: 55, risk_level: 'high' } },
  };

  useEffect(() => {
    if (!profileId) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const cached = fallbackProfiles[profileId];
    if (cached) {
      setProfile(cached);
      setStars(cached.digital_twin_scores?.current_stars || 0);
      setLoading(false);
    }
    fetch(`/api/profiles/${profileId}`)
      .then(res => { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
      .then(data => {
        setProfile(data.profile || null);
        setStars(data.profile?.digital_twin_scores?.current_stars || 0);
        setLoading(false);
      })
      .catch(() => {
        if (!cached) setProfile(null);
        setLoading(false);
      });
  }, [profileId]);

  const simulationDayRef = useRef(0);
  const chatRef = useRef(null);
  // Keep ref in sync with state
  useEffect(() => { simulationDayRef.current = simulationDay; }, [simulationDay]);
  useEffect(() => { simulationSpeedRef.current = simulationSpeed; }, [simulationSpeed]);

  const handleTimelineClick = useCallback((e) => {
    if (!timelineRef.current || isPlaying) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newDay = Math.max(0, Math.min(90, Math.round(percent * 90)));
    setSimulationDay(newDay);
    if (lastProcessedDayRef.current < 0) lastProcessedDayRef.current = simulationDayRef.current;
    const start = lastProcessedDayRef.current + 1;
    for (let d = start; d <= newDay; d++) {
      timelineInterventionsRef.current.forEach(clip => {
        if (clip.day === d) applyInterventionRef.current(clip, d);
      });
    }
    if (newDay > lastProcessedDayRef.current) lastProcessedDayRef.current = newDay;
  }, [isPlaying]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data || !timelineRef.current) return;

    const intervention = JSON.parse(data);
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const dropDay = Math.max(0, Math.min(90, Math.round(percent * 90)));

    setTimelineInterventions(prev => {
      const filtered = prev.filter(i => i.code !== intervention.code);
      const days = getDaysForIntervention(intervention.regularity, dropDay);
      const newItems = days.map(day => ({ ...intervention, day }));
      return [...filtered, ...newItems];
    });

    setClipStates(prev => ({
      ...prev,
      [intervention.code]: { state: 0, day: dropDay }
    }));
  }, []);

  const handlePlayheadMouseDown = useCallback((e) => {
    if (isPlaying) return;
    e.stopPropagation();
    setIsDragging(true);
  }, [isPlaying]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      const newDay = Math.max(0, Math.min(90, Math.round(percent * 90)));
      setSimulationDay(newDay);
      const start = lastProcessedDayRef.current + 1;
      for (let d = start; d <= newDay; d++) {
        timelineInterventionsRef.current.forEach(clip => {
          if (clip.day === d) applyInterventionRef.current(clip, d);
        });
      }
      if (newDay > lastProcessedDayRef.current) lastProcessedDayRef.current = newDay;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      if (lastProcessedDayRef.current < 0) lastProcessedDayRef.current = simulationDayRef.current;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const applyInterventionEffect = useCallback((clip, day) => {
    const success = Math.random() < (clip.probability ?? 0.5);

    if (success) {
      const starsGained = Math.round(clip.impact * 10);
      setStars(prev => prev + starsGained);

      setInterventionLog(prev => [...prev, {
        day,
        code: clip.code,
        name: clip.name,
        state: 'Активировано',
        starsGained
      }]);
    } else {
      setInterventionLog(prev => [...prev, {
        day,
        code: clip.code,
        name: clip.name,
        state: 'Игнорировано',
        starsGained: 0
      }]);
    }
  }, []);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setIsPlaying(true);
    setSimulationDay(0);
    setInterventionLog([]);
    lastProcessedDayRef.current = 0;

    simulationRef.current = setInterval(() => {
      setSimulationDay(prev => {
        const next = prev + 1;
        if (next > 90) {
          clearInterval(simulationRef.current);
          setIsSimulating(false);
          setIsPlaying(false);
          return 90;
        }

        timelineInterventionsRef.current.forEach(clip => {
          if (clip.day === next) {
            applyInterventionEffect(clip, next);
          }
        });

        return next;
      });
    }, 100 / simulationSpeedRef.current);
  };

  const stopSimulation = () => {
    if (simulationRef.current) clearInterval(simulationRef.current);
    setIsSimulating(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (simulationRef.current) clearInterval(simulationRef.current);
    };
  }, []);

  const userResponses = [
    { text: '✅ Готово!', weight: 25 },
    { text: '📤 Отправил!', weight: 15 },
    { text: '⏳ В следующий раз', weight: 10 },
    { text: '👍 Сделано', weight: 20 },
    { text: '📝 Записал', weight: 10 },
    { text: '✅ Выполнено', weight: 15 },
    { text: '📊 Готово, данные отправил', weight: 5 },
  ];

  const pickWeighted = (arr) => {
    const total = arr.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * total;
    for (const item of arr) {
      r -= item.weight;
      if (r <= 0) return item.text;
    }
    return arr[0].text;
  };

  useEffect(() => {
    if (!showChat || interventionLog.length === 0) return;
    const last = interventionLog[interventionLog.length - 1];
    const exists = chatMessages.some(m => m.id === `${last.day}_${last.code}`);
    if (exists) return;
    const catData = interventionCatalog[last.code];
    const msg = {
      id: `${last.day}_${last.code}`,
      type: 'intervention',
      day: last.day,
      code: last.code,
      name: last.name,
      state: last.state,
      category: catData?.category || last.category,
      time: `${String(6 + (last.day * 7) % 14).padStart(2, '0')}:${String((last.day * 17) % 60).padStart(2, '0')}`,
    };
    setChatMessages(prev => [...prev, msg]);
    const timeout = setTimeout(() => {
      setChatMessages(prev => prev.map(m =>
        m.id === msg.id ? { ...m, response: pickWeighted(userResponses) } : m
      ));
    }, 1200 + Math.random() * 800);
    return () => clearTimeout(timeout);
  }, [interventionLog, showChat, interventionCatalog]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#00c853';
      case 'warning': return '#ff9100';
      case 'bad': return '#d50000';
      default: return '#2979ff';
    }
  };

  const isAttributeAffected = (attrName) => {
    if (!selectedProtocol) return false;
    const effects = protocolEffects[selectedProtocol.code];
    if (!effects) return false;
    return effects.some(e => attrName.toLowerCase().includes(e.toLowerCase()));
  };

  const removeFromTimeline = (interventionCode) => {
    // Remove ALL instances of this intervention code (daily/weekly create multiple entries)
    setTimelineInterventions(prev => prev.filter(i => i.code !== interventionCode));
    if (onRemoveFromCart) onRemoveFromCart(interventionCode);
  };

  const scheduleFromProtocol = (protocolKey) => {
    const protocol = protocols[protocolKey];
    if (!protocol) return;

    const startDay = simulationDay;
    protocol.interventions.forEach((code, index) => {
      const intervention = interventionCatalog[code];
      if (intervention && !timelineInterventions.find(i => i.code === code)) {
        const day = startDay + index * 3;
        setTimelineInterventions(prev => [...prev, { code, ...intervention, day }]);
        setClipStates(prev => ({
          ...prev,
          [code]: { state: 0, day }
        }));
      }
    });
    setSelectedProtocolForScheduling(null);
  };

  // Initialize targetValues from digitalTwinData defaults
  useEffect(() => {
    if (!profile) return;
    const defaults = {};
    Object.values(digitalTwinData || {}).forEach(section => {
      (section.attributes || []).forEach(attr => {
        if (attr.id !== 'stars' && attr.target != null) defaults[attr.id] = attr.target;
      });
    });
    setTargetValues(prev => {
      if (Object.keys(prev).length === 0) return defaults;
      return prev;
    });
  }, [profile]);

  const digitalTwinData = profile ? {
    profile: {
      title: 'Профиль',
      color: '#f57c00',
      stars: profile.digital_twin_scores?.current_stars || 0,
      subscription: 'Premium',
      attributes: [
        { id: 'stars', name: 'Звезды', start: 0, current: profile.digital_twin_scores?.current_stars || 0, target: 2000, unit: 'очков' },
        { id: 'risk', name: 'Оценка риска', start: profile.digital_twin_scores?.health_risk_score, current: profile.digital_twin_scores?.health_risk_score, target: 15, unit: '/100' },
      ]
    },
    demographics: {
      title: 'Демография',
      color: '#6b21c8',
      attributes: [
        { id: '01_4', name: 'Вес', start: profile.anthropometrics?.weight_kg, current: profile.anthropometrics?.weight_kg, target: 70, unit: 'кг' },
        { id: '01_5', name: 'ИМТ', start: profile.anthropometrics?.bmi, current: profile.anthropometrics?.bmi, target: 22, unit: 'кг/м²' },
        { id: '01_6', name: 'Талия', start: profile.anthropometrics?.waist_cm, current: profile.anthropometrics?.waist_cm, target: 80, unit: 'см' },
      ]
    },
    biomarkers: {
      title: 'Биомаркеры',
      color: '#1976d2',
      attributes: [
        { id: '02_1', name: 'АД систолическое', start: profile.vitals?.systolic_bp_mmhg, current: profile.vitals?.systolic_bp_mmhg, target: 120, unit: 'мм рт.ст.' },
        { id: '02_3', name: 'ЧСС', start: profile.vitals?.resting_hr_bpm, current: profile.vitals?.resting_hr_bpm, target: 72, unit: 'уд/мин' },
        { id: '02_6', name: 'Глюкоза', start: profile.labs?.glucose_mg_dl, current: profile.labs?.glucose_mg_dl, target: 100, unit: 'мг/дл' },
        { id: '02_8', name: 'Общий холестерин', start: profile.labs?.total_cholesterol_mg_dl, current: profile.labs?.total_cholesterol_mg_dl, target: 200, unit: 'мг/дл' },
      ]
    },
    lifestyle: {
      title: 'Образ жизни',
      color: '#388e3c',
      attributes: [
        { id: '03_5', name: 'Сон', start: profile.lifestyle?.sleep_hours, current: profile.lifestyle?.sleep_hours, target: 7.5, unit: 'часов' },
        { id: '03_6', name: 'Стресс', start: profile.lifestyle?.stress_level_0_10, current: profile.lifestyle?.stress_level_0_10, target: 3, unit: '/10' },
        { id: '03_8', name: 'Шаги', start: profile.lifestyle?.daily_steps, current: profile.lifestyle?.daily_steps, target: 10000, unit: '/день' },
        { id: '03_9', name: 'Вода', start: profile.lifestyle?.water_l_day, current: profile.lifestyle?.water_l_day, target: 2.5, unit: 'л/день' },
      ]
    }
  } : null;

  const updateTargetValue = (attrId, newTarget) => {
    setTargetValues(prev => ({ ...prev, [attrId]: newTarget }));
  };

  const incrementTarget = (attrId, currentValue) => {
    const newValue = currentValue + 1;
    setTargetValues(prev => ({ ...prev, [attrId]: newValue }));
  };

  const decrementTarget = (attrId, currentValue) => {
    const newValue = (currentValue || 0) - 1;
    setTargetValues(prev => ({ ...prev, [attrId]: newValue }));
  };

  const startEdit = (attrId, currentVal) => {
    setEditingField(attrId);
    setEditingValue(currentVal !== null && currentVal !== undefined ? String(currentVal) : '');
  };

  const saveEdit = (sectionKey, attrId) => {
    setEditingField(null);
  };

  const formatAttrValue = (val) => {
    if (val === null || val === undefined || val === '') return '—';
    if (typeof val === 'boolean') return val ? 'Да' : 'Нет';
    return val;
  };

  return (
    <div className="digital-twin-container">
      {!profileId && (
        <div className="no-profile-selected">
          <h3>Выберите Цифровой Двойник</h3>
          <p>Выберите профиль из левой панели</p>
        </div>
      )}

      {profileId && loading && (
        <div className="loading">Загрузка данных профиля...</div>
      )}

        {profile && digitalTwinData && (
           <>
           {/* Timeline */}
           <div className="daw-container">
            <div className="daw-header">
              <div className="daw-title">
               <div className="interv-tabs">
                 <button className={`interv-tab ${interventionTab === 'protocols' ? 'active' : ''}`} onClick={() => setInterventionTab('protocols')}>Протоколы</button>
                 <button className={`interv-tab ${interventionTab === 'interventions' ? 'active' : ''}`} onClick={() => setInterventionTab('interventions')}>Интервенции</button>
               </div>
              </div>
              <div className="daw-controls">
                <button className="daw-btn" onClick={() => setShowPlanPopup(true)} title="План интервенций">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                  План
                </button>
                <button className="daw-btn" onClick={() => setTimelineInterventions([])} title="Очистить план">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Очистить
                </button>
                <button className="daw-btn" onClick={isPlaying ? stopSimulation : startSimulation}>
                  {isPlaying ? 'Стоп' : 'Старт'}
                </button>
                {!isPlaying && (
                  <div className="speed-control">
                    <span className="speed-label">x</span>
                    {[1, 2, 5, 10].map(s => (
                      <button key={s} className={`speed-btn ${simulationSpeed === s ? 'active' : ''}`}
                        onClick={() => setSimulationSpeed(s)}>{s}</button>
                    ))}
                  </div>
                )}
                <div className="daw-day-display">
                  <span>День: {simulationDay}/90</span>
                </div>
                <div className="timeline-view-toggle">
                  <button className={`view-btn ${timelineView === 'days' ? 'active' : ''}`} onClick={() => setTimelineView('days')}>1д</button>
                  <button className={`view-btn ${timelineView === 'weeks' ? 'active' : ''}`} onClick={() => setTimelineView('weeks')}>1н</button>
                  <button className={`view-btn ${timelineView === 'phases' ? 'active' : ''}`} onClick={() => setTimelineView('phases')}>Фазы</button>
                </div>
              </div>
            </div>

            {interventionTab === 'protocols' && (
              <div className="protocols-panel">
                <div className="panel-header">
                  <button className="interv-tab active">Протоколы</button>
                  <div className="panel-header-actions">
                    <span className="protocols-count">{recommendedProtocols.length} рекомендовано</span>
                    <button className="daw-btn" onClick={() => setInterventionTab('interventions')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                      Интервенции
                    </button>
                  </div>
                </div>
                <div className="protocols-list">
                  {recommendedProtocols.length > 0 ? recommendedProtocols.map((protocol) => (
                    <div key={protocol.protocolKey || protocol.key} className="protocol-card" onClick={() => { setSelectedProtocolForPopup(protocol); setShowProtocolPopup(true); }}>
                      <div className="protocol-card-header">
                        <span className="protocol-card-name">{protocol.name}</span>
                        <button className="daw-btn" title="Добавить на таймлайн" onClick={(e) => { e.stopPropagation(); addProtocolToTimeline(protocol.protocolKey || protocol.key); }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </button>
                      </div>
                      <span className="protocol-card-category">{protocol.category}</span>
                      <div className="protocol-card-interventions">
                        {protocol.interventions.map(code => (
                          <span key={code} className="protocol-card-chip">{code}</span>
                        ))}
                      </div>
                    </div>
                  )) : (
                    Object.entries(protocols).slice(0, 6).map(([key, proto]) => (
                      <div key={key} className="protocol-card" onClick={() => { setSelectedProtocolForPopup(proto); setShowProtocolPopup(true); }}>
                        <div className="protocol-card-header">
                          <span className="protocol-card-name">{proto.name}</span>
                          <button className="daw-btn" title="Добавить на таймлайн" onClick={(e) => { e.stopPropagation(); addProtocolToTimeline(key); }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          </button>
                        </div>
                        <span className="protocol-card-category">{proto.category}</span>
                        <div className="protocol-card-interventions">
                          {proto.interventions.map(code => (
                            <span key={code} className="protocol-card-chip">{code}</span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {interventionTab === 'interventions' && (
            /* Track Table: Category | Name | Multiplier | Track */
            <div className="tracks" ref={timelineRef} onClick={handleTimelineClick} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); }}>
              <div className="track-table">
                <div className="track-table-header">
                  <span className="th-cat" title="Категория">Кат</span>
                  <span className="th-name">Название</span>
                  <span className="th-track">
                    <span className="th-track-text">График интервенций</span>
                    <span className="th-track-labels">
                      {timelineView === 'days' && [0,10,20,30,40,50,60,70,80,90].map(d => (
                        <span key={d} className="th-track-label" style={{ left: `${(d/90)*100}%` }}>{d}</span>
                      ))}
                      {timelineView === 'weeks' && [1,2,3,4,5,6,7,8,9,10,11,12,13].map(w => (
                        <span key={w} className="th-track-label" style={{ left: `${((w-1)/13)*100}%` }}>{w}н</span>
                      ))}
                      {timelineView === 'phases' && ['Фаза 1','Фаза 2','Фаза 3','Фаза 4'].map((p,i) => (
                        <span key={i} className="th-track-label" style={{ left: `${(i/4)*100}%` }}>{p}</span>
                      ))}
                    </span>
                  </span>
                </div>
                {(() => {
                  const categoryGroups = {
                    'sleep': { name: 'Сон', color: '#2196f3', interventions: [] },
                    'physical': { name: 'Физический', color: '#4caf50', interventions: [] },
                    'mental': { name: 'Ментальный', color: '#9c27b0', interventions: [] },
                    'food': { name: 'Питание', color: '#ff9800', interventions: [] },
                    'medical': { name: 'Медицинский', color: '#f44336', interventions: [] },
                    'supplement': { name: 'Добавки', color: '#795548', interventions: [] },
                  };

                  timelineInterventions.forEach((clip) => {
                    const cat = clip.category || 'food';
                    if (categoryGroups[cat]) {
                      if (!categoryGroups[cat].interventions.find(i => i.code === clip.code)) {
                        categoryGroups[cat].interventions.push(clip);
                      }
                    }
                  });

                  const flatItems = [];
                  Object.entries(categoryGroups).forEach(([catKey, cat]) => {
                    if (cat.interventions.length > 0) {
                      cat.interventions.forEach(clip => flatItems.push({ type: 'intervention', clip, categoryKey: catKey }));
                    }
                  });

                  // Sort by code, then by day
                  flatItems.sort((a, b) => {
                    const ca = a.clip.code || '';
                    const cb = b.clip.code || '';
                    const codeCmp = ca.localeCompare(cb);
                    if (codeCmp !== 0) return codeCmp;
                    return (a.clip.day || 0) - (b.clip.day || 0);
                  });

                  // Deduplicate by code: keep only first occurrence
                  const seenCodes = new Set();
                  const uniqueItems = flatItems.filter(item => {
                    if (seenCodes.has(item.clip.code)) return false;
                    seenCodes.add(item.clip.code);
                    return true;
                  });

                  const totalTracks = uniqueItems.length;

                  const getSvgIcon = (key) => {
                    const icons = {
                      sleep: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
                      physical: <path d="M18 20V10M12 20V4M6 20v-6"/>,
                      mental: <circle cx="12" cy="12" r="10"/>,
                      food: <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>,
                      medical: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
                      supplement: <><path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8.5 3.5 6.5L6.5 3.5 13.5 10.5C15.5 12.5 15.5 15.5 13.5 17.5L10.5 20.5Z"/><path d="M18.5 7.5L21.5 4.5C23.5 2.5 23.5 -0.5 21.5 -2.5L18.5 -5.5 11.5 1.5C9.5 3.5 9.5 6.5 11.5 8.5L18.5 7.5Z"/></>,
                    };
                    return icons[key] || null;
                  };

                  // Generate day positions based on regularity & multiplier
                  const getClipPositions = (clip, multiplier) => {
                    const maxUnit = timelineView === 'days' ? 90 : timelineView === 'weeks' ? 13 : 4;
                    const regularityGap = clip.regularity === 'daily' ? 1 : clip.regularity === 'weekly' ? (timelineView === 'weeks' ? 1 : 7) : clip.regularity === 'monthly' ? (timelineView === 'phases' ? 1 : 30) : clip.regularity === 'yearly' ? maxUnit : 7;
                    const effectiveGap = Math.max(1, Math.round(regularityGap / multiplier));
                    const positions = [];
                    let pos = timelineView === 'days' ? clip.day : Math.ceil(clip.day / (timelineView === 'weeks' ? 7 : 22.5));
                    while (pos <= maxUnit) {
                      positions.push(pos);
                      pos += effectiveGap;
                    }
                    return positions.slice(0, Math.ceil(maxUnit / effectiveGap));
                  };

                  const dayProgress = simulationDay / 90;

                  return (
                    <>
                      {uniqueItems.map((item, idx) => {
                          const clip = item.clip;
                          const catColor = categoryGroups[item.categoryKey]?.color || clip.color;
                          const positions = getClipPositions(clip, 1);
                          return (
                            <div
                              key={`row-${clip.code}`}
                              className="track-row intervention-row"
                              style={{ borderLeftColor: catColor, background: `${catColor}08` }}
                            >
                              <div className="td-cat">
                                <svg viewBox="0 0 24 24" fill="none" stroke={catColor} strokeWidth="2" width="12" height="12">
                                  {getSvgIcon(item.categoryKey)}
                                </svg>
                              </div>
                              <div className="td-name" onClick={() => { setSelectedInterventionForPopup(clip); setShowInterventionPopup(true); }} title="Клик для подробной информации">
                                <span className="interv-label-code">{clip.code}</span>
                                <span className="interv-label-name">{clip.name}</span>
                              </div>
                              <div className="td-track">
                                <svg viewBox="0 0 1000 32" width="100%" height="32" style={{ display: 'block' }}>
                                  <rect width="1000" height="32" fill="#fafafa"/>
                                  {[1,2,3,4,5,6,7,8,9].map(i => (
                                    <line key={i} x1={i*100} y1={0} x2={i*100} y2={32} stroke="#eee" strokeWidth={1}/>
                                  ))}
                                  <rect x={0} y={0} width={dayProgress*1000} height={32} fill={`${catColor}15`}/>
                                  {(() => {
                                    const activatedDays = new Set(
                                      interventionLog.filter(e => e.state === 'Активировано').map(e => `${e.code}_${e.day}`)
                                    );
                                    return positions.map((day, i) => {
                                      const cx = (day/90)*1000;
                                      const triggered = activatedDays.has(`${clip.code}_${day}`);
                                      return (
                                        <g key={i} style={{ cursor:'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedInterventionForPopup(clip); setShowInterventionPopup(true); }}>
                                          <title>{`${clip.name} — день ${day}`}</title>
                                          <rect x={cx-12} y={4} width={24} height={24} rx={4} fill="transparent"/>
                                          <circle cx={cx} cy={16} r={4} fill={catColor} opacity={day <= simulationDay && triggered ? 1 : 0.2}/>
                                        </g>
                                      );
                                    });
                                  })()}
                                  <line x1={dayProgress*1000} y1={0} x2={dayProgress*1000} y2={32} stroke="#d50000" strokeWidth={2}/>
                                </svg>
                              </div>
                            </div>
                          );
                      })}
                    </>
                  );
                })()}
              </div>
            </div>
          )}

            {/* 3-Column Intervention Log */}
          {(() => {
            const total = timelineInterventions.length;
            const passed = timelineInterventions.filter(i => i.day <= simulationDay).length;
            const success = interventionLog.filter(e => e.state === 'Активировано').length;
            const remain = total - passed;
            return (
              <div className={`log-full ${showLog ? '' : 'log-collapsed'}`}>
                <div className="log-header">
                  <div className="log-header-left">
                    <h4>Журнал интервенций</h4>
                    <span className="log-count">{interventionLog.length}</span>
                  </div>
                  <div className="log-stats">
                    <span className="log-stat">Всего: {total}</span>
                    <span className="log-stat">Пройдено: {passed}</span>
                    <span className="log-stat log-stat-ok">Сработало: {success}</span>
                    <span className="log-stat">Осталось: {remain}</span>
                  </div>
                  <button className="log-toggle" onClick={() => setShowLog(v => !v)} title={showLog ? 'Скрыть' : 'Показать'}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
                      style={{ transform: showLog ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
                {showLog && (
                  <div className="log-table">
                    <div className="log-row header">
                      <span className="col-day">День</span>
                      <span className="col-time">Время</span>
                      <span className="col-intervention">Интервенция</span>
                      <span className="col-status">Статус</span>
                    </div>
                    {interventionLog.length === 0 ? (
                      <div className="log-empty">Журнал пуст. Запустите симуляцию.</div>
                    ) : (
                      interventionLog.map((entry, i) => (
                        <div key={i} className="log-row">
                          <span className="col-day">{entry.day}</span>
                          <span className="col-time">{entry.time || `${String(6 + (entry.day * 7) % 14).padStart(2, '0')}:00`}</span>
                          <span className="col-intervention">
                            <span>{entry.code}</span>
                            <span>{entry.name}</span>
                          </span>
                          <span className={`col-status ${entry.state === 'Активировано' ? 'success' : 'failed'}`}>
                            {entry.state}
                            {entry.starsGained > 0 && (
                              <span>
                                +{entry.starsGained}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                              </span>
                            )}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })()}

{/* Full Attribute Catalog Table - 2 columns per section */}
          {/* Profile Header with Photo + Targets */}
          {profile && (
            <div className="profile-header-card">
              {profile.photo && (
                <img
                  src={`/images/pers/${profile.photo}`}
                  alt={profile.name || 'Profile'}
                  className="profile-header-photo"
                  onError={(ev) => { ev.target.style.display = 'none'; }}
                />
              )}
              <div className="profile-header-content">
                <div className="profile-header-top">
                  <div className="profile-header-info">
                    {(() => {
                      const norm = (val, ideal, maxDev) => {
                        if (val == null || val === 0) return 0;
                        return Math.max(0, Math.min(100, (1 - Math.abs(val - ideal) / maxDev) * 100));
                      };
                      const metrics = [
                        { label: 'Сон',   score: profile.lifestyle?.sleep_hours       ? Math.min(100, profile.lifestyle.sleep_hours / 7.5 * 100) : 0 },
                        { label: 'Стресс',score: profile.lifestyle?.stress_level_0_10 ? norm(profile.lifestyle.stress_level_0_10, 3, 7) : 0 },
                        { label: 'Шаги',  score: profile.lifestyle?.daily_steps       ? Math.min(100, profile.lifestyle.daily_steps / 10000 * 100) : 0 },
                        { label: 'ИМТ',   score: profile.anthropometrics?.bmi         ? norm(profile.anthropometrics.bmi, 22, 15) : 0 },
                        { label: 'Сердце',score: profile.vitals?.systolic_bp_mmhg     ? norm(profile.vitals.systolic_bp_mmhg, 120, 60) : 0 },
                        { label: 'Глюкоза',score: profile.labs?.glucose_mg_dl         ? norm(profile.labs.glucose_mg_dl, 100, 80) : 0 },
                      ];
                      const N = metrics.length;
                      const cx = 25, cy = 25, R = 18;
                      const angles = metrics.map((_, i) => (Math.PI * 2 * i) / N - Math.PI / 2);
                      const pt = (r, i) => ({ x: cx + r * Math.cos(angles[i]), y: cy + r * Math.sin(angles[i]) });
                      const dataPts = metrics.map((m, i) => pt(R * m.score / 100, i));
                      const poly = pts => pts.map(p => `${p.x},${p.y}`).join(' ');
                      return (
                        <svg width="50" height="50" viewBox="0 0 50 50" className="health-radar" style={{ flexShrink: 0 }}>
                          {[0.25, 0.5, 0.75, 1].map((level, gi) => (
                            <polygon key={gi} points={poly(metrics.map((_, i) => pt(R * level, i)))} fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
                          ))}
                          {angles.map((a, i) => (
                            <line key={i} x1={cx} y1={cy} x2={pt(R, i).x} y2={pt(R, i).y} stroke="#e0e0e0" strokeWidth="0.5"/>
                          ))}
                          <polygon points={poly(dataPts)} fill="rgba(49,27,146,0.15)" stroke="#311b92" strokeWidth="1"/>
                          {dataPts.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r={1.5} fill="#311b92"/>
                          ))}
                        </svg>
                      );
                    })()}
                    <div>
                      <h2 className="profile-header-name">{profile.name || (() => { try { const p = profile.photo?.replace(/\.\w+$/, '').split('_'); return p?.slice(1).find(s => !/^\d+$/.test(s)) || '—'; } catch(e) { return '—'; } })()}</h2>
                      <div className="profile-header-meta">
                        {profile.demographics?.age && <span>{profile.demographics.age} лет</span>}
                        {profile.demographics?.sex && <span>{profile.demographics.sex === 'male' ? 'М' : 'Ж'}</span>}
                        {profile.digital_twin_scores?.current_stars && (
                          <span className="profile-stars">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            {profile.digital_twin_scores.current_stars}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="assess-health-btn" onClick={() => assessHealth()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Оценить здоровье
                  </button>
                  <button
                    className="assess-health-btn generate-btn"
                    onClick={createPlanByCategories}
                    disabled={Object.keys(targetValues).length === 0}
                    title={Object.keys(targetValues).length === 0 ? 'Сначала выберите цели в таблице атрибутов' : 'Создать план интервенций'}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                    Создать план
                  </button>
                  <button className="assess-health-btn" onClick={() => {
                    const d = simulationDay;
                    setDiaryDay(d);
                    setDiaryData(defaultDiaryData(d));
                    setShowDiary(true);
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    Дневник
                  </button>
                  <button className="assess-health-btn" onClick={() => {
                    const msgs = timelineInterventions.map((clip, i) => ({
                      id: i,
                      type: 'intervention',
                      day: clip.day,
                      code: clip.code,
                      name: clip.name,
                      category: clip.category,
                      regularity: clip.regularity,
                      time: `${String(8 + (i * 3) % 12).padStart(2, '0')}:${String((i * 17) % 60).padStart(2, '0')}`,
                    }));
                    msgs.sort((a, b) => a.day - b.day);
                    setChatMessages(msgs);
                    setShowChat(true);
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Чат
                  </button>
                </div>
                <div className="profile-targets">
                  <span className="targets-label">Цели:</span>
                  <div className="targets-badges">
                    {Object.entries(attributeCatalog).flatMap(([sectionKey, section]) =>
                      section.attributes
                        .filter(attr => attr.target !== null && attr.target !== undefined && (targetValues[attr.id] ?? attr.target) !== null)
                        .slice(0, 4)
                        .map(attr => {
                          const alert = parameterAlerts[attr.id] || parameterAlerts[attr.name];
                          return (
                            <span
                              key={`target_${attr.id}`}
                              className={`target-badge ${alert ? 'alert' : ''}`}
                              title={`${attr.name}: текущее ${attr.current} → цель ${targetValues[attr.id] ?? attr.target} ${attr.unit}`}
                            >
                              <span className="target-badge-dot" style={{ backgroundColor: attributeCatalog[sectionKey].color }}></span>
                              <span className="target-badge-name">{attr.name}</span>
                              <span className="target-badge-value">{targetValues[attr.id] ?? attr.target}{attr.unit}</span>
                            </span>
                          );
                        })
                    ).slice(0, 6)}
                  </div>
                </div>
                {recommendedProtocols.length > 0 && (
                  <div className="cjm-protocols">
                    <div className="cjm-protocols-header">
                      <span className="cjm-protocols-title">Подобранные протоколы</span>
                      <button className="daw-btn" onClick={() => setInterventionTab('protocols')}>
                        Все ({recommendedProtocols.length})
                      </button>
                    </div>
                    <div className="cjm-protocols-list">
                      {recommendedProtocols.slice(0, 3).map(p => (
                        <span key={p.protocolKey || p.key} className="cjm-protocol-chip" onClick={() => { setSelectedProtocolForPopup(p); setShowProtocolPopup(true); }}>
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="data-panel">
            {Object.entries(attributeCatalog).map(([key, section]) => {
              const isCollapsed = collapsedSections[key];
              return (
                <div key={key} className="data-section" style={{ borderLeft: `3px solid ${section.color}` }}>
                  <div className="section-header" onClick={() => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }))}>
                    <div className="section-title-row">
                      <span className="section-dot" style={{ backgroundColor: section.color }}></span>
                      <h4 style={{ color: section.color }}>{section.title}</h4>
                    </div>
                    <button className="collapse-btn" title={isCollapsed ? 'Развернуть' : 'Свернуть'}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        {isCollapsed ? (
                          <polyline points="9 18 15 12 9 6"/>
                        ) : (
                          <polyline points="18 15 12 9 6 15"/>
                        )}
                      </svg>
                    </button>
                  </div>
                  {!isCollapsed && (
                    <div className="attr-table">
                      <div className="attr-row header">
                        <span>Код</span>
                        <span>Параметр</span>
                        <span>Текущее</span>
                        <span>Цель</span>
                        <span>Норма</span>
                        <span>Интервенции</span>
                      </div>
                      {section.attributes.map(attr => {
                        const alert = parameterAlerts[attr.id] || parameterAlerts[attr.name];
                        const interventions = getInterventionsForAttribute(attr.id);
                        const isEditing = editingField === `${key}_${attr.id}`;
                        return (
                          <div
                            key={attr.id}
                            className={`attr-row ${isAttributeAffected(attr.name) || isAttributeAffected(attr.id) ? 'highlighted' : ''} ${alert ? 'alert' : ''}`}
                          >
                            <span className="attr-code">{attr.code}</span>
                            <span className="attr-name">{attr.name}</span>
                            <div className="attr-cell current">
                              {isEditing && attr.editable ? (
                                <input
                                  className="edit-input"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => saveEdit(key, attr.id)}
                                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(key, attr.id)}
                                  autoFocus
                                />
                              ) : (
                                <span
                                  className="editable-value"
                                  onClick={() => attr.editable && startEdit(attr.id, attr.current)}
                                  title={attr.editable ? 'Нажмите для редактирования' : ''}
                                >
                                  {formatAttrValue(attr.current)}
                                  {alert && (
                                    <span className="alert-badge" title={alert.message}>
                                      {alert.direction === 'up' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"><polyline points="18 15 12 9 6 15"/></svg>
                                      ) : alert.direction === 'down' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"><polyline points="6 9 12 15 18 9"/></svg>
                                      ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"><polyline points="20 6 9 17 4 12"/></svg>
                                      )}
                                    </span>
                                  )}
                                </span>
                              )}
                              {attr.unit && <span className="unit">{attr.unit}</span>}
                            </div>
                            <div className="attr-cell target">
                              <button className="target-btn" onClick={() => decrementTarget(attr.id, targetValues[attr.id] ?? attr.target)}>-</button>
                              <input
                                type="number"
                                className="target-input"
                                value={targetValues[attr.id] ?? attr.target ?? ''}
                                onChange={(e) => updateTargetValue(attr.id, parseFloat(e.target.value))}
                              />
                              <button className="target-btn" onClick={() => incrementTarget(attr.id, targetValues[attr.id] ?? attr.target)}>+</button>
                            </div>
                            <span className="attr-cell norm">{attr.norm}</span>
                            <div className="attr-cell interventions">
                              {interventions.length > 0 ? (
                                <div className="interv-group" title={`${interventions.length} интервенций`}>
                                  <span className="interv-count">{interventions.length}</span>
                                  <div className="interv-badges" onClick={(e) => e.stopPropagation()}>
                                    {interventions.map(i => (
                                      <div
                                        key={i.code}
                                        className="interv-badge-item"
                                        style={{ borderLeftColor: i.color }}
                                        onClick={() => {
                                          setSelectedInterventionForPopup(i);
                                          setShowInterventionPopup(true);
                                        }}
                                      >
                                        <span className="interv-badge" style={{ backgroundColor: i.color + '33' }}>{i.code}</span>
                                        <span className="interv-badge-name">{i.name}</span>
                                        <span className="interv-badge-impact">[{i.impact}]</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <span className="no-interv">—</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
           </div>
          {showInterventionPopup && selectedInterventionForPopup && (
            <div className="intervention-popup-overlay" onClick={() => setShowInterventionPopup(false)}>
              <div className="intervention-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header" style={{ borderLeftColor: selectedInterventionForPopup.color }}>
                  <span className="popup-code">{selectedInterventionForPopup.code}</span>
                  <h3>{selectedInterventionForPopup.name}</h3>
                  <button className="popup-close" onClick={() => setShowInterventionPopup(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="popup-body">
                  <div className="popup-row">
                    <span className="popup-label">Описание</span>
                    <span className="popup-value">{selectedInterventionForPopup.description || 'Нет данных'}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Воздействие</span>
                    <span className="popup-value impact" style={{ color: selectedInterventionForPopup.impact >= 9 ? '#d50000' : selectedInterventionForPopup.impact >= 8 ? '#ff9100' : '#ffd600' }}>
                      {selectedInterventionForPopup.impact}/10
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Периодичность</span>
                    <span className="popup-value">
                      {selectedInterventionForPopup.regularity === 'daily' ? 'Ежедневно' :
                       selectedInterventionForPopup.regularity === 'weekly' ? 'Еженедельно' :
                       selectedInterventionForPopup.regularity === 'monthly' ? 'Ежемесячно' :
                       selectedInterventionForPopup.regularity === 'yearly' ? 'Ежегодно' :
                       selectedInterventionForPopup.regularity === 'on-demand' ? 'По запросу' :
                       selectedInterventionForPopup.regularity}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Доказательность</span>
                    <span className="popup-value evidence" style={{ color: selectedInterventionForPopup.evidence === 'A' ? '#00c853' : selectedInterventionForPopup.evidence === 'B' ? '#ff9100' : '#ffd600' }}>
                      Уровень {selectedInterventionForPopup.evidence}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Биомаркеры</span>
                    <span className="popup-value">
                      {selectedInterventionForPopup.biomarkers && selectedInterventionForPopup.biomarkers.length > 0 ?
                        selectedInterventionForPopup.biomarkers.join(', ') : 'Нет данных'}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Источники</span>
                    <span className="popup-value sources">{selectedInterventionForPopup.sources || 'Нет данных'}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Категория</span>
                    <span className="popup-value">{selectedInterventionForPopup.category}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Тип</span>
                    <span className="popup-value">{selectedInterventionForPopup.type}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Доставка</span>
                    <span className="popup-value">
                      {selectedInterventionForPopup.delivery_type === 'chatbot' && 'Чат-бот (напоминание)'}
                      {selectedInterventionForPopup.delivery_type === 'web_report' && 'Веб-отчет (заполнение)'}
                      {selectedInterventionForPopup.delivery_type === 'voice_report' && 'Голосовой отчет'}
                      {!['chatbot','web_report','voice_report'].includes(selectedInterventionForPopup.delivery_type) && (selectedInterventionForPopup.delivery_type || '—')}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Время начала</span>
                    <span className="popup-value">День {selectedInterventionForPopup.day ?? '—'}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Время конца</span>
                    <span className="popup-value">
                      {(() => {
                        const start = selectedInterventionForPopup.day;
                        if (start == null) return '—';
                        const reg = selectedInterventionForPopup.regularity;
                        if (reg === 'daily') return `День ${Math.min(90, start + 90)}`;
                        if (reg === 'weekly') return `День ${Math.min(90, start + 84)}`;
                        if (reg === 'monthly') return `День ${Math.min(90, start + 60)}`;
                        return `День ${start}`;
                      })()}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Статус исполнения</span>
                    <span className="popup-value">
                      {(() => {
                        const activated = interventionLog.some(e => e.code === selectedInterventionForPopup.code && e.state === 'Активировано');
                        if (activated) return 'Выполнен';
                        if (simulationDay >= selectedInterventionForPopup.day) return 'Пропущен';
                        return 'Ожидается';
                      })()}
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Подтверждение о выполнении</span>
                    <span className="popup-value">
                      {selectedInterventionForPopup.report_effort === 'light' && 'Автоматическое (трекер)'}
                      {selectedInterventionForPopup.report_effort === 'medium' && 'Самоотчет (дневник)'}
                      {selectedInterventionForPopup.report_effort === 'detailed' && 'Лабораторное (анализы)'}
                      {!['light','medium','detailed'].includes(selectedInterventionForPopup.report_effort) && (selectedInterventionForPopup.report_effort || '—')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Protocol Details Popup */}
          {showProtocolPopup && selectedProtocolForPopup && (
            <div className="intervention-popup-overlay" onClick={() => setShowProtocolPopup(false)}>
              <div className="intervention-popup protocol-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header" style={{ borderLeftColor: '#311b92' }}>
                  <span className="popup-code">{selectedProtocolForPopup.protocolKey || selectedProtocolForPopup.key || ''}</span>
                  <h3>{selectedProtocolForPopup.name}</h3>
                  <button className="popup-close" onClick={() => setShowProtocolPopup(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="popup-body">
                  <div className="popup-row">
                    <span className="popup-label">Категория</span>
                    <span className="popup-value">{selectedProtocolForPopup.category || '—'}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Описание</span>
                    <span className="popup-value">{selectedProtocolForPopup.description || selectedProtocolForPopup.name || 'Нет данных'}</span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Интервенции в протоколе</span>
                    <span className="popup-value">
                      <div className="protocol-popup-chips">
                        {(selectedProtocolForPopup.interventions || []).map(code => (
                          <span key={code} className="protocol-card-chip">{code}</span>
                        ))}
                      </div>
                    </span>
                  </div>
                  <div className="popup-row">
                    <span className="popup-label">Длительность</span>
                    <span className="popup-value">{selectedProtocolForPopup.duration ? `${selectedProtocolForPopup.duration} дней` : '—'}</span>
                  </div>
                  {selectedProtocolForPopup.targets && selectedProtocolForPopup.targets.length > 0 && (
                    <div className="popup-row">
                      <span className="popup-label">Целевые параметры</span>
                      <span className="popup-value">{selectedProtocolForPopup.targets.join(', ')}</span>
                    </div>
                  )}
                  <div className="popup-actions">
                    <button className="daw-btn generate-btn" onClick={() => { addProtocolToTimeline(selectedProtocolForPopup.protocolKey || selectedProtocolForPopup.key); setShowProtocolPopup(false); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Добавить на таймлайн
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Popup (Full Report) */}
          {showHistoryPopup && (
            <div className="history-popup-overlay" onClick={() => setShowHistoryPopup(false)}>
              <div className="history-popup" onClick={(e) => e.stopPropagation()}>
                <div className="history-popup-header">
                  <h3>Отчет интервенций</h3>
                  <div className="plan-popup-header-actions">
                    <button className="daw-btn" onClick={() => {
                      const total = timelineInterventions.length;
                      const passed = timelineInterventions.filter(i => i.day <= simulationDay).length;
                      const success = interventionLog.filter(e => e.state === 'Активировано').length;
                      const remain = total - passed;
                      const log = interventionLog
                        .sort((a,b) => a.day - b.day)
                        .map(e => `День ${e.day} | ${e.code} | ${e.name} | ${e.state} | ${e.starsGained > 0 ? '+' + e.starsGained : '—'}`)
                        .join('\n');
                      const txt = `ОТЧЕТ ИНТЕРВЕНЦИЙ\n${'='.repeat(50)}\nВсего: ${total} | Пройдено: ${passed} | Сработало: ${success} | Осталось: ${remain}\n\nДетали:\n${log || '—'}`;
                      const blob = new Blob([txt], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url; a.download = 'report-interventions.txt';
                      a.click(); URL.revokeObjectURL(url);
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Скачать
                    </button>
                    <button className="history-popup-close" onClick={() => setShowHistoryPopup(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="history-popup-body">
                  {(() => {
                    const total = timelineInterventions.length;
                    const passed = timelineInterventions.filter(i => i.day <= simulationDay).length;
                    const success = interventionLog.filter(e => e.state === 'Активировано').length;
                    const remain = total - passed;
                    return (
                      <div className="report-summary">
                        <div className="report-stat"><span className="report-label">Всего</span><span className="report-value">{total}</span></div>
                        <div className="report-stat"><span className="report-label">Пройдено</span><span className="report-value">{passed}</span></div>
                        <div className="report-stat"><span className="report-label">Сработало</span><span className="report-value report-ok">{success}</span></div>
                        <div className="report-stat"><span className="report-label">Осталось</span><span className="report-value">{remain}</span></div>
                      </div>
                    );
                  })()}
                  {/* Per-intervention status (matches SVG dots) */}
                  {(() => {
                    const activatedSet = new Set(
                      interventionLog.filter(e => e.state === 'Активировано').map(e => `${e.code}_${e.day}`)
                    );
                    const uniqueCodes = [...new Set(timelineInterventions.map(i => i.code))];
                    const interventions = uniqueCodes.map(code => {
                      const item = timelineInterventions.find(i => i.code === code);
                      const day = item?.day ?? 0;
                      const triggered = activatedSet.has(`${code}_${day}`);
                      const status = triggered ? 'Выполнено' : day <= simulationDay ? 'Пропущено' : 'Ожидается';
                      return { code, name: item?.name || code, day, triggered, status };
                    });
                    return (
                      <table className="history-table" style={{ marginBottom: 16 }}>
                        <thead>
                          <tr>
                            <th>Код</th>
                            <th>Название</th>
                            <th>День</th>
                            <th>Статус</th>
                          </tr>
                        </thead>
                        <tbody>
                          {interventions.map(item => (
                            <tr key={item.code}>
                              <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{item.code}</td>
                              <td>{item.name}</td>
                              <td>{item.day}</td>
                              <td className={item.triggered ? 'history-status-success' : item.day <= simulationDay ? 'history-status-failed' : ''}>
                                {item.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  })()}
                  {interventionLog.length === 0 ? (
                    <div className="history-empty">История пуста. Запустите симуляцию.</div>
                  ) : (
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>День</th>
                          <th>Код</th>
                          <th>Название</th>
                          <th>Статус</th>
                          <th>Звёзды</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interventionLog.map((entry, i) => (
                          <tr key={i}>
                            <td>{entry.day}</td>
                            <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{entry.code}</td>
                            <td>{entry.name}</td>
                            <td className={entry.state === 'Активировано' ? 'history-status-success' : 'history-status-failed'}>
                              {entry.state}
                            </td>
                            <td className="history-stars">
                              {entry.starsGained > 0 ? `+${entry.starsGained} ☆` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Plan Popup */}
          {showPlanPopup && (
            <div className="plan-popup-overlay" onClick={() => setShowPlanPopup(false)}>
              <div className="plan-popup" onClick={(e) => e.stopPropagation()}>
                <div className="plan-popup-header">
                  <h3>План интервенций</h3>
                  <div className="plan-popup-header-actions">
                    <button className="daw-btn" onClick={() => {
                      const txt = timelineInterventions
                        .sort((a,b) => a.day - b.day)
                        .map(i => `День ${i.day} | ${i.code} | ${i.name} | ${i.category}`)
                        .join('\n');
                      const blob = new Blob([`План интервенций\n${'='.repeat(50)}\n${txt}`], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url; a.download = 'plan-interventions.txt';
                      a.click(); URL.revokeObjectURL(url);
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Скачать txt
                    </button>
                    <button className="plan-popup-close" onClick={() => setShowPlanPopup(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="plan-popup-body">
                  {timelineInterventions.length === 0 ? (
                    <div className="plan-empty">План пуст. Добавьте интервенции из каталога.</div>
                  ) : (
                    <table className="plan-table">
                      <thead>
                        <tr>
                          <th>День</th>
                          <th>Код</th>
                          <th>Название</th>
                          <th>Категория</th>
                          <th>Периодичность</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...new Set(timelineInterventions.map(i => i.code))].map(code => {
                          const item = timelineInterventions.find(i => i.code === code);
                          return (
                            <tr key={code}>
                              <td>{item.day}</td>
                              <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{code}</td>
                              <td>{item.name}</td>
                              <td>{item.category}</td>
                              <td>{item.regularity === 'daily' ? 'Ежедневно' : item.regularity === 'weekly' ? 'Еженедельно' : item.regularity === 'monthly' ? 'Ежемесячно' : item.regularity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Diary Modal */}
          {showDiary && (
            <div className="diary-overlay" onClick={() => setShowDiary(false)}>
              <div className="diary-modal" onClick={(e) => e.stopPropagation()}>
                <div className="diary-header">
                  <div className="diary-header-nav">
                    <button className="diary-nav-btn" onClick={() => { const d = (diaryDay ?? simulationDay) - 1; if (d >= 0) { setDiaryDay(d); setDiaryData(defaultDiaryData(d)); } }} disabled={(diaryDay ?? simulationDay) <= 0}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <h3>Дневник питания — День {diaryDay ?? simulationDay}</h3>
                    <button className="diary-nav-btn" onClick={() => { const d = (diaryDay ?? simulationDay) + 1; if (d <= 90) { setDiaryDay(d); setDiaryData(defaultDiaryData(d)); } }} disabled={(diaryDay ?? simulationDay) >= 90}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                  <button className="history-popup-close" onClick={() => setShowDiary(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="diary-body">
                  {(() => {
                    const day = diaryDay ?? simulationDay;
                    const form = diaryData || defaultDiaryData(day);

                    const updateMeal = (idx, field, val) => {
                      const m = [...form.meals]; m[idx] = { ...m[idx], [field]: val };
                      setDiaryData({ ...form, meals: m });
                    };

                    const handlePhoto = (idx, file) => {
                      if (!file) return;
                      const r = new FileReader();
                      r.onload = () => updateMeal(idx, 'photo', r.result);
                      r.readAsDataURL(file);
                    };

                    const startVoice = () => {
                      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                      if (!SpeechRecognition) { alert('Голосовой ввод не поддерживается в этом браузере'); return; }
                      const sr = new SpeechRecognition();
                      sr.lang = 'ru-RU'; sr.interimResults = false;
                      sr.onresult = (ev) => {
                        const text = ev.results[0][0].transcript;
                        setDiaryData({ ...form, voiceNote: text, comment: form.comment + text });
                        // Parse meals from voice
                        const mealMap = { 'завтрак': 0, 'завтрак:': 0, 'обед': 1, 'обед:': 1, 'ужин': 2, 'ужин:': 2, 'перекус': 3, 'перекус:': 3 };
                        Object.entries(mealMap).forEach(([key, idx]) => {
                          const re = new RegExp(`${key}\\s*([^.!]+)`, 'i');
                          const m = text.match(re);
                          if (m) {
                            const desc = m[1].trim().replace(/\s+\d+[гмл]?\s*/g, '');
                            updateMeal(idx, 'description', form.meals[idx].description + (form.meals[idx].description ? '; ' : '') + desc);
                          }
                        });
                        // Parse water
                        const wm = text.match(/вод[ыа]?\s*(около|примерно|~)?\s*(\d+(?:[.,]\d+)?)\s*л/i);
                        if (wm) setDiaryData({ ...form, waterMl: Math.round(parseFloat(wm[2].replace(',', '.')) * 1000) });
                      };
                      sr.onerror = () => alert('Ошибка распознавания речи');
                      sr.start();
                    };

                    const submitDiary = () => {
                      const payload = {
                        profile_id: profileId,
                        day: form.day,
                        meals: form.meals.map(m => ({
                          type: m.type, photo: m.photo || null, description: m.description,
                          time: m.time || null, duration: m.duration ? Number(m.duration) : null,
                          calories: m.calories ? Number(m.calories) : null,
                          protein: m.protein ? Number(m.protein) : null,
                          fat: m.fat ? Number(m.fat) : null,
                          carbs: m.carbs ? Number(m.carbs) : null,
                          ndi: m.ndi ? Number(m.ndi) : null,
                          recommendations: m.recommendations || null,
                        })),
                        water_ml: form.waterMl,
                        mood: form.mood,
                        voice_note: form.voiceNote || null,
                        audio: null,
                        comment: form.comment || null,
                      };
                      fetch('/api/diary', {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                      }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
                        .then(() => { setShowDiary(false); setDiaryData(null); })
                        .catch((err) => { console.warn('Diary submit failed:', err); alert('Ошибка отправки: бэкенд недоступен'); });
                    };

                    return (
                      <div className="diary-form">
                        {/* Meals row */}
                        <div className="diary-meals-row">
                          {form.meals.map((meal, idx) => (
                          <div key={meal.type} className="diary-meal">
                            <div className="diary-meal-header">
                              <span>{meal.label}</span>
                              <span className="diary-meal-time">
                                <input type="time" value={meal.time} onChange={e => updateMeal(idx, 'time', e.target.value)}
                                  style={{ width: 80, border:'none', fontSize:11, outline:'none', background:'transparent' }}/>
                                <input type="number" min="1" max="180" value={meal.duration}
                                  onChange={e => updateMeal(idx, 'duration', e.target.value)}
                                  style={{ width: 40, border:'none', fontSize:11, outline:'none', background:'transparent', textAlign:'right' }}/>
                                <span style={{ fontSize:10, color:'#999' }}>мин</span>
                              </span>
                            </div>
                            <div className="diary-meal-body">
                              <div className="diary-photo-upload" onClick={() => { setSelectedFoodMealIdx(idx); setShowFoodSelector(true); }}>
                                {meal.photo ? (
                                  <img src={meal.photo} alt="" className="diary-photo-preview" onClick={(e) => { e.stopPropagation(); updateMeal(idx, 'photo', ''); }}/>
                                ) : (
                                  <div className="diary-photo-btn" title="Выбрать фото">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                                      <path d="M21 15l-5-5L5 21"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="diary-meal-fields">
                                <div className="diary-kbzu">
                                  <input type="number" placeholder="ккал" value={meal.calories} onChange={e => updateMeal(idx, 'calories', e.target.value)}/>
                                  <input type="number" placeholder="белки" value={meal.protein} onChange={e => updateMeal(idx, 'protein', e.target.value)}/>
                                  <input type="number" placeholder="жиры" value={meal.fat} onChange={e => updateMeal(idx, 'fat', e.target.value)}/>
                                  <input type="number" placeholder="углев." value={meal.carbs} onChange={e => updateMeal(idx, 'carbs', e.target.value)}/>
                                  <input type="number" placeholder="NDI" value={meal.ndi} onChange={e => updateMeal(idx, 'ndi', e.target.value)}/>
                                </div>
                              </div>
                            </div>
                            <div className="diary-meal-desc-row">
                              <textarea placeholder="Описание блюда" rows={1} value={meal.description} onChange={e => updateMeal(idx, 'description', e.target.value)}/>
                              <button className="diary-mic-btn" type="button" onClick={() => {
                                const sr = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                                sr.lang = 'ru-RU'; sr.interimResults = false;
                                sr.onresult = (ev) => updateMeal(idx, 'description', form.meals[idx].description + (form.meals[idx].description ? '; ' : '') + ev.results[0][0].transcript);
                                sr.onerror = () => {}; sr.start();
                              }} title="Голосовое описание">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                  <line x1="12" y1="19" x2="12" y2="22"/>
                                </svg>
                              </button>
                            </div>
                            <textarea className="diary-meal-recs" placeholder="Рекомендации" rows={1} value={meal.recommendations}
                              onChange={e => updateMeal(idx, 'recommendations', e.target.value)}/>
                          </div>
                        ))}
                        </div>

                        {/* Metrics: Water + Mood sliders */}
                        <div className="diary-section">
                          <label className="diary-section-label">Показатели</label>
                          <div className="diary-metrics-grid">
                            {/* Water */}
                            <div className="diary-metric">
                              <span className="diary-metric-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                  <path d="M12 2C8 8 6 12 6 16a6 6 0 0 0 12 0c0-4-2-8-6-14z"/>
                                </svg>
                              </span>
                              <span className="diary-metric-label">Вода</span>
                              <span className="diary-metric-value">{form.waterMl}мл</span>
                              <input type="range" min="0" max="3000" step="100" value={form.waterMl}
                                onChange={e => setDiaryData({ ...form, waterMl: Number(e.target.value) })}/>
                            </div>
                            {[
                              { key: 'energy', label: 'Энергия', icon: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></> },
                              { key: 'mood', label: 'Настроение', icon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></> },
                              { key: 'sleep', label: 'Сон', icon: <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></> },
                              { key: 'stress', label: 'Стресс', icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></> },
                              { key: 'digestion', label: 'ЖКТ', icon: <><path d="M4 12h16M4 12l2-4h12l2 4M4 12l2 4h12l2-4"/><path d="M8 4v4M16 4v4"/></> },
                            ].map(({ key, label, icon }) => (
                              <div key={key} className="diary-metric">
                                <span className="diary-metric-icon">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">{icon}</svg>
                                </span>
                                <span className="diary-metric-label">{label}</span>
                                <span className="diary-metric-value">{Math.round(form.mood[key] === 'red' ? 25 : form.mood[key] === 'yellow' ? 55 : form.mood[key] === 'green' ? 85 : 0)}%</span>
                                <input type="range" min="0" max="100" step="1" value={form.mood[key] === 'red' ? 25 : form.mood[key] === 'yellow' ? 55 : form.mood[key] === 'green' ? 85 : 0}
                                  onChange={e => {
                                    const v = Number(e.target.value);
                                    const level = v < 40 ? 'red' : v < 70 ? 'yellow' : 'green';
                                    setDiaryData({ ...form, mood: { ...form.mood, [key]: level } });
                                  }}/>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Voice input */}
                        <div className="diary-section">
                          <label className="diary-section-label">Голосовой ввод</label>
                          <div className="diary-voice-row">
                            <button className="diary-voice-btn" onClick={startVoice}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                <line x1="12" y1="19" x2="12" y2="22"/>
                              </svg>
                              Записать
                            </button>
                            {form.voiceNote && <span className="diary-voice-status">✓ Распознано</span>}
                          </div>
                          <textarea placeholder="Распознанный текст появится здесь..." rows={3} value={form.comment}
                            onChange={e => setDiaryData({ ...form, comment: e.target.value })}/>
                        </div>

                        {/* Audio file upload */}
                        <div className="diary-section">
                          <label className="diary-section-label">Аудиофайл (разговор с врачом)</label>
                          <input type="file" accept=".mp3,.wav,.ogg,.m4a" className="diary-audio-input"
                            onChange={e => setDiaryData({ ...form, audioFile: e.target.files[0] })}/>
                          {form.audioFile && <span className="diary-voice-status">✓ {form.audioFile.name}</span>}
                        </div>

                        {/* Submit */}
                        <button className="diary-submit" onClick={submitDiary}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M22 2L11 13"/>
                            <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                          </svg>
                          Сохранить запись
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Food Selector Modal */}
          {showFoodSelector && (
            <div className="diary-overlay" onClick={() => { setShowFoodSelector(false); setSelectedFoodItem(null); setFoodKeywordFilter(''); }}>
              <div className="food-selector-modal" onClick={(e) => e.stopPropagation()}>
                <div className="diary-header">
                  <h3>Выберите блюдо</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <label className="food-upload-btn" title="Своё фото">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      Своё фото
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        if (e.target.files[0] && selectedFoodMealIdx !== null && diaryData) {
                          const r = new FileReader();
                          r.onload = () => {
                            setSelectedFoodItem({ custom: true, src: r.result });
                          };
                          r.readAsDataURL(e.target.files[0]);
                        }
                      }}/>
                    </label>
                    <button className="daw-btn" onClick={() => {
                      console.log('SAVE: selectedFoodItem=', selectedFoodItem, 'selectedFoodMealIdx=', selectedFoodMealIdx, 'diaryData=', diaryData);
                      if (selectedFoodItem && selectedFoodMealIdx !== null && diaryData) {
                        if (selectedFoodItem.custom) {
                          const m = [...diaryData.meals];
                          m[selectedFoodMealIdx] = { ...m[selectedFoodMealIdx], photo: selectedFoodItem.src };
                          setDiaryData({ ...diaryData, meals: m });
                          console.log('SAVE: custom photo applied to meal', selectedFoodMealIdx);
                        } else {
                          const data = foodCatalog[selectedFoodItem.filename];
                          if (data) {
                            const m = [...diaryData.meals];
                            m[selectedFoodMealIdx] = {
                              ...m[selectedFoodMealIdx],
                              photo: `/images/food/${selectedFoodItem.filename}`,
                              description: data.dish_name || data.title,
                              calories: String(data.nutrition.calories || ''),
                              protein: String(data.nutrition.protein || ''),
                              fat: String(data.nutrition.fat || ''),
                              carbs: String(data.nutrition.carbs || ''),
                              ndi: String(data.nutrition.ndi || ''),
                              recommendations: (data.recommendations || []).join('; '),
                            };
                            setDiaryData({ ...diaryData, meals: m });
                            console.log('SAVE: catalog food applied to meal', selectedFoodMealIdx, selectedFoodItem.filename);
                          } else {
                            console.log('SAVE ERROR: no catalog entry for', selectedFoodItem.filename);
                          }
                        }
                        setShowFoodSelector(false);
                        setSelectedFoodItem(null);
                        setFoodKeywordFilter('');
                      } else {
                        console.log('SAVE BLOCKED: missing condition', { item: !!selectedFoodItem, mealIdx: selectedFoodMealIdx, dd: !!diaryData });
                      }
                    }} disabled={!selectedFoodItem}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                      Сохранить
                    </button>
                    <button className="food-popup-close" onClick={() => { setShowFoodSelector(false); setSelectedFoodItem(null); setFoodKeywordFilter(''); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="food-selector-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="text" placeholder="Поиск блюд..." value={foodSearchQuery} onChange={e => setFoodSearchQuery(e.target.value)} autoFocus/>
                </div>
                <div className="food-selector-badges">
                  {[...new Set(Object.values(foodCatalog).flatMap(d => d.keywords || []))].sort().map(kw => (
                    <span key={kw} className={`food-selector-badge${foodKeywordFilter === kw ? ' active' : ''}`}
                      onClick={() => setFoodKeywordFilter(prev => prev === kw ? '' : kw)}>
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="food-selector-grid">
                  {Object.entries(foodCatalog).filter(([filename, data]) => {
                    const q = foodSearchQuery.toLowerCase();
                    const matchesSearch = !foodSearchQuery
                      || data.title?.toLowerCase().includes(q)
                      || data.dish_name?.toLowerCase().includes(q)
                      || data.meal_type?.toLowerCase().includes(q)
                      || (data.ingredients || []).some(i => i.toLowerCase().includes(q));
                    const matchesKeyword = !foodKeywordFilter
                      || (data.keywords || []).includes(foodKeywordFilter);
                    return matchesSearch && matchesKeyword;
                  }).map(([filename, data]) => {
                    const isSelected = selectedFoodItem && !selectedFoodItem.custom && selectedFoodItem.filename === filename;
                    return (
                      <div key={filename} className={`food-selector-item${isSelected ? ' selected' : ''}`} onClick={() => {
                        setSelectedFoodItem(prev => prev && !prev.custom && prev.filename === filename ? null : { filename });
                      }}>
                        <img src={`/images/food/${filename}`} alt={data.title} className="food-selector-img"/>
                        {isSelected && (
                          <div className="food-selector-check">
                            <svg viewBox="0 0 24 24" fill="#4caf50" width="28" height="28">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                        )}
                        <div className="food-selector-info">
                          <div className="food-selector-title">{data.title}</div>
                          <div className="food-selector-nutri">{data.nutrition.calories} ккал | NDI {data.nutrition.ndi}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {showChat && (
            <div className="chat-modal-overlay" onClick={() => setShowChat(false)}>
              <div className="chat-modal" onClick={e => e.stopPropagation()}>
                <div className="chat-modal-header">
                  <h3>Чат интервенций</h3>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {timelineInterventions.length > 0 && !isSimulating && (
                      <button className="chat-start-btn" onClick={startSimulation}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        Запустить
                      </button>
                    )}
                    {isSimulating && (
                      <span className="chat-sim-badge">Симуляция...</span>
                    )}
                    <button className="chat-close-btn" onClick={() => setShowChat(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="chat-messages" ref={chatRef}>
                  {chatMessages.length === 0 && !isSimulating && (
                    <div className="chat-empty">
                      {timelineInterventions.length === 0
                        ? 'Нет запланированных интервенций. Создайте план.'
                        : 'Нажмите «Запустить» чтобы начать симуляцию'}
                    </div>
                  )}
                  {(() => {
                    const categoryColors = {
                      sleep: '#2196f3', physical: '#4caf50', mental: '#9c27b0',
                      food: '#ff9800', medical: '#f44336', supplement: '#795548',
                    };
                    let lastDay = -1;
                    return chatMessages.map((msg) => {
                      const showDate = msg.day !== lastDay;
                      lastDay = msg.day;
                      const color = categoryColors[msg.category] || '#6b21c8';
                      return (
                        <React.Fragment key={msg.id}>
                          {showDate && <div className="chat-date-divider"><span>День {msg.day}</span></div>}
                          <div className="chat-message bot">
                            <div className="chat-avatar" style={{ backgroundColor: color }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="14" height="14">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                              </svg>
                            </div>
                            <div className="chat-bubble bot-bubble" style={{ borderLeftColor: color }}>
                              <div className="chat-bubble-header">
                                <span className="chat-interv-code">{msg.code}</span>
                                <span className="chat-interv-time">{msg.time}</span>
                              </div>
                              <div className="chat-interv-name">{msg.name}</div>
                              <div className="chat-interv-detail">
                                {msg.state === 'Активировано' ? '✅ Активировано' : '⏭ Пропущено'}
                              </div>
                              {msg.response && (
                                <div className="chat-reaction">
                                  <span className="chat-reaction-arrow">↩</span>
                                  <span className="chat-reaction-text">{msg.response}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()}
                  {isSimulating && (
                    <div className="chat-typing">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>

      )}
    </div>
  );
};

export default DigitalTwin;
