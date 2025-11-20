//  Gemcore Stress Test - Universal Performance Benchmark
// Tests: Startup Time, Runtime Memory, FPS, CPU Usage

class StressTestBenchmark {
    constructor() {
        this.startTime = Date.now();
        this.framework = null;
        this.stats = {
            os: this.detectOS(),
            framework: null,
            startupTime: 0,
            initialMemory: 0,
            currentMemory: 0,
            fps: 0,
            avgFps: 0,
            minFps: 999,
            maxFps: 0,
            frameCount: 0,
            particleCount: 0,
            drawCalls: 0,
            gpuAPI: 'Unknown',
            webgpuAvailable: false,
        };
        
        this.logs = [];
        this.fpsHistory = [];
        this.lastFrameTime = performance.now();
        this.frameStartTime = performance.now();
        
        this.log(` Gemcore Stress Test initialized on ${this.stats.os}`);
        this.log(` Gemcore Version: ${window.Gemcore?.version || 'Unknown'}`);
        this.log(`  Platform: ${window.Gemcore?.platform || 'Unknown'}`);
        
        //  DEBUG: Check if GemcoreGPU is available
        if (typeof window.GemcoreGPU === 'undefined') {
            this.log(` ERROR: window.GemcoreGPU is UNDEFINED!`);
            console.error('GemcoreGPU not found! Script injection failed?');
        } else {
            this.log(` GemcoreGPU found:`, window.GemcoreGPU.info);
        }
        
        //  Check WebGPU availability
        this.detectGPU();
    }
    
    detectGPU() {
        if (window.GemcoreGPU && window.GemcoreGPU.info) {
            const info = window.GemcoreGPU.info;
            this.stats.webgpuAvailable = info.hasWebGPU || false;
            this.stats.gpuAPI = info.preferredAPI || 'Unknown';
            
            // Update UI immediately
            this.updateStatsUI();
            
            if (info.hasWebGPU) {
                this.log(` WebGPU: AVAILABLE (${info.adapter?.vendor || 'Unknown'})`);
            } else if (info.hasWebGL2) {
                this.log(` WebGL2: Available (WebGPU not supported)`);
            } else if (info.hasWebGL) {
                this.log(` WebGL: Available (Legacy)`);
            }
        } else {
            // GemcoreGPU not loaded yet - retry
            this.log(` Waiting for GemcoreGPU...`);
            setTimeout(() => this.detectGPU(), 50);
        }
    }
    
    detectOS() {
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (platform.includes('mac') || userAgent.includes('mac')) return 'macOS';
        if (platform.includes('win') || userAgent.includes('win')) return 'Windows';
        if (platform.includes('linux') || userAgent.includes('linux')) return 'Linux';
        return 'Unknown';
    }
    
    log(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
        
        // Update console log UI
        const consoleEl = document.getElementById('console-log');
        if (consoleEl) {
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.textContent = logEntry;
            consoleEl.appendChild(entry);
            consoleEl.scrollTop = consoleEl.scrollHeight;
            
            // Keep only last 50 logs
            while (consoleEl.children.length > 50) {
                consoleEl.removeChild(consoleEl.firstChild);
            }
        }
    }
    
    getMemoryUsage() {
        if (performance.memory) {
            return Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        }
        return 0;
    }
    
    updateStats() {
        const now = performance.now();
        const delta = now - this.lastFrameTime;
        this.lastFrameTime = now;
        
        // Calculate FPS
        const fps = Math.round(1000 / delta);
        this.stats.fps = fps;
        this.fpsHistory.push(fps);
        
        // Keep last 60 frames for average
        if (this.fpsHistory.length > 60) {
            this.fpsHistory.shift();
        }
        
        // Calculate average FPS
        this.stats.avgFps = Math.round(
            this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
        );
        
        // Track min/max FPS
        this.stats.minFps = Math.min(this.stats.minFps, fps);
        this.stats.maxFps = Math.max(this.stats.maxFps, fps);
        
        // Update memory
        this.stats.currentMemory = this.getMemoryUsage();
        
        this.stats.frameCount++;
        
        // Update UI every frame
        this.updateStatsUI();
    }
    
    updateStatsUI() {
        const statsEl = document.getElementById('stats');
        if (!statsEl) return;
        
        const fpsClass = this.stats.fps >= 55 ? 'stat-good' : 
                        this.stats.fps >= 30 ? 'stat-warn' : 'stat-bad';
        
        const memClass = this.stats.currentMemory < 150 ? 'stat-good' :
                        this.stats.currentMemory < 250 ? 'stat-warn' : 'stat-bad';
        
        const gpuClass = this.stats.webgpuAvailable ? 'stat-webgpu' : 'stat-webgl';
        const gpuIcon = this.stats.webgpuAvailable ? '' : '';
        
        statsEl.innerHTML = `
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                 Performance Stats
            </div>
            <div><strong>OS:</strong> ${this.stats.os}</div>
            <div><strong>Framework:</strong> ${this.stats.framework}</div>
            <div class="${gpuClass}">${gpuIcon} <strong>GPU API:</strong> ${this.stats.gpuAPI.toUpperCase()}</div>
            <div><strong>Startup Time:</strong> ${this.stats.startupTime}ms</div>
            <div style="margin-top: 10px;"></div>
            <div class="${fpsClass}"><strong>FPS:</strong> ${this.stats.fps}</div>
            <div><strong>Avg FPS:</strong> ${this.stats.avgFps}</div>
            <div><strong>Min FPS:</strong> ${this.stats.minFps}</div>
            <div><strong>Max FPS:</strong> ${this.stats.maxFps}</div>
            <div style="margin-top: 10px;"></div>
            <div class="${memClass}"><strong>Memory:</strong> ${this.stats.currentMemory} MB</div>
            <div><strong>Initial Memory:</strong> ${this.stats.initialMemory} MB</div>
            <div><strong>Memory Growth:</strong> ${this.stats.currentMemory - this.stats.initialMemory} MB</div>
            <div style="margin-top: 10px;"></div>
            <div><strong>Particles:</strong> ${this.stats.particleCount}</div>
            <div><strong>Draw Calls:</strong> ${this.stats.drawCalls}</div>
            <div><strong>Frames:</strong> ${this.stats.frameCount}</div>
        `;
    }
    
    exportResults() {
        const results = {
            ...this.stats,
            logs: this.logs,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        };
        
        this.log(' Results exported to console');
        console.log('=== STRESS TEST RESULTS ===');
        console.log(JSON.stringify(results, null, 2));
        console.log('=========================');
        
        return results;
    }
}

// Global benchmark instance
let benchmark = new StressTestBenchmark();

// Framework Tests
function startTest(framework) {
    benchmark.stats.framework = framework;
    benchmark.log(` Starting ${framework} stress test...`);
    
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('stats').style.display = 'block';
    document.getElementById('console-log').style.display = 'block';
    
    // Measure startup time
    const loadStart = performance.now();
    
    switch(framework) {
        case 'vanilla':
            startVanillaTest();
            break;
        case 'pixi':
            loadPixiJS(() => startPixiTest());
            break;
        case 'three':
            loadThreeJS(() => startThreeTest());
            break;
        case 'phaser':
            loadPhaserJS(() => startPhaserTest());
            break;
        case 'kaplay':
            loadKaplayJS(() => startKaplayTest());
            break;
    }
    
    const loadEnd = performance.now();
    benchmark.stats.startupTime = Math.round(loadEnd - loadStart);
    benchmark.stats.initialMemory = benchmark.getMemoryUsage();
    
    benchmark.log(` ${framework} loaded in ${benchmark.stats.startupTime}ms`);
    benchmark.log(` Initial memory: ${benchmark.stats.initialMemory}MB`);
    
    // Export results every 10 seconds
    setInterval(() => {
        benchmark.exportResults();
    }, 10000);
}

function backToMenu() {
    location.reload();
}

// ========================================
// VANILLA CANVAS TEST
// ========================================
function startVanillaTest() {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.getElementById('game-container').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Create 1000 particles
    for (let i = 0; i < 1000; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        });
    }
    
    benchmark.stats.particleCount = particles.length;
    benchmark.log(` Created ${particles.length} particles`);
    
    function animate() {
        benchmark.updateStats();
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        benchmark.stats.drawCalls = 0;
        
        // Update and draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            
            benchmark.stats.drawCalls++;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========================================
// PIXI.JS TEST
// ========================================
function loadPixiJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.2/pixi.min.js';
    script.onload = callback;
    document.head.appendChild(script);
    benchmark.log(' Loading PixiJS from CDN...');
}

function startPixiTest() {
    const app = new PIXI.Application({
        width: 1280,
        height: 720,
        backgroundColor: 0x000000,
    });
    
    document.getElementById('game-container').appendChild(app.view);
    
    const particles = [];
    
    // Create 2000 sprites (PixiJS can handle more)
    for (let i = 0; i < 2000; i++) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(Math.random() * 0xFFFFFF);
        graphics.drawCircle(0, 0, Math.random() * 5 + 2);
        graphics.endFill();
        
        const sprite = new PIXI.Sprite(app.renderer.generateTexture(graphics));
        sprite.x = Math.random() * app.screen.width;
        sprite.y = Math.random() * app.screen.height;
        sprite.vx = (Math.random() - 0.5) * 4;
        sprite.vy = (Math.random() - 0.5) * 4;
        
        app.stage.addChild(sprite);
        particles.push(sprite);
    }
    
    benchmark.stats.particleCount = particles.length;
    benchmark.log(` Created ${particles.length} PixiJS sprites`);
    
    app.ticker.add(() => {
        benchmark.updateStats();
        benchmark.stats.drawCalls = particles.length;
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > app.screen.width) p.vx *= -1;
            if (p.y < 0 || p.y > app.screen.height) p.vy *= -1;
        });
    });
}

// ========================================
// THREE.JS TEST
// ========================================
function loadThreeJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
    benchmark.log(' Loading Three.js from CDN...');
}

function startThreeTest() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1280/720, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(1280, 720);
    document.getElementById('game-container').appendChild(renderer.domElement);
    
    camera.position.z = 50;
    
    const particles = [];
    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    
    // Create 500 3D spheres
    for (let i = 0; i < 500; i++) {
        const material = new THREE.MeshBasicMaterial({ 
            color: Math.random() * 0xFFFFFF 
        });
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.position.x = (Math.random() - 0.5) * 100;
        sphere.position.y = (Math.random() - 0.5) * 100;
        sphere.position.z = (Math.random() - 0.5) * 100;
        
        sphere.vx = (Math.random() - 0.5) * 0.5;
        sphere.vy = (Math.random() - 0.5) * 0.5;
        sphere.vz = (Math.random() - 0.5) * 0.5;
        
        scene.add(sphere);
        particles.push(sphere);
    }
    
    benchmark.stats.particleCount = particles.length;
    benchmark.log(` Created ${particles.length} 3D spheres`);
    
    function animate() {
        benchmark.updateStats();
        benchmark.stats.drawCalls = particles.length;
        
        particles.forEach(p => {
            p.position.x += p.vx;
            p.position.y += p.vy;
            p.position.z += p.vz;
            
            if (Math.abs(p.position.x) > 50) p.vx *= -1;
            if (Math.abs(p.position.y) > 50) p.vy *= -1;
            if (Math.abs(p.position.z) > 50) p.vz *= -1;
            
            p.rotation.x += 0.01;
            p.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========================================
// PHASER 3 TEST
// ========================================
function loadPhaserJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js';
    script.onload = callback;
    document.head.appendChild(script);
    benchmark.log(' Loading Phaser 3 from CDN...');
}

function loadKaplayJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/kaplay@3001.0.0/dist/kaplay.js';
    script.onload = callback;
    document.head.appendChild(script);
    benchmark.log(' Loading Kaplay from CDN...');
}

function startPhaserTest() {
    const config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: 'game-container',
        scene: {
            create: create,
            update: update
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        }
    };
    
    const game = new Phaser.Game(config);
    let particles;
    
    function create() {
        particles = this.physics.add.group();
        
        // Create 1500 physics sprites
        for (let i = 0; i < 1500; i++) {
            const x = Phaser.Math.Between(0, 1280);
            const y = Phaser.Math.Between(0, 720);
            const color = Phaser.Display.Color.RandomRGB();
            
            const graphics = this.add.graphics();
            graphics.fillStyle(color.color, 1);
            graphics.fillCircle(5, 5, 5);
            graphics.generateTexture('particle' + i, 10, 10);
            graphics.destroy();
            
            const sprite = particles.create(x, y, 'particle' + i);
            sprite.setVelocity(
                Phaser.Math.Between(-200, 200),
                Phaser.Math.Between(-200, 200)
            );
            sprite.setBounce(1);
            sprite.setCollideWorldBounds(true);
        }
        
        benchmark.stats.particleCount = particles.getChildren().length;
        benchmark.log(` Created ${benchmark.stats.particleCount} Phaser sprites`);
    }
    
    function update() {
        benchmark.updateStats();
        benchmark.stats.drawCalls = particles.getChildren().length;
    }
}

// ========================================
// KAPLAY TEST
// ========================================
function startKaplayTest() {
    const k = kaplay({
        width: 1280,
        height: 720,
        canvas: document.createElement('canvas'),
        background: [20, 20, 30]
    });
    
    document.getElementById('game-container').appendChild(k.canvas);
    
    const particles = [];
    const particleCount = 2000;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 1280;
        const y = Math.random() * 720;
        const vx = (Math.random() - 0.5) * 400;
        const vy = (Math.random() - 0.5) * 400;
        const color = k.rgb(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
        
        particles.push({
            pos: k.vec2(x, y),
            vel: k.vec2(vx, vy),
            color: color,
            radius: 5
        });
    }
    
    benchmark.stats.particleCount = particleCount;
    benchmark.log(`• Created ${particleCount} Kaplay particles`);
    
    // Game loop
    k.onUpdate(() => {
        benchmark.updateStats();
        
        // Update particles
        particles.forEach(p => {
            p.pos.x += p.vel.x * k.dt();
            p.pos.y += p.vel.y * k.dt();
            
            // Bounce off walls
            if (p.pos.x < 0 || p.pos.x > 1280) p.vel.x *= -1;
            if (p.pos.y < 0 || p.pos.y > 720) p.vel.y *= -1;
            
            // Keep in bounds
            p.pos.x = Math.max(0, Math.min(1280, p.pos.x));
            p.pos.y = Math.max(0, Math.min(720, p.pos.y));
        });
    });
    
    // Render particles
    k.onDraw(() => {
        particles.forEach(p => {
            k.drawCircle({
                pos: p.pos,
                radius: p.radius,
                color: p.color
            });
        });
        
        benchmark.stats.drawCalls = particleCount;
    });
}

// Log when page fully loaded
window.addEventListener('load', () => {
    const loadTime = Date.now() - benchmark.startTime;
    benchmark.log(` Page fully loaded in ${loadTime}ms`);
});

