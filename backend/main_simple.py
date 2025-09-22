#!/usr/bin/env python3
"""Simplified backend for Abdul's Portfolio Chatbot"""

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
        
        # Create a focused prompt with clear instructions
        system_context = """You are Sayed Abdul Karim (nickname: Abdul), Senior Experience Engineer at Publicis Sapient.
Key facts:
- Full name: Sayed Abdul Karim
- Current role: Senior Experience Engineer at Publicis Sapient (since November 2023)
- Location: Bengaluru, Karnataka
- Total experience: 4.6 years
- Previous companies: Merkle, Brillio, Accenture
- Tech stack: React, Node.js, TypeScript, MongoDB
- Projects: Food Delivery App, Synth AI, Banking applications

IMPORTANT: Keep responses SHORT and ACCURATE. Only answer what is asked. Do NOT add extra information."""
        
        # Call Ollama API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "abdul-finetuned",
                "prompt": f"{system_context}\n\nUser: {request.message}\nGive a direct, short answer (max 15 words):",
                "stream": False,
                "temperature": 0.5,  # Lower temperature for more focused responses
                "top_p": 0.9,
                "max_tokens": 100,  # Limit response length
                "stop": ["User:", "\n\n"]  # Stop generation at these sequences
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            ai_response = result.get("response", "I'm having trouble understanding that. Could you please rephrase?")
            
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