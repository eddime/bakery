# 🥐 Bakery Runtime Architecture

## ❌ Was Bakery NICHT nutzt

- **Node.js** - Nicht erforderlich für End-User!
- **npm/yarn** - Nur für Development
- **Electron** - Kein Chromium embedded
- **NW.js** - Nicht verwendet
- **CEF** - Zu groß (100+ MB)

## ✅ Was Bakery nutzt

### Development (`bake dev`)

**Für Entwickler (lokal):**
- **Bun**: TypeScript execution + Hot Reload
- **libwebview.dylib**: Native WebView FFI
- Nur auf Developer-Machine erforderlich!

### Production (`bake mac` → `.app` Bundle)

**Für End-User (keine Installation nötig!):**

#### 1. JavaScript Runtime: **txiki.js**
- **QuickJS**: Minimale JS-Engine (~1 MB)
  - ES2020+ Support
  - Bytecode compilation (embedded im Binary)
  - Kein V8, kein Node.js!
- **libuv**: Async I/O (wie Node.js, aber standalone)
  - Event Loop
  - Timers, Promises, Async/Await
  - File System, Network
- **Embedded im Binary**: Keine externe Runtime nötig!

#### 2. UI Rendering: **Native System WebView**
- **macOS**: WebKit (WKWebView) - immer vorhanden
- **Windows**: Edge WebView2 - Teil von Windows 10+
- **Linux**: WebKitGTK - meist vorinstalliert

#### 3. Nur System-Libraries
```bash
$ otool -L BakeryDemo.app/Contents/MacOS/BakeryDemo
/usr/lib/libffi.dylib        # System library
/usr/lib/libSystem.B.dylib   # System library
/usr/lib/libcurl.4.dylib     # System library
```

**Alle Libraries sind auf macOS 10.13+ vorinstalliert!**

## 🎯 End-User Experience

**Was der User braucht:**
- ✅ macOS 10.13+ (oder Windows 10+, Linux)
- ✅ Das wars!

**Was der User NICHT braucht:**
- ❌ Node.js installieren
- ❌ npm packages
- ❌ Chromium downloaden
- ❌ Irgendwelche Runtimes

## 📦 Bundle Size Breakdown

```
BakeryDemo.app (3.9 MB total)
├── Binary (3.6 MB)
│   ├── txiki.js runtime (QuickJS + libuv) - ~1.5 MB
│   ├── Your app bytecode - ~50 KB
│   └── Other (FFI, etc.) - ~2 MB
├── libwebview.dylib (230 KB)
└── icon.icns (134 KB)
```

**Vergleich:**
- Electron App: ~120 MB (Chromium embedded)
- Neutralino: ~15 MB
- Tauri: ~5-10 MB
- **Bakery: ~3.9 MB** ✨

## 🚀 Wie funktioniert es?

### 1. Build-Time (Developer)
```bash
$ bake mac -o MyApp
```

1. **Bundling**: esbuild → single JS file
2. **Compilation**: txiki.js compile → QuickJS bytecode → embedded in binary
3. **Packaging**: Create .app bundle with binary + libwebview + assets

### 2. Run-Time (End-User)
```bash
$ open MyApp.app  # Doppelklick im Finder
```

1. **macOS startet**: `MyApp.app/Contents/MacOS/MyApp`
2. **txiki.js embedded runtime**: Lädt bytecode aus Binary
3. **QuickJS**: Führt embedded bytecode aus
4. **libwebview.dylib**: Creates native WebView window
5. **WKWebView**: Rendert HTML/CSS/JS (system WebKit)

**Kein Node.js, kein npm, nichts extra nötig!**

## 🎮 API Compatibility

### Was funktioniert (txiki.js):

**ES Modules:**
```javascript
import { app, Window } from './bakery-runtime.js';
```

**Async/Await:**
```javascript
async function loadData() {
  const response = await fetch('https://api.example.com/data');
  return await response.json();
}
```

**File System (tjs:fs):**
```javascript
import fs from 'tjs:fs';
const content = await fs.readFile('data.json');
```

**Network (tjs:http):**
```javascript
import http from 'tjs:http';
const server = http.createServer((req, res) => { ... });
```

**Timers:**
```javascript
setTimeout(() => console.log('Hello!'), 1000);
setInterval(() => console.log('Tick'), 1000);
```

### Was NICHT funktioniert:

❌ **Node.js-spezifische APIs:**
- `require()` (use ES modules `import`)
- `process.env` (use `tjs.env`)
- `__dirname` (use `tjs.cwd()`)
- Native Node modules (`.node` files)

❌ **npm packages mit Node.js dependencies**
- Verwende Browser-kompatible Packages
- Oder Bun-kompatible Packages für Development

## 💡 Best Practices

### 1. Use ES Modules
```javascript
// ✅ Good
import { app } from './bakery-runtime.js';

// ❌ Bad (Node.js only)
const { app } = require('./bakery-runtime.js');
```

### 2. Use txiki.js APIs for System Access
```javascript
// ✅ Good
import fs from 'tjs:fs';

// ❌ Bad (Node.js only)
import fs from 'node:fs';
```

### 3. Use Web APIs in WebView
```javascript
// ✅ Good (runs in WebView)
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🌍 Cross-Platform

**Same architecture on all platforms:**
- **Runtime**: txiki.js (QuickJS + libuv) - everywhere
- **WebView**: Native system WebView - everywhere
- **No Node.js** - everywhere

**Platform-specific:**
- **macOS**: WKWebView (WebKit)
- **Windows**: WebView2 (Edge/Chromium)
- **Linux**: WebKitGTK

**Result**: Consistent JS runtime, native UI rendering!

## 🎓 Summary

**Bakery = txiki.js + Native WebView**

- ✅ **No Node.js required** for end-users
- ✅ **Standalone binary** with embedded runtime
- ✅ **3.9 MB total** (vs 120 MB for Electron)
- ✅ **QuickJS bytecode** (fast, secure)
- ✅ **Native system WebView** (fast, native look)
- ✅ **Zero dependencies** for end-users

**Perfect for:**
- Desktop apps
- Games
- Tools
- Kiosk apps
- Anything that needs small, fast, native-looking UI!

