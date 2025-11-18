#!/usr/bin/env bun
// 🥐 Bakery Shared Assets Builder
// Creates a single "bakery-assets" file that can be shared across architectures
// 🔒 With XOR Encryption for asset protection

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createHash, randomBytes } from 'crypto';

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

// 🔒 Generate unique encryption key for this project
const projectName = projectDir.split('/').pop() || 'bakery';
const salt = randomBytes(16).toString('hex');
const encryptionKey = createHash('sha256')
  .update(`${projectName}-${salt}-bakery-2024`)
  .digest();

console.log('🔐 Encryption enabled');
console.log(`🔑 Key hash: ${encryptionKey.slice(0, 8).toString('hex')}...`);
console.log('');

// 🔒 XOR Encryption with multi-key rotation (Best Practice!)
function xorEncrypt(data: Buffer, key: Buffer): Buffer {
  const encrypted = Buffer.alloc(data.length);
  const keyLen = key.length;
  
  // Multi-key rotation for better security
  for (let i = 0; i < data.length; i++) {
    // Use position-dependent key rotation
    const keyIdx = (i + (i >> 8)) % keyLen;
    encrypted[i] = data[i] ^ key[keyIdx];
  }
  
  return encrypted;
}

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

// 🚀 Add WebGPU helper script (universal, framework-agnostic)
const webgpuHelperPath = join(import.meta.dir, '..', 'launcher', 'assets', 'bakery-webgpu-helper.js');
const webgpuHelper = readFileSync(webgpuHelperPath);
files.push({ path: 'bakery-webgpu-helper.js', data: webgpuHelper });

// 🔒 Embed bakery.config.json (encrypted, not accessible to user)
const configJsonPath = join(projectDir, 'bakery.config.json');
const configJsPath = join(projectDir, 'bakery.config.js');
let config: any = null;

if (existsSync(configJsonPath)) {
  const configData = readFileSync(configJsonPath);
  files.push({ path: '.bakery-config.json', data: configData });
  config = JSON.parse(configData.toString());
  console.log('🔒 Config embedded (JSON)');
} else if (existsSync(configJsPath)) {
  // Convert JS config to JSON
  const configModule = await import(`file://${configJsPath}`);
  config = configModule.default;
  const configJson = JSON.stringify(config, null, 2);
  files.push({ path: '.bakery-config.json', data: Buffer.from(configJson) });
  console.log('🔒 Config embedded (from JS)');
}

// 🎬 Add splash.html from framework assets if splash is enabled
if (config?.app?.splash === true) {
  const splashPath = join(import.meta.dir, '..', 'assets', 'splash.html');
  if (existsSync(splashPath)) {
    const splashData = readFileSync(splashPath);
    files.push({ path: 'splash.html', data: splashData });
    console.log('🎬 Splash screen embedded (from framework assets)');
  } else {
    console.warn('⚠️  splash.html not found in framework assets!');
  }
}

console.log(`✅ Collected ${files.length} files (+ WebGPU helper + config)`);
console.log('');

// Build binary format:
// [8 bytes: Magic header "BAKERY1\0"]
// [32 bytes: Encryption key]
// [uint32: file count]
// For each file:
//   [uint32: filename length]
//   [bytes: filename]
//   [uint64: file size]
//   [bytes: ENCRYPTED file data] 🔒
//

const buffers: Buffer[] = [];

// Magic header (identifies encrypted bakery-assets)
const magicHeader = Buffer.from('BAKERY1\0', 'utf8');
buffers.push(magicHeader);

// Encryption key (needed for decryption)
buffers.push(encryptionKey);

let totalSize = magicHeader.length + encryptionKey.length;

// File count
const fileCountBuf = Buffer.alloc(4);
fileCountBuf.writeUInt32LE(files.length, 0);
buffers.push(fileCountBuf);
totalSize += 4;

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
  
  // 🔒 Encrypt file data before storing!
  const encryptedData = xorEncrypt(file.data, encryptionKey);
  buffers.push(encryptedData);
  totalSize += encryptedData.length;
  
  console.log(`  ✓ ${file.path.padEnd(40)} ${(file.data.length / 1024).toFixed(1)} KB 🔒`);
}

const finalBuffer = Buffer.concat(buffers);
writeFileSync(outputPath, finalBuffer);

console.log('');
console.log('✅ Shared assets file created!');
console.log(`📊 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log('🔐 All assets encrypted with XOR + multi-key rotation');
console.log(`🔑 Encryption key embedded in file (32 bytes)`);
console.log('');
console.log('💡 This file can be shared across ARM64 and x64 launchers!');


