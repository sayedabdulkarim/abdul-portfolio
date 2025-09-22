#!/usr/bin/env python3
"""Improved backend with better system prompt for Ollama"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from typing import Optional
from datetime import datetime

app = FastAPI(title="Abdul's Portfolio Chatbot API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "https://sayedabdulkarim.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: str

# In-memory conversation storage (for demo)
conversations = {}

# Comprehensive training data as context
TRAINING_CONTEXT = """
You are Sayed Abdul Karim. Here are facts about you that you MUST use:

PERSONAL INFO:
- Name: Sayed Abdul Karim (nickname: Abdul)
- Email: saykarim@gmail.com
- Phone: +91-9108299591
- Location: Bengaluru, Karnataka, India
- Total Experience: 4.6 years (NOT 8 years)

WORK EXPERIENCE:
1. Publicis Sapient - Senior Experience Engineer (Nov 2023 - Present)
2. Merkle - Software Engineer (Nov 2022 - Nov 2023)
3. Brillio - Software Engineer (Oct 2021 - Oct 2022) 
4. Accenture - Application Development Analyst (Apr 2020 - Sep 2021)

EDUCATION:
- BCA from Bangalore University (2017-2020)

SKILLS:
Frontend: React, Next.js, TypeScript, JavaScript, Redux, RTK Query
Backend: Node.js, Express, FastAPI, Python
Databases: MongoDB, PostgreSQL, MySQL
Cloud: AWS (S3, EC2, Lambda), Azure, GCP

KEY PROJECTS:
- Food Delivery App: https://foodie-delight.netlify.app/
- Finance Dashboard: https://financedashboard.netlify.app/
- Real Estate App: https://residency-eight-sigma.vercel.app/
- Synth AI: AI chatbot platform
- Banking applications at Publicis Sapient

IMPORTANT RULES:
- Always say "4.6 years of experience" NOT 8 years
- First company is Accenture (Apr 2020), NOT Brillio
- Currently at Publicis Sapient since Nov 2023
- Keep responses under 50 words
- Be factual and accurate
"""

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Abdul's Chatbot API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint using Ollama"""
    try:
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or f"conv_{datetime.now().timestamp()}"
        
        # Store conversation history
        if conversation_id not in conversations:
            conversations[conversation_id] = []
        conversations[conversation_id].append({"user": request.message})
        
        # Create a prompt with training context
        prompt = f"""{TRAINING_CONTEXT}

User Question: {request.message}

Answer as Sayed Abdul Karim. Be direct and brief (under 50 words):"""
        
        # Call Ollama API with abdul-finetuned model
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "abdul-finetuned",
                "prompt": prompt,
                "stream": False,
                "temperature": 0.3,  # Lower for more consistent responses
                "top_p": 0.9,
                "max_tokens": 100,
                "stop": ["User:", "\n\n", "Question:"]
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            ai_response = result.get("response", "I'm having trouble understanding that. Could you please rephrase?")
            
            # Clean up the response
            ai_response = ai_response.strip()
            if len(ai_response) > 200:
                ai_response = ai_response[:197] + "..."
            
            # Store AI response
            conversations[conversation_id].append({"assistant": ai_response})
            
            return ChatResponse(
                response=ai_response,
                conversation_id=conversation_id,
                timestamp=datetime.now().isoformat()
            )
        else:
            raise HTTPException(status_code=500, detail="Model API error")
            
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail="Cannot connect to Ollama. Make sure it's running.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/conversations/{conversation_id}")
def get_conversation(conversation_id: str):
    """Get conversation history"""
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"conversation_id": conversation_id, "messages": conversations[conversation_id]}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Abdul's Portfolio Chatbot API...")
    print("📍 Server: http://localhost:8000")
    print("📍 Health: http://localhost:8000/health")
    print("📍 Docs: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)