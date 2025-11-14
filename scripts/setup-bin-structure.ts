#!/usr/bin/env bun
// 🥐 Setup bin/ structure with shared Steamworks DLLs

import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";

const FRAMEWORK_DIR = join(import.meta.dir, "..");
const BIN_DIR = join(FRAMEWORK_DIR, "bin");
const STEAMWORKS_SRC = join(FRAMEWORK_DIR, "deps", "steamworks", "sdk", "redistributable_bin");

console.log("🥐 Setting up bin/ structure with shared Steamworks DLLs\n");

// Create directories
const dirs = [
  "steamworks/macos",
  "steamworks/windows",
  "steamworks/linux",
  "mac-arm64",
  "mac-x64",
  "win-x64",
  "linux-x64",
  "linux-arm64",
];

for (const dir of dirs) {
  const fullPath = join(BIN_DIR, dir);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  }
}

console.log("");

// Copy Steamworks DLLs to shared location
const steamworksCopies = [
  {
    src: join(STEAMWORKS_SRC, "osx", "libsteam_api.dylib"),
    dest: join(BIN_DIR, "steamworks", "macos", "libsteam_api.dylib"),
    name: "macOS (Universal: ARM64 + x64)",
  },
  {
    src: join(STEAMWORKS_SRC, "win64", "steam_api64.dll"),
    dest: join(BIN_DIR, "steamworks", "windows", "steam_api64.dll"),
    name: "Windows 64-bit",
  },
  {
    src: join(STEAMWORKS_SRC, "steam_api.dll"),
    dest: join(BIN_DIR, "steamworks", "windows", "steam_api.dll"),
    name: "Windows 32-bit",
  },
  {
    src: join(STEAMWORKS_SRC, "linux64", "libsteam_api.so"),
    dest: join(BIN_DIR, "steamworks", "linux", "libsteam_api.so"),
    name: "Linux (x64 + ARM64)",
  },
];

console.log("📦 Copying Steamworks DLLs to shared location:\n");

for (const { src, dest, name } of steamworksCopies) {
  if (existsSync(src)) {
    copyFileSync(src, dest);
    const stats = await Bun.file(dest).stat();
    const sizeMB = (stats.size / 1024).toFixed(0);
    console.log(`   ✅ ${name.padEnd(35)} ${sizeMB} KB`);
  } else {
    console.log(`   ⚠️  ${name.padEnd(35)} NOT FOUND`);
  }
}

console.log("\n✅ bin/ structure ready!");
console.log("\n📊 Structure:");
console.log("   bin/");
console.log("   ├── steamworks/          # Shared Steamworks DLLs (~1.3 MB)");
console.log("   │   ├── macos/");
console.log("   │   ├── windows/");
console.log("   │   └── linux/");
console.log("   ├── mac-arm64/           # Launcher binaries");
console.log("   ├── mac-x64/");
console.log("   ├── win-x64/");
console.log("   ├── linux-x64/");
console.log("   └── linux-arm64/");
console.log("\n💡 Build scripts will copy from steamworks/ to output bundles");

