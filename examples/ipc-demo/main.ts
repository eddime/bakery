// 🥐 Bakery IPC Demo
// Shows Frontend ↔ Backend Communication via win.bind()

import { app, Window } from "../../lib/bakery.ts";

console.log('🥐 Starting Bakery IPC Demo...\n');

// 🔧 Backend: Business Logic
class BackendService {
    private users = [
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob', role: 'User' },
        { id: 3, name: 'Charlie', role: 'User' }
    ];
    private requestCount = 0;

    async getUsers() {
        this.requestCount++;
        console.log(`📊 Backend: getUsers() called (request #${this.requestCount})`);
        
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return this.users;
    }

    async addUser(name: string, role: string = 'User') {
        this.requestCount++;
        console.log(`📊 Backend: addUser('${name}', '${role}') (request #${this.requestCount})`);
        
        const newUser = {
            id: this.users.length + 1,
            name,
            role
        };
        
        this.users.push(newUser);
        
        return newUser;
    }

    async deleteUser(id: number) {
        this.requestCount++;
        console.log(`📊 Backend: deleteUser(${id}) (request #${this.requestCount})`);
        
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            const deleted = this.users.splice(index, 1)[0];
            return { success: true, user: deleted };
        }
        
        return { success: false, error: 'User not found' };
    }

    async getStats() {
        this.requestCount++;
        console.log(`📊 Backend: getStats() (request #${this.requestCount})`);
        
        return {
            totalUsers: this.users.length,
            totalRequests: this.requestCount,
            platform: process.platform,
            arch: process.arch
        };
    }
}

const backend = new BackendService();

console.log('✅ Backend service initialized\n');

// 🎨 Frontend: WebView Window
app.on('ready', () => {
    console.log('✅ App ready!\n');

    const win = new Window({
        title: '🥐 Bakery IPC Demo',
        width: 900,
        height: 700,
        resizable: true,
        debug: true,
    });

    console.log('✅ Window created!\n');

    // 🔗 Bind backend functions to frontend
    console.log('🔗 Binding backend functions...\n');

    win.bind('getUsers', async () => {
        return await backend.getUsers();
    });

    win.bind('addUser', async (name: string, role: string) => {
        return await backend.addUser(name, role);
    });

    win.bind('deleteUser', async (id: number) => {
        return await backend.deleteUser(id);
    });

    win.bind('getStats', async () => {
        return await backend.getStats();
    });

    console.log('✅ Backend functions bound!\n');

    // Frontend HTML with IPC calls
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery IPC Demo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .subtitle { font-size: 1.2rem; opacity: 0.9; margin-bottom: 2rem; }
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
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            margin: 0.5rem;
            transition: transform 0.2s;
        }
        button:hover { transform: translateY(-2px); }
        button:active { transform: translateY(0); }
        .user-item {
            padding: 1rem;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user-info { flex: 1; }
        .user-name { font-weight: 600; font-size: 1.1rem; }
        .user-role {
            font-size: 0.85rem;
            padding: 0.2rem 0.6rem;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            margin-top: 0.3rem;
            display: inline-block;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        .stat-item {
            padding: 1rem;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
        }
        .stat-label { font-size: 0.85rem; opacity: 0.8; }
        .stat-value { font-size: 1.5rem; font-weight: 700; margin-top: 0.3rem; }
        input {
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            margin: 0.5rem;
            width: 200px;
        }
        #loading { display: none; opacity: 0.6; }
        .loading #loading { display: inline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥐 Bakery IPC Demo</h1>
        <div class="subtitle">Frontend ↔ Backend Communication</div>
        
        <div>
            <span class="badge">🔗 win.bind()</span>
            <span class="badge">⚡ Async</span>
            <span class="badge">📡 IPC</span>
        </div>
        
        <div class="section">
            <h2>📊 Stats</h2>
            <div class="stats" id="stats">
                <div class="stat-item">
                    <div class="stat-label">Users</div>
                    <div class="stat-value" id="userCount">-</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Requests</div>
                    <div class="stat-value" id="requestCount">-</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Platform</div>
                    <div class="stat-value" id="platform">-</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Architecture</div>
                    <div class="stat-value" id="arch">-</div>
                </div>
            </div>
            <button onclick="loadStats()">🔄 Refresh Stats</button>
        </div>
        
        <div class="section">
            <h2>👥 Users</h2>
            <div id="userList"></div>
            <div>
                <input type="text" id="userName" placeholder="Name" />
                <input type="text" id="userRole" placeholder="Role (User/Admin)" value="User" />
                <button onclick="addNewUser()">➕ Add User</button>
            </div>
        </div>
        
        <div id="loading">⏳ Loading...</div>
    </div>
    
    <script>
        // 🔗 Frontend calls backend via IPC
        
        async function loadUsers() {
            document.body.classList.add('loading');
            try {
                const users = await window.getUsers();
                const userList = document.getElementById('userList');
                userList.innerHTML = users.map(user => \`
                    <div class="user-item">
                        <div class="user-info">
                            <div class="user-name">\${user.name}</div>
                            <span class="user-role">\${user.role}</span>
                        </div>
                        <button onclick="deleteUser(\${user.id})">🗑️</button>
                    </div>
                \`).join('');
                
                console.log('✅ Users loaded:', users);
            } catch (error) {
                console.error('❌ Error loading users:', error);
                alert('Error: ' + error.message);
            } finally {
                document.body.classList.remove('loading');
            }
        }
        
        async function loadStats() {
            document.body.classList.add('loading');
            try {
                const stats = await window.getStats();
                document.getElementById('userCount').textContent = stats.totalUsers;
                document.getElementById('requestCount').textContent = stats.totalRequests;
                document.getElementById('platform').textContent = stats.platform;
                document.getElementById('arch').textContent = stats.arch;
                
                console.log('✅ Stats loaded:', stats);
            } catch (error) {
                console.error('❌ Error loading stats:', error);
            } finally {
                document.body.classList.remove('loading');
            }
        }
        
        async function addNewUser() {
            const name = document.getElementById('userName').value;
            const role = document.getElementById('userRole').value || 'User';
            
            if (!name) {
                alert('Please enter a name');
                return;
            }
            
            document.body.classList.add('loading');
            try {
                const newUser = await window.addUser(name, role);
                console.log('✅ User added:', newUser);
                
                document.getElementById('userName').value = '';
                document.getElementById('userRole').value = 'User';
                
                await loadUsers();
                await loadStats();
            } catch (error) {
                console.error('❌ Error adding user:', error);
                alert('Error: ' + error.message);
            } finally {
                document.body.classList.remove('loading');
            }
        }
        
        async function deleteUser(id) {
            if (!confirm('Delete this user?')) return;
            
            document.body.classList.add('loading');
            try {
                const result = await window.deleteUser(id);
                if (result.success) {
                    console.log('✅ User deleted:', result.user);
                    await loadUsers();
                    await loadStats();
                } else {
                    alert('Error: ' + result.error);
                }
            } catch (error) {
                console.error('❌ Error deleting user:', error);
                alert('Error: ' + error.message);
            } finally {
                document.body.classList.remove('loading');
            }
        }
        
        // Auto-load on start
        window.addEventListener('load', async () => {
            console.log('🚀 Frontend started!');
            await loadUsers();
            await loadStats();
        });
    </script>
</body>
</html>
    `;

    win.setHTML(html);
    console.log('✅ HTML loaded!\n');
    console.log('🚀 IPC Demo running!\n');

    win.run();

    console.log('\n👋 App closed.');
    win.destroy();
});

