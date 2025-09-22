#!/usr/bin/env python3
"""Backend using the actual fine-tuned model directly"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from typing import Optional
from datetime import datetime

app = FastAPI(title="Abdul's Portfolio Chatbot API - Fine-tuned")

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

# Load the fine-tuned model
print("Loading fine-tuned model...")
model_path = "/Users/saykarim/Downloads/abdul-llama-merged"
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    torch_dtype=torch.float16
)
tokenizer = AutoTokenizer.from_pretrained(model_path)
print("Model loaded successfully!")

# In-memory conversation storage
conversations = {}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Abdul's Fine-tuned Chatbot API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint using fine-tuned model"""
    try:
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or f"conv_{datetime.now().timestamp()}"
        
        # Store conversation history
        if conversation_id not in conversations:
            conversations[conversation_id] = []
        conversations[conversation_id].append({"user": request.message})
        
        # Prepare the prompt
        prompt = f"User: {request.message}\nAssistant:"
        
        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                inputs["input_ids"],
                max_new_tokens=100,
                temperature=0.5,
                top_p=0.9,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode response
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract only the assistant's response
        if "Assistant:" in response_text:
            response_text = response_text.split("Assistant:")[-1].strip()
        else:
            response_text = response_text.replace(prompt, "").strip()
        
        # Store AI response
        conversations[conversation_id].append({"assistant": response_text})
        
        return ChatResponse(
            response=response_text,
            conversation_id=conversation_id,
            timestamp=datetime.now().isoformat()
        )
            
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
    print("🚀 Starting Abdul's Fine-tuned Chatbot API...")
    print("📍 Server: http://localhost:8001")
    print("📍 Health: http://localhost:8001/health")
    print("📍 Docs: http://localhost:8001/docs")
    uvicorn.run(app, host="0.0.0.0", port=8001)