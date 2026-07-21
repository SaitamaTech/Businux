import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock task storage
const tasks = [];

/**
 * GET /api/tasks
 * List all tasks
 */
router.get('/', (req, res) => {
  res.json({ tasks });
});

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', (req, res) => {
  const { title, status, priority, tag, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: { message: 'Title required' } });
  }

  const task = {
    id: `t-${uuidv4()}`,
    title,
    status: status || 'To Do',
    priority: priority || 'Medium',
    tag: tag || 'General',
    dueDate: dueDate || new Date().toISOString().split('T')[0],
  };

  tasks.push(task);
  res.status(201).json({ task });
});

/**
 * PUT /api/tasks/:id
 * Update a task
 */
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }

  Object.assign(task, req.body);
  res.json({ task });
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ task: deleted[0] });
});

export default router;
