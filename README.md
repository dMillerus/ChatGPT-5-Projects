# Prompt-Builder: GPT-5 Ready Prompt Engineering System

A governed, modular system for creating precise, GPT-5-ready prompts using structured templates, chain-of-thought scaffolds, and persona alignment.

## 🧠 What This Is

This Obsidian vault contains a comprehensive framework for building high-quality prompts with:

- **Structured Templates** - Consistent format across all prompts
- **Chain-of-Thought Scaffolds** - 7 reasoning frameworks for clarity
- **Persona Alignment** - Role-based prompt optimization
- **Governance System** - Version control and quality gates
- **Artifact Matrix** - Triggered outputs for complex scenarios

## 📁 Repository Structure

```text
/ChatGPT-5 Projects/
├── .github/
│   └── copilot-instructions.md    # AI agent guidance
├── Projects/
│   └── Prompts/
│       └── Project Files/         # Core prompt engineering system
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
├── Chat Archive/                  # Conversation history
└── Docs/                         # External documentation
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

## 🛠 Tools & Integration

Built for use with:

- **Obsidian** (primary interface)
- **GitHub Copilot** (AI agent integration)
- **ChatGPT/Claude** (prompt execution)
- **Any LLM** supporting structured prompts

## 📋 License

This repository is public to support the prompt engineering community. See individual files for specific licensing terms.

## 🤝 Contributing

1. Fork the repository
2. Follow the versioning guidelines in `VERSIONING.md`
3. Ensure changes pass the evaluation rubric
4. Update changelog with rationale and impact
5. Submit pull request with clear description

---

**Note**: This is an Obsidian vault. Clone and open in Obsidian for the full experience including graph navigation, wikilinks, and knowledge management features.
