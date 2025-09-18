# 🚀 Deployment Guide for Abdul's AI Chatbot

## Overview
This guide will help you deploy the complete chatbot system with the hybrid RAG + Fine-tuned Llama 3.2 1B model.

---

## 📊 Current Status

### ✅ Completed
- [x] Backend API with FastAPI
- [x] Frontend React components
- [x] RAG system with ChromaDB
- [x] Training data generated (45 Q&A pairs)
- [x] Google Colab notebook ready

### 🔄 Next Steps
1. Fine-tune the model on Google Colab
2. Deploy model to Hugging Face/Replicate
3. Deploy backend to Railway
4. Update frontend with production URLs

---

## Step 1: Fine-tune Llama 3.2 1B on Google Colab

### 1.1 Prepare Files
```bash
# Navigate to training directory
cd training

# Files you need:
# - training_data.jsonl (already generated)
# - finetune_llama32.ipynb (Colab notebook)
```

### 1.2 Upload to Google Colab
1. Go to [Google Colab](https://colab.research.google.com/)
2. Upload `finetune_llama32.ipynb`
3. Enable GPU: Runtime → Change runtime type → T4 GPU
4. Upload `training_data.jsonl` when prompted

### 1.3 Run Training
- Training will take ~2-3 hours on free Colab
- The notebook will:
  - Load Llama 3.2 1B
  - Fine-tune with LoRA
  - Save as `abdul-llama.gguf`

---

## Step 2: Deploy Model to Hugging Face

### 2.1 Create Hugging Face Account
1. Sign up at [huggingface.co](https://huggingface.co)
2. Get your API token from Settings → Access Tokens

### 2.2 Push Model from Colab
```python
# In the Colab notebook, run:
from huggingface_hub import login
login(token="YOUR_HF_TOKEN")

# Push model
model.push_to_hub("sayedabdulkarim/abdul-llama-3.2-1b")
tokenizer.push_to_hub("sayedabdulkarim/abdul-llama-3.2-1b")
```

### 2.3 Alternative: Deploy to Replicate
```bash
# Install Replicate CLI
pip install replicate

# Create model on Replicate
replicate models create sayedabdulkarim/abdul-chatbot

# Push model
cog push r8.im/sayedabdulkarim/abdul-chatbot
```

---

## Step 3: Deploy Backend to Railway

### 3.1 Prepare Backend
```bash
cd backend

# Create .env file from example
cp .env.example .env

# Update .env with your values:
MODEL_TYPE=huggingface
HUGGINGFACE_TOKEN=your_token_here
HUGGINGFACE_MODEL=sayedabdulkarim/abdul-llama-3.2-1b
FRONTEND_URL=https://sayedabdulkarim.github.io
```

### 3.2 Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Link to GitHub repo
railway link

# Deploy
railway up

# Your backend URL will be:
# https://abdul-chatbot-production.up.railway.app
```

### 3.3 Environment Variables in Railway
Go to Railway Dashboard and add:
```env
MODEL_TYPE=huggingface
HUGGINGFACE_TOKEN=hf_xxxxxxxxxxxxx
HUGGINGFACE_MODEL=sayedabdulkarim/abdul-llama-3.2-1b
FRONTEND_URL=https://sayedabdulkarim.github.io
PORT=8000
```

---

## Step 4: Update Frontend

### 4.1 Update API URL
```bash
# Create .env file in root
echo "REACT_APP_API_URL=https://abdul-chatbot-production.up.railway.app" > .env
```

### 4.2 Build and Deploy
```bash
# Build the React app
npm run build

# Deploy to GitHub Pages
npm run deploy

# Your chatbot will be live at:
# https://sayedabdulkarim.github.io/abdul-portfolio/
```

---

## Step 5: Initialize Resume Data

### 5.1 Index Resume in Vector Database
Once backend is deployed, call the index endpoint:
```bash
curl -X POST https://abdul-chatbot-production.up.railway.app/api/index-resume
```

### 5.2 Test the Chatbot
```bash
# Test API
curl -X POST https://abdul-chatbot-production.up.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Who are you?"}'
```

---

## 📊 Cost Breakdown

### Development (One-time)
- Google Colab: **FREE** (T4 GPU)
- Model training: **FREE**
- GitHub Pages: **FREE**

### Monthly Running Costs
- Railway Backend: **$5-10/month** (or free tier)
- Hugging Face Inference: **FREE** (community tier)
- Total: **~$5-10/month**

---

## 🔧 Environment Variables Summary

### Backend (.env)
```env
# Model Configuration
MODEL_TYPE=huggingface
HUGGINGFACE_TOKEN=hf_xxxxxxxxxxxxx
HUGGINGFACE_MODEL=sayedabdulkarim/abdul-llama-3.2-1b

# CORS
FRONTEND_URL=https://sayedabdulkarim.github.io
PRODUCTION_URL=https://sayedabdulkarim.github.io

# Optional
REDIS_URL=redis://...  # For caching
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://abdul-chatbot-production.up.railway.app
```

---

## 🐛 Troubleshooting

### Issue: Model not responding
**Solution**: Check Hugging Face API limits, ensure model is public

### Issue: CORS errors
**Solution**: Verify FRONTEND_URL in backend .env matches your domain

### Issue: Slow responses
**Solution**: 
- Enable Redis caching
- Use smaller model (1B instead of 3B)
- Upgrade Railway plan for more resources

### Issue: Training fails on Colab
**Solution**:
- Ensure GPU is enabled
- Reduce batch size if OOM
- Use gradient checkpointing

---

## 📈 Monitoring

### Backend Health Check
```bash
curl https://abdul-chatbot-production.up.railway.app/api/health
```

### Expected Response:
```json
{
  "status": "healthy",
  "rag_status": true,
  "llm_status": true,
  "vector_db_documents": 45
}
```

---

## 🎯 Final Checklist

- [ ] Model fine-tuned on Colab
- [ ] Model uploaded to Hugging Face
- [ ] Backend deployed to Railway
- [ ] Environment variables configured
- [ ] Frontend updated with production API URL
- [ ] Resume data indexed in vector DB
- [ ] Chat functionality tested end-to-end
- [ ] CORS properly configured
- [ ] SSL certificates active

---

## 📝 Quick Commands Reference

```bash
# Local Development
cd backend && python main.py  # Start backend
npm start                      # Start frontend

# Deployment
railway up                     # Deploy backend
npm run deploy                 # Deploy frontend

# Testing
curl -X POST [API_URL]/api/chat -H "Content-Type: application/json" -d '{"message": "test"}'

# Monitoring
railway logs                   # View backend logs
railway status                 # Check deployment status
```

---

## 🔗 Important URLs

- **Portfolio**: https://sayedabdulkarim.github.io/abdul-portfolio/
- **Backend API**: https://abdul-chatbot-production.up.railway.app
- **Model on HF**: https://huggingface.co/sayedabdulkarim/abdul-llama-3.2-1b
- **Railway Dashboard**: https://railway.app/dashboard

---

## 📞 Next Steps After Deployment

1. **Test the chatbot** thoroughly with various questions
2. **Monitor usage** via Railway dashboard
3. **Collect feedback** and improve training data
4. **Add analytics** to track popular questions
5. **Implement caching** for frequently asked questions

---

*Last Updated: September 2025*