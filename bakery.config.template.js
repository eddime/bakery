export default {
  app: {
    // ⚠️ IMPORTANT: 'name' determines the port for localStorage persistence!
    // Keep this constant across versions to preserve save data.
    // Changing this will reset all localStorage data (game saves, settings, etc.)
    name: "my-game",
    
    version: "1.0.0",  // Semantic versioning (e.g., "1.2.3")
    entrypoint: "index.html",
    icon: "icon.png",  // 🎨 PNG icon (auto-converted to ICNS/ICO for all platforms!)
    debug: false  // Enable debug mode (right-click menu, DevTools)
  },
  
  window: {
    // Can change freely (e.g., add version number like "My Game v1.2.3")
    title: "My Game",
    width: 1280,
    height: 720,
    minWidth: 800,  // Minimum window width (optional)
    minHeight: 600,  // Minimum window height (optional)
    resizable: true,
    startFullscreen: false,  // Start in fullscreen mode 
    alwaysOnTop: false,  // Keep window always on top
    frameless: false  // Remove window frame/titlebar
  }
};

