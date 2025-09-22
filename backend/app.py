import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import spaces

# Model name
model_name = "Abdul8008/abdul-portfolio-chatbot"

# Load tokenizer and model
print("Loading model and tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto" if torch.cuda.is_available() else None,
    trust_remote_code=True
)

# Set pad token
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

# Move model to appropriate device
device = "cuda" if torch.cuda.is_available() else "cpu"
if device == "cpu":
    model = model.to(device)

print(f"Model loaded on {device}")

@spaces.GPU(duration=60)
def generate_response(message, history):
    """Generate response for the chatbot"""
    
    # Format the conversation with history
    conversation = ""
    for user, assistant in history:
        conversation += f"User: {user}\nAssistant: {assistant}\n"
    
    # Add current message
    conversation += f"User: {message}\nAssistant:"
    
    # Tokenize the input
    inputs = tokenizer(
        conversation, 
        return_tensors="pt",
        max_length=2048,
        truncation=True
    )
    
    # Move inputs to device
    if device == "cuda":
        inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Generate response
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=150,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            repetition_penalty=1.1,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
    
    # Decode the response
    response = tokenizer.decode(outputs[0][inputs['input_ids'].shape[-1]:], skip_special_tokens=True)
    
    # Clean up the response
    if "Assistant:" in response:
        response = response.split("Assistant:")[-1].strip()
    if "User:" in response:
        response = response.split("User:")[0].strip()
    
    return response

# Create the Gradio interface
with gr.Blocks(title="Abdul's Portfolio Chatbot") as demo:
    gr.Markdown(
        """
        # 🤖 Abdul's Portfolio Chatbot
        
        Welcome! I'm an AI assistant trained to answer questions about Sayed Abdul Karim's professional background.
        
        Ask me about:
        - Abdul's work experience at Publicis Sapient
        - Technical skills (React, Next.js, Node.js, AWS, etc.)
        - Projects and achievements
        - Education and qualifications
        """
    )
    
    chatbot = gr.Chatbot(
        height=400,
        label="Chat with Abdul's AI Assistant",
        bubble_full_width=False
    )
    
    msg = gr.Textbox(
        label="Your Message",
        placeholder="Type your question here... (e.g., 'What is Abdul's experience with React?')",
        lines=2
    )
    
    with gr.Row():
        submit = gr.Button("Send", variant="primary")
        clear = gr.Button("Clear Chat")
    
    gr.Examples(
        examples=[
            "What is Abdul's current role?",
            "What technologies does Abdul work with?",
            "Tell me about Abdul's experience at Publicis Sapient",
            "What projects has Abdul worked on?",
            "What is Abdul's educational background?"
        ],
        inputs=msg
    )
    
    def user_submit(message, history):
        response = generate_response(message, history)
        history.append((message, response))
        return "", history
    
    msg.submit(user_submit, [msg, chatbot], [msg, chatbot])
    submit.click(user_submit, [msg, chatbot], [msg, chatbot])
    clear.click(lambda: None, None, chatbot, queue=False)

    gr.Markdown(
        """
        ---
        *This chatbot is powered by a fine-tuned Llama model trained on Abdul's resume data.*
        """
    )

# Launch the app
if __name__ == "__main__":
    demo.launch()