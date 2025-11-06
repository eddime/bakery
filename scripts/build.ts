#!/usr/bin/env bun
// ⚡ Zippy Build Script
// Builds Zippy runtime for current or target platform

import { $ } from 'bun';
import { parseArgs } from 'util';

interface BuildOptions {
  target?: string;
  release?: boolean;
  clean?: boolean;
  all?: boolean;
}

const TARGETS = [
  'linux-x64',
  'linux-arm64',
  'darwin-x64',
  'darwin-arm64',
  'windows-x64',
] as const;

type Target = typeof TARGETS[number];

async function main() {
  console.log('⚡ Zippy Build System\n');
  
  const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      target: { type: 'string', short: 't' },
      release: { type: 'boolean', short: 'r', default: true },
      clean: { type: 'boolean', short: 'c', default: false },
      all: { type: 'boolean', short: 'a', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
    allowPositionals: true,
  });
  
  if (values.help) {
    printHelp();
    return;
  }
  
  const options: BuildOptions = {
    target: values.target as string,
    release: values.release as boolean,
    clean: values.clean as boolean,
    all: values.all as boolean,
  };
  
  // Clean if requested
  if (options.clean) {
    console.log('🧹 Cleaning build directory...');
    await $`rm -rf build dist`;
  }
  
  // Build for all targets or specific target
  if (options.all) {
    console.log('🌍 Building for all platforms...\n');
    for (const target of TARGETS) {
      await buildTarget(target, options.release);
    }
  } else {
    const target = options.target || getCurrentPlatform();
    console.log(`🎯 Building for ${target}...\n`);
    await buildTarget(target as Target, options.release);
  }
  
  console.log('\n✅ Build complete!');
}

async function buildTarget(target: Target, release: boolean) {
  const buildType = release ? 'Release' : 'Debug';
  const buildDir = `build/${target}`;
  
  console.log(`📦 Building ${target} (${buildType})...`);
  
  // Create build directory
  await $`mkdir -p ${buildDir}`;
  
  // Configure with CMake
  console.log('  ⚙️  Configuring...');
  await $`cd ${buildDir} && cmake ../.. -DCMAKE_BUILD_TYPE=${buildType}`;
  
  // Build
  console.log('  🔨 Building...');
  await $`cd ${buildDir} && cmake --build . --parallel`;
  
  // Copy to dist
  console.log('  📂 Copying to dist...');
  await $`mkdir -p dist`;
  await $`cp ${buildDir}/zippy dist/zippy-${target}${target.includes('windows') ? '.exe' : ''}`;
  
  console.log(`  ✅ ${target} build complete`);
}

function getCurrentPlatform(): Target {
  const os = process.platform;
  const arch = process.arch;
  
  if (os === 'darwin') {
    return arch === 'arm64' ? 'darwin-arm64' : 'darwin-x64';
  } else if (os === 'linux') {
    return arch === 'arm64' ? 'linux-arm64' : 'linux-x64';
  } else if (os === 'win32') {
    return 'windows-x64';
  }
  
  throw new Error(`Unsupported platform: ${os}-${arch}`);
}

function printHelp() {
  console.log(`
⚡ Zippy Build System

Usage:
  bun run build [options]

Options:
  -t, --target <target>   Build for specific target
  -r, --release          Build in release mode (default)
  -c, --clean            Clean before building
  -a, --all              Build for all platforms
  -h, --help             Show this help

Targets:
  ${TARGETS.join('\n  ')}

Examples:
  bun run build                      # Build for current platform
  bun run build --target linux-x64   # Build for Linux x64
  bun run build --all                # Build for all platforms
  bun run build --clean --all        # Clean and build all
  `);
}

main().catch(console.error);

