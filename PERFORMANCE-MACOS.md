# 🍎 macOS Performance: Fenster vs Fullscreen

## ⚠️ **Das Problem**

**Fullscreen läuft IMMER besser als Fenster-Modus auf macOS!**

Das ist ein **fundamentales macOS Problem** und kann NICHT vollständig gelöst werden.

## 🔍 **Warum ist Fullscreen schneller?**

### **Fenster-Modus:**
```
Game → WebView → WindowServer (Compositor) → GPU → Display
         ↑
    Overhead!
```

- ❌ **WindowServer Overhead**: Desktop Window Manager fügt Latenz hinzu
- ❌ **Compositor-Schichten**: Mehrere Rendering-Pässe
- ❌ **Ressourcen-Sharing**: GPU wird zwischen allen Fenstern geteilt
- ❌ **VSync Probleme**: Adaptive Sync funktioniert nicht richtig
- ❌ **Kein Direct Access**: Keine direkte GPU-Kommunikation
- ❌ **Kein Game Mode**: Voller Game Mode nur in nativem Fullscreen

### **Fullscreen-Modus:**
```
Game → WebView → GPU → Display
         ↑
    Direct!
```

- ✅ **Direkter GPU-Zugriff**: Bypassed WindowServer
- ✅ **Exklusive Ressourcen**: Volle GPU-Power
- ✅ **Keine Compositor-Latenz**: Direkt zum Display
- ✅ **VSync funktioniert**: Korrekte Frame-Synchronisation
- ✅ **Lower Latency**: Weniger Overhead
- ✅ **Game Mode aktiv**: Höchste CPU/GPU Priorität (macOS Sonoma 14+)
  - Doppelte Bluetooth-Abtastrate für Controller/AirPods
  - Hintergrund-Tasks werden gedrosselt
  - [Mehr Info](https://support.apple.com/en-us/105118)

## 📊 **Typische Performance-Unterschiede:**

| Modus | FPS | Frame-Time | Micro-Stuttering |
|-------|-----|------------|------------------|
| **Fenster** | 55-60 | 16-20ms | ⚠️ Ja |
| **Fullscreen** | 60 | 16.6ms | ✅ Nein |

## ✅ **Was Bakery macht (automatisch):**

### **System-Level:**
1. ✅ REALTIME Process Priority (`-20`)
2. ✅ App Nap deaktiviert
3. ✅ Game Mode Optimierungen (macOS Sonoma 14+)
   - Core Animation optimiert für Games
   - Metal Shader Validation deaktiviert
   - **Hinweis:** Voller Game Mode nur in nativem Fullscreen
4. ✅ Metal Rendering erzwungen
5. ✅ Discrete GPU angefordert

### **JavaScript-Level:**
1. ✅ GPU Acceleration auf ALLEM
2. ✅ Aggressives Frame-Pacing
3. ✅ Compositor Keep-Alive
4. ✅ CSS Animations deaktiviert
5. ✅ Frame-Drop Detection

## 🎯 **Empfehlungen für Game-Devs:**

### **1. Fullscreen-Option anbieten:**
```javascript
export default {
  window: {
    startFullscreen: true,  // ⚡ BESTE Performance!
  }
}
```

### **2. Hinweis für Spieler:**
```javascript
// In deinem Game:
if (window.Bakery.platform === 'macos') {
  console.log('💡 Tipp: Drücke F11 für Fullscreen (bessere Performance!)');
}
```

### **3. Performance-Warnung:**
```javascript
// Wenn FPS zu niedrig:
if (avgFPS < 50 && !document.fullscreenElement) {
  showNotification('⚠️ Niedrige FPS! Versuche Fullscreen-Modus (F11)');
}
```

## 🧪 **Vergleich selbst testen:**

1. Starte dein Game im **Fenster-Modus**
2. Achte auf FPS und Flüssigkeit
3. Drücke **F11** für Fullscreen
4. Spüre den Unterschied! 🚀

## 📈 **Was du erwarten kannst:**

### **Fenster-Modus:**
- ✅ Alle Bakery-Optimierungen aktiv
- ✅ Smooth 60 FPS (meistens)
- ⚠️ Gelegentliches Micro-Stuttering (WindowServer Overhead)
- ⚠️ Höhere Latenz (~1-2ms)

### **Fullscreen-Modus:**
- ✅ Alle Bakery-Optimierungen aktiv
- ✅ Perfekt smooth 60 FPS
- ✅ Kein Micro-Stuttering
- ✅ Minimale Latenz

## 🔧 **Weitere Tipps:**

### **Für Spieler:**
1. **Schließe andere Apps**: Weniger WindowServer Overhead
2. **Nutze Fullscreen**: Beste Performance
3. **Aktiviere "Reduce Motion"**: System Settings → Accessibility
4. **Deaktiviere Transparenz**: System Settings → Accessibility

### **Für Devs:**
1. **Teste beide Modi**: Fenster UND Fullscreen
2. **Optimiere für 60 FPS**: Nicht höher (VSync!)
3. **Nutze `requestAnimationFrame`**: Kein `setTimeout`
4. **Vermeide CSS Animations**: Nutze Canvas/WebGL

## 🎮 **Andere Engines:**

Dieses Problem betrifft **ALLE** macOS Apps:
- Unity Games
- Unreal Engine
- Electron Apps
- Native Apps
- **Bakery Apps**

**Fullscreen ist IMMER schneller!** Das ist macOS-Architektur, nicht Bakery.

## 📚 **Quellen:**

- [Apple Developer Forums](https://developer.apple.com/forums/)
- [Blizzard Forums - macOS Performance](https://us.forums.blizzard.com/en/wow/t/catalina-windowed-non-fullscreen-performance/326373)
- [EA Forums - M4 Performance Issues](https://forums.ea.com/discussions/the-sims-4-technical-issues-mac-en/lagging-and-stuttering-game-performance-on-macs-with-m4-chips/12628907)

---

**TL;DR**: Fullscreen ist schneller weil WindowServer umgangen wird. Das ist normal und kann nicht gefixt werden. Bakery optimiert beide Modi, aber Fullscreen wird IMMER besser sein. 🎯

