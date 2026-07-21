# Businux Backend API

Express.js backend for the Businux dashboard application.

## Features

- ✅ CORS configured for Vercel frontend
- ✅ Auth endpoints (login, signup, logout)
- ✅ CRM endpoints (customers CRUD)
- ✅ Tasks endpoints
- ✅ AI Assistant endpoint (Grok integration)
- ✅ Ready for Render deployment

## Setup

### Local Development

1. **Install dependencies**
```bash
npm install
```

2. **Create `.env` file** (copy from `.env.example`)
```bash
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_key_here
```

3. **Start the server**
```bash
npm dev
```

The backend will run on `http://localhost:4000` and the API is at `http://localhost:4000/api`.

## API Endpoints

### Auth
- `POST /api/auth/login` — Login a user
- `POST /api/auth/signup` — Sign up a new user
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Get current user

### CRM
- `GET /api/crm/customers` — List all customers
- `GET /api/crm/customers/:id` — Get a specific customer
- `POST /api/crm/customers` — Create a new customer
- `PUT /api/crm/customers/:id` — Update a customer
- `DELETE /api/crm/customers/:id` — Delete a customer

### Tasks
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

### AI Assistant
- `POST /api/ai-assistant/messages` — Send a message to the AI assistant

## Deployment to Render

1. **Push to GitHub**
```bash
git add .
git commit -m "Add backend API"
git push origin main
```

2. **On Render Dashboard**
   - Create a new Web Service
   - Connect your GitHub repo
   - Set the **Root Directory** to `backend/`
   - Add environment variables:
     - `PORT` = `4000`
     - `NODE_ENV` = `production`
     - `FRONTEND_URL` = `https://your-vercel-site.vercel.app`
     - `GROK_API_KEY` = `your_secret_key`
   - Deploy

3. **Update Frontend on Vercel**
   - Set `NEXT_PUBLIC_API_BASE_URL` = `https://your-render-service.onrender.com/api`
   - Set `NEXT_PUBLIC_USE_MOCK_API` = `false`
   - Redeploy

## CORS Configuration

The backend automatically allows requests from the `FRONTEND_URL` environment variable. Update this on Render to match your Vercel frontend URL.

## Error Handling

All errors return JSON in the format:
```json
{
  "error": {
    "message": "Error description"
  }
}
```

## Future Enhancements

- [ ] Add database (PostgreSQL, MongoDB)
- [ ] Add JWT authentication
- [ ] Add request validation middleware
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Add tests
- [ ] Add Docker support
