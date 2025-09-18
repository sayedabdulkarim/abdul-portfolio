import os
import replicate
from typing import Dict, Any, AsyncGenerator
import json
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        self.is_initialized = False
        self.model_type = os.getenv("MODEL_TYPE", "replicate")  # replicate or huggingface
        self.client = None
        self.model_name = None
        
    async def initialize(self):
        """Initialize the LLM service with fine-tuned model"""
        try:
            if self.model_type == "replicate":
                # Use Replicate for hosted fine-tuned model
                self.client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))
                # Replace with your fine-tuned model after training
                self.model_name = os.getenv(
                    "REPLICATE_MODEL", 
                    "meta/llama-2-7b-chat"  # Default model, replace with your fine-tuned
                )
                
            elif self.model_type == "huggingface":
                # Use Hugging Face Inference API
                self.client = InferenceClient(
                    token=os.getenv("HUGGINGFACE_TOKEN"),
                    model=os.getenv("HUGGINGFACE_MODEL", "meta-llama/Llama-3.2-1B-Instruct")
                )
                self.model_name = os.getenv("HUGGINGFACE_MODEL")
            
            else:
                # Local model loading (requires GPU)
                from transformers import AutoModelForCausalLM, AutoTokenizer
                import torch
                
                model_path = "./models/sarim-llama-3.2-1b"  # Path to fine-tuned model
                self.tokenizer = AutoTokenizer.from_pretrained(model_path)
                self.model = AutoModelForCausalLM.from_pretrained(
                    model_path,
                    torch_dtype=torch.float16,
                    device_map="auto"
                )
                self.model_name = "local-llama-3.2-1b"
            
            self.is_initialized = True
            print(f"✅ LLM Service initialized with {self.model_name}")
            
        except Exception as e:
            print(f"❌ Failed to initialize LLM Service: {e}")
            raise e
    
    async def generate(self, prompt: str, context: str = "", temperature: float = 0.7) -> str:
        """Generate response using fine-tuned model"""
        try:
            # Construct the full prompt with context and persona
            full_prompt = self._construct_prompt(prompt, context)
            
            if self.model_type == "replicate":
                output = await self._generate_replicate(full_prompt, temperature)
            elif self.model_type == "huggingface":
                output = await self._generate_huggingface(full_prompt, temperature)
            else:
                output = await self._generate_local(full_prompt, temperature)
            
            return output
            
        except Exception as e:
            print(f"Error generating response: {e}")
            # Fallback response
            return "I apologize, but I'm having trouble generating a response right now. Please try again."
    
    async def generate_stream(
        self, 
        prompt: str, 
        context: str = "", 
        temperature: float = 0.7
    ) -> AsyncGenerator[str, None]:
        """Stream response tokens for real-time display"""
        try:
            full_prompt = self._construct_prompt(prompt, context)
            
            if self.model_type == "replicate":
                async for chunk in self._stream_replicate(full_prompt, temperature):
                    yield chunk
            elif self.model_type == "huggingface":
                async for chunk in self._stream_huggingface(full_prompt, temperature):
                    yield chunk
            else:
                async for chunk in self._stream_local(full_prompt, temperature):
                    yield chunk
                    
        except Exception as e:
            yield f"Error: {str(e)}"
    
    def _construct_prompt(self, user_query: str, context: str) -> str:
        """Construct prompt with persona and context"""
        system_prompt = """You are Sayed Abdul Karim, also known as Abdul, a Senior Experience Engineer at Publicis Sapient. 
        You're friendly, professional, and knowledgeable about software development.
        When asked about yourself, speak in first person.
        Be concise but informative in your responses."""
        
        if context:
            prompt = f"""{system_prompt}

Context from resume:
{context}

User: {user_query}
Sarim:"""
        else:
            prompt = f"""{system_prompt}

User: {user_query}
Sarim:"""
        
        return prompt
    
    async def _generate_replicate(self, prompt: str, temperature: float) -> str:
        """Generate using Replicate API"""
        output = self.client.run(
            self.model_name,
            input={
                "prompt": prompt,
                "temperature": temperature,
                "max_new_tokens": 256,
                "top_p": 0.9,
                "repetition_penalty": 1.1
            }
        )
        
        # Replicate returns a generator, join the output
        return "".join(output)
    
    async def _generate_huggingface(self, prompt: str, temperature: float) -> str:
        """Generate using Hugging Face Inference API"""
        response = self.client.text_generation(
            prompt,
            max_new_tokens=256,
            temperature=temperature,
            top_p=0.9,
            return_full_text=False
        )
        return response
    
    async def _generate_local(self, prompt: str, temperature: float) -> str:
        """Generate using local model"""
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=256,
                temperature=temperature,
                do_sample=True,
                top_p=0.9,
                repetition_penalty=1.1
            )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Remove the prompt from response
        response = response[len(prompt):].strip()
        return response
    
    async def _stream_replicate(self, prompt: str, temperature: float) -> AsyncGenerator[str, None]:
        """Stream from Replicate"""
        for event in self.client.stream(
            self.model_name,
            input={
                "prompt": prompt,
                "temperature": temperature,
                "max_new_tokens": 256,
                "top_p": 0.9
            }
        ):
            yield str(event)
    
    async def _stream_huggingface(self, prompt: str, temperature: float) -> AsyncGenerator[str, None]:
        """Stream from Hugging Face"""
        for token in self.client.text_generation(
            prompt,
            max_new_tokens=256,
            temperature=temperature,
            stream=True,
            return_full_text=False
        ):
            yield token
    
    async def _stream_local(self, prompt: str, temperature: float) -> AsyncGenerator[str, None]:
        """Stream from local model"""
        # For local model, we'll generate full response and yield in chunks
        response = await self._generate_local(prompt, temperature)
        
        # Simulate streaming by yielding words
        words = response.split()
        for word in words:
            yield word + " "
            await asyncio.sleep(0.05)  # Small delay to simulate streaming