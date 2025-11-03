# Casco AI Client Agent Portal

A modern web platform for Casco AI clients to test, monitor, and manage their Vapi voice agents.

## Features

- 🔐 Secure authentication with Auth0
- 📊 Analytics dashboard with call metrics
- 🧪 Agent testing with real or simulated calls
- 📚 Knowledge bank management with version control
- 💬 Feedback forms for bug reports and improvements
- 🎨 Modern, minimalist UI inspired by Apple design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

3. Configure Auth0:
   - Sign up for Auth0 account
   - Create a new application (Regular Web Application)
   - Add `http://localhost:3000/api/auth/callback` to Allowed Callback URLs
   - Add `http://localhost:3000/api/auth/logout` to Allowed Logout URLs
   - Copy your Auth0 credentials to `.env.local`

4. Update `.env.local` with your configuration values.

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portal/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes (Auth0 handlers)
│   ├── analytics/      # Analytics page
│   ├── feedback/       # Feedback page
│   ├── knowledge/      # Knowledge bank page
│   └── test/           # Agent testing page
├── components/         # React components
├── lib/                # Utilities and API client
└── public/             # Static assets
```

## Environment Variables

- `AUTH0_SECRET`: Auth0 secret (auto-generated)
- `AUTH0_BASE_URL`: Base URL for your application
- `AUTH0_ISSUER_BASE_URL`: Your Auth0 domain
- `AUTH0_CLIENT_ID`: Auth0 application client ID
- `AUTH0_CLIENT_SECRET`: Auth0 application client secret
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Auth0
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to:
- Render
- AWS Amplify
- Railway
- Any platform supporting Next.js

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

