# 🐧 Linux Launcher mit WebKit bauen - Einfache Anleitung

## Voraussetzungen

Du musst auf einem **Linux-System** sein (Ubuntu, Debian, etc.). Auf macOS/Windows geht das nicht direkt.

## Schritt 1: Dependencies installieren

Öffne ein Terminal und führe diese Befehle aus:

```bash
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    cmake \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    pkg-config \
    libssl-dev \
    libcurl4-openssl-dev
```

**Was macht das?**
- `build-essential`: Compiler (gcc, g++, make)
- `cmake`: Build-System
- `libgtk-3-dev`: GTK3 GUI-Bibliothek
- `libwebkit2gtk-4.1-dev`: WebKit für den Launcher (das wichtigste!)
- `pkg-config`: Findet die Bibliotheken automatisch
- `libssl-dev` & `libcurl4-openssl-dev`: Für HTTPS/Netzwerk

## Schritt 2: Bun installieren (falls noch nicht vorhanden)

```bash
curl -fsSL https://bun.sh/install | bash
```

Nach der Installation Terminal neu starten oder:
```bash
source ~/.bashrc
```

## Schritt 3: Projekt klonen/bauen

```bash
# Falls noch nicht geklont:
git clone https://github.com/eddime/gemcore.git
cd gemcore

# Dependencies installieren
bun install
```

## Schritt 4: Launcher bauen

### Option A: Automatisch (empfohlen)

```bash
# Das Script macht alles automatisch:
bash scripts/build-and-commit-linux-binaries.sh
```

Das Script:
1. ✅ Installiert automatisch alle Dependencies
2. ✅ Baut den Universal Launcher
3. ✅ Baut den x64 Launcher mit WebKitGTK
4. ✅ Kopiert die Binaries nach `bin/`

### Option B: Manuell

```bash
# 1. In den launcher Ordner gehen
cd launcher

# 2. Build-Ordner erstellen
mkdir -p build-linux-x64
cd build-linux-x64

# 3. CMake konfigurieren
cmake .. -DCMAKE_BUILD_TYPE=Release

# 4. Bauen
make gemcore-launcher-linux -j$(nproc)

# 5. Binary optimieren (kleiner machen)
strip gemcore-launcher-linux

# 6. Prüfen ob es funktioniert
./gemcore-launcher-linux --version
```

## Schritt 5: Prüfen ob WebKit gefunden wurde

Wenn du `cmake ..` ausführst, solltest du diese Meldung sehen:

```
✅ Found system WebKitGTK (Neutralino-style)
   GTK: 3.24.x
   WebKit: 2.40.x
```

**Wenn du stattdessen siehst:**
```
⚠️  WebKitGTK not found - using minimal build (system browser)
```

Dann sind die Dependencies nicht richtig installiert. Führe nochmal Schritt 1 aus.

## Schritt 6: Spiel bauen

Nachdem der Launcher gebaut ist, kannst du dein Spiel bauen:

```bash
# Zurück zum Projekt-Root
cd ../..

# Spiel bauen (z.B. stress-test)
bun run bake linux --dir examples/stress-test
```

Das erstellt:
- `examples/stress-test/dist/linux/stress-test-x86_64.AppImage`
- `examples/stress-test/dist/linux/stress-test-arm64.AppImage` (falls ARM64 gebaut wurde)

## Troubleshooting

### "pkg-config: command not found"
```bash
sudo apt-get install pkg-config
```

### "libwebkit2gtk-4.1-dev: Package not found"
```bash
# Versuche die ältere Version:
sudo apt-get install libwebkit2gtk-4.0-dev
```

### "cmake: command not found"
```bash
sudo apt-get install cmake
```

### "make: command not found"
```bash
sudo apt-get install build-essential
```

### Build schlägt fehl mit "undefined reference"
- Stelle sicher, dass alle Dependencies installiert sind (Schritt 1)
- Lösche den Build-Ordner und baue neu:
  ```bash
  rm -rf launcher/build-linux-x64
  # Dann nochmal Schritt 4
  ```

## Was wird gebaut?

1. **Universal Launcher** (`gemcore-universal-launcher-linux-embedded`)
   - Erkennt automatisch die CPU-Architektur
   - Wird in jedes Spiel eingebettet

2. **x64 Launcher** (`gemcore-launcher-linux`)
   - Für Intel/AMD 64-bit CPUs
   - Mit WebKitGTK-Unterstützung

3. **ARM64 Launcher** (optional)
   - Für ARM-basierte CPUs (Raspberry Pi, etc.)
   - Wird nur gebaut wenn du auf ARM64 Linux bist

## Fertig! 🎉

Die Binaries findest du in:
- `bin/linux-x64/gemcore-launcher-linux`
- `bin/linux-universal/gemcore-universal-launcher-linux-embedded`

Diese kannst du jetzt verwenden, um Spiele zu bauen!

