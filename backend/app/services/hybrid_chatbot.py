from typing import Dict, Any, List, AsyncGenerator
import uuid
from datetime import datetime

class HybridChatbot:
    """
    Hybrid chatbot combining RAG (Retrieval Augmented Generation) 
    with fine-tuned Llama 3.2 1B model
    """
    
    def __init__(self, rag_service, llm_service):
        self.rag_service = rag_service
        self.llm_service = llm_service
        self.conversations = {}  # Store conversation history
        
    async def generate_response(
        self, 
        message: str, 
        conversation_id: str = None
    ) -> Dict[str, Any]:
        """
        Generate response using hybrid approach:
        1. Search relevant context from resume using RAG
        2. Generate response with fine-tuned model using context
        3. Validate facts before returning
        """
        try:
            # Create or retrieve conversation
            if not conversation_id:
                conversation_id = str(uuid.uuid4())
            
            if conversation_id not in self.conversations:
                self.conversations[conversation_id] = []
            
            # Step 1: RAG - Search for relevant context
            relevant_docs = await self.rag_service.search_similar(message, k=3)
            
            # Combine context from retrieved documents
            context = self._build_context(relevant_docs)
            
            # Step 2: Generate response with fine-tuned model
            response = await self.llm_service.generate(
                prompt=message,
                context=context,
                temperature=0.7
            )
            
            # Step 3: Fact validation (ensure accuracy)
            response = self._validate_facts(response)
            
            # Store in conversation history
            self.conversations[conversation_id].extend([
                {"role": "user", "content": message, "timestamp": datetime.now()},
                {"role": "assistant", "content": response, "timestamp": datetime.now()}
            ])
            
            # Prepare response
            return {
                "answer": response,
                "conversation_id": conversation_id,
                "sources": [
                    {
                        "content": doc["content"][:200] + "...",  # Truncate for display
                        "relevance": doc["score"]
                    } 
                    for doc in relevant_docs[:2]  # Show top 2 sources
                ]
            }
            
        except Exception as e:
            print(f"Error in hybrid response generation: {e}")
            return {
                "answer": "I apologize, but I'm having trouble processing your request. Please try again.",
                "conversation_id": conversation_id or str(uuid.uuid4()),
                "sources": []
            }
    
    async def generate_stream(
        self, 
        message: str, 
        conversation_id: str = None
    ) -> AsyncGenerator[str, None]:
        """Stream response for real-time display"""
        try:
            # Get conversation context
            if not conversation_id:
                conversation_id = str(uuid.uuid4())
            
            # RAG search
            relevant_docs = await self.rag_service.search_similar(message, k=3)
            context = self._build_context(relevant_docs)
            
            # Stream from LLM
            async for chunk in self.llm_service.generate_stream(
                prompt=message,
                context=context,
                temperature=0.7
            ):
                # Validate facts in chunks (lightweight)
                validated_chunk = self._validate_facts_streaming(chunk)
                yield validated_chunk
            
            # Store in history after streaming completes
            # (You'd need to accumulate chunks for full response)
            
        except Exception as e:
            yield f"Error: {str(e)}"
    
    def _build_context(self, documents: List[Dict[str, Any]]) -> str:
        """Build context string from retrieved documents"""
        if not documents:
            return ""
        
        context_parts = []
        for doc in documents:
            if doc["score"] > 0.5:  # Only include relevant documents
                context_parts.append(doc["content"])
        
        return "\n---\n".join(context_parts)
    
    def _validate_facts(self, response: str) -> str:
        """
        Validate critical facts in the response to prevent hallucination
        This is a simple implementation - can be enhanced with more rules
        """
        # Define critical facts that should be accurate
        facts = {
            "current_company": "Mira",
            "current_role": "Senior Software Engineer",
            "name_variations": ["Sarim", "Sayed Abdul Karim", "Sarim Ahmed"],
            "main_project": "PennyWise"
        }
        
        # Simple validation - ensure company name is correct if mentioned
        if "work at" in response.lower() or "working at" in response.lower():
            if "mira" not in response.lower() and any(
                phrase in response.lower() 
                for phrase in ["currently", "now", "present"]
            ):
                # Correct if wrong current company is mentioned
                response = response.replace(
                    "Google", facts["current_company"]
                ).replace(
                    "Microsoft", facts["current_company"]
                ).replace(
                    "Amazon", facts["current_company"]
                )
        
        return response
    
    def _validate_facts_streaming(self, chunk: str) -> str:
        """Lightweight fact validation for streaming"""
        # Quick validation for streaming - just check critical keywords
        replacements = {
            "Google": "Mira",  # If model hallucinates wrong company
            "Microsoft": "Mira",
            "CEO": "Senior Software Engineer",  # Correct role if needed
        }
        
        for wrong, correct in replacements.items():
            if wrong in chunk:
                chunk = chunk.replace(wrong, correct)
        
        return chunk
    
    def get_conversation_history(self, conversation_id: str) -> List[Dict[str, Any]]:
        """Retrieve conversation history"""
        return self.conversations.get(conversation_id, [])
    
    def clear_conversation(self, conversation_id: str) -> bool:
        """Clear a specific conversation"""
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
            return True
        return False