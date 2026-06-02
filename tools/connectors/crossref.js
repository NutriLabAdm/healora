const registry = require('./registry.json');
const cfg = require('./configs/crossref.json');
const rateLimiter = require('./lib/RateLimiter');

rateLimiter.register('CrossRef', registry.CrossRef.rateLimit);

async function search({ keywords, domain, maxResults }) {
  const baseUrl = registry.CrossRef.baseUrl;
  const query = [keywords, domain].filter(Boolean).join(' ');

  const params = new URLSearchParams({
    query,
    rows: String(maxResults || 20),
    sort: 'relevance',
    order: 'desc',
  });

  await rateLimiter.acquire('CrossRef');
  const res = await fetch(`${baseUrl}?${params}`, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(registry.CrossRef.timeout),
  });
  if (!res.ok) throw new Error(`CrossRef error: ${res.status}`);
  const data = await res.json();

  return (data.message?.items || []).map(item => ({
    source: 'CrossRef',
    source_id: item.DOI || '',
    doi: item.DOI || '',
    pmid: '',
    title: (item.title || [''])[0]?.replace(/\s+/g, ' ').trim() || '',
    abstract: (item.abstract || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    authors: (item.author || []).map(a => `${a.given || ''} ${a.family || ''}`.trim()).filter(Boolean).join('; '),
    journal: (item['container-title'] || [''])[0] || '',
    pub_date: String(item['published-print']?.['date-parts']?.[0]?.[0] || item['published-online']?.['date-parts']?.[0]?.[0] || ''),
    url: item.URL || `https://doi.org/${item.DOI}`,
  }));
}

module.exports = { search };
