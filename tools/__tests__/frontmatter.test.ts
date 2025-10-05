import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { FrontMatterProcessor, FrontMatter } from '../frontmatter';
import * as yaml from 'js-yaml';

describe('FrontMatterProcessor', () => {
  const testDir = path.join(__dirname, 'test-files');
  
  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('Front matter detection', () => {
    test('detects existing front matter', () => {
      const content = `---
id: test-123
title: Test File
author: Dave
---

# Test Content
This is a test file.`;
      
      const testFile = path.join(testDir, 'test-with-frontmatter.md');
      fs.writeFileSync(testFile, content);
      
      const processor = new FrontMatterProcessor({ dryRun: true, roots: [testDir] });
      // Use reflection to access private method for testing
      const analyzeFile = (processor as any).analyzeFile.bind(processor);
      const fileInfo = analyzeFile(testFile);
      
      expect(fileInfo).toBeTruthy();
      expect(fileInfo.hasFrontMatter).toBe(true);
      expect(fileInfo.frontMatter.id).toBe('test-123');
      expect(fileInfo.frontMatter.title).toBe('Test File');
      expect(fileInfo.body.trim()).toBe('# Test Content\nThis is a test file.');
    });

    test('detects missing front matter', () => {
      const content = `# Test Content
This is a test file without front matter.`;
      
      const testFile = path.join(testDir, 'test-without-frontmatter.md');
      fs.writeFileSync(testFile, content);
      
      const processor = new FrontMatterProcessor({ dryRun: true, roots: [testDir] });
      const analyzeFile = (processor as any).analyzeFile.bind(processor);
      const fileInfo = analyzeFile(testFile);
      
      expect(fileInfo).toBeTruthy();
      expect(fileInfo.hasFrontMatter).toBe(false);
      expect(fileInfo.frontMatter).toBeNull();
      expect(fileInfo.body).toBe(content);
    });

    test('handles malformed front matter', () => {
      const content = `---
invalid: yaml: content: [
---

# Test Content`;
      
      const testFile = path.join(testDir, 'test-malformed.md');
      fs.writeFileSync(testFile, content);
      
      const processor = new FrontMatterProcessor({ dryRun: true, roots: [testDir] });
      const analyzeFile = (processor as any).analyzeFile.bind(processor);
      const fileInfo = analyzeFile(testFile);
      
      expect(fileInfo).toBeTruthy();
      expect(fileInfo.hasFrontMatter).toBe(false);
      expect(fileInfo.body).toBe(content);
    });
  });

  describe('Checksum computation', () => {
    test('computes consistent checksums', () => {
      const processor = new FrontMatterProcessor({ dryRun: true });
      const computeChecksum = (processor as any).computeChecksum.bind(processor);
      
      const content1 = 'Hello, world!';
      const content2 = 'Hello, world!';
      const content3 = 'Hello, world?';
      
      const checksum1 = computeChecksum(content1);
      const checksum2 = computeChecksum(content2);
      const checksum3 = computeChecksum(content3);
      
      expect(checksum1).toBe(checksum2);
      expect(checksum1).not.toBe(checksum3);
      expect(checksum1).toMatch(/^[a-f0-9]{16}$/);
    });

    test('checksum excludes front matter', () => {
      const processor = new FrontMatterProcessor({ dryRun: true });
      const computeChecksum = (processor as any).computeChecksum.bind(processor);
      
      const bodyContent = '# Test\nThis is the body content.';
      const directChecksum = computeChecksum(bodyContent);
      
      // Simulate extracting body from file with front matter
      const fullContent = `---
id: test
title: Test
---

${bodyContent}`;
      
      const extractFrontMatter = (processor as any).extractFrontMatter.bind(processor);
      const { body } = extractFrontMatter(fullContent);
      const extractedChecksum = computeChecksum(body);
      
      expect(extractedChecksum).toBe(directChecksum);
    });
  });

  describe('Merge/update logic', () => {
    test('preserves existing front matter fields', () => {
      const existingFrontMatter = {
        id: 'existing-123',
        title: 'Original Title',
        custom_field: 'custom value',
        tags: ['tag1', 'tag2']
      };
      
      const testFile = path.join(testDir, 'test-merge.md');
      const body = '# Test Content';
      const content = `---
${yaml.dump(existingFrontMatter)}---

${body}`;
      
      fs.writeFileSync(testFile, content);
      
      const processor = new FrontMatterProcessor({ dryRun: true, roots: [testDir] });
      const analyzeFile = (processor as any).analyzeFile.bind(processor);
      const generateFrontMatter = (processor as any).generateFrontMatter.bind(processor);
      
      const fileInfo = analyzeFile(testFile);
      const newFrontMatter = generateFrontMatter(fileInfo);
      
      expect(newFrontMatter.id).toBe('existing-123'); // Preserved
      expect(newFrontMatter.title).toBe('Original Title'); // Preserved
      expect(newFrontMatter.custom_field).toBe('custom value'); // Preserved
      expect(newFrontMatter.tags).toEqual(['tag1', 'tag2']); // Preserved
      expect(newFrontMatter.checksum).toBeTruthy(); // Updated
      expect(newFrontMatter.modified).toBeTruthy(); // Updated
    });

    test('generates new front matter for files without it', () => {
      const testFile = path.join(testDir, 'new-file.md');
      const body = '# New File\nThis is new content.';
      fs.writeFileSync(testFile, body);
      
      const processor = new FrontMatterProcessor({ dryRun: true, roots: [testDir] });
      const analyzeFile = (processor as any).analyzeFile.bind(processor);
      const generateFrontMatter = (processor as any).generateFrontMatter.bind(processor);
      
      const fileInfo = analyzeFile(testFile);
      const frontMatter = generateFrontMatter(fileInfo);
      
      expect(frontMatter.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
      expect(frontMatter.title).toBe('new-file');
      expect(frontMatter.author).toBeTruthy();
      expect(frontMatter.status).toBe('active');
      expect(frontMatter.linked_docs).toEqual([]);
      expect(frontMatter.tags).toEqual([]);
      expect(frontMatter.checksum).toBeTruthy();
    });
  });

  describe('File filtering', () => {
    test('includes supported extensions', () => {
      const processor = new FrontMatterProcessor({ 
        dryRun: true, 
        include: ['.md', '.py', '.ts']
      });
      const shouldIncludeFile = (processor as any).shouldIncludeFile.bind(processor);
      
      expect(shouldIncludeFile('/path/to/file.md')).toBe(true);
      expect(shouldIncludeFile('/path/to/file.py')).toBe(true);
      expect(shouldIncludeFile('/path/to/file.ts')).toBe(true);
      expect(shouldIncludeFile('/path/to/file.txt')).toBe(false);
    });

    test('excludes patterns', () => {
      const processor = new FrontMatterProcessor({ 
        dryRun: true,
        include: ['.md'],
        exclude: ['node_modules', 'dist', '.git']
      });
      const shouldIncludeFile = (processor as any).shouldIncludeFile.bind(processor);
      
      expect(shouldIncludeFile('/path/to/file.md')).toBe(true);
      expect(shouldIncludeFile('/path/node_modules/file.md')).toBe(false);
      expect(shouldIncludeFile('/path/dist/file.md')).toBe(false);
      expect(shouldIncludeFile('/path/.git/file.md')).toBe(false);
    });
  });

  describe('YAML serialization', () => {
    test('produces valid YAML', () => {
      const processor = new FrontMatterProcessor({ dryRun: true });
      const serializeFrontMatter = (processor as any).serializeFrontMatter.bind(processor);
      
      const frontMatter: FrontMatter = {
        id: 'test-123',
        title: 'Test File',
        author: 'Dave',
        created: '2023-01-01T00:00:00.000Z',
        modified: '2023-01-02T00:00:00.000Z',
        status: 'active',
        linked_docs: ['doc1', 'doc2'],
        tags: ['tag1', 'tag2'],
        checksum: 'abc123def456'
      };
      
      const yamlOutput = serializeFrontMatter(frontMatter);
      
      expect(yamlOutput).toMatch(/^---\n/);
      expect(yamlOutput).toMatch(/\n---\n$/);
      
      // Parse it back to ensure it's valid
      const yamlContent = yamlOutput.slice(4, -4); // Remove --- delimiters
      const parsed = yaml.load(yamlContent) as FrontMatter;
      
      expect(parsed.id).toBe(frontMatter.id);
      expect(parsed.title).toBe(frontMatter.title);
      expect(parsed.linked_docs).toEqual(frontMatter.linked_docs);
      expect(parsed.tags).toEqual(frontMatter.tags);
    });
  });
});