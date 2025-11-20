# Offline Usage (wie Neutralino.js)

Gemcore kann **vollst√ndig offline** verwendet werden, nachdem die pre-built Binaries einmal heruntergeladen wurden.

##  Konzept

Genau wie Neutralino.js:

1. **Einmalig**: Pre-built Binaries von GitHub herunterladen
2. **Cachen**: Binaries lokal speichern in `launcher/prebuilt/`
3. **Offline**: Alle nachfolgenden Builds funktionieren ohne Internet

##  Setup

### Erste Verwendung

```bash
# Clone Repository
git clone https://github.com/eddime/gemcore.git
cd gemcore

# Setup (l√dt Binaries herunter)
bun scripts/setup.ts
```

**Output:**
```
 Gemcore Setup


This will download pre-built binaries for all platforms.
After setup, you can build games offline for:
  ¢ macOS (Universal: x64 + ARM64)
  ¢ Windows (x64)
  ¢ Linux (x64 with WebKitGTK)

 Gemcore Pre-built Binaries


  Downloading pre-built binaries from GitHub...

 Fetching latest release version...
    Latest version: v1.0.0

 Downloading 4 binaries...
     Downloading: gemcore-launcher-linux-x64
    Downloaded: launcher/prebuilt/gemcore-launcher-linux-x64
     Downloading: gemcore-universal-launcher-linux-embedded
    Downloaded: launcher/prebuilt/gemcore-universal-launcher-linux-embedded
     Downloading: gemcore-launcher-win.exe
    Downloaded: launcher/prebuilt/gemcore-launcher-win.exe
     Downloading: gemcore-launcher-mac
    Downloaded: launcher/prebuilt/gemcore-launcher-mac


 Downloaded: 4/4 binaries

 Binaries cached locally
 Gemcore can now be used offline!

 You can now build games for all platforms from any OS:
   Ü bun bake build --platform=all
   Ü bun bake build --platform=mac
   Ü bun bake build --platform=win
   Ü bun bake build --platform=linux


 Setup complete!

 Next steps:
   cd examples/stress-test
   bun bake build --platform=all

 Binaries are cached in launcher/prebuilt/
   You can now use Gemcore offline!
```

### Als Submodule (f√r Bunery)

```bash
# In deinem Projekt (z.B. Bunery)
git submodule add https://github.com/eddime/gemcore.git gemcore
cd gemcore

# Setup
bun scripts/setup.ts

# Fertig! Gemcore ist jetzt offline nutzbar
```

##  Gecachte Binaries

Nach dem Setup:

```
gemcore/
 launcher/
     prebuilt/
         .version                                    # v1.0.0
         gemcore-launcher-mac                         # ~500 KB
         gemcore-launcher-win.exe                     # ~300 KB
         gemcore-launcher-linux-x64                   # ~2 MB (mit WebKitGTK)
         gemcore-universal-launcher-linux-embedded    # ~200 KB
```

**Total: ~3 MB** (einmalig)

##  Automatisches Caching

Der `bake` CLI pr√ft automatisch beim Build, ob Binaries verf√gbar sind:

```bash
cd examples/my-game
bun bake build --platform=all
```

### Beim ersten Build (ohne Setup)

```
 First-time setup: Downloading pre-built binaries...
 This enables cross-platform builds and offline usage

  Downloading pre-built binaries from GitHub...
...
```

### Bei nachfolgenden Builds (offline!)

```
 Pre-built binaries already cached!
   Version: v1.0.0

 Gemcore can now be used offline

 Building Linux Single Executable (x86_64)
 Using cached pre-built x64 binary (with WebKitGTK)
 Using cached pre-built universal launcher
...
```

##  Cross-Platform Builds

Mit gecachten Binaries kannst du **von jedem OS aus f√r alle OS bauen**:

### Von macOS aus

```bash
# Build f√r alle Plattformen
bun bake build --platform=all

# Oder einzeln
bun bake build --platform=mac     #  Native
bun bake build --platform=win     #  Pre-built Binary
bun bake build --platform=linux   #  Pre-built Binary (mit WebKitGTK!)
```

### Von Windows aus

```bash
bun bake build --platform=all

bun bake build --platform=win     #  Native
bun bake build --platform=mac     #  Pre-built Binary
bun bake build --platform=linux   #  Pre-built Binary
```

### Von Linux aus

```bash
bun bake build --platform=all

bun bake build --platform=linux   #  Native (mit WebKitGTK)
bun bake build --platform=mac     #  Pre-built Binary
bun bake build --platform=win     #  Pre-built Binary
```

##  Binaries aktualisieren

### Manuell

```bash
# Neue Version herunterladen
bun scripts/download-prebuilt-binaries.ts --force

# Oder Cache l√∂schen und neu bauen
rm -rf launcher/prebuilt/*
bun bake build --platform=all
```

### Als Submodule

```bash
# Gemcore updaten
git submodule update --remote gemcore

# Neue Binaries herunterladen
cd gemcore
bun scripts/download-prebuilt-binaries.ts --force
```

##  Vergleich mit Neutralino.js

| Feature | Neutralino.js | Gemcore |
|---------|--------------|--------|
| Pre-built Binaries |  |  |
| Offline Usage |  |  |
| Auto-Download |  |  |
| Local Cache |  |  |
| Cross-Platform Build |  |  |
| Single Executable |  |  |
| WebKitGTK (Linux) |  |  |
| Steamworks |  |  |
| Asset Encryption |  |  |

##  Workflow

### F√r Framework-Entwickler (Gemcore)

1. Code √ndern
2. `git tag v1.0.1 && git push origin v1.0.1`
3. GitHub Actions baut automatisch neue Binaries
4. Neue Binaries sind sofort verf√gbar f√r alle User

### F√r App-Entwickler (Bunery)

1. Gemcore als Submodule einbinden
2. Einmalig: `bun scripts/setup.ts`
3. **Offline arbeiten!**
4. Update: `git submodule update --remote`

### F√r Spiele-Entwickler

1. Gemcore clonen oder als Submodule
2. Einmalig: `bun scripts/setup.ts`
3. **Offline arbeiten!**
4. `bun bake build --platform=all`

##  Performance

### Mit gecachten Binaries

```bash
bun bake build --platform=all
```

- **macOS**: ~5 Sekunden (native build)
- **Windows**: ~2 Sekunden (pre-built binary)
- **Linux**: ~2 Sekunden (pre-built binary)

**Total: ~9 Sekunden** f√r alle 3 Plattformen!

### Ohne gecachte Binaries (Fallback)

- **macOS**: ~5 Sekunden (native build)
- **Windows**: ~5 Sekunden (native build)
- **Linux**: ~10 Sekunden (cross-compile ohne WebKitGTK)

**Total: ~20 Sekunden**

##  Troubleshooting

### "Failed to fetch latest release"

Ü Noch kein GitHub Release vorhanden. Erstelle einen:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### "Could not download pre-built binaries"

Ü Kein Problem! Gemcore f√llt automatisch auf lokale Compilation zur√ck.

### "No apps available" (Linux)

Ü Du verwendest eine cross-compilierte Linux-Binary ohne WebKitGTK.

**L√∂sung:**
1. Pre-built Binary verwenden (empfohlen)
2. Auf Linux nativ bauen
3. WebKitGTK installieren: `sudo apt-get install libwebkit2gtk-4.1-dev`

### Cache l√∂schen

```bash
rm -rf launcher/prebuilt/*
```

Beim n√chsten Build werden Binaries neu heruntergeladen.

##  Siehe auch

- [Cross-Platform Builds](./CROSS-PLATFORM-BUILDS.md)
- [Pre-built Binaries README](../launcher/prebuilt/README.md)
- [Download Script](../scripts/download-prebuilt-binaries.ts)
- [Setup Script](../scripts/setup.ts)

