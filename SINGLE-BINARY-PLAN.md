# 🎯 Bakery Single-Binary Plan

## Ziel
**TRUE Single-File Executable** - Eine einzige Binary ohne externe Dateien!

```
dist/
└── bakery-app (5-8 MB) ← ALLES drin!
```

---

## Architektur

### 1. **Native WebView** (C/C++)
- macOS: WKWebView
- Windows: Edge WebView2
- Linux: WebKitGTK

### 2. **Embedded HTTP Server** (C/C++)
- Tiny HTTP Server im Binary
- Läuft auf `localhost:random-port`
- WebView lädt von `http://localhost:PORT/`

### 3. **Embedded Assets** (Base64)
- Alle HTML/CSS/JS/Images als Base64 im Binary
- HTTP Server liefert Assets aus Memory
- Keine externen Dateien!

### 4. **JavaScript Runtime** (für Backend)
- **Option A**: Bun (45 MB binary) ❌ Zu groß!
- **Option B**: QuickJS (klein, aber kein Node.js) ⚠️
- **Option C**: Embedded V8 (mittel, komplex) ⚠️
- **Option D**: **NUR WebView** - Backend läuft in WebView selbst! ✅

---

## Implementation Stack

### **Basis: webview/webview Library**
```
https://github.com/webview/webview
```
- Cross-platform C/C++ WebView
- Single header file
- ~500 lines of code
- Native bindings support

### **Build System**
- **CMake** für Cross-Platform builds
- **Bun** für Asset Embedding Script
- **Clang/GCC** für Compilation

---

## Workflow

### 1. **Development** (`bake dev`)
```
src/
├── index.html
├── app.js
└── styles.css

→ Bun HTTP Server (Hot Reload)
→ Native WebView öffnet localhost:3000
```

### 2. **Production Build** (`bake mac`)
```
1. Bun Script: src/ → Base64 embedded assets
2. CMake: Compile C++ mit embedded assets
3. Output: dist/bakery-app (single binary)
```

---

## Code Struktur

```
miniframework/
├── native/
│   ├── main.cpp              # Entry point
│   ├── webview_wrapper.cpp   # WebView initialization
│   ├── http_server.cpp       # Embedded HTTP server
│   ├── asset_loader.cpp      # Load embedded assets
│   └── embedded_assets.h     # Generated: Base64 assets
├── scripts/
│   ├── embed-assets.ts       # src/ → embedded_assets.h
│   └── build-native.ts       # Compile native binary
├── deps/
│   └── webview/              # webview.h single file
└── CMakeLists.txt            # Build config
```

---

## Asset Embedding

### Script: `scripts/embed-assets.ts`
```typescript
// Reads src/, converts to Base64, generates C++ header
const assets = {
  '/index.html': 'data:base64,...',
  '/app.js': 'data:base64,...'
};

// Generates: native/embedded_assets.h
const char* EMBEDDED_ASSETS = R"({
  "/index.html": "data:base64,...",
  ...
})";
```

### HTTP Server: `native/http_server.cpp`
```cpp
std::string serveAsset(const std::string& path) {
  // Parse EMBEDDED_ASSETS JSON
  // Return Base64 decoded content
  return decodeBase64(assets[path]);
}
```

---

## Backend Strategy

### **KEIN separater JS Runtime!**
Warum? Binary Size!

### **Backend läuft IN der WebView:**
```javascript
// In WebView (Browser environment)
import * as fs from 'socket:fs';  // Socket Runtime APIs
// ODER
// Use WebView bindings für native calls
```

### **Native Bindings** (wenn nötig)
```cpp
// C++ → JavaScript
webview.bind("readFile", [](std::string path) {
  return readFileFromDisk(path);
});
```

```javascript
// JavaScript → C++
const content = await readFile('/path/to/file');
```

---

## Binary Size Target

```
Native WebView Code:     ~500 KB
HTTP Server:             ~100 KB
Embedded Assets:         ~2-3 MB
QuickJS (optional):      ~1 MB
Total:                   ~4-5 MB ✅
```

---

## Build Commands

```bash
# Development
bake dev
→ Bun HTTP Server + Native WebView

# Production Build
bake mac
→ embed-assets.ts (src/ → embedded_assets.h)
→ CMake compile (C++ → single binary)
→ Output: dist/bakery-app

bake win
→ Cross-compile for Windows

bake linux
→ Cross-compile for Linux
```

---

## Cross-Platform Binary

### macOS
```
dist/bakery-app           # Mach-O binary
dist/bakery-app-arm64     # Apple Silicon
dist/bakery-app-x86_64    # Intel Mac
```

### Windows
```
dist/bakery-app.exe       # PE32 binary
```

### Linux
```
dist/bakery-app           # ELF binary
```

---

## Vorteile vs. Socket Runtime

| Feature | Socket Runtime | Native Binary |
|---------|---------------|---------------|
| Binary Size | ~5.8 MB + .app | ~4-5 MB single file |
| External Files | YES (.app bundle) | NO (pure binary) |
| Node.js APIs | Built-in ✅ | Via bindings ⚠️ |
| Development | Simple ✅ | Complex ⚠️ |
| Distribution | .app bundle | Single file ✅ |
| Maintenance | Easy ✅ | Manual ⚠️ |

---

## Nächste Schritte

1. ✅ `native/main.cpp` - WebView + HTTP Server
2. ✅ `scripts/embed-assets.ts` - Asset embedding
3. ✅ `CMakeLists.txt` - Build system
4. ✅ `bake mac` integration
5. ✅ Test single binary
6. ✅ Windows/Linux support

---

**SOLL ICH JETZT STARTEN?** 🚀

