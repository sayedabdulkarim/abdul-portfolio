#!/bin/bash

# Setup script for local testing with fine-tuned model

echo "🚀 Abdul's AI Chatbot - Local Setup"
echo "===================================="

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install ollama
    else
        # Linux
        curl -fsSL https://ollama.ai/install.sh | sh
    fi
else
    echo "✅ Ollama is installed"
fi

# Check if model file exists
if [ ! -f "training/abdul-llama.gguf" ]; then
    echo "⚠️  Model file not found at training/abdul-llama.gguf"
    echo "   Please download it from Google Colab after training"
    echo "   Then place it in the training/ directory"
    exit 1
fi

# Start Ollama server
echo "Starting Ollama server..."
ollama serve &
OLLAMA_PID=$!
sleep 3

# Create model in Ollama
echo "Creating model in Ollama..."
cd training
ollama create abdul-llama -f Modelfile
cd ..

# Test the model
echo "Testing model..."
ollama run abdul-llama "Who are you?" --verbose

# Setup backend environment
echo "Setting up backend..."
cd backend

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "MODEL_TYPE=ollama" > .env
    echo "OLLAMA_MODEL=abdul-llama" >> .env
    echo "FRONTEND_URL=http://localhost:3000" >> .env
    echo "✅ Created backend/.env with Ollama configuration"
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt
pip install requests  # For Ollama communication

# Create models directory if needed
mkdir -p models

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the chatbot locally:"
echo "1. Terminal 1: ollama serve"
echo "2. Terminal 2: cd backend && python main.py"
echo "3. Terminal 3: npm start"
echo ""
echo "Then open http://localhost:3000 and click the chat button!"