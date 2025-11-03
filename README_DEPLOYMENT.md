# Deployment Guide for Lovable

## Quick Start

For the fastest deployment, follow the steps in **QUICK_DEPLOY.md**.

## Deployment Options

### Option 1: Subdomain Deployment (Recommended)
- Deploy to: `portal.yourdomain.com`
- Easiest setup
- Clean URL structure
- See: `DEPLOY_TO_LOVABLE.md` → Option 1

### Option 2: Subpath Deployment
- Deploy to: `yourdomain.com/portal`
- Integrated with existing site
- Requires base path configuration
- See: `DEPLOY_TO_LOVABLE.md` → Option 2

## What You Need

1. **GitHub Account** - To host the code
2. **Lovable Account** - To deploy the application
3. **Domain** - Your domain or subdomain
4. **Auth0 Account** - Already configured ✅
5. **Vapi API Key** - Already configured ✅

## Step-by-Step

### 1. Prepare Repository

```bash
cd ~/casco-ai-client-portal
./prepare-for-deploy.sh
```

Or manually:
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/casco-ai-client-portal.git
git branch -M main
git push -u origin main
```

### 3. Import to Lovable

1. Go to Lovable dashboard
2. Click "New Project" → "Import from GitHub"
3. Select your repository
4. **Important**: Set root directory to `portal` (not the whole repo)
5. Framework will auto-detect as Next.js

### 4. Configure Environment Variables

In Lovable → Settings → Environment Variables, add:

```
AUTH0_SECRET=3154e338b4271ae50a4794f91b34d2656c8674bde24f841fb0b82c874e669208
AUTH0_BASE_URL=https://portal.yourdomain.com
AUTH0_ISSUER_BASE_URL=https://dev-wjdhvq8yjlb6lbjm.us.auth0.com
AUTH0_CLIENT_ID=tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V
AUTH0_CLIENT_SECRET=-7k3Kjum6sNFedgFqinfl0JiBdy-09aGT5eIpx3UjHu5u_aP37jo_BJ9fUQ3YFNR
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_URL=https://portal.yourdomain.com
```

**Remember**: Replace `yourdomain.com` with your actual domain!

### 5. Configure Domain

#### For Subdomain (portal.yourdomain.com):
1. In Lovable → Settings → Domains
2. Add custom domain: `portal.yourdomain.com`
3. Add CNAME DNS record pointing to Lovable
4. Wait for SSL certificate

#### For Subpath (yourdomain.com/portal):
1. Configure in Lovable subpath settings
2. Set `NEXT_PUBLIC_BASE_PATH=/portal`
3. Update `AUTH0_BASE_URL` to include `/portal`

### 6. Update Auth0 Settings

1. Go to https://manage.auth0.com
2. Applications → Your Application → Settings
3. Update:
   - **Callback URLs**: `https://portal.yourdomain.com/api/auth/callback`
   - **Logout URLs**: `https://portal.yourdomain.com/api/auth/logout`
   - **Web Origins**: `https://portal.yourdomain.com`

### 7. Deploy Backend (if separate)

If keeping FastAPI backend separate:

1. **Deploy to Render.com**:
   - Use `render.yaml` configuration
   - Set environment variables
   - Update `NEXT_PUBLIC_API_URL` in frontend

2. **Or use Lovable API Routes**:
   - Convert FastAPI to Next.js API routes
   - Everything in one deployment
   - See: `DEPLOY_TO_LOVABLE.md` for details

### 8. Deploy!

Click "Deploy" in Lovable dashboard and wait for build.

## Files Created

- ✅ `DEPLOY_TO_LOVABLE.md` - Full deployment guide
- ✅ `QUICK_DEPLOY.md` - Quick reference
- ✅ `lovable.json` - Lovable configuration
- ✅ `render.yaml` - Backend deployment config
- ✅ `.gitignore` - Git ignore rules
- ✅ `prepare-for-deploy.sh` - Setup script

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify environment variables
- Review build logs

### Auth0 Redirect Loop
- Verify callback URLs match exactly
- Check domain configuration
- Clear browser cache

### API Not Connecting
- Verify backend URL is correct
- Check CORS settings
- Ensure backend is accessible

## Next Steps After Deployment

1. Test authentication flow
2. Verify all pages load
3. Test API endpoints
4. Check mobile responsiveness
5. Monitor logs for errors

## Support

- **Lovable Docs**: Check Lovable platform documentation
- **Quick Guide**: See `QUICK_DEPLOY.md`
- **Full Guide**: See `DEPLOY_TO_LOVABLE.md`

