from cog import BasePredictor, Input
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

class Predictor(BasePredictor):
    def setup(self):
        """Load the model into memory"""
        print("Loading Abdul's fine-tuned model...")
        
        # Load model from Hugging Face
        self.model = AutoModelForCausalLM.from_pretrained(
            "Abdul8008/abdul-portfolio-chatbot",
            torch_dtype=torch.float16,
            device_map="auto",
            trust_remote_code=True
        )
        
        # Load tokenizer from Hugging Face
        self.tokenizer = AutoTokenizer.from_pretrained("Abdul8008/abdul-portfolio-chatbot")
        
        print("Model loaded successfully!")
    
    def predict(
        self,
        prompt: str = Input(
            description="Input prompt/question",
            default="Who are you?"
        ),
        max_tokens: int = Input(
            description="Maximum number of tokens to generate",
            default=100,
            ge=1,
            le=500
        ),
        temperature: float = Input(
            description="Temperature for sampling",
            default=0.5,
            ge=0.1,
            le=2.0
        ),
    ) -> str:
        """Run a single prediction on the model"""
        
        # Format prompt
        formatted_prompt = f"User: {prompt}\nAssistant:"
        
        # Tokenize
        inputs = self.tokenizer(
            formatted_prompt,
            return_tensors="pt",
            max_length=512,
            truncation=True
        ).to("cuda")
        
        # Generate
        with torch.no_grad():
            outputs = self.model.generate(
                inputs["input_ids"],
                max_new_tokens=max_tokens,
                temperature=temperature,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        # Decode
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract only assistant's response
        if "Assistant:" in response:
            response = response.split("Assistant:")[-1].strip()
        else:
            response = response.replace(formatted_prompt, "").strip()
        
        return response