# ⚡ Zippy Architecture

## Overview

Zippy is a high-performance desktop application framework that combines:
- **txiki.js** - JavaScript runtime (QuickJS + libuv)
- **Native WebView** - OS-provided web rendering
- **Zero-Copy IPC** - High-performance communication

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Zippy Application                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐    ┌─────────────────────────┐   │
│  │   Frontend (HTML/    │◄───┤  Zero-Copy IPC          │   │
│  │   CSS/JS)            │    │  (Shared Memory)        │   │
│  │                      │────►│                         │   │
│  │  - Web APIs          │    │  - Lock-free queues     │   │
│  │  - Framework APIs    │    │  - 16 MB buffer         │   │
│  └──────────────────────┘    └─────────────────────────┘   │
│           ▲                              ▲                  │
│           │                              │                  │
│  ┌────────▼──────────────────────────────▼──────────────┐  │
│  │         Native WebView                                │  │
│  │  macOS: WKWebView    Linux: WebKitGTK                │  │
│  │  Windows: Edge WebView2                              │  │
│  │                                                       │  │
│  │  + Consistency Layer (Polyfills)                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                              ▲                              │
│                              │                              │
│  ┌───────────────────────────▼──────────────────────────┐  │
│  │         txiki.js Runtime                              │  │
│  │                                                       │  │
│  │  ┌─────────────────┐  ┌─────────────────────────┐   │  │
│  │  │ QuickJS Engine  │  │ Node.js APIs            │   │  │
│  │  │ - ES2023        │  │ - fs, path              │   │  │
│  │  │ - Fast startup  │  │ - http, https           │   │  │
│  │  └─────────────────┘  └─────────────────────────┘   │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ libuv Event Loop                               │  │  │
│  │  │ - Async I/O, Timers, Networking                │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. txiki.js Runtime

The core JavaScript runtime based on QuickJS and libuv.

**Features:**
- ES2023 support
- Node.js compatible APIs
- Fast startup (<50ms)
- Small memory footprint (20-40 MB)
- WinterCG compliant

**Location:** `src/runtime/`

### 2. Native WebView

Uses OS-provided WebView for rendering UI.

**Platforms:**
- macOS: WKWebView (WebKit/Safari)
- Linux: WebKitGTK 6.0
- Windows: Edge WebView2 (Chromium)

**Consistency Layer:**
- CSS normalization
- Feature polyfills
- Cross-browser compatibility shims

**Location:** `src/webview/`

### 3. Zero-Copy IPC

High-performance communication between JavaScript and WebView.

**Features:**
- Shared memory (16 MB default)
- Lock-free ring buffer
- No JSON serialization overhead
- Sub-millisecond latency

**Location:** `src/ipc/`

### 4. Framework APIs

High-level APIs for desktop app development.

**Modules:**
- `zippy:app` - Application lifecycle
- `zippy:window` - Window management
- `zippy:dialog` - Native dialogs
- `zippy:shell` - OS integration
- `zippy:worker` - StreamWorker (unique!)

**Location:** `src/api/`

## Build System

### Cross-Platform Compilation

Zippy supports building for any platform from any platform.

**How it works:**
1. Pre-compiled runtime bundles for each target
2. User code is bundled and embedded
3. Assets are compressed and embedded
4. Final binary is packaged

**Supported targets:**
- `linux-x64`
- `linux-arm64`
- `darwin-x64` (Intel Mac)
- `darwin-arm64` (Apple Silicon)
- `windows-x64`

### Build Pipeline

```
User Code (TS/JS)
      ↓
   Bundler (esbuild)
      ↓
   Embedded Data (C header)
      ↓
   Runtime Binary (pre-compiled)
      ↓
   Binary Patcher
      ↓
   Single-File Executable
```

## Performance Optimizations

### 1. Zero-Copy IPC

Instead of JSON serialization, we use shared memory for data transfer.

**Traditional approach:**
```
JS Object → JSON.stringify → Send → JSON.parse → WebView
```

**Zippy approach:**
```
JS Object → Write to shared memory → WebView reads directly
```

### 2. Incremental GC

QuickJS uses an incremental garbage collector that doesn't pause the event loop.

### 3. Hardware Acceleration

All WebViews use GPU acceleration by default:
- WebGL for 3D graphics
- Hardware-accelerated Canvas
- CSS transforms on GPU

### 4. Ahead-of-Time Compilation

User code can be compiled to bytecode for faster startup.

## Size Breakdown

Typical Zippy app size:

```
Component                Size
────────────────────────────────
txiki.js runtime         5 MB
WebView (system)         0 MB
Zippy APIs               500 KB
User code (embedded)     1-5 MB
Assets (compressed)      1-10 MB
────────────────────────────────
Total                    ~7-20 MB
```

Compare to Electron: 150-300 MB

## Security

- Native WebView security (same as system browser)
- Sandboxed by default
- No remote code execution
- Content Security Policy support

## Future Enhancements

1. **WebAssembly Support** - Run WASM modules
2. **GPU Compute** - WebGPU for compute shaders
3. **Native Extensions** - C/C++ plugins
4. **Hot Code Reload** - Update code without restart
5. **Distributed Apps** - Multi-window, multi-process

---

For more details, see:
- [API Documentation](./API.md)
- [Build Guide](./BUILD.md)
- [Performance Tips](./PERFORMANCE.md)

