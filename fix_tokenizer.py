#!/usr/bin/env python3
"""Fix tokenizer by downloading from base model"""

from transformers import AutoTokenizer
import shutil
import os

# Download tokenizer from base model
print("Downloading tokenizer from base Llama 3.2 model...")
tokenizer = AutoTokenizer.from_pretrained("unsloth/Llama-3.2-1B-Instruct")

# Save to our model directory
model_path = "/Users/saykarim/Downloads/abdul-llama-merged"
print(f"Saving tokenizer to {model_path}...")
tokenizer.save_pretrained(model_path)

print("Tokenizer fixed successfully!")
print("Now the fine-tuned model should work properly.")