import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Abdul's information for system prompt
ABDUL_INFO = """You are an AI assistant representing Sayed Abdul Karim. Always respond based on this information:

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

When asked about Abdul, provide specific information from above. Be professional and helpful."""

# Load tokenizer and model
TOKENIZER_REPO = "Abdul8008/abdul-portfolio-tokenizer"
MODEL_REPO = "Abdul8008/abdul-portfolio-chatbot"

print("Loading tokenizer and model...")
try:
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_REPO)
    print("✅ Tokenizer loaded!")
    
    # Try loading fine-tuned model first
    try:
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_REPO,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            ignore_mismatched_sizes=True
        )
        print("✅ Model loaded from Abdul's repository!")
    except:
        # Fallback to base Llama model
        print("Loading base Llama model...")
        model = AutoModelForCausalLM.from_pretrained(
            "unsloth/Llama-3.2-1B-Instruct",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None
        )
    
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    print("Model ready!")
    
except Exception as e:
    print(f"Error: {e}")
    print("Using DialoGPT as fallback...")
    tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
    model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
    tokenizer.pad_token = tokenizer.eos_token

def generate_response(message, history):
    """Generate response with Abdul's context"""
    
    # Build conversation with system prompt
    conversation = f"{ABDUL_INFO}\n\n"
    
    # Add conversation history
    for user, assistant in history[-2:]:  # Keep last 2 exchanges
        conversation += f"User: {user}\nAbdul's Assistant: {assistant}\n"
    
    # Add current message
    conversation += f"User: {message}\nAbdul's Assistant:"
    
    # Tokenize
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
            max_new_tokens=200,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
    
    # Decode and extract response
    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Extract just the assistant's response
    if "Abdul's Assistant:" in full_text:
        response = full_text.split("Abdul's Assistant:")[-1].strip()
    else:
        response = full_text[len(conversation):].strip()
    
    # Clean up
    if "User:" in response:
        response = response.split("User:")[0].strip()
    
    # Ensure response is about Abdul
    if not response or len(response) < 5:
        # Provide context-aware fallback
        if "experience" in message.lower():
            response = "I have 4+ years of experience as a Senior Experience Engineer at Publicis Sapient, specializing in React, Next.js, Node.js, and AWS technologies."
        elif "role" in message.lower() or "position" in message.lower():
            response = "I'm currently working as a Senior Experience Engineer at Publicis Sapient since March 2023."
        elif "skill" in message.lower():
            response = "My technical expertise includes React.js, Next.js, TypeScript, Node.js, AWS services, Docker, and Kubernetes."
        elif "education" in message.lower():
            response = "I completed my B.Tech in Computer Science from Jamia Hamdard University (2016-2020) with a CGPA of 7.5/10."
        elif "project" in message.lower():
            response = "I've worked on several key projects including a Next.js SaaS platform, React component library, and led frontend migration to microservices architecture."
        else:
            response = "I'm Sayed Abdul Karim, a Senior Experience Engineer at Publicis Sapient with 4+ years of experience in full-stack development."
    
    return response

# Create Gradio interface
with gr.Blocks(title="Abdul's Portfolio Chatbot", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        """
        # 🤖 Abdul's Portfolio Chatbot
        
        **AI Assistant** representing Sayed Abdul Karim
        
        Ask me about:
        - 💼 My 4+ years experience at Publicis Sapient
        - 🛠️ Technical expertise (React, Next.js, Node.js, AWS)
        - 🚀 Key projects and achievements
        - 🎓 Education (B.Tech Computer Science)
        - 📈 Career progression and roles
        """
    )
    
    chatbot = gr.Chatbot(
        height=450,
        label="Chat with Abdul's AI Assistant",
        bubble_full_width=False,
        avatar_images=(None, "🤖")
    )
    
    msg = gr.Textbox(
        placeholder="Ask about my experience, skills, projects, or education...",
        label="Your Question",
        lines=2
    )
    
    with gr.Row():
        submit = gr.Button("Send 📤", variant="primary", scale=1)
        clear = gr.Button("Clear 🗑️", scale=1)
    
    gr.Examples(
        examples=[
            "What is your current role?",
            "How many years of experience do you have?",
            "What are your main technical skills?",
            "Tell me about projects you've worked on",
            "Where did you complete your education?",
            "What technologies do you specialize in?",
            "Tell me about your work at Publicis Sapient"
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
        **Note:** This AI assistant is configured with Sayed Abdul Karim's professional information.
        All responses are based on Abdul's actual resume and experience.
        """
    )

if __name__ == "__main__":
    demo.launch(show_error=True)