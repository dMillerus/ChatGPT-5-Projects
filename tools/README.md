---
id: 018026cf-5f2b-46e7-b280-b47fc84207eb
title: README
author: Dave
created: '2025-10-05T07:48:10.159Z'
modified: '2025-10-05T07:48:23.821Z'
status: active
linked_docs: []
tags: []
checksum: a8266cb57a1ee898
---
# Front Matter Management Tool

A TypeScript tool for adding standardized YAML front matter to repository files, enabling tracking, linking, and auditing across the knowledge vault.

## Features

- **Automatic Detection**: Identifies existing front matter and preserves unknown fields
- **Consistent Schema**: Standardized YAML structure with UUID, timestamps, and checksums
- **Multi-format Support**: Works with .md, .mdx, .txt, .yml, .yaml, .json, .py, .ts, .tsx, .js, .go, .rs, .sh files
- **Git Integration**: Uses git history for creation and modification dates
- **Checksum Validation**: SHA-256 checksums to track content changes
- **Safety Features**: Dry-run mode, file size limits, gitignore compliance

## YAML Schema

```yaml
---
id: <uuidv4>                # stable per file
title: <filename without extension>
author: <git user.name or "system">
created: <ISO8601 file birth or first commit date>
modified: <ISO8601 last commit date or mtime>
status: draft | active | archived
linked_docs: []             # array of ids or paths
tags: []                    # optional keywords
checksum: <sha256 of body>  # computed over file body only
---
```

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

## Usage

### Basic Commands

```bash
# Dry run (default) - see what would be changed
pnpm tsx tools/frontmatter.ts --dry-run

# Apply changes to files
pnpm tsx tools/frontmatter.ts --apply

# Process large files (>1MB)
pnpm tsx tools/frontmatter.ts --apply --large
```

### Advanced Options

```bash
# Specify root directories
pnpm tsx tools/frontmatter.ts --apply --roots src,docs

# Custom file extensions
pnpm tsx tools/frontmatter.ts --apply --include ".md,.py"

# Custom exclusion patterns
pnpm tsx tools/frontmatter.ts --apply --exclude "dist,**/*.min.js"

# Combined options
pnpm tsx tools/frontmatter.ts --apply --roots src,docs --large --include ".md,.py" --exclude "dist,node_modules"
```

### npm Scripts

```bash
# Dry run
npm run frontmatter:dry-run

# Apply changes
npm run frontmatter:apply

# Run tests
npm run frontmatter:test
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--dry-run` | Show what would be changed without modifying files | `true` |
| `--apply` | Actually apply the changes | `false` |
| `--large` | Process files larger than 1MB | `false` |
| `--roots DIR,...` | Root directories to scan | `.` |
| `--include EXT,...` | File extensions to include | `.md,.mdx,.txt,.yml,.yaml,.json,.py,.ts,.tsx,.js,.go,.rs,.sh` |
| `--exclude PAT,...` | Patterns to exclude | `node_modules,.git,build,dist,*.min.js,*.min.css,*.lock,*.log` |

## Safety Features

- **Dry Run Default**: Always shows what would change before applying
- **File Size Limits**: Skips files >1MB unless `--large` flag is used
- **Gitignore Compliance**: Respects common exclusion patterns
- **Preserve Permissions**: Maintains executable bits on scripts
- **Unknown Field Preservation**: Keeps existing front matter fields not in the schema
- **Content Integrity**: Only updates metadata, never modifies file body content

## Output

The tool provides detailed reporting:

```text
📊 DRY RUN REPORT

Total eligible files: 45
Files with existing front matter: 12
Files without front matter: 33

📁 FILES BY EXTENSION:
  .md: 28 files
    Sample: README.md
  .ts: 8 files
    Sample: tools/frontmatter.ts
  .json: 5 files
    Sample: package.json

📈 PROCESSING SUMMARY:
Extension | Added | Updated | Skipped | Errors
----------|-------|---------|---------|-------
.md       | 25    | 3       | 0       | 0
.ts       | 7     | 1       | 0       | 0
.json     | 3     | 2       | 0       | 0
```

## Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Test specific functionality
npm run frontmatter:test
```

## Workflow Integration

After running the tool, commit the changes:

```bash
# Review changes
git diff

# Commit with suggested message
git commit -m "chore(front-matter): add or update YAML headers repo-wide"
```

## Files Processed

The tool automatically processes eligible files while respecting:

- File extension whitelist
- Gitignore patterns
- Size limitations
- Directory exclusions

**Included by default**: `.md`, `.mdx`, `.txt`, `.yml`, `.yaml`, `.json`, `.py`, `.ts`, `.tsx`, `.js`, `.go`, `.rs`, `.sh`

**Excluded by default**: `node_modules/`, `.git/`, `build/`, `dist/`, `*.min.js`, `*.min.css`, lock files, logs, binaries, images, archives