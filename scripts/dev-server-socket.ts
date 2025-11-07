#!/usr/bin/env bun
/**
 * 🥐 Bakery Development Server with Socket Runtime Integration
 * Serves app files + proxies Socket Runtime modules
 */

import { serve } from "bun";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";

const projectDir = process.argv[2] || ".";
const port = parseInt(process.argv[3] || "3000");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

// Socket Runtime module shims
const SOCKET_MODULES: Record<string, string> = {
  "socket:os": `
    export const platform = () => navigator.platform.toLowerCase().includes('mac') ? 'darwin' : 
                                   navigator.platform.toLowerCase().includes('win') ? 'win32' : 'linux';
    export const arch = () => navigator.userAgent.includes('arm') || navigator.userAgent.includes('aarch64') ? 'arm64' : 'x64';
    export const type = () => platform() === 'darwin' ? 'Darwin' : platform() === 'win32' ? 'Windows_NT' : 'Linux';
    export const cpus = () => Array(navigator.hardwareConcurrency || 4).fill({ model: 'CPU', speed: 2400 });
    export const totalmem = () => (navigator.deviceMemory || 8) * 1024 * 1024 * 1024;
    export const freemem = () => totalmem() * 0.5;
    export const hostname = () => 'localhost';
    export const release = () => '1.0.0';
    export const version = () => '1.0.0';
  `,
  "socket:process": `
    export const cwd = '${projectDir.replace(/\\/g, '/')}';
    export const pid = Math.floor(Math.random() * 10000);
    export const platform = navigator.platform.toLowerCase().includes('mac') ? 'darwin' : 
                             navigator.platform.toLowerCase().includes('win') ? 'win32' : 'linux';
    export const arch = navigator.userAgent.includes('arm') ? 'arm64' : 'x64';
    export const argv = ['bakery', 'dev'];
    export const env = new Proxy({}, {
      get: (target, prop) => prop === 'NODE_ENV' ? 'development' : undefined
    });
    export const exit = (code = 0) => console.log('Process exit:', code);
  `,
  "socket:fs/promises": `
    // File System API Shim (uses Native Bindings)
    export const readFile = async (path, encoding = 'utf8') => {
      console.warn('⚠️  fs.readFile not yet implemented in Bakery');
      return JSON.stringify({ message: 'Bakery FS API coming soon!' });
    };
    export const writeFile = async (path, data) => {
      console.warn('⚠️  fs.writeFile not yet implemented in Bakery');
      return;
    };
    export const readdir = async (path) => {
      console.warn('⚠️  fs.readdir not yet implemented in Bakery');
      return [];
    };
    export const stat = async (path) => {
      console.warn('⚠️  fs.stat not yet implemented in Bakery');
      return { size: 0, isDirectory: () => false, isFile: () => true };
    };
  `,
};

serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    
    // Handle Socket Runtime module imports
    if (pathname.startsWith('/socket:')) {
      const moduleName = pathname.slice(1); // Remove leading /
      const shimCode = SOCKET_MODULES[moduleName];
      
      if (shimCode) {
        console.log(`📦 ${req.method} ${moduleName} → Shim`);
        return new Response(shimCode, {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }
    
    // Default to index.html
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }
    
    // Remove leading slash
    const filePath = join(projectDir, "src", pathname.slice(1));
    
    console.log(`📄 ${req.method} ${pathname} → ${filePath}`);
    
    // Check if file exists
    if (!existsSync(filePath)) {
      console.log(`   ❌ Not found`);
      return new Response("Not Found", { status: 404 });
    }
    
    // Read file
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";
    
    console.log(`   ✅ ${mimeType} (${(content.length / 1024).toFixed(1)} KB)`);
    
    return new Response(content, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
});

console.log(`🥐 Bakery Dev Server + Socket Runtime Shims`);
console.log(`📁 Project: ${projectDir}`);
console.log(`🌐 Listening on http://localhost:${port}`);
console.log(`💡 Serving files from: ${join(projectDir, "src")}`);
console.log(`📦 Socket Runtime modules: shimmed with Web APIs`);
console.log(``);

