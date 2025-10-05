---
id: 649303a9-1d8f-4a20-8ee0-f9edc1495549
title: README
author: Dave
created: '2025-10-05T02:13:54-05:00'
modified: '2025-10-05T02:36:32-05:00'
status: active
linked_docs: []
tags: []
checksum: df599244fec68ac0
---
# Personal Knowledge Vault: Multi-LLM Prompt Engineering System

A governed, modular knowledge management system for creating precise prompts across multiple LLMs using structured templates, chain-of-thought scaffolds, and persona alignment. Currently optimized for ChatGPT-5 with planned Anthropic (Claude Sonnet 4) integration.

## 🧠 What This Is

This personal knowledge vault serves as a comprehensive system for prompt engineering, documentation management, and AI interaction workflows. The vault contains:

- **Multi-LLM Integration** - Active ChatGPT-5 support, planned Claude Sonnet 4 integration
- **Structured Templates** - Consistent format across all prompts and models
- **Chain-of-Thought Scaffolds** - 7 reasoning frameworks for clarity
- **Persona Alignment** - Role-based prompt optimization
- **Governance System** - Version control and quality gates
- **Knowledge Archive** - Conversation history and documentation storage
- **Artifact Matrix** - Triggered outputs for complex scenarios

## 📁 Vault Structure

```text
/ChatGPT-5 Projects/               # Personal knowledge vault root
├── .github/
│   └── copilot-instructions.md    # AI agent guidance
├── Projects/
│   ├── Instructions.md            # Core prompt builder system
│   └── Prompts/
│       └── Project Files/         # Prompt engineering framework
│           ├── PROMPT_TEMPLATE.md # Single source of truth
│           ├── CHAIN_SCAFFOLDS.md # Reasoning frameworks
│           ├── PERSONA_CATALOG.md # Role definitions
│           ├── ARTIFACT_MATRIX.md # Output triggers
│           ├── EVAL_RUBRIC.md     # Quality gates
│           ├── CONDUCT_POLICY.md  # Safety & formatting
│           ├── VERSIONING.md      # Change management
│           ├── CHANGELOG.md       # Version history
│           ├── artifacts/         # Generated outputs
│           ├── templates/         # Reusable patterns
│           └── toolcards/         # Tool-specific policies
├── Chat Archive/                  # ChatGPT-5 conversation history
├── Docs/                         # External documentation
└── [Planned: Claude Archive/]     # Future Anthropic integration
```

## 🚀 Quick Start

### For Human Users

1. Open this folder in [Obsidian](https://obsidian.md/)
2. Start with `[[PROMPT_TEMPLATE]]` for structure
3. Select scaffolds from `[[CHAIN_SCAFFOLDS]]` for complex tasks
4. Choose personas from `[[PERSONA_CATALOG]]`
5. Check `[[ARTIFACT_MATRIX]]` for additional outputs needed

### For AI Agents

See `.github/copilot-instructions.md` for comprehensive guidance on working with this system.

Example workflow:

```markdown
"Create a prompt for data analysis using:
1. [[PROMPT_TEMPLATE]] structure
2. Input-Output Chain from [[CHAIN_SCAFFOLDS]]
3. Data Analyst persona from [[PERSONA_CATALOG]]
4. Check [[ARTIFACT_MATRIX]] for required artifacts"
```

## 🎯 Core Principles

- **Single Source of Truth**: `PROMPT_TEMPLATE.md` defines all structure
- **Governance First**: Every change follows versioning and evaluation rules
- **Modular Design**: Mix and match scaffolds, personas, and artifacts
- **Quality Gates**: Mandatory evaluation rubric for major changes
- **Obsidian Native**: Built for knowledge management and graph navigation

## 📊 System Components

### Templates & Scaffolds

- **Intent Chain**: Goal → Reason → Audience → Output Use
- **Input-Output Chain**: Inputs → Transformations → Outputs → Success Criteria
- **Constraint Chain**: Scope → Exclusions → Style → Format → Tool Use
- **Phasing Chain**: Multi-stage workflows
- **Verification Chain**: Source requirements and citations
- **Governance Chain**: Version control and naming
- **Abstraction Chain**: Concept → System → Component → Task

### Personas

Engineering, Research, Writing, Product, and Specialized domain experts with specific prompt optimization patterns.

### Artifacts

Auto-generated when conditions are met: Problem Briefs, Style Guides, Evaluation Rubrics, Toolcards, and more.

## 🔄 Contribution Workflow

1. **PATCH**: Fixes and clarifications (increment patch version)
2. **MINOR**: New personas, scaffolds, artifacts (backward-compatible)
3. **MAJOR**: Breaking changes to structure or governance
4. **Quality Gate**: All MAJOR/MINOR changes must pass `EVAL_RUBRIC.md`
5. **Documentation**: Update `CHANGELOG.md` for every change

## 🛠 LLM Integration & Tools

### Current Integration

- **ChatGPT-5** (active) - Full prompt execution and conversation archival
- **Obsidian** (primary interface) - Knowledge management and graph navigation
- **GitHub Copilot** (AI agent integration) - Repository-aware assistance

### Planned Integration

- **Claude Sonnet 4** (pending) - Mirror ChatGPT-5 directory structure and governance
- **Cross-LLM Workflows** - Unified prompt templates across models

### Compatibility

- **Any LLM** supporting structured prompts and tool policies
- **Multi-model Evaluation** - Comparative prompt performance tracking

## 📋 License

This repository is public to support the prompt engineering community. See individual files for specific licensing terms.

## 🤝 Contributing

1. Fork the repository
2. Follow the versioning guidelines in `VERSIONING.md`
3. Ensure changes pass the evaluation rubric
4. Update changelog with rationale and impact
5. Submit pull request with clear description

---

**Note**: This is a personal Obsidian knowledge vault with active ChatGPT-5 integration and planned Anthropic support. Clone and open in Obsidian for the full experience including graph navigation, wikilinks, conversation archives, and cross-LLM prompt management.
