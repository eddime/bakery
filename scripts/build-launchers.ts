#!/usr/bin/env bun
/**
 * 🥐 Gemcore Launcher Builder
 * 
 * Rebuilds all platform binaries from C++ source.
 * This script is ONLY needed for developers who modify the launcher code.
 * 
 * End-users don't need this - they use pre-built binaries from bin/
 */

import { $ } from 'bun';
import { join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

const FRAMEWORK_DIR = join(import.meta.dir, '..');
const LAUNCHER_DIR = join(FRAMEWORK_DIR, 'launcher');
const BIN_DIR = join(FRAMEWORK_DIR, 'bin');

console.log('🥐 Gemcore Launcher Builder');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('⚠️  This rebuilds C++ binaries from source.');
console.log('💡 End-users don\'t need this - use pre-built binaries!\n');

// Check if CMake is available
try {
  await $`cmake --version`.quiet();
} catch {
  console.error('❌ CMake not found!');
  console.error('💡 Install CMake to rebuild binaries:');
  console.error('   macOS:   brew install cmake');
  console.error('   Linux:   apt install cmake');
  console.error('   Windows: choco install cmake');
  process.exit(1);
}

// Ensure bin directories exist
for (const dir of ['mac-arm64', 'mac-x64', 'win-x64', 'linux-x64', 'linux-arm64']) {
  mkdirSync(join(BIN_DIR, dir), { recursive: true });
}

console.log('🏗️  Building launchers...\n');

// Build macOS ARM64
console.log('🍎 Building macOS ARM64...');
const buildDirMacArm = join(LAUNCHER_DIR, 'build-mac-arm64');
mkdirSync(buildDirMacArm, { recursive: true });

await $`cd ${buildDirMacArm} && cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_ARCHITECTURES=arm64`.quiet();
await $`cd ${buildDirMacArm} && cmake --build . --target gemcore-launcher-mac --config Release`.quiet();
await $`strip ${join(buildDirMacArm, 'gemcore-launcher-mac')}`.quiet();

copyFileSync(
  join(buildDirMacArm, 'gemcore-launcher-mac'),
  join(BIN_DIR, 'mac-arm64', 'gemcore-launcher')
);
console.log('✅ macOS ARM64 built\n');

// Build macOS x64
console.log('🍎 Building macOS x64...');
const buildDirMacX64 = join(LAUNCHER_DIR, 'build-mac-x64');
mkdirSync(buildDirMacX64, { recursive: true });

await $`cd ${buildDirMacX64} && cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_ARCHITECTURES=x86_64`.quiet();
await $`cd ${buildDirMacX64} && cmake --build . --target gemcore-launcher-mac --config Release`.quiet();
await $`strip ${join(buildDirMacX64, 'gemcore-launcher-mac')}`.quiet();

copyFileSync(
  join(buildDirMacX64, 'gemcore-launcher-mac'),
  join(BIN_DIR, 'mac-x64', 'gemcore-launcher')
);
console.log('✅ macOS x64 built\n');

// Build Windows x64 (requires MinGW)
console.log('🪟 Building Windows x64...');
const buildDirWin = join(LAUNCHER_DIR, 'build-win-x64');
mkdirSync(buildDirWin, { recursive: true });

try {
  await $`cd ${buildDirWin} && cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSTEM_NAME=Windows -DCMAKE_C_COMPILER=x86_64-w64-mingw32-gcc -DCMAKE_CXX_COMPILER=x86_64-w64-mingw32-g++`;
  await $`cd ${buildDirWin} && cmake --build . --target gemcore-launcher-win --config Release`;
  await $`x86_64-w64-mingw32-strip ${join(buildDirWin, 'gemcore-launcher-win.exe')}`;
  
  copyFileSync(
    join(buildDirWin, 'gemcore-launcher-win.exe'),
    join(BIN_DIR, 'win-x64', 'gemcore-launcher.exe')
  );
  console.log('✅ Windows x64 built\n');
} catch (e) {
  console.log('❌ Windows build failed:', e.message);
  console.log('💡 Install: brew install mingw-w64\n');
}

// Build Linux x64 (requires musl-cross)
console.log('🐧 Building Linux x64...');
const buildDirLinuxX64 = join(LAUNCHER_DIR, 'build-linux-x64');
mkdirSync(buildDirLinuxX64, { recursive: true });

try {
  await $`cd ${buildDirLinuxX64} && cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSTEM_NAME=Linux -DCMAKE_C_COMPILER=x86_64-linux-musl-gcc -DCMAKE_CXX_COMPILER=x86_64-linux-musl-g++`;
  await $`cd ${buildDirLinuxX64} && cmake --build . --target gemcore-launcher-linux --config Release`;
  await $`x86_64-linux-musl-strip ${join(buildDirLinuxX64, 'gemcore-launcher-linux')}`;
  
  copyFileSync(
    join(buildDirLinuxX64, 'gemcore-launcher-linux'),
    join(BIN_DIR, 'linux-x64', 'gemcore-launcher')
  );
  console.log('✅ Linux x64 built\n');
} catch (e) {
  console.log('❌ Linux x64 build failed:', e.message);
  console.log('💡 Install: brew install FiloSottile/musl-cross/musl-cross\n');
}

// Build Linux ARM64
console.log('🐧 Building Linux ARM64...');
const buildDirLinuxArm = join(LAUNCHER_DIR, 'build-linux-arm64');
mkdirSync(buildDirLinuxArm, { recursive: true });

try {
  await $`cd ${buildDirLinuxArm} && cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSTEM_NAME=Linux -DCMAKE_C_COMPILER=aarch64-linux-musl-gcc -DCMAKE_CXX_COMPILER=aarch64-linux-musl-g++`;
  await $`cd ${buildDirLinuxArm} && cmake --build . --target gemcore-launcher-linux --config Release`;
  await $`aarch64-linux-musl-strip ${join(buildDirLinuxArm, 'gemcore-launcher-linux')}`;
  
  copyFileSync(
    join(buildDirLinuxArm, 'gemcore-launcher-linux'),
    join(BIN_DIR, 'linux-arm64', 'gemcore-launcher')
  );
  console.log('✅ Linux ARM64 built\n');
} catch (e) {
  console.log('❌ Linux ARM64 build failed:', e.message);
  console.log('💡 Install: brew install FiloSottile/musl-cross/musl-cross\n');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Launcher build complete!\n');
console.log('📦 Binaries saved to bin/');
console.log('💡 Commit these binaries so end-users can build without CMake!');

