#!/usr/bin/env bun
/**
 *  Gemcore Dev Server
 * Ultra-fast development server (no compilation needed!)
 * 
 * Features:
 * - Instant startup (<50ms)
 * - Hot reload ready
 * - Serves files directly from src/
 * - No asset embedding needed
 */

import { existsSync } from 'fs';
import { join } from 'path';

const projectDir = process.argv[2] || process.cwd();
const srcDir = join(projectDir, 'src');
const assetsDir = join(projectDir, 'assets');
const nodeModulesDir = join(projectDir, 'node_modules');

// Load gemcore.config.js to get entrypoint
let entrypoint = 'index.html';
const configPath = join(projectDir, 'gemcore.config.js');
if (existsSync(configPath)) {
  try {
    const config = await import(configPath);
    entrypoint = config.default?.app?.entrypoint || 'index.html';
    // Remove 'src/' prefix if present
    if (entrypoint.startsWith('src/')) {
      entrypoint = entrypoint.substring(4);
    }
  } catch (err) {
    console.warn('  Could not load gemcore.config.js, using default entrypoint');
  }
}

console.log(' Gemcore Dev Server');
console.log('');
console.log(' Project:', projectDir);
console.log(' Serving:', srcDir);
console.log(' Entrypoint:', entrypoint);
console.log('');

const server = Bun.serve({
  port: 8765,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === '/' ? `/${entrypoint}` : url.pathname;
    
    // Remove leading slash
    if (path.startsWith('/')) path = path.substring(1);
    
    // Try multiple locations
    let fullPath: string | null = null;
    
    // 1. Try src/
    let testPath = join(srcDir, path);
    if (existsSync(testPath)) {
      fullPath = testPath;
    }
    
    // 2. Try assets/
    if (!fullPath) {
      testPath = join(assetsDir, path);
      if (existsSync(testPath)) {
        fullPath = testPath;
      }
    }
    
    // 3. Try node_modules/ (for phaser.js etc)
    if (!fullPath && path.includes('phaser')) {
      testPath = join(nodeModulesDir, 'phaser', 'dist', path);
      if (existsSync(testPath)) {
        fullPath = testPath;
      }
    }
    
    if (!fullPath) {
      console.log(' Not found:', path);
      return new Response('Not Found: ' + path, { status: 404 });
    }
    
    console.log(' Serving:', path);
    
    try {
      const file = Bun.file(fullPath);
      return new Response(file);
    } catch (error) {
      console.error(' Error:', error);
      return new Response('Error', { status: 500 });
    }
  },
});

console.log(` Dev server: http://localhost:${server.port}`);
console.log(' Ready! (Press Ctrl+C to stop)');
console.log('');

// Keep process alive
process.on('SIGTERM', () => {
  console.log('\n Dev server shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n Dev server shutting down...');
  process.exit(0);
});

// Prevent process from exiting
await new Promise(() => {});
