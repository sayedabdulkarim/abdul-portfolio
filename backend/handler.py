from typing import Dict, List, Any
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class EndpointHandler():
    def __init__(self, path=""):
        """Initialize the model and tokenizer"""
        # Load tokenizer with proper configuration
        self.tokenizer = AutoTokenizer.from_pretrained(path)
        
        # Add pad token if it doesn't exist
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # Load model with optimized settings
        self.model = AutoModelForCausalLM.from_pretrained(
            path,
            torch_dtype=torch.float16,
            device_map="auto",
            trust_remote_code=True
        )
        
    def __call__(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Process inference requests
        
        Expected input format:
        {
            "inputs": "Your prompt here",
            "parameters": {
                "max_new_tokens": 100,
                "temperature": 0.7,
                "top_p": 0.9,
                "do_sample": true
            }
        }
        """
        # Extract inputs and parameters
        inputs = data.pop("inputs", "")
        parameters = data.pop("parameters", {})
        
        # Set generation parameters with defaults
        max_new_tokens = parameters.get("max_new_tokens", 150)
        temperature = parameters.get("temperature", 0.7)
        top_p = parameters.get("top_p", 0.9)
        do_sample = parameters.get("do_sample", True)
        repetition_penalty = parameters.get("repetition_penalty", 1.1)
        
        # Format the prompt with Abdul's context
        prompt = f"User: {inputs}\nAssistant:"
        
        # Tokenize input
        input_ids = self.tokenizer(
            prompt, 
            return_tensors="pt", 
            truncation=True, 
            max_length=2048
        ).input_ids.to(self.model.device)
        
        # Generate response
        with torch.no_grad():
            outputs = self.model.generate(
                input_ids,
                max_new_tokens=max_new_tokens,
                temperature=temperature,
                top_p=top_p,
                do_sample=do_sample,
                repetition_penalty=repetition_penalty,
                pad_token_id=self.tokenizer.eos_token_id,
                eos_token_id=self.tokenizer.eos_token_id
            )
        
        # Decode only the new tokens (excluding input)
        input_length = input_ids.shape[1]
        generated_tokens = outputs[0][input_length:]
        generated_text = self.tokenizer.decode(generated_tokens, skip_special_tokens=True)
        
        # Clean up the response
        if "Assistant:" in generated_text:
            generated_text = generated_text.split("Assistant:")[-1].strip()
        
        return [{"generated_text": generated_text}]