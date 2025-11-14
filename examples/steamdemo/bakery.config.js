export default {
  app: {
    name: "steamdemo",
    version: "4.1.1",
    entrypoint: "index.html",
    icon: "icon.png",  // 🎨 PNG will be auto-converted to ICNS/ICO
    debug: true  // Enable debug mode for testing
  },
  window: {
    title: "🎮 Bakery Steamworks Demo",
    width: 1280,
    height: 720,
    resizable: true,
    startFullscreen: false,
    alwaysOnTop: false,
    frameless: false
  },
  steamworks: {
    enabled: true,
    appId: 480  // Spacewar demo app (for testing)
  }
};



