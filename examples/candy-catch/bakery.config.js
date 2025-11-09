// 🥐 Bakery Config - Candy Catch Game
export default {
  app: {
    name: "candy-catch",
    version: "1.0.0",
  },
  
  window: {
    title: "🍬 Candy Catch - Powered by Bakery",
    width: 800,
    height: 600,
    resizable: false,
  },
  
  entrypoint: "index.html",
  
  build: {
    outdir: "dist",
    outfile: "candy-catch",
  },
};
