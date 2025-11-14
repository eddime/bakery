#!/usr/bin/env bun
// 🎨 Bakery Icon Converter
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
 * Convert PNG to ICNS (macOS)
 */
export async function convertPngToIcns(pngPath: string, outputPath: string): Promise<void> {
  console.log('🍎 Converting PNG to ICNS...');
  
  if (!existsSync(pngPath)) {
    throw new Error(`PNG file not found: ${pngPath}`);
  }
  
  // Load PNG with sharp
  const img = sharp(pngPath);
  const metadata = await img.metadata();
  
  console.log(`   📐 Source: ${metadata.width}x${metadata.height}`);
  
  // Generate all required sizes
  const sizes = [16, 32, 128, 256, 512, 1024];
  const icons: { size: number; data: Uint8Array }[] = [];
  
  for (const size of sizes) {
    console.log(`   🔄 Generating ${size}x${size}...`);
    
    // Resize image with sharp
    const resized = await sharp(pngPath)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    icons.push({ size, data: new Uint8Array(resized) });
  }
  
  // Write ICNS file
  console.log('   📝 Writing ICNS file...');
  const icnsData = createIcnsFile(icons);
  writeFileSync(outputPath, icnsData);
  
  const stats = await Bun.file(outputPath).stat();
  console.log(`✅ ICNS created: ${(stats.size / 1024).toFixed(1)} KB`);
}

/**
 * Convert PNG to ICO (Windows)
 */
export async function convertPngToIco(pngPath: string, outputPath: string): Promise<void> {
  console.log('🪟 Converting PNG to ICO...');
  
  if (!existsSync(pngPath)) {
    throw new Error(`PNG file not found: ${pngPath}`);
  }
  
  // Load PNG with sharp
  const img = sharp(pngPath);
  const metadata = await img.metadata();
  console.log(`   📐 Source: ${metadata.width}x${metadata.height}`);
  
  // Generate all required sizes
  const icons: { size: number; data: Uint8Array }[] = [];
  
  for (const size of ICO_SIZES) {
    console.log(`   🔄 Generating ${size}x${size}...`);
    
    // Resize image with sharp
    const resized = await sharp(pngPath)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    icons.push({ size, data: new Uint8Array(resized) });
  }
  
  // Write ICO file
  console.log('   📝 Writing ICO file...');
  const icoData = createIcoFile(icons);
  writeFileSync(outputPath, icoData);
  
  const stats = await Bun.file(outputPath).stat();
  console.log(`✅ ICO created: ${(stats.size / 1024).toFixed(1)} KB`);
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
  const fullIconPath = join(projectDir, iconPath);
  
  if (!existsSync(fullIconPath)) {
    console.warn(`⚠️  Icon not found: ${iconPath}`);
    return { png: iconPath };
  }
  
  // Check if it's a PNG
  if (!iconPath.toLowerCase().endsWith('.png')) {
    console.warn(`⚠️  Icon must be PNG format: ${iconPath}`);
    return { png: iconPath };
  }
  
  console.log(`\n🎨 Auto-converting icon: ${iconPath}`);
  
  const assetsDir = join(projectDir, 'assets');
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
  }
  
  const baseName = iconPath.replace(/\.png$/i, '');
  const icnsPath = join(assetsDir, 'icon.icns');
  const icoPath = join(assetsDir, 'icon.ico');
  
  try {
    // Convert to ICNS (macOS)
    await convertPngToIcns(fullIconPath, icnsPath);
    
    // Convert to ICO (Windows)
    await convertPngToIco(fullIconPath, icoPath);
    
    console.log('');
    return {
      icns: icnsPath,
      ico: icoPath,
      png: fullIconPath,
    };
  } catch (error) {
    console.error('❌ Icon conversion failed:', error);
    return { png: fullIconPath };
  }
}

// CLI
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
🎨 Bakery Icon Converter

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

