# 🚀 Bakery Pre-Compiled Runtime Architecture

## Konzept
**Framework Developer (DU)** baut Runtime einmal → **App Developer (USER)** nutzt sie ohne Compiler!

---

## Architektur

### **Phase 1: Framework Development (DU)**
```
1. Baue Native Runtime in C++:
   - WebView integration
   - Embedded HTTP Server
   - Asset loader

2. Compile für alle Platforms:
   - macOS (arm64 + x64)
   - Windows (x64)
   - Linux (x64)

3. Veröffentliche im Framework:
   runtime/
   ├── bakery-darwin-arm64     (~2 MB)
   ├── bakery-darwin-x64       (~2 MB)
   ├── bakery-windows-x64.exe  (~2 MB)
   └── bakery-linux-x64        (~2 MB)
```

### **Phase 2: App Development (USER)**
```bash
# User installiert Framework
npm install -g bakery

# User erstellt App
bake init my-app
cd my-app

# User baut für alle Platforms
bake mac    # → dist/my-app (macOS binary)
bake win    # → dist/my-app.exe (Windows binary)
bake linux  # → dist/my-app (Linux binary)
```

**KEIN C++ Compiler nötig!** ✅

---

## Build Process (User Perspective)

```
User führt aus: bake mac

Interner Ablauf:
┌─────────────────────────────────────┐
│ 1. Asset Embedding                  │
│    src/ → Base64 → assets.json      │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ 2. Runtime Selection                │
│    runtime/bakery-darwin-arm64      │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ 3. Bundle Creation                  │
│    Runtime + assets.json → Binary   │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ 4. Output                           │
│    dist/my-app (5-8 MB)             │
└─────────────────────────────────────┘
```

---

## Datei Struktur

### **Framework (miniframework/):**
```
miniframework/
├── runtime/                    # Pre-compiled binaries
│   ├── bakery-darwin-arm64
│   ├── bakery-darwin-x64
│   ├── bakery-windows-x64.exe
│   └── bakery-linux-x64
│
├── scripts/
│   ├── embed-assets.ts         # src/ → Base64
│   └── bundle-runtime.ts       # Runtime + Assets → Final
│
├── native/                     # Source (für Framework-Dev)
│   ├── main.cpp
│   ├── http_server.cpp
│   ├── webview_wrapper.cpp
│   └── CMakeLists.txt
│
├── cli.ts                      # bake commands
└── package.json
```

### **User App (my-app/):**
```
my-app/
├── src/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── bakery.config.js
└── package.json

# Nach bake mac:
my-app/
└── dist/
    └── my-app                  # Single binary! ✅
```

---

## Asset Embedding Strategy

### **Format: Appended Data Section**
```
Binary Structure:
┌──────────────────────────┐
│ Pre-compiled Runtime     │  ← Native Code (2 MB)
│ (WebView + HTTP Server)  │
├──────────────────────────┤
│ MAGIC_MARKER             │  ← "BAKERY_ASSETS_START"
├──────────────────────────┤
│ Assets JSON              │  ← Base64 encoded assets
│ {                        │
│   "/index.html": "...",  │
│   "/app.js": "..."       │
│ }                        │
├──────────────────────────┤
│ MAGIC_MARKER             │  ← "BAKERY_ASSETS_END"
├──────────────────────────┤
│ Assets Size (8 bytes)    │  ← Offset for runtime to read
└──────────────────────────┘
```

### **Runtime liest Assets:**
```cpp
// In main.cpp:
std::string readEmbeddedAssets() {
  // 1. Open self binary
  std::ifstream self(argv[0], std::ios::binary);
  
  // 2. Seek to end - 8 bytes (size marker)
  self.seekg(-8, std::ios::end);
  uint64_t assetsSize;
  self.read((char*)&assetsSize, 8);
  
  // 3. Seek back to assets start
  self.seekg(-8 - assetsSize, std::ios::end);
  
  // 4. Read JSON
  std::string json(assetsSize, '\0');
  self.read(&json[0], assetsSize);
  
  return json;
}
```

---

## scripts/bundle-runtime.ts

```typescript
#!/usr/bin/env bun
// Bundles pre-compiled runtime with user assets

import { readFileSync, writeFileSync } from 'fs';
import { platform, arch } from 'os';

interface BundleOptions {
  runtime: string;        // Path to runtime binary
  assets: string;         // Path to assets.json
  output: string;         // Output path
}

function bundleRuntime(options: BundleOptions) {
  console.log('📦 Bundling runtime with assets...');
  
  // 1. Read pre-compiled runtime
  const runtime = readFileSync(options.runtime);
  console.log(`   Runtime: ${(runtime.length / 1024 / 1024).toFixed(1)}MB`);
  
  // 2. Read embedded assets
  const assets = readFileSync(options.assets, 'utf8');
  const assetsBuffer = Buffer.from(assets, 'utf8');
  console.log(`   Assets: ${(assetsBuffer.length / 1024).toFixed(1)}KB`);
  
  // 3. Create markers
  const startMarker = Buffer.from('BAKERY_ASSETS_START', 'utf8');
  const endMarker = Buffer.from('BAKERY_ASSETS_END', 'utf8');
  
  // 4. Create size marker (8 bytes)
  const sizeBuffer = Buffer.alloc(8);
  sizeBuffer.writeBigUInt64LE(BigInt(assetsBuffer.length));
  
  // 5. Combine all parts
  const finalBinary = Buffer.concat([
    runtime,              // Pre-compiled runtime
    startMarker,          // Marker
    assetsBuffer,         // Assets JSON
    endMarker,            // Marker
    sizeBuffer            // Size (for reading)
  ]);
  
  // 6. Write final binary
  writeFileSync(options.output, finalBinary, { mode: 0o755 });
  
  console.log(`✅ Final binary: ${(finalBinary.length / 1024 / 1024).toFixed(1)}MB`);
  console.log(`📍 Output: ${options.output}`);
}

// CLI
const platform = process.argv[2] || 'mac';
const assetsPath = process.argv[3] || './dist-embedded/assets.json';
const outputPath = process.argv[4] || './dist/my-app';

const runtimeMap = {
  'mac': arch() === 'arm64' ? 'bakery-darwin-arm64' : 'bakery-darwin-x64',
  'win': 'bakery-windows-x64.exe',
  'linux': 'bakery-linux-x64'
};

const runtimePath = `./runtime/${runtimeMap[platform]}`;

bundleRuntime({
  runtime: runtimePath,
  assets: assetsPath,
  output: outputPath
});
```

---

## CLI Integration (cli.ts)

```typescript
async function buildCommand(args: string[]) {
  const platform = args[0] || 'mac';
  const projectDir = resolve('.');
  
  console.log(`🥐 Building for ${platform}...`);
  
  // 1. Embed assets
  console.log('🔒 Embedding assets...');
  await spawn(['bun', 'run', 'scripts/embed-assets.ts', 'src', 'dist-embedded']);
  
  // 2. Bundle with runtime
  console.log('📦 Bundling runtime...');
  await spawn([
    'bun', 
    'run', 
    'scripts/bundle-runtime.ts', 
    platform,
    'dist-embedded/assets.json',
    `dist/my-app${platform === 'win' ? '.exe' : ''}`
  ]);
  
  console.log('✅ Build complete!');
}
```

---

## Vorteile

### **Für Framework-Developer (DU):**
- ✅ Baue Runtime einmal
- ✅ Veröffentliche binaries im npm package
- ✅ Wartung nur am Framework

### **Für App-Developer (USER):**
- ✅ KEIN C++ Compiler nötig
- ✅ KEIN CMake nötig
- ✅ True cross-platform from any OS
- ✅ Einfach: `bake mac/win/linux`
- ✅ Single binary output

---

## Nächste Schritte

1. ✅ Native Runtime bauen (C++)
   - webview integration
   - HTTP server
   - Asset loader from self

2. ✅ Compile für alle Platforms
   - macOS (arm64 + x64)
   - Windows (x64)
   - Linux (x64)

3. ✅ scripts/bundle-runtime.ts
   - Runtime + Assets → Final Binary

4. ✅ CLI integration
   - bake mac/win/linux nutzt bundle-runtime

5. ✅ Test
   - Single binary ohne externe Files

---

**BEREIT ZUM START?** 🚀

