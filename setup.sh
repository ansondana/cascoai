#!/bin/bash

# Casco AI Client Agent Portal Setup Script

echo "🚀 Setting up Casco AI Client Agent Portal..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js 18+ from https://nodejs.org/"
    echo "Or use Homebrew: brew install node"
    exit 1
fi

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed."
    echo "Please install Python 3.10+ from https://www.python.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Python version: $(python3 --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend API..."
cd portal-api

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit portal-api/.env with your configuration"
fi

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "📦 Setting up frontend portal..."
cd ../portal

echo "Installing npm dependencies..."
npm install

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please edit portal/.env.local with your Auth0 credentials"
fi

echo "✅ Frontend setup complete!"
echo ""

# Instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Setup complete! Next steps:"
echo ""
echo "1. Configure Auth0:"
echo "   - Create an account at https://auth0.com"
echo "   - Create a Regular Web Application"
echo "   - Update portal/.env.local with your Auth0 credentials"
echo ""
echo "2. Configure Vapi API:"
echo "   - Get your API key from https://vapi.ai"
echo "   - Update portal-api/.env with your VAPI_API_KEY"
echo ""
echo "3. Start the backend:"
echo "   cd portal-api"
echo "   source venv/bin/activate"
echo "   uvicorn main:app --reload"
echo ""
echo "4. Start the frontend (in a new terminal):"
echo "   cd portal"
echo "   npm run dev"
echo ""
echo "5. Visit http://localhost:3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

