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
  }
};

