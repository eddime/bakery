#!/usr/bin/env bun
// 🥐 Bakery CLI
// Main command-line interface

import { parseArgs } from 'util';
import { resolve } from 'path';
import { spawn } from 'bun';
import { DevServer } from './lib/dev-server';

const commands = {
  dev: devCommand,
  build: buildCommand,
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

async function buildCommand(args: string[]) {
  console.log('🥐 Bakery Build\n');
  console.log('🚧 Build system coming soon!');
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
  bakery <command> [options]

Commands:
  dev       Start development mode with hot reload
  build     Build app for production
  run       Run an app without hot reload
  help      Show this help message

Development:
  bakery dev                    Start with default entry (test-hello.ts)
  bakery dev -e ./my-app.ts     Start with custom entry point
  bakery dev -p 8080            Use custom hot reload port

Examples:
  bakery dev                    # Start dev mode (like 'neu run')
  bakery run ./my-app.ts        # Run without hot reload
  bakery build                  # Build for production

Options:
  -e, --entry <file>    Entry point file (default: ./test-hello.ts)
  -p, --port <port>     Hot reload WebSocket port (default: 35729)
  -h, --help            Show help

For more info: https://github.com/eddime/bakery
  `);
}

main().catch(console.error);

