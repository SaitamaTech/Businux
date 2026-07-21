import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addDocument, getDocumentsByOrg } from '../db.js';

const router = express.Router();

// GET /api/documents?org_id=org-...
router.get('/', (req, res) => {
  const orgId = req.query.org_id;
  if (!orgId) return res.status(400).json({ error: { message: 'org_id required' } });
  const docs = getDocumentsByOrg(orgId);
  res.json({ documents: docs });
});

// POST /api/documents { org_id, title, content, source }
router.post('/', (req, res) => {
  const { org_id, title, content, source } = req.body;
  if (!org_id || !title || !content) return res.status(400).json({ error: { message: 'org_id, title and content required' } });
  const doc = {
    id: `doc-${uuidv4()}`,
    org_id,
    title,
    content,
    source: source || 'upload',
    created_at: new Date().toISOString(),
  };
  addDocument(doc);
  res.status(201).json({ document: doc });
});

export default router;
