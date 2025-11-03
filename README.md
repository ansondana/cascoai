# Casco AI Client Agent Portal

A secure web platform where Casco AI clients can log in to test, monitor, and manage their Vapi voice agents.

## Overview

The Casco AI Client Agent Portal provides:
- 🔐 Secure authentication with Auth0
- 📊 Comprehensive analytics dashboard with call metrics
- 🧪 Integrated agent testing with real or simulated calls
- 📚 Knowledge bank management with version control
- 💬 Feedback forms for bug reports and improvements
- 👥 Admin panel for internal management

## Quick Start

See [PORTAL_SETUP.md](./PORTAL_SETUP.md) for detailed setup instructions.

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Auth0 account
- Vapi API key

### Installation

1. **Backend API:**
   ```bash
   cd portal-api
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your configuration
   uvicorn main:app --reload
   ```

2. **Frontend Portal:**
   ```bash
   cd portal
   npm install
   cp .env.example .env.local
   # Edit .env.local with your Auth0 credentials
   npm run dev
   ```

Visit `http://localhost:3000` to access the portal.

## Project Structure

```
casco-ai-client-portal/
├── portal/              # Next.js frontend application
│   ├── app/            # Pages and routes (App Router)
│   ├── components/     # React components
│   └── lib/           # Utilities and API client
├── portal-api/         # FastAPI backend application
│   └── main.py        # API endpoints
└── PORTAL_SETUP.md    # Detailed setup guide
```

## Features

### ✅ Implemented

- [x] Authentication with Auth0 OAuth 2.0
- [x] Dashboard with agent overview and quick actions
- [x] Agent testing interface with Vapi integration
- [x] Analytics dashboard with charts and filtering
- [x] Knowledge bank management with version control
- [x] Feedback forms with categorization
- [x] Admin panel for internal use
- [x] Responsive design for mobile and desktop
- [x] Modern UI with Tailwind CSS (Apple-inspired)

### 🚧 Coming Soon

- [ ] PostgreSQL database integration
- [ ] Real-time call monitoring
- [ ] Export functionality (CSV/PDF)
- [ ] Advanced admin features
- [ ] User role management
- [ ] Email notifications
- [ ] Live chat integration

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Recharts
- React Hook Form + Zod

**Backend:**
- FastAPI
- Python 3.10+
- Pydantic
- Uvicorn

**Services:**
- Auth0 (Authentication)
- Vapi API (Voice Agents)
- PostgreSQL (Database - optional)

## Documentation

- [Setup Guide](./PORTAL_SETUP.md) - Detailed setup instructions
- [Frontend README](./portal/README.md) - Frontend documentation
- [API README](./portal-api/README.md) - Backend API documentation

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment

### Frontend (Vercel - Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Backend (Render/Railway/AWS)
1. Set up PostgreSQL database
2. Deploy FastAPI application
3. Configure environment variables
4. Update `NEXT_PUBLIC_API_URL` in frontend

## License

Copyright © 2025 Casco AI. All rights reserved.

## Support

For questions or issues, please contact support@cascoai.com or refer to the [Setup Guide](./PORTAL_SETUP.md).

