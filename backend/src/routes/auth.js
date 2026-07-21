import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock user storage (replace with a real database)
const users = new Map();

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

  // Mock authentication — in production, hash & verify password against a DB
  const user = users.get(email) || {
    id: `user-${uuidv4()}`,
    email,
    name: email.split('@')[0].replace(/[0-9]/g, '').split(/[._-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'User',
    role: 'CEO',
    companyName: 'Your Company',
  };

  users.set(email, user);

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    },
  });
});

/**
 * POST /api/auth/signup
 * Sign up a new user
 */
router.post('/signup', (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: { message: 'Email, password, and full name required' } });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: { message: 'Password must be at least 6 characters' } });
  }

  if (users.has(email)) {
    return res.status(409).json({ error: { message: 'User already exists' } });
  }

  const user = {
    id: `user-${uuidv4()}`,
    email,
    name: fullName,
    role: 'CEO',
    companyName: 'Your Company',
  };

  users.set(email, user);

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    },
  });
});

/**
 * POST /api/auth/logout
 * Logout (clear session)
 */
router.post('/logout', (req, res) => {
  res.json({ success: true });
});

/**
 * GET /api/auth/me
 * Get current user
 */
router.get('/me', (req, res) => {
  // In production, extract user from JWT or session
  res.status(401).json({ error: { message: 'Not authenticated' } });
});

export default router;
