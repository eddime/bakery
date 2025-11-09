#!/usr/bin/env bun
// 🥐 Bakery Shared Assets Builder
// Creates a single "bakery-assets" file that can be shared across architectures

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const projectDir = process.argv[2];
const outputPath = process.argv[3];

if (!projectDir || !outputPath) {
  console.error('Usage: bun embed-assets-shared.ts <project_dir> <output_path>');
  process.exit(1);
}

const srcDir = join(projectDir, 'src');

console.log('📦 Bakery Shared Assets Builder');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📁 Source: ${srcDir}`);
console.log(`📄 Output: ${outputPath}`);
console.log('');

// Collect all files
function collectFiles(dir: string, baseDir: string = dir): Array<{ path: string; data: Buffer }> {
  const files: Array<{ path: string; data: Buffer }> = [];
  
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...collectFiles(fullPath, baseDir));
    } else {
      const relativePath = fullPath.substring(baseDir.length + 1);
      const data = readFileSync(fullPath);
      files.push({ path: relativePath, data });
    }
  }
  
  return files;
}

const files = collectFiles(srcDir);

console.log(`✅ Collected ${files.length} files`);
console.log('');

// Build binary format:
// [uint32: file count]
// For each file:
//   [uint32: filename length]
//   [bytes: filename]
//   [uint64: file size]
//   [bytes: file data]

const buffers: Buffer[] = [];

// File count
const fileCountBuf = Buffer.alloc(4);
fileCountBuf.writeUInt32LE(files.length, 0);
buffers.push(fileCountBuf);

let totalSize = 4;

for (const file of files) {
  // Filename length
  const nameBuf = Buffer.from(file.path, 'utf8');
  const nameLenBuf = Buffer.alloc(4);
  nameLenBuf.writeUInt32LE(nameBuf.length, 0);
  buffers.push(nameLenBuf);
  totalSize += 4;
  
  // Filename
  buffers.push(nameBuf);
  totalSize += nameBuf.length;
  
  // File size (uint64 - use BigInt)
  const sizeBuf = Buffer.alloc(8);
  sizeBuf.writeBigUInt64LE(BigInt(file.data.length), 0);
  buffers.push(sizeBuf);
  totalSize += 8;
  
  // File data
  buffers.push(file.data);
  totalSize += file.data.length;
  
  console.log(`  ✓ ${file.path.padEnd(40)} ${(file.data.length / 1024).toFixed(1)} KB`);
}

const finalBuffer = Buffer.concat(buffers);
writeFileSync(outputPath, finalBuffer);

console.log('');
console.log('✅ Shared assets file created!');
console.log(`📊 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log('');
console.log('💡 This file can be shared across ARM64 and x64 launchers!');


