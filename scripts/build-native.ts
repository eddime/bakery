#!/usr/bin/env bun
/**
 * 🥐 Bakery Native Build Script
 * Builds the new C++ + Socket Runtime architecture
 */

import { spawn } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, chmodSync, cpSync, rmSync } from 'fs';
import { join, basename } from 'path';

const ROOT = join(import.meta.dir, '..');
const LAUNCHER_DIR = join(ROOT, 'launcher');
const BUILD_DIR = join(LAUNCHER_DIR, 'build');
const DIST_DIR = join(ROOT, 'dist');

function runCommand(cmd: string, args: string[], cwd?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Running: ${cmd} ${args.join(' ')}`);
    const proc = spawn(cmd, args, { 
      cwd: cwd || process.cwd(),
      stdio: 'inherit',
      shell: true
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  console.log('🥐 Bakery Native Build');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // 1. Get project directory from env or use default
  const projectDir = process.env.BAKERY_PROJECT_DIR || join(ROOT, 'examples/hello-world-socket');
  
  if (!existsSync(projectDir)) {
    throw new Error(`Project directory not found: ${projectDir}`);
  }
  
  console.log(`📁 Project: ${projectDir}`);
  
  // 2. Build Socket Runtime app (we need it running)
  console.log('\n📦 Building Socket Runtime app...');
  await runCommand('ssc', ['build', '-o'], projectDir);
  
  const buildOutputDir = join(projectDir, 'build/mac');
  console.log(`✅ Socket Runtime built: ${buildOutputDir}`);
  
  // 3. Build C++ launcher
  console.log('\n🔨 Building C++ launcher...');
  
  // Clean build dir
  if (existsSync(BUILD_DIR)) {
    rmSync(BUILD_DIR, { recursive: true, force: true });
  }
  mkdirSync(BUILD_DIR, { recursive: true });
  
  // CMake configure
  await runCommand('cmake', ['..', '-DCMAKE_BUILD_TYPE=Release'], BUILD_DIR);
  
  // CMake build
  await runCommand('cmake', ['--build', '.', '--config', 'Release'], BUILD_DIR);
  
  const launcherPath = join(BUILD_DIR, 'bakery-native');
  if (!existsSync(launcherPath)) {
    throw new Error('Launcher binary not found after build!');
  }
  
  console.log(`✅ Built launcher: ${launcherPath}`);
  const launcherStats = require('fs').statSync(launcherPath);
  console.log(`   Size: ${(launcherStats.size / 1024).toFixed(1)} KB`);
  
  // 4. Create dist directory
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // 5. Copy launcher to dist
  const finalLauncher = join(DIST_DIR, 'bakery-native');
  cpSync(launcherPath, finalLauncher);
  chmodSync(finalLauncher, 0o755);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ BUILD COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📦 Native Launcher: ${finalLauncher}`);
  console.log(`📦 Socket Runtime: ${buildOutputDir}`);
  console.log(`\n🎉 To test: Start Socket Runtime, then run the launcher!`);
  console.log(`\n💡 Next step: cd ${projectDir} && ssc dev -r`);
  console.log(`   Then in another terminal: ${finalLauncher}\n`);
}

main().catch(err => {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
});

