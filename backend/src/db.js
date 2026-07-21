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

export function getDocumentsByOrg(orgId) {
  return db.prepare('SELECT * FROM documents WHERE org_id = ? ORDER BY created_at DESC').all(orgId);
}

export default db;
