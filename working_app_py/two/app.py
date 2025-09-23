import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json
import requests
from datetime import datetime
from safetensors import safe_open

print(f"\n===== Application Startup at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} =====\n")
print("Loading Abdul's Fine-tuned Portfolio Chatbot...")

# Use the SAME base model that was fine-tuned
MODEL_NAME = "unsloth/Llama-3.2-1B-Instruct"

print(f"\n📥 Loading tokenizer...")
# Try multiple fallback tokenizers
try:
  tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
  print(f"✅ Loaded tokenizer from {MODEL_NAME}")
except:
  print("📥 Using fallback tokenizer...")
  tokenizer = AutoTokenizer.from_pretrained("NousResearch/Llama-2-7b-hf")
  print("✅ Loaded Llama 2 tokenizer as fallback")

if tokenizer.pad_token is None:
  tokenizer.pad_token = tokenizer.eos_token

print(f"\n📥 Loading base model {MODEL_NAME}...")
model = AutoModelForCausalLM.from_pretrained(
  MODEL_NAME,
  dtype=torch.float32,  # Changed from torch_dtype
  trust_remote_code=True
)
print("✅ Base model loaded!")

# Apply YOUR fine-tuned LoRA adapters
print("\n📥 Loading YOUR fine-tuned LoRA adapters...")
try:
  # Download adapter config
  config_url = "https://huggingface.co/Abdul8008/abdul-portfolio-chatbot/resolve/main/adapter_config.json"
  config_response = requests.get(config_url, timeout=10)

  if config_response.status_code == 200:
      adapter_config = json.loads(config_response.text)
      lora_alpha = adapter_config.get('lora_alpha', 16)
      r = adapter_config.get('r', 16)
      print(f"   LoRA config: alpha={lora_alpha}, r={r}")

      # Download adapter weights
      adapter_url = "https://huggingface.co/Abdul8008/abdul-portfolio-chatbot/resolve/main/adapter_model.safetensors"
      adapter_response = requests.get(adapter_url, stream=True, timeout=30)

      if adapter_response.status_code == 200:
          # Save adapter file
          with open("/tmp/abdul_adapter.safetensors", "wb") as f:
              f.write(adapter_response.content)
          print("   ✅ Downloaded adapter weights")

          # Apply LoRA weights to model
          with safe_open("/tmp/abdul_adapter.safetensors", framework="pt") as f:
              applied_count = 0
              for key in f.keys():
                  if "lora_A" in key:
                      lora_b_key = key.replace("lora_A", "lora_B")

                      if lora_b_key in list(f.keys()):
                          # Get base layer name
                          base_key = key.replace("base_model.model.", "")
                          base_key = base_key.replace(".lora_A.weight", ".weight")

                          if base_key in model.state_dict():
                              # Load LoRA matrices
                              lora_A = f.get_tensor(key).to(torch.float32)
                              lora_B = f.get_tensor(lora_b_key).to(torch.float32)

                              # Apply LoRA: W = W + (B @ A) * (alpha/r)
                              scaling = lora_alpha / r
                              delta = scaling * torch.matmul(lora_B, lora_A)

                              with torch.no_grad():
                                  model.state_dict()[base_key] += delta
                              applied_count += 1

          print(f"✅ Successfully applied {applied_count} LoRA layers from YOUR fine-tuning!")
          print("🎯 This model now has YOUR fine-tuned knowledge about Abdul!")
      else:
          print("⚠️ Could not download adapter weights")
  else:
      print("⚠️ Could not download adapter config")

except Exception as e:
  print(f"⚠️ Error loading adapters: {str(e)[:100]}")
  print("   Continuing with base model...")

def generate_response(message, history):
  """Generate response using YOUR fine-tuned model"""

  print(f"\n💬 User: {message}")

  # Build prompt - the model is already fine-tuned on Abdul's data
  system_prompt = "You are Sayed Abdul Karim, a Senior Experience Engineer at Publicis Sapient."

  # Simple prompt format
  prompt = f"System: {system_prompt}\n\nUser: {message}\n\nAssistant:"

  inputs = tokenizer(
      prompt,
      return_tensors="pt",
      truncation=True,
      max_length=256
  )

  print("🤖 Generating with YOUR fine-tuned model...")

  with torch.no_grad():
      outputs = model.generate(
          **inputs,
          max_new_tokens=150,
          temperature=0.7,
          top_p=0.9,
          do_sample=True,
          pad_token_id=tokenizer.pad_token_id,
          eos_token_id=tokenizer.eos_token_id if hasattr(tokenizer, 'eos_token_id') else tokenizer.pad_token_id,
          repetition_penalty=1.1
      )

  # Decode response
  response = tokenizer.decode(
      outputs[0][len(inputs["input_ids"][0]):],
      skip_special_tokens=True
  )

  # Clean response
  response = response.strip()

  # Remove any formatting artifacts
  if "User:" in response:
      response = response.split("User:")[0]
  if "System:" in response:
      response = response.split("System:")[0]

  print(f"🤖 Generated: {response[:100]}...")

  return response

# Gradio interface
demo = gr.Interface(
  fn=generate_response,
  inputs=gr.Textbox(
      placeholder="Ask about Abdul's experience, skills, projects, or education...",
      label="Your Question",
      lines=2
  ),
  outputs=gr.Textbox(label="Response"),
  title="🤖 Abdul's Fine-tuned Portfolio Chatbot",
  description="Using YOUR Fine-tuned Model - Llama 3.2 1B + Your LoRA Adapters\n\nThis chatbot uses the model YOU fine-tuned on Abdul's portfolio data.",
  examples=[
      ["Who are you?"],
      ["What's your name?"],
      ["What is your current role?"],
      ["Tell me about your experience"],
      ["What technologies do you know?"],
      ["What are your skills?"],
      ["What's your educational background?"],
      ["What projects have you worked on?"],
      ["Do you have experience with React?"],
      ["Tell me about your work at Publicis Sapient"]
  ],
  theme=gr.themes.Soft()
)

if __name__ == "__main__":
  demo.launch()