#!/usr/bin/env bun
//  Gemcore Icon Converter
// Converts PNG to ICNS (macOS) and ICO (Windows) automatically
// Inspired by Godot Engine's icon handling

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

// ICNS format constants
const ICNS_HEADER = 'icns';
const ICNS_TYPES = {
  16: 'icp4',   // 16x16
  32: 'icp5',   // 32x32
  64: 'icp6',   // 64x64 (not standard but supported)
  128: 'it32',  // 128x128
  256: 'ic08',  // 256x256
  512: 'ic09',  // 512x512
  1024: 'ic10', // 1024x1024
};

// ICO format constants
const ICO_SIZES = [16, 32, 48, 64, 128, 256];

/**
 * Convert PNG to ICNS (macOS) using native macOS tools (like Godot does)
 */
export async function convertPngToIcns(pngPath: string, outputPath: string): Promise<void> {
  console.log(' Converting PNG to ICNS...');
  
  if (!existsSync(pngPath)) {
    throw new Error(`PNG file not found: ${pngPath}`);
  }
  
  // Use macOS native iconutil (like Godot) for best quality
  const { tmpdir } = await import('os');
  const { join } = await import('path');
  const { mkdirSync, rmSync } = await import('fs');
  const { spawnSync } = await import('child_process');
  
  const iconsetPath = join(tmpdir(), `icon_${Date.now()}.iconset`);
  mkdirSync(iconsetPath, { recursive: true });
  
  try {
    // Generate all required sizes using sips (native macOS tool)
    const sizes = [
      { size: 16, name: 'icon_16x16.png' },
      { size: 32, name: 'icon_16x16@2x.png' },
      { size: 32, name: 'icon_32x32.png' },
      { size: 64, name: 'icon_32x32@2x.png' },
      { size: 128, name: 'icon_128x128.png' },
      { size: 256, name: 'icon_128x128@2x.png' },
      { size: 256, name: 'icon_256x256.png' },
      { size: 512, name: 'icon_256x256@2x.png' },
      { size: 512, name: 'icon_512x512.png' },
      { size: 1024, name: 'icon_512x512@2x.png' },
    ];
    
    console.log(`    Generating ${sizes.length} icon sizes...`);
    
    for (const { size, name } of sizes) {
      const outPath = join(iconsetPath, name);
      const result = spawnSync('sips', [
        '-z', size.toString(), size.toString(),
        pngPath,
        '--out', outPath
      ], { encoding: 'utf-8' });
      
      if (result.error || result.status !== 0) {
        throw new Error(`Failed to generate ${name}: ${result.stderr}`);
      }
    }
    
    // Use iconutil to create ICNS (native macOS tool)
    console.log('    Creating ICNS with iconutil...');
    const result = spawnSync('iconutil', [
      '-c', 'icns',
      iconsetPath,
      '-o', outputPath
    ], { encoding: 'utf-8' });
    
    if (result.error || result.status !== 0) {
      throw new Error(`iconutil failed: ${result.stderr}`);
    }
    
    const stats = await Bun.file(outputPath).stat();
    console.log(` ICNS created: ${(stats.size / 1024).toFixed(1)} KB`);
  } finally {
    // Cleanup
    rmSync(iconsetPath, { recursive: true, force: true });
  }
}

/**
 * Convert PNG to ICO (Windows) using sips (like Godot does)
 */
export async function convertPngToIco(pngPath: string, outputPath: string): Promise<void> {
  console.log(' Converting PNG to ICO...');
  
  if (!existsSync(pngPath)) {
    throw new Error(`PNG file not found: ${pngPath}`);
  }
  
  const { tmpdir } = await import('os');
  const { join } = await import('path');
  const { mkdirSync, rmSync, readFileSync } = await import('fs');
  const { spawnSync } = await import('child_process');
  
  const tempDir = join(tmpdir(), `ico_${Date.now()}`);
  mkdirSync(tempDir, { recursive: true });
  
  try {
    // Generate all required sizes using sips (like Godot)
    const icons: { size: number; data: Uint8Array }[] = [];
    
    console.log(`    Generating ${ICO_SIZES.length} icon sizes...`);
    
    for (const size of ICO_SIZES) {
      const tempPath = join(tempDir, `icon_${size}.png`);
      
      // Use sips for high-quality resizing
      const result = spawnSync('sips', [
        '-z', size.toString(), size.toString(),
        pngPath,
        '--out', tempPath
      ], { encoding: 'utf-8' });
      
      if (result.error || result.status !== 0) {
        throw new Error(`Failed to generate ${size}x${size}: ${result.stderr}`);
      }
      
      // Read the resized PNG
      const pngData = readFileSync(tempPath);
      icons.push({ size, data: new Uint8Array(pngData) });
    }
    
    // Write ICO file
    console.log('    Writing ICO file...');
    const icoData = createIcoFile(icons);
    writeFileSync(outputPath, icoData);
    
    const stats = await Bun.file(outputPath).stat();
    console.log(` ICO created: ${(stats.size / 1024).toFixed(1)} KB`);
  } finally {
    // Cleanup
    rmSync(tempDir, { recursive: true, force: true });
  }
}

/**
 * Create ICNS file from multiple PNG images
 */
function createIcnsFile(icons: { size: number; data: Uint8Array }[]): Buffer {
  const buffers: Buffer[] = [];
  
  // Calculate total size
  let totalSize = 8; // Header (4 bytes magic + 4 bytes size)
  
  for (const icon of icons) {
    totalSize += 8 + icon.data.length; // Type (4) + Size (4) + Data
  }
  
  // Write header
  const header = Buffer.alloc(8);
  header.write(ICNS_HEADER, 0, 4, 'ascii');
  header.writeUInt32BE(totalSize, 4);
  buffers.push(header);
  
  // Write each icon
  for (const icon of icons) {
    const type = ICNS_TYPES[icon.size as keyof typeof ICNS_TYPES];
    if (!type) continue;
    
    const iconHeader = Buffer.alloc(8);
    iconHeader.write(type, 0, 4, 'ascii');
    iconHeader.writeUInt32BE(8 + icon.data.length, 4);
    
    buffers.push(iconHeader);
    buffers.push(Buffer.from(icon.data));
  }
  
  return Buffer.concat(buffers);
}

/**
 * Create ICO file from multiple PNG images
 */
function createIcoFile(icons: { size: number; data: Uint8Array }[]): Buffer {
  const buffers: Buffer[] = [];
  
  // ICO Header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // Reserved (must be 0)
  header.writeUInt16LE(1, 2);      // Type (1 = ICO)
  header.writeUInt16LE(icons.length, 4); // Number of images
  buffers.push(header);
  
  // Calculate offset for first image data
  let dataOffset = 6 + (icons.length * 16); // Header + directory entries
  
  // Write directory entries
  const imageDataBuffers: Buffer[] = [];
  
  for (const icon of icons) {
    const entry = Buffer.alloc(16);
    
    // Width/Height (0 = 256)
    entry.writeUInt8(icon.size === 256 ? 0 : icon.size, 0);
    entry.writeUInt8(icon.size === 256 ? 0 : icon.size, 1);
    entry.writeUInt8(0, 2);  // Color palette (0 = no palette)
    entry.writeUInt8(0, 3);  // Reserved
    entry.writeUInt16LE(1, 4);  // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(icon.data.length, 8);  // Image data size
    entry.writeUInt32LE(dataOffset, 12);       // Offset to image data
    
    buffers.push(entry);
    imageDataBuffers.push(Buffer.from(icon.data));
    
    dataOffset += icon.data.length;
  }
  
  // Append all image data
  buffers.push(...imageDataBuffers);
  
  return Buffer.concat(buffers);
}

/**
 * Auto-convert icon based on config
 */
export async function autoConvertIcon(
  projectDir: string,
  iconPath: string
): Promise<{ icns?: string; ico?: string; png: string }> {
  // Try to find icon in multiple locations (like Godot does)
  let fullIconPath = join(projectDir, iconPath);
  
  // If not found in root, try assets/ directory
  if (!existsSync(fullIconPath)) {
    const assetsPath = join(projectDir, 'assets', iconPath);
    if (existsSync(assetsPath)) {
      fullIconPath = assetsPath;
    } else {
      console.warn(`  Icon not found: ${iconPath} (tried root and assets/)`);
      return { png: iconPath };
    }
  }
  
  // Check if it's a PNG
  if (!iconPath.toLowerCase().endsWith('.png')) {
    console.warn(`  Icon must be PNG format: ${iconPath}`);
    return { png: iconPath };
  }
  
  console.log(`\n Auto-converting icon: ${iconPath}`);
  
  const assetsDir = join(projectDir, 'assets');
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
  }
  
  const baseName = iconPath.replace(/\.png$/i, '');
  const icnsPath = join(assetsDir, 'icon.icns');
  const icoPath = join(assetsDir, 'icon.ico');
  const pngPath = join(assetsDir, 'icon.png');  // Linux uses PNG directly
  
  try {
    // Optimize PNG for Linux (like Godot does - ensure it's high quality)
    const { spawnSync } = await import('child_process');
    const { cpSync } = await import('fs');
    
    // Check source size
    const result = spawnSync('sips', ['-g', 'pixelWidth', fullIconPath], { encoding: 'utf-8' });
    const match = result.stdout.match(/pixelWidth: (\d+)/);
    const sourceSize = match ? parseInt(match[1]) : 1024;
    
    if (sourceSize >= 512) {
      // Source is good quality, just copy it
      cpSync(fullIconPath, pngPath);
      console.log(` PNG copied for Linux (${sourceSize}x${sourceSize})`);
    } else {
      // Source is small, upscale it to 512x512 for better quality
      console.log(` PNG upscaling to 512x512 for Linux...`);
      const upscaleResult = spawnSync('sips', [
        '-z', '512', '512',
        fullIconPath,
        '--out', pngPath
      ], { encoding: 'utf-8' });
      
      if (upscaleResult.error || upscaleResult.status !== 0) {
        // Fallback: just copy
        cpSync(fullIconPath, pngPath);
        console.log(' PNG copied for Linux (fallback)');
      } else {
        console.log(' PNG created for Linux (512x512)');
      }
    }
    
    // Convert to ICNS (macOS)
    await convertPngToIcns(fullIconPath, icnsPath);
    
    // Convert to ICO (Windows)
    await convertPngToIco(fullIconPath, icoPath);
    
    console.log('');
    return {
      icns: icnsPath,
      ico: icoPath,
      png: pngPath,  // Return copied PNG path for Linux
    };
  } catch (error) {
    console.error(' Icon conversion failed:', error);
    return { png: fullIconPath };
  }
}

// CLI
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
 Gemcore Icon Converter

Usage:
  bun scripts/convert-icon.ts <input.png> <format>

Formats:
  icns    Convert to macOS ICNS
  ico     Convert to Windows ICO
  both    Convert to both formats

Examples:
  bun scripts/convert-icon.ts icon.png icns
  bun scripts/convert-icon.ts icon.png ico
  bun scripts/convert-icon.ts icon.png both
`);
    process.exit(1);
  }
  
  const [inputPath, format] = args;
  
  if (format === 'icns' || format === 'both') {
    const outputPath = inputPath.replace(/\.png$/i, '.icns');
    await convertPngToIcns(inputPath, outputPath);
  }
  
  if (format === 'ico' || format === 'both') {
    const outputPath = inputPath.replace(/\.png$/i, '.ico');
    await convertPngToIco(inputPath, outputPath);
  }
}

