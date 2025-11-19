#!/usr/bin/env bun
/**
 * Download pre-built Bakery binaries from GitHub Releases
 * Similar to how Neutralino.js downloads binaries for all platforms
 * 
 * This allows cross-platform builds: build for Windows/Linux from macOS!
 * 
 * Binaries are cached locally and only downloaded once.
 * This enables offline usage after initial setup.
 */

import { existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';

const GITHUB_REPO = 'eddime/bakery';
const BINARIES_DIR = join(import.meta.dir, '..', 'launcher', 'prebuilt');
const VERSION_FILE = join(BINARIES_DIR, '.version');

interface BinaryInfo {
  name: string;
  url: string;
  path: string;
}

async function getLatestRelease(): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest release: ${response.statusText}`);
  }
  const data = await response.json();
  return data.tag_name;
}

async function downloadBinary(url: string, outputPath: string): Promise<void> {
  console.log(`   ⬇️  Downloading: ${url}`);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`);
  }
  
  const buffer = await response.arrayBuffer();
  await Bun.write(outputPath, buffer);
  
  // Make executable
  if (process.platform !== 'win32') {
    await Bun.$`chmod +x ${outputPath}`;
  }
  
  console.log(`   ✅ Downloaded: ${outputPath}`);
}

function getCachedVersion(): string | null {
  if (!existsSync(VERSION_FILE)) {
    return null;
  }
  try {
    return Bun.file(VERSION_FILE).text().then(t => t.trim());
  } catch {
    return null;
  }
}

function setCachedVersion(version: string): void {
  Bun.write(VERSION_FILE, version);
}

function areBinariesCached(): boolean {
  if (!existsSync(BINARIES_DIR)) {
    return false;
  }
  
  // Check if all required binaries exist
  const requiredBinaries = [
    'bakery-launcher-linux-x64',
    'bakery-universal-launcher-linux-embedded',
    'bakery-launcher-win.exe',
    'bakery-launcher-mac',
  ];
  
  for (const binary of requiredBinaries) {
    const path = join(BINARIES_DIR, binary);
    if (!existsSync(path)) {
      return false;
    }
  }
  
  return true;
}

async function downloadAllBinaries(version: string = 'latest', force: boolean = false): Promise<void> {
  console.log('📦 Bakery Pre-built Binaries');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  
  // Create prebuilt directory
  if (!existsSync(BINARIES_DIR)) {
    mkdirSync(BINARIES_DIR, { recursive: true });
  }
  
  // Check if binaries are already cached
  const cachedVersion = await getCachedVersion();
  if (!force && areBinariesCached()) {
    console.log('✅ Pre-built binaries already cached!');
    console.log(`   Version: ${cachedVersion || 'unknown'}`);
    console.log('');
    console.log('💡 Bakery can now be used offline');
    console.log('');
    console.log('🔄 To update binaries:');
    console.log('   bun scripts/download-prebuilt-binaries.ts --force');
    console.log('');
    return;
  }
  
  console.log('⬇️  Downloading pre-built binaries from GitHub...');
  console.log('');
  
  // Get latest version if not specified
  if (version === 'latest') {
    console.log('🔍 Fetching latest release version...');
    version = await getLatestRelease();
    console.log(`   ✅ Latest version: ${version}`);
    console.log('');
  }
  
  // Define binaries to download
  const binaries: BinaryInfo[] = [
    // Linux x64 (with WebKitGTK)
    {
      name: 'Linux x64 Launcher (WebKitGTK)',
      url: `https://github.com/${GITHUB_REPO}/releases/download/${version}/bakery-launcher-linux-x64`,
      path: join(BINARIES_DIR, 'bakery-launcher-linux-x64'),
    },
    // Linux Universal Launcher (embedded)
    {
      name: 'Linux Universal Launcher',
      url: `https://github.com/${GITHUB_REPO}/releases/download/${version}/bakery-universal-launcher-linux-embedded`,
      path: join(BINARIES_DIR, 'bakery-universal-launcher-linux-embedded'),
    },
    // Windows x64 Launcher
    {
      name: 'Windows x64 Launcher',
      url: `https://github.com/${GITHUB_REPO}/releases/download/${version}/bakery-launcher-win.exe`,
      path: join(BINARIES_DIR, 'bakery-launcher-win.exe'),
    },
    // macOS Universal Launcher
    {
      name: 'macOS Universal Launcher',
      url: `https://github.com/${GITHUB_REPO}/releases/download/${version}/bakery-launcher-mac`,
      path: join(BINARIES_DIR, 'bakery-launcher-mac'),
    },
  ];
  
  console.log(`📥 Downloading ${binaries.length} binaries...`);
  console.log('');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const binary of binaries) {
    try {
      await downloadBinary(binary.url, binary.path);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed to download ${binary.name}: ${error}`);
      failCount++;
    }
  }
  
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Downloaded: ${successCount}/${binaries.length} binaries`);
  
  if (failCount > 0) {
    console.log(`⚠️  Failed: ${failCount} binaries`);
    console.log('');
    console.log('💡 Missing binaries will be built locally (if possible)');
  }
  
  // Save version to cache
  setCachedVersion(version);
  
  console.log('');
  console.log('💾 Binaries cached locally');
  console.log('💡 Bakery can now be used offline!');
  console.log('');
  console.log('🎯 You can now build games for all platforms from any OS:');
  console.log('   → bun bake build --platform=all');
  console.log('   → bun bake build --platform=mac');
  console.log('   → bun bake build --platform=win');
  console.log('   → bun bake build --platform=linux');
  console.log('');
}

// Run if called directly
if (import.meta.main) {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');
  const version = args.find(arg => !arg.startsWith('--')) || 'latest';
  
  try {
    await downloadAllBinaries(version, force);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

export { downloadAllBinaries, areBinariesCached };

