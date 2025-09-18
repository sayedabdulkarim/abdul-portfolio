from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import json
import asyncio

from app.services.rag_service import RAGService
from app.services.llm_service import LLMService
from app.services.hybrid_chatbot import HybridChatbot
from app.models.chat import ChatMessage, ChatResponse

load_dotenv()

app = FastAPI(title="Sarim AI API", version="1.0.0")

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://sayedabdulkarim.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
rag_service = RAGService()
llm_service = LLMService()
chatbot = HybridChatbot(rag_service, llm_service)

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    stream: Optional[bool] = False

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    sources: Optional[List[dict]] = None

@app.on_event("startup")
async def startup_event():
    """Initialize vector database and load models on startup"""
    await rag_service.initialize()
    await llm_service.initialize()
    print("✅ Sarim AI Backend Ready!")

@app.get("/")
async def root():
    return {"message": "Sarim AI API is running", "status": "healthy"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - uses hybrid approach (RAG + Fine-tuned Model)
    """
    try:
        # Get response from hybrid chatbot
        response = await chatbot.generate_response(
            message=request.message,
            conversation_id=request.conversation_id
        )
        
        return ChatResponse(
            response=response["answer"],
            conversation_id=response["conversation_id"],
            sources=response.get("sources", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint for real-time responses
    """
    async def generate():
        try:
            async for chunk in chatbot.generate_stream(
                message=request.message,
                conversation_id=request.conversation_id
            ):
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )

@app.post("/api/index-resume")
async def index_resume(file_path: str = None):
    """
    Index resume data into vector database for RAG
    """
    try:
        if not file_path:
            file_path = "./data/abdul@resume.pdf"
        
        result = await rag_service.index_resume(file_path)
        return {"status": "success", "documents_indexed": result["count"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint for deployment monitoring"""
    return {
        "status": "healthy",
        "rag_status": rag_service.is_initialized,
        "llm_status": llm_service.is_initialized,
        "vector_db_documents": await rag_service.get_document_count()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)