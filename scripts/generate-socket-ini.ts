#!/usr/bin/env bun
/**
 * 🥐 Bakery - Generate socket.ini from bakery.config.js
 * Reads bakery.config.js and generates a socket.ini file
 */

import { resolve, join } from 'path';
import { existsSync, writeFileSync } from 'fs';

interface BakeryConfig {
  window?: {
    title?: string;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    resizable?: boolean;
    frameless?: boolean;
    fullscreen?: boolean;
    startFullscreen?: boolean;
    alwaysOnTop?: boolean;
    debug?: boolean;
  };
  app?: {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
  };
  build?: {
    outdir?: string;
    outfile?: string;
    windows?: {
      icon?: string;
    };
    macos?: {
      icon?: string;
    };
    linux?: {
      icon?: string;
    };
  };
}

async function generateSocketIni(projectDir: string) {
  const configPath = join(projectDir, 'bakery.config.js');
  
  // Default config
  let config: BakeryConfig = {
    window: {
      title: 'Bakery App',
      width: 1280,
      height: 720,
      minWidth: 800,
      minHeight: 600,
      resizable: true,
      frameless: false,
      fullscreen: false,
      startFullscreen: false,
      alwaysOnTop: false,
      debug: true,
    },
    app: {
      name: 'bakery-app',
      version: '1.0.0',
      description: 'My Bakery app',
      author: '',
    },
    build: {
      outdir: 'dist',
      outfile: 'bakery-app',
    },
  };
  
  // Load user config if exists
  if (existsSync(configPath)) {
    try {
      const userConfig = await import(configPath);
      config = { ...config, ...userConfig.default };
      console.log('✅ Loaded bakery.config.js');
    } catch (err) {
      console.warn('⚠️  Could not load bakery.config.js, using defaults');
    }
  } else {
    console.log('📝 No bakery.config.js found, using defaults');
  }
  
  // Generate socket.ini content
  const ini = `; 🥐 Bakery Project Configuration
; Auto-generated from bakery.config.js
; Powered by Socket Runtime

[build]
copy = "src"
name = "${config.app?.name || 'bakery-app'}"
output = "build"

[webview]
root = "/"
watch = true

[webview.watch]
reload = true

[meta]
bundle_identifier = "com.${(config.app?.name || 'bakery-app').replace(/[^a-z0-9]/gi, '-')}"
title = "${config.window?.title || config.app?.name || 'Bakery App'}"
version = ${config.app?.version || '1.0.0'}
${config.app?.description ? `description = "${config.app.description}"` : ''}
${config.app?.author ? `author = "${config.app.author}"` : ''}

[window]
height = ${config.window?.height || 720}
width = ${config.window?.width || 1280}
${config.window?.resizable !== undefined ? `resizable = ${config.window.resizable}` : 'resizable = true'}
${config.window?.frameless ? `frameless = ${config.window.frameless}` : ''}
${config.window?.alwaysOnTop ? `utility = ${config.window.alwaysOnTop}` : ''}
${config.window?.startFullscreen ? `fullscreen = ${config.window.startFullscreen}` : ''}

[window.min]
height = ${config.window?.minHeight || 600}
width = ${config.window?.minWidth || 800}

${config.build?.macos?.icon ? `[mac]
icon = "${config.build.macos.icon}"` : ''}

${config.build?.windows?.icon ? `[win]
icon = "${config.build.windows.icon}"` : ''}

${config.build?.linux?.icon ? `[linux]
icon = "${config.build.linux.icon}"` : ''}
`;

  // Write socket.ini
  const iniPath = join(projectDir, 'socket.ini');
  writeFileSync(iniPath, ini);
  
  console.log(`✅ Generated socket.ini`);
  console.log(`   Title: ${config.window?.title || config.app?.name}`);
  console.log(`   Size: ${config.window?.width}x${config.window?.height}`);
  console.log(`   Min: ${config.window?.minWidth}x${config.window?.minHeight}`);
  
  return config;
}

// CLI
const projectDir = process.argv[2] || process.cwd();
generateSocketIni(resolve(projectDir)).catch(console.error);

