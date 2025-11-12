#!/usr/bin/env bun
/**
 * 🥐 Bakery Binary Downloader
 * 
 * Downloads pre-built launcher binaries from GitHub Releases.
 * This is used by end-users who don't want to compile from source.
 * 
 * Similar to how Neutralino downloads binaries from their releases.
 */

import { $ } from 'bun';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const FRAMEWORK_DIR = join(import.meta.dir, '..');
const BIN_DIR = join(FRAMEWORK_DIR, 'bin');
const GITHUB_REPO = 'eddime/bakery'; // TODO: Update with actual repo
const VERSION = 'latest'; // or specific version like 'v1.0.0'

console.log('🥐 Bakery Binary Downloader');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📦 Downloading pre-built launcher binaries...\n');

// Ensure bin directories exist
for (const dir of ['mac-arm64', 'mac-x64', 'win-x64', 'linux-x64', 'linux-arm64']) {
  mkdirSync(join(BIN_DIR, dir), { recursive: true });
}

const binaries = [
  { platform: 'mac-arm64', filename: 'bakery-launcher-mac-arm64', output: 'bakery-launcher' },
  { platform: 'mac-x64', filename: 'bakery-launcher-mac-x64', output: 'bakery-launcher' },
  { platform: 'win-x64', filename: 'bakery-launcher-win-x64.exe', output: 'bakery-launcher.exe' },
  { platform: 'linux-x64', filename: 'bakery-launcher-linux-x64', output: 'bakery-launcher' },
  { platform: 'linux-arm64', filename: 'bakery-launcher-linux-arm64', output: 'bakery-launcher' },
];

for (const binary of binaries) {
  const outputPath = join(BIN_DIR, binary.platform, binary.output);
  
  // Skip if already exists
  if (existsSync(outputPath)) {
    console.log(`✅ ${binary.platform} already exists`);
    continue;
  }
  
  console.log(`📥 Downloading ${binary.platform}...`);
  
  try {
    const url = `https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/${binary.filename}`;
    await $`curl -L -o ${outputPath} ${url}`;
    await $`chmod +x ${outputPath}`;
    console.log(`✅ ${binary.platform} downloaded\n`);
  } catch (e) {
    console.log(`⚠️  ${binary.platform} download failed: ${e.message}`);
    console.log(`💡 You can build it manually with: bun scripts/build-launchers.ts\n`);
  }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Binary download complete!\n');
console.log('📦 Binaries saved to bin/');
console.log('💡 If downloads failed, you can build from source with:');
console.log('   bun scripts/build-launchers.ts');

