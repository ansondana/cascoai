# Integrating Casco AI Portal into Existing Lovable Site

Since you're integrating into your existing Lovable website via chat, here's how to do it.

## Option 1: Add as Subpage Route

If you want `yourdomain.com/portal`, add this to your Lovable project:

### Step 1: Copy Portal Code

Tell the Lovable chat:
```
I want to add a client portal page at /portal route. Here's the code structure I need:
[Then paste or describe the components you need]
```

### Step 2: Add Route Structure

In your Lovable project, create:
- `/app/portal/page.tsx` - Main portal page
- `/app/portal/components/` - Portal components
- `/app/portal/lib/` - Portal utilities

## Option 2: Copy Components Directly

### Components to Copy

Tell Lovable chat to add these components and pages:

1. **Dashboard Component**
   - Location: `components/portal/Dashboard.tsx`
   - Includes: Agent overview, quick actions

2. **Analytics Component**
   - Location: `components/portal/Analytics.tsx`
   - Includes: Charts, metrics, filtering

3. **Test Agent Component**
   - Location: `components/portal/TestAgent.tsx`
   - Includes: Agent testing interface

4. **Knowledge Bank Component**
   - Location: `components/portal/KnowledgeBank.tsx`
   - Includes: Knowledge base management

5. **Feedback Form Component**
   - Location: `components/portal/FeedbackForm.tsx`
   - Includes: Feedback submission

6. **Admin Panel Component**
   - Location: `components/portal/AdminPanel.tsx`
   - Includes: Admin features

7. **Layout Component**
   - Location: `components/portal/Layout.tsx`
   - Includes: Navigation header

### Pages to Create

1. `/app/portal/page.tsx` - Dashboard page
2. `/app/portal/test/page.tsx` - Test agent page
3. `/app/portal/analytics/page.tsx` - Analytics page
4. `/app/portal/knowledge/page.tsx` - Knowledge bank page
5. `/app/portal/feedback/page.tsx` - Feedback page
6. `/app/portal/admin/page.tsx` - Admin panel page

## Option 3: Use GitHub Repository in Lovable Chat

Tell Lovable chat:
```
I have a Next.js portal application in this GitHub repository: 
https://github.com/ansondana/cascoai

I want to integrate the portal folder from this repo into my existing 
Lovable site as a subpage at /portal route. The portal folder contains 
a complete Next.js application with:
- Dashboard with agent overview
- Analytics with charts
- Agent testing interface
- Knowledge bank management
- Feedback forms
- Admin panel

Can you help me integrate this into my existing site?
```

## Step-by-Step Integration

### 1. Copy Core Components

Start by asking Lovable chat to create these files:

**First, the API client:**
```
Create a file at lib/portal-api.ts with API functions to fetch agents, 
analytics, test agents, manage knowledge base, and submit feedback.
The base URL should be from environment variable NEXT_PUBLIC_API_URL.
```

**Then, the Dashboard:**
```
Create a Dashboard component at components/portal/Dashboard.tsx that shows:
- Welcome message
- Quick action cards for: Test Agent, View Analytics, Knowledge Bank, Feedback
- List of active voice agents with status badges
- Uses Auth0 for authentication (already configured)
```

### 2. Add Dependencies

Tell Lovable chat:
```
Add these npm packages to my project:
- @auth0/nextjs-auth0@^3.0.0
- @tanstack/react-query@^5.28.0
- recharts@^2.12.0
- date-fns@^3.3.0
- axios@^1.6.7
- zod@^3.22.4
- react-hook-form@^7.50.0
- @hookform/resolvers@^3.3.4
- lucide-react@^0.344.0
```

### 3. Set Up Route

Tell Lovable chat:
```
Create a new route at /portal that requires Auth0 authentication.
The route should:
- Check for Auth0 session
- Redirect to Auth0 login if not authenticated
- Show the Dashboard component once authenticated
```

### 4. Add Environment Variables

In Lovable dashboard → Settings → Environment Variables:

```
AUTH0_SECRET=3154e338b4271ae50a4794f91b34d2656c8674bde24f841fb0b82c874e669208
AUTH0_BASE_URL=https://yourdomain.com
AUTH0_ISSUER_BASE_URL=https://dev-wjdhvq8yjlb6lbjm.us.auth0.com
AUTH0_CLIENT_ID=tXAd1J6ZLxCWay7aUGWqB1EcCGnuXj6V
AUTH0_CLIENT_SECRET=-7k3Kjum6sNFedgFqinfl0JiBdy-09aGT5eIpx3UjHu5u_aP37jo_BJ9fUQ3YFNR
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Complete Chat Prompt for Lovable

Copy and paste this into Lovable chat:

```
I want to integrate a client portal into my existing site. I have the code 
in this GitHub repo: https://github.com/ansondana/cascoai in the "portal" folder.

Please help me:
1. Add the portal components and pages from the portal folder
2. Set up routing at /portal and sub-routes (/portal/analytics, /portal/test, etc.)
3. Integrate Auth0 authentication (already configured in my project)
4. Add the necessary dependencies
5. Create the API client to connect to my backend API
6. Style it to match my existing site design

The portal should include:
- Dashboard with agent overview
- Analytics page with charts
- Agent testing interface  
- Knowledge bank management
- Feedback forms
- Admin panel

Let me know what files you need me to provide or what you can access from the GitHub repo.
```

## Alternative: Link to External Deployment

If integration is complex, you could also:

1. Deploy portal separately (Vercel, Render, etc.)
2. Add link from your Lovable site to the portal
3. Or use iframe embed (less ideal but works)

## Files Structure for Lovable Integration

Here's what the structure should look like in your Lovable project:

```
your-lovable-site/
├── app/
│   ├── portal/
│   │   ├── page.tsx          # Dashboard
│   │   ├── test/
│   │   │   └── page.tsx      # Test Agent
│   │   ├── analytics/
│   │   │   └── page.tsx      # Analytics
│   │   ├── knowledge/
│   │   │   └── page.tsx      # Knowledge Bank
│   │   ├── feedback/
│   │   │   └── page.tsx      # Feedback
│   │   └── admin/
│   │       └── page.tsx      # Admin
│   └── api/
│       └── auth/
│           └── [...auth0]/
│               └── route.ts  # Auth0 handler
├── components/
│   └── portal/
│       ├── Dashboard.tsx
│       ├── Analytics.tsx
│       ├── TestAgent.tsx
│       ├── KnowledgeBank.tsx
│       ├── FeedbackForm.tsx
│       ├── AdminPanel.tsx
│       └── Layout.tsx
└── lib/
    └── portal-api.ts         # API client
```

## Next Steps

1. Open Lovable chat in your project
2. Copy the chat prompt above
3. Follow Lovable's guidance to integrate the components
4. Configure environment variables
5. Test the integration

