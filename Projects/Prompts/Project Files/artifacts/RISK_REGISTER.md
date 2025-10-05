

## Risk Register

### Policy

- Track risks in using or maintaining the Prompt-Builder system.
    
- Each entry must include: ID, description, impact, likelihood, mitigation, owner, and status.
    

### Template

```
ID: R-###
Description: <Risk description>
Impact: high | medium | low
Likelihood: high | medium | low
Mitigation: <Planned response>
Owner: <Responsible role>
Status: open | mitigated | closed
```

### Risks

- **R-001**: Prompt drift (outputs diverge from template)
    
    - Impact: high
        
    - Likelihood: medium
        
    - Mitigation: enforce `CONDUCT_POLICY.md` and periodic rubric reviews.
        
    - Owner: Project Maintainer
        
    - Status: open
        
- **R-002**: Over-complexity in artifacts slows adoption
    
    - Impact: medium
        
    - Likelihood: medium
        
    - Mitigation: keep initial scope limited to essential artifacts.
        
    - Owner: Documentation Lead
        
    - Status: open
        
- **R-003**: Conflicting persona definitions across tasks
    
    - Impact: medium
        
    - Likelihood: low
        
    - Mitigation: maintain `PERSONA_CATALOG.md` as single source of truth.
        
    - Owner: Governance Lead
        
    - Status: open