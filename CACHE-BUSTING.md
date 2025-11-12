# 🔄 Cache-Busting in Bakery

## Problem

Wenn du ein Update für dein Game veröffentlichst, könnten Spieler die **alte Version** sehen wegen:
- Browser Cache (WebView)
- HTTP Cache (Server)
- Disk Cache (System)

## ✅ Lösung: Version-basiertes Cache-Busting

Bakery nutzt automatisch die `app.version` aus deiner Config:

```javascript
export default {
  app: {
    name: "my-game",
    version: "1.0.0",  // 👈 WICHTIG!
    entrypoint: "index.html"
  }
}
```

### Wie es funktioniert:

1. **URL mit Version**: `http://127.0.0.1:8765?v=1.0.0`
2. **Neue Version** → **Neue URL** → **Cache wird umgangen**
3. **Spieler sehen IMMER die neueste Version**

### Beispiel:

```javascript
// Version 1.0.0
app.version = "1.0.0"
→ URL: http://127.0.0.1:8765?v=1.0.0

// Version 1.0.1 (Bug-Fix)
app.version = "1.0.1"
→ URL: http://127.0.0.1:8765?v=1.0.1  // ✅ Neue URL = Kein Cache!

// Version 2.0.0 (Major Update)
app.version = "2.0.0"
→ URL: http://127.0.0.1:8765?v=2.0.0  // ✅ Neue URL = Kein Cache!
```

## 📋 Best Practices

### 1. Semantic Versioning

Nutze [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0 → 1.0.1  (Bug-Fix)
1.0.1 → 1.1.0  (Neues Feature)
1.1.0 → 2.0.0  (Breaking Change)
```

### 2. Version bei jedem Update erhöhen

```javascript
// ❌ FALSCH: Version nicht geändert
app.version = "1.0.0"  // Spieler sehen alte Version!

// ✅ RICHTIG: Version erhöht
app.version = "1.0.1"  // Spieler sehen neue Version!
```

### 3. Version in Titel anzeigen (optional)

```javascript
export default {
  app: {
    name: "my-game",
    version: "1.2.3"
  },
  window: {
    title: "My Game v1.2.3"  // Zeigt Version im Fenster
  }
}
```

## 🔒 HTTP Cache Headers

Bakery setzt automatisch die richtigen Headers:

### Code (HTML/JS/CSS/JSON):
```
Cache-Control: no-cache, no-store, must-revalidate, max-age=0
Pragma: no-cache
Expires: 0
```
→ **Nie gecached**, immer frisch!

### Assets (Bilder/Sounds/Fonts):
```
Cache-Control: public, max-age=31536000, immutable
```
→ **Aggressiv gecached**, weil sich Assets nicht ändern

## 🧪 Testen

### 1. Lokales Testen:

```bash
# Build Version 1.0.0
bake mac --dir my-game

# Ändere Version in bakery.config.js zu 1.0.1
# Build Version 1.0.1
bake mac --dir my-game

# Starte App → Sollte neue Version zeigen!
```

### 2. Debug-Logs:

Im Debug-Modus siehst du:
```
🔄 Cache Buster: v1.0.1
🌐 URL: http://127.0.0.1:8765?v=1.0.1
```

## ⚠️ Wichtig!

### Version MUSS sich ändern!

Wenn du die Version **nicht** änderst:
- Spieler sehen die **alte Version**
- Cache wird **nicht** umgangen
- Updates werden **nicht** angezeigt

### Beispiel:

```javascript
// Version 1.0.0 deployed
app.version = "1.0.0"

// Du änderst Code, aber Version bleibt gleich
app.version = "1.0.0"  // ❌ FALSCH!

// Spieler sehen ALTE Version wegen Cache!
```

**Lösung**: Version IMMER erhöhen:
```javascript
app.version = "1.0.1"  // ✅ RICHTIG!
```

## 🚀 Workflow

```bash
# 1. Entwicklung
bake dev --dir my-game

# 2. Code ändern
# ... edit files ...

# 3. Version erhöhen in bakery.config.js
app.version = "1.0.1"  # War: "1.0.0"

# 4. Build für alle Plattformen
bake all --dir my-game

# 5. Verteilen
# dist/mac/my-game.app
# dist/windows/my-game.exe
# dist/linux/my-game-x64
# dist/linux/my-game-arm64
```

## 📊 Zusammenfassung

| Szenario | Version | Cache | Ergebnis |
|----------|---------|-------|----------|
| Erste Installation | 1.0.0 | Leer | ✅ Neue Version |
| Kein Update | 1.0.0 | Voll | ✅ Cached (schnell) |
| Update ohne Version | 1.0.0 | Voll | ❌ Alte Version! |
| Update mit Version | 1.0.1 | Umgangen | ✅ Neue Version! |

---

**TL;DR**: Erhöhe `app.version` bei jedem Update, dann funktioniert Cache-Busting automatisch! 🎯

