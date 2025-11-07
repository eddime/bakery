/**
 * 🥐 Bakery Auto-Init Script
 * Automatically sets window title from bakery.config.js
 * Include this in your HTML: <script src="bakery-init.js"></script>
 */

(async function() {
  try {
    // Try to load bakery config
    const response = await fetch('/bakery.config.js');
    if (response.ok) {
      const configText = await response.text();
      
      // Extract config object (simple regex parsing)
      const match = configText.match(/export\s+default\s+(\{[\s\S]*\});?$/m);
      if (match) {
        // Safely evaluate the config object
        const configStr = match[1];
        const config = eval(`(${configStr})`);
        
        // Set window title if available
        if (config?.window?.title) {
          document.title = config.window.title;
          console.log('🥐 Bakery: Window title set to:', config.window.title);
        }
        
        // Apply fullscreen if configured
        if (config?.window?.startFullscreen) {
          console.log('🥐 Bakery: Requesting fullscreen...');
          // Wait for user interaction before requesting fullscreen
          document.addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            }
          }, { once: true });
        }
      }
    }
  } catch (err) {
    console.warn('🥐 Bakery: Could not load config:', err.message);
  }
})();

