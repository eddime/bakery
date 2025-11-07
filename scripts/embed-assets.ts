#!/usr/bin/env bun
// 🥐 Bakery Asset Embedding
// Converts all src/ files to Base64 data URLs and creates a single embedded HTML

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, relative, dirname } from 'path';

interface EmbeddedAssets {
  [path: string]: string;
}

// MIME types for common file extensions
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function getMimeType(filepath: string): string {
  const ext = extname(filepath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function fileToDataUrl(filepath: string): string {
  const content = readFileSync(filepath);
  const base64 = content.toString('base64');
  const mimeType = getMimeType(filepath);
  return `data:${mimeType};base64,${base64}`;
}

function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  
  if (!existsSync(dir)) {
    return files;
  }

  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (stat.isFile()) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function embedAssets(srcDir: string, outputDir: string) {
  console.log('🔒 Embedding assets for production...');
  
  if (!existsSync(srcDir)) {
    console.error(`❌ Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  // Create output directory
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Get all files from src/
  const files = getAllFiles(srcDir);
  
  if (files.length === 0) {
    console.error(`❌ No files found in ${srcDir}`);
    process.exit(1);
  }

  console.log(`📦 Found ${files.length} files to embed`);

  // Convert all files to data URLs
  const assets: EmbeddedAssets = {};
  let indexHtmlPath: string | null = null;
  let indexHtmlContent: string | null = null;

  for (const file of files) {
    const relativePath = '/' + relative(srcDir, file).replace(/\\/g, '/');
    
    // Special handling for index.html
    if (file.endsWith('index.html')) {
      indexHtmlPath = file;
      indexHtmlContent = readFileSync(file, 'utf8');
      console.log(`  📄 ${relativePath} (entry point)`);
      continue;
    }

    const dataUrl = fileToDataUrl(file);
    assets[relativePath] = dataUrl;
    console.log(`  📦 ${relativePath} → ${(dataUrl.length / 1024).toFixed(1)}KB`);
  }

  if (!indexHtmlPath || !indexHtmlContent) {
    console.error('❌ index.html not found in src/');
    process.exit(1);
  }

  // Generate embedded HTML with all assets inline
  const embeddedHtml = generateEmbeddedHtml(indexHtmlContent, assets);
  
  // Write embedded HTML
  const outputPath = join(outputDir, 'index.html');
  writeFileSync(outputPath, embeddedHtml);
  
  const outputSize = (embeddedHtml.length / 1024).toFixed(1);
  console.log(`\n✅ Embedded HTML created: ${outputPath}`);
  console.log(`📊 Size: ${outputSize}KB`);
  console.log(`🔒 Assets are now embedded in the binary!`);
}

function generateEmbeddedHtml(originalHtml: string, assets: EmbeddedAssets): string {
  let html = originalHtml;

  // Replace external CSS links with inline styles
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
    const dataUrl = assets[href];
    if (dataUrl) {
      // Extract CSS from data URL
      const base64Content = dataUrl.split(',')[1];
      const cssContent = Buffer.from(base64Content, 'base64').toString('utf8');
      return `<style>${cssContent}</style>`;
    }
    return match;
  });

  // Replace external JS with inline scripts
  html = html.replace(/<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi, (match, src) => {
    const dataUrl = assets[src];
    if (dataUrl) {
      // Extract JS from data URL
      const base64Content = dataUrl.split(',')[1];
      const jsContent = Buffer.from(base64Content, 'base64').toString('utf8');
      // Preserve type="module" if it exists
      const typeMatch = match.match(/type=["']([^"']+)["']/);
      const type = typeMatch ? ` type="${typeMatch[1]}"` : '';
      return `<script${type}>\n${jsContent}\n</script>`;
    }
    return match;
  });

  // Replace image sources with data URLs
  html = html.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
    const dataUrl = assets[src];
    if (dataUrl) {
      return match.replace(src, dataUrl);
    }
    return match;
  });

  // Add embedded assets map for runtime loading (if needed)
  const assetsJson = JSON.stringify(assets, null, 2);
  html = html.replace('</head>', `
  <script>
    // 🥐 Bakery Embedded Assets
    window.__BAKERY_EMBEDDED_ASSETS__ = ${assetsJson};
  </script>
</head>`);

  return html;
}

// CLI Usage
const args = process.argv.slice(2);
const srcDir = args[0] || './src';
const outputDir = args[1] || './dist-embedded';

embedAssets(srcDir, outputDir);

