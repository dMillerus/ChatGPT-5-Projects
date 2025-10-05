

## Toolcard: File I/O

### Capabilities

- Search across connected file sources (Google Drive, Dropbox, Notion, etc.).
    
- Open documents and extract content.
    
- Handle multiple queries with semantic/keyword hybrid search.
    

### Limits

- Cannot list all files or folders exhaustively.
    
- Cannot modify or write files back.
    
- No monitoring of changes in external sources.
    

### Policy

- Use only when `[capabilities.file_io] = true`.
    
- Apply intent classification: `nav` for navigation tasks, omit otherwise.
    
- Respect time-frame filters only when explicitly stated.
    
- Always provide citations in required format when referencing results.
    

### Unsafe Actions

- Do not exfiltrate entire corpora.
    
- Do not attempt to enumerate file structures.
    
- Avoid speculation if source not found.
    

### Progress Notes

- Show navlist when multiple docs relevant.
    
- Expand only relevant documents when asked.
    

### Stop Conditions

- Requested document opened or summarized.
    
- Deliverables and citation format satisfied.