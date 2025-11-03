# Quick Start Guide

## Prerequisites

Before starting, make sure you have:
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **Python 3.10+** ([Download](https://www.python.org/))
- **Auth0 account** ([Sign up](https://auth0.com))
- **Vapi API key** ([Get one](https://vapi.ai))

## Installation Options

### Option 1: Automated Setup Script

```bash
cd casco-ai-client-portal
./setup.sh
```

### Option 2: Manual Setup

#### 1. Backend Setup

```bash
cd portal-api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Vapi API key
```

#### 2. Frontend Setup

```bash
cd portal
npm install
cp .env.example .env.local
# Edit .env.local with your Auth0 credentials
```

## Configuration

### Auth0 Setup

1. Go to https://auth0.com and create an account
2. Create a new **Regular Web Application**
3. Configure the following:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000/api/auth/logout`
   - **Allowed Web Origins**: `http://localhost:3000`
4. Copy these values to `portal/.env.local`:
   - Domain → `AUTH0_ISSUER_BASE_URL`
   - Client ID → `AUTH0_CLIENT_ID`
   - Client Secret → `AUTH0_CLIENT_SECRET`

### Vapi API Setup

1. Get your API key from https://vapi.ai
2. Add it to `portal-api/.env` as `VAPI_API_KEY`

## Running the Application

### Terminal 1: Backend API

```bash
cd portal-api
source venv/bin/activate
uvicorn main:app --reload
```

Backend will run on **http://localhost:8000**
- API Docs: http://localhost:8000/docs

### Terminal 2: Frontend Portal

```bash
cd portal
npm run dev
```

Frontend will run on **http://localhost:3000**

## First Time Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Python 3.10+ installed
- [ ] Auth0 account created
- [ ] Auth0 application configured
- [ ] `portal/.env.local` configured with Auth0 credentials
- [ ] Vapi API key obtained
- [ ] `portal-api/.env` configured with Vapi API key
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Both servers running successfully

## Troubleshooting

### Backend Issues

- **Port 8000 already in use**: Change `PORT` in `portal-api/.env`
- **Import errors**: Make sure virtual environment is activated
- **CORS errors**: Check `ALLOWED_ORIGINS` in `portal-api/.env`

### Frontend Issues

- **Port 3000 already in use**: Change port with `npm run dev -- -p 3001`
- **Auth0 errors**: Verify credentials in `portal/.env.local`
- **API connection errors**: Check `NEXT_PUBLIC_API_URL` matches backend URL

## Next Steps

1. Visit http://localhost:3000
2. Log in with Auth0
3. Explore the dashboard
4. Test an agent
5. View analytics
6. Manage knowledge base

For detailed documentation, see [PORTAL_SETUP.md](./PORTAL_SETUP.md)

