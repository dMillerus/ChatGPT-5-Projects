

## Artifact Recommendation Matrix

Artifacts extend the structured prompt when triggers are met. Use this matrix to decide what to generate.

### Matrix

|Artifact|Trigger Conditions|
|---|---|
|**Problem Brief**|Input vague, multiple stakeholders, safety/compliance issues, or unclear deliverables|
|**Persona Card**|Tone/role ambiguous, cross-domain work, recurring engagement|
|**Style Guide**|Consistency needed across writers, brand enforcement, or repeated writing tasks|
|**Toolcard**|API/SDK/tool use expected, limits/costs unknown, or error handling is complex|
|**Domain Glossary**|Acronyms/jargon present, regulated terms, or misinterpretation risk|
|**Positive/Negative Examples**|Quality bar unclear, new format introduced, or calibration required|
|**Evaluation Rubric**|Review workflow, high-stakes outputs, or multi-reviewer alignment|
|**Eval Dataset**|Prompt reuse, regression testing, or CI gating required|
|**Retrieval Config**|RAG or long references used, context windows tight, or citation policy matters|
|**Constraints/Compliance Doc**|PII/IP/legal constraints or industry regulation in scope|
|**Templates (YAML/MD)**|Patterns recur across tasks; enforce structure and speed|
|**Change Log**|Prompts will evolve or multiple contributors involved|
|**Repo Layout Scaffold**|New project starts or artifacts stored/versioned|
|**Assumptions Log**|Significant assumptions made or clarified|
|**Risk Register**|High-stakes decisions, failure modes, or compliance exposure|

---

## Policy

- When a trigger condition is met, include the artifact by name in the `[DELIVERABLES]` section of the structured prompt.
    
- Artifacts should be stored under `/artifacts/` or `/templates/` as appropriate.
    
- All artifacts must be version-controlled and updated per `VERSIONING.md` rules.