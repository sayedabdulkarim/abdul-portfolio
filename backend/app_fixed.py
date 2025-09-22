import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

# Use the base model's tokenizer but your fine-tuned weights
base_model = "unsloth/Llama-3.2-1B-Instruct"
finetuned_model = "Abdul8008/abdul-portfolio-chatbot"

print("Loading model and tokenizer...")
try:
    # Load tokenizer from base model (to avoid corruption issues)
    tokenizer = AutoTokenizer.from_pretrained(base_model, trust_remote_code=True)
    
    # Load YOUR fine-tuned model weights
    model = AutoModelForCausalLM.from_pretrained(
        finetuned_model,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto" if torch.cuda.is_available() else None,
        trust_remote_code=True
    )
    
    # Set pad token
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    print("Fine-tuned model loaded successfully!")
    
except Exception as e:
    print(f"Error loading fine-tuned model, using base: {e}")
    # Fallback to base model
    tokenizer = AutoTokenizer.from_pretrained(base_model)
    model = AutoModelForCausalLM.from_pretrained(base_model)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

# Create pipeline for easier inference
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto" if torch.cuda.is_available() else None
)

def generate_response(message, history):
    """Generate response using fine-tuned model"""
    
    # Format conversation
    conversation = ""
    for user, assistant in history:
        conversation += f"User: {user}\nAssistant: {assistant}\n"
    conversation += f"User: {message}\nAssistant:"
    
    # Generate using pipeline
    outputs = pipe(
        conversation,
        max_new_tokens=150,
        temperature=0.7,
        top_p=0.9,
        do_sample=True,
        return_full_text=False
    )
    
    response = outputs[0]['generated_text']
    
    # Clean response
    if "User:" in response:
        response = response.split("User:")[0].strip()
    if "Assistant:" in response:
        response = response.split("Assistant:")[-1].strip()
    
    return response

# Create Gradio interface
with gr.Blocks(title="Abdul's Portfolio Chatbot") as demo:
    gr.Markdown(
        """
        # 🤖 Abdul's Portfolio Chatbot
        
        AI assistant fine-tuned on Abdul's professional background and resume.
        
        Ask me about:
        - Work experience at Publicis Sapient
        - Technical expertise in React, Next.js, Node.js, AWS
        - Projects and achievements
        - Education and certifications
        """
    )
    
    chatbot = gr.Chatbot(
        height=400,
        label="Chat with Abdul's AI Assistant"
    )
    
    msg = gr.Textbox(
        label="Your Message",
        placeholder="Ask about Abdul's experience, skills, or projects...",
        lines=2
    )
    
    with gr.Row():
        submit = gr.Button("Send", variant="primary")
        clear = gr.Button("Clear")
    
    gr.Examples(
        examples=[
            "What is Abdul's current role?",
            "How many years of experience does Abdul have?",
            "What technologies does Abdul specialize in?",
            "Tell me about Abdul's work at Publicis Sapient",
            "What projects has Abdul worked on?"
        ],
        inputs=msg
    )
    
    def respond(message, history):
        bot_message = generate_response(message, history)
        history.append((message, bot_message))
        return "", history
    
    msg.submit(respond, [msg, chatbot], [msg, chatbot])
    submit.click(respond, [msg, chatbot], [msg, chatbot])
    clear.click(lambda: None, None, chatbot, queue=False)

if __name__ == "__main__":
    demo.launch()