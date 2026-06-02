const registry = require('./registry.json');

async function search({ keywords, domain, maxResults }) {
  const baseUrl = registry['ClinicalTrials.gov'].baseUrl;
  const cfg = require('./configs/clinicalTrials.json');
  const query = [keywords, domain].filter(Boolean).join(' ');

  const params = new URLSearchParams({
    query: { term: query }?.term || query,
    pageSize: String(maxResults || 20),
    format: 'json',
    sort: 'relevance',
  });

  const res = await fetch(`${baseUrl}${cfg.searchPath}?${params}`, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(registry['ClinicalTrials.gov'].timeout),
  });
  if (!res.ok) throw new Error(`ClinicalTrials.gov error: ${res.status}`);
  const data = await res.json();

  return (data.studies || []).map(s => {
    const p = s.protocolSection || {};
    const id = p.identificationModule || {};
    return {
      source: 'ClinicalTrials.gov',
      source_id: id.nctId || '',
      doi: '',
      pmid: '',
      title: (id.briefTitle || id.officialTitle || '').replace(/\s+/g, ' ').trim(),
      abstract: (p.descriptionModule?.briefSummary || '').replace(/\s+/g, ' ').trim(),
      authors: (id.organization?.fullName || ''),
      journal: 'Clinical Trial',
      pub_date: (p.statusModule?.startDate?.value || ''),
      url: `https://clinicaltrials.gov/study/${id.nctId || ''}`,
    };
  });
}

module.exports = { search };
