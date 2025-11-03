# Casco AI Client Agent Portal - Setup Guide

This guide will help you set up and run the Casco AI Client Agent Portal.

## Architecture

The portal consists of two main components:

1. **Frontend Portal** (`/portal`) - Next.js 14 application with TypeScript and Tailwind CSS
2. **Backend API** (`/portal-api`) - FastAPI application providing REST endpoints

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL (optional, for production)
- Auth0 account (for authentication)
- Vapi API key (for voice agent integration)

## Quick Start

### 1. Backend API Setup

```bash
cd portal-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn main:app --reload
```

The API will run on `http://localhost:8000`

### 2. Frontend Portal Setup

```bash
cd portal
npm install
cp .env.example .env.local
# Edit .env.local with your Auth0 credentials
npm run dev
```

The portal will run on `http://localhost:3000`

## Configuration

### Auth0 Setup

1. Create an Auth0 account at https://auth0.com
2. Create a new application:
   - Type: Regular Web Application
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000/api/auth/logout`
   - Allowed Web Origins: `http://localhost:3000`
3. Copy the following values to `portal/.env.local`:
   - Domain (for `AUTH0_ISSUER_BASE_URL`)
   - Client ID (for `AUTH0_CLIENT_ID`)
   - Client Secret (for `AUTH0_CLIENT_SECRET`)

### Vapi API Setup

1. Get your Vapi API key from https://vapi.ai
2. Add it to `portal-api/.env` as `VAPI_API_KEY`

### Environment Variables

**Frontend (`portal/.env.local`)**:
```env
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend (`portal-api/.env`)**:
```env
VAPI_API_KEY=your_vapi_api_key
VAPI_BASE_URL=https://api.vapi.ai
ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/casco_portal
```

## Features

### ✅ Implemented

- [x] Authentication with Auth0
- [x] Dashboard with agent overview
- [x] Agent testing interface
- [x] Analytics dashboard with charts
- [x] Knowledge bank management
- [x] Feedback forms
- [x] Admin panel (basic structure)
- [x] Responsive design
- [x] Modern UI with Tailwind CSS

### 🚧 To Be Implemented

- [ ] Database integration (PostgreSQL)
- [ ] Real-time call monitoring
- [ ] Export functionality (CSV/PDF)
- [ ] Advanced admin features
- [ ] User role management
- [ ] Email notifications
- [ ] Live chat integration

## Project Structure

```
casco-ai-client-portal/
├── portal/              # Next.js frontend
│   ├── app/            # Pages and routes
│   ├── components/     # React components
│   └── lib/           # Utilities and API client
├── portal-api/         # FastAPI backend
│   └── main.py        # API endpoints
└── PORTAL_SETUP.md    # This file
```

## Development

### Frontend Development

```bash
cd portal
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run linter
```

### Backend Development

```bash
cd portal-api
uvicorn main:app --reload  # Start with hot reload
```

### API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment

### Frontend (Vercel - Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

Alternative platforms: Netlify, AWS Amplify, Render

### Backend (Render/Railway/AWS)

1. Set up PostgreSQL database
2. Deploy FastAPI application
3. Configure environment variables
4. Update `NEXT_PUBLIC_API_URL` in frontend

## Testing

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Login with Auth0
4. Explore dashboard and features

## Support

For issues or questions:
- Check API logs: `portal-api/` terminal
- Check frontend logs: `portal/` terminal
- Review API docs: http://localhost:8000/docs

## Next Steps

1. Set up PostgreSQL database
2. Implement user role management
3. Add real-time features with WebSockets
4. Set up CI/CD pipeline
5. Configure production environment

