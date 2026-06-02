const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function patch(url, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  const articles = await get('http://localhost:3054/api/knowledge-admin/articles?status=pending&limit=500');
  console.log(`Approving ${articles.length} articles...`);
  let i = 0;
  for (const a of articles) {
    await patch(`http://localhost:3054/api/knowledge-admin/articles/${a.id}/status`, { status: 'approved' });
    i++;
    if (i % 50 === 0) console.log(`  ${i}/${articles.length}`);
  }
  const stats = await get('http://localhost:3054/api/knowledge-admin/stats');
  console.log(`Done. Approved: ${i}, Total: ${stats.total}, Pending: ${stats.byStatus.find(s => s.status === 'pending')?.count || 0}`);
})();
