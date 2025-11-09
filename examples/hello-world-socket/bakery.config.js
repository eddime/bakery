// 🥐 Bakery Configuration
// Complete configuration for your desktop app

export default {
  // Window settings
  window: {
    title: "🥐 Bakery - Hello World",
    width: 1200,
    height: 800,
    minWidth: 800,           // Minimum window width
    minHeight: 600,          // Minimum window height
    resizable: true,         // Allow window resizing
    frameless: false,        // Hide window frame (titlebar, borders)
    fullscreen: false,       // F11 to toggle fullscreen
    startFullscreen: false,  // Auto-fullscreen on launch (games, kiosk mode)
    alwaysOnTop: false,      // Keep window always on top
    debug: true,             // Enable debug logs (WebView inspector)
  },

  // App metadata
  app: {
    name: "hello-world-socket",
    version: "1.0.0",
    description: "Hello World app built with Bakery Framework",
    author: "Bakery Team",
  },
    
  // Build settings
  build: {
    outdir: "dist",          // Output directory
    outfile: "hello-world",  // Executable name (without extension)
    
    // Platform-specific settings
    windows: {
      icon: "assets/icon.ico",  // Windows .ico file
    },
    macos: {
      icon: "assets/icon.icns", // macOS .icns file
    },
    linux: {
      icon: "assets/icon.png",  // Linux .png file
    },
  },
};
