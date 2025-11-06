#!/usr/bin/env bun
// ⚡ Zippy Development Server
// Runs Zippy app with hot reload

import { watch } from 'fs';
import { $ } from 'bun';

console.log('⚡ Zippy Development Server\n');

let process: any = null;

async function startApp() {
  if (process) {
    console.log('🔄 Restarting app...\n');
    process.kill();
  }
  
  console.log('🚀 Starting app...');
  
  // TODO: Build and run app
  // For now, just a placeholder
  process = Bun.spawn(['echo', 'App would run here'], {
    stdout: 'inherit',
    stderr: 'inherit',
  });
}

async function main() {
  console.log('👀 Watching for changes...\n');
  
  // Start initial build
  await startApp();
  
  // Watch for changes
  const watcher = watch('./src', { recursive: true }, async (event, filename) => {
    if (filename?.endsWith('.ts') || filename?.endsWith('.c') || filename?.endsWith('.h')) {
      console.log(`📝 Changed: ${filename}`);
      await startApp();
    }
  });
  
  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    watcher.close();
    if (process) process.kill();
    Bun.exit(0);
  });
}

main().catch(console.error);

