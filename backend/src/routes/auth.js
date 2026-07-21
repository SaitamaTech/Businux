import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createUser, getUserByEmail, createOrganization, createSession, getUserBySessionId, deleteSession } from '../db.js';
import { seedTemplate } from '../services/templates.js';

const router = express.Router();
const SESSION_COOKIE_NAME = 'businux_session';

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, ...value] = cookie.trim().split('=');
    acc[name] = decodeURIComponent(value.join('='));
    return acc;
  }, {});
}

function setSessionCookie(res, sessionId) {
  res.cookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    path: '/',
  });
}

function clearSessionCookie(res) {
  res.cookie(SESSION_COOKIE_NAME, '', {
    httpOnly: false,
    maxAge: 0,
    path: '/',
  });
}

function mapUserResponse(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role === 'owner' ? 'Owner' : user.role,
    companyName: user.companyName || '',
    avatarUrl: user.avatarUrl || undefined,
    orgId: user.orgId || user.org_id,
  };
}

/**
 * POST /api/auth/login
 * Login a user
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: { message: 'Email and password required' } });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: { message: 'Password must be at least 6 characters' } });
  }

  const existing = getUserByEmail(email);
  if (!existing) {
    return res.status(401).json({ error: { message: 'Invalid credentials' } });
  }

  // NOTE: password is stored in plaintext in this demo. Replace with hashing in prod.
  if (existing.password_hash !== password) {
    return res.status(401).json({ error: { message: 'Invalid credentials' } });
  }

  const now = new Date().toISOString();
  const sessionId = `sess-${uuidv4()}`;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  createSession({ id: sessionId, user_id: existing.id, created_at: now, expires_at: expiresAt });
  setSessionCookie(res, sessionId);

  res.json({ user: mapUserResponse(existing) });
});

/**
 * POST /api/auth/signup
 * Sign up a new user and create an organization
 */
router.post('/signup', (req, res) => {
  const { email, password, fullName, seed_demo, template, industry } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: { message: 'Email, password, and full name required' } });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: { message: 'Password must be at least 6 characters' } });
  }

  const existing = getUserByEmail(email);
  if (existing) return res.status(409).json({ error: { message: 'User already exists' } });

  const orgId = `org-${uuidv4()}`;
  const now = new Date().toISOString();
  const org = {
    id: orgId,
    name: `${fullName.split(' ')[0]}'s Company`,
    industry: industry || 'software',
    size: '1-10',
    country: '',
    timezone: '',
    currency: 'USD',
    phone: '',
    website: '',
    created_at: now,
  };

  createOrganization(org);

  const id = `user-${uuidv4()}`;
  const user = { id, email, name: fullName, password_hash: password, role: 'owner', org_id: orgId, created_at: now };
  createUser(user);

  if (seed_demo) {
    seedTemplate(orgId, template || 'software');
  }

  const sessionId = `sess-${uuidv4()}`;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  createSession({ id: sessionId, user_id: id, created_at: now, expires_at: expiresAt });
  setSessionCookie(res, sessionId);

  res.status(201).json({ user: mapUserResponse({ ...user, companyName: org.name, orgId: org.id }) });
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[SESSION_COOKIE_NAME];
  if (sessionId) {
    deleteSession(sessionId);
  }
  clearSessionCookie(res);
  res.json({ success: true });
});

/**
 * GET /api/auth/me
 */
router.get('/me', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[SESSION_COOKIE_NAME];

  if (!sessionId) {
    return res.status(401).json({ error: { message: 'Not authenticated' } });
  }

  const user = getUserBySessionId(sessionId);
  if (!user) {
    return res.status(401).json({ error: { message: 'Not authenticated' } });
  }

  res.json({ user: mapUserResponse(user) });
});

export default router;
