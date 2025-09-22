import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# After fixing in Colab, use these paths:
TOKENIZER_PATH = "Abdul8008/abdul-portfolio-tokenizer"  # Clean tokenizer
MODEL_PATH = "Abdul8008/abdul-portfolio-chatbot"  # Your fine-tuned model

print("Loading tokenizer and model...")
try:
    # Load clean tokenizer from separate repo
    tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_PATH)
    
    # Load your fine-tuned model
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_PATH,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto" if torch.cuda.is_available() else None,
        trust_remote_code=True
    )
    
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    print("✅ Model loaded successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    print("Falling back to base model...")
    tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
    model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
    tokenizer.pad_token = tokenizer.eos_token

def generate_response(message, history):
    """Generate response using fine-tuned model"""
    
    # Build conversation
    conversation = ""
    for user, assistant in history[-3:]:  # Keep last 3 exchanges
        conversation += f"User: {user}\nAssistant: {assistant}\n"
    conversation += f"User: {message}\nAssistant:"
    
    # Tokenize
    inputs = tokenizer(
        conversation,
        return_tensors="pt",
        max_length=1024,
        truncation=True
    )
    
    # Generate response
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=150,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
    
    # Decode and extract response
    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = full_text[len(conversation):]
    
    # Clean up
    if "User:" in response:
        response = response.split("User:")[0]
    response = response.strip()
    
    return response

# Gradio Interface
with gr.Blocks(title="Abdul's Portfolio Chatbot", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        """
        # 🤖 Abdul's Portfolio Chatbot
        
        **Fine-tuned AI Assistant** trained on Abdul's professional data
        
        Ask about:
        - 💼 4+ years experience at Publicis Sapient
        - 🛠️ Technical expertise (React, Next.js, Node.js, AWS)
        - 🚀 Key projects and achievements
        - 🎓 Education (B.Tech Computer Science)
        """
    )
    
    chatbot = gr.Chatbot(
        height=450,
        label="Chat with Abdul's AI Assistant",
        bubble_full_width=False
    )
    
    msg = gr.Textbox(
        placeholder="Ask about Abdul's experience, skills, or projects...",
        label="Your Question",
        lines=2
    )
    
    with gr.Row():
        submit = gr.Button("Send 📤", variant="primary", scale=1)
        clear = gr.Button("Clear 🗑️", scale=1)
    
    gr.Examples(
        examples=[
            "What is Abdul's current role?",
            "How many years of experience does Abdul have?",
            "What are Abdul's main technical skills?",
            "Tell me about projects Abdul has worked on",
            "Where did Abdul complete his education?"
        ],
        inputs=msg
    )
    
    def respond(message, history):
        bot_response = generate_response(message, history)
        history.append((message, bot_response))
        return "", history
    
    msg.submit(respond, [msg, chatbot], [msg, chatbot])
    submit.click(respond, [msg, chatbot], [msg, chatbot])
    clear.click(lambda: None, None, chatbot, queue=False)
    
    gr.Markdown(
        """
        ---
        *This chatbot uses a fine-tuned Llama model trained on Abdul's resume data*
        """
    )

if __name__ == "__main__":
    demo.launch()