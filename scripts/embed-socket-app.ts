#!/usr/bin/env bun
/**
 * 🥐 Bakery - Socket Runtime Single Binary Embedder
 * Takes a Socket Runtime .app and creates a TRUE single binary
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const MARKER = '\n__BAKERY_EMBEDDED_DATA__\n';

interface EmbeddedFile {
  path: string;
  data: string; // Base64
  size: number;
}

function readDirectoryRecursive(dir: string, baseDir: string = dir): EmbeddedFile[] {
  const files: EmbeddedFile[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      files.push(...readDirectoryRecursive(fullPath, baseDir));
    } else if (entry.isFile()) {
      const content = readFileSync(fullPath);
      files.push({
        path: relativePath,
        data: content.toString('base64'),
        size: content.length
      });
      console.log(`  📦 ${relativePath} (${(content.length / 1024).toFixed(1)} KB)`);
    }
  }

  return files;
}

async function embedSocketApp(appPath: string, outputPath: string) {
  console.log(`🥐 Bakery - Creating Single Binary from Socket Runtime App`);
  console.log(`📂 Input: ${appPath}`);
  console.log(`📦 Output: ${outputPath}\n`);

  // 1. Read the original binary
  const binaryPath = join(appPath, 'Contents/MacOS');
  const binaryFiles = readdirSync(binaryPath);
  const mainBinary = binaryFiles.find(f => !f.includes('.dSYM'));
  
  if (!mainBinary) {
    throw new Error('Could not find main binary in .app');
  }

  const binaryFullPath = join(binaryPath, mainBinary);
  const binary = readFileSync(binaryFullPath);
  console.log(`✅ Read binary: ${mainBinary} (${(binary.length / 1024 / 1024).toFixed(1)} MB)`);

  // 2. Embed the Socket Runtime binary itself as a resource
  const binaryData = readFileSync(binaryFullPath);
  const binaryResource: EmbeddedFile = {
    path: mainBinary,
    data: binaryData.toString('base64'),
    size: binaryData.length
  };
  
  // 3. Read all Resources
  const resourcesPath = join(appPath, 'Contents/Resources');
  console.log(`\n📦 Embedding resources from: ${resourcesPath}`);
  const resources = [binaryResource, ...readDirectoryRecursive(resourcesPath)];
  console.log(`\n✅ Found ${resources.length} files to embed (including binary)`);

  // 3. Create embedded data structure
  const embeddedData = {
    version: '1.0.0',
    binaryName: mainBinary,
    resources: resources
  };

  const embeddedJson = JSON.stringify(embeddedData);
  const embeddedJsonSize = Buffer.byteLength(embeddedJson);
  
  console.log(`\n📊 Embedded data: ${(embeddedJsonSize / 1024 / 1024).toFixed(1)} MB`);

  // 4. Read the C++ launcher binary
  const launcherPath = join(import.meta.dir, '../launcher/build/bakery-launcher');
  if (!existsSync(launcherPath)) {
    throw new Error(`Launcher not found: ${launcherPath}\nPlease build it first: cd launcher/build && cmake .. && make`);
  }
  const launcherBinary = readFileSync(launcherPath);
  console.log(`✅ Read launcher: ${(launcherBinary.length / 1024).toFixed(1)} KB`);

  // 5. Append marker + data to launcher (NOT to Socket Runtime binary!)
  const markerBuffer = Buffer.from(MARKER);
  const dataBuffer = Buffer.from(embeddedJson);
  const finalBinary = Buffer.concat([launcherBinary, markerBuffer, dataBuffer]);

  // 6. Write final binary
  const outputDir = join(outputPath, '..');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, finalBinary, { mode: 0o755 });

  const totalSize = finalBinary.length / 1024 / 1024;
  console.log(`\n✅ Created single binary: ${outputPath}`);
  console.log(`📦 Total size: ${totalSize.toFixed(1)} MB`);
  console.log(`\n🎉 Done! You can now run: ${outputPath}`);
}

// CLI
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: bun embed-socket-app.ts <app-path> <output-binary>');
  console.error('Example: bun embed-socket-app.ts dist/my-app.app dist/my-app-standalone');
  process.exit(1);
}

const [appPath, outputPath] = args;
embedSocketApp(appPath, outputPath).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});

