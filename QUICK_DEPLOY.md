# Quick Deploy to Lovable Guide

## 🚀 Fastest Way to Deploy

### Step 1: Push to GitHub

```bash
cd ~/casco-ai-client-portal
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/casco-ai-client-portal.git
git push -u origin main
```

### Step 2: Import to Lovable

1. **Go to Lovable**: https://lovable.dev or your Lovable dashboard
2. **Click "New Project"** or "Import Project"
3. **Select "Import from GitHub"**
4. **Choose repository**: `casco-ai-client-portal`
5. **Root Directory**: Set to `portal` (not the entire repo)
6. **Framework**: Auto-detect Next.js

### Step 3: Configure Environment Variables

In Lovable dashboard → Project Settings → Environment Variables:

```
AUTH0_SECRET=3154e338b4271ae50a4794f91b34d2656c8674bde24f841fb0b82c874e669208
AUTH0_BASE_URL=https://portal.yourdomain.com
AUTH0_ISSUER_BASE_URL=https://dev-wjdhvq8yjlb6lbjm.us.auth0.com
AUTH0_CLIENT_ID=tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V
AUTH0_CLIENT_SECRET=-7k3Kjum6sNFedgFqinfl0JiBdy-09aGT5eIpx3UjHu5u_aP37jo_BJ9fUQ3YFNR
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_URL=https://portal.yourdomain.com
```

**Important**: Replace `yourdomain.com` with your actual domain!

### Step 4: Deploy Backend (if separate)

If keeping backend separate, deploy to:
- **Render.com** (easiest)
- **Railway.app**
- **Fly.io**
- **AWS/Heroku**

Then update `NEXT_PUBLIC_API_URL` above.

### Step 5: Configure Domain in Lovable

1. **Lovable Dashboard** → Settings → Domains
2. **Add Custom Domain**: `portal.yourdomain.com`
3. **Add DNS Record**: CNAME pointing to Lovable's provided URL
4. **SSL**: Auto-configured by Lovable

### Step 6: Update Auth0

1. **Auth0 Dashboard** → Applications → Your App
2. **Allowed Callback URLs**: Add `https://portal.yourdomain.com/api/auth/callback`
3. **Allowed Logout URLs**: Add `https://portal.yourdomain.com/api/auth/logout`
4. **Allowed Web Origins**: Add `https://portal.yourdomain.com`

### Step 7: Deploy!

Click **Deploy** in Lovable dashboard. Wait for build to complete.

## 📋 Alternative: Deploy as Subpage

If you want `yourdomain.com/portal` instead of subdomain:

1. In Lovable, configure base path: `/portal`
2. Set environment variable: `NEXT_PUBLIC_BASE_PATH=/portal`
3. Update `AUTH0_BASE_URL` to: `https://yourdomain.com/portal`
4. Update Auth0 URLs accordingly

## 🔧 Troubleshooting

### Build Fails
- Check Node version (18+)
- Verify all env vars are set
- Check build logs

### Auth0 Redirect Issues
- Verify callback URL matches exactly
- Check domain matches Auth0 settings
- Clear browser cache

### API Connection Fails
- Verify backend URL is accessible
- Check CORS settings
- Verify `NEXT_PUBLIC_API_URL` is correct

## ✅ After Deployment Checklist

- [ ] Site loads at deployed URL
- [ ] Auth0 login works
- [ ] Redirect after login works
- [ ] Dashboard loads
- [ ] API calls work
- [ ] All pages accessible

## 📞 Need Help?

- Check Lovable docs for specific platform features
- Verify all environment variables are set
- Check deployment logs in Lovable dashboard

