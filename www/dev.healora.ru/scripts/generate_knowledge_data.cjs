const fs = require('fs');
const path = require('path');

const DOMAIN = 'E:\\_dev\\55.Skoltech\\56.AIMLEI-2026\\healora.ru\\docs\\domain\\knowledge';
const OUT = 'E:\\_dev\\55.Skoltech\\56.AIMLEI-2026\\healora.ru\\www\\dev.healora.ru\\public\\data\\knowledge';

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ---- helpers ----
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function readDir(p) { return fs.readdirSync(p, { withFileTypes: true }); }
function slug(s) { return s.toLowerCase().replace(/[^a-zа-яё0-9]+/g, '_').replace(/^_|_$/g, ''); }

// ---- 1. SUPPLEMENTS ----
const supDir = path.join(DOMAIN, 'supplements');
const supCats = readDir(supDir).filter(d => d.isDirectory());
const supplements = [];
for (const cat of supCats) {
  const catDir = path.join(supDir, cat.name);
  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(catDir, file), 'utf8');
    const h1 = content.match(/^# (.+)/m);
    const desc = content.match(/^## .*?(?:\\n|$)(.+?)(?:\\n##|$)/ms);
    supplements.push({
      id: file.replace('.md', ''),
      name_ru: h1 ? h1[1].trim() : file.replace('.md', ''),
      category: slug(cat.name),
      category_ru: cat.name,
      description: desc ? desc[1].trim().slice(0, 200) : ''
    });
  }
}
fs.writeFileSync(path.join(OUT, 'supplements.json'), JSON.stringify(supplements, null, 2));
console.log(`supplements: ${supplements.length} items`);

// ---- 2. VITAMINS + MINERALS + VITAMIN_LIKE ----
const vitamins = readJson(path.join(DOMAIN, 'vitamins', 'data.json'));
const vLike = readJson(path.join(DOMAIN, 'vitamin_like', 'data.json'));

// Minerals: scan .md files
const minDir = path.join(DOMAIN, 'minerals');
const minerals = [];
for (const f of fs.readdirSync(minDir).filter(f => f.endsWith('.md'))) {
  const content = fs.readFileSync(path.join(minDir, f), 'utf8');
  const h1 = content.match(/^# (.+)/m);
  const nameEn = content.match(/\\((.+?)\\)/);
  minerals.push({
    id: f.replace('.md', ''),
    name_ru: h1 ? h1[1].trim() : f.replace('.md', ''),
    name_en: nameEn ? nameEn[1].trim() : '',
    category: 'mineral',
    type: 'Минерал',
    description: content.split('\\n\\n')[1]?.replace(/\n/g, ' ').trim().slice(0, 200) || ''
  });
}
const vitMin = [
  ...vitamins.map(v => ({
    id: v.id, name_ru: v.name_ru, name_en: v.name_en,
    category: 'vitamin', type: 'Витамин',
    functions: v.functions?.slice(0, 3) || [],
    description: (v.functions||[]).join('; ').slice(0, 200)
  })),
  ...minerals.map(m => ({ ...m, functions: [] })),
  ...vLike.map(v => ({
    id: v.id, name_ru: v.name_ru, name_en: v.name_en,
    category: 'vitamin_like', type: 'Витаминоподобное',
    functions: v.functions?.slice(0, 3) || [],
    description: (v.functions||[]).join('; ').slice(0, 200)
  }))
];
fs.writeFileSync(path.join(OUT, 'vitamins_minerals.json'), JSON.stringify(vitMin, null, 2));
console.log(`vitamins_minerals: ${vitMin.length} items`);

// ---- 3. DIETS ----
const diets = readJson(path.join(DOMAIN, 'diets', 'data.json'));
// Add diet_preferences .md files
const prefDir = path.join(DOMAIN, 'diet_preferences');
const prefs = [];
for (const f of fs.readdirSync(prefDir).filter(f => f.endsWith('.md'))) {
  const content = fs.readFileSync(path.join(prefDir, f), 'utf8');
  const h1 = content.match(/^# (.+)/m);
  const desc = content.match(/^## .*?(?:\\n|$)(.+?)(?:\\n##|$)/ms);
  prefs.push({
    id: f.replace('.md', ''),
    name_ru: h1 ? h1[1].trim() : f.replace('.md', ''),
    type: 'preference',
    goal: desc ? desc[1].trim().slice(0, 150) : 'Предпочтение в питании',
    indications: []
  });
}
const allDiets = [
  ...diets.map(d => ({ id: d.id, name_ru: d.name_ru, name_en: d.name_en, type: 'diet', goal: d.goal, indications: d.indications || [] })),
  ...prefs.map(p => ({ ...p, name_en: '' }))
];
fs.writeFileSync(path.join(OUT, 'diets.json'), JSON.stringify(allDiets, null, 2));
console.log(`diets: ${allDiets.length} items`);

// ---- 4. INTERVENTIONS ----
const intCat = readJson(path.join(DOMAIN, 'intervention', 'interventions_catalog.json'));
const cats = intCat.categories || {};
const interventions = Object.entries(intCat.interventions || {}).map(([code, v]) => ({
  id: code,
  code: v.code,
  name_ru: v.name,
  category: v.category,
  category_ru: (cats[v.category] || {}).name || v.category,
  impact: v.impact,
  evidence: v.evidence,
  type: v.type,
  description: v.short_description || '',
  benefits: (v.benefits || []).slice(0, 3)
}));
fs.writeFileSync(path.join(OUT, 'interventions.json'), JSON.stringify(interventions, null, 2));
console.log(`interventions: ${interventions.length} items`);

// ---- 5. TTM ----
const ttm = [
  { id: 'precontemplation', name_ru: 'Precontemplation (Предразмышление)', stage: 1, readiness: 0.1, desc: 'Пользователь не осознаёт проблему и не планирует менять поведение. Необходима информационная поддержка и повышение осведомлённости.' },
  { id: 'contemplation', name_ru: 'Contemplation (Размышление)', stage: 2, readiness: 0.3, desc: 'Пользователь осознаёт проблему, рассматривает изменения, но не готов действовать. Требуется мотивация и взвешивание выгод/барьеров.' },
  { id: 'preparation', name_ru: 'Preparation (Подготовка)', stage: 3, readiness: 0.6, desc: 'Пользователь намерен действовать в ближайшее время. Нужен конкретный план, дизайн среды, микро-привычки.' },
  { id: 'action', name_ru: 'Action (Действие)', stage: 4, readiness: 1.0, desc: 'Пользователь активно внедряет изменения. Требуется поддержка, трекинг, социальное подкрепление.' },
  { id: 'maintenance', name_ru: 'Maintenance (Поддержание)', stage: 5, readiness: 0.8, desc: 'Пользователь удерживает изменения >6 мес. Профилактика срывов, адаптация к новым условиям.' }
];
fs.writeFileSync(path.join(OUT, 'ttm.json'), JSON.stringify(ttm, null, 2));
console.log(`ttm: ${ttm.length} items`);

// ---- 6. ATOMIC HABITS ----
const ah = [
  { id: 'make_obvious', name_ru: 'Сделай очевидным', name_en: 'Make it obvious', desc: 'Хорошая привычка должна бросаться в глаза. Визуальные якоря, контекстная привязка, магнитные триггеры.', examples: ['Фрукты на столе', 'Вода на рабочем столе', 'Коврик для зарядки на полу'] },
  { id: 'make_attractive', name_ru: 'Сделай привлекательным', name_en: 'Make it attractive', desc: 'Свяжи полезное с приятным. Красивая посуда, музыка во время готовки, ритуал вместо рутины.', examples: ['Бег = встреча с подругой', 'Подкаст во время прогулки', 'Красивая тарелка-боул'] },
  { id: 'make_easy', name_ru: 'Сделай лёгким', name_en: 'Make it easy', desc: 'Убери барьеры, сократи шаги до минимума. Овощи помыты и нарезаны, порционные контейнеры.', examples: ['Спортформа надета с вечера', 'Овощи нарезаны заранее', 'Список покупок готов'] },
  { id: 'make_satisfying', name_ru: 'Сделай удовлетворяющим', name_en: 'Make it satisfying', desc: 'Быстрая награда за действие. Трекер галочек, streak, маленькая не-еда-награда.', examples: ['Галочка в календаре', 'Streak в трекере', 'Социальное одобрение'] }
];
fs.writeFileSync(path.join(OUT, 'atomic_habits.json'), JSON.stringify(ah, null, 2));
console.log(`atomic_habits: ${ah.length} items`);

// ---- 7. FOOD & SUPERFOODS ----
const foodDir = path.join(DOMAIN, 'food');
const foods = [];
for (const f of fs.readdirSync(foodDir).filter(f => f.endsWith('.json') && !f.startsWith('__'))) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(foodDir, f), 'utf8'));
    foods.push({
      id: f.replace('.json', ''),
      name_ru: d.name || d.meal_name || d.title || f.replace('.json', ''),
      category: 'food',
      calories: d.calories || d.nutrition?.calories || null,
      keywords: d.keywords || d.tags || []
    });
  } catch(e) { /* skip bad json */ }
}
const supFoodDir = path.join(DOMAIN, 'superfoods');
const superfoods = [];
for (const f of fs.readdirSync(supFoodDir).filter(f => f.endsWith('.md'))) {
  const content = fs.readFileSync(path.join(supFoodDir, f), 'utf8');
  const h1 = content.match(/^# (.+)/m);
  superfoods.push({
    id: f.replace('.md', ''),
    name_ru: h1 ? h1[1].trim() : f.replace('.md', ''),
    category: 'superfood',
    description: content.split('\n\n')[1]?.replace(/\n/g, ' ').trim().slice(0, 200) || ''
  });
}
const foodAll = [...foods, ...superfoods];
fs.writeFileSync(path.join(OUT, 'food.json'), JSON.stringify(foodAll, null, 2));
console.log(`food: ${foodAll.length} items`);

// ---- 8. CUISINES ----
const cuisines = [
  { id: 'mediterranean', name_ru: 'Средиземноморская кухня', desc: 'Оливковое масло, рыба, овощи, бобовые, умеренное вино. Снижение риска ССЗ на 30%.', diets: ['mediterranean_diet'] },
  { id: 'asian', name_ru: 'Азиатская кухня', desc: 'Рис, лапша, овощи, соевые продукты, рыба, водоросли. Низкое содержание насыщенных жиров.', diets: [] },
  { id: 'japanese', name_ru: 'Японская кухня', desc: 'Свежая рыба, рис, водоросли, ферментированные продукты (мисо, натто). Высокое содержание омега-3.', diets: [] },
  { id: 'eastern_european', name_ru: 'Восточноевропейская кухня', desc: 'Каши, ферментированные овощи (квашеная капуста), борщ, ржаной хлеб. Богатство клетчаткой и пробиотиками.', diets: [] },
  { id: 'indian', name_ru: 'Индийская кухня', desc: 'Специи (куркума, имбирь), бобовые (дал), йогурт, овощные карри. Противовоспалительные свойства специй.', diets: [] },
  { id: 'latin', name_ru: 'Латиноамериканская кухня', desc: 'Кукуруза, бобовые, авокадо, перец, томаты. Высокое содержание клетчатки и мононенасыщенных жиров.', diets: [] }
];
fs.writeFileSync(path.join(OUT, 'cuisines.json'), JSON.stringify(cuisines, null, 2));
console.log(`cuisines: ${cuisines.length} items`);

// ---- 9. GENETICS ----
const geneticsContent = fs.readFileSync(path.join(DOMAIN, 'genetics', 'index.md'), 'utf8');
const genetics = [];
const tableRegex = /\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\s*\|/g;
let m;
while ((m = tableRegex.exec(geneticsContent)) !== null) {
  genetics.push({
    id: slug(m[1].trim()),
    name_ru: m[1].trim(),
    function: m[2].trim(),
    impact_desc: m[3].trim(),
    intervention: m[4].trim()
  });
}
fs.writeFileSync(path.join(OUT, 'genetics.json'), JSON.stringify(genetics, null, 2));
console.log(`genetics: ${genetics.length} items`);

// ---- SUMMARY ----
console.log('\\nAll knowledge data files generated in', OUT);
