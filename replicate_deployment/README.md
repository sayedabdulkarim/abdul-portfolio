# Deploy Abdul's Fine-tuned Model to Replicate

## Steps to Deploy:

### 1. Install Cog (Replicate's tool)
```bash
brew install cog
# or
sudo curl -o /usr/local/bin/cog -L https://github.com/replicate/cog/releases/latest/download/cog_`uname -s`_`uname -m`
sudo chmod +x /usr/local/bin/cog
```

### 2. Create Replicate Account
- Go to https://replicate.com
- Sign up with GitHub
- Get your API token from https://replicate.com/account/api-tokens

### 3. Copy Model Files
```bash
# Copy your fine-tuned model to this directory
cp -r /Users/saykarim/Downloads/abdul-llama-merged ./model
```

### 4. Build and Push
```bash
# Login to Replicate
cog login

# Build the container
cog build

# Push to Replicate
cog push r8.im/YOUR_USERNAME/abdul-chatbot
```

### 5. Use the API
Once deployed, you'll get an API endpoint like:
```
https://api.replicate.com/v1/models/YOUR_USERNAME/abdul-chatbot/predictions
```

### 6. Update Frontend
Update your frontend to call the Replicate API:

```javascript
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    version: 'YOUR_MODEL_VERSION',
    input: {
      prompt: userMessage,
      max_tokens: 100,
      temperature: 0.5
    }
  })
});
```

## Pricing
- ~$0.0002 per second of GPU time
- Average request: ~2-3 seconds = ~$0.0006 per request
- 1000 requests = ~$0.60

## Test Locally First
```bash
# Test locally before deploying
cog predict -i prompt="Who are you?"
```