# 🚀 Bakery Performance Optimizations

## High-Performance Mode (Alle Plattformen)

### ✅ Implementiert

#### Windows (WebView2)
- **Power Throttling**: `PROCESS_POWER_THROTTLING_STATE` → OFF
- **Process Priority**: `HIGH_PRIORITY_CLASS` für besseres Scheduling
- **GPU Preference**: Bevorzugt diskrete GPU über integrierte
- **Erwartung**: >60 FPS auf 120/144 Hz Displays möglich

#### macOS (WKWebView)
- **Process Priority**: `setpriority(PRIO_PROCESS, 0, -10)` für höhere Priorität
- **Metal Rendering**: Automatisch durch WKWebView aktiviert
- **VSync**: An Display-Hz gekoppelt (60 Hz / 120 Hz ProMotion)
- **Erwartung**: Volle Display-Hz auf ProMotion Displays

#### Linux (WebKitGTK)
- **Process Priority**: `setpriority(PRIO_PROCESS, 0, -10)` 
- **GPU/EGL**: Aktiviert durch WebKitGTK Build
- **Erwartung**: Meist 60 FPS Cap (Compositor-abhängig)

### 🎯 localStorage Persistenz

**Problem gelöst**: Port basiert auf `app.name` statt `window.title`

```javascript
export default {
  app: {
    // ⚠️ WICHTIG: Bestimmt den Port für localStorage!
    // NICHT ändern, sonst gehen Spielstände verloren!
    name: "my-game",  // Konstant halten!
    entrypoint: "index.html"
  },
  window: {
    // Kann frei geändert werden (z.B. Versionsnummer)
    title: "My Game v1.2.3",
    width: 1280,
    height: 720
  }
}
```

**Port-Berechnung**: `8765 + (hash(app.name) % 1000)` = Port 8765-9765

**Vorteil**: 
- Gleicher Port = Gleiche Origin = localStorage bleibt erhalten
- Titel kann sich ändern (z.B. "My Game v1.0" → "My Game v2.0")
- Spielstände bleiben erhalten!

### 🎮 WebGPU Support (Universal)

**Framework-agnostisch**: Funktioniert mit ALLEN Engines (Phaser, Three.js, PixiJS, Kaplay, etc.)

#### Features:
- **Automatische Detection**: WebGPU → WebGL2 → WebGL Fallback
- **Canvas API Patching**: Optimiert `getContext()` für alle Frameworks
- **Synchrone Init**: GPU Info sofort verfügbar (kein async wait)
- **Performance Hints**: Logged Empfehlungen für Devs

#### API:
```javascript
window.BakeryGPU.info = {
  hasWebGPU: true/false,
  hasWebGL2: true/false,
  hasWebGL: true/false,
  preferredAPI: 'webgpu' | 'webgl2' | 'webgl',
  adapter: { vendor, device, architecture }
}
```

### ⚡ Runtime Optimizations (Alle Plattformen)

1. **Passive Event Listeners**: `scroll`, `wheel`, `touch*` → passive
2. **Async Image Decoding**: `img.decode()` für non-blocking loads
3. **Smart GC**: Nur bei Memory-Wachstum >50 MB
4. **Disabled Features**: Context Menu, Text Selection (weniger Overhead)
5. **CSS Hardware Acceleration**: `will-change`, `transform: translateZ(0)`

### 📊 Startup Optimizations

1. **Parallel Asset Loading**: Assets + WebView gleichzeitig
2. **Atomic Server Ready**: Kein `sleep()`, nur `yield()` (~1-5ms statt 50ms)
3. **Silent Production Mode**: Kein Console Output (schneller)
4. **Pre-cached Responses**: HTTP Cache vorgebaut

### 🔥 Was NICHT gemacht wird

❌ **VSync Entkopplung**: Erzeugt Tearing + instabile Frame-Times  
❌ **Binary Patches**: Wartungsintensiv + rechtlich bedenklich  
❌ **setTimeout Loops**: Wird von Engine gedrosselt  
❌ **Framework-spezifische Hacks**: Nicht universal

### 📈 Erwartete Performance

| Platform | Display | Expected FPS | Notes |
|----------|---------|--------------|-------|
| Windows  | 60 Hz   | 60 FPS       | Stabil |
| Windows  | 144 Hz  | 120+ FPS     | Mit High-Perf GPU |
| macOS    | 60 Hz   | 60 FPS       | Stabil |
| macOS    | 120 Hz  | 120 FPS      | ProMotion |
| Linux    | 60 Hz   | 60 FPS       | Compositor-abhängig |
| Linux    | 144 Hz  | 60-144 FPS   | Variabel |

### 🛠️ Für Devs

**Wichtig**:
1. `app.name` konstant halten für localStorage
2. `window.title` kann sich frei ändern
3. `requestAnimationFrame()` verwenden (kein `setTimeout`)
4. Dynamische Auflösung für schwache Hardware
5. Fixed Timestep für Physik

**Best Practices**:
- Nutze `window.BakeryGPU.info.preferredAPI` für Renderer-Wahl
- Messe Frame-Times mit `performance.now()`
- Implementiere FPS Cap für Konsistenz
- Teste auf verschiedenen Display-Hz

### 🔍 Debug

```javascript
// Check GPU Support
console.log(window.BakeryGPU.info);

// Check Port (localStorage)
console.log(window.location.port);  // Sollte konstant sein!

// Check Performance
console.log(window.Bakery.platform);  // 'windows' | 'macos' | 'linux'
```

---

**Stand**: November 2025  
**Version**: Bakery 1.0.0  
**Optimierungen**: Universal für alle Plattformen ✅

