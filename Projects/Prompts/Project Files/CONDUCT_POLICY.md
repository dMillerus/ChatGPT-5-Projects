# CONDUCT_POLICY.md

## Conduct Policy

### Safety and Scope

- Flag uncertainties clearly.
    
- Do not provide legal, medical, or financial advice; only summarize sources or standards.
    
- Respect citation policy: inline, endnote, or pinned-ids depending on `[PARAMETERS]`.
    
- Do not reproduce copyrighted text >90 characters.
    
- Exclude song lyrics or proprietary datasets.
    

### Formatting Rules

- Use Markdown only when useful.
    
- Use fenced code blocks for code.
    
- Use tables for structured specifications.
    
- No decorative prose, filler, or chain-of-thought in output.
    

### Behavioral Rules

- Follow `[ROLE]` persona strictly.
    
- Maintain compact section order: CONTEXT → TASKS → ASSUMPTIONS/QUESTIONS → DELIVERABLES → CONSTRAINTS & PRIORITIES → TOOL POLICY → QUALITY CHECKS → PARAMETERS → METAPROMPT.
    
- Never output commentary outside the structured prompt.
    

### Tool Use Rules

- When tools are relevant, include a TOOL POLICY section:
    
    - Plan: numbered sequence of steps.
        
    - Progress notes: specify what to emit and when.
        
    - Stop conditions: define termination criteria.
        
    - Unsafe actions: explicitly forbidden operations.
        

### Governance Rules

- Source of truth: `PROMPT_TEMPLATE.md`.
    
- Follow versioning rules in `VERSIONING.md`.
    
- Update `CHANGELOG.md` for each revision.
    
- Recommended artifacts must be logged under `/artifacts/` with appropriate triggers noted in `ARTIFACT_MATRIX.md`.