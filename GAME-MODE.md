# 🎮 macOS Game Mode Dokumentation

## Offizielle Apple Dokumentation

### User-Facing Dokumentation
- **Apple Support**: https://support.apple.com/en-us/105118
  - Erklärt wie Game Mode funktioniert
  - Wie man Game Mode aktiviert/deaktiviert
  - Systemanforderungen (Apple Silicon, macOS Sonoma 14+)

### Developer-Dokumentation
- **NSProcessInfo**: https://developer.apple.com/documentation/foundation/nsprocessinfo
- **beginActivityWithOptions**: https://developer.apple.com/documentation/foundation/nsprocessinfo/1415995-beginactivitywithoptions
- **NSActivityOptions**: https://developer.apple.com/documentation/foundation/nsactivityoptions

## Game Mode Features

### Was macht Game Mode?
1. **CPU/GPU Priorität**: Höchste Priorität für Spiele
2. **Hintergrund-Tasks**: Reduzierte Nutzung für Hintergrundaufgaben
3. **Bluetooth**: Verdoppelte Abtastrate für Game-Controller und AirPods
4. **Latenz**: Reduzierte Eingabe- und Audio-Latenz

### Systemanforderungen
- **Hardware**: Mac mit Apple Silicon (M1, M2, M3, M4, etc.)
- **macOS**: Sonoma 14 oder neuer
- **Vollbildmodus**: Game Mode wird automatisch aktiviert im nativen Vollbildmodus

## Programmatische Aktivierung

### NSProcessInfo Activity

```cpp
// Activity Options für Game Mode
NSActivityLatencyCritical = 0xFF00000000ULL  // Latency-critical
NSActivityUserInitiated = 0x00FFFFFFULL      // User-initiated
Combined = 0xFF00FFFFFFULL                    // Beide kombiniert
```

### Beispiel-Implementierung

```cpp
#include <objc/runtime.h>
#include <CoreFoundation/CoreFoundation.h>

void enablePersistentGameMode() {
    Class nsProcessInfoClass = objc_getClass("NSProcessInfo");
    if (!nsProcessInfoClass) return;
    
    SEL processInfoSel = sel_registerName("processInfo");
    id processInfo = ((id (*)(Class, SEL))objc_msgSend)(
        nsProcessInfoClass, processInfoSel
    );
    
    if (!processInfo) return;
    
    // Activity Options: LatencyCritical + UserInitiated
    SEL beginActivitySel = sel_registerName("beginActivityWithOptions:reason:");
    unsigned long long options = 0xFF00FFFFFFULL;
    
    // Reason String
    Class nsStringClass = objc_getClass("NSString");
    SEL stringWithUTF8Sel = sel_registerName("stringWithUTF8String:");
    id reasonStr = ((id (*)(Class, SEL, const char*))objc_msgSend)(
        nsStringClass, stringWithUTF8Sel, "Game - Latency Critical"
    );
    
    // Begin Activity
    static id activityToken = nullptr;
    if (!activityToken) {
        activityToken = ((id (*)(id, SEL, unsigned long long, id))objc_msgSend)(
            processInfo, beginActivitySel, options, reasonStr
        );
        
        // CRITICAL: Retain token to prevent deallocation
        if (activityToken) {
            CFRetain((CFTypeRef)activityToken);
        }
    }
}
```

## NSWindow Collection Behavior

### Fullscreen Button aktivieren

```cpp
// NSWindowCollectionBehaviorFullScreenPrimary = 128 (main display)
// NSWindowCollectionBehaviorFullScreenAuxiliary = 256 (external displays)
NSUInteger behavior = 128 | 256;  // Primary + Auxiliary

SEL setCollectionBehavior = sel_registerName("setCollectionBehavior:");
((void (*)(id, SEL, NSUInteger))objc_msgSend)(nswindow, setCollectionBehavior, behavior);
```

## Info.plist Requirements

### App als Game kategorisieren

```xml
<key>LSApplicationCategoryType</key>
<string>public.app-category.games</string>
```

### Weitere empfohlene Keys

```xml
<key>NSPrincipalClass</key>
<string>NSApplication</string>

<key>NSSupportsAutomaticGraphicsSwitching</key>
<true/>
```

## Environment Variables

### Game Mode Optimierungen

```cpp
setenv("CA_LAYER_OPTIMIZE_FOR_GAME", "1", 1);  // Core Animation optimieren
setenv("MTL_SHADER_VALIDATION", "0", 1);        // Shader Validation deaktivieren
```

### Metal Optimierungen

```cpp
setenv("MTL_HUD_ENABLED", "0", 1);              // Metal HUD deaktivieren
setenv("MTL_DEBUG_LAYER", "0", 1);             // Debug Layer deaktivieren
setenv("MTL_FORCE_SOFTWARE_RENDERING", "0", 1); // Hardware Rendering erzwingen
```

### WebKit Optimierungen

```cpp
setenv("WEBKIT_USE_METAL", "1", 1);            // Metal Rendering aktivieren
setenv("WEBKIT_FORCE_DISCRETE_GPU", "1", 1);   // Discrete GPU erzwingen
```

## Bekannte Probleme & Lösungen

### Problem: Game Mode aktiviert sich nur beim ersten Start
**Lösung**: Token explizit mit `CFRetain()` retainen

### Problem: Game Mode funktioniert nicht auf externen Displays
**Lösung**: `NSWindowCollectionBehaviorFullScreenAuxiliary` setzen (256)

### Problem: Game Mode wird manuell deaktiviert
**Lösung**: macOS merkt sich die Deaktivierung. User muss Game Mode manuell wieder aktivieren.

## Best Practices

1. **Frühe Aktivierung**: Activity sollte ganz am Anfang von `main()` aufgerufen werden
2. **Token Retention**: Token muss explizit retained werden (`CFRetain`)
3. **Fullscreen Button**: Native Fullscreen Button aktivieren für bessere UX
4. **Info.plist**: App als Game kategorisieren
5. **Environment Variables**: Game Mode Optimierungen setzen

## Referenzen

- [Apple Support - Game Mode](https://support.apple.com/en-us/105118)
- [NSProcessInfo Documentation](https://developer.apple.com/documentation/foundation/nsprocessinfo)
- [NSActivityOptions Documentation](https://developer.apple.com/documentation/foundation/nsactivityoptions)

