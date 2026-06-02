const registry = require('./registry.json');
const cfg = require('./configs/fda.json');
const rateLimiter = require('./lib/RateLimiter');

rateLimiter.register('FDA', registry.FDA.rateLimit);

async function search({ keywords, domain, maxResults }) {
  const baseUrl = registry.FDA.baseUrl;
  const endpoint = cfg.endpoints.drug;
  const searchTerm = [keywords, domain].filter(Boolean).join(' ');

  await rateLimiter.acquire('FDA');
  const res = await fetch(`${baseUrl}${endpoint}?search=${encodeURIComponent(searchTerm)}&limit=${maxResults || 20}`, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(registry.FDA.timeout),
  });
  if (!res.ok) throw new Error(`FDA error: ${res.status}`);
  const data = await res.json();

  return (data.results || []).map(item => ({
    source: 'FDA',
    source_id: item.safetyreportid || '',
    doi: '',
    pmid: '',
    title: `Adverse Event: ${item.serious || ''} — ${item.primarysource?.reportercountry || ''}`,
    abstract: `Drug: ${item.patient?.drug?.[0]?.medicinalproduct || ''}. Reactions: ${(item.patient?.reaction || []).map(r => r.reactionmeddrapt).filter(Boolean).join(', ')}`,
    authors: '',
    journal: 'FDA Adverse Event Reporting System',
    pub_date: item.receivedate || item.transmissiondate || '',
    url: `https://api.fda.gov/drug/event.json?search=${encodeURIComponent(item.safetyreportid || '')}`,
  }));
}

module.exports = { search };
