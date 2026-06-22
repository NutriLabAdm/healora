const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.resolve(__dirname, '..', 'docs', 'domain', 'knowledge');
const CATEGORY_MAP = {
  minerals: 'Минерал',
  vitamins: 'Витамин',
  vitamin_like: 'Витаминоподобное',
  supplements: 'БАД',
  superfoods: 'Суперфуд',
  diets: 'Диета',
  diet_preferences: 'Предпочтение',
  diet_restrictions: 'Ограничение',
  protocols: 'Протокол',
  protocol_obecity: 'Протокол (ожирение)',
  treatment_plans: 'План лечения',
  behavior_design: 'Дизайн поведения',
  environment_design: 'Дизайн среды',
  cjm: 'CJM',
  client_care: 'Ведение клиента',
  interview_design: 'Дизайн интервью',
  psyhotypes: 'Психотипы',
  med_traditional_practices: 'Традиционная практика',
  intervention: 'Интервенция',
  food: 'Питание',
  diary: 'Дневник',
  genetics: 'Генетика',
  drugs: 'Препарат',
};

// ─── Extractors ─────────────────────────────────────────────

function extractTitle(content) {
  const m = content.match(/^# (.+)/m);
  return m ? m[1].trim() : 'Без названия';
}

function extractMetaValue(content, key) {
  const re = new RegExp(`\\*\\*${key}:\\*\\*\\s*(.+)`, 'i');
  const m = content.match(re);
  return m ? m[1].trim() : '';
}

function extractSection(content, heading) {
  const re = new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |\\n---|\\n## Ссылки|\\n## Промпты|$)`, 'i');
  const m = content.match(re);
  return m ? m[0].trim() : '';
}

function extractBullets(section) {
  const bullets = [];
  const re = /[-*]\s*(.+)/g;
  let m;
  while ((m = re.exec(section)) !== null) bullets.push(m[1].trim());
  return bullets;
}

function extractTable(section) {
  const rows = [];
  const lines = section.split('\n');
  let inTable = false;
  for (const line of lines) {
    if (line.trim().startsWith('|') && line.includes('---')) { inTable = false; continue; }
    if (line.trim().startsWith('|')) {
      inTable = true;
      const cells = line.split('|').filter(Boolean).map(c => c.trim());
      if (cells.length >= 2) rows.push(cells);
    }
  }
  return rows;
}

// ─── Template factories ─────────────────────────────────────

function generateNutrientPrompts(title, rda, ul, functions, deficiency, excess, foods, facts, category) {
  const rdaLines = rda ? rda.replace(/\(/g, '\n  (').split('\n').filter(Boolean) : ['400 мг'];
  const topFoods = foods.slice(0, 3).map(r => `${r[0]} — ${r[1]}`).join('; ');
  const keyFacts = facts.slice(0, 2).join('; ');

  return `\n\n## Промпты для презентации

### Для клиента
> **Заголовок:** «${title}: как восполнить дефицит и почему это важно»
>
> **Теория:**
> - ${category} ${title} — кофактор ${functions.length > 0 ? functions[0].toLowerCase().replace(/^-\s*/, '') : 'ключевых ферментов'}
> - Суточная норма: ${rdaLines[0] || 'уточняется'}
> - Признаки дефицита: ${deficiency.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join(', ')}
> - ТОП-3 продукта: ${topFoods || 'см. таблицу'}
>
> **Практика:**
> - Чек-лист: какие продукты добавить в рацион (${foods.slice(0, 5).map(r => r[0]).join(', ')})
> - Как сочетать для лучшего усвоения (с чем комбинировать, а с чем — нет)
> - Признаки дефицита: само-скрининг за 1 минуту
>
> **Дисклеймер:** Перед приёмом добавок проконсультируйтесь с врачом. UL = ${ul || 'не указан'}. ${keyFacts ? `Источник: ${keyFacts}` : ''}

### Для специалиста
> **Заголовок:** «${title}: доказательная база, дозировки и клинические рекомендации»
>
> **Теория:**
> - ${category} ${title}: метаболизм, функции в организме
> - Референсные значения: ${rdaLines[0] || 'уточняются'}, UL = ${ul || 'нет данных'}
> - Факторы риска дефицита: ${deficiency.slice(0, 4).map(b => b.replace(/^[-*]\s*/, '')).join(', ')}
> - Биодоступность: энхансеры и ингибиторы всасывания
>
> **Практика:**
> - Дифференциальная диагностика дефицита (лабораторные маркеры)
> - Схема коррекции: диета → моно-добавка → комбинированная терапия
> - ${excess.length > 0 ? 'Токсичность и побочные эффекты: ' + excess.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join('; ') : ''}
> - Лекарственные взаимодействия
>
> **Дисклеймер:** Рекомендации основаны на данных NIH, Роспотребнадзора. Не являются медицинскими назначениями.`;
}

function generateSupplementPrompts(title, forms, indications, dosages, sideEffects, interactions) {
  const topInd = indications.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join(', ');

  return `\n\n## Промпты для презентации

### Для клиента
> **Заголовок:** «${title}: когда и как принимать, чтобы работало»
>
> **Теория:**
> - Что такое ${title} и как он работает
> - Основные показания: ${topInd || 'уточняются'}
> - Формы выпуска: ${forms || 'различные формы'}
> - Оптимальное время приёма и дозировка
>
> **Практика:**
> - Схема приёма: утро/день/вечер, до/после еды
> - С чем сочетать для усиления эффекта
> - На что обратить внимание (первые признаки улучшения)
>
> **Дисклеймер:** Перед приёмом проконсультируйтесь с врачом. ${sideEffects ? 'Возможны: ' + sideEffects.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join(', ') : ''}

### Для специалиста
> **Заголовок:** «${title}: фармакокинетика, доказательства и схемы назначения»
>
> **Теория:**
> - Формы и биодоступность: ${forms || 'доступные формы'}
> - Механизм действия и метаболический цикл
> - Доказательная база (уровни evidence по показаниям)
> - Дозировки: профилактические vs терапевтические
>
> **Практика:**
> - Алгоритм подбора дозы (вес, возраст, сопутствующие заболевания)
> - Мониторинг безопасности (лабораторные маркеры)
> - ${interactions ? 'Взаимодействия: ' + interactions.slice(0, 4).map(b => b.replace(/^[-*]\s*/, '')).join('; ') : ''}
> - Протокол отмены (при длительном приёме)
>
> **Дисклеймер:** Основано на клинических исследованиях. Индивидуальная непереносимость возможна.`;
}

function generateDietPrompts(title, principles, indications, contraindications, foodsAllowed) {
  const topPrinc = principles.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join('; ');

  return `\n\n## Промпты для презентации

### Для клиента
> **Заголовок:** «${title}: пошаговое руководство для начинающих»
>
> **Теория:**
> - Суть подхода: ${topPrinc || 'описание методологии'}
> - Кому подходит: ${indications.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join(', ') || 'уточняется'}
> - Противопоказания: ${contraindications.slice(0, 3).map(b => b.replace(/^[-*]\s*/, '')).join(', ') || 'не выявлены'}
> - Ожидаемые результаты и сроки
>
> **Практика:**
> - Пример рациона на день (завтрак, обед, ужин, перекусы)
> - Чек-лист: какие продукты всегда держать дома
> - Типичные ошибки новичков и как их избежать
>
> **Дисклеймер:** Перед началом любой диеты проконсультируйтесь с врачом. Индивидуальные результаты могут отличаться.

### Для специалиста
> **Заголовок:** «${title}: evidence-based протокол ведения пациента»
>
> **Теория:**
> - Метаболические механизмы: ${topPrinc || 'описание'}
> - Клинические показания и противопоказания
> - Доказательная база: ключевые исследования и мета-анализы
> - Протокол входа/выхода (адаптационный период)
>
> **Практика:**
> - Алгоритм назначения: оценка пациента → выбор схемы → мониторинг
> - Лабораторный контроль: какие показатели отслеживать
> - Коррекция побочных эффектов
> - Долгосрочное поддержание результата
>
> **Дисклеймер:** Клинические рекомендации. Не заменяет очный приём врача.`;
}

function generateProtocolPrompts(title, objectives, interventions) {
  return `\n\n## Промпты для презентации

### Для клиента
> **Заголовок:** «${title}: план действий для улучшения здоровья»
>
> **Теория:**
> - Цель протокола: ${objectives.slice(0, 2).join('; ') || 'улучшение показателей здоровья'}
> - Кому подходит и когда начинать
> - Основные шаги и их последовательность
> - Ожидаемые результаты и сроки
>
> **Практика:**
> - Пошаговый план на неделю/месяц
> - Чек-лист ежедневных действий
> - Трекер прогресса (что записывать)
> - Когда ждать первых результатов
>
> **Дисклеймер:** Протокол носит ознакомительный характер. Индивидуальная программа составляется специалистом.

### Для специалиста
> **Заголовок:** «${title}: клинический протокол ведения»
>
> **Теория:**
> - Обоснование протокола (биологические механизмы)
> - Показания и противопоказания (стратификация пациентов)
> - Доказательная база и уровни рекомендаций
>
> **Практика:**
> - Алгоритм: скрининг → стратификация → интервенция → мониторинг
> - ${interventions.length > 0 ? 'Основные интервенции: ' + interventions.slice(0, 5).join(', ') : ''}
> - Критерии эффективности и точки коррекции
> - Протокол безопасности (побочные эффекты, лабораторный контроль)
>
> **Дисклеймер:** Референсные протоколы. Адаптируются под конкретного пациента.`;
}

function generateBehaviorPrompts(title, desc) {
  return `\n\n## Промпты для презентации

### Для клиента
> **Заголовок:** «${title}: как внедрить полезные привычки без силы воли»
>
> **Теория:**
> - Основная идея: ${desc.slice(0, 100) || 'научный подход к изменению поведения'}
> - Почему сила воли не работает (и что работает вместо неё)
> - 3 ключевых принципа изменений
> - Как не срываться и возвращаться после срывов
>
> **Практика:**
> - Техника «маленьких шагов»: с чего начать сегодня
> - Дизайн среды: как обустроить пространство
> - Чек-лист на 21 день
>
> **Дисклеймер:** Изменение поведения — процесс. Не корите себя за срывы.

### Для специалиста
> **Заголовок:** «${title}: модели поведения и техники коучинга»
>
> **Теория:**
> - Теоретические модели: ${desc.slice(0, 150) || 'поведенческие модели'}
> - Нейрофизиологическая основа привычек
> - Роль среды, триггеров и подкрепления
>
> **Практика:**
> - Техники интервью для выявления барьеров
> - Инструменты: CJM, MIIN, Fogg Behavior Model
> - Протокол сопровождения клиента на 30/60/90 дней
>
> **Дисклеймер:** Коучинговые инструменты. Не заменяют психотерапию.`;
}

// ─── Router ─────────────────────────────────────────────────

function getCategoryResolver(dirName) {
  const cat = CATEGORY_MAP[dirName] || 'Документ';
  const subDir = path.basename(dirName);
  return { cat, subDir };
}

function generatePrompts(content, filePath, dirName) {
  if (content.includes('## Промпты для презентации') || content.includes('Промпты для презентации вынесены в')) return null;

  const title = extractTitle(content);
  const { cat } = getCategoryResolver(dirName);

  // Extract common sections
  const functions = extractBullets(extractSection(content, 'Функции в организме'));
  const deficiency = extractBullets(extractSection(content, 'Признаки дефицита'));
  const excess = extractBullets(extractSection(content, 'Признаки избытка'));
  const foods = extractTable(extractSection(content, 'Продукты-источники'));
  const facts = extractBullets(extractSection(content, 'Научные факты'));
  const rda = extractMetaValue(content, 'Суточная норма \\(РФ');
  const ul = extractMetaValue(content, 'Верхний допустимый уровень');

  // Supplements-specific
  const indications = extractBullets(extractSection(content, 'Показания'));
  const dosages = extractBullets(extractSection(content, 'Дозировки'));
  const sideEffects = extractBullets(extractSection(content, 'Побочные эффекты'));
  const interactions = extractBullets(extractSection(content, 'Взаимодействие'));
  const forms = extractMetaValue(content, 'Основная форма') || extractMetaValue(content, 'Основные формы') || extractMetaValue(content, 'Основное действующее вещество');

  // Diets-specific
  const principles = extractBullets(extractSection(content, 'Принципы') || extractSection(content, 'Суть подхода'));
  const indications2 = extractBullets(extractSection(content, 'Показания'));
  const contraindications = extractBullets(extractSection(content, 'Противопоказания'));
  const absPrinc = extractBullets(extractSection(content, 'Описание'));

  // Protocols-specific
  const objectives = extractBullets(extractSection(content, 'Цель'));
  const interventions = extractBullets(extractSection(content, 'Интервенции'));

  // Behavior
  const description = extractSection(content, 'Что это такое').slice(0, 200);

  // Determine document type and route
  if (dirName === 'minerals' || dirName === 'vitamins' || dirName === 'vitamin_like') {
    return generateNutrientPrompts(title, rda, ul, functions, deficiency, excess, foods, facts, cat);
  }
  if (dirName === 'supplements' || dirName === 'superfoods') {
    return generateSupplementPrompts(title, forms, indications, dosages, sideEffects, interactions);
  }
  if (dirName === 'diets' || dirName === 'diet_preferences') {
    return generateDietPrompts(title, principles.length > 0 ? principles : absPrinc, indications2, contraindications, foods);
  }
  if (dirName === 'protocols' || dirName === 'protocol_obecity' || dirName === 'treatment_plans') {
    return generateProtocolPrompts(title, objectives, interventions);
  }
  if (dirName === 'behavior_design' || dirName === 'environment_design' || dirName === 'psyhotypes') {
    return generateBehaviorPrompts(title, description || extractSection(content, 'title'));
  }
  if (dirName === 'med_traditional_practices') {
    return generateProtocolPrompts(title, extractBullets(extractSection(content, '1. Цель')), extractBullets(extractSection(content, '3. Интервенции')));
  }

  // Default: nutrient-style prompts for anything with deficiency/functions (e.g. diet_restrictions)
  if (functions.length > 0 || deficiency.length > 0) {
    return generateNutrientPrompts(title, rda, ul, functions, deficiency, excess, foods, facts, cat);
  }

  // Generic fallback
  return generateProtocolPrompts(title, [description], []);
}

// ─── Main processor ─────────────────────────────────────────

function walkDir(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'jsons' || entry.name === 'medcine' || entry.name === 'survey_design' || entry.name === 'best_practices' || entry.name.startsWith('_')) continue;
      walkDir(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function main() {
  const files = walkDir(KNOWLEDGE_DIR);
  console.log(`Found ${files.length} .md files`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  // Collect prompts by directory (for prompts.md support)
  const dirPrompts = {}; // dirPath -> [{ fileName, prompts }]

  for (const filePath of files) {
    const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
    const dirName = path.basename(path.dirname(filePath));
    const parentDir = path.basename(path.dirname(path.dirname(filePath)));

    // Determine effective category (handle nested dirs like supplements/ЖКТ/)
    const effectiveDir = parentDir === 'knowledge' ? dirName : parentDir;

    try {
      let content = fs.readFileSync(filePath, 'utf8');

      if (content.includes('## Промпты для презентации') || content.includes('Промпты для презентации вынесены в')) {
        skipped++;
        continue;
      }

      const prompts = generatePrompts(content, filePath, effectiveDir);
      if (prompts) {
        const dirPath = path.dirname(filePath);
        if (!dirPrompts[dirPath]) dirPrompts[dirPath] = [];
        dirPrompts[dirPath].push({ fileName: path.basename(filePath), prompts });
        processed++;
        console.log(`  + ${relativePath}`);
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`  ! ${relativePath}: ${err.message}`);
      errors++;
    }
  }

  // Write accumulated prompts
  for (const [dirPath, entries] of Object.entries(dirPrompts)) {
    const promptsMdPath = path.join(dirPath, 'prompts.md');
    const hasPromptsMd = fs.existsSync(promptsMdPath);

    if (hasPromptsMd) {
      // Append to prompts.md
      let promptsContent = fs.readFileSync(promptsMdPath, 'utf8') + '\n';
      for (const entry of entries) {
        promptsContent += `\n---\n\n## ${entry.fileName.replace(/\.md$/, '')}\n${entry.prompts}`;
      }
      fs.writeFileSync(promptsMdPath, promptsContent, 'utf8');
      console.log(`  → ${path.relative(KNOWLEDGE_DIR, promptsMdPath)} (${entries.length} prompts added)`);
    } else {
      // Append inline to each file (legacy mode)
      for (const entry of entries) {
        const filePath = path.join(dirPath, entry.fileName);
        let content = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(filePath, content + entry.prompts, 'utf8');
      }
    }
  }

  console.log(`\nDone. Processed: ${processed}, Skipped (had prompts): ${skipped}, Errors: ${errors}`);
}

main();
