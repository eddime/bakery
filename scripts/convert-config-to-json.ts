#!/usr/bin/env bun
// Convert gemcore.config.js to gemcore.config.json

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const projectDir = process.argv[2];
const outputPath = process.argv[3];

if (!projectDir || !outputPath) {
  console.error('Usage: convert-config-to-json.ts <project_dir> <output_path>');
  process.exit(1);
}

// Try to import the config
const configJsPath = join(projectDir, 'gemcore.config.js');
const configJsonPath = join(projectDir, 'gemcore.config.json');

let config: any;

try {
  // Try JSON first
  if (require('fs').existsSync(configJsonPath)) {
    config = JSON.parse(readFileSync(configJsonPath, 'utf-8'));
  } else {
    // Import JS config
    const imported = await import(configJsPath);
    config = imported.default || imported;
  }
} catch (e) {
  console.error(' Failed to load config:', e);
  process.exit(1);
}

// Normalize config structure
const normalized = {
  window: {
    title: config.window?.title || config.app?.name || 'Gemcore App',
    width: config.window?.width || 800,
    height: config.window?.height || 600,
  },
  entrypoint: config.app?.entrypoint || config.entrypoint || 'index.html',
};

// Write JSON
writeFileSync(outputPath, JSON.stringify(normalized, null, 2));
console.log(' Config converted to JSON');
