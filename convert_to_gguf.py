#!/usr/bin/env python3
import sys
import json
import struct
import numpy as np
import torch
from pathlib import Path
from transformers import AutoModelForCausalLM, AutoTokenizer

def convert_safetensors_to_gguf(model_path, output_path):
    print(f"Loading model from {model_path}")
    
    # Load the model and tokenizer
    model = AutoModelForCausalLM.from_pretrained(model_path, torch_dtype=torch.float16, device_map="cpu")
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    
    print("Model loaded successfully")
    
    # Export to GGUF using llama.cpp's conversion
    print(f"Model architecture: {model.config.architectures}")
    print(f"Hidden size: {model.config.hidden_size}")
    print(f"Num layers: {model.config.num_hidden_layers}")
    
    # Save model in PyTorch format first
    torch_path = Path(model_path) / "pytorch_model.bin"
    print(f"Saving PyTorch model to {torch_path}")
    torch.save(model.state_dict(), torch_path)
    
    print(f"PyTorch model saved. Now use llama.cpp's convert script with the PyTorch model.")
    return torch_path

if __name__ == "__main__":
    model_path = "/Users/saykarim/Downloads/abdul-llama-merged"
    output_path = "/Users/saykarim/Downloads/abdul-final.gguf"
    
    torch_path = convert_safetensors_to_gguf(model_path, output_path)
    print(f"\nNext step: Run the following command:")
    print(f"cd ~/Downloads/llama.cpp && python convert_hf_to_gguf.py {model_path} --outfile {output_path} --outtype q8_0")