const crypto = require('crypto');

function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => i);
  for (let j = 1; j <= n; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const temp = dp[i];
      dp[i] = Math.min(
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
        dp[i] + 1,
        dp[i - 1] + 1,
      );
      prev = temp;
    }
  }
  return dp[m];
}

class DedupEngine {
  constructor() {
    this.fingerprints = new Map();
    this.titleIndex = [];
    this.merged = [];
  }

  loadExisting(fingerprints) {
    for (const fp of fingerprints || []) {
      this.fingerprints.set(fp, true);
    }
  }

  isDuplicate(article) {
    if (!article.fingerprint) return false;

    if (this.fingerprints.has(article.fingerprint)) return true;

    const pmid = article.pmid || '';
    const doi = article.doi || '';
    const title = normalizeTitle(article.title || '');

    for (const existing of this.titleIndex) {
      if (pmid && existing.pmid && pmid === existing.pmid) return true;
      if (doi && existing.doi && doi === existing.doi) return true;
      if (title && existing.normalizedTitle && title === existing.normalizedTitle) return true;
      if (title && existing.normalizedTitle && levenshtein(title, existing.normalizedTitle) <= 3) return true;
    }

    return false;
  }

  add(article) {
    this.fingerprints.set(article.fingerprint, true);
    this.titleIndex.push({
      pmid: article.pmid || '',
      doi: article.doi || '',
      normalizedTitle: normalizeTitle(article.title || ''),
    });
    this.merged.push(article);
    return article;
  }

  merge(articles) {
    const result = [];
    for (const a of articles) {
      if (!this.isDuplicate(a)) {
        this.add(a);
        result.push(a);
      }
    }
    return result;
  }

  getMerged() {
    return this.merged;
  }

  getFingerprintIndex() {
    return [...this.fingerprints.keys()];
  }
}

module.exports = DedupEngine;
