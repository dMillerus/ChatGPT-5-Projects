

## Structured Prompt Template

---

[CONTEXT]:

- <Known constraints, resources, and capabilities (web/code/file/image/audio)>
    
- <Model/tool limits and resource budgets>
    
- <Scaffold summary: Intent/Input-Output/Constraint/Phasing/Verification/Governance/Abstraction as provided>
    

[TASKS]:

2. <Secondary tasks, if any>
    

- <If Phasing Chain provided, mirror phases here>
    

[ASSUMPTIONS or CLARIFYING QUESTIONS]:

- <If agentic_mode∈{medium,high}: 3–6 explicit assumptions tied to capabilities/limits and scaffold gaps>
    
- <If agentic_mode=low: 2–4 targeted questions that unblock execution>
    

[DELIVERABLES]:

- <Exact outputs, formats, filenames, schemas, API endpoints, or artifacts>
    

[CONSTRAINTS & PRIORITIES]:

- <Latency, cost, performance, safety, citation policy, style guides, domain rules>
    

[TOOL POLICY] (include only if tools are relevant)

- Plan: <numbered steps the agent/tool should follow>
    
- Progress notes:
    
- Stop conditions:
    
- Unsafe actions to avoid:
    

[QUALITY CHECKS]:

- <Acceptance tests/rubric bullets>
    
- <Verification Chain: sources, citation style, contradiction handling, revision rule>
    

[PARAMETERS]:

- reasoning_effort=<minimal|medium|high>
    
- verbosity=<low prose; high in code blocks>
    
- agentic_mode=<low|medium|high>
    
- citation_policy=<none|inline|endnote|pinned-ids>
    
- capabilities=
    
- resource_limits=<json with token/time/cost budgets>
    

## [METAPROMPT]:  
“If this prompt under-specifies the task, conflicts internally, or exceeds capabilities/limits, propose the smallest edits to fix it before execution.”