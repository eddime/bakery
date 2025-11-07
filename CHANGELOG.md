# 🥐 Bakery Changelog

## v1.0.0 - Socket Runtime Edition (November 7, 2024)

### 🎉 Complete Rewrite
- **Switched to Socket Runtime** - 1.5 MB binary size achieved!
- **Direct Node.js APIs** - Frontend can directly access fs, path, process, os
- **No separate backend needed** - Socket Runtime allows direct API access from WebView
- **Cross-platform support** - Mac, Windows, Linux builds

### ✨ Features
- `bake init <name>` - Create new Bakery project
- `bake dev` - Development mode with hot reload
- `bake build` - Build for production (mac, win, linux, all)
- `bakery.config.js` - Configure default project and named projects
- **Config-based workflow** - No more `cd` to project directories!

### 📦 What's Included
- Socket Runtime SDK integration
- Example project: `hello-world-socket`
- Assets (icons) for cross-platform apps
- Clean, minimal project structure

### 🗑️ Removed (Old Architecture)
- txiki.js runtime
- Bun production runtime
- JerryScript experiments
- Custom C IPC bridges
- Native FFI bindings
- Old example projects

### 🎯 Binary Size Achievement
- **Target**: 5-8 MB
- **Actual**: ~1.5 MB (Socket Runtime)
- **Includes**: JavaScript runtime + Node.js APIs + WebView

### 📖 Documentation
- Updated README with Socket Runtime architecture
- New GETTING_STARTED guide
- Architecture documentation

---

## Previous Versions (Archived)

### v0.x.x - txiki.js Era
- Attempted IPC implementations
- Multiple runtime experiments
- Various build systems
- **Status**: Deprecated, removed in v1.0.0

