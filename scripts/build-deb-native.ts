#!/usr/bin/env bun
/**
 * Native .deb Package Builder
 * Creates Debian packages WITHOUT dpkg-deb or Docker
 * Works on macOS, Windows, and Linux using pure Bun/TypeScript
 * 
 * A .deb file is just an AR archive containing:
 * 1. debian-binary (text file with "2.0\n")
 * 2. control.tar.gz (package metadata)
 * 3. data.tar.gz (actual files to install)
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, rmSync, statSync } from 'fs';
import { join, basename } from 'path';
import { gzipSync } from 'bun';

interface DebPackageOptions {
  packageName: string;
  version: string;
  architecture: string;
  maintainer: string;
  description: string;
  section: string;
  priority: string;
  installedSize: number; // in KB
}

interface FileMapping {
  source: string;
  destination: string;
  mode?: number; // Unix file permissions (e.g., 0o755)
}

/**
 * Create a tar archive from files
 * Pure TypeScript implementation - no external dependencies!
 */
function createTarGz(files: FileMapping[]): Uint8Array {
  const tarData: number[] = [];
  
  for (const file of files) {
    const fileData = readFileSync(file.source);
    const fileSize = fileData.length;
    const fileName = file.destination.startsWith('./') ? file.destination : './' + file.destination;
    const mode = file.mode || 0o644;
    
    // TAR header (512 bytes)
    const header = new Uint8Array(512);
    
    // File name (100 bytes)
    const nameBytes = new TextEncoder().encode(fileName);
    header.set(nameBytes.slice(0, 100), 0);
    
    // File mode (8 bytes, octal)
    const modeStr = mode.toString(8).padStart(7, '0') + '\0';
    header.set(new TextEncoder().encode(modeStr), 100);
    
    // Owner UID/GID (8 bytes each, octal) - use 0 (root)
    header.set(new TextEncoder().encode('0000000\0'), 108); // UID
    header.set(new TextEncoder().encode('0000000\0'), 116); // GID
    
    // File size (12 bytes, octal)
    const sizeStr = fileSize.toString(8).padStart(11, '0') + ' ';
    header.set(new TextEncoder().encode(sizeStr), 124);
    
    // Modification time (12 bytes, octal) - use current time
    const mtime = Math.floor(Date.now() / 1000);
    const mtimeStr = mtime.toString(8).padStart(11, '0') + ' ';
    header.set(new TextEncoder().encode(mtimeStr), 136);
    
    // Checksum (8 bytes) - initially fill with spaces
    header.set(new TextEncoder().encode('        '), 148);
    
    // Type flag (1 byte) - '0' for regular file
    header[156] = '0'.charCodeAt(0);
    
    // Calculate checksum (sum of all header bytes, treating checksum field as spaces)
    let checksum = 0;
    for (let i = 0; i < 512; i++) {
      checksum += header[i];
    }
    
    // Write checksum (6 bytes octal + null + space)
    const checksumStr = checksum.toString(8).padStart(6, '0') + '\0 ';
    header.set(new TextEncoder().encode(checksumStr), 148);
    
    // Add header to tar
    tarData.push(...header);
    
    // Add file data
    tarData.push(...fileData);
    
    // Pad to 512-byte boundary
    const padding = (512 - (fileSize % 512)) % 512;
    for (let i = 0; i < padding; i++) {
      tarData.push(0);
    }
  }
  
  // Add two 512-byte blocks of zeros at the end (TAR EOF marker)
  for (let i = 0; i < 1024; i++) {
    tarData.push(0);
  }
  
  // Gzip the tar data
  const tarBuffer = new Uint8Array(tarData);
  return gzipSync(tarBuffer);
}

/**
 * Create an AR archive (used by .deb format)
 * AR format is simple: global header + file entries
 */
function createArArchive(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const arData: number[] = [];
  
  // AR global header (8 bytes)
  arData.push(...new TextEncoder().encode('!<arch>\n'));
  
  for (const file of files) {
    const fileName = file.name;
    const fileData = file.data;
    const fileSize = fileData.length;
    const mtime = Math.floor(Date.now() / 1000);
    
    // AR file header (60 bytes)
    const header = new Uint8Array(60);
    header.fill(0x20); // Fill with spaces
    
    // File name (16 bytes, left-aligned, padded with spaces)
    const nameBytes = new TextEncoder().encode(fileName);
    header.set(nameBytes.slice(0, 16), 0);
    
    // Modification time (12 bytes, decimal, left-aligned)
    const mtimeStr = mtime.toString().padEnd(12, ' ');
    header.set(new TextEncoder().encode(mtimeStr), 16);
    
    // Owner UID (6 bytes) - use 0
    header.set(new TextEncoder().encode('0     '), 28);
    
    // Owner GID (6 bytes) - use 0
    header.set(new TextEncoder().encode('0     '), 34);
    
    // File mode (8 bytes, octal) - use 100644
    header.set(new TextEncoder().encode('100644  '), 40);
    
    // File size (10 bytes, decimal, right-aligned)
    const sizeStr = fileSize.toString().padStart(10, ' ');
    header.set(new TextEncoder().encode(sizeStr), 48);
    
    // End marker (2 bytes)
    header.set(new TextEncoder().encode('`\n'), 58);
    
    // Add header and data
    arData.push(...header);
    arData.push(...fileData);
    
    // Pad to 2-byte boundary if needed
    if (fileSize % 2 !== 0) {
      arData.push(0x0a); // newline
    }
  }
  
  return new Uint8Array(arData);
}

/**
 * Build a .deb package
 */
export async function buildDebPackage(
  options: DebPackageOptions,
  files: FileMapping[],
  outputPath: string
): Promise<void> {
  console.log(' Building .deb package (native, no dependencies)...');
  console.log(`   Package: ${options.packageName} v${options.version}`);
  console.log(`   Architecture: ${options.architecture}`);
  console.log('');
  
  // 1. Create debian-binary file
  const debianBinary = new TextEncoder().encode('2.0\n');
  
  // 2. Create control.tar.gz
  const controlContent = [
    `Package: ${options.packageName}`,
    `Version: ${options.version}`,
    `Architecture: ${options.architecture}`,
    `Maintainer: ${options.maintainer}`,
    `Installed-Size: ${options.installedSize}`,
    `Section: ${options.section}`,
    `Priority: ${options.priority}`,
    `Description: ${options.description}`,
    '',
  ].join('\n');
  
  const tempDir = `/tmp/deb-build-${Date.now()}`;
  mkdirSync(tempDir, { recursive: true });
  
  try {
    const controlFile = join(tempDir, 'control');
    writeFileSync(controlFile, controlContent);
    
    const controlTarGz = createTarGz([
      { source: controlFile, destination: './control', mode: 0o644 }
    ]);
    
    // 3. Create data.tar.gz
    const dataTarGz = createTarGz(files);
    
    // 4. Create AR archive (.deb)
    const debArchive = createArArchive([
      { name: 'debian-binary', data: debianBinary },
      { name: 'control.tar.gz', data: controlTarGz },
      { name: 'data.tar.gz', data: dataTarGz },
    ]);
    
    // 5. Write .deb file
    writeFileSync(outputPath, debArchive);
    
    const fileSize = (statSync(outputPath).size / 1024).toFixed(0);
    console.log(' .deb package created successfully!');
    console.log(`   Output: ${outputPath} (${fileSize}K)`);
    console.log('');
  } finally {
    // Cleanup
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

// CLI interface
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: bun build-deb-native.ts <binary-path> <package-name> <version> [icon-path] [assets-path] [steam-so-path]');
    process.exit(1);
  }
  
  const [binaryPath, packageName, version, iconPath, assetsPath, steamSoPath] = args;
  
  if (!existsSync(binaryPath)) {
    console.error(` Binary not found: ${binaryPath}`);
    process.exit(1);
  }
  
  const files: FileMapping[] = [
    {
      source: binaryPath,
      destination: `./usr/local/bin/${packageName}`,
      mode: 0o755,
    },
  ];
  
  // Add assets if provided (required for launcher!)
  if (assetsPath && existsSync(assetsPath)) {
    files.push({
      source: assetsPath,
      destination: `./usr/local/bin/gemcore-assets`,
      mode: 0o644,
    });
    console.log(' Including assets file');
  }
  
  // Add Steam .so if provided
  if (steamSoPath && existsSync(steamSoPath)) {
    files.push({
      source: steamSoPath,
      destination: `./usr/local/bin/libsteam_api.so`,
      mode: 0o755,
    });
    console.log(' Including Steam SDK');
  }
  
  // Add icon if provided
  if (iconPath && existsSync(iconPath)) {
    files.push({
      source: iconPath,
      destination: `./usr/share/pixmaps/${packageName}.png`,
      mode: 0o644,
    });
  }
  
  // Create .desktop file (with full path to binary for GUI launcher)
  const desktopContent = [
    '[Desktop Entry]',
    'Type=Application',
    `Name=${packageName}`,
    `Exec=/usr/local/bin/${packageName}`,  // Full path for GUI launcher!
    `Icon=${packageName}`,
    'Categories=Game;',
    'Terminal=false',
    'StartupNotify=true',
    '',
  ].join('\n');
  
  const tempDesktopFile = `/tmp/${packageName}.desktop`;
  writeFileSync(tempDesktopFile, desktopContent);
  
  files.push({
    source: tempDesktopFile,
    destination: `./usr/share/applications/${packageName}.desktop`,
    mode: 0o644,
  });
  
  // Calculate installed size
  let installedSize = 0;
  for (const file of files) {
    installedSize += statSync(file.source).size;
  }
  installedSize = Math.ceil(installedSize / 1024); // Convert to KB
  
  const outputPath = `${packageName}_${version}_amd64.deb`;
  
  await buildDebPackage(
    {
      packageName,
      version,
      architecture: 'amd64',
      maintainer: 'Gemcore <support@gemcore.dev>',
      description: `${packageName} - Built with Gemcore`,
      section: 'games',
      priority: 'optional',
      installedSize,
    },
    files,
    outputPath
  );
  
  // Cleanup temp .desktop file
  if (existsSync(tempDesktopFile)) {
    rmSync(tempDesktopFile);
  }
  
  console.log(' Installation:');
  console.log(`   sudo apt install ./${outputPath}`);
  console.log('');
  console.log(' Uninstallation:');
  console.log(`   sudo apt remove ${packageName}`);
  console.log('');
}

