#!/usr/bin/env bun
// 🥐 Embed WebView Library into JS Bundle for txiki.js
// Similar to bunery but adapted for txiki.js APIs

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface EmbedOptions {
    libPath: string;
    bundlePath: string;
    outputPath: string;
    platform: 'darwin' | 'linux' | 'windows';
}

async function embedLibrary(options: EmbedOptions) {
    const { libPath, bundlePath, outputPath, platform } = options;
    
    console.log('📦 Embedding library into bundle...');
    console.log(`   Library: ${libPath}`);
    console.log(`   Bundle: ${bundlePath}`);
    
    // Read the library and encode it
    const libBuffer = readFileSync(libPath);
    const libBase64 = libBuffer.toString('base64');
    
    console.log(`   Library size: ${(libBuffer.length / 1024).toFixed(0)} KB`);
    console.log(`   Base64 size: ${(libBase64.length / 1024).toFixed(0)} KB`);
    
    // Read the bundle
    const bundleCode = readFileSync(bundlePath, 'utf-8');
    
    // Create pre-extraction code using txiki.js APIs
    // Extraction happens SYNCHRONOUSLY using std module
    const preExtractionCode = `
// 🥐 Bakery - Embedded WebView Library Extractor (txiki.js compatible)
import * as std from "tjs:std";

const EMBEDDED_LIBRARY = "${libBase64}";
const PLATFORM = "${platform}";

// Get library path next to executable
const execPath = tjs.args[0] || "";
const lastSlash = Math.max(execPath.lastIndexOf("/"), execPath.lastIndexOf("\\\\"));
const execDir = lastSlash > 0 ? execPath.substring(0, lastSlash) : ".";
const arch = tjs.system.arch;
const libFileName = PLATFORM === "darwin" ? "libwebview.dylib" : 
                    PLATFORM === "linux" ? \`libwebview-\${arch}.so\` : "libwebview.dll";
const libPath = \`\${execDir}/\${libFileName}\`;

// Check if library already exists
let exists = false;
try {
    const stat = std.stat(libPath);
    exists = stat && stat[0];  // stat returns [exists, mode, ...]
} catch (e) {
    exists = false;
}

if (!exists) {
    console.log("📦 Extracting embedded library...");
    
    // Decode base64
    const binaryString = atob(EMBEDDED_LIBRARY);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Write to file using std module
    const file = std.open(libPath, "wb");
    file.write(bytes.buffer, 0, bytes.length);
    file.close();
    
    console.log(\`✅ Library extracted to: \${libPath}\`);
}

`;
    
    const extractionCode = preExtractionCode + bundleCode;
    
    // Write the new bundle
    writeFileSync(outputPath, extractionCode, 'utf-8');
    
    console.log(`✅ Embedded bundle created: ${outputPath}`);
    console.log(`   Total size: ${(extractionCode.length / 1024).toFixed(0)} KB`);
}

// CLI
const args = process.argv.slice(2);
if (args.length < 3) {
    console.error('Usage: embed-library.ts <libPath> <bundlePath> <outputPath> [platform]');
    process.exit(1);
}

const [libPath, bundlePath, outputPath] = args;
const platform = (args[3] || process.platform === 'darwin' ? 'darwin' : 
                  process.platform === 'win32' ? 'windows' : 'linux') as 'darwin' | 'linux' | 'windows';

await embedLibrary({
    libPath: resolve(libPath),
    bundlePath: resolve(bundlePath),
    outputPath: resolve(outputPath),
    platform,
});

