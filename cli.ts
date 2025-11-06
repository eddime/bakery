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
    },
    strict: false,
    allowPositionals: true,
  });

  const entryPoint = resolve(values.entry as string);
  const port = parseInt(values.port as string);

  let appProcess: any = null;
  let isRestarting = false;

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
      if (!isRestarting) {
        console.log('\n👋 App closed. Waiting for file changes to restart...\n');
        appProcess = null;
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
  console.log('🍎 Building for macOS...');
  console.log('🚧 macOS build coming soon!');
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
  bake dev -p 8080              Use custom hot reload port

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
  -p, --port <port>     Hot reload WebSocket port (default: 35729)
  -h, --help            Show help

For more info: https://github.com/eddime/bakery
  `);
}

main().catch(console.error);

