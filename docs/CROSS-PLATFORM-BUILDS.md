# Cross-Platform Builds (wie Neutralino.js)

Bakery ermöglicht es, **von jedem Betriebssystem aus für alle Plattformen zu bauen** - genau wie Neutralino.js!

## 🎯 Ziel

- ✅ Von **macOS** aus für Windows + Linux bauen
- ✅ Von **Windows** aus für macOS + Linux bauen  
- ✅ Von **Linux** aus für macOS + Windows bauen
- ✅ **Keine lokale Compilation** nötig (pre-built binaries)

## 🔧 Wie es funktioniert

### 1. GitHub Actions baut native Binaries

Wir verwenden GitHub Actions, um **native Binaries** für alle Plattformen zu bauen:

- **macOS**: Universal Binary (x64 + ARM64)
- **Windows**: x64 Binary
- **Linux**: x64 Binary mit WebKitGTK

Diese Binaries werden als **GitHub Releases** veröffentlicht.

### 2. Download pre-built Binaries

Wenn du ein Spiel baust, lädt Bakery automatisch die pre-built Binaries herunter:

```bash
# Automatisch beim Build
bun bake build --platform=all

# Oder manuell
bun scripts/download-prebuilt-binaries.ts
```

### 3. Fallback: Lokale Compilation

Falls keine pre-built Binaries verfügbar sind:
- **macOS**: Baut lokal mit Xcode
- **Windows**: Baut lokal mit MSVC
- **Linux**: Cross-Compilation mit musl (ohne WebKitGTK)

## 📦 Setup

### Schritt 1: GitHub Release erstellen

Um die pre-built Binaries verfügbar zu machen, musst du einen GitHub Release erstellen:

```bash
# 1. Tag erstellen
git tag v1.0.0
git push origin v1.0.0

# 2. GitHub Actions baut automatisch die Binaries
# 3. Release wird automatisch erstellt mit allen Binaries
```

### Schritt 2: Binaries herunterladen

```bash
# Lädt alle pre-built Binaries herunter
bun scripts/download-prebuilt-binaries.ts

# Oder spezifische Version
bun scripts/download-prebuilt-binaries.ts v1.0.0
```

### Schritt 3: Spiel bauen

```bash
# Baut für alle Plattformen (verwendet pre-built binaries)
bun bake build --platform=all

# Oder einzelne Plattform
bun bake build --platform=mac
bun bake build --platform=win
bun bake build --platform=linux
```

## 🚀 Vorteile

### Wie Neutralino.js

- ✅ **Cross-Platform**: Von jedem OS aus für alle OS bauen
- ✅ **Schnell**: Keine lokale Compilation nötig
- ✅ **Konsistent**: Gleiche Binaries für alle Entwickler
- ✅ **WebKitGTK**: Linux-Binaries haben WebView eingebettet

### Besser als Neutralino.js

- ✅ **Single Executable**: Alles in einer Datei
- ✅ **Steamworks**: Integriert und funktioniert
- ✅ **Asset Encryption**: XOR-verschlüsselt
- ✅ **Splash Screen**: Eingebaut

## 📊 Binary Sizes

Nach dem Download:

```
launcher/prebuilt/
├── bakery-launcher-mac              ~500 KB (Universal)
├── bakery-launcher-win.exe          ~300 KB
├── bakery-launcher-linux-x64        ~2 MB (mit WebKitGTK)
└── bakery-universal-launcher-linux  ~200 KB
```

## 🔄 Update-Workflow

### Für Framework-Entwickler

1. Code ändern
2. `git tag v1.0.1 && git push origin v1.0.1`
3. GitHub Actions baut automatisch neue Binaries
4. Neue Binaries sind sofort verfügbar

### Für App-Entwickler (Bunery)

1. Bakery als Submodule updaten: `git submodule update --remote`
2. Pre-built Binaries herunterladen: `bun scripts/download-prebuilt-binaries.ts`
3. Fertig! Neue Version ist einsatzbereit

## ⚙️ GitHub Actions Workflow

Die Workflows befinden sich in `.github/workflows/`:

- `build-binaries.yml`: Baut macOS + Windows Binaries
- `build-linux-binaries.yml`: Baut Linux Binaries mit WebKitGTK

### Manueller Trigger

Du kannst die Workflows auch manuell triggern:

1. Gehe zu GitHub → Actions
2. Wähle Workflow aus
3. Klicke "Run workflow"
4. Binaries werden gebaut und als Artifacts hochgeladen

## 🐛 Troubleshooting

### "Failed to fetch latest release"

→ Es gibt noch keinen GitHub Release. Erstelle einen:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### "Pre-built binary not available"

→ Fallback auf lokale Compilation. Für Linux ohne WebKitGTK:

```bash
# macOS
brew install FiloSottile/musl-cross/musl-cross

# Dann normal bauen
bun bake build --platform=linux
```

### Linux: "No apps available"

→ WebKitGTK fehlt. Entweder:

1. Pre-built Binary verwenden (empfohlen)
2. Auf Linux nativ bauen
3. AppImage verwenden (TODO)

## 🎯 Roadmap

- [x] Pre-built Binaries via GitHub Actions
- [x] Automatischer Download beim Build
- [x] Linux mit WebKitGTK
- [ ] AppImage für Linux (alle Distros)
- [ ] Windows Code Signing
- [ ] macOS Notarization

## 📚 Vergleich mit Neutralino.js

| Feature | Neutralino.js | Bakery |
|---------|--------------|--------|
| Cross-Platform Build | ✅ | ✅ |
| Pre-built Binaries | ✅ | ✅ |
| Single Executable | ❌ | ✅ |
| WebKitGTK (Linux) | ✅ | ✅ |
| Steamworks | ❌ | ✅ |
| Asset Encryption | ❌ | ✅ |
| Splash Screen | ❌ | ✅ |
| File Size | ~2 MB | ~2 MB |

## 🔗 Links

- [GitHub Actions Workflows](../.github/workflows/)
- [Download Script](../scripts/download-prebuilt-binaries.ts)
- [Linux Build Script](../scripts/build-linux-single-executables.sh)

