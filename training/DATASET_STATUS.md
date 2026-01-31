# Training Dataset Status

## Current Status: Base Dataset Created

### Files
- `training_dataset.jsonl` - Base Q&A pairs (100 examples)
- `abdul_complete_info.md` - Source data (no company details)
- `CHATBOT_TRAINING_DATASET.md` - Full dataset plan

---

## Dataset Statistics

### Current: 100 Base Q&A Pairs

| Category | Count | Coverage |
|----------|-------|----------|
| Personal Info (name, email, location) | 15 | ✅ |
| Skills & Technologies | 20 | ✅ |
| Projects Overview | 10 | ✅ |
| Individual Projects (18 projects) | 25 | ✅ |
| Education | 5 | ✅ |
| Company Redirects (privacy) | 6 | ✅ |
| Conversational (greetings, thanks) | 10 | ✅ |
| Hiring/Contact | 5 | ✅ |
| Edge Cases | 4 | ✅ |
| **Total** | **100** | - |

---

## Target: 3,000 - 5,000 Examples for 90% Accuracy

Based on research:
- **1,000** = Absolute minimum
- **3,000** = Good for specific domain (portfolio chatbot)
- **5,000+** = High quality results

### Expansion Strategy

#### Method 1: Question Variations (10x multiplier)
Each base question needs 10 variations:
```
Base: "What's your name?"
Variations:
1. Who are you?
2. Tell me your name
3. What should I call you?
4. Can you introduce yourself?
5. What's your full name?
6. Who is this?
7. Whose portfolio is this?
8. May I know your name?
9. What do people call you?
10. Your name please?
```

#### Method 2: Answer Variations
Same question, slightly different answers:
```
Q: What's your name?
A1: I'm Sayed Abdul Karim, a Senior Software Engineer...
A2: My name is Sayed Abdul Karim, but call me Abdul...
A3: Hey! I'm Abdul - a full-stack developer...
```

#### Method 3: Context Variations
Add context to questions:
```
- "I'm looking for a React developer. What's your experience?"
- "I need someone who knows AI. Can you help?"
- "We have a Node.js project. Have you worked with it?"
```

---

## Recommended Dataset Breakdown (3,000 total)

| Category | Base | Variations | Total |
|----------|------|------------|-------|
| Personal Info | 20 | x10 | 200 |
| Tech Skills | 50 | x10 | 500 |
| Projects | 100 | x10 | 1,000 |
| Experience | 30 | x10 | 300 |
| Education | 10 | x10 | 100 |
| Conversational | 50 | x10 | 500 |
| Company Redirects | 20 | x10 | 200 |
| Edge Cases | 20 | x10 | 200 |
| **Total** | **300** | - | **3,000** |

---

## Next Steps

### Option A: Manual Expansion
1. Create 10 variations for each base question
2. Time: ~4-6 hours
3. Quality: High (human-written)

### Option B: GPT-Assisted Expansion
1. Use GPT to generate variations
2. Human review and edit
3. Time: ~1-2 hours
4. Quality: Medium-High (needs review)

### Option C: Template-Based Expansion
1. Create question templates
2. Auto-fill with data
3. Time: ~1 hour
4. Quality: Medium (can be repetitive)

### Recommended: Hybrid (B + Manual Review)
1. Generate variations with GPT
2. Manual review for quality
3. Add unique edge cases manually
4. Target: 3,000 examples

---

## Training Parameters (for Colab)

```python
# Based on research for optimal LoRA training
lora_config = {
    "r": 16,                    # LoRA rank
    "lora_alpha": 32,           # alpha = 2 * r (sweet spot)
    "lora_dropout": 0.05,       # Small dropout
    "target_modules": ["q_proj", "k_proj", "v_proj", "o_proj"]
}

training_args = {
    "num_train_epochs": 3,      # Don't overtrain
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 4,
    "learning_rate": 2e-4,
    "warmup_ratio": 0.03,
    "weight_decay": 0.01,       # Regularization
    "max_seq_length": 512
}
```

---

## Quality Checklist

Before training, verify:
- [ ] No company names in dataset
- [ ] All project URLs are correct
- [ ] No hallucinated information
- [ ] Consistent personality/tone
- [ ] Privacy redirects work
- [ ] All 18 projects covered
- [ ] All skills mentioned
- [ ] Edge cases handled

---

## Sources

- [Unsloth Fine-tuning Guide](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide)
- [Sebastian Raschka's LoRA Tips](https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms)
- [Databricks LoRA Guide](https://www.databricks.com/blog/efficient-fine-tuning-lora-guide-llms)

---

*Last Updated: January 2026*
