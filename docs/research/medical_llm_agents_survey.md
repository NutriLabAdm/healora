# Survey of Medical and Nutritional LLMs and AI Agents

## 1. Overview

This document surveys state-of-the-art large language models (LLMs) and AI agents in the medical, nutritional, and nutraceutical domains, with emphasis on Russian and Chinese ecosystems. It includes both general-purpose medical models and specialized agents for therapeutic reasoning, diagnostics, dietary planning, and Traditional Chinese Medicine (TCM).

---

## 2. General Medical Capability of LLMs

### 2.1. Anthropic Claude — BioMysteryBench

Anthropic developed **BioMysteryBench**, a bioinformatics benchmark of 99 real-world research problems across single-cell RNA-seq, RNA-seq, structural biology, and clinical metagenomics. Claude (Opus 4.6 and Mythos Preview) was placed in an isolated container with standard bioinformatics tools, database access (NCBI, Ensembl), and freedom to install additional software. Key results:

- On human-solvable problems (n=76), Claude performed on par with a panel of domain experts
- On human-difficult problems (n=23), Claude Mythos Preview solved ~30% that no human could
- Opus 4.6 achieved 86% reproducibility (4/5+ attempts correct) on human-solvable tasks
- Human-difficult tasks dropped to 44% reproducibility, indicating brittle reasoning on hard problems

This benchmark demonstrates that frontier LLMs can now match and, in some cases, exceed expert-level bioinformatics analysis — a critical capability for medical research support.

> **Source:** Anthropic. "Evaluating Claude's bioinformatics research capabilities with BioMysteryBench" (2026). https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench

### 2.2. Google MedGemma

**MedGemma** (Google DeepMind, 2025) is a collection of open models based on Gemma 3, optimized for medical text and image comprehension. Available variants:

| Variant | Parameters | Input | Output | Released |
|---------|-----------|-------|--------|----------|
| MedGemma 4B MM | 4B | Text + Image | Text | May 2025 |
| MedGemma 27B Text | 27B | Text only | Text | May 2025 |
| MedGemma 27B MM | 27B | Text + Image | Text | Jul 2025 |
| MedGemma 1.5 4B | 4B | Text + Image (CT, MRI, WSI) | Text | 2026 |

MedGemma integrates a **MedSigLIP** vision encoder (400M params) fine-tuned on chest X-rays, histopathology, dermatology, and fundus images. Performance highlights:
- 2.6–10% improvement on medical multimodal QA over base Gemma 3
- 15.5–18.1% improvement on chest X-ray finding classification
- 10.8% improvement on agentic evaluations (AgentClinic)
- Fine-tuning reduces EHR information retrieval errors by 50%

MedGemma supports 128K context length and is available under open terms on Hugging Face.

> **Sources:**
> - Google DeepMind. "MedGemma Technical Report" (2025). https://arxiv.org/abs/2507.05201
> - Google Health AI Developer Foundations. https://developers.google.com/health-ai-developer-foundations/medgemma

### 2.3. TxAgent — Therapeutic Reasoning Agent

**TxAgent** (Harvard/Marinka Zitnik Lab, 2025) is an AI agent for precision therapeutic reasoning. It leverages a **ToolUniverse** of 211 biomedical tools covering all US FDA-approved drugs since 1939 and validated clinical insights from Open Targets and Monarch Initiative.

Architecture:
- Multi-step reasoning with tool selection via **ToolRAG** (GTE-Qwen2-1.5B embedding model)
- Goal-oriented tool selection and structured function calls
- Real-time knowledge grounding from continuously updated databases

Performance:
- **92.1% accuracy** in open-ended drug reasoning tasks
- Surpasses GPT-4o by up to 25.8%
- Outperforms DeepSeek-R1 (671B) in structured multi-step reasoning
- Variance < 0.01 between brand, generic, and description-based drug references (55% better than prior tool-use LLMs)

Benchmarks: DrugPC, BrandPC, GenericPC, TreatmentPC, DescriptionPC (3,168 drug reasoning tasks + 456 personalized treatment scenarios).

TxAgent is available as open-source (MIT license): https://github.com/mims-harvard/TxAgent

> **Source:** Gao et al. "TxAgent: An AI Agent for Therapeutic Reasoning Across a Universe of Tools" (2025). https://arxiv.org/abs/2503.10970

---

## 3. Russian Medical LLMs and Agents

### 3.1. GigaChat (Sber)

**GigaChat** is the flagship Russian generative model by Sberbank, built on a transformer architecture and trained on massive Russian-language corpora including medical data. GigaChat is one of the few LLMs worldwide to have successfully passed a professional medical exam.

- **Diagnostic accuracy:** 93% (28/30 clinical cases from NEJM), tested by AIRI (Artificial Intelligence Research Institute, 2025)
- **Deployment:** Integrated into **SberHealth** app, used 160,000+ times in real conditions
- **Capabilities:** Differential diagnosis, rare disease recognition (Whipple disease, aceruloplasminemia), test result interpretation, patient triage
- **Architecture:** Multi-agent system combining diagnostic reasoning with dialogue logic

In November 2025, GigaChat was deployed in **Medscan clinics** as an AI agent for medical test result interpretation, explaining results in plain language and recommending specialist referrals.

> **Sources:**
> - AIRI/SberHealth. "GigaChat AI assistant achieves 93% accuracy in medical diagnoses" (2025)
> - TAdviser. "Medskan clinics began to use AI agents based on GigaChat" (2025)

### 3.2. GigaPevt — Multimodal Medical Assistant

**GigaPevt** (Sber AI Lab, IJCAI 2024) is the first multimodal medical assistant for Russian. It combines:
- **GigaChat Pro** LLM for dialogue management
- **Remote photoplethysmography** — video-based estimation of sociodemographic data (age, sex, BMI) and vital signs
- **RAG** (Retrieval-Augmented Generation) from a curated medical dialogue database
- **Chain-of-Thought** prompting for structured reasoning

Performance on RuMedBench:
- **RuMedDaNet (QA):** 93.36% accuracy — surpasses human performance (92.97%) and ChatGPT-3.5 (89.26%)
- **RuMedNLI (inference):** 71.59% — above GigaChat (71.21%) and ChatGPT-3.5 (61.33%)

The prompt structure includes: constitution (role description) + visual patient data (pulse, BMI, etc.) + postfix (recommendations).

> **Source:** Blinov et al. "GigaPevt: Multimodal Medical Assistant" (2024). IJCAI 2024 Demo Track. https://doi.org/10.24963/ijcai.2024/992

### 3.3. CLARITY — Clinical Assistant for Routing, Inference and Triage

**CLARITY** (2025) is a Russian AI-driven platform combining a **Finite State Machine (FSM)** for structured dialogue flows with **LLM-powered collaborative agents** for symptom analysis and specialist routing.

- **Specialist routing precision:** 77% for first recommendation
- **Top-3 recall:** 96%
- **Consultation time:** ~2 minutes (vs. typical human consultation)
- **Architecture:** Microservices-based hybrid FSM + LLM agents

> **Source:** Shaposhnikov et al. "CLARITY: Clinical Assistant for Routing, Inference and Triage" (2025). https://arxiv.org/abs/2510.02463

### 3.4. MedSyn — Synthetic Medical Text Generation (Russian)

**MedSyn** (2024) is a framework integrating LLMs with a Medical Knowledge Graph (MKG) to generate synthetic clinical notes in Russian. Key features:
- 41,185 synthetic clinical notes covering **219 ICD-10 codes**
- Based on GPT-4 and fine-tuned LLaMA-7b
- Improves ICD code classification accuracy by **up to 17.8%** (RuBioRoBERTa)
- Open-source: https://github.com/milteam/MedSyn

> **Source:** Kumichev et al. "MedSyn: LLM-Based Synthetic Medical Text Generation Framework" (2024). ECML PKDD. https://arxiv.org/abs/2408.02056

### 3.5. RuCCoD — Russian ICD Coding

**RuCCoD** (Russian ICD Coding Dataset, 2025) benchmarks LLMs for automated ICD-10 coding of Russian EHRs. Models evaluated: BERT-based IE pipeline, LLaMA+LoRA, and zero-shot LLM+RAG. Fine-tuned Llama3-Med42-8B and Phi-3.5-mini achieved best results with PEFT.

> **Source:** "RuCCoD: Towards Automated ICD Coding in Russian" (2025). EMNLP. https://arxiv.org/abs/2502.21263

### 3.6. RuMedBench — Russian Medical Benchmark

**RuMedBench** is the standard open benchmark for Russian medical NLP, comprising:
- **RuMedDaNet:** 512 binary QA questions (medical text understanding)
- **RuMedNLI:** 1,536 pairs for natural language inference
- **RuMedTest:** Multiple-choice exam (General Medical Practice)
- **ECG2Pathology:** Multi-label ECG signal classification (73 cardiac pathology classes)

Open benchmark: https://medbench.ru/en/

> **Source:** Blinov et al. "RuMedBench: a Russian Medical Language Understanding Benchmark" (2022). AIME. Springer.

---

## 4. Chinese Medical LLMs and Agents

### 4.1. AntAngelMed — Top Open-Source Medical LLM

**AntAngelMed** (2025) is the largest and most powerful open-source medical language model, jointly developed by Zhejiang Health Information Center, Ant Healthcare, and Zhejiang Anzhen'er Medical AI Technology.

Key specs:
- **6.1B activated parameters** (MoE architecture, ~40B dense equivalent)
- **#1 on OpenAI HealthBench** among all open-source models
- **#1 on MedAIBench** (Chinese authority benchmark)
- **#1 on MedBench** across all 5 core dimensions
- **Inference:** >200 tokens/s on H20, 128K context (YaRN extrapolation)
- **Training:** 3-stage pipeline — continual pre-training + SFT + GRPO-based RL

> **Source:** AntAngelMed Team (2025). https://huggingface.co/MedAIBase/AntAngelMed

### 4.2. MedGo — Chinese Medical LLM

**MedGo** (2024) is a Chinese medical LLM based on Qwen2-72B, trained on 6,000+ medical textbooks. Achieved **#1 on CBLUE** (Chinese Biomedical Language Understanding Evaluation). Deployed at **Shanghai East Hospital** in real clinical settings.

> **Source:** "MedGo: A Chinese Medical Large Language Model" (2024). https://arxiv.org/abs/2410.20428

### 4.3. CareBot — Bilingual Medical LLM

**CareBot** (2024) is a bilingual (Chinese/English) medical LLM based on LLaMA3-8B with a novel two-stage continuous pre-training (stable + boost CPT) and DataRater quality assessment. Tested on 15+ departments and 100+ disease specialties. Outperforms HuatuoGPT II by 6.69% and ChatGPT by 8.65% on Chinese medical benchmarks.

> **Source:** "CareBot: A Pioneering Full-Process Open-Source Medical Language Model" (2024). https://arxiv.org/abs/2412.15236

### 4.4. Chinese TCM-Specific LLMs

| Model | Base | Focus | Key Feature |
|-------|------|-------|-------------|
| **Qibo** | — | TCM | 2GB TCM corpus, two-stage training (CPT+SFT), Qibo-Benchmark |
| **BianCang** | Qwen-2/2.5 | TCM | Real hospital records + ChP-TCM dataset (Pharmacopoeia of PRC) |
| **ShizhenGPT** | Qwen | TCM Multimodal | First multimodal TCM LLM — text, image (tongue, palm), audio (pulse, breath), smell |
| **JingFang** | — | TCM Consultation | Multi-Agent Collaborative Chain-of-Thought (MACCTM), Syndrome Agent, 124% improvement in syndrome differentiation |
| **Zhongjing** | Ziya-LLaMA-13B | Chinese Medicine | End-to-end training from pre-training to RLHF |
| **Lingdan** | Baichuan2-13B | TCM | Trained on TCM ancient books, textbooks, Chinese Pharmacopoeia |

**Key findings** (Nature Digital Medicine, 2025): GPT-4o, Qwen 2.5 Max, and Doubao 1.5 Pro demonstrated performance comparable to licensed acupuncturists in TCM diagnosis, acupoint selection, and herbal treatment planning.

> **Sources:**
> - Zhang et al. "Qibo: A Large Language Model for Traditional Chinese Medicine" (2024). https://arxiv.org/abs/2403.16056
> - "BianCang: A Traditional Chinese Medicine Large Language Model" (2024). https://arxiv.org/abs/2411.11027
> - "ShizhenGPT: Multimodal LLM for TCM" (2025). https://arxiv.org/abs/2508.14706
> - "JingFang: TCM LLM with MACCTM" (2025). https://arxiv.org/abs/2502.04345
> - Liu et al. "Evaluating LLMs in TCM" (2025). npj Digital Medicine. https://doi.org/10.1038/s41746-025-01845-2

---

## 5. Medical AI Agents

### 5.1. MedAgent-Pro — Evidence-Based Multi-Modal Diagnosis

**MedAgent-Pro** (2025) follows modern clinical diagnosis principles with a hierarchical structure:
- **Disease-level planning:** RAG-based retrieval from medical guidelines
- **Patient-level reasoning:** Integration of vision tools for quantitative assessment
- **Reliability verification** of each step before proceeding

Outperforms GPT-4o by 34% on glaucoma and 22% on heart disease diagnosis across 10+ imaging modalities and 20+ anatomies.

> **Source:** Wang et al. "MedAgent-Pro: Towards Evidence-based Multi-modal Medical Diagnosis via Reasoning Agentic Workflow" (2025). https://arxiv.org/abs/2503.18968

### 5.2. MedAgent (Tsinghua/MSRA) — Evidence-Based Multi-Agent Framework

**MedAgent** (Tsinghua University, Microsoft Research Asia, Peking University, 2025) integrates four cooperative agents:
1. **Symptom Analyst** — extracts findings, generates differential diagnoses
2. **Evidence Retriever** — queries PubMed, UpToDate, NIH databases
3. **Treatment Synthesizer** — generates interventions ranked by evidence level
4. **Medical Auditor** — evaluates reasoning chain for factual/ethical correctness

Benchmark results: MedQA +9.4%, PubMedQA +8.1%, LiveBench-Med +12.7% over GPT-4 baseline.

> **Source:** Sun et al. "MedAgent: LLM Agents for Evidence-Based Medical Diagnosis and Treatment" (2025). https://arxiv.org/abs/2510.00615

### 5.3. Agent Hospital / MedAgent-Zero (Tsinghua)

The **Agent Hospital** project (Tsinghua AIR, 2024-2025) creates a fully autonomous virtual hospital with AI doctors, nurses, and patients powered by LLMs. **MedAgent-Zero** enables self-evolution: AI doctors improve by interacting with patients and reviewing literature.
- 42 AI doctors in 21 medical departments
- Accuracy: 88% examination, 95.6% diagnosis, 77.6% treatment
- Can treat 10,000 patients in days (vs. 2+ years for human doctors)
- Planned public launch via Tairex startup (2025)

> **Source:** Tsinghua AIR. "Agent Hospital" (2024). Healthcare IT News.

### 5.4. MedAgentBoard — Multi-Agent Evaluation Benchmark

**MedAgentBoard** (2025) is a comprehensive benchmark evaluating multi-agent collaboration across 4 task categories: medical (V)QA, lay summary generation, EHR predictive modeling, and clinical workflow automation. Key finding: multi-agent collaboration does not universally outperform advanced single LLMs — specialized conventional methods remain superior for medical VQA and EHR prediction.

> **Source:** Zhu et al. "MedAgentBoard: Benchmarking Multi-Agent Collaboration for Diverse Medical Tasks" (2025). https://arxiv.org/abs/2505.12371

---

## 6. Nutritional and Dietary AI Systems

### 6.1. Yaoshi-RAG — TCM Dietary Recommendations

**Yaoshi-RAG** (2025) is a framework combining Uncertain Knowledge Graphs (UKG) with LLMs for personalized dietary recommendations based on TCM's **Medicine Food Homology (MFH)** principle.

- MFH Knowledge Graph: 24,984 entities, 22 relations, 29,292 triples
- Performance gain: +14.5% Hits@1, +8.7% F1-score with KG augmentation
- Best base LLM: DeepSeek-R1 (84.2% Hits@1, 71.5% F1-score)
- LLM-driven OpenIE for automatic KG construction from heterogeneous sources

> **Source:** "Yaoshi-RAG: Leveraging RAG for Dietary Recommendations with TCM's Medicine Food Homology" (2025). JMIR Med Inform. https://medinform.jmir.org/2025/1/e75279

### 6.2. AI Dietitian for T2DM (China)

An AI-based nutritionist program integrating ChatGPT/GPT-4 with Dino V2 image recognition for Chinese diabetes management:
- ChatGPT passed the **Chinese Registered Dietitian Examination**
- 162/168 (96.4%) favorable reviews from professional dietitians
- Dino V2 achieved F1=0.825 for ingredient-level food recognition
- Deployed as a WeChat mini-program for meal logging and dietary feedback

> **Source:** Sun et al. "An AI Dietitian for Type 2 Diabetes Mellitus Management Based on Large Language and Image Recognition Models" (2023). JMIR. https://www.jmir.org/2023/1/e51300

### 6.3. NutriOrion — Multi-Agent Nutrition Framework

**NutriOrion** (2026) is a hierarchical multi-agent framework for personalized nutrition intervention with a parallel-then-sequential reasoning topology:
- Multi-objective prioritization for conflicting dietary requirements
- Pharmacological contraindications as hard negative constraints
- ADIME standard and FHIR R4 output for clinical interoperability
- Evaluated on 330 stroke patients with multimorbidity
- Results: 12.1% drug-food interaction violation rate, +167% fiber increase, +27% potassium, -9% sodium, -12% sugars

> **Source:** "NutriOrion: A Hierarchical Multi-Agent Framework for Personalized Nutrition Intervention" (2026). https://arxiv.org/abs/2602.18650

### 6.4. HealthGenie — KG+LLM Dietary Guidance

**HealthGenie** (2025) combines LLM-powered conversational interfaces with Knowledge Graph visualizations for personalized dietary recommendations. Supports English and Chinese, evaluated with N=12 within-subject study. Built on GPT-4o mini, DeepSeek-v3, Claude-3.5-Haiku, LLaMA-3.2-90B.

> **Source:** Jiang et al. "HealthGenie: Empowering Users with Dietary Guidance through Knowledge Graph and LLMs" (2025).

---

## 7. Comparative Summary

### LLM Benchmarks (Medical)

| Model | Parameters | Language | Medical Benchmark Performance |
|-------|-----------|----------|-------------------------------|
| Claude Opus 4.6 | — | EN | BioMysteryBench: human-expert level |
| MedGemma 27B | 27B | EN | MedQA, PubMedQA, MMLU-Med — SOTA at scale |
| TxAgent | 8B (agent) | EN | 92.1% drug reasoning, surpasses GPT-4o |
| GigaChat | — | RU | 93% diagnostic accuracy (NEJM cases) |
| GigaPevt | — | RU | RuMedDaNet 93.36% (supra-human) |
| AntAngelMed | 6.1B act. | ZH/EN | #1 HealthBench, MedAIBench, MedBench |
| MedGo | 72B | ZH | #1 CBLUE |
| ShizhenGPT | 7B/32B | ZH | TCM licensing exams SOTA at 7B/32B |

### Agent Frameworks

| Agent | Domain | Architecture | Key Metric |
|-------|--------|-------------|------------|
| TxAgent | Therapeutics | 211 tools + multi-step reasoning | 92.1% accuracy |
| MedAgent-Pro | Multi-modal diagnosis | Hierarchical + RAG + vision tools | +34% over GPT-4o (glaucoma) |
| MedAgent | Diagnosis/Treatment | 4 cooperative agents + MARL | +9.4% MedQA |
| CLARITY | Patient routing | FSM + LLM agents | 96% recall top-3 |
| GigaPevt | General practice | Multimodal + RAG + CoT | Super-human QA accuracy |
| Agent Hospital | Virtual hospital | MedAgent-Zero self-evolution | 95.6% diagnosis accuracy |

---

## 8. Relevance to Healora

For the Healora platform's Russian-market digital twin and nutrition recommendation system, the key takeaways are:

1. **Russian LLM ecosystem is mature enough** for production medical/nutritional deployment — GigaChat (93% diagnostic accuracy) and GigaPevt (supra-human QA) provide viable backends
2. **Multimodal Russian agents** (GigaPevt with video-based vitals, RAG, CoT) map directly to Healora's digital twin architecture
3. **Chinese TCM-nutrition integration** (Yaoshi-RAG, Medicine Food Homology KG) offers a blueprint for combining traditional knowledge with LLM-based dietary planning
4. **TxAgent's ToolUniverse** demonstrates how to structure drug-food interaction checking for personalized nutrition — directly applicable to medication-aware meal planning
5. **MedGemma and AntAngelMed** represent top-tier open-source medical models (4B-27B scales) suitable for fine-tuning on Russian nutritional corpora
6. **NutriOrion's multi-agent architecture** for multi-morbidity dietary planning provides the most direct template for Healora's personalized nutrition intervention engine
7. **RuMedBench** and **MedAgentBoard** provide validated evaluation frameworks for Russian medical NLP tasks

---
