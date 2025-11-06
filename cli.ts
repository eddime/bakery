#!/usr/bin/env bun
// 🥐 Bakery CLI
// Main command-line interface

import { parseArgs } from 'util';
import { resolve } from 'path';
import { spawn } from 'bun';
import { DevServer } from './lib/dev-server';

const commands = {
  dev: devCommand,
  all: buildAllCommand,
  mac: buildMacCommand,
  win: buildWinCommand,
  linux: buildLinuxCommand,
  run: runCommand,
  help: helpCommand,
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  // Handle --help or -h
  if (command === '--help' || command === '-h') {
    helpCommand();
    process.exit(0);
  }

  const handler = commands[command as keyof typeof commands];
  if (!handler) {
    console.error(`❌ Unknown command: ${command}`);
    helpCommand();
    process.exit(1);
  }

  await handler(args.slice(1));
}

async function devCommand(args: string[]) {
  console.log('🥐 Bakery Development Mode\n');

  // Parse args
  const { values } = parseArgs({
    args,
    options: {
      entry: { type: 'string', short: 'e', default: './test-hello.ts' },
      port: { type: 'string', short: 'p', default: '35729' },
      persist: { type: 'boolean', default: false }, // Keep dev server running after app closes
    },
    strict: false,
    allowPositionals: true,
  });

  const entryPoint = resolve(values.entry as string);
  const port = parseInt(values.port as string);
  const persistMode = values.persist === true;

  let appProcess: any = null;
  let isRestarting = false;
  let shouldExit = false;

  async function restartApp() {
    if (isRestarting) return; // Prevent multiple restarts
    isRestarting = true;

    if (appProcess) {
      console.log('\n🔄 Restarting app...\n');
      appProcess.kill();
      // Wait a bit for process to fully exit
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('🚀 Starting app...');

    appProcess = spawn({
      cmd: ['bun', 'run', entryPoint],
      stdout: 'inherit',
      stderr: 'inherit',
      stdin: 'inherit',
      env: {
        ...process.env,
        BAKERY_DEV: 'true',
      },
    });

    // Watch for app process exit
    appProcess.exited.then((exitCode: number) => {
      if (!isRestarting && !shouldExit) {
        if (persistMode) {
          console.log('\n👋 App closed. Waiting for file changes to restart...\n');
          appProcess = null;
        } else {
          console.log('\n👋 App closed. Exiting dev mode...\n');
          shouldExit = true;
          process.exit(0);
        }
      }
    });

    isRestarting = false;
  }

  // Watch for file changes and restart app
  const { watch } = await import('fs');
  const watcher = watch('.', { recursive: true }, async (event, filename) => {
    if (!filename) return;

    // Only restart on TypeScript file changes in lib/ or entry file
    if (
      (filename.includes('lib/') && filename.endsWith('.ts')) ||
      filename === entryPoint.split('/').pop()
    ) {
      console.log(`\n📝 Changed: ${filename}`);
      // If app is not running, start it. Otherwise restart it.
      if (!appProcess) {
        console.log('🔄 Restarting app due to file change...\n');
      }
      await restartApp();
    }
  });

  // Start app initially
  await restartApp();

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down Bakery dev server...');
    watcher.close();
    if (appProcess) {
      appProcess.kill();
    }
    process.exit(0);
  });

  // Keep process alive
  await new Promise(() => {});
}

async function buildAllCommand(args: string[]) {
  console.log('🥐 Bakery Build - All Platforms\n');
  console.log('Building for: macOS, Windows, Linux...\n');
  
  await buildMacCommand(args);
  await buildWinCommand(args);
  await buildLinuxCommand(args);
  
  console.log('\n✅ All platforms built successfully!');
}

async function buildMacCommand(args: string[]) {
  console.log('🍎 Building for macOS...\n');
  
  const { parseArgs } = await import('util');
  const { values } = parseArgs({
    args,
    options: {
      entry: { type: 'string', short: 'e' },
      output: { type: 'string', short: 'o' },
      runtime: { type: 'string', default: 'txiki' }, // 'bun' or 'txiki'
    },
    strict: false,
    allowPositionals: true,
  });

  const runtime = values.runtime as string;
  // Auto-select default entry based on runtime
  const defaultEntry = runtime === 'bun' ? './test-hello.ts' : './test-txiki-webview.js';
  const entryPoint = resolve(values.entry as string || defaultEntry);
  const outputName = values.output as string || 'bakery-app';
  
  console.log(`📦 Entry: ${entryPoint}`);
  console.log(`📦 Output: dist/${outputName}-darwin-arm64`);
  console.log(`📦 Runtime: ${runtime}\n`);
  
  // Step 1: Create dist directory
  console.log('1️⃣ Creating dist directory...');
  await spawn({
    cmd: ['mkdir', '-p', 'dist'],
    stdout: 'inherit',
    stderr: 'inherit',
  }).exited;
  
  if (runtime === 'bun') {
    // Use Bun's compile (like bunery)
    console.log('2️⃣ Compiling with Bun...');
    const compileResult = await spawn({
      cmd: [
        'bun', 'build', entryPoint,
        '--compile',
        `--outfile=dist/${outputName}-darwin-arm64`,
        '--minify',
        '--target=bun'
      ],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;
    
    if (compileResult !== 0) {
      console.error('❌ Compilation failed!');
      process.exit(1);
    }
    
    // Copy WebView library
    console.log('3️⃣ Copying WebView library...');
    await spawn({
      cmd: ['cp', 'deps/webview-prebuilt/libwebview.dylib', 'dist/'],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;
    
    console.log('\n✅ macOS build complete (Bun runtime)!');
    console.log(`📦 Binary: dist/${outputName}-darwin-arm64 (~90 MB with Bun runtime)`);
    console.log(`📦 Library: dist/libwebview.dylib (230 KB)`);
  } else {
    // Use txiki.js (small runtime)
    console.log('2️⃣ Bundling with esbuild...');
    const bundlePath = `dist/${outputName}-bundle.js`;
    const bundleResult = await spawn({
      cmd: [
        'npx', 'esbuild', entryPoint,
        '--bundle',
        `--outfile=${bundlePath}`,
        '--external:tjs:*',
        '--external:bun:*',
        '--external:path',
        '--minify',
        '--target=es2023',
        '--platform=neutral',
        '--format=esm',
        '--main-fields=main,module'
      ],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;
    
    if (bundleResult !== 0) {
      console.error('❌ Bundling failed!');
      process.exit(1);
    }
    
    // Compile with txiki.js
    console.log('3️⃣ Compiling with txiki.js...');
    const compileResult = await spawn({
      cmd: [
        './deps/txiki.js/build/tjs',
        'compile',
        bundlePath,
        `dist/${outputName}-darwin-arm64`
      ],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;
    
    if (compileResult !== 0) {
      console.error('❌ Compilation failed!');
      process.exit(1);
    }
    
    // Copy WebView library
    console.log('4️⃣ Copying WebView library...');
    await spawn({
      cmd: ['cp', 'deps/webview-prebuilt/libwebview.dylib', 'dist/'],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Copy assets (icons)
    console.log('5️⃣ Copying assets...');
    await spawn({
      cmd: ['cp', '-r', 'assets', 'dist/'],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Clean up bundle
    await spawn({
      cmd: ['rm', bundlePath],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Create .app bundle
    console.log('6️⃣ Creating .app bundle...');
    const appName = outputName;
    const appPath = `dist/${appName}.app`;
    const contentsPath = `${appPath}/Contents`;
    const macosPath = `${contentsPath}/MacOS`;
    const resourcesPath = `${contentsPath}/Resources`;

    // Create directories
    await spawn({
      cmd: ['mkdir', '-p', macosPath, resourcesPath],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Move binary into .app
    await spawn({
      cmd: ['mv', `dist/${outputName}-darwin-arm64`, `${macosPath}/${appName}`],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Move libwebview.dylib into .app
    await spawn({
      cmd: ['mv', 'dist/libwebview.dylib', `${macosPath}/`],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Copy icon.icns to Resources
    await spawn({
      cmd: ['cp', 'assets/icon.icns', `${resourcesPath}/`],
      stdout: 'inherit',
      stderr: 'inherit',
    }).exited;

    // Create Info.plist
    const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleExecutable</key>
  <string>${appName}</string>
  <key>CFBundleIconFile</key>
  <string>icon</string>
  <key>CFBundleIdentifier</key>
  <string>com.bakery.${appName}</string>
  <key>CFBundleName</key>
  <string>Bakery App</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  <key>CFBundleVersion</key>
  <string>1.0.0</string>
  <key>LSMinimumSystemVersion</key>
  <string>10.13</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>`;

    await Bun.write(`${contentsPath}/Info.plist`, plist);

    console.log('\n✅ macOS build complete (txiki.js runtime)!');
    console.log(`📦 App Bundle: dist/${appName}.app (~3.9 MB total)`);
    console.log(`   Binary: ${appName}.app/Contents/MacOS/${appName} (3.6 MB)`);
    console.log(`   Library: ${appName}.app/Contents/MacOS/libwebview.dylib (230 KB)`);
    console.log(`   Icon: ${appName}.app/Contents/Resources/icon.icns (134 KB)`);
  }
  
  console.log(`\n💡 To run: open dist/${outputName}.app`);
}

async function buildWinCommand(args: string[]) {
  console.log('🪟 Building for Windows...');
  console.log('🚧 Windows build coming soon!');
}

async function buildLinuxCommand(args: string[]) {
  console.log('🐧 Building for Linux...');
  console.log('🚧 Linux build coming soon!');
}

async function runCommand(args: string[]) {
  console.log('🥐 Bakery Run\n');
  
  const entryPoint = args[0] || './test-hello.ts';
  
  const appProcess = spawn({
    cmd: ['bun', 'run', resolve(entryPoint)],
    stdout: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  });

  await appProcess.exited;
}

function helpCommand() {
  console.log(`
🥐 Bakery - Blazing Fast Desktop Framework

Usage:
  bake <command> [options]

Commands:
  dev       Start development mode with hot reload
  all       Build for all platforms (macOS, Windows, Linux)
  mac       Build for macOS only
  win       Build for Windows only
  linux     Build for Linux only
  run       Run an app without hot reload
  help      Show this help message

Development:
  bake dev                      Start with default entry (test-hello.ts)
  bake dev -e ./my-app.ts       Start with custom entry point
  bake dev --persist            Keep dev server running after app closes

Build:
  bake all                      Build for all platforms
  bake mac                      Build for macOS
  bake win                      Build for Windows
  bake linux                    Build for Linux

Examples:
  bake dev                      # Start dev mode (like 'neu run')
  bake run ./my-app.ts          # Run without hot reload
  bake all                      # Build for all platforms

Options:
  -e, --entry <file>    Entry point file (default: ./test-hello.ts)
  --persist             Keep dev server running after app closes
  -h, --help            Show help

For more info: https://github.com/eddime/bakery
  `);
}

main().catch(console.error);

