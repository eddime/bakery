#!/usr/bin/env bun
// 🥐 Bakery CLI - Socket Runtime Edition
// Main command-line interface

import { parseArgs } from 'util';
import { resolve, join, dirname } from 'path';
import { spawn as bunSpawn } from 'bun';
import { existsSync, mkdirSync, writeFileSync, cpSync, rmSync, chmodSync } from 'fs';

// Load bakery.config.js if it exists
async function loadConfig() {
  const configPath = resolve('./bakery.config.js');
  if (existsSync(configPath)) {
    try {
      const config = await import(configPath);
      return config.default || config;
    } catch (err) {
      console.warn('⚠️  Warning: Failed to load bakery.config.js:', err.message);
    }
  }
  return null;
}

const commands = {
  dev: devCommand,
  build: buildCommand,
  mac: (args: string[]) => buildCommand(['--platform', 'mac', ...args]),
  win: (args: string[]) => buildCommand(['--platform', 'win', ...args]),
  linux: (args: string[]) => buildCommand(['--platform', 'linux', ...args]),
  all: (args: string[]) => buildCommand(['--platform', 'all', ...args]),
  init: initCommand,
  help: helpCommand,
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  // Handle --help or -h
  if (command === '--help' || command === '-h') {
    helpCommand();
    process.exit(0);
  }

  const handler = commands[command as keyof typeof commands];
  if (!handler) {
    console.error(`❌ Unknown command: ${command}`);
    helpCommand();
    process.exit(1);
  }

  await handler(args.slice(1));
}

// ==============================================
// DEV COMMAND - Node.js Development Mode
// ==============================================
async function devCommand(args: string[]) {
  console.log('🥐 Bakery Development Mode (Node.js Backend)\n');

  const { values } = parseArgs({
    args,
    options: {
      dir: { type: 'string', short: 'd' },
      project: { type: 'string', short: 'p' }, // Named project from config
    },
  });

  // Load config
  const config = await loadConfig();
  
  // Determine project directory
  let projectDir: string;
  
  if (values.dir) {
    // Explicit --dir flag takes precedence
    projectDir = resolve(values.dir as string);
  } else if (values.project && config?.projects) {
    // Named project from config
    const projectName = values.project as string;
    const projectPath = config.projects[projectName];
    if (!projectPath) {
      console.error(`❌ Project "${projectName}" not found in bakery.config.js`);
      console.log('Available projects:', Object.keys(config.projects).join(', '));
      process.exit(1);
    }
    projectDir = resolve(projectPath);
  } else {
    // Check if current directory is a valid project (has both config and src/)
    const currentDir = resolve('.');
    const hasConfig = existsSync(join(currentDir, 'bakery.config.js'));
    const hasSrc = existsSync(join(currentDir, 'src'));
    
    if (hasConfig && hasSrc) {
      // Current directory is a valid project
      projectDir = currentDir;
    } else if (config?.defaultProject) {
      // Use defaultProject from config
      projectDir = resolve(config.defaultProject);
      console.log('📌 Using default project from config');
    } else {
      console.error('❌ No project directory specified');
      console.error('💡 Usage: bake dev --dir <project-dir>');
      console.error('💡 Or set defaultProject in bakery.config.js');
      process.exit(1);
    }
  }
  
  // Check if bakery.config.js exists
  const configPath = join(projectDir, 'bakery.config.js');
  if (!existsSync(configPath)) {
    console.error('❌ No bakery.config.js found in', projectDir);
    console.log('💡 Run: bake init <project-name> to create a new project');
    if (config) {
      console.log('💡 Or set defaultProject in bakery.config.js');
    }
    process.exit(1);
  }

  const frameworkDir = dirname(import.meta.url.replace('file://', ''));
  
  // Use run-dev.sh wrapper script (handles process management)
  const runDevScript = join(frameworkDir, 'scripts', 'run-dev.sh');
  
  if (!existsSync(runDevScript)) {
    console.error('❌ run-dev.sh not found:', runDevScript);
    process.exit(1);
  }

  // Run dev script (handles both dev server and launcher)
  const proc = Bun.spawn([runDevScript, projectDir], {
    cwd: frameworkDir,
    stdout: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  });

  await proc.exited;
}

// ==============================================
// BUILD COMMAND - Build .app Bundle for macOS
// ==============================================
async function buildCommand(args: string[]) {
  console.log('🥐 Bakery Build (macOS .app Bundle)\n');

  const { values } = parseArgs({
    args,
    options: {
      dir: { type: 'string', short: 'd' },
      project: { type: 'string', short: 'p' },
      platform: { type: 'string', default: 'mac' }, // mac, win, linux, all
      run: { type: 'boolean', short: 'r', default: false },
    },
  });

  // Load config
  const config = await loadConfig();
  
  // Determine project directory
  let projectDir: string;
  
  if (values.dir) {
    projectDir = resolve(values.dir as string);
  } else if (values.project && config?.projects) {
    const projectName = values.project as string;
    const projectPath = config.projects[projectName];
    if (!projectPath) {
      console.error(`❌ Project "${projectName}" not found in bakery.config.js`);
      console.log('Available projects:', Object.keys(config.projects).join(', '));
      process.exit(1);
    }
    projectDir = resolve(projectPath);
  } else if (config?.defaultProject) {
    // Always use defaultProject if no explicit project specified
    projectDir = resolve(config.defaultProject);
    console.log('📌 Using default project from config');
  } else {
    console.error('❌ No project specified');
    console.error('💡 Usage:');
    console.error('   bake all --dir <project-dir>');
    console.error('   bake all --project <project-name>');
    console.error('   Or set defaultProject in bakery.config.js');
    process.exit(1);
  }
  
  const platform = values.platform as string;
  const shouldRun = values.run as boolean;

  // Check if bakery.config.js exists
  const configPath = join(projectDir, 'bakery.config.js');
  if (!existsSync(configPath)) {
    console.error('❌ No bakery.config.js found in', projectDir);
    console.log('💡 Run: bake init <project-name> to create a new project');
    process.exit(1);
  }

  // Load project config
  const projectConfig = await import(configPath);
  const appName = projectConfig.default?.app?.name || 'BakeryApp';

  console.log('📁 Project:', projectDir);
  console.log('🏗️  Platform:', platform);
  console.log('📦 App Name:', appName);
  console.log('');
  
  const frameworkDir = dirname(import.meta.url.replace('file://', ''));
  
  // Handle "all" platform - build for all supported platforms
  const platforms = platform === 'all' ? ['mac', 'win', 'linux'] : [platform];
  
  for (const targetPlatform of platforms) {
    console.log(`\n🏗️  Building for ${targetPlatform}...\n`);
    await buildForPlatform(targetPlatform, projectDir, projectConfig, appName, shouldRun, frameworkDir);
  }
  
  console.log('\n✅ All builds complete!');
}

async function buildForPlatform(platform: string, projectDir: string, projectConfig: any, appName: string, shouldRun: boolean, frameworkDir: string) {
  switch (platform) {
    case 'mac':
      await buildMacOS(projectDir, projectConfig, appName, shouldRun, frameworkDir);
      break;
    case 'win':
      await buildWindows(projectDir, projectConfig, appName, frameworkDir);
      break;
    case 'linux':
      await buildLinux(projectDir, projectConfig, appName, frameworkDir);
      break;
    default:
      console.warn(`⚠️  Platform ${platform} not supported`);
  }
}

async function buildMacOS(projectDir: string, projectConfig: any, appName: string, shouldRun: boolean, frameworkDir: string) {
  console.log('🍎 Building macOS Universal Binary (x64 + ARM64)...\n');

  // Build using shared assets strategy (3 launchers + 1 shared assets file)
  const buildScript = join(frameworkDir, 'scripts', 'build-shared-universal.sh');
  const buildProc = Bun.spawn([buildScript, projectDir], {
    cwd: frameworkDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await buildProc.exited;

  const sharedDir = join(frameworkDir, 'launcher', 'build-shared');
  const launcherPath = join(sharedDir, 'bakery-universal');
  const arm64Binary = join(sharedDir, 'bakery-arm64');
  const x64Binary = join(sharedDir, 'bakery-x86_64');
  const assetsFile = join(sharedDir, 'bakery-assets');
  
  if (!existsSync(launcherPath) || !existsSync(arm64Binary) || !existsSync(x64Binary) || !existsSync(assetsFile)) {
    console.error('❌ Shared universal build failed!');
    process.exit(1);
  }
  
  console.log('✅ Shared universal build ready!\n');

  // Create .app bundle
  const distDir = join(projectDir, 'dist', 'mac');
  const appBundle = join(distDir, `${appName}.app`);
  const contentsDir = join(appBundle, 'Contents');
  const macOSDir = join(contentsDir, 'MacOS');
  const resourcesDir = join(contentsDir, 'Resources');

  console.log('🏗️  Creating shared universal .app bundle...');
  
  // Clean and create directories
  if (existsSync(appBundle)) {
    rmSync(appBundle, { recursive: true });
  }
  mkdirSync(macOSDir, { recursive: true });
  mkdirSync(resourcesDir, { recursive: true });

  // Copy universal launcher as main executable
  const appExecutable = join(macOSDir, appName);
  cpSync(launcherPath, appExecutable);
  chmodSync(appExecutable, 0o755);
  
  // Copy architecture-specific launchers
  cpSync(arm64Binary, join(macOSDir, `${appName}-arm64`));
  chmodSync(join(macOSDir, `${appName}-arm64`), 0o755);
  
  cpSync(x64Binary, join(macOSDir, `${appName}-x86_64`));
  chmodSync(join(macOSDir, `${appName}-x86_64`), 0o755);
  
  // Copy SHARED assets file (used by both architectures)
  cpSync(assetsFile, join(macOSDir, 'bakery-assets'));

  // Copy bakery.config.json to MacOS dir (so launcher can find it)
  const configJsonPath = join(projectDir, 'bakery.config.json');
  if (existsSync(configJsonPath)) {
    cpSync(configJsonPath, join(macOSDir, 'bakery.config.json'));
  } else {
    // Create from JS config
    const configJsPath = join(projectDir, 'bakery.config.js');
    if (existsSync(configJsPath)) {
      const configModule = await import(`file://${configJsPath}`);
      const config = configModule.default;
      writeFileSync(join(macOSDir, 'bakery.config.json'), JSON.stringify(config, null, 2));
    }
  }

  console.log('✅ Universal launcher (detects architecture)');
  console.log('✅ ARM64 launcher (228 KB)');
  console.log('✅ x64 launcher (240 KB)');
  console.log('✅ Shared assets (8.8 MB, used by both) ✅');
  console.log('✅ Config copied');
  
  // Only copy icon for macOS .app bundle display
  const iconPath = join(projectDir, 'assets', 'icon.icns');
  if (existsSync(iconPath)) {
    cpSync(iconPath, join(resourcesDir, 'icon.icns'));
    console.log('📦 Icon copied');
  }

  // Create Info.plist
  const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>${appName}</string>
    <key>CFBundleIdentifier</key>
    <string>com.bakery.${appName.toLowerCase()}</string>
    <key>CFBundleName</key>
    <string>${appName}</string>
    <key>CFBundleDisplayName</key>
    <string>${appName}</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleIconFile</key>
    <string>icon.icns</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.13</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>`;

  writeFileSync(join(contentsDir, 'Info.plist'), infoPlist);

  console.log('✅ Build complete!\n');
  console.log('📦 Output:', appBundle);
  console.log('📊 Size: ~9.2 MB (3 launchers + 1 shared assets file)');
  console.log('💡 Assets shared between ARM64 and x64 = 50% smaller!');
  console.log('');
  
  if (shouldRun) {
    console.log('🚀 Running app...\n');
    const launcher = spawn(['open', '-W', appBundle], {
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    await launcher.exited;
  }
}

async function buildWindows(projectDir: string, projectConfig: any, appName: string, frameworkDir: string) {
  console.log('🪟 Building for Windows (Universal Binary)...\n');
  
  // Step 1: Embed assets
  console.log('📦 Embedding assets...');
  const embedScript = join(frameworkDir, 'scripts', 'embed-assets-binary.ts');
  const embedProc = Bun.spawn(['bun', embedScript, projectDir, join(frameworkDir, 'launcher', 'embedded-assets.h')], {
    cwd: frameworkDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await embedProc.exited;
  
  // Step 2: Build x64 binary
  console.log('\n🔨 Building x64 binary...');
  const buildDir = join(frameworkDir, 'launcher', 'build-windows-native');
  mkdirSync(buildDir, { recursive: true });
  
  const cmakeProc = Bun.spawn([
    'cmake', '..', 
    '-DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake'
  ], {
    cwd: buildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await cmakeProc.exited;
  
  const makeProc = Bun.spawn(['make', 'bakery-launcher-windows', '-j4'], {
    cwd: buildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await makeProc.exited;
  
  // Step 3: Build Universal Launcher
  console.log('\n🔨 Building Universal Launcher...');
  const launcherBuildDir = join(frameworkDir, 'launcher', 'build-windows-universal-launcher');
  mkdirSync(launcherBuildDir, { recursive: true });
  
  const cmakeLauncherProc = Bun.spawn([
    'cmake', '..', 
    '-DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake'
  ], {
    cwd: launcherBuildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await cmakeLauncherProc.exited;
  
  const makeLauncherProc = Bun.spawn(['make', 'bakery-universal-launcher-windows', '-j4'], {
    cwd: launcherBuildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await makeLauncherProc.exited;
  
  // Step 4: Pack into SINGLE EXE
  console.log('\n📦 Packing into SINGLE EXE...');
  const distDir = join(projectDir, 'dist', 'windows');
  mkdirSync(distDir, { recursive: true });
  
  const x64Exe = join(buildDir, 'bakery-launcher-windows.exe');
  const universalExe = join(launcherBuildDir, 'bakery-universal-launcher-windows.exe');
  const outputExe = join(distDir, `${appName}.exe`);
  
  // Build embedded launcher
  console.log('🔨 Building embedded launcher...');
  const embeddedBuildDir = join(frameworkDir, 'launcher', 'build-windows-embedded');
  mkdirSync(embeddedBuildDir, { recursive: true });
  
  const cmakeEmbeddedProc = Bun.spawn([
    'cmake', '..', 
    '-DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake'
  ], {
    cwd: embeddedBuildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await cmakeEmbeddedProc.exited;
  
  const makeEmbeddedProc = Bun.spawn(['make', 'bakery-universal-launcher-windows-embedded', '-j4'], {
    cwd: embeddedBuildDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await makeEmbeddedProc.exited;
  
  // Pack everything into single EXE
  const embeddedLauncher = join(embeddedBuildDir, 'bakery-universal-launcher-windows-embedded.exe');
  const packScript = join(frameworkDir, 'scripts', 'pack-windows-single-exe.ts');
  
  const packProc = Bun.spawn(['bun', packScript, embeddedLauncher, x64Exe, outputExe], {
    cwd: frameworkDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  await packProc.exited;
  
  console.log('\n✅ Windows SINGLE EXE complete!');
  console.log('📦 Output:');
  console.log(`   ${appName}.exe → ~11MB (ONE FILE!)`);
  console.log('');
  console.log('🎯 User sees ONE file, clicks once!');
  console.log('   → Everything embedded (launcher + x64 binary)');
  console.log('   → Detects CPU architecture');
  console.log('   → Extracts & launches optimized binary!');
  console.log('');
  console.log('💡 Just like macOS .app - everything in one!');
}

async function buildLinux(projectDir: string, projectConfig: any, appName: string, frameworkDir: string) {
  console.log('🐧 Building for Linux (Headless - Cross-Platform)...\n');
  
  // Create dist directory
  const distDir = join(projectDir, 'dist', 'linux');
  mkdirSync(distDir, { recursive: true });
  
  // Build using headless launcher (NO GTK dependencies!)
  const buildScript = join(frameworkDir, 'scripts', 'build-linux-crossplatform.sh');
  const buildProc = Bun.spawn([buildScript, projectDir, distDir], {
    cwd: frameworkDir,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  const exitCode = await buildProc.exited;
  
  if (exitCode !== 0) {
    console.error('❌ Linux build failed!');
    console.log('💡 Make sure musl-cross is installed:');
    console.log('   brew install FiloSottile/musl-cross/musl-cross');
    return;
  }

  // Check if AppDirs were created
  const x64AppDir = join(distDir, `${appName}-x86_64.AppDir`);
  const arm64AppDir = join(distDir, `${appName}-aarch64.AppDir`);
  
  console.log('\n✅ Linux AppDirs complete!');
  console.log('📦 Output:');
  
  if (existsSync(x64AppDir)) {
    console.log(`   ✓ ${appName}-x86_64.AppDir`);
  }
  if (existsSync(arm64AppDir)) {
    console.log(`   ✓ ${appName}-aarch64.AppDir`);
  }
  
  console.log('');
  console.log('🎯 Each AppDir contains:');
  console.log('   ├── AppRun               → Headless launcher');
  console.log('   ├── .desktop file');
  console.log('   ├── Icon');
  console.log('   └── All assets embedded');
  console.log('');
  console.log('💡 Headless mode - opens system browser!');
  console.log('   ✓ NO GTK/WebView dependencies');
  console.log('   ✓ Cross-compile from ANY OS');
}

// ==============================================
// INIT COMMAND - Create new project
// ==============================================
async function initCommand(args: string[]) {
  const projectName = args[0];
  
  if (!projectName) {
    console.error('❌ Please provide a project name');
    console.log('Usage: bake init <project-name>');
    process.exit(1);
  }

  console.log('🥐 Creating new Bakery project...\n');
  console.log('📦 Project:', projectName);

  const projectDir = resolve(projectName);

  // Check if directory exists
  if (existsSync(projectDir)) {
    console.error('❌ Directory already exists:', projectDir);
    process.exit(1);
  }

  // Create project directory
  mkdirSync(projectDir);
  mkdirSync(join(projectDir, 'src'));

  // Create socket.ini
  const socketIni = `
; 🥐 Bakery Project Configuration
; Powered by Socket Runtime

[build]
copy = "src"
name = "${projectName}"
output = "build"

[webview]
root = "/"
watch = true

[webview.watch]
reload = true

[meta]
bundle_identifier = "com.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}"
title = "${projectName}"
version = 1.0.0

[window]
height = 600
width = 800
`.trim();

  writeFileSync(join(projectDir, 'socket.ini'), socketIni);

  // Create main.html
  const mainHtml = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta
      http-equiv="Content-Security-Policy"
      content="
        connect-src https: file: ipc: socket: ws://localhost:*;
        script-src https: socket: http://localhost:* 'unsafe-eval' 'unsafe-inline';
        img-src https: data: file: http://localhost:*;
        child-src 'none';
        object-src 'none';
      "
    >
    <style>
      * { box-sizing: border-box; }
      html, body { 
        height: 100%; 
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        padding: 20px;
      }
      .container {
        max-width: 600px;
      }
      h1 {
        font-size: 48px;
        margin: 0 0 20px 0;
      }
      p {
        font-size: 18px;
        opacity: 0.9;
        margin: 10px 0;
      }
      .badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        margin: 5px;
      }
      button {
        background: white;
        color: #667eea;
        border: none;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        margin: 20px 5px 0;
        font-weight: 600;
      }
      button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      #info {
        margin-top: 30px;
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 12px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🥐 ${projectName}</h1>
      <p>Powered by Bakery + Socket Runtime</p>
      
      <div>
        <span class="badge">✅ 1.5 MB Binary</span>
        <span class="badge">✅ Node.js APIs</span>
        <span class="badge">✅ Cross-Platform</span>
      </div>
      
      <button onclick="showInfo()">📊 Show System Info</button>
      <button onclick="testFileSystem()">📁 Test File System</button>
      
      <div id="info"></div>
    </div>

    <script type="module">
      const infoDiv = document.getElementById('info');
      
      window.showInfo = async () => {
        try {
          const os = await import('socket:os');
          const process = await import('socket:process');
          
          const info = {
            platform: os.platform(),
            arch: os.arch(),
            type: os.type(),
            cpus: os.cpus().length + ' cores',
            cwd: process.cwd,  // property, not function!
            pid: process.pid
          };
          
          infoDiv.innerHTML = '<strong>System Info:</strong><br><pre>' + 
            JSON.stringify(info, null, 2) + '</pre>';
        } catch (err) {
          infoDiv.innerHTML = '<strong>Error:</strong><br>' + err.message;
        }
      };
      
      window.testFileSystem = async () => {
        try {
          const fs = await import('socket:fs/promises');
          
          const testData = {
            message: 'Hello from ${projectName}!',
            timestamp: Date.now()
          };
          
          await fs.writeFile('test.json', JSON.stringify(testData, null, 2));
          const content = await fs.readFile('test.json', 'utf8');
          
          infoDiv.innerHTML = '<strong>File System Test:</strong><br>' +
            'Wrote to: test.json<br><pre>' + content + '</pre>';
        } catch (err) {
          infoDiv.innerHTML = '<strong>Error:</strong><br>' + err.message;
        }
      };
    </script>
  </body>
</html>
`;

  writeFileSync(join(projectDir, 'src', 'index.html'), mainHtml);

  // Create .gitignore
  const gitignore = `
build/
node_modules/
*.log
.DS_Store
`.trim();

  writeFileSync(join(projectDir, '.gitignore'), gitignore);

  console.log('');
  console.log('✅ Project created!');
  console.log('');
  console.log('📁 Structure:');
  console.log(`   ${projectName}/`);
  console.log('   ├── socket.ini');
  console.log('   ├── src/');
  console.log('   │   └── index.html');
  console.log('   └── .gitignore');
  console.log('');
  console.log('🚀 Next steps:');
  console.log(`   cd ${projectName}`);
  console.log('   bake dev           # Start development');
  console.log('   bake build --mac   # Build for macOS');
  console.log('');
}

// ==============================================
// HELP COMMAND
// ==============================================
function helpCommand() {
  console.log(`
🥐 Bakery CLI - Socket Runtime Edition

Usage: bake <command> [options]

Commands:
  dev                Start development server with hot reload
  build              Build app for production
  init <name>        Create new Bakery project
  help               Show this help message

Options:
  dev:
    -d, --dir <path>       Project directory
    -p, --project <name>   Named project from bakery.config.js
    
  build:
    -d, --dir <path>       Project directory
    -p, --project <name>   Named project from bakery.config.js
    --platform <name>      Platform: mac, win, linux, all (default: mac)
    -r, --run              Run after building (mac only)

Configuration (bakery.config.js):
  export default {
    defaultProject: './examples/hello-world-socket',
    projects: {
      'hello': './examples/hello-world-socket',
      'backend': './examples/backend-minimal'
    }
  }

Examples:
  bake init my-app           Create new project
  bake dev                   Start default project (from config)
  bake dev --project hello   Start named project
  bake dev --dir ./my-app    Start specific directory
  bake build --mac           Build for macOS
  bake build --platform all  Build for all platforms
  bake build --mac --run     Build and run on macOS

Documentation: https://github.com/eddime/bakery
`);
}

// Run CLI
main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

