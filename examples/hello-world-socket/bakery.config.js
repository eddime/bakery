// 🥐 Bakery Configuration
// Define the default project to run with 'bake dev'

export default {
  // Default project for 'bake dev' (relative to this config file)
  defaultProject: './examples/hello-world-socket',
  
  // You can also define multiple projects:
  projects: {
    'hello': './examples/hello-world-socket',
    'backend': './examples/backend-minimal',
    // Add more projects here
  },

  // Window configuration
  window: {
    // Initial window size
    width: 800,
    height: 600,
    
    // Minimum window size (enforced at runtime)
    minWidth: 400,
    minHeight: 300,
    
    // Start in fullscreen
    startFullscreen: false,
    
    // Window title (can be overridden by app)
    title: 'Bakery App',
    
    // Window position (x, y) - optional, undefined = centered
    // x: 100,
    // y: 100,
    
    // Background color
    backgroundColor: '#ffffff',
    
    // Always on top (not yet supported by Socket Runtime)
    // alwaysOnTop: false,
  },

  // Icons for different platforms
  icons: {
    mac: 'src/icon.png',
    win: 'src/icon.png',
    linux: 'src/icon.png',
  },

  // Permissions
  permissions: {
    fullscreen: true,
    clipboard: true,
    geolocation: false,
    notifications: true,
    microphone: false,
    camera: false,
    bluetooth: false,
  }
};

