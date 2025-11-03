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

