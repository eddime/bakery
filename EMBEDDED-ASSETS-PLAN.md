# 📦 Embedded Assets für Bakery Production

## Problem
Aktuell liegt `src/` offen in der `.app/Contents/Resources/`:
```
hello-world-socket.app/
└── Contents/
    └── Resources/
        ├── index.html  ← OFFEN SICHTBAR! ❌
        └── test.json   ← OFFEN SICHTBAR! ❌
```

## Lösungen

### ❌ Option A: Socket Runtime Native (NICHT MÖGLICH)
Socket Runtime hat `copy = "src"` in `socket.ini` - Files werden IMMER kopiert.
Es gibt keine native Embedding-Option in Socket Runtime.

### ✅ Option B: Pre-Build Asset Embedding (EMPFOHLEN)
**Wie in bunery:** Assets als Base64 Data URLs in die Binary einbetten!

**Workflow:**
1. **Pre-Build Step:** Alle `src/` Files lesen
2. **Base64 Encode:** Files zu Data URLs konvertieren
3. **Single HTML:** Generiere eine `index.html` mit embedded Assets
4. **Build:** Socket Runtime buildet nur die generierte HTML

**Vorteile:**
- Assets sind in der Binary ✅
- Kein offener Source Code ✅
- Funktioniert mit Socket Runtime ✅

**Nachteile:**
- Binary wird etwas größer (~20-30% mehr)
- Build-Prozess komplexer

---

### 🔧 Implementation Plan

#### 1. Pre-Build Script: `scripts/embed-assets.ts`
```typescript
// Liest src/, konvertiert zu Base64, generiert embedded HTML
const assets = {
  '/index.html': 'data:base64,...',
  '/styles.css': 'data:base64,...',
  '/app.js': 'data:base64,...'
};
```

#### 2. `socket.ini` ändern
```ini
[build]
copy = "dist-embedded"  # Nicht mehr "src"!
```

#### 3. `bake mac/win/linux` Commands
```bash
# Vor dem Build:
1. bun run scripts/embed-assets.ts
   → Erstellt dist-embedded/index.html mit allen Assets

# Socket Runtime Build:
2. ssc build
   → Buildet nur die embedded HTML
```

---

### 🎯 Alternative: Hybrid Approach
- **Development (`bake dev`):** Normale Files (schneller reload)
- **Production (`bake mac/win/linux`):** Embedded Assets (sicher)

---

## Nächster Schritt
Soll ich das jetzt implementieren?

1. ✅ Pre-Build Script erstellen
2. ✅ CLI anpassen (bake mac führt embed-assets aus)
3. ✅ socket.ini Template anpassen

