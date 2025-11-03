#!/bin/bash

# Script to prepare Casco AI Portal for Lovable deployment

echo "🚀 Preparing Casco AI Portal for Lovable Deployment..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit if needed
if [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
    echo "📝 Creating initial commit..."
    git commit -m "Initial commit: Casco AI Client Agent Portal"
    echo "✅ Initial commit created"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Preparation Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a GitHub repository (if not exists)"
echo "   https://github.com/new"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/casco-ai-client-portal.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Import to Lovable:"
echo "   - Go to Lovable dashboard"
echo "   - Import from GitHub"
echo "   - Select repository: casco-ai-client-portal"
echo "   - Set root directory: portal"
echo ""
echo "4. Configure environment variables in Lovable"
echo "   See: QUICK_DEPLOY.md"
echo ""
echo "5. Deploy!"
echo ""
echo "📚 Documentation:"
echo "   • Quick Guide: QUICK_DEPLOY.md"
echo "   • Full Guide: DEPLOY_TO_LOVABLE.md"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

