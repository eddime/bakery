# Windows Binary

 **Windows binary requires WebView2 SDK**

To build the Windows binary, you need:
1. Install WebView2 SDK: https://developer.microsoft.com/en-us/microsoft-edge/webview2/
2. Run: `bun scripts/build-launchers.ts`

Or use the existing build script:
```bash
bake win --dir examples/your-game
```

The Windows binary will be automatically extracted from the built `.exe` file.

