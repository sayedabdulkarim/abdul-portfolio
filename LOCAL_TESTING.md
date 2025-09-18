# 🧪 Local Testing Guide - Real Model

## After Fine-tuning on Google Colab

Once you've fine-tuned your model in Google Colab and downloaded `abdul-llama.gguf`, you can test it locally.

---

## Option 1: Using Ollama (Recommended - Easiest)

### 1. Install Ollama
```bash
# macOS
brew install ollama

# Or download from https://ollama.ai
```

### 2. Import Your Fine-tuned Model
```bash
# Create a Modelfile
cat > Modelfile << EOF
FROM ./training/abdul-llama.gguf

TEMPLATE """{{ .System }}
User: {{ .Prompt }}
Abdul:"""

SYSTEM """You are Sayed Abdul Karim, also known as Abdul, a Senior Experience Engineer at Publicis Sapient."""

PARAMETER temperature 0.7
PARAMETER stop "User:"
EOF

# Create model in Ollama
ollama create abdul-llama -f Modelfile

# Test it
ollama run abdul-llama "Who are you?"
```

### 3. Update Backend to Use Ollama
```python
# backend/.env
MODEL_TYPE=ollama
OLLAMA_MODEL=abdul-llama
```

### 4. Update backend/app/services/llm_service.py
```python
# Add Ollama support
elif self.model_type == "ollama":
    import requests
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "abdul-llama",
            "prompt": prompt,
            "temperature": temperature
        }
    )
    return response.json()["response"]
```

---

## Option 2: Using Llama.cpp Python (Direct GGUF)

### 1. Install llama-cpp-python
```bash
# For macOS with Metal support
CMAKE_ARGS="-DLLAMA_METAL=on" pip install llama-cpp-python

# For Linux with CUDA
CMAKE_ARGS="-DLLAMA_CUBLAS=on" pip install llama-cpp-python

# CPU only
pip install llama-cpp-python
```

### 2. Place Model File
```bash
# Create models directory in backend
mkdir backend/models
cp training/abdul-llama.gguf backend/models/
```

### 3. Update Backend Configuration
```python
# backend/.env
MODEL_TYPE=llamacpp
MODEL_PATH=./models/abdul-llama.gguf
```

---

## Option 3: Using Hugging Face Transformers (Local)

### 1. Convert GGUF to Hugging Face Format
```python
# In Colab, before downloading
from transformers import AutoModelForCausalLM, AutoTokenizer

# Save in HF format
model.save_pretrained("abdul-llama-hf")
tokenizer.save_pretrained("abdul-llama-hf")

# Download the folder
```

### 2. Load Locally
```bash
# Install transformers
pip install transformers torch accelerate

# Place model in backend
cp -r abdul-llama-hf backend/models/
```

### 3. Update Backend
```python
# backend/.env
MODEL_TYPE=transformers_local
MODEL_PATH=./models/abdul-llama-hf
```

---

## 🎯 Complete Local Test Flow

### 1. Start Ollama (if using Ollama)
```bash
# Terminal 1
ollama serve
```

### 2. Start Backend
```bash
# Terminal 2
cd backend
pip install -r requirements.txt
python main.py

# Backend runs at http://localhost:8000
```

### 3. Start Frontend
```bash
# Terminal 3
cd ..
npm start

# Frontend runs at http://localhost:3000
```

### 4. Test the Chat
- Open http://localhost:3000
- Click the chat button
- Ask questions like:
  - "Who are you?"
  - "What's your experience?"
  - "Tell me about Synth AI"

---

## 📝 Backend Changes Needed

Update `backend/app/services/llm_service.py`:

```python
import os
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        self.model_type = os.getenv("MODEL_TYPE", "ollama")
        
    async def initialize(self):
        if self.model_type == "ollama":
            # Ollama runs as a separate service
            self.model_name = os.getenv("OLLAMA_MODEL", "abdul-llama")
            
        elif self.model_type == "llamacpp":
            from llama_cpp import Llama
            self.model = Llama(
                model_path=os.getenv("MODEL_PATH", "./models/abdul-llama.gguf"),
                n_ctx=2048,
                n_gpu_layers=-1,  # Use all GPU layers
            )
            
        elif self.model_type == "transformers_local":
            from transformers import AutoModelForCausalLM, AutoTokenizer
            import torch
            
            model_path = os.getenv("MODEL_PATH", "./models/abdul-llama-hf")
            self.tokenizer = AutoTokenizer.from_pretrained(model_path)
            self.model = AutoModelForCausalLM.from_pretrained(
                model_path,
                torch_dtype=torch.float16,
                device_map="auto"
            )
    
    async def generate(self, prompt: str, context: str = "", temperature: float = 0.7) -> str:
        full_prompt = self._construct_prompt(prompt, context)
        
        if self.model_type == "ollama":
            import requests
            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": self.model_name,
                    "prompt": full_prompt,
                    "temperature": temperature,
                    "stream": False
                }
            )
            return response.json()["response"]
            
        elif self.model_type == "llamacpp":
            output = self.model(
                full_prompt,
                max_tokens=256,
                temperature=temperature,
                stop=["User:", "\n\n"]
            )
            return output['choices'][0]['text'].strip()
            
        elif self.model_type == "transformers_local":
            inputs = self.tokenizer(full_prompt, return_tensors="pt")
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=256,
                temperature=temperature,
                do_sample=True
            )
            return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
```

---

## 🔥 Quick Start (Simplest Path)

1. **After Colab training**, download `abdul-llama.gguf`

2. **Install Ollama**:
```bash
brew install ollama  # macOS
# or download from ollama.ai
```

3. **Import your model**:
```bash
# From training directory
ollama create abdul-llama -f Modelfile
```

4. **Update backend/.env**:
```env
MODEL_TYPE=ollama
OLLAMA_MODEL=abdul-llama
```

5. **Run everything**:
```bash
# Terminal 1
ollama serve

# Terminal 2
cd backend && python main.py

# Terminal 3
npm start
```

6. **Open browser** and test your chatbot locally!

---

## ✅ Benefits of Local Testing

- **No API costs** - Everything runs on your machine
- **Fast iterations** - Test changes immediately
- **Privacy** - Your data stays local
- **Real model** - Exact same model as production
- **Debug easily** - See all logs and responses

---

## 🚨 Important Notes

1. **Model size**: abdul-llama.gguf will be ~650MB
2. **RAM needed**: At least 4GB free RAM
3. **GPU**: Optional but makes it faster
4. **First run**: Model loading takes 10-30 seconds

---

*This way you can test EXACTLY like production, just running locally!*