

## Evaluation Rubric

### Purpose

Ensure all structured prompts and supporting artifacts meet quality, consistency, and governance standards before acceptance.

### Criteria

|Dimension|Standard|Pass/Fail|
|---|---|---|
|**Role Alignment**|`[ROLE]` matches task domain and persona catalog.||
|**Context Clarity**|`[CONTEXT]` includes goals, audience, constraints, and resources.||
|**Task Definition**|`[TASKS]` are actionable, scoped, and aligned to scaffold(s).||
|**Assumptions/Questions**|Present, relevant, and consistent with agentic_mode.||
|**Deliverables**|Explicit, correct formats, includes triggered artifacts.||
|**Constraints & Priorities**|Clear tradeoff rules, exclusions, and style policies.||
|**Tool Policy**|Present if tools relevant; includes plan, stop conditions, unsafe actions.||
|**Quality Checks**|Verification chain, edge cases, acceptance tests included.||
|**Parameters**|All required (reasoning_effort, verbosity, agentic_mode, etc.).||
|**Metaprompt**|Present and correctly phrased.||

### Review Process

1. Reviewer checks prompt against rubric table.
    
2. Mark each criterion Pass/Fail.
    
3. If any Fail, revise before merge.
    
4. Record result in `CHANGELOG.md` with rubric outcome.
    

### Notes

- This rubric is mandatory for MAJOR and MINOR updates.
    
- Optional for PATCH updates if changes are trivial formatting or typo fixes.