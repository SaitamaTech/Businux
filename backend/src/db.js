import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.resolve(process.cwd(), 'backend', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_FILE = path.join(DATA_DIR, 'businux.sqlite');

const db = new Database(DB_FILE);

// Initialize schema
db.exec(`
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  country TEXT,
  timezone TEXT,
  currency TEXT,
  phone TEXT,
  website TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT,
  role TEXT,
  org_id TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(org_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  org_id TEXT,
  title TEXT,
  content TEXT,
  source TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(org_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

export function createOrganization(org) {
  const stmt = db.prepare(`INSERT INTO organizations (id, name, industry, size, country, timezone, currency, phone, website, created_at) VALUES (@id,@name,@industry,@size,@country,@timezone,@currency,@phone,@website,@created_at)`);
  stmt.run(org);
  return org;
}

export function getOrganizationById(id) {
  return db.prepare('SELECT * FROM organizations WHERE id = ?').get(id);
}

export function createUser(user) {
  const stmt = db.prepare(`INSERT INTO users (id, email, name, password_hash, role, org_id, created_at) VALUES (@id,@email,@name,@password_hash,@role,@org_id,@created_at)`);
  stmt.run(user);
  return user;
}

export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function addDocument(doc) {
  const stmt = db.prepare(`INSERT INTO documents (id, org_id, title, content, source, created_at) VALUES (@id,@org_id,@title,@content,@source,@created_at)`);
  stmt.run(doc);
  return doc;
}

export function createSession(session) {
  const stmt = db.prepare(`INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (@id,@user_id,@created_at,@expires_at)`);
  stmt.run(session);
  return session;
}

export function getSessionById(id) {
  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
}

export function deleteSession(id) {
  const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
  stmt.run(id);
}

export function getUserBySessionId(sessionId) {
  return db.prepare(`
    SELECT users.*, organizations.name AS companyName, organizations.id AS orgId
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    LEFT JOIN organizations ON users.org_id = organizations.id
    WHERE sessions.id = ? AND sessions.expires_at > ?
  `).get(sessionId, new Date().toISOString());
}

export function getDocumentsByOrg(orgId) {
  return db.prepare('SELECT * FROM documents WHERE org_id = ? ORDER BY created_at DESC').all(orgId);
}

export default db;
