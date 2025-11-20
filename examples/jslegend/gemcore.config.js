export default {
  app: {
    // IMPORTANT: 'name' determines the port for localStorage persistence!
    // Keep this constant across versions to preserve save data.
    // Changing this will reset all localStorage data.
    name: "jslegend",
    version: "1.0.0",  // Changed to test Game Mode
    entrypoint: "index.html"
  },
  window: {
    title: "Jslegend Test, thank you for the fix <3",  // Can change freely (e.g., add version number)
    width: 1280,
    height: 720,
    resizable: true,
    startFullscreen: true,  // Always start in fullscreen for best performance
    alwaysOnTop: false,
    frameless: false
  }
};

