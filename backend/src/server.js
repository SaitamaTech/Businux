import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(express.json());

// CORS Configuration — Allow requests from the Vercel frontend
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', time: new Date().toISOString() });
});

// Import route handlers
import authRoutes from './routes/auth.js';
import crmRoutes from './routes/crm.js';
import tasksRoutes from './routes/tasks.js';
import aiAssistantRoutes from './routes/ai-assistant.js';
import documentsRoutes from './routes/documents.js';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/ai-assistant', aiAssistantRoutes);
app.use('/api/documents', documentsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`🔒 CORS enabled for: ${FRONTEND_URL}`);
  console.log(`📚 API Base: http://localhost:${PORT}/api`);
});
