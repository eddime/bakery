// ⚡ Zippy Framework Configuration
// This is the default configuration for Zippy apps

export interface ZippyConfig {
  // Application metadata
  app: {
    name: string;
    version: string;
    description?: string;
  };

  // Window settings
  window: {
    title: string;
    width: number;
    height: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    resizable?: boolean;
    frame?: boolean;
    transparent?: boolean;
    fullscreen?: boolean;
    startFullscreen?: boolean;
    center?: boolean;
    alwaysOnTop?: boolean;
    devtools?: boolean;
  };

  // Rendering configuration
  rendering: {
    engine?: 'auto' | 'native' | 'ultralight'; // Default: 'auto' (native WebView)
    consistency?: {
      polyfills?: boolean;     // Auto-polyfill differences
      normalize?: boolean;     // CSS normalization
      strict?: boolean;        // Warn on incompatibilities
    };
    hardwareAcceleration?: boolean;
    vsync?: boolean;
    fps?: number;
    webgl?: boolean;
  };

  // Development settings
  dev: {
    port?: number;
    hotReload?: boolean;
    openDevTools?: boolean;
    sourceMap?: boolean;
  };

  // Build configuration
  build: {
    entry: string;
    outDir: string;
    outFile?: string;
    minify?: boolean;
    sourcemap?: boolean;
    
    // Asset embedding
    assets?: {
      embed?: boolean;          // Embed in binary (single-file)
      compression?: 'none' | 'gzip' | 'brotli';
      include?: string[];
      exclude?: string[];
    };
    
    // Target platforms
    targets?: Array<
      | 'linux-x64'
      | 'linux-arm64'
      | 'darwin-x64'
      | 'darwin-arm64'
      | 'windows-x64'
    >;
    
    // Platform-specific settings
    windows?: {
      icon?: string;
      hideConsole?: boolean;
    };
    
    macos?: {
      icon?: string;
      bundle?: boolean;
      codesign?: {
        enabled?: boolean;
        identity?: string;
        entitlements?: string;
      };
    };
    
    linux?: {
      icon?: string;
    };
  };

  // Performance optimizations
  performance?: {
    zeroCopyIPC?: boolean;      // Use shared memory for IPC
    preallocateMemory?: boolean; // Pre-allocate for games
    maxHeapSize?: string;       // e.g., '4GB'
    gcStrategy?: 'incremental' | 'aggressive' | 'lazy';
  };
}

// Default configuration
const defaultConfig: ZippyConfig = {
  app: {
    name: 'zippy-app',
    version: '1.0.0',
  },

  window: {
    title: 'Zippy App',
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    frame: true,
    transparent: false,
    fullscreen: false,
    startFullscreen: false,
    center: true,
    alwaysOnTop: false,
    devtools: true,
  },

  rendering: {
    engine: 'auto',
    consistency: {
      polyfills: true,
      normalize: true,
      strict: false,
    },
    hardwareAcceleration: true,
    vsync: true,
    fps: 144,
    webgl: true,
  },

  dev: {
    port: 3000,
    hotReload: true,
    openDevTools: true,
    sourceMap: true,
  },

  build: {
    entry: './src/main.ts',
    outDir: './dist',
    minify: true,
    sourcemap: false,
    
    assets: {
      embed: true,
      compression: 'gzip',
      include: ['**/*'],
      exclude: ['node_modules/**', '.git/**'],
    },
    
    targets: ['linux-x64', 'darwin-arm64', 'windows-x64'],
    
    windows: {
      icon: './assets/icon.ico',
      hideConsole: true,
    },
    
    macos: {
      icon: './assets/icon.icns',
      bundle: true,
      codesign: {
        enabled: false,
      },
    },
    
    linux: {
      icon: './assets/icon.png',
    },
  },

  performance: {
    zeroCopyIPC: true,
    preallocateMemory: false,
    maxHeapSize: '1GB',
    gcStrategy: 'incremental',
  },
};

export default defaultConfig;

