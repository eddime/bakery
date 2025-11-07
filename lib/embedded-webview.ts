/**
 * 🥐 Bakery - Embedded WebView Runtime
 * Extracts and loads native webview libraries from embedded Base64 data
 */

import { writeFileSync, existsSync, mkdirSync, statSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { EMBEDDED_WEBVIEW_LIBS } from "./embedded-webview-data";

/**
 * Extracts the native webview library and returns its path.
 * Sets process.env.WEBVIEW_PATH for FFI to find the library.
 */
export function getWebViewLibraryPath(): string {
  const platform = process.platform;
  const arch = process.arch;
  
  // Determine library name and key
  let libName: string;
  let libKey: string;

  if (platform === "darwin") {
    libName = "libwebview.dylib";
    libKey = "darwin";
  } else if (platform === "win32") {
    libName = "libwebview.dll";
    libKey = "win32";
  } else if (platform === "linux") {
    libName = `libwebview-${arch}.so`;
    libKey = `linux-${arch}`;
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  // In development: Use deps/webview-prebuilt directory
  if (process.env.NODE_ENV !== "production") {
    const devPath = join(import.meta.dir, "../deps/webview-prebuilt", libName);
    if (existsSync(devPath)) {
      process.env.WEBVIEW_PATH = devPath;
      console.log(`📚 Using dev webview: ${libName}`);
      return devPath;
    }
  }

  // In production: Extract embedded library to temp directory
  const tempDir = join(tmpdir(), "bakery-webview");
  const libPath = join(tempDir, libName);

  // Get the base64 data
  const base64Data = EMBEDDED_WEBVIEW_LIBS[libKey];
  if (!base64Data) {
    throw new Error(
      `No embedded webview library found for ${platform}${arch ? ` ${arch}` : ""}. ` +
        `Run 'bun scripts/embed-webview-lib.ts' to embed libraries.`
    );
  }

  // Decode to buffer
  const binaryData = Buffer.from(base64Data, "base64");

  // Check if already extracted AND has correct size (avoid stale cache)
  if (existsSync(libPath)) {
    try {
      const stats = statSync(libPath);
      if (stats.size === binaryData.length) {
        // Same size - assume it's current
        console.log(`✅ WebView library cached (${(stats.size / 1024).toFixed(1)}KB): ${libPath}`);
        process.env.WEBVIEW_PATH = libPath;
        return libPath;
      } else {
        // Different size - old version! Delete and re-extract
        console.log(`🔄 Updating cached library...`);
        unlinkSync(libPath);
      }
    } catch (e) {
      // Can't check size, just delete and re-extract
      console.log(`🔄 Re-extracting library...`);
      try {
        unlinkSync(libPath);
      } catch {}
    }
  }

  // Ensure temp directory exists
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }

  // Write library
  writeFileSync(libPath, binaryData);

  // Make executable on Unix-like systems
  if (platform !== "win32") {
    Bun.spawnSync(["chmod", "+x", libPath]);
  }
  
  console.log(`✅ WebView library extracted: ${libPath}`);
  
  // Set env var for FFI to find the library
  process.env.WEBVIEW_PATH = libPath;
  
  return libPath;
}

