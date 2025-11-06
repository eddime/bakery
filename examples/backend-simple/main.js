// 🥐 Bakery Backend Simple Example
// Shows backend logic running in txiki.js (no Node.js needed!)

import { app, Window, resolveAssetPath } from '../../runtime/bakery-runtime.js';

console.log('🥐 Starting Bakery Backend Demo...\n');

// 🔧 Backend: Business Logic (runs in txiki.js, embedded!)
class BackendService {
    constructor() {
        this.users = [
            { id: 1, name: 'Alice', role: 'Admin' },
            { id: 2, name: 'Bob', role: 'User' },
            { id: 3, name: 'Charlie', role: 'User' }
        ];
        this.requestCount = 0;
        this.startTime = Date.now();
        
        console.log('✅ Backend service initialized');
        console.log(`   Users: ${this.users.length}`);
        console.log(`   Platform: ${tjs.system.platform}`);
        console.log(`   Arch: ${tjs.system.arch}\n`);
    }
    
    getUsers() {
        this.requestCount++;
        console.log(`📊 Backend: getUsers() called (request #${this.requestCount})`);
        return this.users;
    }
    
    addUser(name, role = 'User') {
        this.requestCount++;
        const newUser = {
            id: this.users.length + 1,
            name,
            role
        };
        this.users.push(newUser);
        console.log(`📊 Backend: addUser('${name}', '${role}') (request #${this.requestCount})`);
        return newUser;
    }
    
    getStats() {
        this.requestCount++;
        const stats = {
            totalRequests: this.requestCount,
            uptime: `${(Date.now() - this.startTime) / 1000}s`,
            userCount: this.users.length,
            platform: tjs.system.platform,
            arch: tjs.system.arch,
            hostname: tjs.hostName(),
            pid: tjs.pid
        };
        console.log(`📊 Backend: getStats() (request #${this.requestCount})`);
        return stats;
    }
}

const backend = new BackendService();

// Demo: Show backend working
console.log('🔧 Backend Demo:\n');

// Get users
const users = backend.getUsers();
console.log('   Users:', users.map(u => u.name).join(', '));

// Add user
const newUser = backend.addUser('David', 'User');
console.log('   Added:', newUser.name);

console.log('\n');

// 🎨 Frontend: WebView Window
app.on('ready', () => {
    console.log('✅ App ready!\n');

    const win = new Window({
        title: '🥐 Bakery Backend Demo',
        width: 900,
        height: 700,
        resizable: true,
        debug: true,
    });

    console.log('✅ Window created!\n');

    // Set icon
    const iconPath = resolveAssetPath('assets/icon.png');
    win.setIcon(iconPath);

    // Frontend HTML
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery Backend Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                         Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
        }
        
        .container {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 3rem;
            max-width: 700px;
            width: 100%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .badge {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            background: rgba(255,255,255,0.2);
            border-radius: 15px;
            font-size: 0.85rem;
            margin: 0.3rem;
        }
        
        .section {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
        }
        
        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #fff;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.8rem;
            font-size: 0.95rem;
        }
        
        .info-label {
            font-weight: 600;
            opacity: 0.8;
        }
        
        .info-value {
            font-family: 'Monaco', 'Courier New', monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 5px;
        }
        
        .user-list {
            list-style: none;
            margin-top: 1rem;
        }
        
        .user-item {
            padding: 0.8rem;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .user-name {
            font-weight: 600;
        }
        
        .user-role {
            font-size: 0.85rem;
            padding: 0.2rem 0.6rem;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
        }
        
        .highlight {
            color: #FFD700;
            font-weight: 700;
        }
        
        .check {
            color: #00ff88;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥐 Bakery Backend Demo</h1>
        <div class="subtitle">Backend läuft in txiki.js - <span class="highlight">KEIN Node.js nötig!</span></div>
        
        <div>
            <span class="badge">✨ No Node.js</span>
            <span class="badge">🚀 txiki.js</span>
            <span class="badge">📦 3.9 MB</span>
            <span class="badge">🔧 Backend Included</span>
        </div>
        
        <div class="section">
            <h2>🔧 Backend Features</h2>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.5rem 0;"><span class="check">✓</span> Business Logic (BackendService class)</li>
                <li style="padding: 0.5rem 0;"><span class="check">✓</span> Data Management (in-memory storage)</li>
                <li style="padding: 0.5rem 0;"><span class="check">✓</span> System APIs (platform, arch, hostname)</li>
                <li style="padding: 0.5rem 0;"><span class="check">✓</span> Statistics Tracking</li>
                <li style="padding: 0.5rem 0;"><span class="check">✓</span> Embedded in Binary (~1.5 MB)</li>
            </ul>
        </div>
        
        <div class="section">
            <h2>📊 Backend Data</h2>
            <div class="info-grid">
                <span class="info-label">Users:</span>
                <span class="info-value">${backend.users.length}</span>
                
                <span class="info-label">Requests:</span>
                <span class="info-value">${backend.requestCount}</span>
                
                <span class="info-label">Platform:</span>
                <span class="info-value">${tjs.system.platform}</span>
                
                <span class="info-label">Architecture:</span>
                <span class="info-value">${tjs.system.arch}</span>
                
                <span class="info-label">Hostname:</span>
                <span class="info-value">${tjs.hostName()}</span>
                
                <span class="info-label">Process ID:</span>
                <span class="info-value">${tjs.pid}</span>
            </div>
        </div>
        
        <div class="section">
            <h2>👥 Users (from Backend)</h2>
            <ul class="user-list">
                ${backend.users.map(user => `
                    <li class="user-item">
                        <span class="user-name">${user.name}</span>
                        <span class="user-role">${user.role}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="section" style="text-align: center; background: rgba(0,255,136,0.1);">
            <h2>🎯 Was bedeutet das?</h2>
            <p style="margin-top: 1rem; line-height: 1.6;">
                Dieser <span class="highlight">Backend-Code läuft in txiki.js</span>, 
                nicht in Node.js!<br><br>
                
                Der End-User muss <span class="highlight">NICHTS installieren</span> - 
                kein Node.js, kein npm, nichts!<br><br>
                
                Alles ist <span class="highlight">embedded im Binary</span> (3.9 MB total).<br><br>
                
                <span class="check">✓</span> Full-Stack Desktop App ohne Dependencies!
            </p>
        </div>
    </div>
    
    <script>
        console.log('🎨 Frontend started!');
        console.log('Backend data loaded from txiki.js runtime');
    </script>
</body>
</html>
    `;

    win.setHtml(html);
    console.log('✅ HTML loaded!\n');
    console.log('🚀 Full-Stack app running!\n');
    console.log('   Backend: txiki.js (BackendService)');
    console.log('   Frontend: WebView');
    console.log('   Total Size: ~3.9 MB\n');

    win.run();

    console.log('\n👋 App closed.');
    win.destroy();
});

