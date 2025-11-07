# 🥐 Bakery - Better Solution: In-Memory Assets

## 💡 **DAS PROBLEM MIT /tmp:**

```
Current Approach:
1. Read embedded data from binary
2. Extract to /tmp/bakery-{PID}/
3. Create .app structure
4. Launch with 'open'

Problems:
❌ Slow (extraction takes time)
❌ Disk I/O
❌ /tmp cleanup issues
❌ Security (files visible in /tmp)
```

## ✅ **BESSERE LÖSUNG: In-Memory HTTP Server**

```
New Approach:
1. Read embedded data from binary
2. Keep in memory (Base64 decoded)
3. Start HTTP server (localhost:random-port)
4. Socket Runtime loads from http://localhost:PORT/
5. No files on disk!
```

## 🚀 **ARCHITECTURE:**

```typescript
┌─────────────────────────────────┐
│  Bakery Launcher (C++)          │
│  - Reads embedded Base64 data   │
│  - Decodes to memory             │
│  - Starts HTTP server            │
│  - Launches Socket Runtime       │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│  HTTP Server (in-memory)        │
│  GET /index.html → memory       │
│  GET /socket/fs.js → memory     │
│  No disk access!                │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│  Socket Runtime Binary          │
│  Loads: http://localhost:8080/  │
└─────────────────────────────────┘
```

## 🔧 **IMPLEMENTATION:**

### Option A: C++ HTTP Server (minimal)
```cpp
// Use httplib.h (single header)
#include "httplib.h"

// Store decoded assets in memory
std::map<std::string, std::vector<uint8_t>> assets;

// Start server
httplib::Server svr;
svr.Get("/(.*)", [&](const auto& req, auto& res) {
    std::string path = req.path;
    if (assets.count(path)) {
        res.set_content(
            (char*)assets[path].data(),
            assets[path].size(),
            "application/octet-stream"
        );
    } else {
        res.status = 404;
    }
});

// Start in background thread
std::thread server_thread([&]() {
    svr.listen("127.0.0.1", 0); // Random port
});

int port = svr.port();
```

### Option B: Bun HTTP Server (easier!)
```typescript
// launcher-with-server.ts
import { serve } from 'bun';

// Decode embedded assets
const assets = new Map<string, Uint8Array>();
for (const [path, base64] of Object.entries(embeddedAssets)) {
    assets.set(path, Buffer.from(base64, 'base64'));
}

// Start server
const server = serve({
    port: 0, // Random port
    fetch(req) {
        const url = new URL(req.url);
        const asset = assets.get(url.pathname);
        
        if (asset) {
            return new Response(asset);
        }
        return new Response('Not found', { status: 404 });
    }
});

console.log(`Server: http://localhost:${server.port}`);

// Launch Socket Runtime with URL
const proc = spawn([
    socketBinaryPath,
    `--url=http://localhost:${server.port}/`
]);
```

## 🎯 **ADVANTAGES:**

1. ✅ **No /tmp files** - Everything in memory
2. ✅ **Faster** - No disk I/O
3. ✅ **Cleaner** - No cleanup needed
4. ✅ **Secure** - Assets not visible on disk
5. ✅ **Smaller** - No .app structure needed

## ⚠️ **ABER:**

**Socket Runtime KANN das vielleicht nicht!**

Socket Runtime erwartet:
- File system access für `socket/` modules
- Relative imports zwischen JS files
- `fs.readFile()` für configs

**Lösung:**
- Wir müssen Socket Runtime's `fs` module patchen
- ODER: Nur HTML/CSS/JS in-memory, `socket/` auf disk

## 🤔 **HYBRID APPROACH:**

```
Best of both:
1. socket/ folder → /tmp (needed for imports)
2. User's app (HTML/CSS/JS) → in-memory server
3. Socket Runtime binary → /tmp

Result:
- Fast (user assets in memory)
- Compatible (socket/ on disk)
- Clean (only framework files in /tmp)
```

## 💭 **ODER NOCH BESSER:**

**Nutze Socket Runtime's eigenen HTTP Server!**

Socket Runtime HAT einen eingebauten dev server!

```bash
# Socket Runtime kann URLs laden!
socket-runtime --url=http://localhost:8080/
```

**Dann:**
1. Bun HTTP Server mit embedded assets
2. Socket Runtime lädt von localhost
3. Kein /tmp nötig!

---

**SOLL ICH DAS IMPLEMENTIEREN?** 🚀

**Option 1:** Bun HTTP Server + Socket Runtime URL loading
**Option 2:** C++ HTTP Server (httplib.h)
**Option 3:** Hybrid (socket/ in /tmp, app in memory)

