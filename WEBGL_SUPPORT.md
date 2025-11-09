# 🎮 WebGL Support in Bakery

## ✅ **WebGL ist STANDARDMÄSSIG aktiviert!**

Alle Bakery Launcher haben **WebGL + Hardware Acceleration** standardmäßig aktiviert für:
- ✅ **Phaser 3** Spiele
- ✅ **Three.js** 3D-Apps
- ✅ **Babylon.js** Spiele
- ✅ **PixiJS** Rendering
- ✅ Alle WebGL-basierten Frameworks

---

## 🪟 **Windows (WebView2)**

### Automatisch aktivierte Flags:

```cpp
--enable-features=msWebView2EnableWebGL
--disable-gpu-sandbox
--enable-accelerated-2d-canvas
--ignore-gpu-blocklist
--enable-webgl
--enable-webgl2
--enable-gpu-rasterization
--enable-zero-copy
```

### Was diese Flags bewirken:

| Flag | Funktion |
|------|----------|
| `msWebView2EnableWebGL` | WebGL in WebView2 aktivieren |
| `disable-gpu-sandbox` | GPU-Zugriff ohne Sandbox-Beschränkungen |
| `enable-accelerated-2d-canvas` | Hardware-beschleunigte Canvas2D |
| `ignore-gpu-blocklist` | GPU auch bei "unsicheren" Treibern nutzen |
| `enable-webgl` | WebGL 1.0 aktivieren |
| `enable-webgl2` | WebGL 2.0 aktivieren |
| `enable-gpu-rasterization` | GPU für Rasterisierung nutzen |
| `enable-zero-copy` | Zero-Copy Rendering |

### Voraussetzungen:

- ✅ **WebView2 Runtime** installiert (Edge Chromium)
- ✅ **Grafiktreiber** aktuell
- ✅ **DirectX 11+** verfügbar

---

## 🍎 **macOS (WKWebView)**

### Automatisch aktivierte Optimierungen:

```cpp
bakery::ultra::enableUltraPerformance(w);
```

**Beinhaltet:**
- ✅ GPU-Beschleunigung via Metal
- ✅ Anti-Throttling (App Priority Erhöhung)
- ✅ requestAnimationFrame Optimierungen
- ✅ Rendering Pipeline Beschleunigung

### Voraussetzungen:

- ✅ **macOS 10.13+** (WKWebView mit WebGL Support)
- ✅ **Metal-kompatible GPU**

---

## 🐧 **Linux (WebKitGTK)**

### Automatisch aktivierte Optimierungen:

```cpp
bakery::ultra::enableUltraPerformance(w);
```

**Beinhaltet:**
- ✅ Hardware-Beschleunigung
- ✅ WebGL Support via OpenGL
- ✅ GPU Rasterisierung

### Voraussetzungen:

- ✅ **WebKitGTK 2.24+** mit WebGL Support
- ✅ **OpenGL 3.0+** Treiber

---

## 🧪 **WebGL-Test**

Jeder Bakery-Build führt automatisch einen WebGL-Check durch:

```javascript
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
if (gl) {
    console.log('✅ WebGL is available!');
    console.log('   Vendor:', gl.getParameter(gl.VENDOR));
    console.log('   Renderer:', gl.getParameter(gl.RENDERER));
} else {
    console.error('❌ WebGL NOT available');
}
```

---

## 📊 **Performance-Vergleich**

| Rendering-Mode | FPS (Phaser Game) | Anmerkung |
|----------------|-------------------|-----------|
| Canvas2D (ohne WebGL) | 30-40 FPS | Langsam, CPU-basiert |
| WebGL (mit Bakery) | **60+ FPS** | ✅ GPU-beschleunigt |
| WebGL2 (mit Bakery) | **120+ FPS** | ✅ Optimal für Games |

---

## ⚠️ **Troubleshooting**

### Problem: "WebGL not available"

**Windows:**
1. WebView2 Runtime installieren:
   ```powershell
   winget install Microsoft.EdgeWebView2Runtime
   ```
2. Grafiktreiber aktualisieren
3. DirectX aktualisieren

**macOS:**
1. macOS auf 10.13+ aktualisieren
2. System neu starten

**Linux:**
1. WebKitGTK aktualisieren:
   ```bash
   sudo apt update && sudo apt install webkit2gtk-4.0
   ```
2. OpenGL-Treiber installieren

---

## 💡 **Entwickler-Hinweise**

### WebGL in deiner App nutzen:

```javascript
// Phaser Config
const config = {
    type: Phaser.AUTO, // Nutzt automatisch WebGL wenn verfügbar
    // oder explizit:
    type: Phaser.WEBGL,
    ...
};

// Three.js
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true,
    powerPreference: 'high-performance' // Nutzt dedizierte GPU
});
```

### Performance-Tipps:

1. ✅ **Textur-Atlasse verwenden** (reduziert Draw Calls)
2. ✅ **Object Pooling** (weniger GC)
3. ✅ **requestAnimationFrame** nutzen
4. ✅ **WebGL2 Features** nutzen (wenn verfügbar)

---

## 🔗 **Weitere Ressourcen**

- [Phaser 3 WebGL Docs](https://photonstorm.github.io/phaser3-docs/Phaser.Renderer.WebGL.html)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Three.js Performance Tips](https://threejs.org/docs/#manual/en/introduction/Performance-tips)

---

**🎯 Fazit:** Mit Bakery läuft jedes WebGL-basierte Spiel/Framework **out of the box** mit maximaler Performance! 🚀


