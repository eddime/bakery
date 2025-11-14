export default {
  app: {
    name: "steamdemo", // IMPORTANT: 'name' determines the port for localStorage persistence!
    version: "4.2.0",  // Testing with updated fast launcher
    entrypoint: "index.html",
    icon: "icon.png",  // 🎨 PNG will be auto-converted to ICNS/ICO
    debug: true  // Enable debug mode for testing
  },
  window: {
    title: "🎮 Bakery Steamworks Demo",
    width: 1280,
    minWidth: 1280,
    minHeight: 720,
    height: 720,
    resizable: true,
    startFullscreen: true,  // ← Enable for Game Mode notification!
    alwaysOnTop: false,
    frameless: false
  },
  steamworks: {
    enabled: true,
    appId: 480  // Spacewar demo app (for testing)
  }
};



