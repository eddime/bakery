// 🥐 Bakery Backend Example
// Shows how to build a full-stack app with backend logic + frontend WebView

import { app, Window, resolveAssetPath } from '../../runtime/bakery-runtime.js';

console.log('🥐 Starting Bakery Full-Stack App...\n');

// 🔧 Backend: Business Logic (like Node.js, but with txiki.js)
// This runs in the backend (txiki.js runtime)

class BackendService {
    constructor() {
        this.data = {
            users: [
                { id: 1, name: 'Alice', role: 'Admin' },
                { id: 2, name: 'Bob', role: 'User' },
                { id: 3, name: 'Charlie', role: 'User' }
            ],
            stats: {
                totalRequests: 0,
                uptime: Date.now()
            }
        };
    }
    
    async getUsers() {
        this.data.stats.totalRequests++;
        console.log('📊 Backend: getUsers() called');
        return this.data.users;
    }
    
    async addUser(name, role = 'User') {
        this.data.stats.totalRequests++;
        const newUser = {
            id: this.data.users.length + 1,
            name,
            role
        };
        this.data.users.push(newUser);
        console.log(`📊 Backend: addUser('${name}', '${role}')`);
        return newUser;
    }
    
    async getStats() {
        this.data.stats.totalRequests++;
        const uptime = Math.floor((Date.now() - this.data.stats.uptime) / 1000);
        return {
            ...this.data.stats,
            uptime: `${uptime}s`,
            userCount: this.data.users.length
        };
    }
    
    async readSystemInfo() {
        // txiki.js system APIs (like Node.js os module)
        return {
            platform: tjs.system.platform,
            arch: tjs.system.arch,
            hostname: tjs.hostName(),
            cwd: tjs.cwd(),
            pid: tjs.pid,
            version: tjs.version
        };
    }
}

const backend = new BackendService();
console.log('✅ Backend service initialized\n');

// 🎨 Frontend: WebView Window
app.on('ready', () => {
        console.log('✅ App ready!\n');

        const win = new Window({
            title: '🥐 Bakery Full-Stack Demo',
            width: 900,
            height: 700,
            resizable: true,
            debug: true,
        });

        console.log('✅ Window created!\n');

        // Set icon
        const iconPath = resolveAssetPath('assets/icon.png');
        win.setIcon(iconPath);

        // 🔗 Bind backend functions to frontend (IPC)
        // Frontend can call these via window.getUsers(), window.addUser(), etc.
        win.bind('getUsers', async () => {
            const users = await backend.getUsers();
            return JSON.stringify(users);
        });
        
        win.bind('addUser', async (name, role) => {
            const user = await backend.addUser(name, role);
            return JSON.stringify(user);
        });
        
        win.bind('getStats', async () => {
            const stats = await backend.getStats();
            return JSON.stringify(stats);
        });
        
        win.bind('getSystemInfo', async () => {
            const info = await backend.readSystemInfo();
            return JSON.stringify(info);
        });
        
        console.log('✅ Backend functions bound to frontend\n');

        // Frontend HTML that calls the backend via IPC
        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery Full-Stack Demo</title>
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
            max-width: 600px;
            width: 100%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            margin: 0.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .response {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .badge {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            background: rgba(255,255,255,0.2);
            border-radius: 15px;
            font-size: 0.85rem;
            margin: 0.3rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥐 Bakery Full-Stack</h1>
        <p>Backend Server + Frontend WebView in one app!</p>
        
        <div>
            <span class="badge">✨ No Node.js</span>
            <span class="badge">🚀 txiki.js</span>
            <span class="badge">📦 3.9 MB</span>
        </div>
        
        <div style="margin-top: 2rem;">
            <button onclick="loadUsers()">Get Users</button>
            <button onclick="loadStats()">Get Stats</button>
            <button onclick="loadSystemInfo()">System Info</button>
            <button onclick="addNewUser()">Add User</button>
        </div>
        
        <div id="response" class="response" style="display: none;"></div>
    </div>
    
    <script>
        // 🔗 Frontend calls backend via IPC (not HTTP!)
        // Backend runs in txiki.js, frontend runs in WebView
        
        async function loadUsers() {
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Loading...';
            
            try {
                const result = await window.getUsers();
                const users = JSON.parse(result);
                responseDiv.textContent = 'Users:\\n' + JSON.stringify(users, null, 2);
            } catch (error) {
                responseDiv.textContent = 'Error: ' + error.message;
            }
        }
        
        async function loadStats() {
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Loading...';
            
            try {
                const result = await window.getStats();
                const stats = JSON.parse(result);
                responseDiv.textContent = 'Stats:\\n' + JSON.stringify(stats, null, 2);
            } catch (error) {
                responseDiv.textContent = 'Error: ' + error.message;
            }
        }
        
        async function loadSystemInfo() {
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Loading...';
            
            try {
                const result = await window.getSystemInfo();
                const info = JSON.parse(result);
                responseDiv.textContent = 'System Info:\\n' + JSON.stringify(info, null, 2);
            } catch (error) {
                responseDiv.textContent = 'Error: ' + error.message;
            }
        }
        
        async function addNewUser() {
            const name = prompt('Enter name:');
            if (!name) return;
            
            const role = prompt('Enter role (Admin/User):', 'User');
            
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Adding...';
            
            try {
                const result = await window.addUser(name, role);
                const user = JSON.parse(result);
                responseDiv.textContent = 'User added:\\n' + JSON.stringify(user, null, 2);
            } catch (error) {
                responseDiv.textContent = 'Error: ' + error.message;
            }
        }
        
        // Auto-load users on start
        window.addEventListener('load', () => {
            setTimeout(loadUsers, 300);
        });
    </script>
</body>
</html>
        `;

        win.setHtml(html);
        console.log('✅ HTML loaded!\n');
        console.log('🚀 Full-Stack app running!\n');
        console.log('   Backend: txiki.js (BackendService)');
        console.log('   Frontend: WebView\n');
        console.log('   IPC: Backend functions bound to window object\n');

        win.run();

        console.log('\n👋 App closed.');
        win.destroy();
    });
});

