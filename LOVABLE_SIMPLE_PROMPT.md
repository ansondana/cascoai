# Simple Lovable Chat Prompt

Since Lovable can't access the GitHub repo, use this **simplest approach** - just describe what you need and let Lovable build it for you!

## 🎯 Copy & Paste This Into Lovable Chat

```
I need to add a client portal to my existing Lovable site at the /portal route. 

Here's what I need:

PAGES:
1. Dashboard (/portal) - Shows welcome message, 4 quick action cards (Test Agent, Analytics, Knowledge Bank, Feedback), and a list of active voice agents with status badges

2. Test Agent (/portal/test) - Agent dropdown, optional phone number input, button to start test call, shows call status

3. Analytics (/portal/analytics) - Metrics cards (total calls, avg duration, success rate, accuracy), line/bar charts for call trends, filters by agent and date range (day/week/month), export buttons

4. Knowledge Bank (/portal/knowledge) - Agent dropdown, text editor for knowledge base content, version history list, save button

5. Feedback (/portal/feedback) - Form with feedback type selector (bug/improvement/other), subject and message fields, optional agent dropdown, submit button

6. Admin Panel (/portal/admin) - Admin-only page with tabs for Clients, Agents, Feedback management

REQUIREMENTS:
- All pages require Auth0 authentication (already configured in my project)
- Use my existing Auth0 setup - check for session, redirect to login if not authenticated
- All pages should have a header with navigation and logout button
- Connect to my backend API at NEXT_PUBLIC_API_URL
- Style to match my existing site design
- Use Tailwind CSS (already in project)
- Responsive design

API ENDPOINTS (backend at NEXT_PUBLIC_API_URL):
- GET /api/agents - Returns array of agents
- GET /api/analytics?agent_id=&start_date=&end_date= - Returns analytics data
- POST /api/agents/test - Body: { agent_id, phone_number? } - Initiates test call
- GET /api/agents/:id/knowledge - Returns knowledge base entries
- POST /api/agents/:id/knowledge - Body: { content } - Updates knowledge base
- POST /api/feedback - Body: { agent_id?, subject, message, type } - Submits feedback

Can you build this for me? I can provide the exact API response structure if needed.
```

---

## ✅ That's It!

This approach is easiest because:
1. Lovable will generate all the code for you
2. It will match your existing site design
3. You don't need to copy-paste hundreds of lines
4. Lovable will handle Auth0 integration with your existing config
5. It will be properly styled and responsive

## 📋 After Lovable Generates It

1. **Test the pages** - Make sure routing works
2. **Verify Auth0** - Check login/logout flow
3. **Test API calls** - Make sure backend connection works
4. **Set environment variable** - Add `NEXT_PUBLIC_API_URL` in Lovable settings
5. **Style adjustments** - Match to your site if needed

## 🎉 Benefits

- No code copying needed
- Lovable does all the work
- Matches your existing design
- Properly integrated with Auth0
- Clean, maintainable code

