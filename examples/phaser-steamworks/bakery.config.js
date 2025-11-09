// 🥐 Bakery Config - Phaser + Steamworks Game
export default {
  window: {
    title: "🎮 Bakery Phaser + Steamworks Demo",
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    frameless: false,
    startFullscreen: false,
    alwaysOnTop: false,
    debug: true,
  },
  
  app: {
    name: "phaser-steamworks",
    version: "1.0.0",
    entrypoint: "src/index.html",
  },
  
  steamworks: {
    appId: 480, // SpaceWar (Steamworks Test App)
    enabled: true,
  },
  
  build: {
    outdir: "dist",
    outfile: "phaser-game",
    icon: {
      mac: "assets/icon.icns",
      win: "assets/icon.ico",
      linux: "assets/icon.png",
    },
  },
};
