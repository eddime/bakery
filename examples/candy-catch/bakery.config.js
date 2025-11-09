// 🥐 Bakery Config - Candy Catch Game
export default {
  window: {
    title: "🍬 Candy Catch - Powered by Bakery",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    resizable: false,
    frameless: false,
    startFullscreen: false,
    alwaysOnTop: false,
    debug: true,
  },
  
  app: {
    name: "candy-catch",
    version: "1.0.0",
    entrypoint: "index.html", // Lazy load Phaser AFTER window opens!
  },
  
  build: {
    outdir: "dist",
    outfile: "candy-catch",
  },
};
