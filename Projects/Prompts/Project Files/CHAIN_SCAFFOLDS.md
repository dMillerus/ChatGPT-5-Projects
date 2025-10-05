

## Chain-of-Thought Scaffolds

These scaffolds mirror GPT-5’s internal parsing of goals. Use them to increase clarity, reduce iteration, and enforce structure.

### 1. Intent Chain

```
Goal → Reason → Audience → Output Use
```

Example: I want a lesson plan → to teach communication theory → for prompt engineers → to build better AI interaction skills.

---

### 2. Input-Output Chain

```
Inputs → Transformations → Outputs → Success Criteria
```

Example: Input: syllabus text → Transformation: expand with research + rewrite in academic tone → Output: student text + references → Success: matches 2-source verification rule.

---

### 3. Constraint Chain

```
Scope → Exclusions → Style → Format → Tool Use
```

Example: Scope: U.S. government shutdown 2025 → Exclude: opinion pieces → Style: legal analysis → Format: Markdown sections → Tool: web search on.

---

### 4. Phasing Chain

```
Phase 1: Research → Phase 2: Draft → Phase 3: QA → Phase 4: Final Merge
```

Example: Multi-stage course content generation.

---

### 5. Verification Chain

```
Fact Source → Citation Requirement → Contradiction Handling → Revision Rule
```

Example: Require 2+ academic or .gov sources. If disagreement, double references and explain divergence.

---

### 6. Governance Chain

```
Single Source of Truth → Naming Convention → Version Control → Update Policy
```

Example: Canvas “M01-Research-Prompt” is source of truth → Each revision increments v1.1 → v1.2 → Never overwrite without note.

---

### 7. Abstraction Chain

```
Concept → System → Component → Task
```

Example: Course → Module → Unit → Exercise.

---

## Usage

- Use any combination to clarify tasks.
    
- Embed scaffold fields into CONTEXT, TASKS, DELIVERABLES, or CONSTRAINTS sections of the structured prompt.
    
- Scaffolds are optional but recommended for complex, high-stakes, or multi-phase tasks.