#!/usr/bin/env bun
/**
 * 🐧 Pack Linux Single Executable
 * Embeds launcher + assets + config + Steam .so into a single executable
 */

import { readFileSync, writeFileSync } from 'fs';

interface PackedData {
  x64Offset: bigint;
  x64Size: bigint;
  assetsOffset: bigint;
  assetsSize: bigint;
  configOffset: bigint;
  configSize: bigint;
  steamSoOffset: bigint;
  steamSoSize: bigint;
}

async function packSingleExecutable(
  universalLauncher: string,
  x64Binary: string,
  outputPath: string,
  steamSoPath?: string,
  assetsPath?: string
) {
  console.log('🐧 Packing Linux Single Executable...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Strip universal launcher BEFORE packing (reduces size by ~50%!)
  console.log('🔧 Stripping universal launcher...');
  try {
    Bun.spawnSync(['strip', '--strip-all', universalLauncher], {
      stdout: 'pipe',
      stderr: 'pipe',
    });
    const strippedSize = await Bun.file(universalLauncher).stat();
    console.log(`✅ Stripped to ${(strippedSize.size / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.warn('⚠️  Failed to strip universal launcher');
  }

  // Read all components
  const launcher = readFileSync(universalLauncher);
  const x64 = readFileSync(x64Binary);
  
  // Read assets if provided (skip if empty string)
  let assets = Buffer.alloc(0);
  if (assetsPath && assetsPath.length > 0 && assetsPath !== '""') {
    try {
      assets = readFileSync(assetsPath);
      console.log(`📦 Assets: ${(assets.length / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.warn('⚠️  Assets file not found, skipping...');
    }
  }
  
  // Config is embedded in assets, so we don't need it separately
  const config = Buffer.alloc(0);
  
  // Read Steam .so if provided (skip if empty string)
  let steamSo = Buffer.alloc(0);
  if (steamSoPath && steamSoPath.length > 0 && steamSoPath !== '""') {
    try {
      steamSo = readFileSync(steamSoPath);
      console.log(`🎮 Steam library: ${(steamSo.length / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.warn('⚠️  Steam library not found, skipping...');
    }
  }

  console.log(`📦 Universal launcher: ${(launcher.length / 1024).toFixed(1)} KB`);
  console.log(`🔧 x64 binary: ${(x64.length / 1024).toFixed(1)} KB`);
  console.log('');

  // Calculate offsets (8-byte aligned)
  let currentOffset = BigInt(launcher.length);
  
  // Align to 8 bytes
  const align = (offset: bigint) => {
    const remainder = offset % 8n;
    return remainder === 0n ? offset : offset + (8n - remainder);
  };
  
  currentOffset = align(currentOffset);
  
  const data: PackedData = {
    x64Offset: currentOffset,
    x64Size: BigInt(x64.length),
    assetsOffset: 0n,
    assetsSize: 0n,
    configOffset: 0n,
    configSize: 0n,
    steamSoOffset: 0n,
    steamSoSize: 0n
  };
  
  currentOffset += BigInt(x64.length);
  currentOffset = align(currentOffset);
  
  // Add assets if present
  if (assets.length > 0) {
    data.assetsOffset = currentOffset;
    data.assetsSize = BigInt(assets.length);
    currentOffset += BigInt(assets.length);
    currentOffset = align(currentOffset);
  }
  
  // Add Steam .so if present
  if (steamSo.length > 0) {
    data.steamSoOffset = currentOffset;
    data.steamSoSize = BigInt(steamSo.length);
    currentOffset += BigInt(steamSo.length);
    currentOffset = align(currentOffset);
  }
  
  // Create header (64 bytes total)
  // Magic: "GEMCORE_EMBEDDED\0" (16 bytes)
  // x64Offset: 8 bytes
  // x64Size: 8 bytes
  // assetsOffset: 8 bytes
  // assetsSize: 8 bytes
  // configOffset: 8 bytes
  // configSize: 8 bytes
  // steamSoOffset: 8 bytes
  // steamSoSize: 8 bytes
  const header = Buffer.alloc(64);
  header.write('GEMCORE_EMBEDDED', 0, 'utf-8');
  header.writeBigUInt64LE(data.x64Offset, 16);
  header.writeBigUInt64LE(data.x64Size, 24);
  header.writeBigUInt64LE(data.assetsOffset, 32);
  header.writeBigUInt64LE(data.assetsSize, 40);
  header.writeBigUInt64LE(data.configOffset, 48);
  header.writeBigUInt64LE(data.configSize, 56);
  header.writeBigUInt64LE(data.steamSoOffset, 64 - 16);
  header.writeBigUInt64LE(data.steamSoSize, 64 - 8);
  
  // Calculate padding
  const padding1 = Buffer.alloc(Number(data.x64Offset - BigInt(launcher.length)));
  const padding2 = assets.length > 0
    ? Buffer.alloc(Number(data.assetsOffset - (data.x64Offset + data.x64Size)))
    : Buffer.alloc(0);
  const padding3 = steamSo.length > 0 
    ? Buffer.alloc(Number(data.steamSoOffset - (data.assetsOffset + data.assetsSize)))
    : Buffer.alloc(0);
  
  // Concatenate all parts
  const output = Buffer.concat([
    launcher,
    padding1,
    x64,
    padding2,
    assets,
    padding3,
    steamSo,
    header
  ]);
  
  // Write output
  writeFileSync(outputPath, output, { mode: 0o755 });
  
  // 🔧 Strip debug symbols to reduce size
  console.log('🔧 Stripping debug symbols...');
  try {
    Bun.spawnSync(['strip', '--strip-all', outputPath], {
      stdout: 'pipe',
      stderr: 'pipe',
    });
    console.log('✅ Debug symbols stripped');
  } catch (e) {
    console.warn('⚠️  Failed to strip (strip command not found)');
  }
  
  const finalStats = await Bun.file(outputPath).stat();
  
  console.log('✅ Packed successfully!');
  console.log('');
  console.log(`📊 Final size: ${(finalStats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📍 Output: ${outputPath}`);
  console.log('');
  console.log('🔐 Structure:');
  console.log(`   • Universal Launcher: 0 - ${launcher.length}`);
  console.log(`   • x64 Binary: ${data.x64Offset} - ${data.x64Offset + data.x64Size}`);
  if (assets.length > 0) {
    console.log(`   • Assets: ${data.assetsOffset} - ${data.assetsOffset + data.assetsSize}`);
  }
  if (steamSo.length > 0) {
    console.log(`   • Steam Library: ${data.steamSoOffset} - ${data.steamSoOffset + data.steamSoSize}`);
  }
  console.log(`   • Header: ${output.length - 64} - ${output.length}`);
  console.log('');
}

// CLI
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('Usage: pack-linux-single-exe.ts <universal-launcher> <x64-binary> <output> [steam-so.so] [assets]');
  process.exit(1);
}

const [universalLauncher, x64Binary, output, steamSo, assets] = args;

await packSingleExecutable(universalLauncher, x64Binary, output, steamSo, assets);

