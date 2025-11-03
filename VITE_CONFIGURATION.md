# Vite + React Portal Configuration Guide

Your Lovable project is **Vite + React**, and the portal is correctly configured! Here's how to set it up.

## ✅ Portal Status

- ✅ 6 pages (Dashboard, Test Agent, Analytics, Knowledge Bank, Feedback, Admin)
- ✅ Authentication wrapper
- ✅ Responsive design matching Casco AI aesthetic
- ✅ API integration ready
- ✅ **Correctly configured for Vite!**

## 🔧 Configuration Steps

### Step 1: Set Environment Variable in Lovable

Since this is a **Vite** project, use `VITE_API_URL` (not `NEXT_PUBLIC_API_URL`).

**In Lovable Dashboard → Settings → Environment Variables:**

Add:
```
VITE_API_URL=https://your-api-domain.com
```

**For your FastAPI backend:**

If your backend is at `http://localhost:8000` (local):
```
VITE_API_URL=http://localhost:8000
```

If your backend is deployed:
```
VITE_API_URL=https://your-backend-url.com
```

### Step 2: How Vite Environment Variables Work

In Vite projects:
- ✅ Environment variables **must** be prefixed with `VITE_`
- ✅ Access them using `import.meta.env.VITE_VARIABLE_NAME`
- ✅ The portal code is already using `import.meta.env.VITE_API_URL` ✅

### Step 3: Verify API Client

The portal should already have an API client using:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

This is **correct for Vite!** ✅

### Step 4: Local Development (.env file)

If you're running locally, create a `.env` file in your project root:

```env
VITE_API_URL=http://localhost:8000
```

**Note:** In Lovable, you set environment variables in the dashboard settings, not a `.env` file.

### Step 5: Update Auth0 URLs (if needed)

1. Go to https://manage.auth0.com
2. Applications → Your Application → Settings
3. Update **Application URIs** to match your Lovable deployment URL:
   - **Allowed Callback URLs**: `https://your-lovable-domain.com/api/auth/callback`
   - **Allowed Logout URLs**: `https://your-lovable-domain.com/api/auth/logout`
   - **Allowed Web Origins**: `https://your-lovable-domain.com`

## 🔍 Quick Checklist

- [ ] `VITE_API_URL` set in Lovable environment variables ✅
- [ ] Backend is running and accessible
- [ ] Auth0 configured (if using authentication)
- [ ] Test portal pages load correctly
- [ ] Test API calls work (check browser console)

## 🚀 Testing

1. **Set `VITE_API_URL`** in Lovable → Settings → Environment Variables
2. **Visit `/portal`** - Should load the dashboard
3. **Check browser console** - Should see API calls to your backend
4. **Test each page** - Dashboard, Analytics, Test Agent, etc.

## 🐛 Troubleshooting

### API Calls Failing

**Check:**
1. Is `VITE_API_URL` set correctly in Lovable environment variables?
2. Is your backend running and accessible?
3. Check browser console for CORS errors
4. Verify backend CORS allows your Lovable domain

### Pages Not Loading

**Check:**
1. Are routes configured at `/portal/*`?
2. Check for build errors in Lovable dashboard
3. Verify all dependencies are installed

### Environment Variable Not Working

**For Vite:**
- Must use `VITE_` prefix
- Access with `import.meta.env.VITE_API_URL`
- Rebuild/reload after changing environment variables
- Variables are exposed to client-side code (that's why `VITE_` prefix is required for security)

## ✅ You're All Set!

The portal is correctly configured for Vite + React. Just:

1. ✅ Set `VITE_API_URL` in Lovable environment variables
2. ✅ Make sure your backend is running
3. ✅ Test the portal pages

Everything else is already set up correctly! 🎉

## 📚 Vite Environment Variable Reference

- **Format**: `VITE_VARIABLE_NAME`
- **Access**: `import.meta.env.VITE_VARIABLE_NAME`
- **Example**: `import.meta.env.VITE_API_URL`
- **File**: Set in Lovable dashboard (or `.env` for local development)

The portal code is using this correctly! ✅

