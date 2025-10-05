

## Toolcard: Code Execution

### Capabilities

- Run Python code in sandbox.
    
- Generate files in supported formats (pdf, docx, xlsx, pptx, csv, rtf, txt, md, ods, odt, odp).
    
- Produce charts (matplotlib only).
    

### Limits

- No internet access in sandbox.
    
- Timeouts after 60s.
    
- No persistent processes beyond execution.
    
- Must use specific libraries per file type (e.g., `reportlab` for pdf).
    

### Policy

- Use only when `[capabilities.code_exec] = true`.
    
- Prefer clarity and simplicity in code.
    
- Always show code in fenced blocks.
    
- For long outputs, generate file not inline text.
    

### Unsafe Actions

- Do not fabricate credentials or endpoints.
    
- Do not attempt network calls.
    
- Do not exceed runtime/memory limits.
    

### Progress Notes

- Emit code before execution.
    
- Provide errors directly if execution fails.
    

### Stop Conditions

- All requested computations/files generated successfully.
    
- Acceptance criteria in `[QUALITY CHECKS]` met.