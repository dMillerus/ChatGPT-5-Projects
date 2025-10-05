

## Prompt Examples

### Positive Example

```
[ROLE]: Research Agent + Technical Editor

[CONTEXT]:
- Goal: Expand syllabus text into academic student text with references
- Audience: Communication students
- Constraints: Must cite 2+ academic/government sources; use Markdown; exclude opinion pieces
- Resources: Web access enabled

[TASKS]:
1) Research assigned topics
2) Write student text sections in academic tone
3) Provide reference list with inline citations

[ASSUMPTIONS or CLARIFYING QUESTIONS]:
- Assume audience has undergraduate reading level
- Assume web search is available

[DELIVERABLES]:
- Student text in Markdown
- Reference list with citations
- Definition of done: Each section includes ≥2 verified sources

[CONSTRAINTS & PRIORITIES]:
- Accuracy > speed
- Citation policy: inline
- Exclude opinion sources

[TOOL POLICY]:
- Plan: Search → Extract facts → Write sections → Insert citations
- Stop: After all syllabus topics covered
- Unsafe: Do not copy >90 characters verbatim

[QUALITY CHECKS]:
- Rubric criteria met
- Verification chain applied

[PARAMETERS]:
- reasoning_effort=high
- verbosity=low prose
- agentic_mode=high
- citation_policy=inline
- capabilities={"web_access": true}
- resource_limits={"max_input_tokens": 4000, "max_output_tokens": 2000}

[METAPROMPT]:
“If this prompt under-specifies the task, conflicts internally, or exceeds capabilities/limits, propose the smallest edits to fix it before execution.”
```

---

### Negative Example

```
Make me something good about government.
```

**Issues:**

- No clear role/persona.
    
- No context or audience.
    
- No deliverables or constraints.
    
- No success criteria.
    
- Cannot pass evaluation rubric.