class RateLimiter {
  constructor() {
    this.buckets = new Map();
  }

  register(name, { rate, perSeconds = 1, maxTokens }) {
    const tokens = maxTokens || rate;
    this.buckets.set(name, {
      tokens,
      maxTokens: tokens,
      rate,
      perSeconds,
      lastRefill: Date.now(),
      queue: [],
    });
  }

  refill(bucket) {
    const now = Date.now();
    const elapsed = (now - bucket.lastRefill) / 1000;
    const add = Math.floor(elapsed * (bucket.rate / bucket.perSeconds));
    if (add > 0) {
      bucket.tokens = Math.min(bucket.maxTokens, bucket.tokens + add);
      bucket.lastRefill = now;
    }
  }

  async acquire(name) {
    const bucket = this.buckets.get(name);
    if (!bucket) return;
    this.refill(bucket);
    if (bucket.tokens > 0) {
      bucket.tokens--;
      return;
    }
    return new Promise(resolve => {
      bucket.queue.push(resolve);
      if (bucket.queue.length === 1) this.processQueue(name);
    });
  }

  processQueue(name) {
    const bucket = this.buckets.get(name);
    if (!bucket || bucket.queue.length === 0) return;
    this.refill(bucket);
    if (bucket.tokens > 0) {
      bucket.tokens--;
      const next = bucket.queue.shift();
      next();
      if (bucket.queue.length > 0) setImmediate(() => this.processQueue(name));
    } else {
      const wait = Math.ceil((1 - (Date.now() - bucket.lastRefill) / 1000 / bucket.perSeconds * bucket.rate) / bucket.rate * 1000 / bucket.perSeconds);
      setTimeout(() => this.processQueue(name), Math.max(wait, 100));
    }
  }
}

module.exports = new RateLimiter();
