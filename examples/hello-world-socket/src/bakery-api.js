/**
 * 🥐 Bakery API for Socket Runtime
 * Simple wrapper around Socket Runtime's native APIs
 */

export const Bakery = {
  window: {
    /**
     * Set window title
     * @param {string} title - New window title
     */
    async setTitle(title) {
      // Socket Runtime doesn't have a direct setTitle API
      // But we can use document.title which might work
      document.title = title;
      console.log('🥐 Bakery: Set window title to:', title);
    },

    /**
     * Toggle fullscreen
     * @param {boolean} enabled - Enable/disable fullscreen
     */
    async setFullscreen(enabled) {
      if (enabled) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    }
  }
};

// Auto-apply bakery.config.js settings on load
(async function autoInit() {
  try {
    // Load config from bakery.config.js
    const config = await import('./bakery.config.js');
    const bakeryConfig = config.default;
    
    // Set title if configured
    if (bakeryConfig?.window?.title) {
      await Bakery.window.setTitle(bakeryConfig.window.title);
    }
    
    // Apply fullscreen if configured (after user interaction)
    if (bakeryConfig?.window?.startFullscreen) {
      // Wait for first click before requesting fullscreen
      document.addEventListener('click', () => {
        Bakery.window.setFullscreen(true);
      }, { once: true });
    }
    
    console.log('🥐 Bakery initialized!');
  } catch (err) {
    console.warn('🥐 Bakery: Could not load config:', err.message);
  }
})();

