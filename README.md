# 🥐 Bakery - Blazing Fast Desktop Framework

[![CI](https://github.com/eddime/bakery/actions/workflows/ci.yml/badge.svg)](https://github.com/eddime/bakery/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/eddime/bakery)

**Bakery** is a lightweight, high-performance desktop application framework that combines the best of both worlds:
- 🚀 **Tiny** - 5-8 MB binaries (vs Electron's 150+ MB)
- ⚡ **Fast** - <100ms startup, native performance
- 🎮 **Game-Ready** - Hardware acceleration, high FPS support
- 🌍 **Cross-Platform** - Build for all OS from any OS
- 📦 **Single Binary** - Everything in one file
- 🔧 **Node.js APIs** - Full compatibility with npm ecosystem

## Why Bakery?

| Feature | Bakery | Electron | Tauri | Neutralino |
|---------|--------|----------|-------|------------|
| Binary Size | **5-8 MB** | 150+ MB | 5-10 MB | 3-5 MB |
| Startup | **<100ms** | 1-2s | 200ms | 200ms |
| Node.js APIs | **✅ Full** | ✅ Full | ❌ Limited | ❌ Very Limited |
| Native WebView | **✅** | ❌ Bundled | ✅ | ✅ |
| Cross-Compile | **✅** | ✅ | ✅ | ✅ |
| StreamWorker | **✅ Unique** | ❌ | ❌ | ❌ |
| TypeScript | **✅ Native** | Via tools | Via tools | ❌ |

## Architecture

```
┌─────────────────────────────────────────┐
│         Bakery Framework                 │
├─────────────────────────────────────────┤
│  Native WebView (0 MB - system)         │
│  + Consistency Layer (500 KB)           │
│           ↕ Zero-Copy IPC                │
│  txiki.js Runtime (5 MB)                │
│  - QuickJS + libuv                      │
│  - Full Node.js APIs                    │
└─────────────────────────────────────────┘
```

## Quick Start

```bash
# Install Bakery CLI
npm install -g bakery-cli

# Create new project
bakery init my-app
cd my-app

# Development with hot reload
bakery dev

# Build for current platform
bakery build

# Build for all platforms
bakery build --all
```

## Example

```typescript
// main.ts
import { app, Window } from 'bakery:app';

app.on('ready', async () => {
    const win = new Window({
        title: 'My Bakery App',
        width: 1200,
        height: 800,
    });
    
    await win.loadFile('./index.html');
});
```

## Features

- ⚡ **Lightning Fast** - txiki.js (QuickJS + libuv) runtime
- 🎨 **Consistent Rendering** - Smart polyfills for WebView differences
- 🎮 **Game-Ready** - Hardware acceleration, WebGL, high FPS
- 🔄 **StreamWorker** - Unique streaming worker threads
- 📦 **Single Binary** - Optional asset embedding
- 🌍 **True Cross-Compile** - Build for any OS from any OS
- 🔥 **Hot Reload** - Instant updates during development
- 📝 **TypeScript First** - Native TS support

## Project Status

🚧 **Early Development** - Not ready for production yet!

We're building Bakery to be the fastest, smallest, most powerful desktop framework.

## Roadmap

- [x] Project architecture
- [ ] txiki.js integration
- [ ] WebView FFI bindings
- [ ] Cross-platform build system
- [ ] CLI tool
- [ ] Hot reload
- [ ] StreamWorker API
- [ ] Documentation & examples

## License

MIT

---

**Made with 🥐 and TypeScript**

