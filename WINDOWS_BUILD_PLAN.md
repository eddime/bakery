# 🪟 Windows Build Plan - Simplified

## Problem
- `bakery-ultra.cpp` und `bakery-launcher-shared.cpp` nutzen Unix APIs (`sys/socket.h`, `pthread`)
- Windows braucht Winsock2 und Windows Threads
- Cross-Compilation ist komplex wegen WebView2

## Lösung: Vereinfachter Ansatz

### **Option A: Direkte Portierung (komplex)**
- `bakery-ultra-windows.cpp` mit Winsock2
- Viel Arbeit, viele Platform-Unterschiede

### **Option B: Native Windows Build (empfohlen!)**
- Windows-User buildet selbst auf Windows mit Visual Studio / MinGW
- Nutzt native Windows WebView2
- Einfacher und robuster

### **Option C: Docker Cross-Compile**
- Docker Container mit MinGW + WebView2 SDK
- Automatisiert aber langsamer

## Aktuelle Entscheidung
**Fokus erstmal auf macOS (fertig ✅) und Linux, dann Windows native builds**

Windows Cross-Compile ist sehr komplex wegen:
- WebView2 SDK Dependencies
- Winsock vs Unix Sockets  
- Threading (pthread vs Windows Threads)
- File System APIs

Für jetzt: **User buildet Windows-Version auf Windows selbst!**


