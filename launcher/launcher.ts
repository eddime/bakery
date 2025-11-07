#!/usr/bin/env bun
/**
 * 🥐 Bakery Launcher (Bun version)
 * Extracts embedded Socket Runtime and runs it
 * This gets compiled with: bun build --compile launcher.ts
 */

import { spawn } from 'bun';
import { readFileSync, writeFileSync, mkdirSync, chmodSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const MARKER = '\n__BAKERY_EMBEDDED_DATA__\n';

interface EmbeddedData {
  version: string;
  binaryName: string;
  resources: Array<{
    path: string;
    data: string; // Base64
    size: number;
  }>;
}

async function main() {
  console.log('🥐 Bakery Launcher Starting...');
  
  try {
    // 1. Read self (this executable)
    const exePath = Bun.main;
    const content = readFileSync(exePath, 'utf-8');
    
    // 2. Find embedded data
    const markerIndex = content.indexOf(MARKER);
    if (markerIndex === -1) {
      console.error('❌ No embedded data found!');
      process.exit(1);
    }
    
    console.log('✅ Found embedded data');
    
    // 3. Extract JSON
    const jsonData = content.substring(markerIndex + MARKER.length);
    const embedded: EmbeddedData = JSON.parse(jsonData);
    
    console.log(`📦 Extracting ${embedded.resources.length} files...`);
    
    // 4. Create temp directory
    const tmpDir = join(tmpdir(), `bakery-${process.pid}`);
    const resourcesDir = join(tmpDir, 'Resources');
    mkdirSync(resourcesDir, { recursive: true });
    
    console.log(`📂 Temp directory: ${tmpDir}`);
    
    // 5. Extract all resources
    for (const resource of embedded.resources) {
      const filePath = join(resourcesDir, resource.path);
      const fileDir = join(filePath, '..');
      
      // Create directory if needed
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      
      // Decode Base64 and write
      const buffer = Buffer.from(resource.data, 'base64');
      writeFileSync(filePath, buffer);
      
      if (resource.path.length < 50) {
        console.log(`  ✅ ${resource.path}`);
      }
    }
    
    // 6. Extract binary (it's also embedded in resources as the first item)
    const binaryPath = join(tmpDir, embedded.binaryName);
    const binaryResource = embedded.resources.find(r => r.path === embedded.binaryName);
    
    if (!binaryResource) {
      console.error(`❌ Binary not found in embedded data!`);
      process.exit(1);
    }
    
    const binaryBuffer = Buffer.from(binaryResource.data, 'base64');
    writeFileSync(binaryPath, binaryBuffer);
    chmodSync(binaryPath, 0o755);
    
    console.log(`✅ Extracted binary: ${embedded.binaryName}`);
    
    // 7. Set environment variables
    process.env.SOCKET_RESOURCES_PATH = resourcesDir;
    
    // 8. Execute Socket Runtime
    console.log('🚀 Launching Socket Runtime...\n');
    
    const proc = spawn([binaryPath, ...process.argv.slice(2)], {
      stdio: 'inherit',
      env: process.env,
    });
    
    const exitCode = await proc.exited;
    
    // 9. Cleanup (optional - /tmp gets cleaned automatically)
    // rmSync(tmpDir, { recursive: true, force: true });
    
    process.exit(exitCode);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

