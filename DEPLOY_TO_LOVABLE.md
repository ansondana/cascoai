# Deploy to Lovable - Subdomain/Subpage Setup

This guide will help you deploy your Casco AI Client Agent Portal to Lovable and connect it as a subdomain or subpage of your existing Lovable website.

## Option 1: Deploy as Subdomain (portal.yourdomain.com)

### Step 1: Prepare Your Repository

1. **Initialize Git Repository** (if not already done):
```bash
cd ~/casco-ai-client-portal
git init
git add .
git commit -m "Initial commit: Casco AI Client Agent Portal"
```

2. **Push to GitHub**:
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/casco-ai-client-portal.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Lovable

1. **Go to Lovable**:
   - Visit https://lovable.dev or your Lovable dashboard
   - Click "New Project" or "Import Project"

2. **Import from GitHub**:
   - Select "Import from GitHub"
   - Choose your repository: `casco-ai-client-portal`
   - Select the `portal` folder as the root directory (not the entire repo)

3. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Framework**: Next.js

### Step 3: Configure Environment Variables in Lovable

In Lovable dashboard, add these environment variables:

**Production Environment Variables:**
```
AUTH0_SECRET=your_auth0_secret_here
AUTH0_BASE_URL=https://portal.yourdomain.com
AUTH0_ISSUER_BASE_URL=https://dev-wjdhvq8yjlb6lbjm.us.auth0.com
AUTH0_CLIENT_ID=tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V
AUTH0_CLIENT_SECRET=-7k3Kjum6sNFedgFqinfl0JiBdy-09aGT5eIpx3UjHu5u_aP37jo_BJ9fUQ3YFNR
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_URL=https://portal.yourdomain.com
```

### Step 4: Configure Subdomain in Lovable/Domain Settings

1. In Lovable dashboard, go to **Settings → Domains**
2. Add custom domain: `portal.yourdomain.com`
3. Follow DNS configuration instructions (add CNAME record)
4. Update Auth0 callback URLs to include the new domain

### Step 5: Update Auth0 Configuration

1. Go to https://manage.auth0.com
2. Applications → Your Application → Settings
3. Update **Allowed Callback URLs**:
   ```
   https://portal.yourdomain.com/api/auth/callback
   ```
4. Update **Allowed Logout URLs**:
   ```
   https://portal.yourdomain.com/api/auth/logout
   ```
5. Update **Allowed Web Origins**:
   ```
   https://portal.yourdomain.com
   ```

## Option 2: Deploy as Subpage (yourdomain.com/portal)

### Step 1: Configure Next.js for Subpath

Update `next.config.js` to support subpath deployment:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    domains: [],
  },
};
```

### Step 2: Update Environment Variables

Set `NEXT_PUBLIC_BASE_PATH=/portal` in Lovable environment variables.

### Step 3: Deploy to Lovable

1. Follow Step 1 and Step 2 from Option 1
2. In Lovable, configure it as a subpath in your existing project
3. Or use reverse proxy configuration if available

## Option 3: Deploy Frontend + Backend Separately

### Backend Deployment (FastAPI)

For the backend, you have several options:

#### Option A: Deploy Backend to Render/Railway

1. **Create `render.yaml`** (see file below)
2. Push backend code to separate repository
3. Deploy to Render.com or Railway.app
4. Update `NEXT_PUBLIC_API_URL` in frontend

#### Option B: Use Lovable API Routes (Recommended)

If Lovable supports API routes, you can:
1. Convert FastAPI endpoints to Next.js API routes
2. Deploy everything in one project
3. Use `/api/*` routes in Next.js instead of separate backend

## Recommended Approach: Full-Stack Next.js

Since Lovable works best with Next.js, consider:

1. **Migrate FastAPI endpoints to Next.js API Routes**:
   - Convert `/api/agents` → `app/api/agents/route.ts`
   - Convert `/api/analytics` → `app/api/analytics/route.ts`
   - This keeps everything in one deployment

2. **Deploy everything to Lovable**:
   - Single repository
   - Single deployment
   - Easier management

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Repository connected to Lovable
- [ ] Environment variables configured in Lovable
- [ ] Build settings configured
- [ ] Domain/subdomain configured
- [ ] Auth0 callback URLs updated
- [ ] Backend deployed (if separate)
- [ ] API URL updated in frontend
- [ ] Test deployment

## After Deployment

1. **Test Authentication**: 
   - Visit your deployed URL
   - Test Auth0 login flow
   - Verify redirect works

2. **Test API Connection**:
   - Check if frontend can reach backend
   - Test agent listing
   - Test other API endpoints

3. **Monitor Logs**:
   - Check Lovable logs for errors
   - Monitor API responses
   - Check Auth0 logs

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Verify all dependencies install correctly
- Check TypeScript compilation errors

### Authentication Issues
- Verify Auth0 callback URLs match deployment URL
- Check environment variables are set correctly
- Verify AUTH0_SECRET is set

### API Connection Issues
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings on backend
- Ensure backend is accessible

## Need Help?

- Lovable Documentation: https://docs.lovable.dev
- Next.js Deployment: https://nextjs.org/docs/deployment
- Auth0 Deployment: https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow

