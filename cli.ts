#!/usr/bin/env bun
// 🥐 Bakery CLI - Socket Runtime Edition
// Main command-line interface

import { parseArgs } from 'util';
import { resolve, join, dirname } from 'path';
import { spawn } from 'bun';
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
// DEV COMMAND - Hot Reload Development
// ==============================================
async function devCommand(args: string[]) {
  console.log('🥐 Bakery Development Mode (Native WebView)\n');

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
    // Check if current directory has bakery.config.js (user is in a project)
    const currentDir = resolve('.');
    if (existsSync(join(currentDir, 'bakery.config.js'))) {
      projectDir = currentDir;
    } else if (config?.defaultProject) {
      // Use defaultProject from config
      projectDir = resolve(config.defaultProject);
      console.log('📌 Using default project from config');
    } else {
      // Fall back to current directory
      projectDir = currentDir;
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

  console.log('📁 Project:', projectDir);
  console.log('🔥 Starting development environment...\n');

  const frameworkDir = dirname(import.meta.url.replace('file://', ''));
  
  // 1. Start dev server
  console.log('🌐 Starting dev server on http://localhost:3000...');
  const devServerScript = join(frameworkDir, 'scripts', 'dev-server.ts');
  const devServer = spawn(['bun', 'run', devServerScript, projectDir, '3000'], {
    cwd: frameworkDir,
    stdio: ['ignore', 'inherit', 'inherit'],
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 2. Start native WebView launcher
  console.log('📱 Opening app in native WebView...\n');
  const launcherPath = join(frameworkDir, 'launcher', 'build', 'bakery-dev');
  
  if (!existsSync(launcherPath)) {
    console.error('❌ bakery-dev not found:', launcherPath);
    console.error('💡 Please build it first:');
    console.error('   cd launcher/build && cmake .. && cmake --build .');
    devServer.kill();
    process.exit(1);
  }

  const launcher = spawn([launcherPath, projectDir], {
    cwd: frameworkDir,
    stdio: ['inherit', 'inherit', 'inherit'],
  });

  // Cleanup when app closes
  launcher.exited.then(() => {
    console.log('\n🧹 Shutting down dev server...');
    devServer.kill();
  });

  await launcher.exited;
}

// ==============================================
// BUILD COMMAND - Build for platforms
// ==============================================
async function buildCommand(args: string[]) {
  console.log('🥐 Bakery Build (Native WebView)\n');

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
    // Check if current directory has socket.ini (user is in a project)
    const currentDir = resolve('.');
    if (existsSync(join(currentDir, 'socket.ini'))) {
      projectDir = currentDir;
    } else if (config?.defaultProject) {
      // Use defaultProject from config
      projectDir = resolve(config.defaultProject);
      console.log('📌 Using default project from config');
    } else {
      // Fall back to current directory
      projectDir = currentDir;
    }
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

  console.log('📁 Project:', projectDir);
  console.log('🏗️  Platform:', platform);
  console.log('');
  
  // For now, just use the native launcher (no build needed!)
  // In the future, we can embed assets and compile to single binary
  
  console.log('✅ Native launcher ready!');
  console.log('💡 Run with: bake dev\n');
  
  if (shouldRun) {
    // Get path to bakery-simple launcher
    const frameworkDir = dirname(import.meta.url.replace('file://', ''));
    const launcherPath = join(frameworkDir, 'launcher', 'build', 'bakery-simple');
    
    if (!existsSync(launcherPath)) {
      console.error('❌ bakery-simple not found:', launcherPath);
      console.error('💡 Please build it first:');
      console.error('   cd launcher/build && cmake .. && cmake --build .');
      process.exit(1);
    }

    console.log('🚀 Running app...\n');
    
    const launcher = spawn([launcherPath, projectDir], {
      cwd: frameworkDir,
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    await launcher.exited;
  }
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

