

## Versioning Policy

### Semver Scheme

- **MAJOR**: Breaking changes to structure or governance (e.g., prompt template redesign).
    
- **MINOR**: Additions or enhancements that remain backward-compatible (e.g., new persona, scaffold, or artifact).
    
- **PATCH**: Fixes, clarifications, or documentation-only updates.
    

### Naming Convention

- Files: Uppercase with `.md` (e.g., `PROMPT_TEMPLATE.md`).
    
- Canvases: Title-case with spaces (e.g., `Prompt Template`).
    
- Artifacts: Store under `/artifacts/` or `/templates/` with lowercase names.
    

### Update Policy

1. Each update must increment version in `CHANGELOG.md`.
    
2. Edits must include rationale and impact.
    
3. For MAJOR changes, review rubric in `EVAL_RUBRIC.md` must pass before merge.
    
4. All assumptions clarified during update must be logged in `ASSUMPTIONS_LOG.md`.
    

### Change Process

- **Author** creates PR with changes.
    
- **Reviewer** applies rubric checks.
    
- **Approver** merges once criteria met.
    
- Update applied to all relevant docs.
    

### Persistence

- Never overwrite without version bump.
    
- Maintain `CHANGELOG.md` as chronological single source of truth.
    
- Archive deprecated versions under `/archive/` if necessary.