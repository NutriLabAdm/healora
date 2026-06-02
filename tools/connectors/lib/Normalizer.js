const crypto = require('crypto');

const DOMAINS = ['nutrition', 'longevity', 'sleep', 'stress', 'microbiome', 'habits', 'environment_design', 'obesity', 'literature'];

function normalizePubmed(raw) {
  if (!raw?.result?.uids) return [];
  const { uids, ...rest } = raw.result;
  return uids.map(id => {
    const a = rest[id];
    if (!a) return null;
    return {
      source: 'PubMed',
      source_id: id,
      pmid: id,
      doi: (a.articleids || []).find(x => x.idtype === 'doi')?.value || '',
      title: (a.title || '').replace(/\s+/g, ' ').trim(),
      abstract: (a.abstract || '').replace(/\s+/g, ' ').trim(),
      authors: (a.authors || []).map(x => x.name).join('; '),
      journal: (a.journal || a.fulljournalname || ''),
      pub_date: (a.pubdate || a.sortpubdate || ''),
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    };
  }).filter(Boolean);
}

function normalizeCrossRef(raw) {
  if (!raw?.message?.items) return [];
  return raw.message.items.map(item => ({
    source: 'CrossRef',
    source_id: item.DOI || '',
    doi: item.DOI || '',
    pmid: '',
    title: (item.title || [''])[0].replace(/\s+/g, ' ').trim(),
    abstract: (item.abstract || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    authors: (item.author || []).map(a => `${a.given || ''} ${a.family || ''}`.trim()).filter(Boolean).join('; '),
    journal: (item['container-title'] || [''])[0] || '',
    pub_date: String(item['published-print']?.['date-parts']?.[0]?.[0] || item['published-online']?.['date-parts']?.[0]?.[0] || ''),
    url: item.URL || `https://doi.org/${item.DOI}`,
  }));
}

function normalizeClinicalTrials(raw) {
  if (!raw?.studies) return [];
  return raw.studies.map(s => {
    const p = s.protocolSection || {};
    const id = p.identificationModule || {};
    const status = p.statusModule || {};
    const design = p.designModule || {};
    return {
      source: 'ClinicalTrials.gov',
      source_id: id.nctId || '',
      doi: '',
      pmid: '',
      title: (id.briefTitle || id.officialTitle || '').replace(/\s+/g, ' ').trim(),
      abstract: (p.descriptionModule?.briefSummary || '').replace(/\s+/g, ' ').trim(),
      authors: (id.organization?.fullName || ''),
      journal: `Clinical Trial — ${status.overallStatus || 'Unknown'}`,
      pub_date: (status.startDate || status.primaryCompletionDate || {}).value || '',
      url: `https://clinicaltrials.gov/study/${id.nctId || ''}`,
    };
  });
}

function assignDomain(article, queryDomain) {
  if (queryDomain && DOMAINS.includes(queryDomain)) {
    article.domain = queryDomain;
  } else {
    const titleLower = (article.title || '').toLowerCase();
    const absLower = (article.abstract || '').toLowerCase();
    const text = titleLower + ' ' + absLower;
    if (/\b(obes|weight|bmi|adipos|fat mass|overweight)\b/.test(text)) article.domain = 'obesity';
    else if (/\b(nutrition|diet|omega|vitamin|mineral|calorie|fasting|supplement|antioxidant)\b/.test(text)) article.domain = 'nutrition';
    else if (/\b(longevity|aging|lifespan|healthspan|telomere|senescence|nadh|nmn)\b/.test(text)) article.domain = 'longevity';
    else if (/\b(sleep|circadian|melatonin|insomnia|apnea|bedtime)\b/.test(text)) article.domain = 'sleep';
    else if (/\b(stress|cortisol|burnout|anxiety|mbsr|mindfulness|hpa axis)\b/.test(text)) article.domain = 'stress';
    else if (/\b(microbiome|gut|microbiota|probiotic|prebiotic|feces|stool)\b/.test(text)) article.domain = 'microbiome';
    else if (/\b(exercise|habit|physical.activ|sedentary|walk|fitness|training|workout)\b/.test(text)) article.domain = 'habits';
    else if (/\b(built environment|neighborhood|walkability|urban|green space|architecture)\b/.test(text)) article.domain = 'environment_design';
    else article.domain = 'literature';
  }
  return article;
}

function computeFingerprint(article) {
  const raw = article.pmid || article.doi || article.url || article.title;
  if (!raw) return crypto.randomUUID();
  return crypto.createHash('sha256').update(raw.toLowerCase().trim()).digest('hex').slice(0, 16);
}

function normalize(raw, source, queryDomain) {
  let articles = [];
  // Check if raw has pre-normalized articles (connector output wrapped as { items: [...] })
  if (raw && Array.isArray(raw.items) && raw.items.length > 0 && raw.items[0].source) {
    articles = raw.items;
  } else {
    switch (source) {
      case 'PubMed': articles = normalizePubmed(raw); break;
      case 'CrossRef': articles = normalizeCrossRef(raw); break;
      case 'ClinicalTrials.gov': articles = normalizeClinicalTrials(raw); break;
      default: articles = [];
    }
  }
  return articles.map(a => {
    a = assignDomain(a, queryDomain);
    a.fingerprint = computeFingerprint(a);
    a.evidence_level = 'D';
    a.relevance = 50;
    a.llm_confidence = 0;
    a.llm_summary = '';
    return a;
  });
}

module.exports = { normalize, computeFingerprint, assignDomain, DOMAINS };
