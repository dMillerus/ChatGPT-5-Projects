

# Prompt-Builder Project

A governed, modular system for creating precise, GPT-5–ready prompts using structured templates, chain-of-thought scaffolds, and persona alignment.

---

## Structure

```
/prompt-builder/
  README.md
  PROMPT_TEMPLATE.md
  CHAIN_SCAFFOLDS.md
  PERSONA_CATALOG.md
  ARTIFACT_MATRIX.md
  CONDUCT_POLICY.md
  VERSIONING.md
  CHANGELOG.md
  /artifacts/
    ASSUMPTIONS_LOG.md
    RISK_REGISTER.md
    EVAL_RUBRIC.md
    EXAMPLES.md
  /toolcards/
    web.md
    code_exec.md
    file_io.md
    image_gen.md
  /templates/
    problem_brief.md
    persona_card.md
    style_guide.md
```

---

## Usage

- Start with **PROMPT_TEMPLATE.md** as the single source of truth.
    
- Add scaffolds from **CHAIN_SCAFFOLDS.md** when precision is needed.
    
- Select personas from **PERSONA_CATALOG.md**.
    
- Use **ARTIFACT_MATRIX.md** to determine extra artifacts.
    
- Apply governance rules from **CONDUCT_POLICY.md** and **VERSIONING.md**.
    
- Record updates in **CHANGELOG.md**.
    

---

## Artifacts

- **ASSUMPTIONS_LOG.md** – all explicit assumptions.
    
- **RISK_REGISTER.md** – risks and mitigations.
    
- **EVAL_RUBRIC.md** – quality gate for acceptance.
    
- **EXAMPLES.md** – positive and negative sample prompts.
    

---

## Toolcards

- **web.md** – web search policy.
    
- **code_exec.md** – code execution sandbox.
    
- **file_io.md** – file source search.
    
- **image_gen.md** – image generation rules.
    

---

## Templates

- **problem_brief.md** – summarize vague input.
    
- **persona_card.md** – define persona use.
    
- **style_guide.md** – enforce consistency.
    

---

## Governance

- Always use `PROMPT_TEMPLATE.md` as source of truth.
    
- Versioning follows **VERSIONING.md** (semver).
    
- Each change logged in **CHANGELOG.md**.
    
- Evaluate updates with **EVAL_RUBRIC.md**.
    

---

## Definition of Done

- Structured prompt generated with all required sections.
    
- Artifacts created when triggered.
    
- Rubric passed and changelog updated.
    
- Repo remains modular, consistent, and auditable.