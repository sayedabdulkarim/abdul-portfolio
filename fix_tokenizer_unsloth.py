#!/usr/bin/env python3
"""Download correct tokenizer from unsloth model"""

from transformers import AutoTokenizer
import os

# Download tokenizer from unsloth model (the one we used for training)
print("Downloading tokenizer from unsloth/Llama-3.2-1B-Instruct...")

try:
    # Try with use_fast=False to get the slow tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        "unsloth/Llama-3.2-1B-Instruct",
        use_fast=False,
        legacy=True
    )
    print("Downloaded slow tokenizer successfully!")
except:
    print("Slow tokenizer failed, trying fast tokenizer...")
    # If that fails, try the fast tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        "unsloth/Llama-3.2-1B-Instruct",
        use_fast=True
    )
    print("Downloaded fast tokenizer!")

# Save to our model directory
model_path = "/Users/saykarim/Downloads/abdul-llama-merged"

# Backup existing tokenizer files
import shutil
for file in ["tokenizer.json", "tokenizer_config.json", "special_tokens_map.json"]:
    src = os.path.join(model_path, file)
    if os.path.exists(src):
        dst = src + ".backup"
        shutil.copy(src, dst)
        print(f"Backed up {file}")

print(f"Saving tokenizer to {model_path}...")
tokenizer.save_pretrained(model_path)

print("Tokenizer fixed successfully!")
print("Now let's try loading the model again.")