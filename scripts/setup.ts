#!/usr/bin/env bun
/**
 * Bakery Setup Script
 * 
 * Downloads pre-built binaries for offline usage
 * Run this once after cloning the repository or adding Bakery as a submodule
 */

import { downloadAllBinaries } from './download-prebuilt-binaries.ts';

console.log('');
console.log('🥐 Bakery Setup');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('This will download pre-built binaries for all platforms.');
console.log('After setup, you can build games offline for:');
console.log('  • macOS (Universal: x64 + ARM64)');
console.log('  • Windows (x64)');
console.log('  • Linux (x64 with WebKitGTK)');
console.log('');

try {
  await downloadAllBinaries('latest', false);
  
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Setup complete!');
  console.log('');
  console.log('🎯 Next steps:');
  console.log('   cd examples/stress-test');
  console.log('   bun bake build --platform=all');
  console.log('');
  console.log('💡 Binaries are cached in launcher/prebuilt/');
  console.log('   You can now use Bakery offline!');
  console.log('');
} catch (error) {
  console.error('');
  console.error('❌ Setup failed:', error.message);
  console.error('');
  console.error('💡 You can still use Bakery, but builds will compile locally');
  console.error('   (requires CMake and platform-specific toolchains)');
  console.error('');
  process.exit(1);
}

