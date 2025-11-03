# Lovable Deployment Setup

## ✅ Code Pushed to GitHub

Repository: https://github.com/ansondana/cascoai

## 🚀 Import to Lovable

### Step 1: Import Project

1. Go to your **Lovable Dashboard**
2. Click **"New Project"** or **"Import Project"**
3. Select **"Import from GitHub"**
4. Choose repository: **cascoai**
5. **⚠️ CRITICAL**: Set **Root Directory** to `portal` (NOT the entire repo!)

### Step 2: Environment Variables

In Lovable → **Settings → Environment Variables**, add:

```
AUTH0_SECRET=3154e338b4271ae50a4794f91b34d2656c8674bde24f841fb0b82c874e669208
AUTH0_BASE_URL=https://portal.yourdomain.com
AUTH0_ISSUER_BASE_URL=https://dev-wjdhvq8yjlb6lbjm.us.auth0.com
AUTH0_CLIENT_ID=tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V
AUTH0_CLIENT_SECRET=-7k3Kjum6sNFedgFqinfl0JiBdy-09aGT5eIpx3UjHu5u_aP37jo_BJ9fUQ3YFNR
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_URL=https://portal.yourdomain.com
```

**Replace `yourdomain.com` with your actual domain!**

### Step 3: Configure Domain

#### Option A: Subdomain (portal.yourdomain.com)
- In Lovable → **Settings → Domains**
- Add custom domain: `portal.yourdomain.com`
- Add CNAME DNS record pointing to Lovable
- Wait for SSL certificate

#### Option B: Subpath (yourdomain.com/portal)
- Set environment variable: `NEXT_PUBLIC_BASE_PATH=/portal`
- Update `AUTH0_BASE_URL` to: `https://yourdomain.com/portal`
- Configure in Lovable subpath settings

### Step 4: Update Auth0

1. Go to https://manage.auth0.com
2. **Applications** → Your Application → **Settings**
3. Update **Application URIs**:
   - **Allowed Callback URLs**: `https://portal.yourdomain.com/api/auth/callback`
   - **Allowed Logout URLs**: `https://portal.yourdomain.com/api/auth/logout`
   - **Allowed Web Origins**: `https://portal.yourdomain.com`
4. Save changes

### Step 5: Deploy Backend (if separate)

If keeping FastAPI backend separate:
- Deploy to Render.com, Railway.app, or Fly.io
- Update `NEXT_PUBLIC_API_URL` with backend URL
- Or convert to Next.js API routes (recommended)

### Step 6: Deploy!

Click **"Deploy"** in Lovable dashboard and wait for build.

## ⚠️ Important Reminders

1. **Root Directory MUST be `portal`** when importing to Lovable
2. **Replace `yourdomain.com`** in all environment variables
3. **Auth0 URLs** must match your deployment URL exactly
4. **Backend**: Deploy separately or convert to Next.js API routes

## ✅ Checklist

- [ ] Code pushed to GitHub ✅
- [ ] Imported to Lovable
- [ ] Root directory set to `portal`
- [ ] Environment variables configured
- [ ] Domain/subdomain configured
- [ ] Auth0 URLs updated
- [ ] Backend deployed (if separate)
- [ ] Deployment successful

## 🎉 You're Ready!

Your code is on GitHub and ready to deploy to Lovable!
