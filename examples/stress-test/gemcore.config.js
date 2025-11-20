export default {
  app: {
    // IMPORTANT: 'name' determines the port for localStorage persistence!
    // Keep this constant across versions to preserve save data.
    // Changing this will reset all localStorage data.
    name: "stress-test",
    version: "1.0.8",  // Testing splash screen
    entrypoint: "index.html",
    splash: true  //  Test splash screen
  },
  window: {
    title: " Gemcore Stress Test",  // Can change freely (e.g., add version number)
    width: 1280,
    height: 720,
    resizable: true,
    startFullscreen: false,
    alwaysOnTop: false,
    frameless: false
  }
};

