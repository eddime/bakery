#!/usr/bin/env bun
// 🥐 Bakery Development Server
// Runs Bakery app with hot reload (like `neu run`)

import { watch } from 'fs';
import { spawn, type Subprocess } from 'bun';
import { resolve } from 'path';

console.log('🥐 Bakery Development Server\n');

let appProcess: Subprocess | null = null;

async function startApp() {
  if (appProcess) {
    console.log('🔄 Restarting app...\n');
    appProcess.kill();
    appProcess = null;
  }
  
  console.log('🚀 Starting app...');
  
  // Run test-hello.ts (later this will be from user config)
  const entryPoint = resolve('./test-hello.ts');
  
  appProcess = spawn({
    cmd: ['bun', 'run', entryPoint],
    stdout: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  });
  
  console.log('✅ App started (PID:', appProcess.pid, ')\n');
}

async function main() {
  console.log('👀 Watching for changes...\n');
  
  // Start initial app
  await startApp();
  
  // Watch for changes in lib/ and test files
  const watcher = watch('.', { recursive: true }, async (event, filename) => {
    if (!filename) return;
    
    // Watch TypeScript files in lib/ or test files
    if (
      (filename.includes('lib/') && filename.endsWith('.ts')) ||
      (filename.includes('test-') && filename.endsWith('.ts')) ||
      (filename.includes('examples/') && filename.endsWith('.ts'))
    ) {
      console.log(`\n📝 Changed: ${filename}`);
      await startApp();
    }
  });
  
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

main().catch(console.error);
