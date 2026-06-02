const bigPickle = require('./bigPickle');

const TEST_SET = [
  { title: 'Omega-3 fatty acids and cognitive function in older adults: a systematic review', abstract: 'Meta-analysis of 12 RCTs examining omega-3 supplementation effects on memory and executive function in adults over 60.', expected_domain: 'nutrition', expected_ev: 'A' },
  { title: 'Effects of morning vs evening exercise on circadian phase and sleep quality', abstract: 'Randomized crossover trial comparing 6 weeks of morning vs evening aerobic exercise on dim-light melatonin onset and PSQI scores.', expected_domain: 'habits', expected_ev: 'B' },
  { title: 'Intermittent fasting versus daily calorie restriction for type 2 diabetes remission', abstract: '12-month RCT comparing 5:2 intermittent fasting with continuous calorie restriction in 300 adults with type 2 diabetes.', expected_domain: 'nutrition', expected_ev: 'A' },
  { title: 'Cold exposure therapy for metabolic health: brown adipose tissue activation', abstract: 'Review of mechanisms by which cold exposure increases BAT activity and improves glucose metabolism and insulin sensitivity.', expected_domain: 'longevity', expected_ev: 'C' },
  { title: 'Gut microbiome composition predicts response to dietary interventions for weight loss', abstract: 'Prospective cohort study analyzing fecal samples from 200 participants before and after a 12-week dietary intervention.', expected_domain: 'microbiome', expected_ev: 'B' },
  { title: 'Effect of sleep restriction on appetite-regulating hormones ghrelin and leptin', abstract: 'Laboratory study of 5 nights of 4-hour sleep restriction versus 9-hour sleep on fasting ghrelin and leptin levels.', expected_domain: 'sleep', expected_ev: 'B' },
  { title: 'Mindfulness-based stress reduction for cortisol regulation in healthcare workers', abstract: 'RCT of 8-week MBSR program versus waitlist control measuring salivary cortisol, perceived stress, and burnout in 120 nurses.', expected_domain: 'stress', expected_ev: 'A' },
  { title: 'Standing desk intervention reduces sedentary time but does not improve cardiometabolic risk factors', abstract: 'Cluster RCT in office workers comparing standing desk with usual sitting over 12 months.', expected_domain: 'habits', expected_ev: 'A' },
  { title: 'SGLT2 inhibitors and cardiovascular outcomes in patients with and without type 2 diabetes', abstract: 'Pooled analysis of EMPA-REG, CANVAS, and DECLARE-TIMI trials examining major adverse cardiac events.', expected_domain: 'literature', expected_ev: 'A' },
  { title: 'Blue light filtering glasses for sleep improvement in shift workers: a randomized trial', abstract: 'Cross-over trial of blue-blocking glasses versus placebo worn 2 hours before bedtime during night shift rotations.', expected_domain: 'sleep', expected_ev: 'B' },
  { title: 'Personalized nutrition based on genetic variants for weight management', abstract: 'Systematic review of nutrigenomics approaches comparing genotype-based dietary advice with standard recommendations.', expected_domain: 'nutrition', expected_ev: 'C' },
  { title: 'Built environment and physical activity: associations between neighborhood walkability and step counts', abstract: 'Cross-sectional study using GIS-based walkability indices and accelerometer data from 5000 adults in 10 US cities.', expected_domain: 'environment_design', expected_ev: 'C' },
  { title: 'Resistance training intensity and muscle protein synthesis in older men', abstract: 'Dose-response study comparing low, moderate, and high intensity resistance exercise on myofibrillar protein synthesis rates.', expected_domain: 'habits', expected_ev: 'B' },
  { title: 'NAD+ precursors and longevity: a review of preclinical and clinical evidence', abstract: 'Comprehensive review of nicotinamide riboside, NMN, and nicotinamide supplementation effects on NAD+ metabolism and aging biomarkers.', expected_domain: 'longevity', expected_ev: 'C' },
  { title: 'Time-restricted eating in obesity: mechanisms beyond calorie reduction', abstract: 'Review discussing how 16:8 time-restricted feeding affects autophagy, circadian gene expression, and metabolic flexibility independently of caloric intake.', expected_domain: 'obesity', expected_ev: 'C' },
];

const PROMPT = `Ты — медицинский эксперт. Определи:

1. domain (один из: nutrition, longevity, sleep, stress, microbiome, habits, environment_design, obesity, literature) — тематическая область статьи
2. evidence_level (A|B|C|D) — уровень доказательности:
   - A: систематический обзор RCT, мета-анализ, крупное рандомизированное контролируемое исследование
   - B: когортное исследование, исследование "случай-контроль", кросс-секционное, небольшие RCT
   - C: обзор литературы, narrative review, case report, лабораторное исследование без клинических исходов
   - D: экспертное мнение, editorial, preclinical, in vitro/animal study
3. relevance (0-100) — насколько статья релевантна для health/longevity
4. summary (1-2 предложения на русском) — краткое содержание

Ответь строгим JSON, без markdown, без пояснений:
{"domain":"...","evidence_level":"A|B|C|D","relevance":0-100,"summary":"..."}`;

const FORMAT = '{"domain":"...","evidence_level":"A|B|C|D","relevance":0-100,"summary":"..."}';

async function testModel(label, model) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 ТЕСТ: ${label}`);
  console.log('='.repeat(60));

  const ok = await bigPickle.healthCheck();
  if (!ok) {
    console.log('✗ Ollama not available');
    return null;
  }

  const start = performance.now();

  const oldGenerate = bigPickle.generate;
  const originalEnvModel = process.env.BIGPICKLE_MODEL;
  process.env.BIGPICKLE_MODEL = model;

  const results = await bigPickle.analyze({
    articles: TEST_SET,
    llm_prompt: PROMPT,
    search_format: FORMAT,
  });

  process.env.BIGPICKLE_MODEL = originalEnvModel;

  const duration = (performance.now() - start) / 1000;
  const avgTime = (duration / TEST_SET.length).toFixed(1);

  let domainScore = 0;
  let evScore = 0;
  const errors = [];
  const details = [];

  results.forEach((r, i) => {
    const exp = TEST_SET[i];
    const dOk = r.domain === exp.expected_domain;
    const eOk = r.evidence_level === exp.expected_ev;
    if (dOk) domainScore++;
    if (eOk) evScore++;
    if (!dOk || !eOk) {
      errors.push(`  #${i} ${exp.title.slice(0, 55)}`);
      if (!dOk) errors.push(`    domain:  expected ${exp.expected_domain}, got ${r.domain}`);
      if (!eOk) errors.push(`    evidence: expected ${exp.expected_ev}, got ${r.evidence_level}`);
    }
    details.push({
      idx: i,
      title: exp.title.slice(0, 55),
      domainOk: dOk,
      evOk: eOk,
      gotDomain: r.domain,
      gotEv: r.evidence_level,
      expectedDomain: exp.expected_domain,
      expectedEv: exp.expected_ev,
      summary: (r.summary || '').slice(0, 80),
    });
  });

  console.log(`\n⏱  Общее время: ${duration.toFixed(1)}s (среднее ${avgTime}s/статья)`);
  console.log(`\n📊 Результаты:`);
  console.log(`  Domain accuracy:     ${domainScore}/${TEST_SET.length} (${(domainScore/TEST_SET.length*100).toFixed(0)}%)`);
  console.log(`  Evidence accuracy:   ${evScore}/${TEST_SET.length} (${(evScore/TEST_SET.length*100).toFixed(0)}%)`);
  console.log(`  Combined accuracy:   ${domainScore+evScore}/${TEST_SET.length*2} (${((domainScore+evScore)/(TEST_SET.length*2)*100).toFixed(0)}%)`);

  if (errors.length > 0) {
    console.log('\n❌ Ошибки:');
    errors.forEach(e => console.log(e));
  }

  console.log('\n📋 Детали:');
  details.forEach(d => {
    const dm = d.domainOk ? '✓' : '✗';
    const em = d.evOk ? '✓' : '✗';
    console.log(`  [${dm}${em}] #${d.idx} ${d.title}`);
    if (!d.domainOk) console.log(`        domain: ${d.gotDomain} (expected ${d.expectedDomain})`);
    if (!d.evOk) console.log(`        ev:     ${d.gotEv} (expected ${d.expectedEv})`);
  });

  return { label, model, duration, avgTime, domainScore, evScore, errors, details };
}

async function main() {
  console.log('🔬 СРАВНЕНИЕ МОДЕЛЕЙ НА ЭТАЛОННЫХ СТАТЬЯХ\n');

  const results = [];
  results.push(await testModel('deepseek-r1:8b (Chain-of-Thought)', 'deepseek-r1:8b'));
  results.push(await testModel('qwen3:8b-q8_0 (Быстрая)', 'qwen3:8b-q8_0'));

  const valid = results.filter(Boolean);

  if (valid.length >= 2) {
    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 ИТОГОВОЕ СРАВНЕНИЕ');
    console.log('='.repeat(60));
    console.log(`${'Модель'.padEnd(25)} ${'Domain'.padEnd(10)} ${'Evidence'.padEnd(10)} ${'Время'.padEnd(10)} ${'Среднее'}`);
    console.log('-'.repeat(60));
    valid.forEach(r => {
      const dPct = `${r.domainScore}/${TEST_SET.length}`.padEnd(10);
      const ePct = `${r.evScore}/${TEST_SET.length}`.padEnd(10);
      console.log(`${r.label.padEnd(25)} ${dPct} ${ePct} ${r.duration.toFixed(0)+'s'.padEnd(8)} ${r.avgTime}s/ст`);
    });
  }

  const ds = valid.find(r => r.label.includes('deepseek'));
  const qw = valid.find(r => r.label.includes('qwen'));

  if (ds && qw) {
    console.log('\n🔍 АНАЛИЗ:');
    const dBetter = ds.evScore > qw.evScore;
    const qBetter = qw.evScore > ds.evScore;
    if (dBetter) console.log('  deepseek-r1 точнее в evidence level');
    if (qBetter) console.log('  qwen3:8b точнее в evidence level');
    if (!dBetter && !qBetter) console.log('  Результаты по evidence level равны');
    console.log(`  deepseek медленнее в ${(ds.duration / qw.duration).toFixed(1)}x раз`);
  }
}

main().catch(err => {
  console.error('Ошибка:', err.message);
  process.exit(1);
});