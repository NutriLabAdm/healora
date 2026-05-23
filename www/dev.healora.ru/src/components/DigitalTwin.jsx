import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../assets/css/DigitalTwin.css';
import '../assets/css/ActionButtons.css';
import catalogData from '../assets/data/interventions_catalog.json';
import protocolData from '../assets/data/protocol_mappings.json';
import foodCatalog from '../assets/data/food_catalog.json';
import planTemplates, { getTemplateById } from '../assets/data/plan_templates.js';
import { usePlans } from '../context/PlansProvider';
import GoalBadges from './GoalBadges';
import PlanJournalView from './PlanJournalView';
import PlanList from './PlanList';
import icon from '../utils/icons';
import protocolTypes from '../assets/data/protocols_type.json';
import dietPrefsData from '../assets/data/diet_preferences.json';
import dietRestrictionsData from '../assets/data/diet_restrictions.json';
import ProfileView from './ProfileView';
import DiaryView from './DiaryView';
import PlanView from './PlanView';
import PhoneSimulator from './PhoneSimulator';

const practiceMdModules = import.meta.glob('../../../../docs/domain/med_traditional_practices/practice_*.md', { as: 'raw', eager: true });
const practiceContentByKey = Object.fromEntries(
  Object.entries(practiceMdModules).map(([path, content]) => {
    const m = path.match(/practice_(\w+)\.md$/);
    return m ? [m[1], content] : null;
  }).filter(Boolean)
);

const dietPrefMdModules = import.meta.glob('../../../../docs/domain/diet_preferences/diet_*.md', { as: 'raw', eager: true });
const dietPrefContentByKey = Object.fromEntries(
  Object.entries(dietPrefMdModules).map(([path, content]) => {
    const m = path.match(/diet_(\w+)\.md$/);
    return m ? [m[1], content] : null;
  }).filter(Boolean)
);

const dietRestrictionMdModules = import.meta.glob('../../../../docs/domain/diet_restrictions/restriction_*.md', { as: 'raw', eager: true });
const dietRestrictionContentByKey = Object.fromEntries(
  Object.entries(dietRestrictionMdModules).map(([path, content]) => {
    const m = path.match(/restriction_(\w+)\.md$/);
    return m ? [m[1], content] : null;
  }).filter(Boolean)
);

const useCaseLabels = {
  1: 'Заполнение ЦД', 2: 'AI-рекомендация', 3: 'Планирование', 4: 'Трекинг питания', 5: 'Подбор протокола',
};
const cjmLabels = {
  1: 'Новый пользователь', 2: 'Активный пользователь', 3: 'Пациент клиники', 4: 'Врач', 5: 'Пользователь на пилоте',
};

const prototypeScreens = [
  { num: 1, name: 'Мой профиль', file: 'screen_02_dashboard.png', desc: 'Цифровой двойник с 50+ параметрами в 6 разделах. Inline-редактирование, целевые кнопки, голосовой ввод, интервенционные бейджи, алерты при отклонении от цели.', useCases: [1], cjms: [1, 2, 3, 4] },
  { num: 2, name: 'Дашборд DT', file: 'screen_02_dashboard.png', desc: 'Таблица с 50+ параметрами, сгруппированными в 6 разделов. Inline-редактирование, целевые кнопки, интервенционные бейджи, 7-дневная история, алерты при отклонении >15%.', useCases: [1], cjms: [1, 2, 3, 4] },
  { num: 3, name: 'Таймлайн', file: 'screen_03_timeline.png', desc: 'DAW-инспирированный плеер. Протоколы и интервенции на треках с красным playhead. Управление: Start/Stop, Speed, 1д/1н/Фазы. Drag-and-drop из каталога.', useCases: [3], cjms: [1, 5] },
  { num: 4, name: 'Голосовой редактор', file: 'screen_04_voice_popup.png', desc: 'Модальное окно для диктовки параметров. Web Speech API (8 языков). Пульсирующая анимация записи, транскрипт в реальном времени, по-полевой микрофон.', useCases: [1], cjms: [1] },
  { num: 5, name: 'AI-Чат', file: 'screen_05_chat.png', desc: 'Полноэкранный чат с GigaChat. Контекст профиля, боковая панель источников данных, карточки-задачи, викторина для проверки знаний.', useCases: [2], cjms: [2] },
  { num: 6, name: 'Дневник питания', file: 'screen_06_diary.png', desc: 'Модальное окно трекинга на выбранный день. 4 приёма пищи с КБЖУ, селектор продуктов (1000+ записей), фото, голосовой ввод, самочувствие.', useCases: [4], cjms: [2, 3] },
  { num: 7, name: 'Каталог интервенций', file: 'screen_07_interventions.png', desc: 'Библиотека 300+ протоколов с evidence-level A–D. Фильтры по категориям, карточки с бейджами кодов, drag-and-drop на таймлайн.', useCases: [3], cjms: [4, 5] },
  { num: 8, name: 'Рецепт / План', file: 'screen_08_prescription.png', desc: 'HEALORA Prescription: шапка с пациентом/врачом, таблица назначений, QR-код, заметка врача, статус, печать.', useCases: [3], cjms: [1, 4] },
  { num: 9, name: 'Путь здоровья', file: 'screen_09_progress_path.png', desc: 'Экран путешествия: прогресс (68%), селектор профилей, статистика, рекомендации, DeviceDropZone, 5 индикаторов DT.', useCases: [2], cjms: [2, 5] },
  { num: 10, name: 'Decision Flow', file: 'screen_10_decision_flow.png', desc: 'Интерактивный подбор протокола: pSuccess ранжирование, Top-3, запрос недостающих данных, системный лог.', useCases: [5], cjms: [5] },
];

const EXECUTION_HISTORY = {"days":[
{"day":1,"date":"2026-05-17","adherence_pct":67,"weight_kg":97,"Z_score":53.2,"tasks":[{"code":"FD_CAL","status":"done","comment":"Спланировал меню на день","datetime":"2026-05-17  20:00:00"},{"code":"PH_WALK","status":"done","comment":"6200 шагов","datetime":"2026-05-17  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара","datetime":"2026-05-17  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи на обед и ужин","datetime":"2026-05-17  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром 5 мин","datetime":"2026-05-17  07:15:00"},{"code":"SL_BED","status":"undone","comment":"Лёг в 23:30","datetime":"2026-05-17  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"На день 14","datetime":"2026-05-17  08:00:00"},{"code":"FD_WATER","status":"done","comment":"1.8 л","datetime":"2026-05-17  15:00:00"}]},
{"day":2,"date":"2026-05-18","adherence_pct":75,"weight_kg":96.6,"Z_score":79.2,"tasks":[{"code":"FD_CAL","status":"done","comment":"Соблюдал дефицит","datetime":"2026-05-18  20:00:00"},{"code":"PH_WALK","status":"done","comment":"7800 шагов","datetime":"2026-05-18  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-05-18  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи + овсянка","datetime":"2026-05-18  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-18  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 23:00","datetime":"2026-05-18  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-18  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-05-18  15:00:00"}]},
{"day":3,"date":"2026-05-19","adherence_pct":50,"weight_kg":96.3,"Z_score":62.8,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-05-19  20:00:00"},{"code":"PH_WALK","status":"undone","comment":"3500 шагов","datetime":"2026-05-19  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-05-19  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Салат на обед","datetime":"2026-05-19  13:00:00"},{"code":"MN_BRTH","status":"undone","comment":"Забыл","datetime":"2026-05-19  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 23:00","datetime":"2026-05-19  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-19  08:00:00"},{"code":"FD_WATER","status":"done","comment":"1.5 л","datetime":"2026-05-19  15:00:00"}]},
{"day":4,"date":"2026-05-20","adherence_pct":62,"weight_kg":96.5,"Z_score":37.3,"tasks":[{"code":"FD_CAL","status":"done","comment":"Норма","datetime":"2026-05-20  20:00:00"},{"code":"PH_WALK","status":"done","comment":"6500 шагов","datetime":"2026-05-20  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-05-20  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи с каждым приёмом","datetime":"2026-05-20  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-20  07:15:00"},{"code":"SL_BED","status":"undone","comment":"Лёг в 23:45","datetime":"2026-05-20  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-20  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.2 л","datetime":"2026-05-20  15:00:00"}]},
{"day":5,"date":"2026-05-21","adherence_pct":83,"weight_kg":96.1,"Z_score":82.8,"tasks":[{"code":"FD_CAL","status":"done","comment":"Полностью соблюдён","datetime":"2026-05-21  20:00:00"},{"code":"PH_WALK","status":"done","comment":"8200 шагов","datetime":"2026-05-21  18:00:00"},{"code":"FD_SUG","status":"done","comment":"Ноль сахара","datetime":"2026-05-21  14:00:00"},{"code":"FD_FIB","status":"done","comment":"Овощи + ягоды","datetime":"2026-05-21  13:00:00"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-21  07:15:00"},{"code":"SL_BED","status":"done","comment":"Лёг в 22:55","datetime":"2026-05-21  23:00:00"},{"code":"M_LAB01","status":"pending","comment":"","datetime":"2026-05-21  08:00:00"},{"code":"FD_WATER","status":"done","comment":"2.5 л","datetime":"2026-05-21  15:00:00"}]},
{"day":6,"date":"2026-05-22","adherence_pct":67,"weight_kg":96.0,"Z_score":66.9,"tasks":[{"code":"FD_CAL","status":"undone","comment":"","datetime":"2026-05-22"},{"code":"PH_WALK","status":"done","comment":"8206 шагов","datetime":"2026-05-22"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-05-22"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-22"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-22"},{"code":"SL_BED","status":"done","comment":"22:45","datetime":"2026-05-22"},{"code":"FD_WATER","status":"done","comment":"1.7 л","datetime":"2026-05-22"}]},
{"day":7,"date":"2026-05-23","adherence_pct":74,"weight_kg":96.0,"Z_score":52.5,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-05-23"},{"code":"PH_WALK","status":"done","comment":"7064 шагов","datetime":"2026-05-23"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-05-23"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-23"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-23"},{"code":"SL_BED","status":"done","comment":"22:45","datetime":"2026-05-23"},{"code":"FD_WATER","status":"done","comment":"1.7 л","datetime":"2026-05-23"},{"code":"PR_06","status":"done","comment":"Челлендж день 1","datetime":"2026-05-23"}]},
{"day":8,"date":"2026-05-24","adherence_pct":78,"weight_kg":95.9,"Z_score":73.0,"tasks":[{"code":"FD_CAL","status":"pending","comment":"","datetime":"2026-05-24"},{"code":"PH_WALK","status":"undone","comment":"Весь день в офисе","datetime":"2026-05-24"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-05-24"},{"code":"FD_FIB","status":"undone","comment":"","datetime":"2026-05-24"},{"code":"MN_BRTH","status":"done","comment":"Перед сном","datetime":"2026-05-24"},{"code":"SL_BED","status":"pending","comment":"23:45","datetime":"2026-05-24"},{"code":"FD_WATER","status":"done","comment":"2.5 л","datetime":"2026-05-24"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-05-24"}]},
{"day":9,"date":"2026-05-25","adherence_pct":74,"weight_kg":95.9,"Z_score":52.7,"tasks":[{"code":"FD_CAL","status":"done","comment":"1900 ккал","datetime":"2026-05-25"},{"code":"PH_WALK","status":"done","comment":"10561 шагов","datetime":"2026-05-25"},{"code":"FD_SUG","status":"undone","comment":"Сорвался на печенье","datetime":"2026-05-25"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-25"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-25"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-05-25"},{"code":"FD_WATER","status":"done","comment":"1.8 л","datetime":"2026-05-25"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-05-25"}]},
{"day":10,"date":"2026-05-26","adherence_pct":55,"weight_kg":95.9,"Z_score":43.8,"tasks":[{"code":"FD_CAL","status":"done","comment":"1900 ккал","datetime":"2026-05-26"},{"code":"PH_WALK","status":"pending","comment":"Не было времени","datetime":"2026-05-26"},{"code":"FD_SUG","status":"undone","comment":"Мороженое","datetime":"2026-05-26"},{"code":"FD_FIB","status":"undone","comment":"","datetime":"2026-05-26"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-05-26"},{"code":"SL_BED","status":"done","comment":"22:45","datetime":"2026-05-26"},{"code":"FD_WATER","status":"done","comment":"1.8 л","datetime":"2026-05-26"}]},
{"day":11,"date":"2026-05-27","adherence_pct":80,"weight_kg":95.8,"Z_score":72.1,"tasks":[{"code":"FD_CAL","status":"done","comment":"План выполнен","datetime":"2026-05-27"},{"code":"PH_WALK","status":"done","comment":"8009 шагов","datetime":"2026-05-27"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара","datetime":"2026-05-27"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-27"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-05-27"},{"code":"SL_BED","status":"undone","comment":"23:30","datetime":"2026-05-27"},{"code":"FD_WATER","status":"pending","comment":"2.1 л","datetime":"2026-05-27"}]},
{"day":12,"date":"2026-05-28","adherence_pct":79,"weight_kg":95.7,"Z_score":75.7,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-05-28"},{"code":"PH_WALK","status":"done","comment":"6666 шагов","datetime":"2026-05-28"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара","datetime":"2026-05-28"},{"code":"FD_FIB","status":"pending","comment":"","datetime":"2026-05-28"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-05-28"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-05-28"},{"code":"FD_WATER","status":"done","comment":"2.5 л","datetime":"2026-05-28"}]},
{"day":13,"date":"2026-05-29","adherence_pct":76,"weight_kg":95.5,"Z_score":76.1,"tasks":[{"code":"FD_CAL","status":"done","comment":"1900 ккал","datetime":"2026-05-29"},{"code":"PH_WALK","status":"pending","comment":"Весь день в офисе","datetime":"2026-05-29"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-05-29"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-29"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-05-29"},{"code":"SL_BED","status":"undone","comment":"23:45","datetime":"2026-05-29"},{"code":"FD_WATER","status":"pending","comment":"2.1 л","datetime":"2026-05-29"}]},
{"day":14,"date":"2026-05-30","adherence_pct":72,"weight_kg":95.5,"Z_score":51.9,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-05-30"},{"code":"PH_WALK","status":"done","comment":"9563 шагов","datetime":"2026-05-30"},{"code":"FD_SUG","status":"pending","comment":"Сорвался на печенье","datetime":"2026-05-30"},{"code":"FD_FIB","status":"pending","comment":"","datetime":"2026-05-30"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-05-30"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-05-30"},{"code":"FD_WATER","status":"pending","comment":"1.6 л","datetime":"2026-05-30"},{"code":"M_LAB01","status":"done","comment":"Глюкоза 98","datetime":"2026-05-30"},{"code":"PR_06","status":"done","comment":"Челлендж завершён","datetime":"2026-05-30"}]},
{"day":15,"date":"2026-05-31","adherence_pct":83,"weight_kg":95.4,"Z_score":75.0,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-05-31"},{"code":"PH_WALK","status":"done","comment":"8768 шагов","datetime":"2026-05-31"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-05-31"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-05-31"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-05-31"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-05-31"},{"code":"FD_WATER","status":"undone","comment":"2.3 л","datetime":"2026-05-31"}]},
{"day":16,"date":"2026-06-01","adherence_pct":79,"weight_kg":95.3,"Z_score":73.6,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-06-01"},{"code":"PH_WALK","status":"undone","comment":"Дождь","datetime":"2026-06-01"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-01"},{"code":"FD_FIB","status":"undone","comment":"","datetime":"2026-06-01"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-06-01"},{"code":"SL_BED","status":"undone","comment":"23:30","datetime":"2026-06-01"},{"code":"FD_WATER","status":"done","comment":"1.6 л","datetime":"2026-06-01"}]},
{"day":17,"date":"2026-06-02","adherence_pct":74,"weight_kg":95.3,"Z_score":53.3,"tasks":[{"code":"FD_CAL","status":"done","comment":"План выполнен","datetime":"2026-06-02"},{"code":"PH_WALK","status":"done","comment":"9632 шагов","datetime":"2026-06-02"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара","datetime":"2026-06-02"},{"code":"FD_FIB","status":"undone","comment":"","datetime":"2026-06-02"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-06-02"},{"code":"SL_BED","status":"done","comment":"22:45","datetime":"2026-06-02"},{"code":"FD_WATER","status":"pending","comment":"1.9 л","datetime":"2026-06-02"}]},
{"day":18,"date":"2026-06-03","adherence_pct":60,"weight_kg":95.3,"Z_score":46.2,"tasks":[{"code":"FD_CAL","status":"done","comment":"1900 ккал","datetime":"2026-06-03"},{"code":"PH_WALK","status":"done","comment":"9893 шагов","datetime":"2026-06-03"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-06-03"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-03"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-06-03"},{"code":"SL_BED","status":"undone","comment":"00:15","datetime":"2026-06-03"},{"code":"FD_WATER","status":"done","comment":"2.3 л","datetime":"2026-06-03"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-06-03"}]},
{"day":19,"date":"2026-06-04","adherence_pct":76,"weight_kg":95.2,"Z_score":69.8,"tasks":[{"code":"FD_CAL","status":"done","comment":"1900 ккал","datetime":"2026-06-04"},{"code":"PH_WALK","status":"done","comment":"6054 шагов","datetime":"2026-06-04"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-04"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-04"},{"code":"MN_BRTH","status":"done","comment":"Перед сном","datetime":"2026-06-04"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-06-04"},{"code":"FD_WATER","status":"done","comment":"2.1 л","datetime":"2026-06-04"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-06-04"}]},
{"day":20,"date":"2026-06-05","adherence_pct":75,"weight_kg":95.1,"Z_score":72.1,"tasks":[{"code":"FD_CAL","status":"undone","comment":"","datetime":"2026-06-05"},{"code":"PH_WALK","status":"done","comment":"8463 шагов","datetime":"2026-06-05"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-06-05"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-05"},{"code":"MN_BRTH","status":"done","comment":"Перед сном","datetime":"2026-06-05"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-05"},{"code":"FD_WATER","status":"done","comment":"2.4 л","datetime":"2026-06-05"}]},
{"day":21,"date":"2026-06-06","adherence_pct":90,"weight_kg":95.0,"Z_score":79.9,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-06-06"},{"code":"PH_WALK","status":"done","comment":"11860 шагов","datetime":"2026-06-06"},{"code":"FD_SUG","status":"pending","comment":"Пирожное","datetime":"2026-06-06"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-06"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-06-06"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-06-06"},{"code":"FD_WATER","status":"done","comment":"2.5 л","datetime":"2026-06-06"},{"code":"PR_04","status":"pending","comment":"","datetime":"2026-06-06"}]},
{"day":22,"date":"2026-06-07","adherence_pct":88,"weight_kg":94.9,"Z_score":79.7,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-06-07"},{"code":"PH_WALK","status":"undone","comment":"Не было времени","datetime":"2026-06-07"},{"code":"FD_SUG","status":"done","comment":"Чай без сахара","datetime":"2026-06-07"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-07"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-06-07"},{"code":"SL_BED","status":"done","comment":"22:45","datetime":"2026-06-07"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-06-07"}]},
{"day":23,"date":"2026-06-08","adherence_pct":89,"weight_kg":94.8,"Z_score":78.4,"tasks":[{"code":"FD_CAL","status":"done","comment":"План выполнен","datetime":"2026-06-08"},{"code":"PH_WALK","status":"done","comment":"6188 шагов","datetime":"2026-06-08"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-08"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-08"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-06-08"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-08"},{"code":"FD_WATER","status":"done","comment":"1.9 л","datetime":"2026-06-08"}]},
{"day":24,"date":"2026-06-09","adherence_pct":76,"weight_kg":94.7,"Z_score":72.3,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-06-09"},{"code":"PH_WALK","status":"done","comment":"6198 шагов","datetime":"2026-06-09"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-09"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-09"},{"code":"MN_BRTH","status":"done","comment":"Перед сном","datetime":"2026-06-09"},{"code":"SL_BED","status":"undone","comment":"00:15","datetime":"2026-06-09"},{"code":"FD_WATER","status":"done","comment":"2.4 л","datetime":"2026-06-09"}]},
{"day":25,"date":"2026-06-10","adherence_pct":77,"weight_kg":94.6,"Z_score":71.9,"tasks":[{"code":"FD_CAL","status":"pending","comment":"","datetime":"2026-06-10"},{"code":"PH_WALK","status":"done","comment":"6671 шагов","datetime":"2026-06-10"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-10"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-10"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-06-10"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-10"},{"code":"FD_WATER","status":"undone","comment":"2.4 л","datetime":"2026-06-10"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-06-10"}]},
{"day":26,"date":"2026-06-11","adherence_pct":93,"weight_kg":94.5,"Z_score":82.0,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-06-11"},{"code":"PH_WALK","status":"done","comment":"11858 шагов","datetime":"2026-06-11"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-06-11"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-11"},{"code":"MN_BRTH","status":"done","comment":"Перед сном","datetime":"2026-06-11"},{"code":"SL_BED","status":"done","comment":"23:00","datetime":"2026-06-11"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-06-11"}]},
{"day":27,"date":"2026-06-12","adherence_pct":94,"weight_kg":94.3,"Z_score":88.6,"tasks":[{"code":"FD_CAL","status":"done","comment":"КБЖУ в норме","datetime":"2026-06-12"},{"code":"PH_WALK","status":"done","comment":"11910 шагов","datetime":"2026-06-12"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-12"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-12"},{"code":"MN_BRTH","status":"done","comment":"Утром и вечером","datetime":"2026-06-12"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-12"},{"code":"FD_WATER","status":"done","comment":"1.8 л","datetime":"2026-06-12"}]},
{"day":28,"date":"2026-06-13","adherence_pct":82,"weight_kg":94.2,"Z_score":75.7,"tasks":[{"code":"FD_CAL","status":"pending","comment":"","datetime":"2026-06-13"},{"code":"PH_WALK","status":"done","comment":"10495 шагов","datetime":"2026-06-13"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-13"},{"code":"FD_FIB","status":"pending","comment":"","datetime":"2026-06-13"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-06-13"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-13"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-06-13"},{"code":"BEH_EAT","status":"done","comment":"Осознанно пообедал","datetime":"2026-06-13"},{"code":"PR_04","status":"done","comment":"","datetime":"2026-06-13"},{"code":"M_LAB01","status":"done","comment":"Глюкоза 98","datetime":"2026-06-13"}]},
{"day":29,"date":"2026-06-14","adherence_pct":90,"weight_kg":94.1,"Z_score":78.7,"tasks":[{"code":"FD_CAL","status":"done","comment":"План выполнен","datetime":"2026-06-14"},{"code":"PH_WALK","status":"done","comment":"6959 шагов","datetime":"2026-06-14"},{"code":"FD_SUG","status":"done","comment":"Удержался","datetime":"2026-06-14"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-14"},{"code":"MN_BRTH","status":"done","comment":"Только утром","datetime":"2026-06-14"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-14"},{"code":"FD_WATER","status":"done","comment":"2.1 л","datetime":"2026-06-14"},{"code":"PR_01","status":"done","comment":"Меню на неделю","datetime":"2026-06-14"},{"code":"PR_04","status":"pending","comment":"","datetime":"2026-06-14"}]},
{"day":30,"date":"2026-06-15","adherence_pct":88,"weight_kg":93.9,"Z_score":81.7,"tasks":[{"code":"FD_CAL","status":"done","comment":"Дефицит соблюдён","datetime":"2026-06-15"},{"code":"PH_WALK","status":"done","comment":"6282 шагов","datetime":"2026-06-15"},{"code":"FD_SUG","status":"done","comment":"Без сахара","datetime":"2026-06-15"},{"code":"FD_FIB","status":"done","comment":"","datetime":"2026-06-15"},{"code":"MN_BRTH","status":"pending","comment":"Забыл","datetime":"2026-06-15"},{"code":"SL_BED","status":"done","comment":"22:30","datetime":"2026-06-15"},{"code":"FD_WATER","status":"done","comment":"2.0 л","datetime":"2026-06-15"},{"code":"BEH_EAT","status":"done","comment":"Осознанный ужин","datetime":"2026-06-15"}]}
]};

const DigitalTwin = ({ profileId, selectedProtocol, cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phoneOverlayTab, setPhoneOverlayTab] = useState('profile');
  // flow rendered inside screen as tab
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
  const [showExecHistory, setShowExecHistory] = useState(false);
  const [execHistoryDay, setExecHistoryDay] = useState(1);
  const [collapsedSections, setCollapsedSections] = useState({
    demographics: false, vitals: false, labs: false, lifestyle: false, genetics: false, medical: false
  });
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [clipMultipliers, setClipMultipliers] = useState({});
  const [timelineView, setTimelineView] = useState('days'); // 'days' | 'weeks' | 'phases'
  const [tracksCollapsed, setTracksCollapsed] = useState(true);
  const [draggedClip, setDraggedClip] = useState(null);
  const [showInterventionPopup, setShowInterventionPopup] = useState(false);
  const [selectedInterventionForPopup, setSelectedInterventionForPopup] = useState(null);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [expandedAttr, setExpandedAttr] = useState(null);
  const [rppFormData, setRppFormData] = useState(null); // { types: [], frequency: 'Ежедневно', triggers: '', notes: '' }
  const [planTemplateId, setPlanTemplateId] = useState('custom');
  const [planStatus, setPlanStatus] = useState('active'); // 'active' | 'stopped' | 'archived'
  const [planDoctorNote, setPlanDoctorNote] = useState('');
  const [planSearchOpen, setPlanSearchOpen] = useState(false);
  const [planSearchQuery, setPlanSearchQuery] = useState('');
  const [showDiary, setShowDiary] = useState(false);
  const [diaryDay, setDiaryDay] = useState(null);
  const [diaryData, setDiaryData] = useState(null);
  const [chatDiaryActive, setChatDiaryActive] = useState(false);
  const [chatDiaryDay, setChatDiaryDay] = useState(null);
  const [chatDiaryData, setChatDiaryData] = useState(null);
  const [chatInlineMode, setChatInlineMode] = useState('none'); // 'none' | 'profile' | 'plan' | 'diary' | 'food'
  const [chatScreenPreview, setChatScreenPreview] = useState(null); // null | screen index (0-9) for lightbox
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [chatActiveScreen, setChatActiveScreen] = useState(null); // null | prototypeScreens entry
  const [chatSectionCollapsed, setChatSectionCollapsed] = useState({});
  const [chatProtoMsgs, setChatProtoMsgs] = useState([]);
  const [chatProtoInput, setChatProtoInput] = useState('');
  const [chatProtoLoading, setChatProtoLoading] = useState(false);
  const chatProtoEndRef = useRef(null);
  const [chatPhotoPreview, setChatPhotoPreview] = useState(null);

  // ── Goal selection state ──
  const GOAL_OPTIONS = [
    { id: 'weight', name: 'Снизить вес', icon: icon.scale, attrId: 'weight' },
    { id: 'bmi', name: 'Нормализовать ИМТ', icon: icon.ruler, attrId: 'bmi' },
    { id: 'sleep', name: 'Улучшить сон', icon: icon.sleep, attrId: 'sleep' },
    { id: 'stress', name: 'Снизить стресс', icon: icon.meditate, attrId: 'stress' },
    { id: 'steps', name: 'Увеличить шаги', icon: icon.walk, attrId: 'steps' },
    { id: 'glucose', name: 'Контроль глюкозы', icon: icon.blood, attrId: 'glucose' },
    { id: 'hba1c', name: 'Снизить HbA1c', icon: icon.syringe, attrId: 'hba1c' },
    { id: 'ldl', name: 'Снизить ЛПНП', icon: icon.heart, attrId: 'ldl' },
    { id: 'hdl', name: 'Повысить ЛПВП', icon: icon.greenHeart, attrId: 'hdl' },
    { id: 'vitd', name: 'Нормализовать D', icon: icon.sun, attrId: 'vitd' },
    { id: 'water', name: 'Пить больше воды', icon: icon.water, attrId: 'water' },
    { id: 'waist', name: 'Уменьшить талию', icon: icon.tape, attrId: 'waist' },
  ];
  const [showGoalChat, setShowGoalChat] = useState(false);
  const [chatGoals, setChatGoals] = useState([]);
  const [goalChatStep, setGoalChatStep] = useState(0); // 0=greeting, 1=selecting, 2=confirm, 3=done
  const [goalChatLog, setGoalChatLog] = useState([]);
  const [showGoalBadges, setShowGoalBadges] = useState(false);
  const [showPlanJournal, setShowPlanJournal] = useState(false);
  const [planJournalId, setPlanJournalId] = useState(null);
  const [showPlanList, setShowPlanList] = useState(false);
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [selectedFoodMealIdx, setSelectedFoodMealIdx] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [foodKeywordFilter, setFoodKeywordFilter] = useState(null);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [selectedProtocolForScheduling, setSelectedProtocolForScheduling] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatInputRef = useRef(null);
  const [chatMode, setChatMode] = useState('simulation');
  const [gigachatMessages, setGigachatMessages] = useState([]);
  const [gigachatLoading, setGigachatLoading] = useState(false);
  const [showProtocolPopup, setShowProtocolPopup] = useState(false);
  const [selectedProtocolForPopup, setSelectedProtocolForPopup] = useState(null);
  const [logViewDay, setLogViewDay] = useState(-1); // -1 = all days
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [voiceSection, setVoiceSection] = useState(null);
  const [voiceStatus, setVoiceStatus] = useState('idle'); // idle | recording | done
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceParsedValues, setVoiceParsedValues] = useState([]);
  const [voiceError, setVoiceError] = useState('');
  const [voiceFormValues, setVoiceFormValues] = useState({});
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceLang, setVoiceLang] = useState('ru-RU');
  const [voiceMicDevices, setVoiceMicDevices] = useState([]);
  const [voiceMicDeviceId, setVoiceMicDeviceId] = useState('');
  const [voiceMicLoading, setVoiceMicLoading] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [voiceMonitorActive, setVoiceMonitorActive] = useState(false);
  const voiceRecognitionRef = useRef(null);
  const voiceStreamRef = useRef(null);
  const voiceAnalyserRef = useRef(null);
  const voiceMonitorRafRef = useRef(null);

  const stopMicMonitor = () => {
    if (voiceMonitorRafRef.current) { cancelAnimationFrame(voiceMonitorRafRef.current); voiceMonitorRafRef.current = null; }
    if (voiceStreamRef.current) { voiceStreamRef.current.getTracks().forEach(t => t.stop()); voiceStreamRef.current = null; }
    voiceAnalyserRef.current = null;
    setVoiceLevel(0);
    setVoiceMonitorActive(false);
  };

  const startMicMonitor = async (deviceId) => {
    stopMicMonitor();
    if (!deviceId) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } }
      });
      voiceStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      voiceAnalyserRef.current = analyser;
      setVoiceMonitorActive(true);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!voiceAnalyserRef.current) return;
        voiceAnalyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const pct = Math.min(100, Math.round((avg / 255) * 100));
        setVoiceLevel(pct);
        voiceMonitorRafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      console.warn('Mic monitor failed:', e);
      setVoiceMonitorActive(false);
    }
  };

  const handleMicDeviceChange = async (deviceId) => {
    setVoiceMicDeviceId(deviceId);
    if (deviceId) await startMicMonitor(deviceId);
  };

  const enumerateMics = async () => {
    try {
      setVoiceMicLoading(true);
      // Request permission first
      const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      tempStream.getTracks().forEach(t => t.stop());
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mics = devices.filter(d => d.kind === 'audioinput');
      setVoiceMicDevices(mics);
      if (mics.length > 0 && !voiceMicDeviceId) {
        setVoiceMicDeviceId(mics[0].deviceId);
      }
    } catch (e) {
      console.warn('Microphone enumeration failed:', e);
    } finally {
      setVoiceMicLoading(false);
    }
  };

  const startVoiceWithMic = (recognition) => {
    try { recognition.start(); } catch (e) { setVoiceError('Ошибка запуска микрофона: ' + e.message); }
  };

  const handleStartRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setVoiceError('Голосовой ввод не поддерживается в этом браузере'); return; }
    setVoiceError('');
    setVoiceTranscript('');
    setVoiceParsedValues([]);
    setVoiceStatus('recording');
    const sr = new SpeechRecognition();
    sr.lang = voiceLang;
    sr.continuous = true;
    sr.interimResults = true;
    sr.onresult = (ev) => {
      let text = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        text += ev.results[i][0].transcript;
      }
      setVoiceTranscript(text);
      const parsed = parseVoiceTranscript(text, voiceSection);
      setVoiceParsedValues(parsed);
      setVoiceFormValues(prev => {
        const updated = { ...prev };
        parsed.forEach(pv => { updated[pv.attrId] = pv.value; });
        return updated;
      });
    };
    sr.onerror = (ev) => {
      setVoiceError('Ошибка: ' + ev.error);
      setVoiceStatus('idle');
    };
    sr.onend = () => {
      setVoiceStatus(prev => prev === 'recording' ? 'done' : prev);
    };
    voiceRecognitionRef.current = sr;
    startVoiceWithMic(sr);
  };

  const handleStopRecording = () => {
    if (voiceRecognitionRef.current) {
      voiceRecognitionRef.current.stop();
      voiceRecognitionRef.current = null;
    }
    setVoiceStatus('done');
  };

  const [showParamHistory, setShowParamHistory] = useState(null);
  const [paramHistory, setParamHistory] = useState({});
  const [profileOverrides, setProfileOverrides] = useState({});
  const [hasUnsavedEdits, setHasUnsavedEdits] = useState(false);
  const [prefBadges, setPrefBadges] = useState(() => {
    try { return JSON.parse(localStorage.getItem('healora_pref_badges') || '[]'); } catch { return []; }
  });
  const [prefCustom, setPrefCustom] = useState(() => {
    try { return localStorage.getItem('healora_pref_custom') || ''; } catch { return ''; }
  });
  const [showProtocolPicker, setShowProtocolPicker] = useState(false);
  const [regulatoryInfo, setRegulatoryInfo] = useState(null);
  const [practicePopup, setPracticePopup] = useState(null);
  const [prefDietBadges, setPrefDietBadges] = useState(() => {
    try { return JSON.parse(localStorage.getItem('healora_pref_diet') || '[]'); } catch { return []; }
  });
  const [prefRestrictionBadges, setPrefRestrictionBadges] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('healora_pref_restrictions') || '[]');
      return raw.map(r => typeof r === 'string' ? { name: r, text: '' } : r);
    } catch { return []; }
  });
  const [showDietPrefs, setShowDietPrefs] = useState(false);
  const [showRestrictions, setShowRestrictions] = useState(false);
  const [dietPrefPopup, setDietPrefPopup] = useState(null);
  const [restrictionPopup, setRestrictionPopup] = useState(null);
  const simulationSpeedRef = useRef(1);

  const { getPlan, savePlan, removePlan, plans } = usePlans();
  const syncedPlanKeyRef = useRef('');

  // Hydrate timelineInterventions from PlansProvider when profileId changes
  useEffect(() => {
    if (!profileId) return;
    const saved = getPlan(profileId);
    if (saved.interventions.length > 0) {
      setTimelineInterventions(saved.interventions);
      setPlanDoctorNote(saved.note || '');
      setPlanStatus(saved.status || 'active');
      setPlanTemplateId(saved.templateId || 'custom');
    } else {
      const defaultTemplate = profileId === 'DMITRY_57_110KG' ? 'PTL_RAPID_WL' : 'custom';
      setPlanTemplateId(defaultTemplate);
      setTimelineInterventions([]);
      setPlanDoctorNote('');
      setPlanStatus('active');
    }
  }, [profileId]);

  // Persist timelineInterventions to PlansProvider on change
  useEffect(() => {
    if (!profileId) return;
    const key = `${profileId}_${timelineInterventions.length}_${planDoctorNote}_${planStatus}_${planTemplateId}`;
    if (key !== syncedPlanKeyRef.current) {
      syncedPlanKeyRef.current = key;
      savePlan(profileId, { interventions: timelineInterventions, note: planDoctorNote, status: planStatus, templateId: planTemplateId });
    }
  }, [timelineInterventions, planDoctorNote, planStatus, planTemplateId, profileId]);

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
        { id: 'weight', code: '01_4_DEMO_WEIGHT', name: 'Вес', current: profile?.anthropometrics?.weight_kg, target: 88, unit: 'кг', norm: '50-120', editable: true },
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
        { id: 'rpp', code: '03_10_LIFE_RPP', name: 'РПП', current: profile?.lifestyle?.rpp || 'Нет', target: 'Нет', unit: '', norm: 'Нет', editable: true, options: ['Нет','Анорексия','Булимия','Компульсивное переедание','Орторексия'] },
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

  const paramDetailData = {
    bmi: {
      description: 'Индекс массы тела — показатель, позволяющий оценить соответствие массы тела человека его росту.',
      medical: '18.5–24.9 кг/м²',
      nutritional: '18.5–24.9 кг/м²',
      tips: 'Поддерживайте ИМТ в пределах нормы через сбалансированное питание и регулярную физическую активность.',
    },
    weight: {
      description: 'Масса тела — один из важнейших антропометрических показателей.',
      medical: 'Индивидуально в зависимости от роста и возраста',
      nutritional: 'В пределах 5% от идеальной массы тела',
    },
    height: {
      description: 'Рост — фундаментальный антропометрический показатель.',
      medical: 'Генетически обусловлен',
      nutritional: '—',
    },
    waist: {
      description: 'Окружность талии — маркер абдоминального ожирения и риска метаболических нарушений.',
      medical: '< 94 см (муж) / < 80 см (жен)',
      nutritional: '< 90 см (муж) / < 80 см (жен)',
      tips: 'Уменьшение окружности талии на 5 см снижает риск сердечно-сосудистых заболеваний на 15%.',
    },
    glucose: {
      description: 'Уровень глюкозы в крови натощак — ключевой показатель углеводного обмена.',
      medical: '3.9–5.6 ммоль/л',
      nutritional: '4.0–5.5 ммоль/л',
      tips: 'Стабильный уровень глюкозы поддерживается регулярным питанием с низким гликемическим индексом.',
    },
    hba1c: {
      description: 'Гликированный гемоглобин — средний уровень глюкозы за последние 2-3 месяца.',
      medical: '< 5.7%',
      nutritional: '< 5.5%',
      tips: 'Снижение HbA1c на 1% уменьшает риск микрососудистых осложнений на 37%.',
    },
    insulin: {
      description: 'Уровень инсулина натощак — маркер инсулинорезистентности.',
      medical: '2–17 мкМЕ/мл',
      nutritional: '5–12 мкМЕ/мл',
    },
    homa: {
      description: 'HOMA-IR — индекс инсулинорезистентности, рассчитываемый по уровню глюкозы и инсулина натощак.',
      medical: '< 2.5',
      nutritional: '< 1.8',
    },
    cholesterol: {
      description: 'Общий холестерин — сумма всех фракций липопротеинов в крови.',
      medical: '< 5.0 ммоль/л',
      nutritional: '< 4.5 ммоль/л',
    },
    ldl: {
      description: 'Липопротеины низкой плотности — «плохой» холестерин, способствующий атеросклерозу.',
      medical: '< 3.0 ммоль/л',
      nutritional: '< 2.6 ммоль/л',
      tips: 'Снижение ЛПНП на 1 ммоль/л уменьшает риск инфаркта на 25%.',
    },
    hdl: {
      description: 'Липопротеины высокой плотности — «хороший» холестерин, защищающий сосуды.',
      medical: '> 1.0 ммоль/л (муж) / > 1.3 ммоль/л (жен)',
      nutritional: '> 1.2 ммоль/л (муж) / > 1.4 ммоль/л (жен)',
    },
    triglycerides: {
      description: 'Триглицериды — основной источник энергии, избыток указывает на метаболические нарушения.',
      medical: '< 1.7 ммоль/л',
      nutritional: '< 1.5 ммоль/л',
    },
    sbp: {
      description: 'Систолическое артериальное давление — давление в артериях в момент сокращения сердца.',
      medical: '< 130 мм рт.ст.',
      nutritional: '< 120 мм рт.ст.',
      tips: 'Снижение САД на 10 мм рт.ст. уменьшает риск инсульта на 30%.',
    },
    dbp: {
      description: 'Диастолическое артериальное давление — давление в артериях в момент расслабления сердца.',
      medical: '< 85 мм рт.ст.',
      nutritional: '< 80 мм рт.ст.',
    },
    heartrate: {
      description: 'Частота сердечных сокращений в покое — маркер кардиореспираторной выносливости.',
      medical: '60–100 уд/мин',
      nutritional: '55–80 уд/мин',
      tips: 'Регулярные аэробные нагрузки снижают ЧСС в покое, улучшая экономичность работы сердца.',
    },
    vitd: {
      description: 'Витамин D (25-гидроксикальциферол) — жирорастворимый витамин, критически важный для иммунитета и костей.',
      medical: '30–100 нг/мл',
      nutritional: '40–80 нг/мл',
      tips: 'Оптимальный уровень витамина D снижает риск острых респираторных инфекций на 50%.',
    },
    ferritin: {
      description: 'Ферритин — белок, отражающий запасы железа в организме.',
      medical: '30–200 нг/мл',
      nutritional: '50–150 нг/мл',
    },
    hemoglobin: {
      description: 'Гемоглобин — белок эритроцитов, отвечающий за транспорт кислорода.',
      medical: '130–160 г/л (муж) / 120–140 г/л (жен)',
      nutritional: '135–155 г/л (муж) / 125–145 г/л (жен)',
    },
    cortisol: {
      description: 'Кортизол — главный гормон стресса, вырабатываемый корой надпочечников.',
      medical: '5–25 мкг/дл (утром)',
      nutritional: '5–20 мкг/дл (утром)',
      tips: 'Хронически повышенный кортизол нарушает сон, иммунитет и когнитивные функции.',
    },
    tsh: {
      description: 'Тиреотропный гормон — основной регулятор функции щитовидной железы.',
      medical: '0.4–4.0 мМЕ/л',
      nutritional: '0.5–2.5 мМЕ/л',
    },
    t4: {
      description: 'Свободный тироксин (Т4) — основной гормон щитовидной железы.',
      medical: '0.8–1.8 нг/дл',
      nutritional: '1.0–1.6 нг/дл',
    },
    crp: {
      description: 'С-реактивный белок — маркер воспаления в организме.',
      medical: '< 5 мг/л',
      nutritional: '< 1 мг/л',
      tips: 'Высокочувствительный СРБ > 2 мг/л указывает на повышенный сердечно-сосудистый риск.',
    },
    homocysteine: {
      description: 'Гомоцистеин — аминокислота, избыток которой повреждает сосуды.',
      medical: '5–15 мкмоль/л',
      nutritional: '7–10 мкмоль/л',
    },
    alt: {
      description: 'Аланинаминотрансфераза — маркер функции печени.',
      medical: '< 40 Ед/л',
      nutritional: '< 30 Ед/л',
    },
    ast: {
      description: 'Аспартатаминотрансфераза — маркер функции печени и сердца.',
      medical: '< 40 Ед/л',
      nutritional: '< 30 Ед/л',
    },
    creatinine: {
      description: 'Креатинин — показатель функции почек.',
      medical: '60–110 мкмоль/л (муж) / 45–90 мкмоль/л (жен)',
      nutritional: '70–100 мкмоль/л (муж) / 50–85 мкмоль/л (жен)',
    },
    egfr: {
      description: 'Расчетная скорость клубочковой фильтрации — интегральный показатель функции почек.',
      medical: '> 90 мл/мин/1.73м²',
      nutritional: '> 90 мл/мин/1.73м²',
    },
    bilirubin: {
      description: 'Билирубин — продукт распада гемоглобина, маркер функции печени.',
      medical: '< 21 мкмоль/л',
      nutritional: '< 17 мкмоль/л',
    },
    albumin: {
      description: 'Альбумин — основной белок плазмы крови, маркер нутритивного статуса.',
      medical: '35–50 г/л',
      nutritional: '38–48 г/л',
    },
    sleep_hours: {
      description: 'Средняя продолжительность сна за ночь.',
      medical: '7–9 часов',
      nutritional: '7.5–8.5 часов',
      tips: 'Регулярный сон 7-9 часов снижает риск ожирения на 30% и диабета 2 типа на 40%.',
    },
    sleep_quality: {
      description: 'Субъективная оценка качества сна по шкале 1-10.',
      medical: '≥ 7/10',
      nutritional: '≥ 8/10',
    },
    stress: {
      description: 'Субъективная оценка уровня стресса по шкале 1-10.',
      medical: '≤ 4/10',
      nutritional: '≤ 3/10',
      tips: 'Хронический стресс (≥ 7/10) связан с 50% повышением риска сердечно-сосудистых заболеваний.',
    },
    anxiety: {
      description: 'Уровень тревожности — субъективная оценка эмоционального состояния.',
      medical: '≤ 4/10',
      nutritional: '≤ 3/10',
    },
    water: {
      description: 'Среднесуточное потребление чистой воды.',
      medical: '1.5–2.5 л',
      nutritional: '30 мл/кг массы тела',
      tips: 'Недостаточное потребление воды снижает когнитивные функции и физическую работоспособность.',
    },
    steps: {
      description: 'Среднесуточное количество шагов — маркер общей физической активности.',
      medical: '≥ 5000 шагов',
      nutritional: '≥ 8000 шагов',
      tips: 'Увеличение шагов до 10000 в день снижает смертность от всех причин на 31%.',
    },
    vo2max: {
      description: 'Максимальное потребление кислорода — показатель аэробной выносливости.',
      medical: '> 30 мл/кг/мин',
      nutritional: '> 40 мл/кг/мин',
    },
    inflammation: {
      description: 'Интегральный показатель воспалительной активности в организме.',
      medical: 'Низкий',
      nutritional: 'Низкий',
    },
    rpp: {
      description: 'Расстройство пищевого поведения — комплексное нарушение пищевого поведения и эмоционального состояния.',
      medical: 'Требуется консультация специалиста при любых признаках',
      nutritional: 'Нормализация пищевого поведения является приоритетом',
      tips: 'При первых признаках РПП рекомендуется обратиться к психотерапевту или психиатру, специализирующемуся на пищевых расстройствах.',
    },
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
      schedule: entry.schedule || null,
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

  const getDaysForIntervention = (regularity, startDay = 0, schedule = null) => {
    const days = [];
    if (schedule && schedule.days && schedule.days.length > 0) {
      for (let d = startDay; d <= 30; d++) {
        if (schedule.days.includes(d % 7)) days.push(d);
      }
    } else {
      switch (regularity) {
        case 'D': for (let d = startDay; d <= 30; d++) days.push(d); break;
        case 'W': for (let d = startDay; d <= 30; d += 7) days.push(d); break;
        case 'M': for (let d = startDay; d <= 30; d += 30) days.push(d); break;
        case 'once': default: days.push(startDay); break;
      }
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
      const days = getDaysForIntervention(intervention.regularity, 0, intervention.schedule);
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
        const days = getDaysForIntervention(intervention.regularity, 0, intervention.schedule);
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

  const removeIntervention = (code) => {
    setTimelineInterventions(prev => prev.filter(i => i.code !== code));
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
    'ANNA_28_55': { profile_id: 'ANNA_28_55', name: 'Анна', photo: '03_Natalia_42_salad.png', demographics: { sex: 'female', age: 28, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 58, height_cm: 168, bmi: 20.2, waist_cm: 72 }, vitals: { systolic_bp_mmhg: 105, diastolic_bp_mmhg: 68, resting_hr_bpm: 64, hrv_ms: 72, spo2_percent: 98 }, labs: { glucose_mg_dl: 88, total_cholesterol_mg_dl: 175, hdl_mg_dl: 55, ldl_mg_dl: 100, triglycerides_mg_dl: 120, hba1c_percent: 5.2, crp_mg_l: 0.8, vitamin_d: 32, ferritin: 65, tsh: 2.1 }, lifestyle: { sleep_hours: 7.5, stress_level_0_10: 3, daily_steps: 8200, water_l_day: 1.8, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-5/нед', exercise_type: 'бег', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 840, health_risk_score: 18, risk_level: 'low' } },
    'MIKHAIL_42_96': { profile_id: 'MIKHAIL_42_96', name: 'Михаил', photo: '10_Alex_48_soup.png', demographics: { sex: 'male', age: 42, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 96, height_cm: 182, bmi: 31.2, waist_cm: 104 }, vitals: { systolic_bp_mmhg: 142, diastolic_bp_mmhg: 91, resting_hr_bpm: 78, hrv_ms: 38, spo2_percent: 96 }, labs: { glucose_mg_dl: 112, total_cholesterol_mg_dl: 245, hdl_mg_dl: 38, ldl_mg_dl: 160, triglycerides_mg_dl: 210, hba1c_percent: 5.9, crp_mg_l: 3.2, vitamin_d: 18, ferritin: 140, tsh: 3.8 }, lifestyle: { sleep_hours: 6, stress_level_0_10: 7, daily_steps: 4200, water_l_day: 1.2, smoking: 'Курит', alcohol: 'Регулярно', physical_activity: '0-1/нед', diet: 'смешанная' }, genetics: { apoe: 'e3/e4', mthfr: 'Гетерозигота', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: ['статины'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'no', family_history: 'ИБС у отца' }, digital_twin_scores: { current_stars: 210, health_risk_score: 52, risk_level: 'high' } },
    'ELENA_34_64': { profile_id: 'ELENA_34_64', name: 'Елена', photo: '16_Anastasia_37_street.png', demographics: { sex: 'female', age: 34, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 64, height_cm: 170, bmi: 22.1, waist_cm: 76 }, vitals: { systolic_bp_mmhg: 118, diastolic_bp_mmhg: 76, resting_hr_bpm: 70, hrv_ms: 55, spo2_percent: 98 }, labs: { glucose_mg_dl: 95, total_cholesterol_mg_dl: 200, hdl_mg_dl: 52, ldl_mg_dl: 120, triglycerides_mg_dl: 140, hba1c_percent: 5.4, crp_mg_l: 1.2, vitamin_d: 24, ferritin: 80, tsh: 2.8 }, lifestyle: { sleep_hours: 7, stress_level_0_10: 5, daily_steps: 6500, water_l_day: 1.5, smoking: 'Нет', alcohol: 'По праздникам', physical_activity: '2-3/нед', exercise_type: 'йога', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 650, health_risk_score: 28, risk_level: 'medium' } },
    'DMITRY_57_88': { profile_id: 'DMITRY_57_88', name: 'Дмитрий', photo: '05_Дмитрий_55_notepad.png', demographics: { sex: 'male', age: 57, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 97, height_cm: 184, bmi: 28.7, waist_cm: 104 }, vitals: { systolic_bp_mmhg: 135, diastolic_bp_mmhg: 88, resting_hr_bpm: 72, hrv_ms: 35, spo2_percent: 96 }, labs: { glucose_mg_dl: 105, total_cholesterol_mg_dl: 220, hdl_mg_dl: 42, ldl_mg_dl: 140, triglycerides_mg_dl: 180, hba1c_percent: 5.7, crp_mg_l: 2.1, vitamin_d: 20, ferritin: 130, tsh: 2.8 }, lifestyle: { sleep_hours: 6.5, stress_level_0_10: 6, daily_steps: 5000, water_l_day: 1.4, smoking: 'Бросил', alcohol: '1-2/нед', physical_activity: '1-2/нед', diet: 'смешанная' }, genetics: { apoe: 'e3/e3', mthfr: 'Гетерозигота', lactase_persistence: 'Нет', brca_status: 'Neg' }, medical_history: { current_medications: ['гипотензивные'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'no', family_history: 'Гипертония' }, digital_twin_scores: { current_stars: 450, health_risk_score: 42, risk_level: 'medium' } },
    'DMITRY_57_110KG': { profile_id: 'DMITRY_57_110KG', name: 'Дмитрий (110)', photo: '05_Дмитрий_55_notepad.png', demographics: { sex: 'male', age: 57, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 110, height_cm: 178, bmi: 34.7, waist_cm: 110 }, vitals: { systolic_bp_mmhg: 145, diastolic_bp_mmhg: 92, resting_hr_bpm: 78, hrv_ms: 35, spo2_percent: 96 }, labs: { glucose_mg_dl: 110, total_cholesterol_mg_dl: 240, hdl_mg_dl: 38, ldl_mg_dl: 155, triglycerides_mg_dl: 210, hba1c_percent: 6.0, crp_mg_l: 3.5, vitamin_d: 20, ferritin: 130, tsh: 2.8 }, lifestyle: { sleep_hours: 6.5, stress_level_0_10: 7, daily_steps: 3500, water_l_day: 1.4, smoking: 'Бросил', alcohol: '1-2/нед', physical_activity: '1-2/нед', diet: 'смешанная' }, genetics: { apoe: 'e3/e3', mthfr: 'Гетерозигота', lactase_persistence: 'Нет', brca_status: 'Neg' }, medical_history: { current_medications: ['гипотензивные'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'no', family_history: 'Гипертония' }, digital_twin_scores: { current_stars: 350, health_risk_score: 52, risk_level: 'high' } },
    'IVAN_13_48': { profile_id: 'IVAN_13_48', name: 'Иван', photo: '07_Ivan_13_chips.png', demographics: { sex: 'male', age: 13, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 48, height_cm: 158, bmi: 19.2, waist_cm: 65 }, vitals: { systolic_bp_mmhg: 108, diastolic_bp_mmhg: 68, resting_hr_bpm: 78, hrv_ms: 58, spo2_percent: 99 }, labs: { glucose_mg_dl: 82, total_cholesterol_mg_dl: 140, hdl_mg_dl: 48, ldl_mg_dl: 80, triglycerides_mg_dl: 90, hba1c_percent: 4.8, crp_mg_l: 0.5, vitamin_d: 30, ferritin: 50, tsh: 1.9 }, lifestyle: { sleep_hours: 9, stress_level_0_10: 2, daily_steps: 10000, water_l_day: 1.0, smoking: 'Нет', alcohol: 'Нет', physical_activity: '5-7/нед', diet: 'домашняя' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 950, health_risk_score: 10, risk_level: 'low' } },
    'EKATERINA_39_60': { profile_id: 'EKATERINA_39_60', name: 'Екатерина', photo: '14_Ekaterina_39_wearable.png', demographics: { sex: 'female', age: 39, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 60, height_cm: 170, bmi: 20.8, waist_cm: 72 }, vitals: { systolic_bp_mmhg: 115, diastolic_bp_mmhg: 74, resting_hr_bpm: 66, hrv_ms: 58, spo2_percent: 98 }, labs: { glucose_mg_dl: 90, total_cholesterol_mg_dl: 180, hdl_mg_dl: 58, ldl_mg_dl: 105, triglycerides_mg_dl: 115, hba1c_percent: 5.1, crp_mg_l: 0.9, vitamin_d: 30, ferritin: 70, tsh: 2.2 }, lifestyle: { sleep_hours: 7.8, stress_level_0_10: 4, daily_steps: 8000, water_l_day: 1.7, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-4/нед', exercise_type: 'бег', diet: 'средиземноморская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 780, health_risk_score: 22, risk_level: 'low' } },
    'STAS_35_82': { profile_id: 'STAS_35_82', name: 'Стас', photo: '19_Stas_35_dog_bike.png', demographics: { sex: 'male', age: 35, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 82, height_cm: 178, bmi: 24.8, waist_cm: 84 }, vitals: { systolic_bp_mmhg: 125, diastolic_bp_mmhg: 80, resting_hr_bpm: 68, hrv_ms: 50, spo2_percent: 98 }, labs: { glucose_mg_dl: 92, total_cholesterol_mg_dl: 190, hdl_mg_dl: 48, ldl_mg_dl: 115, triglycerides_mg_dl: 135, hba1c_percent: 5.3, crp_mg_l: 1.0, vitamin_d: 28, ferritin: 90, tsh: 2.4 }, lifestyle: { sleep_hours: 7.2, stress_level_0_10: 4, daily_steps: 7500, water_l_day: 1.8, smoking: 'Нет', alcohol: 'Редко', physical_activity: '3-4/нед', exercise_type: 'велосипед', diet: 'сбалансированная' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 680, health_risk_score: 26, risk_level: 'low' } },
    'VARIA_30_57': { profile_id: 'VARIA_30_57', name: 'Варя', photo: '22_Varya_30_yoga.png', demographics: { sex: 'female', age: 30, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 57, height_cm: 166, bmi: 20.2, waist_cm: 70 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70, resting_hr_bpm: 65, hrv_ms: 62, spo2_percent: 99 }, labs: { glucose_mg_dl: 86, total_cholesterol_mg_dl: 165, hdl_mg_dl: 62, ldl_mg_dl: 95, triglycerides_mg_dl: 100, hba1c_percent: 5.0, crp_mg_l: 0.6, vitamin_d: 35, ferritin: 60, tsh: 2.0 }, lifestyle: { sleep_hours: 8, stress_level_0_10: 3, daily_steps: 9000, water_l_day: 2.0, smoking: 'Нет', alcohol: 'Редко', physical_activity: '4-5/нед', exercise_type: 'йога', diet: 'вегетарианская' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 900, health_risk_score: 14, risk_level: 'low' } },
    'KATYA_29_59': { profile_id: 'KATYA_29_59', name: 'Катя', photo: '25_Katya_29_office.png', demographics: { sex: 'female', age: 29, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 59, height_cm: 167, bmi: 20.7, waist_cm: 71 }, vitals: { systolic_bp_mmhg: 110, diastolic_bp_mmhg: 70, resting_hr_bpm: 66, hrv_ms: 60, spo2_percent: 99 }, labs: { glucose_mg_dl: 88, total_cholesterol_mg_dl: 170, hdl_mg_dl: 60, ldl_mg_dl: 98, triglycerides_mg_dl: 105, hba1c_percent: 5.1, crp_mg_l: 0.7, vitamin_d: 32, ferritin: 62, tsh: 2.1 }, lifestyle: { sleep_hours: 7.5, stress_level_0_10: 4, daily_steps: 7000, water_l_day: 1.6, smoking: 'Нет', alcohol: 'Редко', physical_activity: '2-3/нед', exercise_type: 'фитнес', diet: 'сбалансированная' }, genetics: { apoe: 'e3/e3', mthfr: 'Нет', lactase_persistence: 'Да', brca_status: 'Neg' }, medical_history: { current_medications: [], allergies: 'Нет', cardiovascular_disease: 'no', diabetes: 'no', family_history: 'Нет' }, digital_twin_scores: { current_stars: 640, health_risk_score: 24, risk_level: 'low' } },
    'GALINA_75_68': { profile_id: 'GALINA_75_68', name: 'Галина', photo: '08_Galina_75_Vika_9_balcony.png', demographics: { sex: 'female', age: 75, ethnicity_or_background: 'европеоидная' }, anthropometrics: { weight_kg: 68, height_cm: 160, bmi: 26.6, waist_cm: 86 }, vitals: { systolic_bp_mmhg: 148, diastolic_bp_mmhg: 88, resting_hr_bpm: 74, hrv_ms: 28, spo2_percent: 94 }, labs: { glucose_mg_dl: 110, total_cholesterol_mg_dl: 235, hdl_mg_dl: 40, ldl_mg_dl: 155, triglycerides_mg_dl: 195, hba1c_percent: 6.0, crp_mg_l: 3.5, vitamin_d: 14, ferritin: 105, tsh: 3.5 }, lifestyle: { sleep_hours: 6, stress_level_0_10: 3, daily_steps: 3500, water_l_day: 1.2, smoking: 'Нет', alcohol: 'Нет', physical_activity: '1/нед', diet: 'домашняя' }, genetics: { apoe: 'e3/e4', mthfr: 'Гетерозигота', lactase_persistence: 'Нет', brca_status: 'Neg' }, medical_history: { current_medications: ['гипотензивные', 'статины'], allergies: 'Нет', cardiovascular_disease: 'yes', diabetes: 'yes', family_history: 'ИБС, СД 2 типа' }, digital_twin_scores: { current_stars: 320, health_risk_score: 55, risk_level: 'high' } },
  };

  useEffect(() => {
    if (!profileId) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const cached = fallbackProfiles[profileId];
    fetch(`/api/profiles/${profileId}`)
      .then(res => { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
      .then(data => {
        setProfile(data.profile || null);
        setStars(data.profile?.digital_twin_scores?.current_stars || 0);
        setParamHistory(data.profile?.history || {});
        const profileRpp = data.profile?.lifestyle?.rpp;
        if (profileRpp) {
          setRppFormData({
            types: profileRpp.types || [],
            frequency: profileRpp.frequency || 'Ежедневно',
            triggers: profileRpp.triggers || '',
            notes: profileRpp.notes || '',
          });
        }
        setLoading(false);
      })
      .catch(() => {
        if (cached) {
          setProfile(cached);
          setStars(cached.digital_twin_scores?.current_stars || 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    // Reset per-profile state on change
    setProfileOverrides({});
    setParamHistory({});
    setHasUnsavedEdits(false);
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
      const newDay = Math.max(0, Math.min(30, Math.round(percent * 30)));
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
    const dropDay = Math.max(0, Math.min(30, Math.round(percent * 30)));

    setTimelineInterventions(prev => {
      const filtered = prev.filter(i => i.code !== intervention.code);
      const days = getDaysForIntervention(intervention.regularity, dropDay, intervention.schedule);
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
    const newDay = Math.max(0, Math.min(30, Math.round(percent * 30)));
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
        if (next > 30) {
          clearInterval(simulationRef.current);
          setIsSimulating(false);
          setIsPlaying(false);
          return 30;
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
    const regularity = catData?.regularity || last.regularity || 'D';
    const defaultDeadlines = { D: '23:59', W: 'ПН 23:59', M: '1-е число', Y: '31.12 23:59', P: '—' };
    const names = { D: 'ежедневно', W: 'еженедельно', M: 'ежемесячно', Y: 'ежегодно', P: 'по требованию' };
    const msg = {
      id: `${last.day}_${last.code}`,
      type: 'intervention',
      day: last.day,
      code: last.code,
      name: last.name,
      state: last.state,
      category: catData?.category || last.category,
      regularity,
      deadline: defaultDeadlines[regularity] || '23:59',
      done: false,
      skipped: false,
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

  const sampleChatTasks = [
    { name: 'Пить 2л воды', code: 'TASK_01', category: 'food', points: 10 },
    { name: 'Прогулка 30 мин', code: 'TASK_02', category: 'physical', points: 15 },
    { name: 'Лечь до 23:00', code: 'TASK_03', category: 'sleep', points: 20 },
    { name: 'Медитация 10 мин', code: 'TASK_04', category: 'mental', points: 10 },
    { name: 'Записать приемы пищи', code: 'TASK_05', category: 'food', points: 5 },
    { name: 'Измерить пульс', code: 'TASK_06', category: 'medical', points: 15 },
  ];

  const handleChatSend = () => {
    const text = chatInputRef.current ? chatInputRef.current.value.trim() : '';
    if (!text) return;
    if (chatInputRef.current) chatInputRef.current.value = '';
    if (chatMode === 'gigachat') {
      setGigachatMessages(prev => [...prev, { id: Date.now(), text, user: true, time: new Date().toLocaleTimeString() }]);
      setGigachatLoading(true);
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, profile: profileId }),
      }).then(r => r.json()).then(data => {
        if (data.reply) {
          setGigachatMessages(prev => [...prev, { id: Date.now(), text: data.reply, user: false, time: new Date().toLocaleTimeString() }]);
        }
      }).catch(() => {
        setGigachatMessages(prev => [...prev, { id: Date.now(), text: 'Ошибка соединения с GigaChat', user: false, time: new Date().toLocaleTimeString() }]);
      }).finally(() => setGigachatLoading(false));
      return;
    }
    setChatMessages(prev => [...prev, {
      id: `chat_${Date.now()}`,
      day: simulationDay,
      text,
      user: true,
      time: new Date().toLocaleTimeString(),
    }]);
    const taskKeywords = /задач|реком|совет|предлож|делать|план|тренировк|упражнен/i;
    if (taskKeywords.test(text)) {
      setTimeout(() => {
        sampleChatTasks.forEach((t, i) => {
          setChatMessages(prev => [...prev, {
            id: `chat_task_${Date.now()}_${i}`,
            type: 'intervention',
            day: simulationDay,
            code: t.code,
            name: t.name,
            category: t.category,
            regularity: 'D',
            deadline: '23:59',
            done: false,
            skipped: false,
            time: new Date().toLocaleTimeString(),
          }]);
        });
      }, 500);
    }
  };

  const protoReplies = [
    'На основе вашего профиля рекомендую увеличить потребление воды до 2.5 л/день и добавить 30 мин ходьбы ежедневно.',
    'Ваш уровень стресса 7/10 — попробуйте дыхательную практику 4-7-8 перед сном. Это улучшит HRV на 15-20% за 2 недели.',
    'По данным дневника, ваш средний белок — 45г/день. Рекомендуемая норма — 1.2 г/кг веса (≈70г/день). Добавьте яйца, рыбу или тофу.',
    'Ваш ИМТ 27.8 — зона избыточной массы. Целевой ИМТ 24.0. Снижение на 0.3/нед — здоровый темп.',
    'Отличный прогресс! 5 дней подряд — это формирует привычку. Через 21 день войдёте в автоматический режим.',
  ];

  const handleChatProtoSend = () => {
    const text = chatProtoInput.trim();
    if (!text) return;
    setChatProtoInput('');
    setChatProtoMsgs(prev => [...prev, { id: Date.now(), text, user: true, time: new Date().toLocaleTimeString() }]);
    setChatProtoLoading(true);
    setTimeout(() => {
      const reply = protoReplies[Math.floor(Math.random() * protoReplies.length)];
      setChatProtoMsgs(prev => [...prev, { id: Date.now() + 1, text: reply, user: false, time: new Date().toLocaleTimeString() }]);
      setChatProtoLoading(false);
    }, 800 + Math.random() * 600);
  };

  useEffect(() => {
    if (chatProtoEndRef.current) {
      chatProtoEndRef.current.scrollTop = chatProtoEndRef.current.scrollHeight;
    }
  }, [chatProtoMsgs, chatProtoLoading]);

  useEffect(() => {
    if (chatActiveScreen?.num === 5) {
      setChatProtoMsgs([
        { id: 's0', type: 'system', text: 'Добро пожаловать в **Healora AI Ассистент**!\n\nЯ — ваш персональный цифровой ассистент здоровья на базе GigaChat. Вот что я умею:\n\n• 🧬 **Анализировать** — оцениваю 50+ параметров вашего цифрового двойника\n• 🎯 **Рекомендовать** — подбираю протоколы питания, тренировок и образа жизни\n• 📋 **Планировать** — помогаю составить расписание и отслеживать прогресс\n• ❓ **Отвечать** — консультирую по вопросам здоровья, нутрициологии и долголетия\n• 📊 **Обучать** — провожу опросы и викторины для повышения грамотности в области здоровья\n\n_Задайте любой вопрос или выберите один из примеров ниже!_', time: '09:00' },
        { id: 's1', type: 'tip', text: '💡 **Совет дня**\n\nДобавьте в рацион **ферментированные продукты** (кефир, квашеную капусту, комбучу). Они богаты пробиотиками, которые улучшают микробиом кишечника — а это напрямую влияет на иммунитет, настроение и усвоение нутриентов.\n\n_Источник: Nature Reviews Gastroenterology & Hepatology, 2023_', time: '09:05' },
        { id: 's2', type: 'task', text: '📋 **Задание**\nЗаполните дневник питания за сегодня', code: 'EAT_01', deadline: '23:59', done: false, category: 'food' },
        { id: 's3', type: 'task', text: '🚶 **Задание**\nПройдите 8000 шагов', code: 'PHY_01', deadline: '22:00', done: false, category: 'physical' },
        { id: 's4', type: 'poll', text: '🔬 **Мини-опрос**\n\nКакой фактор, по вашему мнению, наиболее важен для долгосрочного здоровья?', options: ['🏋️ Физическая активность', '🥗 Питание', '😴 Качество сна', '🧠 Психоэмоциональное состояние'], voted: false, selectedOption: null, time: '09:10' },
        { id: 's5', type: 'user', text: 'Расскажи подробнее о моём профиле', time: '09:15' },
        { id: 's6', type: 'bot', text: 'Вот сводка по вашему цифровому двойнику:\n\n**Антропометрия:** рост 170 см, вес 64 кг, ИМТ 22.1 ✅\n**Витальные:** АД 118/76 ✅, ЧСС 70 уд/мин ✅, SpO₂ 98% ✅\n**Лаборатории:** глюкоза 95 мг/дл ✅, HbA1c 5.4% ✅, холестерин 200 мг/дл ⚠️\n**Образ жизни:** сон 7 ч ⚠️, стресс 5/10 🟡, шаги 6500 🟡\n\nРекомендую:\n1. Увеличить шаги до 10000/день\n2. Добавить 30 мин кардио 3 раза в неделю\n3. Пить 2+ литра воды', time: '09:16' },
      ]);
    } else if (!chatActiveScreen) {
      setChatProtoMsgs([]);
    }
  }, [chatActiveScreen]);

  const emojiSvgs = {
    '🧬': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6b21c8" stroke-width="2" stroke-linecap="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4 6a8 8 0 0 1 16 0"/><path d="M4 18a8 8 0 0 0 16 0"/><path d="M5 8.4A9 9 0 0 0 5 15.6"/><path d="M19 8.4a9 9 0 0 1 0 7.2"/></svg>',
    '🎯': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#e53935" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
    '📋': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#5c6bc0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h3v18H5V3h3"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>',
    '❓': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff7043" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    '📊': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" stroke-width="2" stroke-linecap="round"><line x1="4" y1="20" x2="20" y2="20"/><line x1="6" y1="16" x2="6" y2="10"/><line x1="12" y1="16" x2="12" y2="6"/><line x1="18" y1="16" x2="18" y2="2"/></svg>',
    '💡': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffb300" stroke-width="2" stroke-linecap="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 0 0 6 12c0 4 3 5 3 5h6s1-.37 1.09-1z"/></svg>',
    '🚶': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="M13 17v5"/><path d="M11 12l-3 5h5l2 5"/><path d="M8 10l-2 4"/></svg>',
    '🔬': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0288d1" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="6" y1="10" x2="14" y2="10"/><line x1="10" y1="6" x2="10" y2="14"/></svg>',
    '🏋️': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff7043" stroke-width="2" stroke-linecap="round"><path d="M6 8l-2 2v4l2 2"/><path d="M18 8l2 2v4l-2 2"/><rect x="6" y="5" width="12" height="14" rx="2"/></svg>',
    '🥗': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" stroke-width="2" stroke-linecap="round"><path d="M6 13c0 5 3 8 6 8s6-3 6-8"/><path d="M3 13h18"/><path d="M12 3v10"/><path d="M8 3l4 4 4-4"/></svg>',
    '😴': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#5c6bc0" stroke-width="2" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M20 12a8 8 0 0 1-8 8"/><line x1="8" y1="8" x2="11" y2="8"/><line x1="13" y1="8" x2="14" y2="8"/><line x1="8" y1="13" x2="16" y2="13"/></svg>',
    '🧠': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ab47bc" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/><path d="M9 12h6"/><path d="M9 8h6"/></svg>',
    '⚠️': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff6f00" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    '✅': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="#2e7d32" stroke="none"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '🟡': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="#ffb300" stroke="none"/></svg>',
    '⏰': '<svg class="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#c62828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  };

  const renderMsgText = (text) => {
    let html = text.replace(/\n/g, '<br/>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    for (const [emoji, svg] of Object.entries(emojiSvgs)) {
      html = html.replaceAll(emoji, svg);
    }
    return html;
  };

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

  // Load saved diary data when diary opens or day changes
  useEffect(() => {
    if (!showDiary || !profileId) return;
    const day = diaryDay ?? simulationDay;
    fetch(`/api/diary/${profileId}/${day}`)
      .then(r => { if (!r.ok) throw new Error('No diary'); return r.json(); })
      .then(data => {
        const merged = defaultDiaryData(day);
        if (data.meals) merged.meals = data.meals.map(saved => {
          const def = merged.meals.find(m => m.type === saved.type);
          return { ...def, ...saved, ndi: saved.ndi ? Number(saved.ndi) : null };
        });
        if (data.water_ml != null) merged.waterMl = data.water_ml;
        if (data.mood) merged.mood = { ...merged.mood, ...data.mood };
        if (data.voice_note) merged.voiceNote = data.voice_note;
        if (data.comment) merged.comment = data.comment;
        setDiaryData(merged);
      })
      .catch(() => { setDiaryData(defaultDiaryData(day)); });
  }, [showDiary, diaryDay, profileId]);

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
        { id: '01_4', name: 'Вес', start: profile.anthropometrics?.weight_kg, current: profile.anthropometrics?.weight_kg, target: 88, unit: 'кг' },
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
        { id: '02_6', name: 'Глюкоза', start: profile.labs?.glucose_mg_dl, current: profile.labs?.glucose_mg_dl, target: 95, unit: 'мг/дл' },
        { id: '02_8', name: 'Общий холестерин', start: profile.labs?.total_cholesterol_mg_dl, current: profile.labs?.total_cholesterol_mg_dl, target: 200, unit: 'мг/дл' },
      ]
    },
    lifestyle: {
      title: 'Образ жизни',
      color: '#388e3c',
      attributes: [
        { id: '03_5', name: 'Сон', start: profile.lifestyle?.sleep_hours, current: profile.lifestyle?.sleep_hours, target: 7.5, unit: 'часов' },
        { id: '03_6', name: 'Стресс', start: profile.lifestyle?.stress_level_0_10, current: profile.lifestyle?.stress_level_0_10, target: 3, unit: '/10' },
        { id: '03_8', name: 'Шаги', start: profile.lifestyle?.daily_steps, current: profile.lifestyle?.daily_steps, target: 8000, unit: '/день' },
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

  const startEdit = (sectionKey, attrId, currentVal) => {
    setEditingField(sectionKey + '_' + attrId);
    setEditingValue(currentVal !== null && currentVal !== undefined ? String(currentVal) : '');
  };

  const saveEdit = (sectionKey, attrId) => {
    setEditingField(null);
    const attr = attributeCatalog[sectionKey]?.attributes.find(a => a.id === attrId);
    if (!attr) return;
    const numVal = parseFloat(editingValue);
    const val = isNaN(numVal) ? editingValue : numVal;
    const now = new Date().toISOString();
    const newOverrides = { ...profileOverrides, [attrId]: val };
    const newHistory = { ...paramHistory };
    if (!newHistory[attrId]) newHistory[attrId] = [];
    newHistory[attrId] = [...newHistory[attrId], { value: val, timestamp: now }];
    if (attrId === 'weight' || attrId === 'height') {
      const w = newOverrides.weight ?? profile?.anthropometrics?.weight_kg;
      const h = newOverrides.height ?? profile?.anthropometrics?.height_cm;
      if (w && h && h > 0) {
        const bmiVal = Math.round((w / ((h / 100) ** 2)) * 10) / 10;
        newOverrides.bmi = bmiVal;
        if (!newHistory.bmi) newHistory.bmi = [];
        newHistory.bmi = [...newHistory.bmi, { value: bmiVal, timestamp: now }];
      }
    }
    setProfileOverrides(newOverrides);
    setParamHistory(newHistory);
    setHasUnsavedEdits(true);
  };

  const formatAttrValue = (val) => {
    if (val === null || val === undefined || val === '') return '—';
    if (typeof val === 'boolean') return val ? 'Да' : 'Нет';
    return val;
  };

  const getAttrCurrent = (attr) => {
    if (attr.id in profileOverrides) return profileOverrides[attr.id];
    return attr.current;
  };

  const parseVoiceTranscript = (text, sectionKey) => {
    if (!text || !sectionKey) return [];
    const section = attributeCatalog[sectionKey];
    if (!section) return [];

    const results = [];

    const nameMap = {
      age: ['возраст', 'лет'],
      sex: ['пол', 'gender'],
      height: ['рост', 'высота', 'длина тела'],
      weight: ['вес', 'масса', 'вешу'],
      waist: ['талия', 'обхват талии', 'окружность талии'],
      bmi: ['ибт', 'имт', 'индекс массы тела'],
      ethnicity: ['этническая', 'национальность', 'раса'],
      bp_syst: ['ад систолическое', 'систолическое', 'верхнее'],
      bp_diast: ['ад диастолическое', 'диастолическое', 'нижнее'],
      hr: ['пульс', 'чсс', 'сердцебиение', 'частота пульса'],
      hrv: ['hrv'],
      spo2: ['сатурация', 'spo2', 'кислород', 'насыщение'],
      glucose: ['глюкоза', 'сахар', 'глюкоза крови'],
      hba1c: ['hba1c', 'гликированный', 'гемоглобин'],
      tchol: ['холестерин', 'холестерин общий', 'общий холестерин'],
      hdl: ['лпвп', 'хороший холестерин', 'липопротеины высокой'],
      ldl: ['лпнп', 'плохой холестерин', 'липопротеины низкой'],
      tg: ['триглицериды', 'триглицерид'],
      crp: ['crp', 'срб', 'с-реактивный'],
      vitd: ['витамин d', 'витамин д', 'vitamin d', '25-oh'],
      ferritin: ['ферритин'],
      tsh: ['ттг', 'tsh', 'тиреотропный'],
      sleep: ['сон', 'сплю', 'ночной сон'],
      stress: ['стресс', 'уровень стресса'],
      steps: ['шаги', 'шагов'],
      water: ['вода', 'воды', 'пью воды'],
      smoking: ['курение', 'курю', 'сигареты'],
      alcohol: ['алкоголь', 'алкоголя'],
      exercise_freq: ['тренировки', 'занятия', 'спорт', 'физическая активность'],
      exercise_type: ['тип активности', 'вид спорта', 'активность'],
      diet: ['питание', 'диета', 'рацион'],
      apoe: ['apoe'],
      mthfr: ['mthfr'],
      lactase: ['лактаза', 'lactase'],
      brca: ['brca', 'brca1', 'brca2'],
      medications: ['препараты', 'лекарства', 'медикаменты', 'принимаю'],
      allergies: ['аллергии', 'аллергия', 'аллергические'],
      cv_history: ['ссз', 'сердечно-сосудистые', 'сердце', 'сосуды'],
      dm_history: ['диабет', 'сахарный диабет'],
      family_history: ['онкология', 'рак', 'опухоли'],
    };

    const sectionAttrIds = section.attributes.map(a => a.id);
    const relevantNames = {};
    sectionAttrIds.forEach(id => {
      if (nameMap[id]) relevantNames[id] = nameMap[id];
    });

    const segments = text.split(/[,.;:]+/).map(s => s.trim()).filter(Boolean);

    segments.forEach(seg => {
      const lower = seg.toLowerCase().trim();
      if (!lower) return;

      // Special case: blood pressure "120 на 80" or "120/80"
      if (relevantNames.bp_syst || relevantNames.bp_diast) {
        const bpMatch = lower.match(/(?:ад|давление)\s*[:]?\s*(\d{2,3})\s*(?:\/|на|из|к)\s*(\d{2,3})/i);
        if (bpMatch) {
          const systolic = parseInt(bpMatch[1]);
          const diastolic = parseInt(bpMatch[2]);
          if (systolic > 50 && systolic < 250 && diastolic > 30 && diastolic < 150) {
            if (sectionAttrIds.includes('bp_syst')) results.push({ attrId: 'bp_syst', value: systolic, label: 'АД систолическое', displayValue: `${systolic} мм рт.ст.` });
            if (sectionAttrIds.includes('bp_diast')) results.push({ attrId: 'bp_diast', value: diastolic, label: 'АД диастолическое', displayValue: `${diastolic} мм рт.ст.` });
          }
          return;
        }
      }

      for (const [attrId, keywords] of Object.entries(relevantNames)) {
        const attrDef = section.attributes.find(a => a.id === attrId);
        if (!attrDef) continue;

        const foundKeyword = keywords.find(k => lower.includes(k));
        if (!foundKeyword) continue;

        // Try to extract number value
        const numMatch = lower.match(new RegExp(`${foundKeyword}[\\s:]*([+-]?\\d+(?:[.,]\\d+)?)`, 'i'));
        if (numMatch) {
          const val = parseFloat(numMatch[1].replace(',', '.'));
          const displayUnit = attrDef.unit ? `${val} ${attrDef.unit}` : String(val);
          results.push({ attrId, value: val, label: attrDef.name, displayValue: displayUnit });
          continue;
        }

        // Text value (no number) - capture words after keyword
        const textMatch = lower.match(new RegExp(`${foundKeyword}[\\s:]+(.+)`, 'i'));
        if (textMatch) {
          const val = textMatch[1].trim().replace(/\s+/g, ' ').replace(/[.,;]+$/, '');
          if (val && !/^[+-]?\d+(?:[.,]\d+)?$/.test(val)) {
            results.push({ attrId, value: val, label: attrDef.name, displayValue: val });
          }
        }
      }
    });

    return results;
  };

  const applyVoiceValues = (sectionKey, parsedValues) => {
    const now = new Date().toISOString();
    const newOverrides = { ...profileOverrides };
    const newHistory = { ...paramHistory };

    const voiceAttrIds = new Set(parsedValues.map(p => p.attrId));
    parsedValues.forEach(({ attrId, value }) => {
      newOverrides[attrId] = value;
      if (!newHistory[attrId]) newHistory[attrId] = [];
      newHistory[attrId] = [...newHistory[attrId], { value, timestamp: now }];
    });

    if (voiceAttrIds.has('weight') || voiceAttrIds.has('height')) {
      const w = newOverrides.weight ?? profile?.anthropometrics?.weight_kg;
      const h = newOverrides.height ?? profile?.anthropometrics?.height_cm;
      if (w && h && h > 0) {
        const bmiVal = Math.round((w / ((h / 100) ** 2)) * 10) / 10;
        newOverrides.bmi = bmiVal;
        if (!newHistory.bmi) newHistory.bmi = [];
        newHistory.bmi = [...newHistory.bmi, { value: bmiVal, timestamp: now }];
      }
    }

    setProfileOverrides(newOverrides);
    setParamHistory(newHistory);
    setHasUnsavedEdits(true);
  };

  const saveToServer = async () => {
    if (!profile) return;
    const merged = {
      ...profile,
      anthropometrics: {
        ...profile.anthropometrics,
        weight_kg: profileOverrides.weight ?? profile.anthropometrics?.weight_kg,
        height_cm: profileOverrides.height ?? profile.anthropometrics?.height_cm,
        bmi: profileOverrides.bmi ?? profile.anthropometrics?.bmi,
        waist_cm: profileOverrides.waist ?? profile.anthropometrics?.waist_cm,
      },
      vitals: profile.vitals ? {
        ...profile.vitals,
        systolic_bp_mmhg: profileOverrides.bp_syst ?? profile.vitals.systolic_bp_mmhg,
        diastolic_bp_mmhg: profileOverrides.bp_diast ?? profile.vitals.diastolic_bp_mmhg,
        resting_hr_bpm: profileOverrides.hr ?? profile.vitals.resting_hr_bpm,
        hrv_ms: profileOverrides.hrv ?? profile.vitals.hrv_ms,
        spo2_percent: profileOverrides.spo2 ?? profile.vitals.spo2_percent,
      } : undefined,
      labs: profile.labs ? {
        ...profile.labs,
        glucose_mg_dl: profileOverrides.glucose ?? profile.labs.glucose_mg_dl,
        hba1c_percent: profileOverrides.hba1c ?? profile.labs.hba1c_percent,
        total_cholesterol_mg_dl: profileOverrides.tchol ?? profile.labs.total_cholesterol_mg_dl,
        hdl_mg_dl: profileOverrides.hdl ?? profile.labs.hdl_mg_dl,
        ldl_mg_dl: profileOverrides.ldl ?? profile.labs.ldl_mg_dl,
        triglycerides_mg_dl: profileOverrides.tg ?? profile.labs.triglycerides_mg_dl,
        crp_mg_l: profileOverrides.crp ?? profile.labs.crp_mg_l,
        vitamin_d: profileOverrides.vitd ?? profile.labs.vitamin_d,
        ferritin: profileOverrides.ferritin ?? profile.labs.ferritin,
        tsh: profileOverrides.tsh ?? profile.labs.tsh,
      } : undefined,
      lifestyle: profile.lifestyle ? {
        ...profile.lifestyle,
        sleep_hours: profileOverrides.sleep ?? profile.lifestyle.sleep_hours,
        stress_level_0_10: profileOverrides.stress ?? profile.lifestyle.stress_level_0_10,
        daily_steps: profileOverrides.steps ?? profile.lifestyle.daily_steps,
        water_l_day: profileOverrides.water ?? profile.lifestyle.water_l_day,
        smoking: profileOverrides.smoking ?? profile.lifestyle.smoking,
        alcohol: profileOverrides.alcohol ?? profile.lifestyle.alcohol,
        physical_activity: profileOverrides.exercise_freq ?? profile.lifestyle.physical_activity,
        exercise_type: profileOverrides.exercise_type ?? profile.lifestyle.exercise_type,
        diet: profileOverrides.diet ?? profile.lifestyle.diet,
        rpp: (() => {
          const rppVal = profileOverrides.rpp;
          if (rppVal || rppFormData) {
            return {
              types: rppVal ? rppVal.split(', ').filter(Boolean) : (rppFormData?.types || []),
              frequency: rppFormData?.frequency || 'Ежедневно',
              triggers: rppFormData?.triggers || '',
              notes: rppFormData?.notes || '',
            };
          }
          return profile.lifestyle.rpp || undefined;
        })(),
      } : undefined,
      demographics: profile.demographics ? {
        ...profile.demographics,
        age: profileOverrides.age ?? profile.demographics.age,
        sex: profileOverrides.sex ?? profile.demographics.sex,
        ethnicity_or_background: profileOverrides.ethnicity ?? profile.demographics.ethnicity_or_background,
      } : undefined,
      history: paramHistory,
    };
    try {
      let res = await fetch(`/api/profiles/${profile.profile_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
      if (res.status === 404 || res.status === 405) {
        res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(merged),
        });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setHasUnsavedEdits(false);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Ошибка сохранения: бэкенд недоступен');
    }
  };

  const getVoiceHint = (sectionKey) => {
    const section = attributeCatalog[sectionKey];
    if (!section) return 'Продиктуйте значения параметров.';
    const exampleValues = {
      demographics: { age: '35', sex: 'мужской', height: '175', weight: '70', waist: '80', ethnicity: 'европеоид' },
      vitals: { bp_syst: '120', bp_diast: '80', hr: '72', hrv: '60', spo2: '98' },
      labs: { glucose: '90', hba1c: '5.5', tchol: '180', hdl: '60', ldl: '100', tg: '150', crp: '1', vitd: '40', ferritin: '80', tsh: '2.5' },
      lifestyle: { sleep: '8', stress: '3', steps: '10000', water: '2', smoking: 'нет', alcohol: 'редко', exercise_freq: '3', exercise_type: 'бег', diet: 'средиземноморская' },
      genetics: { apoe: 'e3/e3', mthfr: 'нет', lactase: 'да', brca: 'отрицательно' },
      medical: { medications: 'лизиноприл', allergies: 'нет', cv_history: 'нет', dm_history: 'нет', family_history: 'нет' },
    };
    const ev = exampleValues[sectionKey] || {};
    const examples = section.attributes.map(attr => {
      const exVal = ev[attr.id];
      return exVal ? `${attr.name} ${exVal}${attr.unit ? ' ' + attr.unit : ''}` : attr.name;
    });
    return `Продиктуйте значения параметров: «${examples.join('», «')}»`;
  };

  return (
    <div className="digital-twin-container">
      {!profileId && (
        <div className="no-profile-selected">
          <svg className="arrow-left-animated" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#9c27b0" strokeWidth="1.5">
            <line x1="20" y1="12" x2="4" y2="12"/>
            <polyline points="10 6 4 12 10 18"/>
          </svg>
          <p>Выберите профиль на левой панели</p>
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
                <button className="daw-btn" onClick={() => { setTimelineInterventions([]); if (profileId) removePlan(profileId); }} title="Очистить план">
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
                  <span>День: {simulationDay}/30</span>
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
                    <div key={protocol.protocolKey || protocol.key} className="protocol-card"
                      draggable="true"
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', protocol.protocolKey || protocol.key);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      onClick={() => { setSelectedProtocolForPopup(protocol); setShowProtocolPopup(true); }}>
                      <div className="protocol-card-header">
                        <span className="protocol-card-name">{protocol.name}</span>
                        <span className="protocol-card-id">{protocol.protocol_id}</span>
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
                      <div key={key} className="protocol-card"
                        draggable="true"
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', key);
                          e.dataTransfer.effectAllowed = 'copy';
                        }}
                        onClick={() => { setSelectedProtocolForPopup(proto); setShowProtocolPopup(true); }}>
                        <div className="protocol-card-header">
                          <span className="protocol-card-name">{proto.name}</span>
                          <span className="protocol-card-id">{proto.protocol_id}</span>
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
            <div className="tracks-container">
              <div className="tracks-header" onClick={() => setTracksCollapsed(v => !v)}>
                <span className="tracks-header-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
                    style={{ transform: tracksCollapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                  График интервенций
                </span>
                {tracksCollapsed && (
                  <span className="tracks-header-summary">
                    {(() => {
                      const codes = [...new Set(timelineInterventions.map(i => i.code))];
                      return `${codes.length} интервенций · ${timelineInterventions.length} всего`;
                    })()}
                  </span>
                )}
                <div className="tracks-header-controls" onClick={e => e.stopPropagation()}>
                  {!tracksCollapsed && [['days','Дни'],['weeks','Недели'],['phases','Фазы']].map(([v,l]) => (
                    <button key={v} className={`tracks-view-btn ${timelineView === v ? 'active' : ''}`} onClick={() => setTimelineView(v)}>{l}</button>
                  ))}
                </div>
              </div>
              {!tracksCollapsed && (
              <div className="tracks" ref={timelineRef} onClick={handleTimelineClick} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); }}>
              <div className="track-table">
                <div className="track-table-header">
                  <span className="th-cat" title="Категория">Кат</span>
                  <span className="th-name">Название</span>
                  <span className="th-track">
                    <span className="th-track-text">График интервенций</span>
                    <span className="th-track-labels">
                      {timelineView === 'days' && [0,5,10,15,20,25,30].map(d => (
                        <span key={d} className="th-track-label" style={{ left: `${(d/30)*100}%` }}>{d}</span>
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
                    'medical': { name: 'мед', color: '#f44336', interventions: [] },
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
                    const maxUnit = timelineView === 'days' ? 30 : timelineView === 'weeks' ? 13 : 4;
                    const regularityGap = clip.regularity === 'D' ? 1 : clip.regularity === 'W' ? (timelineView === 'weeks' ? 1 : 7) : clip.regularity === 'M' ? (timelineView === 'phases' ? 1 : 30) : clip.regularity === 'Y' ? maxUnit : 7;
                    const effectiveGap = Math.max(1, Math.round(regularityGap / multiplier));
                    const positions = [];
                    let pos = timelineView === 'days' ? clip.day : Math.ceil(clip.day / (timelineView === 'weeks' ? 7 : 22.5));
                    while (pos <= maxUnit) {
                      positions.push(pos);
                      pos += effectiveGap;
                    }
                    return positions.slice(0, Math.ceil(maxUnit / effectiveGap));
                  };

                  const dayProgress = simulationDay / 30;

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
                                <svg viewBox="0 0 1000 42" width="100%" height="42" style={{ display: 'block' }}>
                                  <rect width="1000" height="42" fill="#fafafa"/>
                                  {[1,2,3,4,5,6,7,8,9].map(i => (
                                    <line key={i} x1={i*100} y1={0} x2={i*100} y2={42} stroke="#eee" strokeWidth={1}/>
                                  ))}
                                  <rect x={0} y={0} width={dayProgress*1000} height={42} fill={`${catColor}15`}/>
                                  {(() => {
                                    const activatedDays = new Set(
                                      interventionLog.filter(e => e.state === 'Активировано').map(e => `${e.code}_${e.day}`)
                                    );
                                    const dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
                                    return positions.map((day, i) => {
                                      const cx = (day/30)*1000;
                                      const triggered = activatedDays.has(`${clip.code}_${day}`);
                                      const hasTime = clip.schedule && clip.schedule.time;
                                      return (
                                        <g key={i} style={{ cursor:'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedInterventionForPopup(clip); setShowInterventionPopup(true); }}>
                                          <title>{`${clip.name} — ${dayNames[day%7]} день ${day}${hasTime ? ' ' + clip.schedule.time : ''}`}</title>
                                          <rect x={cx-12} y={4} width={24} height={24} rx={4} fill="transparent"/>
                                          <circle cx={cx} cy={16} r={4} fill={catColor} opacity={day <= simulationDay && triggered ? 1 : 0.2}/>
                                          {hasTime && <text x={cx} y={30} textAnchor="middle" fontSize="7" fill="#666">{clip.schedule.time}</text>}
                                        </g>
                                      );
                                    });
                                  })()}
                                  <line x1={dayProgress*1000} y1={0} x2={dayProgress*1000} y2={42} stroke="#d50000" strokeWidth={2}/>
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

            {/* Execution History */}
            <div className="exec-history-section">
              <div className="exec-history-header" onClick={() => setShowExecHistory(v => !v)} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:6,padding:'8px 12px',fontSize:12,color:'#555',background:'#fafafa',borderTop:'1px solid #eee',borderBottom: showExecHistory ? '1px solid #eee' : 'none'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"
                  style={{ transform: showExecHistory ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
                <span style={{fontWeight:600}}>История выполнения</span>
                {!showExecHistory && (
                  <span style={{fontSize:10,color:'#999',marginLeft:4}}>
                    {EXECUTION_HISTORY.days.length} д · {Math.round(EXECUTION_HISTORY.days.reduce((s,d) => s + d.adherence_pct, 0) / EXECUTION_HISTORY.days.length)}%
                  </span>
                )}
                <div className="exec-history-nav" onClick={e => e.stopPropagation()} style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:4}}>
                  <button className="log-day-btn" onClick={() => setExecHistoryDay(prev => Math.max(1, prev - 1))} disabled={execHistoryDay <= 1}>◀</button>
                  <span className="log-day-label" style={{fontSize:10,fontWeight:600,minWidth:120,textAlign:'center'}}>День {execHistoryDay} — {EXECUTION_HISTORY.days.find(d => d.day === execHistoryDay)?.date || ''}</span>
                  <button className="log-day-btn" onClick={() => setExecHistoryDay(prev => Math.min(30, prev + 1))} disabled={execHistoryDay >= 30}>▶</button>
                </div>
              </div>
              {showExecHistory && (() => {
                const dayData = EXECUTION_HISTORY.days.find(d => d.day === execHistoryDay);
                if (!dayData) return <div className="log-empty" style={{padding:12,fontSize:11}}>Нет данных</div>;
                const doneCount = dayData.tasks.filter(t => t.status === 'done').length;
                const totalCount = dayData.tasks.length;
                return (
                  <div style={{padding:'6px 12px'}}>
                    <div style={{display:'flex',gap:12,fontSize:10,color:'#555',marginBottom:8,flexWrap:'wrap'}}>
                      <span>⚖️ Вес: <b>{dayData.weight_kg}</b> кг</span>
                      <span>📊 Adherence: <b>{dayData.adherence_pct}%</b></span>
                      <span>🧬 Z: <b>{dayData.Z_score}</b></span>
                      <span>✅ <b>{doneCount}/{totalCount}</b></span>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:3}}>
                      {dayData.tasks.map(t => (
                        <div key={t.code} style={{display:'flex',alignItems:'center',gap:6,padding:'3px 6px',fontSize:10,borderRadius:4,background:t.status === 'done' ? '#f1f8e9' : t.status === 'undone' ? '#fce4ec' : '#fff8e1',borderLeft:'3px solid ' + (t.status === 'done' ? '#4caf50' : t.status === 'undone' ? '#f44336' : '#ff9800')}}>
                          <span style={{fontWeight:700,fontFamily:'monospace',fontSize:9,color:'#666',minWidth:60}}>{t.code}</span>
                          <span style={{fontSize:11}}>{t.status === 'done' ? '✅' : t.status === 'undone' ? '❌' : '⏳'}</span>
                          <span style={{flex:1,color:'#444'}}>{t.comment || '-'}</span>
                          {t.datetime && <span style={{fontSize:8,color:'#aaa',whiteSpace:'nowrap'}}>{t.datetime}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
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
                    <h4>Профиль</h4>
                    <span className="log-count">{interventionLog.length}</span>
                  </div>
                  {timelineInterventions.length > 0 && (
                    <button className="log-tasks-badge" onClick={() => setShowTaskPopup(true)} title="Задачи в плане">
                      📋 {new Set(timelineInterventions.map(i => i.code)).size} задач
                    </button>
                  )}
                  <div className="log-stats">
                    <span className="log-stat">Всего: {total}</span>
                    <span className="log-stat">Пройдено: {passed}</span>
                    <span className="log-stat log-stat-ok">Сработало: {success}</span>
                    <span className="log-stat">Осталось: {remain}</span>
                  </div>
                  <div className="log-day-nav">
                    <button className="log-day-btn" onClick={() => setLogViewDay(prev => Math.max(-1, prev - 1))} disabled={logViewDay <= -1} title="Назад">◀</button>
                    <span className="log-day-label">{logViewDay === -1 ? 'Все дни' : `День ${logViewDay}`}</span>
                    <button className="log-day-btn" onClick={() => setLogViewDay(prev => prev === -1 ? 0 : Math.min(30, prev + 1))} disabled={logViewDay >= 30} title="Вперёд">▶</button>
                  </div>
                  <button className="log-toggle" onClick={() => setShowLog(v => !v)} title={showLog ? 'Скрыть' : 'Показать'}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
                      style={{ transform: showLog ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
                {showLog && (
                  <div className="log-table" ref={el => { if (el && logViewDay >= 0) { const dayEl = el.querySelector(`[data-day="${logViewDay}"]`); if (dayEl) dayEl.scrollIntoView({ block: 'center' }); } }}>
                    {(() => {
                      const now = new Date();
                      const grouped = {};
                      interventionLog.forEach(entry => {
                        const d = entry.day;
                        if (logViewDay >= 0 && d !== logViewDay) return;
                        if (!grouped[d]) grouped[d] = [];
                        grouped[d].push(entry);
                      });
                      const sortedDays = Object.keys(grouped).sort((a,b) => b - a);
                      if (sortedDays.length === 0) return <div className="log-empty">Журнал пуст. Запустите симуляцию.</div>;
                      return sortedDays.map(day => {
                        const date = new Date(now);
                        date.setDate(date.getDate() + Number(day));
                        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '.');
                        return (
                          <div key={day} data-day={day}>
                            <div className="log-day-separator">
                              <span className="log-day-sep-line"></span>
                              <span className="log-day-sep-text">{dateStr}</span>
                              <span className="log-day-sep-line"></span>
                            </div>
                            {grouped[day].map((entry, i) => (
                              <div key={`${day}-${i}`} className={`log-row ${entry.state === 'Активировано' ? 'log-row-ok' : 'log-row-skip'}`}>
                                <span className="col-day">День {entry.day}</span>
                                <span className="col-time">{entry.time || `${String(6 + (entry.day * 7) % 14).padStart(2, '0')}:00`}</span>
                                <span className="col-intervention">
                                  <span>{entry.code}</span>
                                  <span>{entry.name}</span>
                                </span>
                                <span className="col-state">{entry.state === 'Активировано' ? '✓' : '—'}</span>
                                <span className="col-stars">{entry.starsGained > 0 ? `+${entry.starsGained} ⭐` : ''}</span>
                              </div>
                            ))}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tasks Popup */}
          {showTaskPopup && (
            <div className="plan-popup-overlay" onClick={() => setShowTaskPopup(false)}>
              <div className="tasks-popup" onClick={e => e.stopPropagation()}>
                <div className="tasks-popup-header">
                  <h3>📋 Задачи в плане</h3>
                  <button className="plan-popup-close" onClick={() => setShowTaskPopup(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <div className="tasks-popup-body">
                  {(() => {
                    const codes = [...new Set(timelineInterventions.map(i => i.code))];
                    return codes.map(code => {
                      const item = timelineInterventions.find(i => i.code === code);
                      if (!item) return null;
                      const days = timelineInterventions.filter(i => i.code === code);
                      const activated = interventionLog.filter(e => e.code === code && e.state === 'Активировано').length;
                      return (
                        <div key={code} className="tasks-popup-row">
                          <div className="tasks-popup-row-top">
                            <span className="tasks-popup-code">{code}</span>
                            <span className="tasks-popup-name">{item.name}</span>
                          </div>
                          <div className="tasks-popup-row-meta">
                            <span>{days.length} назначений</span>
                            <span className="tasks-popup-done">{activated} выполнено</span>
                            <span className="tasks-popup-pct">{Math.round(activated / days.length * 100)}%</span>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}

{/* Full Attribute Catalog Table - 2 columns per section */}
          {/* Profile Header with Photo + Targets */}
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
                      {(() => { const codes = [...new Set(timelineInterventions.map(i => i.code))]; const has = codes.length > 0; return (
                        <div className={`plan-status-bar${has ? ' has-plan' : ''}`}>
                          <div className="plan-drop-zone"
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                            onDragLeave={(e) => { e.currentTarget.classList.remove('drag-over'); }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('drag-over');
                              const key = e.dataTransfer.getData('text/plain');
                              if (key) {
                                addProtocolToTimeline(key);
                                setTimeout(() => setShowPlanPopup(true), 150);
                              }
                            }}
                            onClick={() => setShowPlanPopup(true)}
                            title="Перетащите протокол сюда или нажмите для просмотра плана">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                            <span className="plan-drop-label">{has ? 'План' : 'Перетащите протокол'}</span>
                            {has && (
                              <span className="plan-status-dots">
                                <span className="plan-status-dot dot-protocols" title={`${codes.length} протоколов`}>{codes.length}</span>
                                <span className="plan-status-dot dot-interventions" title={`${timelineInterventions.length} интервенций`}>{timelineInterventions.length}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );})()}
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
                <button className={`assess-health-btn ${hasUnsavedEdits ? 'btn-save-active' : 'btn-save-inactive'}`} onClick={saveToServer}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  Сохранить
                </button>
                <button className="assess-health-btn btn-health" onClick={() => assessHealth()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Оценить здоровье
                  </button>
                  <button className="assess-health-btn btn-diary" onClick={() => { const d = simulationDay; setDiaryDay(d); setDiaryData(defaultDiaryData(d)); setShowDiary(true); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    Дневник
                  </button>
                  <button className="assess-health-btn btn-chat" onClick={() => {
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
                    setPhoneOverlayTab('chat');
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Чат
                  </button>
                  <button className="assess-health-btn btn-export" onClick={() => {
                    const data = {
                      profile,
                      profileOverrides,
                      paramHistory,
                      plans: plans[profileId] || null,
                      interventions: timelineInterventions,
                      preferences: { badges: prefBadges, custom: prefCustom, diet: prefDietBadges, restrictions: prefRestrictionBadges },
                      exportedAt: new Date().toISOString(),
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `healora-twin-${profile.id || profile.name || 'data'}-${new Date().toISOString().slice(0,10)}.json`;
                    document.body.appendChild(a); a.click();
                    document.body.removeChild(a); URL.revokeObjectURL(url);
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Выгрузить
                  </button>
                </div>
                <div className="profile-prefs">
                  <span className="prefs-label">Предпочтения:</span>
                  {prefDietBadges.map(badge => (
                    <span key={'d_'+badge} className="pref-badge active">
                      {badge}
                      <span className="pref-badge-remove" onClick={e => { e.stopPropagation(); const next = prefDietBadges.filter(b => b !== badge); setPrefDietBadges(next); localStorage.setItem('healora_pref_diet', JSON.stringify(next)); }}>×</span>
                    </span>
                  ))}
                  {prefRestrictionBadges.map(badge => (
                    <span key={'r_'+badge.name} className="pref-badge active" title={badge.text || ''}>
                      {badge.name}{badge.text ? ': ' + badge.text : ''}
                      <span className="pref-badge-remove" onClick={e => { e.stopPropagation(); const next = prefRestrictionBadges.filter(b => b.name !== badge.name); setPrefRestrictionBadges(next); localStorage.setItem('healora_pref_restrictions', JSON.stringify(next)); }}>×</span>
                    </span>
                  ))}
                  <span className="pref-custom-wrap">
                    <button className="pref-practice-btn" onClick={() => setShowDietPrefs(p => !p)} title="Выбрать вкусовые предпочтения">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M3 7h18M3 12h18M3 17h12"/><circle cx="19" cy="17" r="3"/></svg>
                      вкусовые
                    </button>
                    <button className="pref-practice-btn" onClick={() => setShowRestrictions(p => !p)} title="Выбрать ограничения">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      ограничения
                    </button>
                    <button className="pref-practice-btn" onClick={() => setShowProtocolPicker(p => !p)} title="Выбрать типы практик">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>
                      практики
                    </button>
                    <input
                      className="pref-custom-input"
                      type="text"
                      placeholder="+ другая"
                      value={prefCustom}
                      onChange={e => setPrefCustom(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && prefCustom.trim()) {
                          e.preventDefault();
                          const val = prefCustom.trim();
                          if (!prefBadges.includes(val)) {
                            const next = [...prefBadges, val];
                            setPrefBadges(next);
                            localStorage.setItem('healora_pref_badges', JSON.stringify(next));
                          }
                          setPrefCustom('');
                        }
                      }}
                    />
                    {showDietPrefs && (
                      <div className="protocol-picker-dropdown" onClick={() => setShowDietPrefs(false)}>
                        <div className="protocol-picker-body" onClick={e => e.stopPropagation()}>
                          <div className="protocol-picker-header">Вкусовые предпочтения</div>
                          {dietPrefsData.map(dp => {
                            const active = prefDietBadges.includes(dp.name);
                            const cls = ['protocol-picker-item'];
                            if (active) cls.push('active');
                            return (
                              <div key={dp.id} className={cls.join(' ')} onClick={() => {
                                const nameMap = { 'Вегетарианство':'vegetarian','Веганство':'vegan','Без глютена':'gluten_free','Без лактозы':'lactose_free','Низкоуглеводное':'low_carb','Средиземноморская':'mediterranean','Кетодиета':'keto','Интервальное голодание':'if','Без сахара':'no_sugar','Спортивное питание':'sports' };
                                const key = nameMap[dp.name];
                                const content = key ? dietPrefContentByKey[key] : null;
                                if (content) setDietPrefPopup({ name: dp.name, content });
                              }}>
                                <span className="protocol-picker-stars">{'★'.repeat(dp.stars)}{'☆'.repeat(5 - dp.stars)}</span>
                                <span className="protocol-picker-name-group">
                                  <span className="protocol-picker-name">{dp.name}</span>
                                  <span className="protocol-picker-applic">{dp.applicability}</span>
                                </span>
                                <span className="protocol-picker-cb" onClick={e => { e.stopPropagation(); const next = active ? prefDietBadges.filter(b => b !== dp.name) : [...prefDietBadges, dp.name]; setPrefDietBadges(next); localStorage.setItem('healora_pref_diet', JSON.stringify(next)); }}>{active ? '☑' : '☐'}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {showRestrictions && (
                      <div className="protocol-picker-dropdown" onClick={() => setShowRestrictions(false)}>
                        <div className="protocol-picker-body" onClick={e => e.stopPropagation()}>
                          <div className="protocol-picker-header">Ограничения</div>
                          {dietRestrictionsData.map(dr => {
                            const badge = prefRestrictionBadges.find(b => b.name === dr.name);
                            const active = !!badge;
                            const cls = ['protocol-picker-item'];
                            if (active) cls.push('active');
                            return (
                              <div key={dr.id} className={cls.join(' ')} onClick={() => {
                                const nameMap = { 'Аллергии':'allergies','Нелюбимые продукты':'disliked','Религиозные':'religious','Другие ограничения':'other' };
                                const key = nameMap[dr.name];
                                const content = key ? dietRestrictionContentByKey[key] : null;
                                if (content) setRestrictionPopup({ name: dr.name, content });
                              }}>
                                <span className="protocol-picker-stars">{'★'.repeat(dr.stars)}{'☆'.repeat(5 - dr.stars)}</span>
                                <span className="protocol-picker-name-group">
                                  <span className="protocol-picker-name">{dr.name}</span>
                                  <span className="protocol-picker-applic">{dr.applicability}</span>
                                </span>
                                {active && (
                                  <input
                                    className="protocol-picker-input"
                                    type="text"
                                    placeholder="Описание ограничения..."
                                    value={badge.text}
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => {
                                      e.stopPropagation();
                                      const next = prefRestrictionBadges.map(b => b.name === dr.name ? { ...b, text: e.target.value } : b);
                                      setPrefRestrictionBadges(next);
                                      localStorage.setItem('healora_pref_restrictions', JSON.stringify(next));
                                    }}
                                  />
                                )}
                                <span className="protocol-picker-cb" onClick={e => { e.stopPropagation(); const next = active ? prefRestrictionBadges.filter(b => b.name !== dr.name) : [...prefRestrictionBadges, { name: dr.name, text: '' }]; setPrefRestrictionBadges(next); localStorage.setItem('healora_pref_restrictions', JSON.stringify(next)); }}>{active ? '☑' : '☐'}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {showProtocolPicker && (
                      <div className="protocol-picker-dropdown" onClick={() => setShowProtocolPicker(false)}>
                        <div className="protocol-picker-body" onClick={e => e.stopPropagation()}>
                          <div className="protocol-picker-header">Практики</div>
                          {[...protocolTypes].sort((a, b) => b.stars - a.stars).map(pt => {
                            const active = prefBadges.includes(pt.name) || prefBadges.includes(pt.short);
                            const cls = ['protocol-picker-item'];
                            if (active) cls.push('active');
                            if (pt.official) cls.push('official');
                            const srcCount = pt.official && pt.regulatory ? pt.regulatory.split(';').filter(s => s.trim()).length : 0;
                            return (
                              <div
                                key={pt.id}
                                className={cls.join(' ')}
                                onClick={() => {
                                  const nameMap = {
                                    'РКИ (медицина)': 'rki',
                                    'Нутрициология': 'nutriciology',
                                    'Китайская медицина': 'chinese_medicine',
                                    'Интегративная медицина': 'integrative',
                                    'Аюрведа': 'ayurveda',
                                    'Персонализированная медицина': 'personalized',
                                    'Поведенческая психология': 'behavioral',
                                    'Цифровые биомаркеры': 'biomarkers',
                                    'Шаманизм': 'shamanism',
                                    'Клинические гайдлайны': 'guidelines',
                                    'Медицина Майя': 'maya',
                                    'Народные практики': 'folk',
                                    'Культурная адаптация': 'cultural',
                                  };
                                  const key = nameMap[pt.name];
                                  const content = key ? practiceContentByKey[key] : null;
                                  if (content) setPracticePopup({ name: pt.name, content, regulatory: pt.regulatory || '' });
                                }}
                              >
                                {pt.official && (
                                  <span
                                    className="protocol-picker-src-badge"
                                    title={pt.official ? 'Источники: законы, практики, регламенты' : ''}
                                    onClick={e => { e.stopPropagation(); setRegulatoryInfo(regulatoryInfo === pt.id ? null : pt.id); }}
                                  >
                                    {srcCount}
                                    {regulatoryInfo === pt.id && (
                                      <div className="protocol-picker-reg-popup" onClick={e => e.stopPropagation()}>
                                        <div className="reg-popup-title">Источники</div>
                                        <div className="reg-popup-text">{pt.regulatory}</div>
                                      </div>
                                    )}
                                  </span>
                                )}
                                {!pt.official && <span style={{width:16,flexShrink:0}} />}
                                <span className="protocol-picker-stars">{'★'.repeat(pt.stars)}{'☆'.repeat(5 - pt.stars)}</span>
                                <span className="protocol-picker-name-group">
                                  <span className="protocol-picker-name">{pt.name}</span>
                                  <span className="protocol-picker-applic">{pt.applicability}</span>
                                </span>
                                <span className="protocol-picker-cb" onClick={e => { e.stopPropagation(); const existing = prefBadges.includes(pt.name); const next = existing ? prefBadges.filter(b => b !== pt.name && b !== pt.short) : [...prefBadges, pt.name]; setPrefBadges(next); localStorage.setItem('healora_pref_badges', JSON.stringify(next)); }}>{active ? '☑' : '☐'}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </span>
                </div>
                <div className="profile-targets" style={{ cursor: 'pointer', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Plan-Journal:</span>
                    <button className="pjl-profile-btn" onClick={(e) => { e.stopPropagation(); setShowGoalBadges(true); }}>🎯 Новая цель</button>
                    <button className="pjl-profile-btn" onClick={(e) => { e.stopPropagation(); setShowPlanList(true); }}>📋 Список планов</button>
                    {chatGoals.length > 0 && <span className="pjl-profile-count" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{'старая цель: '}{chatGoals.map(g=>g.icon).join(' ')}</span>}
                  </div>
                </div>
                <div className="profile-targets" onClick={() => { setShowGoalChat(true); setGoalChatStep(0); }} style={{ cursor: 'pointer' }}>
                  <span className="targets-label">Цели:</span>
                  <div className="targets-badges">
                    {chatGoals.length === 0 ? (
                      <span className="targets-empty">не выбраны — нажмите, чтобы задать</span>
                    ) : (
                      chatGoals.slice(0, 3).map(g => (
                        <span key={g.id} className="target-badge" title={g.name}>
                          <span className="target-badge-dot" style={{ backgroundColor: '#6b21c8' }}></span>
                          <span className="target-badge-name">{g.icon} {g.name}</span>
                        </span>
                      ))
                    )}
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

          <div className="data-panel">
            {(() => {
              const allAttrs = Object.values(attributeCatalog).flatMap(s => s.attributes);
              const totalAll = allAttrs.length;
              const filledAll = allAttrs.filter(a => { const v = getAttrCurrent(a); return v !== null && v !== undefined && v !== ''; }).length;
              return (
                <div className="data-panel-summary" style={{ padding: '6px 12px', fontSize: '12px', color: '#666', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Всего параметров: <strong>{totalAll}</strong></span>
                  <span>Заполнено: <strong>{filledAll}</strong> из <strong>{totalAll}</strong> ({Math.round(filledAll / totalAll * 100)}%)</span>
                </div>
              );
            })()}
            {Object.entries(attributeCatalog).map(([key, section]) => {
              const isCollapsed = collapsedSections[key];
              const sectionFilled = section.attributes.filter(a => { const v = getAttrCurrent(a); return v !== null && v !== undefined && v !== ''; }).length;
              const sectionTotal = section.attributes.length;
              return (
                <div key={key} className="data-section" style={{ borderLeft: `3px solid ${section.color}` }}>
                  <div className="section-header" onClick={() => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }))}>
                    <div className="section-title-row">
                      <button className="mic-btn" title="Редактировать параметры" onClick={(e) => { e.stopPropagation(); setVoiceSection(key); setShowVoicePopup(true); const form = {}; attributeCatalog[key]?.attributes.forEach(a => { const v = getAttrCurrent(a); if (v !== null && v !== undefined && v !== '—') form[a.id] = v; }); setVoiceFormValues(form); setVoiceTranscript(''); setVoiceParsedValues([]); setVoiceStatus('idle'); }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={section.color} strokeWidth="2" width="16" height="16">
                          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                      </button>
                      <h4 style={{ color: section.color }}>{section.title}</h4>
                      <span style={{ marginLeft: '8px', fontSize: '11px', color: '#999', fontWeight: 'normal' }}>{sectionFilled}/{sectionTotal}</span>
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
                        <span>Было</span>
                        <span>Текущее</span>
                        <span>Цель</span>
                        <span>Интервенции</span>
                        {(() => {
                          const cols = [];
                          for (let i = 0; i < 7; i++) {
                            const d = new Date(); d.setDate(d.getDate() - i);
                            const dayName = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()];
                            const dateStr = `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}`;
                            cols.push(<span key={i} className={`attr-day-header ${i === 0 ? 'today' : ''}`}>{dayName}<br/>{dateStr}</span>);
                          }
                          return cols;
                        })()}
                      </div>
                      {section.attributes.map(attr => {
                        const alert = parameterAlerts[attr.id] || parameterAlerts[attr.name];
                        const interventions = getInterventionsForAttribute(attr.id);
                        const isEditing = editingField === `${key}_${attr.id}`;
                        const isExpanded = expandedAttr === attr.id;
                        return (
                          <React.Fragment key={attr.id}>
                          <div
                            className={`attr-row ${isAttributeAffected(attr.name) || isAttributeAffected(attr.id) ? 'highlighted' : ''} ${alert ? 'alert' : ''} ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => setExpandedAttr(isExpanded ? null : attr.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="attr-code">{attr.code}</span>
                            <span className="attr-name">{attr.name}{attr.unit ? <span className="unit" style={{marginLeft:2}}>{attr.unit}</span> : ''}</span>
                            <div className={`attr-cell orig ${attr.id in profileOverrides && attr.current != null ? 'has-orig' : ''}`}>
                              {attr.id in profileOverrides && attr.current != null ? formatAttrValue(attr.current) : '—'}
                            </div>
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
                                  onDoubleClick={() => attr.editable && startEdit(key, attr.id, getAttrCurrent(attr))}
                                  title={attr.editable ? 'Двойной клик для редактирования' : ''}
                                >
                                  {attr.id === 'rpp' ? (() => {
                                    const cur = getAttrCurrent(attr);
                                    const types = cur && cur !== 'Нет' ? String(cur).split(', ') : [];
                                    const cnt = types.length;
                                    return cnt > 0 ? <span style={{ fontWeight: 600, color: '#6b21c8' }}>{cnt} {cnt === 1 ? 'тип' : 'типа'}</span> : <span>Нет</span>;
                                  })() : formatAttrValue(getAttrCurrent(attr))}
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
                            {(() => {
                              const cells = [];
                              for (let i = 0; i < 7; i++) {
                                const d = new Date(); d.setDate(d.getDate() - i);
                                const dateKey = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                                const history = paramHistory[attr.id] || [];
                                const matches = history.filter(h => h.timestamp && h.timestamp.startsWith(dateKey));
                                const match = matches.length > 0 ? matches[matches.length - 1] : null;
                                const override = i === 0 && attr.id in profileOverrides ? profileOverrides[attr.id] : null;
                                const val = match ? match.value : (override ?? null);
                                  cells.push(
                                    <div key={i} className={`attr-day-cell ${i === 0 ? 'today' : ''}`}>
                                      {val !== null ? <span className="day-value">{val}</span> : <span className="day-empty">—</span>}
                                    </div>
                                  );
                              }
                              return cells;
                            })()}
                            </div>
                          {isExpanded && (
                            <div className="attr-detail" onClick={e => e.stopPropagation()}>
                              {(() => {
                                if (attr.id === 'rpp') {
                                  if (!rppFormData && profile) {
                                    const initialTypes = profileOverrides.rpp ? profileOverrides.rpp.split(', ') : (profile?.lifestyle?.rpp && profile.lifestyle.rpp !== 'Нет' ? [profile.lifestyle.rpp] : []);
                                    setTimeout(() => setRppFormData({
                                      types: initialTypes,
                                      frequency: 'Ежедневно',
                                      triggers: '',
                                      notes: '',
                                    }), 0);
                                  }
                                  const form = rppFormData || {
                                    types: profileOverrides.rpp ? profileOverrides.rpp.split(', ') : (profile?.lifestyle?.rpp && profile.lifestyle.rpp !== 'Нет' ? [profile.lifestyle.rpp] : []),
                                    frequency: 'Ежедневно',
                                    triggers: '',
                                    notes: '',
                                  };
                                  const rppOptions = (attr.options || ['Нет','Анорексия','Булимия','Компульсивное переедание','Орторексия']);
                                  const handleRppCheck = (opt, checked) => {
                                    const nextTypes = checked ? [...form.types, opt] : form.types.filter(t => t !== opt);
                                    const newOverrides = { ...profileOverrides, rpp: nextTypes.join(', ') || 'Нет' };
                                    setProfileOverrides(newOverrides);
                                    setRppFormData({ ...form, types: nextTypes });
                                  };
                                  const handleRppField = (field, value) => {
                                    const next = { ...form, [field]: value };
                                    setRppFormData(next);
                                    if (field === 'frequency') {
                                      localStorage.setItem('healora_rpp_frequency', value);
                                    }
                                    if (field === 'triggers') {
                                      localStorage.setItem('healora_rpp_triggers', value);
                                    }
                                    if (field === 'notes') {
                                      localStorage.setItem('healora_rpp_notes', value);
                                    }
                                  };
                                  return (
                                    <div className="rpp-checklist">
                                      <div className="attr-detail-title">Оценка РПП</div>
                                      <div className="rpp-check-row">
                                        <span className="rpp-check-label">Текущий статус:</span>
                                        <span className="rpp-check-value">{form.types.length > 0 ? `${form.types.length} типа: ${form.types.join(', ')}` : 'Нет'}</span>
                                      </div>
                                      <div className="rpp-check-row">
                                        <span className="rpp-check-label">Типы расстройств:</span>
                                      </div>
                                      {rppOptions.filter(o => o !== 'Нет').map(opt => (
                                        <label key={opt} className="rpp-check-item">
                                          <input type="checkbox" checked={form.types.includes(opt)} onChange={e => handleRppCheck(opt, e.target.checked)} />
                                          <span>{opt}</span>
                                        </label>
                                      ))}
                                      <div className="rpp-check-row" style={{ marginTop: 8 }}>
                                        <span className="rpp-check-label">Частота:</span>
                                        <select className="rpp-select" value={form.frequency} onChange={e => handleRppField('frequency', e.target.value)}>
                                          <option>Ежедневно</option>
                                          <option>Несколько раз в неделю</option>
                                          <option>Раз в неделю</option>
                                          <option>Реже</option>
                                        </select>
                                      </div>
                                      <div className="rpp-check-row">
                                        <span className="rpp-check-label">Триггеры:</span>
                                        <textarea className="rpp-textarea" rows={2} placeholder="Опишите триггеры..." value={form.triggers} onChange={e => handleRppField('triggers', e.target.value)} />
                                      </div>
                                      <div className="rpp-check-row">
                                        <span className="rpp-check-label">Заметки:</span>
                                        <textarea className="rpp-textarea" rows={2} placeholder="Дополнительные заметки..." value={form.notes} onChange={e => handleRppField('notes', e.target.value)} />
                                      </div>
                                    </div>
                                  );
                                }
                                const meta = paramDetailData[attr.id] || paramDetailData[attr.name];
                                if (!meta || (!meta.description && !meta.medical && !meta.nutritional && !meta.tips)) {
                                  return <div className="attr-detail-empty">Нет дополнительных данных</div>;
                                }
                                return (
                                  <div className="param-detail">
                                    <div className="attr-detail-title">{attr.name}</div>
                                    {meta.description && <div className="attr-detail-desc">{meta.description}</div>}
                                    {meta.medical && (
                                      <div className="attr-detail-range medical">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                        <span className="range-label">Медицинская норма:</span>
                                        <span className="range-value">{meta.medical}</span>
                                      </div>
                                    )}
                                    {meta.nutritional && (
                                      <div className="attr-detail-range nutritional">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                        <span className="range-label">Нутрициологическая норма:</span>
                                        <span className="range-value">{meta.nutritional}</span>
                                      </div>
                                    )}
                                    {meta.tips && <div className="attr-detail-tips">{meta.tips}</div>}
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                          </React.Fragment>
                        );
                        })}
                      </div>
                  )}
                </div>
              );
            })}
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
                      {selectedInterventionForPopup.regularity === 'D' ? 'Ежедневно' :
                       selectedInterventionForPopup.regularity === 'W' ? 'Еженедельно' :
                       selectedInterventionForPopup.regularity === 'M' ? 'Ежемесячно' :
                       selectedInterventionForPopup.regularity === 'Y' ? 'Ежегодно' :
                       selectedInterventionForPopup.regularity === 'P' ? 'P' :
                       selectedInterventionForPopup.regularity}
                    </span>
                  </div>
                  {selectedInterventionForPopup.schedule && (
                  <div className="popup-row">
                    <span className="popup-label">Расписание</span>
                    <span className="popup-value">
                      {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].filter((_,i) => selectedInterventionForPopup.schedule.days.includes(i)).join(', ')}
                      {selectedInterventionForPopup.schedule.time ? ` в ${selectedInterventionForPopup.schedule.time}` : ''}
                    </span>
                  </div>
                  )}
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
                        if (reg === 'D') return `День ${Math.min(30, start + 30)}`;
                        if (reg === 'W') return `День ${Math.min(30, start + 28)}`;
                        if (reg === 'M') return `День ${Math.min(30, start + 30)}`;
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

          {/* Goal Badges (new) */}
          {showGoalBadges && (
            <GoalBadges
              profileId={profileId}
              profile={profile}
              onPlanCreated={(plan) => { setPlanJournalId(plan.plan_id); setShowPlanJournal(true); }}
              onClose={() => setShowGoalBadges(false)}
            />
          )}

          {/* Plan Journal View */}
          {showPlanJournal && planJournalId && (
            <PlanJournalView
              planId={planJournalId}
              profileId={profileId}
              onClose={() => setShowPlanJournal(false)}
            />
          )}

          {/* Plan List */}
          {showPlanList && (
            <div className="pjl-overlay" onClick={() => setShowPlanList(false)}>
              <div className="pjl-popup" onClick={e => e.stopPropagation()} style={{ width: 500 }}>
                <div className="pjl-header">
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>📋 Планы пользователя</span>
                  <button className="pjl-close" onClick={() => setShowPlanList(false)}>×</button>
                </div>
                <div className="pjl-body">
                  <PlanList
                    profileId={profileId}
                    onSelectPlan={(planId) => { setPlanJournalId(planId); setShowPlanList(false); setShowPlanJournal(true); }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Goal Chat Popup */}
          {showGoalChat && (
            <div className="goal-chat-overlay" onClick={() => setShowGoalChat(false)}>
              <div className="goal-chat-popup" onClick={(e) => e.stopPropagation()}>
                <div className="goal-chat-header">
                  <span>{icon.target} Выбор целей</span>
                  <button className="goal-chat-close" onClick={() => setShowGoalChat(false)}>×</button>
                </div>
                <div className="goal-chat-body">
                  {/* Step 0: greeting */}
                  {goalChatStep === 0 && (
                    <div className="goal-chat-message">
                      <div className="goal-msg-avatar">🤖</div>
                      <div className="goal-msg-bubble">
                        <div className="goal-msg-text">Привет! Давайте выберем ваши цели на ближайшее время. Какие показатели вы хотите улучшить? Можно выбрать <b>до 3</b>.</div>
                        <div className="goal-msg-options">
                          {GOAL_OPTIONS.filter(g => !chatGoals.find(c => c.id === g.id)).map(g => (
                            <button key={g.id} className="goal-option-btn"
                              onClick={() => {
                                if (chatGoals.length >= 3) return;
                                const newGoals = [...chatGoals, g];
                                setChatGoals(newGoals);
                                setGoalChatLog(prev => [...prev, { type: 'user', icon: g.icon, name: g.name }]);
                                if (newGoals.length >= 3) {
                                  setGoalChatStep(2);
                                }
                              }}>
                              {g.icon} {g.name}
                            </button>
                          ))}
                          {chatGoals.length > 0 && goalChatStep === 0 && (
                            <button className="goal-option-btn goal-option-done"
                              onClick={() => setGoalChatStep(2)}>
                              ✅ Готово ({chatGoals.length}/3)
                            </button>
                          )}
                        </div>
                        {chatGoals.length === 0 && (
                          <div className="goal-msg-hint">Выберите одну или несколько целей из списка выше</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Logged selections */}
                  {goalChatLog.map((entry, i) => (
                    <div key={i} className={`goal-chat-message ${entry.type === 'user' ? 'goal-msg-user' : ''}`}>
                      <div className="goal-msg-avatar">{entry.type === 'user' ? icon.person : icon.robot}</div>
                      <div className="goal-msg-bubble"><div className="goal-msg-text">{entry.icon} {entry.name}</div></div>
                    </div>
                  ))}

                  {/* Step 2: confirm */}
                  {goalChatStep === 2 && (
                    <div className="goal-chat-message">
                      <div className="goal-msg-avatar">🤖</div>
                      <div className="goal-msg-bubble">
                        <div className="goal-msg-text">
                          <b>Ваши цели ({chatGoals.length}/3):</b>
                          <div className="goal-confirm-list">
                            {chatGoals.map(g => (
                              <div key={g.id} className="goal-confirm-item">{g.icon} {g.name}</div>
                            ))}
                          </div>
                          Подтверждаем?
                        </div>
                        <div className="goal-msg-options">
                          <button className="goal-option-btn goal-option-yes" onClick={() => { setGoalChatStep(3); }}>
                            ✅ Да, подтвердить
                          </button>
                          <button className="goal-option-btn goal-option-no" onClick={() => {
                            setChatGoals([]);
                            setGoalChatLog([]);
                            setGoalChatStep(0);
                          }}>
                            🔄 Выбрать заново
                          </button>
                          {chatGoals.length < 3 && (
                            <button className="goal-option-btn" onClick={() => setGoalChatStep(0)}>
                              ➕ Добавить ещё
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: done */}
                  {goalChatStep === 3 && (
                    <div className="goal-chat-message">
                      <div className="goal-msg-avatar">🤖</div>
                      <div className="goal-msg-bubble">
                        <div className="goal-msg-text">
                          ✅ <b>Цели сохранены!</b>
                          <div className="goal-confirm-list">
                            {chatGoals.map(g => (
                              <div key={g.id} className="goal-confirm-item">{g.icon} {g.name}</div>
                            ))}
                          </div>
                          Я буду отслеживать прогресс по этим показателям.
                        </div>
                        <button className="goal-option-btn goal-option-yes" onClick={() => setShowGoalChat(false)} style={{ marginTop: 10 }}>
                          🎯 К целям
                        </button>
                      </div>
                    </div>
                  )}
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
              <div className="plan-popup plan-prescription" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflow: 'hidden' }}>
                <PlanView profile={profile} profileId={profileId} plans={plans} fallbackProfiles={fallbackProfiles}
                  planTemplateId={planTemplateId} planDoctorNote={planDoctorNote} planStatus={planStatus}
                  timelineInterventions={timelineInterventions} interventionCatalog={interventionCatalog}
                  planTemplates={planTemplates} getTemplateById={getTemplateById} simulationDay={simulationDay}
                  onSetPlanTemplateId={setPlanTemplateId} onSetPlanDoctorNote={setPlanDoctorNote}
                  onSetPlanStatus={setPlanStatus} onRemoveIntervention={removeIntervention}
                  onSavePlan={() => { savePlan(profileId, { interventions: timelineInterventions, note: planDoctorNote, status: planStatus, templateId: planTemplateId }); setShowPlanPopup(false); }}
                  onClose={() => setShowPlanPopup(false)} />
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
                    <button className="diary-nav-btn" onClick={() => { const d = (diaryDay ?? simulationDay) + 1; if (d <= 30) { setDiaryDay(d); setDiaryData(defaultDiaryData(d)); } }} disabled={(diaryDay ?? simulationDay) >= 30}>
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
                  <div className="chat-header-left">
                    <h3>HEALORA</h3>
                    <span className="chat-user-name">{profile?.name || profileId || '—'}</span>
                    <span className="chat-header-stars">{stars} ⭐</span>
                    <div className="chat-stars-bar-wrap">
                      <div className="chat-stars-bar" style={{ width: Math.min(100, (stars / 2000) * 100) + '%' }}></div>
                    </div>
                  </div>
                  <div className="chat-header-right">
                    {isSimulating && (
                      <span className="chat-day-counter">
                        {simulationDay}/30 · {chatMessages.filter(m => m.done || m.skipped).length}/{chatMessages.length}
                      </span>
                      )}
                  </div>
                </div>
                  <div className="chat-messages" ref={chatRef}>
                  {chatMode === 'gigachat' ? (
                    <>
                      {gigachatMessages.length === 0 && (
                        <div className="chat-empty">Спросите у GigaChat о здоровье, питании, тренировках</div>
                      )}
                      {gigachatMessages.map(m => (
                        <div key={m.id} className={`chat-ai-msg ${m.user ? 'chat-ai-msg-user' : 'chat-ai-msg-bot'}`}>
                          <div className="chat-ai-bubble">
                            <span className="chat-ai-text">{m.text}</span>
                            <span className="chat-interv-time">{m.time}</span>
                          </div>
                        </div>
                      ))}
                      {gigachatLoading && (
                        <div className="chat-ai-msg chat-ai-msg-bot">
                          <div className="chat-ai-bubble"><span className="chat-ai-text">...</span></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
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
                    const maxDay = Math.max(-1, ...chatMessages.map(m => m.day));
                    const minDay = Math.max(0, maxDay - 2);
                    const filtered = chatMessages.filter(m => m.day >= minDay);
                    const grouped = {};
                    filtered.forEach(msg => {
                      if (!grouped[msg.day]) grouped[msg.day] = [];
                      grouped[msg.day].push(msg);
                    });
                    return Object.entries(grouped).sort((a, b) => a[0] - b[0]).map(([day, msgs]) => {
                      const doneCount = msgs.filter(m => m.done).length;
                      return (
                      <React.Fragment key={day}>
                        <div className="chat-date-divider">
                          <span>День {day} {doneCount > 0 && <span className="chat-day-done">{doneCount}/{msgs.length}</span>}</span>
                        </div>
                        <div className="chat-interventions-row">
                          {msgs.map(msg => {
                            if (msg.user) {
                              return (
                                <div key={msg.id} className="chat-user-message">
                                  {msg.photo && <img src={msg.photo} className="chat-user-photo" alt="" />}
                                  <span className="chat-user-text">{msg.text}</span>
                                  <span className="chat-interv-time">{msg.time}</span>
                                </div>
                              );
                            }
                            const color = categoryColors[msg.category] || '#6b21c8';
                            return (
                              <div key={msg.id} className={`chat-interv-card ${msg.done ? 'done' : msg.skipped ? 'skipped' : ''}`}>
                                <div className="chat-interv-card-top">
                                  <span className="chat-interv-badge" style={{ borderLeftColor: color }}>
                                    <span className="chat-interv-badge-name">{msg.name}</span>
                                    <span className="chat-interv-badge-code">{msg.code}</span>
                                  </span>
                                  <span className="chat-interv-time">{msg.time}</span>
                                </div>
                                {msg.done ? (
                                  <div className="chat-interv-card-status done">✓ Выполнено</div>
                                ) : msg.skipped ? (
                                  <div className="chat-interv-card-status skipped">✗ Пропущено</div>
                                ) : (
                                  <div className="chat-interv-card-actions">
                                    <div className="chat-interv-deadline">
                                      <span className="chat-deadline-label">⏰ до</span>
                                      <select
                                        className="chat-deadline-select"
                                        value={msg.deadline}
                                        onChange={e => setChatMessages(prev => prev.map(m => m.id === msg.id ? { ...m, deadline: e.target.value } : m))}
                                      >
                                        <option value="23:59">23:59</option>
                                        <option value="11:00">11:00 (завтрак)</option>
                                        <option value="22:00">22:00 (отход ко сну)</option>
                                        <option value="07:00">07:00 (раннее пробуждение)</option>
                                        <option value="—">нет дедлайна</option>
                                      </select>
                                    </div>
                                    <div className="chat-interv-btns">
                                      <button className="chat-btn-done" onClick={() => setChatMessages(prev => prev.map(m => m.id === msg.id ? { ...m, done: true, skipped: false } : m))}>✓</button>
                                      <button className="chat-btn-skip" onClick={() => setChatMessages(prev => prev.map(m => m.id === msg.id ? { ...m, skipped: true, done: false } : m))}>✗</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </React.Fragment>
                      );
                    })
                  })()}
                  {chatActiveScreen && (
                    <div className="chat-screen-viewer">
                      <div className="chat-screen-viewer-header">
                        <span className="chat-diary-title">📱 Экран {chatActiveScreen.num}. {chatActiveScreen.name}</span>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          {chatActiveScreen.num === 4 && (
                            <button className="chat-action-btn" onClick={() => { setShowVoicePopup(true); }} style={{ padding: '3px 8px', fontSize: 10, background: '#f8f4ff', color: '#6b21c8', border: '1px solid #e8e0f0', borderRadius: 6, cursor: 'pointer' }} title="Голосовой ввод">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg> 🎤
                            </button>
                          )}
                          <button className="chat-diag-close" onClick={() => setChatActiveScreen(null)}>×</button>
                        </div>
                      </div>
                      <div className="chat-screen-viewer-body" onClick={chatActiveScreen.num !== 1 && chatActiveScreen.num !== 5 ? () => setChatScreenPreview(prototypeScreens.indexOf(chatActiveScreen)) : undefined}>
                        {chatActiveScreen.num === 1 ? (
                          <div className="chat-profile-sections" onClick={e => e.stopPropagation()}>
                            <div className="chat-profile-summary">
                              <span className="chat-profile-summary-name">{profile?.name || '—'}</span>
                              <span className="chat-profile-summary-score">{profile?.digital_twin_scores?.current_stars || 0} ⭐</span>
                            </div>
                            {Object.entries(attributeCatalog).map(([key, section]) => {
                              const isCollapsed = chatSectionCollapsed[key];
                              const filled = section.attributes.filter(a => { const v = getAttrCurrent(a); return v !== null && v !== undefined && v !== ''; }).length;
                              return (
                                <div key={key} className="chat-profile-section" style={{ borderLeftColor: section.color }}>
                                  <div className="chat-profile-section-header" onClick={() => setChatSectionCollapsed(prev => ({ ...prev, [key]: !prev[key] }))}>
                                    <div className="chat-profile-section-title">
                                      <button className="mic-btn" title="Голосовой ввод" onClick={(e) => { e.stopPropagation(); setVoiceSection(key); setShowVoicePopup(true); const form = {}; attributeCatalog[key]?.attributes.forEach(a => { const v = getAttrCurrent(a); if (v !== null && v !== undefined && v !== '—') form[a.id] = v; }); setVoiceFormValues(form); setVoiceTranscript(''); setVoiceParsedValues([]); setVoiceStatus('idle'); }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke={section.color} strokeWidth="2" width="12" height="12"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                      </button>
                                      <span style={{ color: section.color, fontWeight: 600, fontSize: 11 }}>{section.title}</span>
                                      <span className="chat-profile-section-count">{filled}/{section.attributes.length}</span>
                                    </div>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" width="12" height="12" style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)', transition: 'transform 0.15s' }}>
                                      <polyline points="9 18 15 12 9 6"/>
                                    </svg>
                                  </div>
                                  {!isCollapsed && (
                                    <div className="chat-profile-section-body">
                                      {section.attributes.map(attr => (
                                        <div key={attr.id} className="chat-profile-attr-row">
                                          <span className="chat-profile-attr-name">{attr.name}{attr.unit ? <span className="chat-profile-attr-unit" style={{marginLeft:2}}>{attr.unit}</span> : ''}</span>
                                          <span className="chat-profile-attr-code">{attr.code}</span>
                                          <div className="chat-profile-attr-values">
                                            <span className="chat-profile-attr-current">{formatAttrValue(getAttrCurrent(attr))}</span>
                                            {attr.target != null && <span className="chat-profile-attr-target">→ {attr.target}</span>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : chatActiveScreen.num === 5 ? (
                          <div className="chat-proto-chat" onClick={e => e.stopPropagation()}>
                            <div className="chat-proto-msgs" ref={chatProtoEndRef}>
                              {chatProtoMsgs.length === 0 ? (
                                <div className="chat-proto-empty">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="#6b21c8" strokeWidth="1.5" width="32" height="32"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                  <span>Спросите у GigaChat о здоровье, питании, тренировках</span>
                                </div>
                              ) : (
                                chatProtoMsgs.map(m => {
                                  if (m.type === 'system') {
                                    return (
                                      <div key={m.id} className="chat-proto-card system">
                                        <div className="chat-proto-card-body">
                                          <div className="chat-proto-text" dangerouslySetInnerHTML={{ __html: renderMsgText(m.text) }} />
                                        </div>
                                        <span className="chat-interv-time">{m.time}</span>
                                      </div>
                                    );
                                  }
                                  if (m.type === 'tip') {
                                    return (
                                      <div key={m.id} className="chat-proto-card tip">
                                        <div className="chat-proto-card-body">
                                          <div className="chat-proto-text" dangerouslySetInnerHTML={{ __html: renderMsgText(m.text) }} />
                                        </div>
                                        <span className="chat-interv-time">{m.time}</span>
                                      </div>
                                    );
                                  }
                                  if (m.type === 'task') {
                                    const catColors = { sleep: '#2196f3', physical: '#4caf50', mental: '#9c27b0', food: '#ff9800', medical: '#f44336', supplement: '#795548' };
                                    const color = catColors[m.category] || '#6b21c8';
                                    return (
                                      <div key={m.id} className="chat-proto-card task" style={{ borderLeftColor: color }}>
                                        <div className="chat-proto-card-body">
                                          <div className="chat-proto-text" dangerouslySetInnerHTML={{ __html: renderMsgText(m.text) }} />
                                          <div className="chat-proto-task-actions">
                                            <span className="chat-deadline-label"><svg className="ei" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> до {m.deadline}</span>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                              <button className="chat-btn-done" onClick={() => setChatProtoMsgs(prev => prev.map(x => x.id === m.id ? { ...x, done: true } : x))}><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>
                                              <button className="chat-btn-skip" onClick={() => setChatProtoMsgs(prev => prev.map(x => x.id === m.id ? { ...x, skipped: true } : x))}><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                                            </div>
                                          </div>
                                          {m.done && <div className="chat-proto-task-status done"><svg viewBox="0 0 24 24" fill="#2e7d32" width="12" height="12" style={{verticalAlign: 'middle', marginRight: 2}}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Выполнено</div>}
                                          {m.skipped && <div className="chat-proto-task-status skipped"><svg viewBox="0 0 24 24" fill="none" stroke="#c62828" width="12" height="12" stroke-width="3" style={{verticalAlign: 'middle', marginRight: 2}} stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Пропущено</div>}
                                        </div>
                                        <span className="chat-interv-time">{m.time}</span>
                                      </div>
                                    );
                                  }
                                  if (m.type === 'poll') {
                                    return (
                                      <div key={m.id} className="chat-proto-card poll">
                                        <div className="chat-proto-card-body">
                                          <div className="chat-proto-text" dangerouslySetInnerHTML={{ __html: renderMsgText(m.text) }} />
                                          <div className="chat-proto-poll-options">
                                            {m.options.map((opt, i) => (
                                              <button key={i} className={`chat-proto-poll-opt ${m.voted ? 'disabled' : ''} ${m.selectedOption === i ? 'selected' : ''}`}
                                                onClick={() => !m.voted && setChatProtoMsgs(prev => prev.map(x => x.id === m.id ? { ...x, voted: true, selectedOption: i } : x))}
                                                disabled={m.voted}
                                                dangerouslySetInnerHTML={{ __html: renderMsgText(opt) }}
                                              />
                                            ))}
                                          </div>
                                          {m.voted && <div className="chat-proto-poll-result"><svg viewBox="0 0 24 24" fill="#2e7d32" width="12" height="12" style={{verticalAlign: 'middle', marginRight: 2}}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Спасибо, ваш ответ учтён</div>}
                                        </div>
                                        <span className="chat-interv-time">{m.time}</span>
                                      </div>
                                    );
                                  }
                                  if (m.type === 'user') {
                                    return (
                                      <div key={m.id} className="chat-proto-msg user">
                                        <div className="chat-proto-bubble">
                                          <span className="chat-proto-text">{m.text}</span>
                                          <span className="chat-interv-time">{m.time}</span>
                                        </div>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={m.id} className="chat-proto-msg bot">
                                      <div className="chat-proto-bubble">
                                        <span className="chat-proto-text" dangerouslySetInnerHTML={{ __html: renderMsgText(m.text) }} />
                                        <span className="chat-interv-time">{m.time}</span>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                              {chatProtoLoading && (
                                <div className="chat-proto-msg bot">
                                  <div className="chat-proto-bubble"><span className="chat-proto-text">...</span></div>
                                </div>
                              )}
                            </div>
                            <div className="chat-proto-input-row">
                              <input
                                type="text"
                                className="chat-proto-input"
                                placeholder="Напишите сообщение..."
                                value={chatProtoInput}
                                onChange={e => setChatProtoInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleChatProtoSend(); }}
                              />
                              <button className="chat-proto-send" onClick={handleChatProtoSend} disabled={!chatProtoInput.trim()}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <img src={`/screens/${chatActiveScreen.file}`} alt={chatActiveScreen.name} className="chat-screen-viewer-img" />
                            <div className="chat-screen-viewer-desc">{chatActiveScreen.desc}</div>
                            {chatActiveScreen.useCases && chatActiveScreen.useCases.length > 0 && (
                              <div className="chat-screen-msg-tags">
                                <span className="chat-screen-tag-group usecase">UC</span>
                                {chatActiveScreen.useCases.map(u => <span key={u} className="chat-screen-tag usecase" title={useCaseLabels[u]}>UC-0{u}</span>)}
                              </div>
                            )}
                            {chatActiveScreen.cjms && chatActiveScreen.cjms.length > 0 && (
                              <div className="chat-screen-msg-tags">
                                <span className="chat-screen-tag-group cjm">CJM</span>
                                {chatActiveScreen.cjms.map(c => <span key={c} className="chat-screen-tag cjm" title={cjmLabels[c]}>CJM-0{c}</span>)}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {chatInlineMode === 'profile' && (
                    <div className="chat-diary-form" key="chat-profile">
                      <div className="chat-diary-header">
                        <span className="chat-diary-title">👤 Профиль</span>
                        <button className="chat-diag-close" onClick={() => setChatInlineMode('none')}>×</button>
                      </div>
                      <div className="chat-diary-body">
                        <div className="chat-profile-row"><span className="chat-profile-label">Имя</span><span className="chat-profile-value">{profile?.name || '—'}</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">ID</span><span className="chat-profile-value">{profileId || '—'}</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Возраст</span><span className="chat-profile-value">{profile?.demographics?.age || '—'} лет</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Пол</span><span className="chat-profile-value">{profile?.demographics?.sex === 'male' ? 'М' : 'Ж'}</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Вес</span><span className="chat-profile-value">{profile?.anthropometrics?.weight_kg || '—'} кг</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Рост</span><span className="chat-profile-value">{profile?.anthropometrics?.height_cm || '—'} см</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">ИМТ</span><span className="chat-profile-value">{profile?.anthropometrics?.bmi || '—'}</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Healora Score</span><span className="chat-profile-value">{profile?.digital_twin_scores?.current_stars || 0} ⭐</span></div>
                        <div className="chat-profile-row"><span className="chat-profile-label">Риск</span><span className={`chat-profile-value risk-${profile?.digital_twin_scores?.risk_level || 'unknown'}`}>{profile?.digital_twin_scores?.risk_level || '—'}</span></div>
                      </div>
                    </div>
                  )}
                  {chatInlineMode === 'plan' && (
                    <div className="chat-diary-form" key="chat-plan">
                      <div className="chat-diary-header">
                        <span className="chat-diary-title">📋 План интервенций</span>
                        <button className="chat-diag-close" onClick={() => setChatInlineMode('none')}>×</button>
                      </div>
                      <div className="chat-diary-body">
                        {timelineInterventions.length === 0 ? (
                          <div className="chat-plan-empty">Нет запланированных интервенций</div>
                        ) : (
                          [...new Set(timelineInterventions.map(i => i.code))].map(code => {
                            const items = timelineInterventions.filter(i => i.code === code);
                            const item = items[0];
                            const catColors = { sleep: '#2196f3', physical: '#4caf50', mental: '#9c27b0', food: '#ff9800', medical: '#f44336', supplement: '#795548' };
                            return (
                              <div key={code} className="chat-plan-item" style={{ borderLeftColor: catColors[item.category] || '#6b21c8' }}>
                                <div className="chat-plan-item-top">
                                  <span className="chat-plan-item-name">{item.name}</span>
                                  <span className="chat-plan-item-code">{code}</span>
                                </div>
                                <div className="chat-plan-item-days">
                                  {items.map(i => (
                                    <span key={i.day} className="chat-plan-day-badge" style={{ backgroundColor: i.day <= simulationDay ? (catColors[item.category] || '#6b21c8') : '#e0e0e0', color: i.day <= simulationDay ? '#fff' : '#999' }}>
                                      Д{i.day}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                  {chatInlineMode === 'diary' && chatDiaryData && (() => {
                    const form = chatDiaryData;
                    const updateMeal = (idx, field, val) => {
                      const m = [...form.meals]; m[idx] = { ...m[idx], [field]: val };
                      setChatDiaryData({ ...form, meals: m });
                    };
                    const handlePhoto = (idx, file) => {
                      if (!file) return;
                      const r = new FileReader();
                      r.onload = () => updateMeal(idx, 'photo', r.result);
                      r.readAsDataURL(file);
                    };
                    const submitChatDiary = () => {
                      const cals = form.meals.reduce((s, m) => s + (Number(m.calories) || 0), 0);
                      const prot = form.meals.reduce((s, m) => s + (Number(m.protein) || 0), 0);
                      const summary = `📋 День ${form.day}: ${cals} ккал, ${prot}г белка, вода ${form.waterMl}мл`;
                      setChatMessages(prev => [...prev, {
                        id: `diary_${Date.now()}`,
                        type: 'diary',
                        day: form.day,
                        text: summary,
                        user: true,
                        time: new Date().toLocaleTimeString(),
                      }]);
                      setDiaryData(form);
                      setDiaryDay(form.day);
                      setShowDiary(true);
                      setChatDiaryActive(false);
                      setChatDiaryData(null);
                    };
                    return (
                      <div className="chat-diary-form" key="chat-diary">
                        <div className="chat-diary-header">
                          <span className="chat-diary-title">📋 Дневник питания</span>
                          <span className="chat-diary-day">
                            День
                            <button className="chat-diary-day-btn" onClick={() => { const d = form.day - 1; if (d >= 0) { setChatDiaryData({ ...form, day: d }); setChatDiaryDay(d); } }} disabled={form.day <= 0}>−</button>
                            <span className="chat-diary-day-val">{form.day}</span>
                            <button className="chat-diary-day-btn" onClick={() => { const d = form.day + 1; if (d <= 30) { setChatDiaryData({ ...form, day: d }); setChatDiaryDay(d); } }} disabled={form.day >= 30}>+</button>
                          </span>
                        </div>
                        {form.meals.map((meal, idx) => (
                          <div key={meal.type} className="chat-diary-meal">
                            <div className="chat-diary-meal-header">{meal.label}</div>
                            <div className="chat-diary-meal-fields">
                              <input className="chat-diary-input" placeholder="🔍 Описание" value={meal.description} onChange={e => updateMeal(idx, 'description', e.target.value)} />
                              <input className="chat-diary-input sm" placeholder="ккал" type="number" value={meal.calories} onChange={e => updateMeal(idx, 'calories', e.target.value)} />
                              <input className="chat-diary-input sm" placeholder="белки" type="number" value={meal.protein} onChange={e => updateMeal(idx, 'protein', e.target.value)} />
                              <input className="chat-diary-input sm" placeholder="жиры" type="number" value={meal.fat} onChange={e => updateMeal(idx, 'fat', e.target.value)} />
                              <input className="chat-diary-input sm" placeholder="углеводы" type="number" value={meal.carbs} onChange={e => updateMeal(idx, 'carbs', e.target.value)} />
                              <label className="chat-diary-photo-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                <input type="file" accept="image/*" hidden onChange={e => { handlePhoto(idx, e.target.files[0]); e.target.value = ''; }} />
                              </label>
                              {meal.photo && <img src={meal.photo} className="chat-diary-photo-preview" alt="" />}
                            </div>
                          </div>
                        ))}
                        <div className="chat-diary-row">
                          <span className="chat-diary-label">💧 Вода</span>
                          <input className="chat-diary-input" placeholder="мл" type="number" value={form.waterMl || ''} onChange={e => setChatDiaryData({ ...form, waterMl: Number(e.target.value) })} />
                        </div>
                        <div className="chat-diary-row">
                          <span className="chat-diary-label">😊 Самочувствие</span>
                          <div className="chat-diary-mood">
                            {['energy','mood','sleep','stress','digestion'].map(key => (
                              <select key={key} className="chat-diary-select" value={form.mood[key]} onChange={e => setChatDiaryData({ ...form, mood: { ...form.mood, [key]: e.target.value } })}>
                                <option value="">{key}</option>
                                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                              </select>
                            ))}
                          </div>
                        </div>
                        <button className="chat-diary-submit" onClick={submitChatDiary}>✓ Сохранить</button>
                      </div>
                    );
                  })()}
                  {chatInlineMode === 'food' && (
                    <div className="chat-diary-form" key="chat-food">
                      <div className="chat-diary-header">
                        <span className="chat-diary-title">📸 Фото еды</span>
                        <button className="chat-diag-close" onClick={() => setChatInlineMode('none')}>×</button>
                      </div>
                      <div className="chat-diary-body">
                        <label className="chat-food-upload">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          <span>Загрузить фото еды</span>
                          <input type="file" accept="image/*" hidden onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const r = new FileReader();
                            r.onload = () => setChatPhotoPreview(r.result);
                            r.readAsDataURL(file);
                            e.target.value = '';
                          }} />
                        </label>
                        {chatPhotoPreview && (
                          <div className="chat-food-preview-wrap">
                            <img src={chatPhotoPreview} className="chat-food-preview-img" alt="food" />
                            <button className="chat-food-remove" onClick={() => setChatPhotoPreview(null)}>×</button>
                          </div>
                        )}
                        <button className="chat-diary-submit" onClick={() => {
                          if (!chatPhotoPreview) return;
                          setChatMessages(prev => [...prev, {
                            id: `food_${Date.now()}`,
                            type: 'food',
                            day: simulationDay,
                            text: '📸 Фото еды загружено',
                            photo: chatPhotoPreview,
                            user: true,
                            time: new Date().toLocaleTimeString(),
                          }]);
                          if (chatDiaryData && chatInlineMode === 'food') {
                            const emptyMeal = chatDiaryData.meals.findIndex(m => !m.photo);
                            if (emptyMeal >= 0) {
                              const m = [...chatDiaryData.meals];
                              m[emptyMeal] = { ...m[emptyMeal], photo: chatPhotoPreview };
                              setChatDiaryData({ ...chatDiaryData, meals: m });
                            }
                          }
                          setChatPhotoPreview(null);
                          setChatInlineMode('none');
                        }}>✓ Отправить в чат</button>
                      </div>
                    </div>
                  )}
                  {chatScreenPreview !== null && (() => {
                    const s = prototypeScreens[chatScreenPreview];
                    return (
                      <div className="chat-screen-overlay" onClick={() => setChatScreenPreview(null)}>
                        <div className="chat-screen-lightbox" onClick={e => e.stopPropagation()}>
                          <button className="chat-screen-lb-close" onClick={() => setChatScreenPreview(null)}>×</button>
                          <div className="chat-screen-lb-header">Экран {s.num}. {s.name}</div>
                          <div className="chat-screen-lb-desc">{s.desc}</div>
                          {s.useCases && s.useCases.length > 0 && (
                            <div className="chat-screen-lb-tags">
                              <span className="chat-screen-tag-group usecase">UC</span>
                              {s.useCases.map(u => <span key={u} className="chat-screen-tag usecase" title={useCaseLabels[u]}>UC-0{u} {useCaseLabels[u]}</span>)}
                            </div>
                          )}
                          {s.cjms && s.cjms.length > 0 && (
                            <div className="chat-screen-lb-tags">
                              <span className="chat-screen-tag-group cjm">CJM</span>
                              {s.cjms.map(c => <span key={c} className="chat-screen-tag cjm" title={cjmLabels[c]}>CJM-0{c} {cjmLabels[c]}</span>)}
                            </div>
                          )}
                          <img src={`/screens/${s.file}`} alt={s.name} className="chat-screen-lb-img" />
                          <div className="chat-screen-lb-nav">
                            <button className="chat-screen-lb-btn" disabled={chatScreenPreview === 0} onClick={() => setChatScreenPreview(chatScreenPreview - 1)}>← Пред.</button>
                            <span className="chat-screen-lb-counter">{chatScreenPreview + 1} / {prototypeScreens.length}</span>
                            <button className="chat-screen-lb-btn" disabled={chatScreenPreview === prototypeScreens.length - 1} onClick={() => setChatScreenPreview(chatScreenPreview + 1)}>След. →</button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  {showMenuPopup && (() => {
                    const handleSelect = s => {
                      if (s.num === 1) { navigate('/profile'); setShowMenuPopup(false); return; }
                      if (s.num === 6) { navigate('/diary'); setShowMenuPopup(false); return; }
                      setChatActiveScreen(s);
                      setShowMenuPopup(false);
                    };
                    return (
                      <div className="chat-screen-overlay menu-popup" onClick={() => setShowMenuPopup(false)}>
                        <div className="chat-menu-popup" onClick={e => e.stopPropagation()}>
                          <button className="chat-screen-lb-close" onClick={() => setShowMenuPopup(false)}>×</button>
                          <div className="chat-menu-header">📱 Меню прототипов экранов</div>
                          <div className="chat-menu-grid">
                            {prototypeScreens.map((s, i) => (
                              <button key={s.num} className="chat-menu-badge" onClick={() => handleSelect(s)}>
                                <span className="chat-menu-badge-num">{s.num}</span>
                                <span className="chat-menu-badge-name">{s.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  {isSimulating && (
                    <div className="chat-typing">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  )}
                  </>
                  )}
                </div>
                <div className="chat-actions-bar">
                  <button className="chat-action-btn" onClick={() => setChatInlineMode(chatInlineMode === 'profile' ? 'none' : 'profile')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Профиль</button>
                  <button className="chat-action-btn" onClick={() => setChatInlineMode(chatInlineMode === 'plan' ? 'none' : 'plan')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> План</button>
                  <button className="chat-action-btn" onClick={() => {
                    if (chatInlineMode === 'diary') { setChatInlineMode('none'); setChatDiaryData(null); return; }
                    setChatInlineMode('diary');
                    setChatDiaryDay(chatDiaryDay ?? simulationDay);
                    setChatDiaryData(defaultDiaryData(chatDiaryDay ?? simulationDay));
                  }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Дневник</button>
                  <button className="chat-action-btn" onClick={() => setChatInlineMode(chatInlineMode === 'food' ? 'none' : 'food')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Фото еды</button>
                  <button className="chat-action-btn" onClick={() => setShowMenuPopup(true)} style={{ borderLeftColor: '#6b21c8' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="2"/><path d="M7 3h10l2 4-2 4H7l-2-4 2-4z"/></svg> Меню</button>
                </div>
                <div className="chat-input-bar">
                  <input type="text" className="chat-input" ref={chatInputRef} placeholder="Напишите сообщение..." defaultValue="" onKeyDown={e => { if (e.key === 'Enter') handleChatSend(); }} />
                  <button className="chat-send-btn" onClick={handleChatSend}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showVoicePopup && (
            <div className="voice-overlay" onClick={() => { if (voiceStatus !== 'recording') { stopMicMonitor(); setShowVoicePopup(false); setVoiceStatus('idle'); setVoiceTranscript(''); setVoiceParsedValues([]); setVoiceFormValues({}); setVoiceError(''); setVoiceSpeaking(false); setShowVoiceSettings(false); } }}>
              <div className="voice-popup" onClick={e => e.stopPropagation()}>
                <button className="voice-close" onClick={() => { if (voiceStatus !== 'recording') { stopMicMonitor(); setShowVoicePopup(false); setVoiceStatus('idle'); setVoiceTranscript(''); setVoiceParsedValues([]); setVoiceFormValues({}); setVoiceError(''); setVoiceSpeaking(false); setShowVoiceSettings(false); } }}>×</button>
                <div className="voice-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6b21c8" strokeWidth="2" width="24" height="24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                  <h3>Редактор параметров</h3>
                </div>
                <p className="voice-desc">Заполните раздел <strong>«{attributeCatalog[voiceSection]?.title || voiceSection}»</strong> голосом. {getVoiceHint(voiceSection)}</p>

                {voiceError && (
                  <div className="voice-error-banner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{voiceError}</span>
                  </div>
                )}

                <div className="voice-top-bar">
                  <div className="voice-top-right">
                    {voiceStatus === 'recording' && (
                      <span className="voice-rec-indicator">
                        <span className={`voice-rec-dot ${voiceSpeaking ? 'speaking' : ''}`}></span>
                        {voiceSpeaking ? 'Голос' : '...'}
                      </span>
                    )}
                    <button className="voice-settings-gear" onClick={() => {
                      const next = !showVoiceSettings;
                      setShowVoiceSettings(next);
                      if (next) {
                        if (voiceMicDevices.length === 0) enumerateMics();
                        if (voiceMicDeviceId) setTimeout(() => startMicMonitor(voiceMicDeviceId), 100);
                      } else {
                        stopMicMonitor();
                      }
                    }} title="Настройки микрофона">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                      </svg>
                    </button>
                    {showVoiceSettings && (
                      <div className="voice-settings-dropdown">
                        <div className="voice-settings-item">
                          <span className="voice-settings-label">Язык распознавания</span>
                          <select className="voice-settings-select" value={voiceLang} onChange={e => setVoiceLang(e.target.value)}>
                            <option value="ru-RU">Русский</option>
                            <option value="en-US">English</option>
                            <option value="de-DE">Deutsch</option>
                            <option value="fr-FR">Français</option>
                            <option value="es-ES">Español</option>
                            <option value="it-IT">Italiano</option>
                            <option value="zh-CN">中文</option>
                            <option value="ja-JP">日本語</option>
                          </select>
                        </div>
                        <div className="voice-settings-item">
                          <span className="voice-settings-label">Микрофон</span>
                          <div className="voice-settings-mic-row">
                            <select className="voice-settings-select" value={voiceMicDeviceId} onChange={e => handleMicDeviceChange(e.target.value)}>
                              {voiceMicDevices.length === 0 && <option value="">{voiceMicLoading ? 'Загрузка...' : 'Не найдены'}</option>}
                              {voiceMicDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || `Микрофон ${d.deviceId.slice(0, 8)}...`}</option>
                              ))}
                            </select>
                            <button className="voice-settings-refresh" onClick={enumerateMics} title="Обновить">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                            </button>
                          </div>
                          {voiceMonitorActive && (
                            <div className="voice-level-meter">
                              <div className="voice-level-bar"><div className="voice-level-fill" style={{ width: `${voiceLevel}%`, background: voiceLevel > 60 ? '#4caf50' : voiceLevel > 20 ? '#ff9800' : '#9e9e9e' }}></div></div>
                              <span className="voice-level-label">{voiceLevel}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {voiceTranscript && (
                  <div className="voice-transcript-section">
                    <textarea
                      className="voice-transcript-input"
                      value={voiceTranscript}
                      onChange={e => {
                        setVoiceTranscript(e.target.value);
                        const parsed = parseVoiceTranscript(e.target.value, voiceSection);
                        setVoiceParsedValues(parsed);
                        setVoiceFormValues(prev => {
                          const updated = { ...prev };
                          parsed.forEach(pv => { updated[pv.attrId] = pv.value; });
                          return updated;
                        });
                      }}
                      rows={2}
                      placeholder=""
                    />
                  </div>
                )}

                {voiceStatus === 'idle' && (
                  <div className="voice-idle">
                    <button className="voice-record-big" onClick={handleStartRecording}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                      <span>Начать запись</span>
                    </button>
                    <p className="voice-hint">Нажмите кнопку и продиктуйте значения параметров раздела</p>
                  </div>
                )}

                {voiceStatus === 'recording' && (
                  <div className="voice-recording">
                    <div className="voice-pulse">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#6b21c8" strokeWidth="2" width="32" height="32">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                    </div>
                    <span className="voice-rec-label">Запись...</span>
                    <button className="voice-stop-btn" onClick={handleStopRecording}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                      Остановить
                    </button>
                  </div>
                )}

                {(() => {
                  const section = attributeCatalog[voiceSection];
                  const attrs = section ? section.attributes : [];
                  const changedCount = Object.entries(voiceFormValues).filter(([k, v]) => {
                    if (v === '') return false;
                    const attrDef = attrs.find(a => a.id === k);
                    if (!attrDef) return false;
                    return v != attrDef.current;
                  }).length;
                  const detectedIds = new Set(voiceParsedValues.map(pv => pv.attrId));
                  return (
                    <div className="voice-form-section">
                      <label className="voice-section-label">Параметры раздела «{section?.title || ''}»</label>
                      <div className="voice-form-list">
                        {attrs.map(attr => {
                          const isDetected = detectedIds.has(attr.id);
                          const val = voiceFormValues[attr.id] !== undefined ? String(voiceFormValues[attr.id]) : '';
                          const isChanged = val !== '' && val != attr.current;
                          return (
                            <div key={attr.id} className={`voice-form-row ${isDetected ? 'detected' : ''} ${isChanged ? 'changed' : ''} ${val ? 'filled' : ''}`}>
                              <span className="voice-form-label">{attr.name}</span>
                              <div className="voice-form-input-wrap">
                                <input
                                  className="voice-form-input"
                                  type="text"
                                  placeholder={attr.unit ? `введите ${attr.unit}` : 'введите значение'}
                                  value={val}
                                  onChange={e => setVoiceFormValues(prev => ({ ...prev, [attr.id]: e.target.value }))}
                                />
                                {isDetected && <span className="voice-form-badge">✓</span>}
                              </div>
                              <span className="voice-form-orig">{formatAttrValue(getAttrCurrent(attr))}</span>
                              <button className="voice-form-mic" title="Продиктовать" onClick={() => {
                                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
                                const sr = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                                sr.lang = voiceLang;
                                sr.interimResults = false;
                                sr.onresult = (ev) => {
                                  const text = ev.results[0][0].transcript;
                                  setVoiceFormValues(prev => ({ ...prev, [attr.id]: text }));
                                };
                                sr.start();
                              }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="voice-actions">
                        <button className="voice-done-btn" onClick={() => { stopMicMonitor(); setShowVoicePopup(false); setVoiceStatus('idle'); setVoiceTranscript(''); setVoiceParsedValues([]); setVoiceFormValues({}); setVoiceError(''); setVoiceSpeaking(false); setShowVoiceSettings(false); }}>Отмена</button>
                        <button
                          className="voice-apply-btn"
                          disabled={changedCount === 0}
                          onClick={() => {
                            stopMicMonitor();
                            const parsed = Object.entries(voiceFormValues)
                              .filter(([, v]) => v !== '')
                              .map(([attrId, value]) => {
                                const attrDef = attrs.find(a => a.id === attrId);
                                const numVal = parseFloat(String(value).replace(',', '.'));
                                const finalVal = isNaN(numVal) ? value : numVal;
                                return { attrId, value: finalVal, label: attrDef?.name || attrId, displayValue: attrDef?.unit ? `${finalVal} ${attrDef.unit}` : String(finalVal) };
                              });
                            applyVoiceValues(voiceSection, parsed);
                            setShowVoicePopup(false);
                            setVoiceStatus('idle');
                            setVoiceTranscript('');
                            setVoiceParsedValues([]);
                            setVoiceFormValues({});
                            setVoiceError('');
                            setVoiceSpeaking(false);
                            setShowVoiceSettings(false);
                          }}
                        >
                          Применить ({changedCount})
                        </button>
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          )}

          {practicePopup && (
            <div className="practice-overlay" onClick={() => setPracticePopup(null)}>
              <div className="practice-popup" onClick={e => e.stopPropagation()}>
                <button className="practice-close" onClick={() => setPracticePopup(null)}>×</button>
                {practicePopup.regulatory && (
                  <div className="practice-regulatory">
                    <span className="reg-label">Нормативная база:</span>
                    <span className="reg-text">{practicePopup.regulatory}</span>
                  </div>
                )}
                <div className="practice-content" dangerouslySetInnerHTML={{ __html: practiceMdToHtml(practicePopup.content) }} />
              </div>
            </div>
          )}
          {dietPrefPopup && (
            <div className="practice-overlay" onClick={() => setDietPrefPopup(null)}>
              <div className="practice-popup" onClick={e => e.stopPropagation()}>
                <button className="practice-close" onClick={() => setDietPrefPopup(null)}>×</button>
                <div className="practice-content" dangerouslySetInnerHTML={{ __html: practiceMdToHtml(dietPrefPopup.content) }} />
              </div>
            </div>
          )}
          {restrictionPopup && (
            <div className="practice-overlay" onClick={() => setRestrictionPopup(null)}>
              <div className="practice-popup" onClick={e => e.stopPropagation()}>
                <button className="practice-close" onClick={() => setRestrictionPopup(null)}>×</button>
                <div className="practice-content" dangerouslySetInnerHTML={{ __html: practiceMdToHtml(restrictionPopup.content) }} />
              </div>
            </div>
          )}
        </>

      )}

      {profile && phoneOverlayTab !== 'none' && (
        <PhoneSimulator
          profile={profile}
          profileId={profileId}
          phoneOverlayTab={phoneOverlayTab}
          setPhoneOverlayTab={setPhoneOverlayTab}
          chatMessages={chatMessages}
          simulationDay={simulationDay}
          plans={plans}
          fallbackProfiles={fallbackProfiles}
          planTemplateId={planTemplateId} setPlanTemplateId={setPlanTemplateId}
          planDoctorNote={planDoctorNote} setPlanDoctorNote={setPlanDoctorNote}
          planStatus={planStatus} setPlanStatus={setPlanStatus}
          timelineInterventions={timelineInterventions}
          removeIntervention={removeIntervention}
          interventionCatalog={interventionCatalog}
          planTemplates={planTemplates}
          getTemplateById={getTemplateById}
          savePlan={savePlan}
          onCreatePlan={createPlanByCategories}
        />
      )}
    </div>
  );
};

function practiceMdToHtml(md) {
  const lines = md.split('\n');
  const parts = [];
  let inTable = false;
  let tableAcc = [];
  let inList = false;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function inlineHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, (_, m) => '<strong>' + esc(m) + '</strong>')
      .replace(/`([^`]+)`/g, (_, m) => '<code>' + esc(m) + '</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => '<a href="' + esc(u) + '" target="_blank">' + esc(t) + '</a>');
  }
  function escInline(text) {
    return inlineHtml(esc(text));
  }
  function closeTable() {
    if (!inTable) return;
    if (tableAcc.length > 0) {
      parts.push('<table>');
      tableAcc.forEach((row, ri) => {
        if (ri === 0) {
          parts.push('<thead><tr>' + row.map(c => '<th>' + esc(c) + '</th>').join('') + '</tr></thead><tbody>');
        } else {
          parts.push('<tr>' + row.map(c => '<td>' + escInline(c) + '</td>').join('') + '</tr>');
        }
      });
      parts.push('</tbody></table>');
    }
    inTable = false;
    tableAcc = [];
  }
  function closeList() {
    if (inList) { parts.push('</ul>'); inList = false; }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) { closeTable(); closeList(); continue; }

    if (line.startsWith('# ') && !line.startsWith('## ')) {
      closeTable(); closeList();
      parts.push('<h1>' + esc(line.slice(2)) + '</h1>');
      continue;
    }
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      closeTable(); closeList();
      parts.push('<h2>' + esc(line.slice(3)) + '</h2>');
      continue;
    }
    if (line.startsWith('### ')) {
      closeTable(); closeList();
      const h3text = line.slice(4);
      if (h3text.startsWith('Category:')) {
        parts.push('<div class="practice-category">' + esc(h3text) + '</div>');
      } else {
        parts.push('<h3>' + esc(h3text) + '</h3>');
      }
      continue;
    }
    if (line.trim() === '---') { closeTable(); closeList(); continue; }

    if (line.startsWith('|')) {
      closeList();
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.length && cells.every(c => /^[-:\s]+$/.test(c))) continue;
      inTable = true;
      tableAcc.push(cells);
      continue;
    }

    if (line.startsWith('- ')) {
      closeTable();
      if (!inList) { parts.push('<ul>'); inList = true; }
      parts.push('<li>' + escInline(line.slice(2)) + '</li>');
      continue;
    }

    closeTable(); closeList();
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      parts.push('<p class="practice-footer">' + escInline(line.slice(1, -1)) + '</p>');
    } else {
      parts.push('<p>' + escInline(line) + '</p>');
    }
  }
  closeTable(); closeList();
  return parts.join('\n');
}

export default DigitalTwin;
