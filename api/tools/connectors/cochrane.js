const registry = require('./registry.json');

async function search({ keywords, domain, maxResults }) {
  const baseUrl = registry.Cochrane.baseUrl;
  const cfg = require('./configs/cochrane.json');
  const query = [keywords, domain].filter(Boolean).join(' ');

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      count: String(maxResults || 20),
    });
    const res = await fetch(`${baseUrl}${cfg.searchPath}?${params}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(registry.Cochrane.timeout),
    });
    if (!res.ok) throw new Error(`Cochrane error: ${res.status}`);
    const data = await res.json();
    return (data.results || data.docs || []).map(item => ({
      source: 'Cochrane',
      source_id: item.id || item.doi || '',
      doi: item.doi || '',
      pmid: '',
      title: (item.title || '').replace(/\s+/g, ' ').trim(),
      abstract: (item.abstract || '').replace(/\s+/g, ' ').trim(),
      authors: (item.authors || []).join('; '),
      journal: 'Cochrane Library',
      pub_date: item.publication_date || item.year || '',
      url: item.url || `https://www.cochranelibrary.com/doi/${item.doi || ''}`,
    }));
  } catch {
    return [];
  }
}

module.exports = { search };
