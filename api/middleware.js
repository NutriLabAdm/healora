const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'healora-dev-secret-change-in-production';

// Required auth — returns 401 if no valid token
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header required (Bearer token)' });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user_id = decoded.user_id;
    req.user_email = decoded.email;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Optional auth — sets req.user_id if token present, but doesn't block
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const token = header.slice(7);
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user_id = decoded.user_id;
      req.user_email = decoded.email;
    } catch { /* ignore invalid tokens for optional auth */ }
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
