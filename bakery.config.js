// 🥐 Bakery Framework Config

export default {
  // Default project to use when no --dir or --project is specified
  defaultProject: "examples/runner",
  
  // Example projects configuration
  projects: {
    "hello-world": {
      path: "examples/hello-world-socket",
      window: {
        title: "🥐 Bakery - Hello World",
        width: 1280,
        height: 720,
      },
      app: {
        name: "hello-world",
        entrypoint: "src/index.html",
      },
    },
    
    "phaser": {
      path: "examples/phaser-steamworks",
      window: {
        title: "🎮 Bakery Phaser + Steamworks Demo",
        width: 1280,
        height: 720,
      },
      app: {
        name: "phaser-steamworks",
        entrypoint: "src/index.html",
      },
    },
    
    "candy": {
      path: "examples/candy-catch",
      window: {
        title: "🍬 Candy Catch - Powered by Bakery",
        width: 800,
        height: 600,
        resizable: false,
      },
      app: {
        name: "candy-catch",
        entrypoint: "src/index.html",
      },
    },
  },
};
