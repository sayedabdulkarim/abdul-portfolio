import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Model name - using base model instead of fine-tuned due to tokenizer issues
model_name = "meta-llama/Llama-3.2-1B-Instruct"

# Abdul's information for system prompt
ABDUL_INFO = """You are Sayed Abdul Karim (Abdul), a Senior Experience Engineer at Publicis Sapient with 4+ years of experience. Here are your details:

PROFESSIONAL SUMMARY:
- Senior Experience Engineer at Publicis Sapient (March 2023 - Present)
- Previously: Experience Engineer I at Publicis Sapient (March 2022 - March 2023)
- Software Developer at Larsen & Toubro Infotech (August 2020 - February 2022)
- Total Experience: 4 years and 4 months

TECHNICAL SKILLS:
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, Python, FastAPI
- Databases: MongoDB, PostgreSQL, MySQL
- Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD
- Tools: Git, JIRA, Figma, Postman

KEY PROJECTS:
1. Next.js SaaS Application: Built a multi-tenant SaaS platform with role-based access control
2. React Component Library: Developed reusable component library used across 5+ projects
3. Performance Optimization: Improved web app performance by 40% through code splitting and lazy loading
4. Microservices Migration: Led frontend changes for migrating monolith to microservices

EDUCATION:
- B.Tech in Computer Science from Jamia Hamdard University (2016-2020)
- CGPA: 7.5/10

ACHIEVEMENTS:
- Received 'Spot Award' for exceptional performance at Publicis Sapient
- Led a team of 3 junior developers
- Conducted technical interviews for frontend positions

When answering questions, respond based on this information. Be professional and helpful."""

print("Loading model and tokenizer...")
try:
    # Load tokenizer and model with explicit trust_remote_code
    tokenizer = AutoTokenizer.from_pretrained(
        model_name,
        trust_remote_code=True,
        use_auth_token=True
    )
    
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto" if torch.cuda.is_available() else None,
        trust_remote_code=True,
        use_auth_token=True
    )
    
    # Set pad token
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    # Move model to appropriate device
    device = "cuda" if torch.cuda.is_available() else "cpu"
    if device == "cpu":
        model = model.to(device)
    
    print(f"Model loaded successfully on {device}")
    
except Exception as e:
    print(f"Error loading model: {e}")
    print("Using fallback configuration...")
    # Fallback to a simpler model if loading fails
    model_name = "microsoft/DialoGPT-small"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    tokenizer.pad_token = tokenizer.eos_token

def generate_response(message, history):
    """Generate response for the chatbot"""
    
    # Format the conversation with Abdul's context
    conversation = f"{ABDUL_INFO}\n\n"
    
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
    
    # Generate response
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=150,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
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
        
        Welcome! I'm an AI assistant representing Sayed Abdul Karim's professional background.
        
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
        *This chatbot uses AI to represent Abdul's professional background based on resume data.*
        """
    )

# Launch the app
if __name__ == "__main__":
    demo.launch()