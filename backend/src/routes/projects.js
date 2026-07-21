import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const projects = [];

/**
 * GET /api/projects
 * List all projects
 */
router.get('/', (req, res) => {
  res.json({ projects });
});

/**
 * GET /api/projects/:id
 * Get a single project
 */
router.get('/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: { message: 'Project not found' } });
  }
  res.json({ project });
});

/**
 * POST /api/projects
 * Create a new project
 */
router.post('/', (req, res) => {
  const { name, progress, status } = req.body;
  if (!name) {
    return res.status(400).json({ error: { message: 'Project name required' } });
  }

  const project = {
    id: `p-${uuidv4()}`,
    name,
    progress: Number(progress ?? 0),
    status: status || 'In Progress',
    created_at: new Date().toISOString(),
  };

  projects.push(project);
  res.status(201).json({ project });
});

export default router;
