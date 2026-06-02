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

async function testBigPickle() {
  console.log('Testing BigPickle adapter...\n');

  const ok = await bigPickle.healthCheck();
  if (!ok) {
    console.log('✗ BigPickle/Ollama not available. Start Ollama first:');
    console.log('  ollama pull big-pickle');
    console.log('  ollama serve\n');
    console.log('Running fallback test without LLM (structural check only)...\n');
    process.exit(1);
  }

  const start = performance.now();
  const results = await bigPickle.analyze({
    articles: TEST_SET,
    llm_prompt: 'Определи домен (nutrition, longevity, sleep, stress, microbiome, habits, environment_design, obesity, literature) и уровень доказательности (A=RCT/meta, B=cohort, C=review/case, D=expert opinion). Ответь строгим JSON.',
    search_format: '{"domain":"...","evidence_level":"A-D","relevance":0-100,"summary":"..."}',
  });
  const duration = (performance.now() - start) / 1000;

  let domainScore = 0;
  let evScore = 0;
  const errors = [];

  results.forEach((r, i) => {
    const exp = TEST_SET[i];
    const dOk = r.domain === exp.expected_domain;
    const eOk = r.evidence_level === exp.expected_ev;
    if (dOk) domainScore++; else errors.push(`  ✗ #${i} domain: expected ${exp.expected_domain}, got ${r.domain} — ${exp.title.slice(0, 50)}`);
    if (eOk) evScore++; else errors.push(`  ✗ #${i} evidence: expected ${exp.expected_ev}, got ${r.evidence_level} — ${exp.title.slice(0, 50)}`);
  });

  console.log(`\nResults (${duration.toFixed(1)}s):`);
  console.log(`  Domain accuracy:     ${domainScore}/${TEST_SET.length} (${(domainScore/TEST_SET.length*100).toFixed(0)}%)`);
  console.log(`  Evidence accuracy:   ${evScore}/${TEST_SET.length} (${(evScore/TEST_SET.length*100).toFixed(0)}%)`);
  console.log(`  Combined accuracy:   ${domainScore+evScore}/${TEST_SET.length*2} (${((domainScore+evScore)/(TEST_SET.length*2)*100).toFixed(0)}%)`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(e));
  }

  console.log('\nSample output:', JSON.stringify(results[0], null, 2).slice(0, 300));
}

testBigPickle().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
