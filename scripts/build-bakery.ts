#!/usr/bin/env bun
/**
 * 🥐 Bakery - Build Script
 * Compiles Bakery apps to single-file executables
 */

import { spawn } from "bun";
import { existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";

interface BuildOptions {
  platform?: "mac" | "win" | "linux" | "all";
  output?: string;
  input: string;
  appName: string;
}

async function buildBakery(options: BuildOptions) {
  const { platform = "mac", input, appName, output } = options;

  const distDir = output || resolve(process.cwd(), "dist");
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  const platforms = platform === "all" 
    ? ["mac", "win", "linux"] 
    : [platform];

  console.log(`🥐 Building Bakery app: ${appName}`);
  console.log(`📦 Input: ${input}`);
  console.log(`📁 Output: ${distDir}`);
  console.log(`🖥️  Platforms: ${platforms.join(", ")}`);

  for (const targetPlatform of platforms) {
    console.log(`\n🔨 Building for ${targetPlatform}...`);

    let target: string;
    let outfile: string;

    switch (targetPlatform) {
      case "mac":
        target = "bun-darwin-arm64"; // M1/M2
        outfile = join(distDir, `${appName}-darwin-arm64`);
        break;
      case "win":
        target = "bun-windows-x64";
        outfile = join(distDir, `${appName}-windows-x64.exe`);
        break;
      case "linux":
        target = "bun-linux-x64";
        outfile = join(distDir, `${appName}-linux-x64`);
        break;
      default:
        console.error(`❌ Unknown platform: ${targetPlatform}`);
        continue;
    }

    const buildProcess = spawn([
      "bun",
      "build",
      "--compile",
      `--target=${target}`,
      input,
      `--outfile=${outfile}`,
    ], {
      env: { ...process.env, NODE_ENV: "production" },
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(buildProcess.stdout).text();
    const errors = await new Response(buildProcess.stderr).text();

    if (errors) {
      console.error(`❌ Build failed for ${targetPlatform}:`, errors);
      continue;
    }

    console.log(output);

    // Check file size
    if (existsSync(outfile)) {
      const stats = Bun.file(outfile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      console.log(`✅ Built ${targetPlatform}: ${outfile} (${sizeMB} MB)`);
    } else {
      console.error(`❌ Output file not found: ${outfile}`);
    }
  }

  console.log(`\n✅ Build complete!`);
  console.log(`📦 Output directory: ${distDir}`);
}

// CLI Usage
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  const platform = args.find(arg => ["mac", "win", "linux", "all"].includes(arg)) as any || "mac";
  const input = args.find(arg => arg.endsWith(".ts") || arg.endsWith(".js")) || "test-bakery-hybrid.ts";
  const appName = args.find(arg => arg.startsWith("--name="))?.split("=")[1] || "bakery-app";
  const output = args.find(arg => arg.startsWith("--output="))?.split("=")[1];

  buildBakery({ platform, input, appName, output });
}

export { buildBakery };

