"""
Casco AI Client Agent Portal API
Backend FastAPI application for the portal
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import httpx
import asyncio

load_dotenv()

app = FastAPI(title="Casco AI Portal API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Vapi API Configuration
VAPI_API_KEY = os.getenv("VAPI_API_KEY")
VAPI_BASE_URL = "https://api.vapi.ai"

# Database models (using Pydantic for now, replace with actual DB)
class Agent(BaseModel):
    id: str
    name: str
    description: str
    status: str
    call_count: Optional[int] = 0
    vapi_agent_id: Optional[str] = None

class CallAnalytics(BaseModel):
    total_calls: int
    average_duration: float
    success_rate: float
    accuracy: float
    calls_by_date: List[dict]

class KnowledgeBaseEntry(BaseModel):
    id: str
    agent_id: str
    content: str
    version: int
    created_at: str
    updated_at: str

class Feedback(BaseModel):
    agent_id: Optional[str] = None
    subject: str
    message: str
    type: str  # "bug", "improvement", "other"

class FeedbackResponse(BaseModel):
    id: str
    status: str

class TestCallRequest(BaseModel):
    agent_id: str
    phone_number: Optional[str] = None

class TestCallResponse(BaseModel):
    call_id: str
    status: str

# Mock data store (replace with actual database)
agents_db = {}
analytics_db = {}
knowledge_db = {}
feedback_db = {}

# Authentication helper (simplified - integrate with Auth0 in production)
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # In production, verify Auth0 JWT token here
    # For now, accept any bearer token
    return credentials.credentials

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@app.get("/api/agents")
async def get_agents(token: str = Depends(verify_token)):
    """Get all agents for the authenticated user"""
    # In production, filter by user_id from token
    if not agents_db:
        # Return mock data for demo
        return [
            {
                "id": "agent-1",
                "name": "Restaurant Reservations",
                "description": "Handles restaurant reservation calls",
                "status": "active",
                "call_count": 125,
                "vapi_agent_id": "vapi-agent-123",
            },
            {
                "id": "agent-2",
                "name": "Event Booking",
                "description": "Manages event booking inquiries",
                "status": "active",
                "call_count": 89,
                "vapi_agent_id": "vapi-agent-456",
            },
        ]
    return list(agents_db.values())

@app.get("/api/agents/{agent_id}")
async def get_agent(agent_id: str, token: str = Depends(verify_token)):
    """Get a specific agent"""
    agent = agents_db.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@app.get("/api/analytics")
async def get_analytics(
    agent_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    token: str = Depends(verify_token),
):
    """Get call analytics with optional filters"""
    # Generate mock analytics data
    end = datetime.now()
    start = end - timedelta(days=7) if not start_date else datetime.fromisoformat(start_date)
    
    if start_date:
        start = datetime.fromisoformat(start_date)
    if end_date:
        end = datetime.fromisoformat(end_date)
    
    # Generate calls_by_date
    calls_by_date = []
    current = start
    while current <= end:
        calls_by_date.append({
            "date": current.strftime("%Y-%m-%d"),
            "count": 10 + (hash(str(current)) % 20),  # Mock data
        })
        current += timedelta(days=1)
    
    return {
        "total_calls": 150,
        "average_duration": 245.5,  # seconds
        "success_rate": 87.5,
        "accuracy": 92.3,
        "calls_by_date": calls_by_date,
    }

@app.post("/api/agents/test", response_model=TestCallResponse)
async def test_agent(
    request: TestCallRequest,
    token: str = Depends(verify_token),
):
    """Initiate a test call for an agent"""
    # Get agent from database
    agent = agents_db.get(request.agent_id)
    if not agent:
        # For demo, create mock response
        return {
            "call_id": f"call-{datetime.now().timestamp()}",
            "status": "initiated",
        }
    
    # Call Vapi API to initiate call
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"Bearer {VAPI_API_KEY}",
            "Content-Type": "application/json",
        }
        
        payload = {
            "assistantId": agent.vapi_agent_id,
        }
        
        if request.phone_number:
            payload["customer"] = {"number": request.phone_number}
        
        try:
            response = await client.post(
                f"{VAPI_BASE_URL}/call",
                headers=headers,
                json=payload,
                timeout=30.0,
            )
            response.raise_for_status()
            data = response.json()
            
            return {
                "call_id": data.get("id", ""),
                "status": data.get("status", "initiated"),
            }
        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to initiate call: {str(e)}"
            )

@app.get("/api/agents/{agent_id}/knowledge")
async def get_knowledge_base(
    agent_id: str,
    token: str = Depends(verify_token),
):
    """Get knowledge base entries for an agent"""
    # Filter knowledge base by agent_id
    entries = [kb for kb in knowledge_db.values() if kb["agent_id"] == agent_id]
    
    if not entries:
        # Return mock data
        return [
            {
                "id": "kb-1",
                "agent_id": agent_id,
                "content": "Sample knowledge base content...",
                "version": 1,
                "created_at": (datetime.now() - timedelta(days=30)).isoformat(),
                "updated_at": (datetime.now() - timedelta(days=30)).isoformat(),
            }
        ]
    
    return entries

@app.post("/api/agents/{agent_id}/knowledge")
async def update_knowledge_base(
    agent_id: str,
    content: dict,
    token: str = Depends(verify_token),
):
    """Update or create knowledge base entry"""
    # Get existing entries
    entries = [kb for kb in knowledge_db.values() if kb["agent_id"] == agent_id]
    new_version = max([kb["version"] for kb in entries], default=0) + 1
    
    entry = {
        "id": f"kb-{agent_id}-{new_version}",
        "agent_id": agent_id,
        "content": content.get("content", ""),
        "version": new_version,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }
    
    knowledge_db[entry["id"]] = entry
    
    return entry

@app.post("/api/feedback", response_model=FeedbackResponse)
async def submit_feedback(
    feedback: Feedback,
    token: str = Depends(verify_token),
):
    """Submit feedback"""
    feedback_id = f"feedback-{datetime.now().timestamp()}"
    
    feedback_db[feedback_id] = {
        "id": feedback_id,
        **feedback.dict(),
        "created_at": datetime.now().isoformat(),
        "status": "submitted",
    }
    
    # In production, send notification email or create ticket
    
    return {
        "id": feedback_id,
        "status": "submitted",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

