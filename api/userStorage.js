const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_PATH = path.join(__dirname, 'data', 'users.json');
const SALT_ROUNDS = 10;

let usersCache = [];

function ensureDir() {
  const dir = path.dirname(USERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadUsers() {
  ensureDir();
  if (!fs.existsSync(USERS_PATH)) fs.writeFileSync(USERS_PATH, '[]', 'utf-8');
  try {
    usersCache = JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
  } catch {
    usersCache = [];
  }
  console.log(`[userStorage] Loaded ${usersCache.length} users`);
}

function saveUsers() {
  ensureDir();
  fs.writeFileSync(USERS_PATH, JSON.stringify(usersCache, null, 2), 'utf-8');
}

function findByEmail(email) {
  return usersCache.find(u => u.email === email.toLowerCase()) || null;
}

function findById(userId) {
  return usersCache.find(u => u.user_id === userId) || null;
}

async function createUser(email, password) {
  const emailLower = email.toLowerCase();
  if (findByEmail(emailLower)) return { error: 'Email already registered' };

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = {
    user_id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
    email: emailLower,
    password_hash,
    created_at: new Date().toISOString(),
    last_login: null,
    biometric_key_hash: null,
    fcm_tokens: [],
    profile_ids: [],
  };

  usersCache.push(user);
  saveUsers();
  return { user };
}

async function verifyPassword(email, password) {
  const user = findByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return user;
}

function updateLastLogin(userId) {
  const user = findById(userId);
  if (user) {
    user.last_login = new Date().toISOString();
    saveUsers();
  }
}

function addFcmToken(userId, token) {
  const user = findById(userId);
  if (user && !user.fcm_tokens.includes(token)) {
    user.fcm_tokens.push(token);
    saveUsers();
  }
}

function removeFcmToken(userId, token) {
  const user = findById(userId);
  if (user) {
    user.fcm_tokens = user.fcm_tokens.filter(t => t !== token);
    saveUsers();
  }
}

function setBiometricKey(userId, keyHash) {
  const user = findById(userId);
  if (user) {
    user.biometric_key_hash = keyHash;
    saveUsers();
  }
}

function toPublicUser(user) {
  return {
    user_id: user.user_id,
    email: user.email,
    created_at: user.created_at,
    last_login: user.last_login,
    profile_ids: user.profile_ids,
  };
}

loadUsers();

module.exports = {
  createUser, verifyPassword, findByEmail, findById,
  updateLastLogin, addFcmToken, removeFcmToken, setBiometricKey,
  toPublicUser, loadUsers,
};
