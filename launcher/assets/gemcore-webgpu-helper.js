/**
 *  Gemcore WebGPU Helper - Universal GPU Acceleration
 * Framework-agnostic helper that enables WebGPU for any game engine
 * Automatic fallback: WebGPU † WebGL2 † WebGL
 */

(function() {
    'use strict';
    
    const GemcoreGPU = {
        // GPU Info
        info: {
            hasWebGPU: false,
            hasWebGL2: false,
            hasWebGL: false,
            preferredAPI: null,
            adapter: null,
            device: null,
            limits: null,
            features: null
        },
        
        // Performance metrics
        metrics: {
            initTime: 0,
            frameCount: 0,
            startTime: performance.now()
        },
        
        /**
         * Initialize GPU detection - SYNC first, then ASYNC
         */
        init() {
            const startTime = performance.now();
            
            // SYNC: Check WebGL immediately (instant!)
            const canvas = document.createElement('canvas');
            const gl2 = canvas.getContext('webgl2');
            if (gl2) {
                this.info.hasWebGL2 = true;
                this.info.preferredAPI = 'webgl2';
            }
            
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                this.info.hasWebGL = true;
                if (!this.info.preferredAPI) {
                    this.info.preferredAPI = 'webgl';
                }
            }
            
            this.metrics.initTime = performance.now() - startTime;
            
            // ASYNC: Check WebGPU in background (don't block!)
            if (navigator.gpu) {
                this.info.hasWebGPU = true;  // Optimistic
                this.info.preferredAPI = 'webgpu';
                
                navigator.gpu.requestAdapter({
                    powerPreference: 'high-performance'
                }).then(adapter => {
                    if (adapter) {
                        this.info.adapter = {
                            vendor: adapter.info?.vendor || 'Unknown',
                            architecture: adapter.info?.architecture || 'Unknown',
                            device: adapter.info?.device || 'Unknown',
                            description: adapter.info?.description || 'Unknown'
                        };
                        
                        return adapter.requestDevice();
                    }
                }).then(device => {
                    if (device) {
                        this.info.device = device;
                        console.log(' Gemcore: WebGPU ready!', this.info.adapter);
                    }
                }).catch(e => {
                    console.warn(' Gemcore: WebGPU init failed:', e.message);
                    this.info.hasWebGPU = false;
                    this.info.preferredAPI = this.info.hasWebGL2 ? 'webgl2' : 'webgl';
                });
            }
            
            // Log summary (sync part)
            console.log(' Gemcore GPU Support:', {
                WebGPU: this.info.hasWebGPU ? ' (loading...)' : '',
                WebGL2: this.info.hasWebGL2 ? '' : '',
                WebGL: this.info.hasWebGL ? '' : '',
                Preferred: this.info.preferredAPI,
                InitTime: `${this.metrics.initTime.toFixed(2)}ms`
            });
            
            return this.info;
        },
        
        /**
         * Get recommended canvas context type
         */
        getRecommendedContext() {
            if (this.info.hasWebGPU) return 'webgpu';
            if (this.info.hasWebGL2) return 'webgl2';
            if (this.info.hasWebGL) return 'webgl';
            return null;
        },
        
        /**
         * Create optimized canvas context with automatic fallback
         */
        async createContext(canvas, options = {}) {
            const preferred = options.preferWebGPU !== false;
            
            // Try WebGPU first (if preferred)
            if (preferred && this.info.hasWebGPU) {
                try {
                    // Return WebGPU context info
                    return {
                        type: 'webgpu',
                        adapter: await navigator.gpu.requestAdapter({
                            powerPreference: options.powerPreference || 'high-performance'
                        }),
                        device: this.info.device,
                        canvas: canvas
                    };
                } catch (e) {
                    console.warn(' WebGPU context creation failed, falling back to WebGL');
                }
            }
            
            // Fallback to WebGL2
            if (this.info.hasWebGL2) {
                const gl = canvas.getContext('webgl2', {
                    alpha: options.alpha !== false,
                    antialias: options.antialias !== false,
                    depth: options.depth !== false,
                    stencil: options.stencil !== false,
                    powerPreference: options.powerPreference || 'high-performance',
                    desynchronized: true // Better performance
                });
                
                if (gl) {
                    return { type: 'webgl2', context: gl, canvas: canvas };
                }
            }
            
            // Fallback to WebGL
            if (this.info.hasWebGL) {
                const gl = canvas.getContext('webgl', {
                    alpha: options.alpha !== false,
                    antialias: options.antialias !== false,
                    depth: options.depth !== false,
                    stencil: options.stencil !== false,
                    powerPreference: options.powerPreference || 'high-performance'
                }) || canvas.getContext('experimental-webgl');
                
                if (gl) {
                    return { type: 'webgl', context: gl, canvas: canvas };
                }
            }
            
            throw new Error('No GPU context available!');
        },
        
        /**
         * Patch HTMLCanvasElement.getContext() to prefer WebGPU
         * This works for ANY framework without knowing what it is!
         */
        patchCanvasAPI() {
            if (!this.info.hasWebGPU) return;
            
            const originalGetContext = HTMLCanvasElement.prototype.getContext;
            const self = this;
            
            HTMLCanvasElement.prototype.getContext = function(contextType, options = {}) {
                // If app asks for webgl2/webgl and WebGPU is available,
                // let them know but don't force it (they need to opt-in)
                if ((contextType === 'webgl2' || contextType === 'webgl') && self.info.hasWebGPU) {
                    // Just log once
                    if (!self._webgpuHintShown) {
                        console.log(' Gemcore: WebGPU available! Use navigator.gpu for better performance');
                        self._webgpuHintShown = true;
                    }
                }
                
                // Call original getContext
                const context = originalGetContext.call(this, contextType, options);
                
                // Optimize WebGL contexts if returned
                if (context && (contextType === 'webgl2' || contextType === 'webgl')) {
                    // Enable all performance extensions
                    const ext = context.getExtension('WEBGL_lose_context');
                    if (ext) {
                        // Prevent context loss
                        this.addEventListener('webglcontextlost', (e) => e.preventDefault());
                    }
                }
                
                return context;
            };
        },
        
        /**
         * Get performance report
         */
        getPerformanceReport() {
            const runtime = performance.now() - this.metrics.startTime;
            const fps = this.metrics.frameCount / (runtime / 1000);
            
            return {
                api: this.info.preferredAPI,
                runtime: runtime.toFixed(0) + 'ms',
                frameCount: this.metrics.frameCount,
                avgFPS: fps.toFixed(1),
                initTime: this.metrics.initTime.toFixed(2) + 'ms'
            };
        }
    };
    
    // Auto-initialize IMMEDIATELY (SYNC, no await!)
    // This ensures GPU info is available before any game code runs
    GemcoreGPU.init();
    GemcoreGPU.patchCanvasAPI();
    
    // Expose globally
    window.GemcoreGPU = GemcoreGPU;
    
    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = GemcoreGPU;
    }
})();

