#!/usr/bin/env bun
// Pack Linux launcher into a single self-extracting binary (launcher + assets + config)

import { readFileSync, writeFileSync, statSync } from 'fs';

function alignChunks(chunks: Buffer[], currentOffset: bigint): [Buffer[], bigint] {
  if (currentOffset % 8n !== 0n) {
    const padSize = Number(8n - (currentOffset % 8n));
    chunks.push(Buffer.alloc(padSize));
    currentOffset += BigInt(padSize);
  }
  return [chunks, currentOffset];
}

function packSingleBinary(
  binaryPath: string,
  assetsPath: string,
  configPath: string,
  outputPath: string
) {
  console.log('📦 Packing Linux Single Binary...');
  console.log('');

  const binary = readFileSync(binaryPath);
  const assets = readFileSync(assetsPath);
  const config = readFileSync(configPath);

  console.log(`✅ Launcher: ${(binary.length / 1024 / 1024).toFixed(1)}MB`);
  console.log(`✅ Assets: ${(assets.length / 1024 / 1024).toFixed(1)}MB`);
  console.log(`✅ Config: ${(config.length / 1024).toFixed(1)}KB`);

  const chunks: Buffer[] = [];
  chunks.push(binary);

  let currentOffset = BigInt(binary.length);

  // Windows header struct expects x64 fields first but we don't use them
  const x64Offset = 0n;
  const x64Size = 0n;

  [, currentOffset] = alignChunks(chunks, currentOffset);

  const assetsOffset = currentOffset;
  chunks.push(assets);
  currentOffset += BigInt(assets.length);
  [, currentOffset] = alignChunks(chunks, currentOffset);

  const configOffset = currentOffset;
  chunks.push(config);
  currentOffset += BigInt(config.length);
  [, currentOffset] = alignChunks(chunks, currentOffset);

  const magic = Buffer.from('BAKERY_EMBEDDED\0', 'utf8');
  const header = Buffer.alloc(48);
  header.writeBigUInt64LE(x64Offset, 0);
  header.writeBigUInt64LE(x64Size, 8);
  header.writeBigUInt64LE(assetsOffset, 16);
  header.writeBigUInt64LE(BigInt(assets.length), 24);
  header.writeBigUInt64LE(configOffset, 32);
  header.writeBigUInt64LE(BigInt(config.length), 40);

  chunks.push(magic, header);

  writeFileSync(outputPath, Buffer.concat(chunks));

  const totalSize = statSync(outputPath).size;
  console.log('');
  console.log(`✅ Single binary created: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Output: ${outputPath}`);
  console.log('');
  console.log('🎯 Extracts assets + config to temp directory at runtime');
}

const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: pack-linux-single.ts <launcher> <assets> <config> <output>');
  process.exit(1);
}

packSingleBinary(args[0], args[1], args[2], args[3]);
