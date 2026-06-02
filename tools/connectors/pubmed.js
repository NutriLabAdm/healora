const registry = require('./registry.json');
const cfg = require('./configs/pubmed.json');
const rateLimiter = require('./lib/RateLimiter');

rateLimiter.register('PubMed', registry.PubMed.rateLimit);

function buildQuery({ keywords, mesh_terms, domain, dateFrom, dateTo }) {
  const parts = [];
  if (mesh_terms) parts.push(`(${mesh_terms}[MeSH]`);
  if (keywords) parts.push(`(${keywords})`);
  if (domain) parts.push(`(${domain}[All Fields])`);
  if (dateFrom) parts.push(`("${dateFrom}"[Date - Publication] : "${dateTo || '3000'}"[Date - Publication])`);
  return parts.join(' AND ') || cfg.defaultKeywords;
}

async function search({ keywords, mesh_terms, domain, dateFrom, dateTo, maxResults }) {
  const baseUrl = registry.PubMed.baseUrl;
  const query = buildQuery({ keywords, mesh_terms, domain, dateFrom, dateTo });

  await rateLimiter.acquire('PubMed');
  const searchRes = await fetch(`${baseUrl}${cfg.searchPath}?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults || 20}&retmode=json&sort=relevance`, {
    signal: AbortSignal.timeout(registry.PubMed.timeout),
  });
  if (!searchRes.ok) throw new Error(`PubMed search error: ${searchRes.status}`);
  const searchData = await searchRes.json();
  const ids = searchData?.esearchresult?.idlist || [];
  if (ids.length === 0) return [];

  await rateLimiter.acquire('PubMed');
  const fetchRes = await fetch(`${baseUrl}${cfg.fetchPath}?db=pubmed&id=${ids.join(',')}&retmode=xml&rettype=abstract`, {
    signal: AbortSignal.timeout(registry.PubMed.timeout),
  });
  if (!fetchRes.ok) throw new Error(`PubMed fetch error: ${fetchRes.status}`);
  const xmlText = await fetchRes.text();

  const articles = [];
  const idRegex = /<PubmedArticle>\s*<MedlineCitation[^>]*>\s*<PMID[^>]*>(\d+)<\/PMID>([\s\S]*?)<\/MedlineCitation>/g;
  let m;
  while ((m = idRegex.exec(xmlText)) !== null) {
    const pmid = m[1];
    const block = m[2];

    const title = (block.match(/<ArticleTitle[^>]*>([\s\S]*?)<\/ArticleTitle>/) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '';
    const abstract = (block.match(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '';
    const journal = (block.match(/<Journal>\s*<Title>([\s\S]*?)<\/Title>/) || [])[1]?.trim() || '';
    const pubDate = (block.match(/<PubDate>\s*<Year>(\d{4})<\/Year>/) || [])[1] || '';
    const doi = (block.match(/<ELocationID[^>]*EIdType="doi"[^>]*>([\s\S]*?)<\/ELocationID>/) || [])[1]?.trim() || '';

    const authors = [];
    const authorRegex = /<Author[^>]*>[\s\S]*?<LastName>([\s\S]*?)<\/LastName>[\s\S]*?<ForeName>([\s\S]*?)<\/ForeName>/g;
    let am;
    while ((am = authorRegex.exec(block)) !== null) {
      authors.push(`${am[2]} ${am[1]}`.trim());
    }

    articles.push({
      source: 'PubMed',
      source_id: pmid,
      pmid,
      doi,
      title: title.replace(/\s+/g, ' ').trim(),
      abstract: abstract.replace(/\s+/g, ' ').trim(),
      authors: authors.join('; '),
      journal,
      pub_date: pubDate,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
    });
  }
  return articles;
}

module.exports = { search };
