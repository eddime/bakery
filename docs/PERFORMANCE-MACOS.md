#  macOS Performance: Fenster vs Fullscreen

##  **Das Problem**

**Fullscreen l√uft IMMER besser als Fenster-Modus auf macOS!**

Das ist ein **fundamentales macOS Problem** und kann NICHT vollst√ndig gel√∂st werden.

##  **Warum ist Fullscreen schneller?**

### **Fenster-Modus:**
```
Game Ü WebView Ü WindowServer (Compositor) Ü GPU Ü Display
         Ü
    Overhead!
```

-  **WindowServer Overhead**: Desktop Window Manager f√gt Latenz hinzu
-  **Compositor-Schichten**: Mehrere Rendering-P√sse
-  **Ressourcen-Sharing**: GPU wird zwischen allen Fenstern geteilt
-  **VSync Probleme**: Adaptive Sync funktioniert nicht richtig
-  **Kein Direct Access**: Keine direkte GPU-Kommunikation
-  **Kein Game Mode**: Voller Game Mode nur in nativem Fullscreen

### **Fullscreen-Modus:**
```
Game Ü WebView Ü GPU Ü Display
         Ü
    Direct!
```

-  **Direkter GPU-Zugriff**: Bypassed WindowServer
-  **Exklusive Ressourcen**: Volle GPU-Power
-  **Keine Compositor-Latenz**: Direkt zum Display
-  **VSync funktioniert**: Korrekte Frame-Synchronisation
-  **Lower Latency**: Weniger Overhead
-  **Game Mode aktiv**: H√∂chste CPU/GPU Priorit√t (macOS Sonoma 14+)
  - Doppelte Bluetooth-Abtastrate f√r Controller/AirPods
  - Hintergrund-Tasks werden gedrosselt
  - [Mehr Info](https://support.apple.com/en-us/105118)

##  **Typische Performance-Unterschiede:**

| Modus | FPS | Frame-Time | Micro-Stuttering |
|-------|-----|------------|------------------|
| **Fenster** | 55-60 | 16-20ms |  Ja |
| **Fullscreen** | 60 | 16.6ms |  Nein |

##  **Was Gemcore macht (automatisch):**

### **System-Level:**
1.  REALTIME Process Priority (`-20`)
2.  App Nap deaktiviert
3.  Game Mode Optimierungen (macOS Sonoma 14+)
   - Core Animation optimiert f√r Games
   - Metal Shader Validation deaktiviert
   - **Hinweis:** Voller Game Mode nur in nativem Fullscreen
4.  Metal Rendering erzwungen
5.  Discrete GPU angefordert

### **JavaScript-Level:**
1.  GPU Acceleration auf ALLEM
2.  Aggressives Frame-Pacing
3.  Compositor Keep-Alive
4.  CSS Animations deaktiviert
5.  Frame-Drop Detection

##  **Empfehlungen f√r Game-Devs:**

### **1. Fullscreen-Option anbieten:**
```javascript
export default {
  window: {
    startFullscreen: true,  //  BESTE Performance!
  }
}
```

### **2. Hinweis f√r Spieler:**
```javascript
// In deinem Game:
if (window.Gemcore.platform === 'macos') {
  console.log(' Tipp: Dr√cke F11 f√r Fullscreen (bessere Performance!)');
}
```

### **3. Performance-Warnung:**
```javascript
// Wenn FPS zu niedrig:
if (avgFPS < 50 && !document.fullscreenElement) {
  showNotification(' Niedrige FPS! Versuche Fullscreen-Modus (F11)');
}
```

##  **Vergleich selbst testen:**

1. Starte dein Game im **Fenster-Modus**
2. Achte auf FPS und Fl√ssigkeit
3. Dr√cke **F11** f√r Fullscreen
4. Sp√re den Unterschied! 

## à **Was du erwarten kannst:**

### **Fenster-Modus:**
-  Alle Gemcore-Optimierungen aktiv
-  Smooth 60 FPS (meistens)
-  Gelegentliches Micro-Stuttering (WindowServer Overhead)
-  H√∂here Latenz (~1-2ms)

### **Fullscreen-Modus:**
-  Alle Gemcore-Optimierungen aktiv
-  Perfekt smooth 60 FPS
-  Kein Micro-Stuttering
-  Minimale Latenz

##  **Weitere Tipps:**

### **F√r Spieler:**
1. **Schlie√e andere Apps**: Weniger WindowServer Overhead
2. **Nutze Fullscreen**: Beste Performance
3. **Aktiviere "Reduce Motion"**: System Settings Ü Accessibility
4. **Deaktiviere Transparenz**: System Settings Ü Accessibility

### **F√r Devs:**
1. **Teste beide Modi**: Fenster UND Fullscreen
2. **Optimiere f√r 60 FPS**: Nicht h√∂her (VSync!)
3. **Nutze `requestAnimationFrame`**: Kein `setTimeout`
4. **Vermeide CSS Animations**: Nutze Canvas/WebGL

##  **Andere Engines:**

Dieses Problem betrifft **ALLE** macOS Apps:
- Unity Games
- Unreal Engine
- Electron Apps
- Native Apps
- **Gemcore Apps**

**Fullscreen ist IMMER schneller!** Das ist macOS-Architektur, nicht Gemcore.

##  **Quellen:**

- [Apple Developer Forums](https://developer.apple.com/forums/)
- [Blizzard Forums - macOS Performance](https://us.forums.blizzard.com/en/wow/t/catalina-windowed-non-fullscreen-performance/326373)
- [EA Forums - M4 Performance Issues](https://forums.ea.com/discussions/the-sims-4-technical-issues-mac-en/lagging-and-stuttering-game-performance-on-macs-with-m4-chips/12628907)

---

**TL;DR**: Fullscreen ist schneller weil WindowServer umgangen wird. Das ist normal und kann nicht gefixt werden. Gemcore optimiert beide Modi, aber Fullscreen wird IMMER besser sein. 

