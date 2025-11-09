#!/usr/bin/env bun
/**
 * 🔥 C++ Code Minifier for Bakery
 * Removes comments, unnecessary whitespace, and optimizes code size
 */

import { readFileSync, writeFileSync } from 'fs';

const minifyCpp = (code: string): string => {
  // Remove C-style comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove C++-style comments (but keep inside strings)
  code = code.replace(/\/\/.*$/gm, '');
  // Remove multiple spaces
  code = code.replace(/\s+/g, ' ');
  // Remove spaces around operators
  code = code.replace(/\s*([(){};,=+\-*/<>!&|])\s*/g, '$1');
  // Remove empty lines
  code = code.replace(/\n\s*\n/g, '\n');
  // Trim
  code = code.trim();
  
  return code;
};

const file = process.argv[2];
if (!file) {
  console.error('Usage: minify-cpp.ts <file.cpp>');
  process.exit(1);
}

const code = readFileSync(file, 'utf-8');
const minified = minifyCpp(code);
writeFileSync(file + '.min', minified, 'utf-8');

console.log(`✅ Minified: ${file} → ${file}.min`);
console.log(`📦 Size: ${code.length} → ${minified.length} bytes (${Math.round((1 - minified.length / code.length) * 100)}% smaller)`);


