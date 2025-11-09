#!/usr/bin/env bun
/**
 * 🥐 Bakery Asset Bundler
 * Copy only production-ready assets (no dev dependencies)
 */

import { existsSync, mkdirSync, cpSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

function copyProductionAssets(srcDir: string, destDir: string, projectDir: string) {
  console.log('📦 Bundling production assets...');
  
  // Copy only specific production files from node_modules
  const nodeModulesDir = join(projectDir, 'node_modules');
  if (existsSync(nodeModulesDir)) {
    const destNodeModules = join(destDir, 'node_modules');
    mkdirSync(destNodeModules, { recursive: true });
    
    // List of packages to include (only dist/min files)
    const packages = ['phaser', 'excalibur', 'kaboom'];
    let totalSize = 0;
    
    for (const pkg of packages) {
      const pkgDir = join(nodeModulesDir, pkg);
      if (existsSync(pkgDir)) {
        const destPkgDir = join(destNodeModules, pkg);
        mkdirSync(destPkgDir, { recursive: true });
        
        // Copy only minified production files
        const distDir = join(pkgDir, 'dist');
        if (existsSync(distDir)) {
          mkdirSync(join(destPkgDir, 'dist'), { recursive: true });
          
          const distFiles = readdirSync(distDir);
          for (const file of distFiles) {
            // Only copy .min.js files (production builds)
            if (file.endsWith('.min.js') || file.endsWith('.min.js.map')) {
              cpSync(
                join(distDir, file),
                join(destPkgDir, 'dist', file)
              );
            }
          }
          
          // Calculate size
          const size = getDirSize(join(destPkgDir, 'dist'));
          totalSize += size;
          console.log(`   ✅ ${pkg}: ${formatBytes(size)}`);
        }
        
        // Copy package.json for version info
        const pkgJson = join(pkgDir, 'package.json');
        if (existsSync(pkgJson)) {
          cpSync(pkgJson, join(destPkgDir, 'package.json'));
        }
      }
    }
    
    console.log(`   📊 Total node_modules: ${formatBytes(totalSize)}`);
  }
}

function getDirSize(dirPath: string): number {
  let size = 0;
  
  if (!existsSync(dirPath)) return 0;
  
  const files = readdirSync(dirPath);
  for (const file of files) {
    const filePath = join(dirPath, file);
    const stats = statSync(filePath);
    
    if (stats.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }
  
  return size;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Export for use in cli.ts
export { copyProductionAssets, getDirSize, formatBytes };

// CLI usage
if (import.meta.main) {
  const projectDir = process.argv[2] || '.';
  const destDir = process.argv[3] || './dist/Resources';
  
  copyProductionAssets(join(projectDir, 'src'), destDir, projectDir);
  
  console.log('✅ Asset bundling complete!');
}

