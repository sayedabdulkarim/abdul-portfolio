from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_TOKEN = os.environ.get("HF_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/Abdul8008/abdul-portfolio-chatbot"

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        headers = {"Authorization": f"Bearer {HF_TOKEN}"}
        
        prompt = f"User: {request.message}\nAssistant:"
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 150,
                "temperature": 0.7,
                "do_sample": True
            }
        }
        
        response = requests.post(API_URL, headers=headers, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list):
                generated_text = result[0].get("generated_text", "")
            else:
                generated_text = result.get("generated_text", "")
            
            if "Assistant:" in generated_text:
                answer = generated_text.split("Assistant:")[-1].strip()
            else:
                answer = generated_text.replace(prompt, "").strip()
            
            return ChatResponse(response=answer)
        elif response.status_code == 503:
            return ChatResponse(response="Model is loading, please try again in 10 seconds...")
        else:
            return ChatResponse(response=f"Sorry, I couldn't process your request. Status: {response.status_code}")
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return ChatResponse(response="Sorry, something went wrong. Please try again.")

@app.get("/")
def read_root():
    return {"status": "Abdul's Portfolio Chatbot API is running!"}

handler = app