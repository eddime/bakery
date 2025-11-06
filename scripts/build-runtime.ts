#!/usr/bin/env bun
// ⚡ Zippy Runtime Builder
// Builds pre-compiled runtime bundles for all platforms

import { $ } from 'bun';

console.log('⚡ Building Zippy Runtime Bundles\n');

const TARGETS = [
  'linux-x64',
  'linux-arm64',
  'darwin-x64',
  'darwin-arm64',
  'windows-x64',
];

async function main() {
  console.log('🏗️  Building runtime bundles for all platforms...\n');
  
  for (const target of TARGETS) {
    console.log(`📦 Building runtime for ${target}...`);
    
    // Build runtime
    await $`bun run build --target ${target} --release`;
    
    // Package runtime
    const runtimeDir = `runtimes/${target}`;
    await $`mkdir -p ${runtimeDir}`;
    
    // Copy runtime binary
    const ext = target.includes('windows') ? '.exe' : '';
    await $`cp dist/bakery-${target}${ext} ${runtimeDir}/bakery-runtime${ext}`;
    
    // Copy WebView libraries
    if (target.includes('linux')) {
      await $`cp deps/webview-prebuilt/*.so ${runtimeDir}/ || true`;
    } else if (target.includes('darwin')) {
      await $`cp deps/webview-prebuilt/*.dylib ${runtimeDir}/ || true`;
    } else if (target.includes('windows')) {
      await $`cp deps/webview-prebuilt/*.dll ${runtimeDir}/ || true`;
    }
    
    // Create manifest
    const manifest = {
      target,
      version: '0.1.0',
      build_date: new Date().toISOString(),
      files: await getFiles(runtimeDir),
    };
    
    await Bun.write(
      `${runtimeDir}/manifest.json`,
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`  ✅ ${target} runtime bundle complete`);
  }
  
  console.log('\n✅ All runtime bundles built successfully!');
  console.log('📦 Bundles saved to: ./runtimes/');
}

async function getFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Bun.glob('*').scan(dir)) {
    files.push(entry);
  }
  return files;
}

main().catch(console.error);

