

## Toolcard: Web Access

### Capabilities

- Search and retrieve live web data.
    
- Open specific URLs and extract text.
    

### Limits

- Cannot access paywalled or private content.
    
- Query Deserves Freshness (QDF) tuning required for recency.
    
- May return partial or noisy results.
    

### Policy

- Use only when `[capabilities.web_access] = true`.
    
- Always specify recency using `--QDF` parameter.
    
- For factual tasks, require ≥2 independent sources.
    

### Unsafe Actions

- Do not exfiltrate secrets or private data.
    
- Do not crawl indiscriminately.
    
- Avoid reliance on single-source claims.
    

### Progress Notes

- Emit retrieved snippets with citations before synthesis.
    
- Flag contradictions explicitly.
    

### Stop Conditions

- All requested facts gathered with citations.
    
- Success criteria in `[DELIVERABLES]` met.