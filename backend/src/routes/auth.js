import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createUser, getUserByEmail, createOrganization } from '../db.js';
import { seedTemplate } from '../services/templates.js';

const router = express.Router();

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

  res.json({
    user: {
      id: existing.id,
      email: existing.email,
      name: existing.name,
      role: existing.role,
      org_id: existing.org_id,
    },
  });
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

  res.status(201).json({ user, org });
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
  res.json({ success: true });
});

/**
 * GET /api/auth/me
 */
router.get('/me', (req, res) => {
  res.status(401).json({ error: { message: 'Not authenticated' } });
});

export default router;
