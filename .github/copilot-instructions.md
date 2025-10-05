# Copilot Instructions for Prompt-Builder Project

## Project Overview
This is a governed, modular system for creating precise, GPT-5-ready prompts using structured templates, chain-of-thought scaffolds, and persona alignment. The project follows strict governance rules with semantic versioning and mandatory evaluation criteria.

**⚠️ Obsidian Vault**: This is an Obsidian knowledge vault. Preserve all Obsidian functionality including:
- Wikilink syntax `[[filename]]` for internal references
- Markdown frontmatter and metadata
- Folder structure for graph navigation
- Tag systems and backlink relationships

## Architecture & Key Components

### Core Template System
- **`PROMPT_TEMPLATE.md`** is the single source of truth for all prompt structure
- All prompts follow the exact section order: CONTEXT → TASKS → ASSUMPTIONS/QUESTIONS → DELIVERABLES → CONSTRAINTS & PRIORITIES → TOOL POLICY → QUALITY CHECKS → PARAMETERS → METAPROMPT
- Never deviate from this structure or add commentary outside these sections

### Scaffold System (`CHAIN_SCAFFOLDS.md`)
Use scaffolds to increase clarity for complex tasks:
- **Intent Chain**: Goal → Reason → Audience → Output Use
- **Input-Output Chain**: Inputs → Transformations → Outputs → Success Criteria
- **Constraint Chain**: Scope → Exclusions → Style → Format → Tool Use
- **Phasing Chain**: Multi-stage workflows
- **Verification Chain**: Source requirements and citation policies
- **Governance Chain**: Version control and naming conventions
- **Abstraction Chain**: Concept → System → Component → Task

### Persona System (`PERSONA_CATALOG.md`)
- Always select ONE primary persona aligned to final deliverable
- Add secondary personas only for domain overlap
- Reference persona explicitly in `[ROLE]` section
- Key personas: Senior SWE + Tool-caller, Research Agent, Technical Editor, Prompt Engineer

## Critical Workflows

### Artifact Generation (`ARTIFACT_MATRIX.md`)
Artifacts are triggered by specific conditions:
- **Problem Brief**: Vague input or unclear deliverables
- **Persona Card**: Role ambiguity or cross-domain work
- **Style Guide**: Consistency needs across writers
- **Evaluation Rubric**: High-stakes outputs or multi-reviewer alignment
- **Toolcard**: Complex API/tool use with error handling

### Quality Assurance (`EVAL_RUBRIC.md`)
Every MAJOR/MINOR update must pass ALL rubric criteria:
- Role alignment with persona catalog
- Complete context including goals, audience, constraints, resources
- Actionable, scoped tasks aligned to scaffolds
- Explicit deliverables with correct formats
- Tool policy (if relevant) with plan, stop conditions, unsafe actions
- Parameters: reasoning_effort, verbosity, agentic_mode, citation_policy

### Version Control (`VERSIONING.md`)
- **MAJOR**: Breaking structure changes
- **MINOR**: New personas, scaffolds, or artifacts (backward-compatible)
- **PATCH**: Fixes, clarifications, documentation-only
- Update `CHANGELOG.md` for every change
- Files use UPPERCASE.md naming (e.g., `PROMPT_TEMPLATE.md`)
- Artifacts stored under `/artifacts/` or `/templates/` with lowercase names

## Project-Specific Conventions

### Governance Rules (`CONDUCT_POLICY.md`)
- Use Markdown only when useful, fenced code blocks for code
- No decorative prose, filler, or chain-of-thought in outputs
- Follow citation policy strictly: inline, endnote, or pinned-ids
- Flag uncertainties clearly; no legal/medical/financial advice
- Respect copyright limits (>90 characters)

### File Organization (Obsidian Vault Structure)
```
/Projects/Prompts/Project Files/
├── Core files (UPPERCASE.md) - Use [[wikilinks]] for references
├── /artifacts/ (triggered outputs)
├── /templates/ (reusable patterns)
└── /toolcards/ (tool-specific policies)

/Chat Archive/ - Conversation history
/Docs/ - External documentation
```

**Obsidian Conventions:**
- Use `[[PROMPT_TEMPLATE]]` instead of `PROMPT_TEMPLATE.md` for internal links
- Maintain folder structure for vault graph visualization
- Preserve any existing tags, aliases, or metadata

## Integration Patterns

### Template Usage Flow
1. Start with `PROMPT_TEMPLATE.md` structure
2. Select scaffolds from `CHAIN_SCAFFOLDS.md` for complex tasks
3. Choose persona from `PERSONA_CATALOG.md`
4. Check `ARTIFACT_MATRIX.md` for triggered artifacts
5. Apply `CONDUCT_POLICY.md` behavioral rules
6. Validate with `EVAL_RUBRIC.md` before finalization

### Tool Policy Integration
When tools are relevant, always include TOOL POLICY section with:
- Plan: numbered sequence of steps
- Progress notes: specify what to emit and when
- Stop conditions: define termination criteria
- Unsafe actions: explicitly forbidden operations

## Efficient AI Agent Interaction Examples

### Creating a New Prompt
```markdown
"Create a prompt for [task] using:
1. [[PROMPT_TEMPLATE]] structure
2. Intent Chain from [[CHAIN_SCAFFOLDS]] 
3. Research Agent persona from [[PERSONA_CATALOG]]
4. Check [[ARTIFACT_MATRIX]] for required artifacts"
```

### Validating Existing Prompts
```markdown
"Review [prompt-file] against [[EVAL_RUBRIC]] criteria:
- Check role alignment with [[PERSONA_CATALOG]]
- Verify all required sections from [[PROMPT_TEMPLATE]]
- Validate against [[CONDUCT_POLICY]] rules"
```

### Adding New Components
```markdown
"Add new persona to [[PERSONA_CATALOG]]:
- Follow existing format patterns
- Update [[CHANGELOG]] with MINOR version bump per [[VERSIONING]]
- Trigger evaluation per [[EVAL_RUBRIC]]"
```

### Generating Artifacts
```markdown
"Based on [[ARTIFACT_MATRIX]], generate:
- Problem Brief for vague requirements
- Style Guide for consistency needs
- Store in /artifacts/ with lowercase naming per [[VERSIONING]]"
```

## Key Files to Reference
- `[[PROMPT_TEMPLATE]]`: Core structure template
- `[[CHAIN_SCAFFOLDS]]`: 7 scaffold types for clarity
- `[[PERSONA_CATALOG]]`: Role alignment options
- `[[ARTIFACT_MATRIX]]`: Trigger conditions for additional outputs
- `[[EVAL_RUBRIC]]`: Quality gate criteria
- `[[CONDUCT_POLICY]]`: Safety and formatting rules