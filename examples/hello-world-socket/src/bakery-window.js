/**
 * 🥐 Bakery Window API
 * Extended Window Controls for Socket Runtime
 * 
 * Provides additional window features:
 * - Fullscreen toggle
 * - Always on top
 * - Minimum size constraints
 * - Icon management
 * - Window states
 */

import * as application from 'socket:application';

/**
 * BakeryWindow - Extended window controls
 */
export class BakeryWindow {
  #window = null;
  #minWidth = 0;
  #minHeight = 0;
  #isFullscreen = false;
  #savedBounds = null;
  #config = null;

  constructor(config = null) {
    this.#window = application.getCurrentWindow();
    this.#config = config;
    
    // Apply config on initialization
    if (this.#config) {
      this.#applyConfig();
    }
  }

  /**
   * Apply configuration from bakery.config.js
   */
  async #applyConfig() {
    const win = this.#config?.window;
    if (!win) return;

    try {
      // Set window title
      if (win.title) {
        await this.setTitle(win.title);
      }

      // Set window size
      if (win.width && win.height) {
        await this.setSize(win.width, win.height);
      }

      // Set minimum size
      if (win.minWidth && win.minHeight) {
        this.setMinimumSize(win.minWidth, win.minHeight);
      }

      // Set window position (if specified)
      if (win.x !== undefined && win.y !== undefined) {
        await this.setPosition(win.x, win.y);
      }

      // Set background color
      if (win.backgroundColor) {
        await this.setBackgroundColor(win.backgroundColor);
      }

      // Start in fullscreen
      if (win.startFullscreen) {
        await this.startFullscreen();
      }

      // Always on top (if Socket Runtime supports it in future)
      if (win.alwaysOnTop) {
        this.setAlwaysOnTop(win.alwaysOnTop);
      }

      console.log('✅ Bakery config applied to window');
    } catch (err) {
      console.error('❌ Failed to apply Bakery config:', err);
    }
  }

  /**
   * Get current window instance
   */
  get current() {
    return this.#window;
  }

  /**
   * Set window title
   * @param {string} title - Window title
   */
  async setTitle(title) {
    await this.#window.setTitle(title);
  }

  /**
   * Set window size
   * @param {number} width - Window width
   * @param {number} height - Window height
   */
  async setSize(width, height) {
    // Enforce minimum size if set
    const finalWidth = this.#minWidth > 0 ? Math.max(width, this.#minWidth) : width;
    const finalHeight = this.#minHeight > 0 ? Math.max(height, this.#minHeight) : height;
    
    await this.#window.setSize({ width: finalWidth, height: finalHeight });
  }

  /**
   * Set minimum window size
   * @param {number} minWidth - Minimum width
   * @param {number} minHeight - Minimum height
   */
  setMinimumSize(minWidth, minHeight) {
    this.#minWidth = minWidth;
    this.#minHeight = minHeight;
    
    // Enforce minimum size on current window
    const size = this.#window.getSize();
    if (size.width < minWidth || size.height < minHeight) {
      this.setSize(
        Math.max(size.width, minWidth),
        Math.max(size.height, minHeight)
      );
    }
  }

  /**
   * Get minimum size constraints
   */
  getMinimumSize() {
    return {
      width: this.#minWidth,
      height: this.#minHeight
    };
  }

  /**
   * Toggle fullscreen mode
   * @param {boolean} [enable] - Force fullscreen on/off (optional)
   */
  async toggleFullscreen(enable) {
    const shouldFullscreen = enable !== undefined ? enable : !this.#isFullscreen;
    
    if (shouldFullscreen && !this.#isFullscreen) {
      // Save current bounds before going fullscreen
      this.#savedBounds = {
        ...this.#window.getSize(),
        ...this.#window.getPosition()
      };
      
      // Maximize to fullscreen
      await this.#window.maximize();
      this.#isFullscreen = true;
    } else if (!shouldFullscreen && this.#isFullscreen) {
      // Restore previous size and position
      if (this.#savedBounds) {
        await this.#window.setSize({
          width: this.#savedBounds.width,
          height: this.#savedBounds.height
        });
        await this.#window.setPosition({
          x: this.#savedBounds.x,
          y: this.#savedBounds.y
        });
      }
      this.#isFullscreen = false;
    }
  }

  /**
   * Check if window is fullscreen
   */
  isFullscreen() {
    return this.#isFullscreen;
  }

  /**
   * Start in fullscreen mode
   */
  async startFullscreen() {
    await this.toggleFullscreen(true);
  }

  /**
   * Set always on top
   * Note: Socket Runtime doesn't have native alwaysOnTop support yet.
   * This is a placeholder for future implementation.
   * 
   * @param {boolean} enable - Enable/disable always on top
   */
  setAlwaysOnTop(enable) {
    console.warn('⚠️  setAlwaysOnTop is not yet supported by Socket Runtime');
    console.warn('    Track feature request: https://github.com/socketsupply/socket/issues');
    // TODO: Implement when Socket Runtime adds native support
    return false;
  }

  /**
   * Set window icon
   * Note: Icon must be set in socket.ini [mac/win/linux] icon = "path/to/icon.png"
   * This is a runtime info method.
   * 
   * @param {string} iconPath - Path to icon file
   */
  setIcon(iconPath) {
    console.warn('⚠️  setIcon must be configured in socket.ini:');
    console.warn('    [mac]');
    console.warn('    icon = "' + iconPath + '"');
    return false;
  }

  /**
   * Show window
   */
  async show() {
    await this.#window.show();
  }

  /**
   * Hide window
   */
  async hide() {
    await this.#window.hide();
  }

  /**
   * Minimize window
   */
  async minimize() {
    await this.#window.minimize();
  }

  /**
   * Maximize window
   */
  async maximize() {
    await this.#window.maximize();
  }

  /**
   * Close window
   */
  async close() {
    await this.#window.close();
  }

  /**
   * Get window size
   */
  getSize() {
    return this.#window.getSize();
  }

  /**
   * Get window position
   */
  getPosition() {
    return this.#window.getPosition();
  }

  /**
   * Get window title
   */
  getTitle() {
    return this.#window.getTitle();
  }

  /**
   * Set window position
   */
  async setPosition(x, y) {
    await this.#window.setPosition({ x, y });
  }

  /**
   * Set background color
   */
  async setBackgroundColor(color) {
    await this.#window.setBackgroundColor({ value: color });
  }

  /**
   * Show developer tools
   */
  async showDevTools() {
    await this.#window.showInspector();
  }
}

/**
 * Create a new Bakery window with config
 * @param {Object} config - Bakery config object (optional)
 */
export function createWindow(config = null) {
  return new BakeryWindow(config);
}

/**
 * Get current window with config
 * @param {Object} config - Bakery config object (optional)
 */
export function getCurrentWindow(config = null) {
  return new BakeryWindow(config);
}

/**
 * Load Bakery config from bakery.config.js
 * This should be called at app startup
 */
export async function loadBakeryConfig() {
  try {
    // Try to load from different possible paths
    // Socket Runtime copies files from src/, so check there first
    const possiblePaths = [
      './bakery.config.js',          // Same directory (in src/)
      '../bakery.config.js',         // Parent directory
      '../../bakery.config.js',      // Framework root
      '/bakery.config.js',           // Absolute from root
    ];

    for (const path of possiblePaths) {
      try {
        const module = await import(path);
        const config = module.default || module;
        console.log('✅ Loaded bakery.config.js from', path);
        return config;
      } catch (err) {
        // Try next path
        continue;
      }
    }

    console.warn('⚠️  bakery.config.js not found, using defaults');
    console.warn('    Place bakery.config.js in src/ directory for Socket Runtime');
    return null;
  } catch (err) {
    console.error('❌ Failed to load bakery.config.js:', err);
    return null;
  }
}

/**
 * Initialize Bakery window with auto-loaded config
 * This is the recommended way to initialize a Bakery app
 */
export async function initBakery() {
  const config = await loadBakeryConfig();
  const window = getCurrentWindow(config);
  
  return {
    window,
    config
  };
}

export default {
  BakeryWindow,
  createWindow,
  getCurrentWindow
};

