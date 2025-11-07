# 🪟 Bakery Window API Research

## Problem
Wir brauchen erweiterte Window Controls:
- `startFullscreen`
- `minWidth`, `minHeight`
- `alwaysOnTop`
- Custom Icons
- Window Position/Size

## Lösungsoptionen

### ✅ Option A: Socket Runtime Window API (EMPFOHLEN)
**Was:** Socket Runtime hat bereits eine native Window API

**Vorteile:**
- Bereits in Socket Runtime integriert
- Kein zusätzliches Kompilieren nötig
- Cross-platform (Mac, Win, Linux)
- Leichtgewichtig

**API (vermutlich):**
```javascript
import * as application from 'socket:application';

const win = await application.getCurrentWindow();
await win.setTitle('My App');
await win.setSize({ width: 800, height: 600 });
await win.setFullscreen(true);
await win.setAlwaysOnTop(true);
// etc.
```

**Status:** MUSS GETESTET WERDEN
**Dokumentation:** Socket Runtime docs (https://socketsupply.co/guides/)

---

### ⚙️ Option B: Custom WebView mit Bindings kompilieren
**Was:** Eigene WebView-Library mit erweiterten Bindings bauen (wie in bunery)

**Basis:**
- https://github.com/webview/webview (C/C++ Library)
- Bindings für Socket Runtime schreiben
- Als native Module kompilieren

**Vorteile:**
- Volle Kontrolle über alle Features
- Custom Bindings möglich
- Wie bunery's Ansatz mit `webview-bun`

**Nachteile:**
- Aufwändig zu kompilieren
- Muss für jede Platform separat gebaut werden (Mac, Win, Linux)
- Socket Runtime native module support unklar
- Erhöht Binary Size
- Wartungsaufwand

**Aufwand:** SEHR HOCH (mehrere Tage)

---

### 🔧 Option C: socket.ini + Socket Runtime Config
**Was:** Nutze `socket.ini` für statische Window Config

**Vorteile:**
- Einfach
- Keine Programmierung nötig
- Funktioniert jetzt schon

**Nachteile:**
- Nur statische Config (keine Runtime-Änderungen)
- Limitierte Optionen

**Beispiel socket.ini:**
```ini
[window]
height = 600
width = 800
minimizable = true
maximizable = true
resizable = true
frameless = false
utility = false

[mac]
icon = "src/icon.png"

[win]
icon = "src/icon.png"
```

---

## 🎯 EMPFEHLUNG: Option A + C Hybrid

1. **Nutze `socket.ini` für statische Config** (Option C)
   - minSize, maxSize, startFullscreen, icon
   
2. **Teste Socket Runtime's Window API** (Option A)
   - Für dynamische Änderungen (setTitle, setSize, etc.)
   
3. **Erst wenn beides nicht reicht:** Option B (Custom WebView)

---

## 📝 NÄCHSTE SCHRITTE

1. ✅ Socket Runtime Window API testen
2. ✅ socket.ini erweiterte Config implementieren
3. ⏸️ Custom WebView NUR wenn nötig

---

## Bunery vs. Bakery

| Feature | Bunery (webview-bun) | Bakery (Socket Runtime) |
|---------|---------------------|-------------------------|
| Runtime | Bun FFI | Socket Runtime |
| Binary Size | ~45 MB | ~5.8 MB ✅ |
| Window API | Custom (webview-bun) | Socket Runtime native |
| Bindings | Bun FFI + C | Socket Runtime IPC |
| Node.js APIs | Bun built-in | Socket Runtime built-in |
| Maintenance | Eigene WebView Library | Socket Runtime managed |

**Fazit:** Socket Runtime ist einfacher zu warten und kleiner!

