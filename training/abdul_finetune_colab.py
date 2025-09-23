"""
Abdul Portfolio Chatbot Fine-tuning Script for Google Colab
This script fine-tunes Llama 3.2 1B on Abdul's portfolio data
"""

# ============================================
# STEP 1: Install Required Packages
# ============================================
print("Step 1: Installing packages...")
!pip install -q unsloth
!pip install -q "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
!pip install -q --upgrade --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes

# ============================================
# STEP 2: Import Libraries
# ============================================
print("\nStep 2: Importing libraries...")
from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import Dataset
import json
import pandas as pd

# ============================================
# STEP 3: Load and Prepare Model
# ============================================
print("\nStep 3: Loading Llama 3.2 1B model...")

max_seq_length = 2048
dtype = None
load_in_4bit = True

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-1B-Instruct",
    max_seq_length=max_seq_length,
    dtype=dtype,
    load_in_4bit=load_in_4bit,
)

# ============================================
# STEP 4: Configure LoRA
# ============================================
print("\nStep 4: Configuring LoRA for fine-tuning...")

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
)

# ============================================
# STEP 5: Load Training Data
# ============================================
print("\nStep 5: Loading training data...")

# Upload your comprehensive_training_data.json to Colab first
training_data = json.load(open('comprehensive_training_data.json', 'r'))

# Format data for fine-tuning
formatted_data = []
for item in training_data['conversations']:
    # Create prompt-response pairs
    prompt = f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are an AI assistant representing Sayed Abdul Karim. Answer questions about his professional background, experience, and skills based on the information you've been trained on.<|eot_id|><|start_header_id|>user<|end_header_id|>

{item['question']}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

{item['answer']}<|eot_id|>"""
    formatted_data.append({"text": prompt})

# Create dataset
dataset = Dataset.from_pandas(pd.DataFrame(formatted_data))
print(f"Dataset size: {len(dataset)} examples")

# ============================================
# STEP 6: Set Training Parameters
# ============================================
print("\nStep 6: Setting up training parameters...")

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    dataset_num_proc=2,
    packing=False,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        num_train_epochs=3,  # Increase epochs for better learning
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        output_dir="outputs",
        save_strategy="epoch",
    ),
)

# ============================================
# STEP 7: Train the Model
# ============================================
print("\nStep 7: Starting training...")
print("This will take about 10-15 minutes on T4 GPU...")

trainer_stats = trainer.train()

print("\nTraining completed!")
print(f"Training loss: {trainer_stats.training_loss}")

# ============================================
# STEP 8: Test the Model
# ============================================
print("\nStep 8: Testing the fine-tuned model...")

# Enable inference mode
FastLanguageModel.for_inference(model)

# Test questions
test_questions = [
    "Who are you?",
    "What is your current role?",
    "How many years of experience do you have?",
    "What technologies do you work with?",
    "Tell me about your projects"
]

for question in test_questions:
    inputs = tokenizer(
        [f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are an AI assistant representing Sayed Abdul Karim.<|eot_id|><|start_header_id|>user<|end_header_id|>

{question}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"""],
        return_tensors="pt"
    ).to("cuda" if torch.cuda.is_available() else "cpu")
    
    outputs = model.generate(**inputs, max_new_tokens=128, temperature=0.7)
    response = tokenizer.batch_decode(outputs)[0]
    
    # Extract just the assistant's response
    if "assistant<|end_header_id|>" in response:
        response = response.split("assistant<|end_header_id|>")[-1]
        response = response.replace("<|eot_id|>", "").strip()
    
    print(f"\nQ: {question}")
    print(f"A: {response}")

# ============================================
# STEP 9: Save Model and Tokenizer Separately
# ============================================
print("\nStep 9: Saving model and tokenizer...")

# Save the model
model.save_pretrained("abdul_finetuned_model")
print("✅ Model saved to abdul_finetuned_model/")

# Save the tokenizer separately to avoid corruption
tokenizer.save_pretrained("abdul_finetuned_tokenizer")
print("✅ Tokenizer saved to abdul_finetuned_tokenizer/")

# Also save in merged format for easier deployment
model.save_pretrained_merged("abdul_merged_model", tokenizer, save_method="merged_16bit")
print("✅ Merged model saved to abdul_merged_model/")

print("\n" + "="*50)
print("FINE-TUNING COMPLETE!")
print("="*50)
print("\nNext steps:")
print("1. Download the folders: abdul_finetuned_model, abdul_finetuned_tokenizer, abdul_merged_model")
print("2. Upload to Hugging Face Hub")
print("3. Update your Gradio app to use the new model")