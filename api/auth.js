const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userStorage = require('./userStorage');
const { requireAuth } = require('./middleware');

const JWT_SECRET = process.env.JWT_SECRET || 'healora-dev-secret-change-in-production';
const JWT_EXPIRES = '24h';
const REFRESH_EXPIRES = '7d';

function generateTokens(user) {
  const payload = { user_id: user.user_id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const refresh_token = jwt.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
  return { token, refresh_token };
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const result = await userStorage.createUser(email, password);
    if (result.error) return res.status(409).json({ error: result.error });

    const tokens = generateTokens(result.user);
    res.json({ user: userStorage.toPublicUser(result.user), ...tokens });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await userStorage.verifyPassword(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    userStorage.updateLastLogin(user.user_id);
    const tokens = generateTokens(user);
    res.json({ user: userStorage.toPublicUser(user), ...tokens });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.status(400).json({ error: 'refresh_token required' });

    const decoded = jwt.verify(refresh_token, JWT_SECRET);
    if (decoded.type !== 'refresh') return res.status(401).json({ error: 'Invalid token type' });

    const user = userStorage.findById(decoded.user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Refresh token expired' });
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// GET /api/auth/me — requires auth middleware
router.get('/me', requireAuth, (req, res) => {
  const user = userStorage.findById(req.user_id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(userStorage.toPublicUser(user));
});

// POST /api/auth/biometric
router.post('/biometric', requireAuth, (req, res) => {
  const { biometric_key } = req.body;
  if (!biometric_key) return res.status(400).json({ error: 'biometric_key required' });

  userStorage.setBiometricKey(req.user_id, biometric_key);
  res.json({ status: 'ok' });
});

// POST /api/notifications/register
router.post('/register-token', requireAuth, (req, res) => {
  const { fcm_token } = req.body;
  if (!fcm_token) return res.status(400).json({ error: 'fcm_token required' });

  userStorage.addFcmToken(req.user_id, fcm_token);
  res.json({ status: 'ok' });
});

// DELETE /api/notifications/register
router.delete('/register-token', requireAuth, (req, res) => {
  const { fcm_token } = req.body;
  if (!fcm_token) return res.status(400).json({ error: 'fcm_token required' });

  userStorage.removeFcmToken(req.user_id, fcm_token);
  res.json({ status: 'ok' });
});

module.exports = router;
