# Configuration Still Needed

## ✅ Already Configured
- ✅ Vapi API Key: `e458fb29-5c59-41b5-bd11-a7dbd325a48e`
- ✅ Auth0 Client ID: `tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V`

## ⚠️ Still Need

### 1. Auth0 Domain
Your Auth0 domain can be found in your Auth0 dashboard. It's typically in the format:
- `https://YOUR-TENANT.auth0.com`
- Example: `https://myapp.us.auth0.com`

**To find it:**
1. Go to https://manage.auth0.com
2. Look at the URL or Settings → Domain
3. Copy the domain (e.g., `myapp.us.auth0.com`)

**Update in:**
- `portal/.env.local` → `AUTH0_ISSUER_BASE_URL=https://YOUR-DOMAIN.auth0.com`
- `portal-api/.env` → `AUTH0_DOMAIN=YOUR-DOMAIN.auth0.com`

### 2. Auth0 Client Secret
Your Auth0 Client Secret can be found in:
1. Auth0 Dashboard → Applications → Your Application
2. Settings tab → Scroll to "Client Secret"
3. Click "Show" or copy the secret

**Update in:**
- `portal/.env.local` → `AUTH0_CLIENT_SECRET=your_secret_here`

### 3. Auth0 Secret (for Next.js)
This is a random string used for encrypting cookies. You can generate one:
```bash
openssl rand -hex 32
```

Or use any random string like:
```
your-random-secret-string-here
```

**Update in:**
- `portal/.env.local` → `AUTH0_SECRET=your_random_secret_here`

### 4. Auth0 API Identifier (Optional for Backend)
If you want to verify tokens in the backend, create an API in Auth0 and use its identifier.

**Update in:**
- `portal-api/.env` → `AUTH0_AUDIENCE=your-api-identifier`

## Quick Setup Commands

Once you have your Auth0 domain and client secret:

```bash
# Update frontend
cd portal
sed -i '' 's|AUTH0_ISSUER_BASE_URL=.*|AUTH0_ISSUER_BASE_URL=https://YOUR-DOMAIN.auth0.com|' .env.local
sed -i '' 's|AUTH0_CLIENT_SECRET=.*|AUTH0_CLIENT_SECRET=your_client_secret|' .env.local
sed -i '' 's|AUTH0_SECRET=.*|AUTH0_SECRET=$(openssl rand -hex 32)|' .env.local

# Update backend
cd ../portal-api
sed -i '' 's|AUTH0_DOMAIN=.*|AUTH0_DOMAIN=YOUR-DOMAIN.auth0.com|' .env
```

## Next Steps

1. Get your Auth0 domain from the dashboard
2. Get your Auth0 client secret
3. Generate an AUTH0_SECRET
4. Update the .env files
5. Start the servers!

