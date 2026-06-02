const registry = require('./registry.json');

async function search({ keywords, domain, maxResults }) {
  const baseUrl = registry.WHO.baseUrl;
  const cfg = require('./configs/who.json');
  const query = [keywords, domain].filter(Boolean).join(' ');

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      count: String(maxResults || 20),
    });
    const res = await fetch(`${baseUrl}${cfg.searchPath}?${params}`, {
      signal: AbortSignal.timeout(registry.WHO.timeout),
    });
    if (!res.ok) throw new Error(`WHO error: ${res.status}`);
    const data = await res.json();
    return (data.articles || data.docs || []).map(item => ({
      source: 'WHO',
      source_id: item.id || '',
      doi: item.doi || '',
      pmid: '',
      title: (item.title || '').replace(/\s+/g, ' ').trim(),
      abstract: (item.abstract || item.description || '').replace(/\s+/g, ' ').trim(),
      authors: (item.authors || []).join('; '),
      journal: item.journal || 'WHO',
      pub_date: item.pub_date || item.year || '',
      url: item.url || '',
    }));
  } catch {
    return [];
  }
}

module.exports = { search };
