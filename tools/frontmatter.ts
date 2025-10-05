#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import * as yaml from 'js-yaml';

interface FrontMatter {
  id: string;
  title: string;
  author: string;
  created: string;
  modified: string;
  status: 'draft' | 'active' | 'archived';
  linked_docs: string[];
  tags: string[];
  checksum: string;
  [key: string]: any; // Allow unknown fields
}

interface ProcessingStats {
  added: number;
  updated: number;
  skipped: number;
  errors: number;
}

interface FileInfo {
  path: string;
  extension: string;
  size: number;
  hasFrontMatter: boolean;
  frontMatter?: Partial<FrontMatter>;
  body: string;
}

class FrontMatterProcessor {
  private readonly SUPPORTED_EXTENSIONS = ['.md', '.mdx', '.txt', '.yml', '.yaml', '.json', '.py', '.ts', '.tsx', '.js', '.go', '.rs', '.sh'];
  private readonly EXCLUDED_PATTERNS = ['node_modules', '.git', 'build', 'dist', '*.min.js', '*.min.css', '*.lock', '*.log'];
  private readonly MAX_FILE_SIZE = 1024 * 1024; // 1MB
  
  private options: {
    dryRun: boolean;
    allowLarge: boolean;
    roots: string[];
    include: string[];
    exclude: string[];
  };

  private stats: Map<string, ProcessingStats> = new Map();
  private gitUser: string;

  constructor(options: any) {
    this.options = {
      dryRun: options.dryRun || false,
      allowLarge: options.large || false,
      roots: options.roots || ['.'],
      include: options.include || this.SUPPORTED_EXTENSIONS,
      exclude: options.exclude || this.EXCLUDED_PATTERNS,
    };

    // Get git user
    try {
      this.gitUser = execSync('git config user.name', { encoding: 'utf-8' }).trim();
    } catch {
      this.gitUser = 'system';
    }

    // Initialize stats for all extensions
    this.SUPPORTED_EXTENSIONS.forEach(ext => {
      this.stats.set(ext, { added: 0, updated: 0, skipped: 0, errors: 0 });
    });
  }

  private shouldIncludeFile(filePath: string): boolean {
    const relativePath = path.relative(process.cwd(), filePath);
    const extension = path.extname(filePath);
    
    // Check if extension is supported
    if (!this.options.include.includes(extension)) {
      return false;
    }

    // Check exclusion patterns
    for (const pattern of this.options.exclude) {
      if (relativePath.includes(pattern) || filePath.includes(pattern)) {
        return false;
      }
    }

    // Check .gitignore patterns (simplified)
    if (relativePath.includes('node_modules') || 
        relativePath.includes('.git/') ||
        relativePath.includes('dist/') ||
        relativePath.includes('build/')) {
      return false;
    }

    return true;
  }

  private getAllFiles(rootPaths: string[]): string[] {
    const allFiles: string[] = [];
    
    const walkDir = (dir: string) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            // Skip hidden directories and common build directories
            if (!entry.name.startsWith('.') || entry.name === '.github') {
              walkDir(fullPath);
            }
          } else if (entry.isFile()) {
            if (this.shouldIncludeFile(fullPath)) {
              allFiles.push(fullPath);
            }
          }
        }
      } catch (error) {
        console.warn(`Warning: Cannot read directory ${dir}: ${error}`);
      }
    };

    for (const rootPath of rootPaths) {
      const resolvedPath = path.resolve(rootPath);
      if (fs.existsSync(resolvedPath)) {
        if (fs.statSync(resolvedPath).isDirectory()) {
          walkDir(resolvedPath);
        } else if (this.shouldIncludeFile(resolvedPath)) {
          allFiles.push(resolvedPath);
        }
      }
    }

    return allFiles;
  }

  private getFileStats(filePath: string): { created: string; modified: string } {
    try {
      // Try to get git dates first
      const gitCreated = execSync(
        `git log --follow --format=%aI --reverse "${filePath}" | head -1`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
      ).trim();
      
      const gitModified = execSync(
        `git log -1 --format=%aI "${filePath}"`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
      ).trim();

      if (gitCreated && gitModified) {
        return {
          created: gitCreated,
          modified: gitModified
        };
      }
    } catch {
      // Fall back to filesystem times
    }

    const stats = fs.statSync(filePath);
    return {
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString()
    };
  }

  private extractFrontMatter(content: string): { frontMatter: Partial<FrontMatter> | null; body: string } {
    const lines = content.split('\n');
    
    // Check if file starts with front matter
    if (lines[0]?.trim() !== '---') {
      return { frontMatter: null, body: content };
    }

    // Find the closing ---
    let endIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === '---') {
        endIndex = i;
        break;
      }
    }

    if (endIndex === -1) {
      return { frontMatter: null, body: content };
    }

    const yamlContent = lines.slice(1, endIndex).join('\n');
    const body = lines.slice(endIndex + 1).join('\n');

    try {
      const frontMatter = yaml.load(yamlContent) as Partial<FrontMatter>;
      return { frontMatter, body };
    } catch {
      return { frontMatter: null, body: content };
    }
  }

  private computeChecksum(content: string): string {
    return crypto.createHash('sha256').update(content, 'utf-8').digest('hex').substring(0, 16);
  }

  private analyzeFile(filePath: string): FileInfo | null {
    try {
      const stats = fs.statSync(filePath);
      
      // Check file size
      if (stats.size > this.MAX_FILE_SIZE && !this.options.allowLarge) {
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontMatter, body } = this.extractFrontMatter(content);
      
      return {
        path: filePath,
        extension: path.extname(filePath),
        size: stats.size,
        hasFrontMatter: frontMatter !== null,
        frontMatter,
        body
      };
    } catch (error) {
      console.warn(`Warning: Cannot analyze file ${filePath}: ${error}`);
      return null;
    }
  }

  private generateFrontMatter(fileInfo: FileInfo): FrontMatter {
    const { created, modified } = this.getFileStats(fileInfo.path);
    const filename = path.basename(fileInfo.path, fileInfo.extension);
    const checksum = this.computeChecksum(fileInfo.body);

    const baseFrontMatter: FrontMatter = {
      id: uuidv4(),
      title: filename,
      author: this.gitUser,
      created,
      modified,
      status: 'active',
      linked_docs: [],
      tags: [],
      checksum
    };

    // Merge with existing front matter if present
    if (fileInfo.frontMatter) {
      return {
        ...baseFrontMatter,
        ...fileInfo.frontMatter,
        // Always update these fields
        checksum,
        modified,
        // Preserve id if it exists
        id: fileInfo.frontMatter.id || baseFrontMatter.id
      };
    }

    return baseFrontMatter;
  }

  private serializeFrontMatter(frontMatter: FrontMatter): string {
    const yamlContent = yaml.dump(frontMatter, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    });
    
    return `---\n${yamlContent}---\n`;
  }

  private processFile(fileInfo: FileInfo): boolean {
    const extension = fileInfo.extension;
    const stats = this.stats.get(extension)!;

    try {
      const frontMatter = this.generateFrontMatter(fileInfo);
      const frontMatterYaml = this.serializeFrontMatter(frontMatter);
      const newContent = frontMatterYaml + fileInfo.body;

      if (!this.options.dryRun) {
        // Preserve executable bit
        const oldStats = fs.statSync(fileInfo.path);
        fs.writeFileSync(fileInfo.path, newContent, 'utf-8');
        fs.chmodSync(fileInfo.path, oldStats.mode);
      }

      if (fileInfo.hasFrontMatter) {
        stats.updated++;
      } else {
        stats.added++;
      }

      return true;
    } catch (error) {
      console.error(`Error processing ${fileInfo.path}: ${error}`);
      stats.errors++;
      return false;
    }
  }

  public async run(): Promise<void> {
    console.log('🔍 Scanning repository for eligible files...\n');
    
    const allFiles = this.getAllFiles(this.options.roots);
    const eligibleFiles: FileInfo[] = [];

    // Analyze all files
    for (const filePath of allFiles) {
      const fileInfo = this.analyzeFile(filePath);
      if (fileInfo) {
        eligibleFiles.push(fileInfo);
      }
    }

    // Dry run report
    console.log('📊 DRY RUN REPORT\n');
    console.log(`Total eligible files: ${eligibleFiles.length}`);
    console.log(`Files with existing front matter: ${eligibleFiles.filter(f => f.hasFrontMatter).length}`);
    console.log(`Files without front matter: ${eligibleFiles.filter(f => !f.hasFrontMatter).length}\n`);

    // Group by extension
    const byExtension = new Map<string, FileInfo[]>();
    eligibleFiles.forEach(file => {
      const ext = file.extension;
      if (!byExtension.has(ext)) {
        byExtension.set(ext, []);
      }
      byExtension.get(ext)!.push(file);
    });

    console.log('📁 FILES BY EXTENSION:');
    for (const [ext, files] of byExtension) {
      console.log(`  ${ext}: ${files.length} files`);
      if (files.length > 0) {
        console.log(`    Sample: ${path.relative(process.cwd(), files[0].path)}`);
      }
    }
    console.log();

    // Detect anomalies
    const largeFiles = eligibleFiles.filter(f => f.size > this.MAX_FILE_SIZE);
    if (largeFiles.length > 0) {
      console.log('⚠️  LARGE FILES DETECTED (>1MB):');
      largeFiles.forEach(f => {
        console.log(`    ${path.relative(process.cwd(), f.path)} (${Math.round(f.size / 1024)}KB)`);
      });
      console.log();
    }

    if (this.options.dryRun) {
      console.log('🚫 DRY RUN MODE - No files will be modified');
      console.log('📝 To apply changes, run with --apply flag\n');
      return;
    }

    // Apply changes
    console.log('🔄 Applying front matter to files...\n');
    
    let processed = 0;
    for (const fileInfo of eligibleFiles) {
      this.processFile(fileInfo);
      processed++;
      
      if (processed % 10 === 0) {
        console.log(`Processed ${processed}/${eligibleFiles.length} files...`);
      }
    }

    // Summary table
    console.log('\n📈 PROCESSING SUMMARY:');
    console.log('Extension | Added | Updated | Skipped | Errors');
    console.log('----------|-------|---------|---------|-------');
    
    for (const [ext, stats] of this.stats) {
      if (stats.added + stats.updated + stats.skipped + stats.errors > 0) {
        console.log(`${ext.padEnd(9)} | ${stats.added.toString().padEnd(5)} | ${stats.updated.toString().padEnd(7)} | ${stats.skipped.toString().padEnd(7)} | ${stats.errors}`);
      }
    }

    console.log('\n✅ Front matter processing complete!');
    console.log('💡 Suggested next steps:');
    console.log('   - Review changes with: git diff');
    console.log('   - Commit with: git commit -m "chore(front-matter): add or update YAML headers repo-wide"');
  }
}

// CLI handling
function parseArgs(): any {
  const args = process.argv.slice(2);
  const options: any = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--apply') {
      options.dryRun = false;
    } else if (arg === '--large') {
      options.large = true;
    } else if (arg === '--roots') {
      options.roots = args[++i]?.split(',') || ['.'];
    } else if (arg === '--include') {
      options.include = args[++i]?.split(',') || [];
    } else if (arg === '--exclude') {
      options.exclude = args[++i]?.split(',') || [];
    }
  }
  
  // Default to dry run if no explicit flag
  if (options.dryRun === undefined) {
    options.dryRun = true;
  }
  
  return options;
}

function showUsage(): void {
  console.log(`
📝 Front Matter Management Tool

USAGE:
  pnpm tsx tools/frontmatter.ts [OPTIONS]

OPTIONS:
  --dry-run          Show what would be changed (default)
  --apply           Actually apply the changes
  --large           Process files larger than 1MB
  --roots DIR,...   Root directories to scan (default: .)
  --include EXT,... File extensions to include (default: .md,.py,etc)
  --exclude PAT,... Patterns to exclude (default: node_modules,dist,etc)

EXAMPLES:
  pnpm tsx tools/frontmatter.ts --dry-run
  pnpm tsx tools/frontmatter.ts --apply
  pnpm tsx tools/frontmatter.ts --apply --roots src,docs --large
  pnpm tsx tools/frontmatter.ts --apply --include ".md,.py" --exclude "dist,**/*.min.js"
`);
}

// Main execution
async function main(): Promise<void> {
  const args = parseArgs();
  
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showUsage();
    return;
  }

  const processor = new FrontMatterProcessor(args);
  await processor.run();
}

if (require.main === module) {
  main().catch(console.error);
}

export { FrontMatterProcessor, FrontMatter };