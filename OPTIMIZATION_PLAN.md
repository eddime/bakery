# 🚀 Bakery Optimization Plan

## Aktuelle Größe: **7.3 MB**
## Ziel: **< 5 MB**

---

## 📊 **Größenaufschlüsselung:**

```bash
# Analysiere aktuelle Größe
ls -lh dist/bakery-postject
# → 7.3 MB

# Was ist drin?
- Launcher (C++):        ~180 KB
- Socket Runtime:        ~1.5 MB
- Resources (212 files): ~5.6 MB
```

**→ Die Resources sind das Problem!** (77% der Größe)

---

## 🎯 **Optimierungen:**

### **1. Binary Stripping (Easy Win!)** ⚡
**Entfernt Debug-Symbole**

```bash
strip dist/bakery-postject
```

**Ersparnis: ~50-100 KB**

---

### **2. UPX Compression (Huge Win!)** 🗜️
**Komprimiert das Binary**

```bash
brew install upx
upx --best --lzma dist/bakery-postject
```

**Ersparnis: 30-50% der Größe**
**→ 7.3 MB → ~4-5 MB** ✅

**Nachteil:**
- ~100-200ms längere Startup-Zeit (Dekompression)
- Manche Antivirus-Software meldet false-positive

---

### **3. Socket Runtime Resources optimieren** 📦

**Problem:** 212 Dateien = 5.6 MB

**Lösung A: Minimale Resources**
```typescript
// Nur die wichtigsten Files einbetten
const criticalResources = [
  'socket.ini',
  'src/index.html',
  'src/index.js'
];
// → Von 5.6 MB auf ~50 KB!
```

**Lösung B: Resource Compression**
```typescript
// Komprimiere Resources mit Brotli
import { compress } from 'brotli';
const compressed = compress(fileContent);
// → ~70% Reduktion
```

---

### **4. Socket Runtime selbst kompilieren** 🔧
**Nutze nur benötigte Features**

```bash
# Socket Runtime ohne unnötige Module
./configure --disable-bluetooth --disable-crypto-experimental
make
```

**Ersparnis: ~300-500 KB**

---

### **5. Alternative: Minimal Runtime** 🎯

**Statt Socket Runtime (1.5 MB):**
- **QuickJS** (~300 KB) + **minimal Node.js APIs**
- Nur: `fs`, `path`, `process`
- Kein: `http`, `crypto`, `stream`

**Ersparnis: ~1.2 MB**
**→ 7.3 MB → ~6 MB**

---

### **6. Lazy Loading** ⚡
**Lade Resources nur bei Bedarf**

```typescript
// Statt alle Resources zu extrahieren:
// → Extrahiere nur index.html initial
// → Andere Files on-demand

// Spart Initial-Zeit & RAM
```

---

## 📈 **Performance-Optimierungen:**

### **1. Parallel Extraction** ⚡
```cpp
// Extrahiere Files parallel (multi-threading)
#include <thread>
std::vector<std::thread> threads;
for (auto& file : resources) {
    threads.emplace_back(extractFile, file);
}
```

**Speedup: 2-3x bei vielen Files**

---

### **2. Brotli Dekompression** 🗜️
```cpp
// Dekomprimiere im Voraus (vor extraction)
// → Schneller als Base64-Decode
```

**Speedup: ~30%**

---

### **3. RAMDisk Pre-Allocation** ⚡
```cpp
// Erstelle RAMDisk mit genauer Größe (kein Overhead)
size_t exactSize = calculateExactSize();
createRamDisk(exactSize);
```

**Speedup: ~10%**

---

### **4. Compiler Optimizations** 🔧
```cmake
# CMakeLists.txt
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -march=native -flto")
```

- `-O3`: Maximale Optimierung
- `-march=native`: CPU-spezifische Optimierungen
- `-flto`: Link-Time Optimization

**Speedup: ~20%**

---

## 🎯 **Empfohlener Action Plan:**

### **Phase 1: Quick Wins (10 min)** ✅
1. Strip Binary → ~7.2 MB
2. UPX Compression → **~4-5 MB** ✅
3. Compiler Flags → +20% Speed

**Resultat: 5 MB, 20% schneller**

### **Phase 2: Resource Optimization (1h)**
1. Nur kritische Resources einbetten → ~2 MB
2. Brotli Compression → ~1.5 MB

**Resultat: ~3 MB**

### **Phase 3: Runtime Optimization (2-3h)**
1. Custom Socket Runtime Build → ~2.5 MB
2. Lazy Loading → +30% Speed

**Resultat: ~2.5 MB, 50% schneller**

---

## 📊 **Projektion:**

| Phase | Größe | Startup | Aufwand |
|-------|-------|---------|---------|
| **Aktuell** | 7.3 MB | ~1.6s | - |
| **Phase 1** | **5 MB** | **~1.3s** | **10 min** ✅ |
| **Phase 2** | **3 MB** | ~1.2s | 1h |
| **Phase 3** | **2.5 MB** | **~0.8s** | 3h |

---

## 🚀 **Let's Start with Phase 1!**

Soll ich jetzt:
1. ✅ **Strip + UPX** (10 min) → **5 MB** 
2. ⏭️ Resource Optimization (später)
3. ⏭️ Runtime Optimization (später)

**Was möchtest du?** 🤔

