#!/usr/bin/env bun
/**
 * 🥐 Bakery Build Script (Postject Edition)
 * Embeds Socket Runtime using postject for direct memory access
 */

import { spawn } from 'child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, chmodSync } from 'fs';
import { join, basename } from 'path';

const ROOT = join(import.meta.dir, '..');
const LAUNCHER_DIR = join(ROOT, 'launcher');
const BUILD_DIR = join(LAUNCHER_DIR, 'build');
const DIST_DIR = join(ROOT, 'dist');

interface EmbeddedFile {
  path: string;
  data: string; // Base64 encoded
  size: number;
}

function readDirectoryRecursive(dir: string, base: string = ''): EmbeddedFile[] {
  let files: EmbeddedFile[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(base, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(readDirectoryRecursive(fullPath, relativePath));
    } else if (entry.isFile()) {
      const content = readFileSync(fullPath);
      files.push({
        path: relativePath,
        data: content.toString('base64'),
        size: content.length
      });
    }
  }
  return files;
}

function runCommand(cmd: string, args: string[], cwd?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Running: ${cmd} ${args.join(' ')}`);
    const proc = spawn(cmd, args, { 
      cwd: cwd || process.cwd(),
      stdio: 'inherit',
      shell: true
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  console.log('🥐 Bakery Build (Postject Edition)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // 1. Determine project directory (from env or default)
  const projectDir = process.env.BAKERY_PROJECT_DIR || join(ROOT, 'examples/hello-world-socket');
  
  if (!existsSync(projectDir)) {
    throw new Error(`Project directory not found: ${projectDir}`);
  }
  
  console.log(`📁 Project: ${projectDir}`);
  
  // 2. Generate socket.ini from bakery.config.js
  console.log('\n🔧 Generating socket.ini from bakery.config.js...');
  const generateScript = join(ROOT, 'scripts/generate-socket-ini.ts');
  await runCommand('bun', ['run', generateScript, projectDir]);
  
  // 3. Build Socket Runtime app
  console.log('\n📦 Building Socket Runtime app...');
  await runCommand('ssc', ['build', '-o'], projectDir);
  
  const buildDir = join(projectDir, 'build/mac');
  const appFiles = readdirSync(buildDir).filter(f => f.endsWith('.app'));
  if (appFiles.length === 0) {
    throw new Error('No .app bundle found in build directory!');
  }
  
  const appPath = join(buildDir, appFiles[0]);
  console.log(`✅ Built: ${appPath}`);
  
  // 2. Load bakery.config.js to get window title and icon
  const configPath = join(projectDir, 'bakery.config.js');
  let windowTitle = 'Bakery App';
  let macIcon = null;
  if (existsSync(configPath)) {
    try {
      const config = await import(configPath);
      windowTitle = config.default?.window?.title || windowTitle;
      macIcon = config.default?.build?.macos?.icon || null;
    } catch (err) {
      console.warn('⚠️  Could not load config from bakery.config.js');
    }
  }
  
  // 3. Update Info.plist with correct title
  const plistPath = join(appPath, 'Contents/Info.plist');
  let plistContent = readFileSync(plistPath, 'utf8');
  
  // Replace CFBundleDisplayName and CFBundleName with our title
  plistContent = plistContent.replace(
    /(<key>CFBundleDisplayName<\/key>\s*<string>)(.*?)(<\/string>)/,
    `$1${windowTitle}$3`
  );
  plistContent = plistContent.replace(
    /(<key>CFBundleName<\/key>\s*<string>)(.*?)(<\/string>)/,
    `$1${windowTitle}$3`
  );
  
  // If CFBundleDisplayName doesn't exist, add it
  if (!plistContent.includes('CFBundleDisplayName')) {
    plistContent = plistContent.replace(
      /<\/dict>\s*<\/plist>/,
      `  <key>CFBundleDisplayName</key>\n  <string>${windowTitle}</string>\n</dict>\n</plist>`
    );
  }
  
  // Add icon reference if configured
  if (macIcon) {
    const iconFilename = basename(macIcon);
    const iconPath = join(projectDir, macIcon);
    
    if (existsSync(iconPath)) {
      // Copy icon to Resources folder
      const targetIconPath = join(appPath, 'Contents/Resources', iconFilename);
      const { cpSync } = await import('fs');
      cpSync(iconPath, targetIconPath);
      
      // Update Info.plist with icon reference
      if (!plistContent.includes('CFBundleIconFile')) {
        plistContent = plistContent.replace(
          /<\/dict>\s*<\/plist>/,
          `  <key>CFBundleIconFile</key>\n  <string>${iconFilename}</string>\n</dict>\n</plist>`
        );
      } else {
        plistContent = plistContent.replace(
          /(<key>CFBundleIconFile<\/key>\s*<string>)(.*?)(<\/string>)/,
          `$1${iconFilename}$3`
        );
      }
      
      console.log(`✅ Added app icon: ${macIcon}`);
    } else {
      console.warn(`⚠️  Icon file not found: ${iconPath}`);
    }
  }
  
  writeFileSync(plistPath, plistContent);
  console.log(`✅ Updated window title: ${windowTitle}`);
  
  const binaryNameMatch = plistContent.match(/<key>CFBundleExecutable<\/key>\s*<string>(.*?)<\/string>/);
  if (!binaryNameMatch || !binaryNameMatch[1]) {
    throw new Error('Could not find CFBundleExecutable in Info.plist');
  }
  const binaryName = binaryNameMatch[1];
  const binaryPath = join(appPath, 'Contents/MacOS', binaryName);
  
  console.log(`\n📦 Embedding Socket Runtime binary: ${binaryName}`);
  
  // 3. Read Socket Runtime binary
  const binaryData = readFileSync(binaryPath);
  console.log(`   Size: ${(binaryData.length / 1024 / 1024).toFixed(1)} MB`);
  
  // 4. Read only essential resources (skip socket runtime libs)
  const resourcesPath = join(appPath, 'Contents/Resources');
  console.log(`\n📦 Reading essential resources from: ${resourcesPath}`);
  
  // Embed all resources (Socket Runtime needs them!)
  const resources = readDirectoryRecursive(resourcesPath);
  
  console.log(`   Found ${resources.length} files`);
  
  // 5. Create combined data structure (all in one!)
  const combinedData = {
    version: '1.0.0',
    binaryName: binaryName,
    binaryData: binaryData.toString('base64'),
    binarySize: binaryData.length,
    windowTitle: windowTitle,  // Add window title for launcher to use
    iconFile: macIcon ? basename(macIcon) : null,  // Add icon filename
    resources: resources
  };
  
  const combinedJson = JSON.stringify(combinedData);
  console.log(`\n📊 Combined data size: ${(Buffer.byteLength(combinedJson) / 1024 / 1024).toFixed(1)} MB`);
  
  // 6. Clean old build directory to avoid postject conflicts
  console.log('\n🧹 Cleaning old build...');
  if (existsSync(BUILD_DIR)) {
    const { rmSync } = await import('fs');
    rmSync(BUILD_DIR, { recursive: true, force: true });
    console.log('✅ Old build removed');
  }
  
  // 7. Build C++ launcher
  console.log('\n🔨 Building C++ launcher...');
  mkdirSync(BUILD_DIR, { recursive: true });
  
  await runCommand('cmake', ['..', '-DCMAKE_BUILD_TYPE=Release'], BUILD_DIR);
  await runCommand('cmake', ['--build', '.', '--config', 'Release'], BUILD_DIR);
  
  const launcherPath = join(BUILD_DIR, 'bakery-launcher-postject');
  if (!existsSync(launcherPath)) {
    throw new Error('Launcher binary not found after build!');
  }
  
  console.log(`✅ Built launcher: ${launcherPath}`);
  console.log(`   Size: ${(statSync(launcherPath).size / 1024).toFixed(1)} KB`);
  
  // 8. Embed ALL data with postject (single injection!)
  console.log('\n📦 Embedding all data with postject...');
  const dataFile = join(BUILD_DIR, 'bakery-data.json');
  writeFileSync(dataFile, combinedJson);
  
  await runCommand('npx', [
    'postject',
    launcherPath,
    'BAKERY_DATA',
    dataFile,
    '--sentinel-fuse',
    'POSTJECT_SENTINEL_fce680ab2cc467b6e072b8b5df1996b2'
  ]);
  
  console.log('✅ Embedded all data (single injection)');
  
  // 9. Copy final binary to dist
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }
  
  const finalPath = join(DIST_DIR, 'bakery-postject');
  const finalBinary = readFileSync(launcherPath);
  writeFileSync(finalPath, finalBinary);
  chmodSync(finalPath, 0o755);
  
  const totalSize = statSync(finalPath).size / 1024 / 1024;
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ BUILD COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📦 Final binary: ${finalPath}`);
  console.log(`📊 Total size: ${totalSize.toFixed(1)} MB`);
  console.log(`\n🎉 TRUE Single Binary - NO /tmp extraction!`);
  console.log(`🚀 Run: ${finalPath}\n`);
}

main().catch(err => {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
});

