#!/usr/bin/env bun
// Pack Windows Universal Binary into SINGLE EXE

import { readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';

interface PackedData {
  x64Offset: bigint;
  x64Size: bigint;
  assetsOffset: bigint;
  assetsSize: bigint;
  configOffset: bigint;
  configSize: bigint;
}

function packSingleEXE(
  launcherPath: string,
  x64BinaryPath: string,
  outputPath: string
) {
  console.log('📦 Packing Windows Single EXE...');
  console.log('');

  // Read launcher stub
  const launcher = readFileSync(launcherPath);
  console.log(`✅ Launcher: ${(launcher.length / 1024).toFixed(1)}KB`);

  // Read x64 binary
  const x64Binary = readFileSync(x64BinaryPath);
  console.log(`✅ x64 Binary: ${(x64Binary.length / 1024 / 1024).toFixed(1)}MB`);

  // Read bakery-assets
  const assetsPath = join(dirname(x64BinaryPath), '..', 'bakery-assets');
  const assets = readFileSync(assetsPath);
  console.log(`✅ Assets: ${(assets.length / 1024 / 1024).toFixed(1)}MB`);

  // Calculate offsets
  let currentOffset = BigInt(launcher.length);
  
  const x64Offset = currentOffset;
  const x64Size = BigInt(x64Binary.length);
  currentOffset += x64Size;

  // Align to 8 bytes
  if (currentOffset % 8n !== 0n) {
    currentOffset += 8n - (currentOffset % 8n);
  }

  const assetsOffset = currentOffset;
  const assetsSize = BigInt(assets.length);
  currentOffset += assetsSize;

  // Align to 8 bytes
  if (currentOffset % 8n !== 0n) {
    currentOffset += 8n - (currentOffset % 8n);
  }

  // Create header
  const magic = Buffer.from('BAKERY_EMBEDDED\0', 'utf8');
  const header = Buffer.alloc(48);
  
  header.writeBigUInt64LE(x64Offset, 0);
  header.writeBigUInt64LE(x64Size, 8);
  header.writeBigUInt64LE(assetsOffset, 16);
  header.writeBigUInt64LE(assetsSize, 24);
  header.writeBigUInt64LE(0n, 32); // configOffset
  header.writeBigUInt64LE(0n, 40); // configSize

  console.log('');
  console.log('📋 Structure:');
  console.log(`   Launcher:  0 - ${launcher.length} (${(launcher.length / 1024).toFixed(1)}KB)`);
  console.log(`   x64 Binary: ${x64Offset} - ${x64Offset + x64Size} (${(Number(x64Size) / 1024 / 1024).toFixed(1)}MB)`);
  console.log(`   Assets:     ${assetsOffset} - ${assetsOffset + assetsSize} (${(Number(assetsSize) / 1024 / 1024).toFixed(1)}MB)`);
  console.log(`   Header:     ${currentOffset} (48 bytes)`);

  // Calculate padding
  const padding1 = Number(assetsOffset - x64Offset - x64Size);
  const padding2 = Number(currentOffset - assetsOffset - assetsSize);

  // Write output
  const output = Buffer.concat([
    launcher,
    x64Binary,
    Buffer.alloc(padding1), // Padding after x64
    assets,
    Buffer.alloc(padding2), // Padding after assets
    magic,
    header
  ]);

  writeFileSync(outputPath, output);

  const totalSize = statSync(outputPath).size;
  console.log('');
  console.log(`✅ Single EXE created: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Output: ${outputPath}`);
  console.log('');
  console.log('🎯 User only sees ONE file!');
  console.log('   → Detects CPU architecture');
  console.log('   → Extracts & launches optimized binary');
}

// CLI
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: pack-windows-single-exe.ts <launcher.exe> <x64-binary.exe> <output.exe>');
  process.exit(1);
}

packSingleEXE(args[0], args[1], args[2]);
