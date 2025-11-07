#!/usr/bin/env bun
/**
 * 🥐 Bakery Development Server
 * Serves app files for native WebView during development
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

serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    
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

console.log(`🥐 Bakery Dev Server`);
console.log(`📁 Project: ${projectDir}`);
console.log(`🌐 Listening on http://localhost:${port}`);
console.log(`💡 Serving files from: ${join(projectDir, "src")}`);
console.log(``);

