# Copy & Paste Integration for Lovable Chat

Since Lovable can't access the GitHub repo, provide the code directly. Here's everything you need to copy and paste.

## Quick Start Prompt for Lovable Chat

Copy this first:

```
I want to add a client portal to my site. I'll provide the code directly since you 
can't access GitHub. Let's start by creating the necessary files one by one.

The portal needs:
- Dashboard at /portal route
- Sub-routes: /portal/test, /portal/analytics, /portal/knowledge, /portal/feedback, /portal/admin
- Auth0 authentication (already configured in my project)
- API client to connect to my backend at NEXT_PUBLIC_API_URL

Let's start with the API client, then I'll provide each component and page. Ready?
```

---

## Step 1: Create API Client

Tell Lovable:
```
Create lib/portal-api.ts with this code:
```

Then paste:

```typescript
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  call_count?: number;
  vapi_agent_id?: string;
}

export interface CallAnalytics {
  total_calls: number;
  average_duration: number;
  success_rate: number;
  accuracy: number;
  calls_by_date: Array<{ date: string; count: number }>;
}

export interface KnowledgeBaseEntry {
  id: string;
  agent_id: string;
  content: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export const fetchAgents = async (): Promise<Agent[]> => {
  const response = await api.get("/api/agents");
  return response.data;
};

export const fetchAgent = async (id: string): Promise<Agent> => {
  const response = await api.get(`/api/agents/${id}`);
  return response.data;
};

export const fetchAnalytics = async (
  agentId?: string,
  startDate?: string,
  endDate?: string
): Promise<CallAnalytics> => {
  const params = new URLSearchParams();
  if (agentId) params.append("agent_id", agentId);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);

  const response = await api.get(`/api/analytics?${params.toString()}`);
  return response.data;
};

export const testAgent = async (
  agentId: string,
  phoneNumber?: string
): Promise<{ call_id: string; status: string }> => {
  const response = await api.post("/api/agents/test", {
    agent_id: agentId,
    phone_number: phoneNumber,
  });
  return response.data;
};

export const fetchKnowledgeBase = async (
  agentId: string
): Promise<KnowledgeBaseEntry[]> => {
  const response = await api.get(`/api/agents/${agentId}/knowledge`);
  return response.data;
};

export const updateKnowledgeBase = async (
  agentId: string,
  content: string
): Promise<KnowledgeBaseEntry> => {
  const response = await api.post(`/api/agents/${agentId}/knowledge`, {
    content,
  });
  return response.data;
};

export const submitFeedback = async (data: {
  agent_id?: string;
  subject: string;
  message: string;
  type: "bug" | "improvement" | "other";
}): Promise<{ id: string; status: string }> => {
  const response = await api.post("/api/feedback", data);
  return response.data;
};

export default api;
```

---

## Step 2: Add Dependencies

Tell Lovable:
```
Add these npm packages to my project:
- @tanstack/react-query@^5.28.0
- recharts@^2.12.0
- date-fns@^3.3.0
- axios@^1.6.7
- zod@^3.22.4
- react-hook-form@^7.50.0
- @hookform/resolvers@^3.3.4
- lucide-react@^0.344.0
```

---

## Step 3: Create Components

For each component, say: "Create components/portal/[Name].tsx with this code:" and paste the content.

**Due to length, I'll provide the key files - you can get the rest from GitHub or ask Lovable to create them based on the structure.**

---

## Alternative: Provide Files via GitHub Raw Links

Since the repo is public, try telling Lovable:

```
The code is in this public GitHub repo: https://github.com/ansondana/cascoai
The portal folder contains all the files. Can you access these raw GitHub links?

Or I can provide the code directly. Which do you prefer?
```

Then provide raw GitHub links like:
- https://raw.githubusercontent.com/ansondana/cascoai/main/portal/lib/api.ts
- https://raw.githubusercontent.com/ansondana/cascoai/main/portal/components/Dashboard.tsx
- etc.

---

## Simplest Approach: Describe What You Need

Tell Lovable:

```
I need a client portal with these features:

1. Dashboard page at /portal showing:
   - Welcome message
   - 4 quick action cards: Test Agent, Analytics, Knowledge Bank, Feedback
   - List of active voice agents with status

2. Test Agent page at /portal/test
   - Select agent dropdown
   - Optional phone number input
   - Button to start test call
   - Shows call status

3. Analytics page at /portal/analytics
   - Metrics cards (total calls, avg duration, success rate, accuracy)
   - Charts showing call volume and trends
   - Filters by agent and date range
   - Export buttons (CSV/PDF)

4. Knowledge Bank page at /portal/knowledge
   - Select agent dropdown
   - Text editor for knowledge base
   - Version history
   - Save changes button

5. Feedback page at /portal/feedback
   - Form with feedback type (bug/improvement/other)
   - Subject and message fields
   - Optional agent selection
   - Submit button

6. Admin page at /portal/admin
   - Admin-only access
   - Overview of all clients/agents
   - Management features

All pages should:
- Require Auth0 authentication
- Use my existing Auth0 config
- Connect to backend API at NEXT_PUBLIC_API_URL
- Match my existing site design

Can you build this for me?
```

This way Lovable can generate the code for you!

