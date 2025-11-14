export default {
  app: {
    // IMPORTANT: 'name' determines the port for localStorage persistence!
    // Keep this constant across versions to preserve save data.
    // Changing this will reset all localStorage data.
    name: "stress-test",
    version: "1.0.5",  // Testing with old launcher + Steamworks support
    entrypoint: "index.html"
  },
  window: {
    title: "🔥 Bakery Stress Test",  // Can change freely (e.g., add version number)
    width: 1280,
    height: 720,
    resizable: true,
    startFullscreen: false,
    alwaysOnTop: false,
    frameless: false
  }
};

