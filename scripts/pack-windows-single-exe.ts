#!/usr/bin/env bun
// Pack Windows Universal Binary into SINGLE EXE (launcher + x64 binary + assets + config)

import { readFileSync, writeFileSync, statSync } from 'fs';

function alignOffset(chunks: Buffer[], currentOffset: bigint): bigint {
  if (currentOffset % 8n !== 0n) {
    const padSize = Number(8n - (currentOffset % 8n));
    chunks.push(Buffer.alloc(padSize));
    currentOffset += BigInt(padSize);
  }
  return currentOffset;
}

function packSingleEXE(
  launcherPath: string,
  x64BinaryPath: string,
  assetsPath: string,
  configPath: string,
  outputPath: string
) {
  console.log('📦 Packing Windows Single EXE...');
  console.log('');

  const launcher = readFileSync(launcherPath);
  const x64Binary = readFileSync(x64BinaryPath);
  const assets = readFileSync(assetsPath);
  const config = readFileSync(configPath);

  console.log(`✅ Launcher: ${(launcher.length / 1024).toFixed(1)}KB`);
  console.log(`✅ x64 Binary: ${(x64Binary.length / 1024 / 1024).toFixed(1)}MB`);
  console.log(`✅ Assets: ${(assets.length / 1024 / 1024).toFixed(1)}MB`);
  console.log(`✅ Config: ${(config.length / 1024).toFixed(1)}KB`);

  const chunks: Buffer[] = [];
  chunks.push(launcher);

  let currentOffset = BigInt(launcher.length);
  const x64Offset = currentOffset;
  chunks.push(x64Binary);
  currentOffset += BigInt(x64Binary.length);
  currentOffset = alignOffset(chunks, currentOffset);

  const assetsOffset = currentOffset;
  chunks.push(assets);
  currentOffset += BigInt(assets.length);
  currentOffset = alignOffset(chunks, currentOffset);

  const configOffset = currentOffset;
  chunks.push(config);
  currentOffset += BigInt(config.length);
  currentOffset = alignOffset(chunks, currentOffset);

  const magic = Buffer.from('BAKERY_EMBEDDED\0', 'utf8');
  const header = Buffer.alloc(48);
  header.writeBigUInt64LE(x64Offset, 0);
  header.writeBigUInt64LE(BigInt(x64Binary.length), 8);
  header.writeBigUInt64LE(assetsOffset, 16);
  header.writeBigUInt64LE(BigInt(assets.length), 24);
  header.writeBigUInt64LE(configOffset, 32);
  header.writeBigUInt64LE(BigInt(config.length), 40);

  chunks.push(magic, header);

  writeFileSync(outputPath, Buffer.concat(chunks));

  const totalSize = statSync(outputPath).size;
  console.log('');
  console.log(`✅ Single EXE created: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Output: ${outputPath}`);
  console.log('');
  console.log('🎯 User only sees ONE file!');
  console.log('   → Extracts assets + config to temp directory');
  console.log('   → Launches optimized x64 binary');
}

const args = process.argv.slice(2);
if (args.length < 5) {
  console.error('Usage: pack-windows-single-exe.ts <launcher.exe> <x64-binary.exe> <assets> <config> <output.exe>');
  process.exit(1);
}

packSingleEXE(args[0], args[1], args[2], args[3], args[4]);
