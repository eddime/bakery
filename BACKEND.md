# 🔧 Bakery Backend Development

## Ja! Du kannst ein Backend in deine Bakery App einbauen!

**Wichtig:** Nicht mit Node.js-Code, sondern mit **txiki.js-Code** (sehr ähnlich zu Node.js)

## ✅ Was ist möglich?

### 1. Backend Logic (wie Node.js)

```javascript
// Backend Service in txiki.js
class BackendService {
    constructor() {
        this.data = [];
    }
    
    async getUsers() {
        // Database queries, API calls, business logic, etc.
        return this.data;
    }
    
    async addUser(name) {
        const user = { id: Date.now(), name };
        this.data.push(user);
        return user;
    }
}

const backend = new BackendService();
```

### 2. File System Access (wie Node.js fs)

```javascript
// Read files
const content = await tjs.readFile('data.json');
const text = new TextDecoder().decode(content);
const data = JSON.parse(text);

// Write files
const json = JSON.stringify(data);
const bytes = new TextEncoder().encode(json);
await tjs.writeFile('data.json', bytes);

// Directory operations
await tjs.makeDir('uploads');
const files = await tjs.readDir('uploads');
```

### 3. System APIs (wie Node.js os)

```javascript
// System information
const platform = tjs.system.platform;  // 'darwin', 'linux', 'windows'
const arch = tjs.system.arch;          // 'x86_64', 'aarch64'
const hostname = tjs.hostName();
const cwd = tjs.cwd();
const home = tjs.homeDir();
```

### 4. TCP Sockets (wie Node.js net)

```javascript
// TCP Server
const server = await tjs.listen('tcp', '127.0.0.1', 8765);
console.log('Server listening on 127.0.0.1:8765');

while (true) {
    const client = await server.accept();
    // Handle client connection
}

// TCP Client
const conn = await tjs.connect('tcp', 'example.com', 80);
await conn.write('GET / HTTP/1.1\r\n\r\n');
const response = await conn.read();
```

### 5. Process Management (wie Node.js child_process)

```javascript
// Spawn process
const proc = await tjs.spawn(['ls', '-la']);
const output = await proc.wait();
console.log(output.stdout);

// Execute command
const result = await tjs.exec(['git', 'status']);
console.log(result.stdout);
```

## 🔗 Frontend ↔ Backend Communication

### Option 1: IPC via webview_bind (Empfohlen)

```javascript
// Backend (txiki.js)
import { app, Window } from './runtime/bakery-runtime.js';

const backend = new BackendService();

app.on('ready', () => {
    const win = new Window({ title: 'My App' });
    
    // Bind backend functions to frontend
    win.bind('getUsers', async () => {
        const users = await backend.getUsers();
        return JSON.stringify(users);
    });
    
    win.bind('addUser', async (name) => {
        const user = await backend.addUser(name);
        return JSON.stringify(user);
    });
    
    win.setHtml(html);
    win.run();
});
```

```html
<!-- Frontend (WebView) -->
<script>
    // Call backend functions directly
    async function loadUsers() {
        const result = await window.getUsers();
        const users = JSON.parse(result);
        console.log(users);
    }
    
    async function addUser(name) {
        const result = await window.addUser(name);
        const user = JSON.parse(result);
        console.log(user);
    }
</script>
```

**Vorteile:**
- ✅ Schnell (kein HTTP overhead)
- ✅ Typsicher
- ✅ Kein localhost Port nötig
- ✅ Direkte JavaScript-zu-JavaScript Kommunikation

### Option 2: HTTP Server (für REST APIs)

txiki.js unterstützt TCP sockets, aber kein built-in HTTP server. Du kannst einen bauen:

```javascript
// Simple HTTP server (pseudo-code)
const server = await tjs.listen('tcp', '127.0.0.1', 8765);

while (true) {
    const client = await server.accept();
    const request = await client.read();
    
    // Parse HTTP request
    const [method, url] = parseRequest(request);
    
    // Handle route
    if (url === '/api/users') {
        const users = await backend.getUsers();
        const response = createHttpResponse(200, JSON.stringify(users));
        await client.write(response);
    }
    
    await client.close();
}
```

**Empfehlung:** Verwende IPC (Option 1) - schneller und einfacher!

## 📦 Was läuft wo?

```
┌─────────────────────────────────────┐
│  Bakery App (.app Bundle)           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Backend (txiki.js Runtime)    │ │
│  │                               │ │
│  │  • Business Logic            │ │
│  │  • File System               │ │
│  │  • Database Access           │ │
│  │  • API Calls                 │ │
│  │  • System APIs               │ │
│  └───────────────────────────────┘ │
│              ↕ IPC                  │
│  ┌───────────────────────────────┐ │
│  │ Frontend (WebView/WebKit)     │ │
│  │                               │ │
│  │  • HTML/CSS/JS               │ │
│  │  • UI Rendering              │ │
│  │  • User Interaction          │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
     ↓ Compiled to Single Binary
     ↓ No Node.js required!
```

## 🎯 End-User Experience

**Was der User installiert:**
- Nur die `.app` Datei (3.9 MB)

**Was der User NICHT braucht:**
- ❌ Node.js
- ❌ Python
- ❌ Java
- ❌ Irgendwelche Server oder Datenbanken

**Alles läuft embedded im Binary!**

## 🚀 Beispiel: Full-Stack Todo App

```javascript
// Backend
class TodoBackend {
    constructor() {
        this.todos = [];
    }
    
    async getTodos() {
        return this.todos;
    }
    
    async addTodo(text) {
        const todo = { id: Date.now(), text, done: false };
        this.todos.push(todo);
        await this.saveToDisk();
        return todo;
    }
    
    async toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        await this.saveToDisk();
        return todo;
    }
    
    async saveToDisk() {
        const json = JSON.stringify(this.todos);
        const bytes = new TextEncoder().encode(json);
        await tjs.writeFile('todos.json', bytes);
    }
    
    async loadFromDisk() {
        try {
            const content = await tjs.readFile('todos.json');
            const text = new TextDecoder().decode(content);
            this.todos = JSON.parse(text);
        } catch (e) {
            this.todos = [];
        }
    }
}

const backend = new TodoBackend();
await backend.loadFromDisk();

// Frontend binding
app.on('ready', () => {
    const win = new Window({ title: 'Todo App' });
    
    win.bind('getTodos', async () => {
        return JSON.stringify(await backend.getTodos());
    });
    
    win.bind('addTodo', async (text) => {
        return JSON.stringify(await backend.addTodo(text));
    });
    
    win.bind('toggleTodo', async (id) => {
        return JSON.stringify(await backend.toggleTodo(id));
    });
    
    win.setHtml(todoAppHTML);
    win.run();
});
```

**Result:**
- ✅ Full-Stack App in 3.9 MB
- ✅ Persistent storage (file system)
- ✅ No Node.js required
- ✅ Native performance
- ✅ Single binary!

## 📚 txiki.js vs Node.js API Mapping

| Node.js | txiki.js | Notes |
|---------|----------|-------|
| `fs.readFile()` | `tjs.readFile()` | Returns Uint8Array |
| `fs.writeFile()` | `tjs.writeFile()` | Accepts Uint8Array |
| `fs.mkdir()` | `tjs.makeDir()` | - |
| `fs.readdir()` | `tjs.readDir()` | - |
| `fs.stat()` | `tjs.stat()` | - |
| `os.platform()` | `tjs.system.platform` | - |
| `os.arch()` | `tjs.system.arch` | - |
| `os.hostname()` | `tjs.hostName()` | - |
| `process.cwd()` | `tjs.cwd()` | - |
| `process.pid` | `tjs.pid` | - |
| `process.env` | `tjs.env` | - |
| `child_process.spawn()` | `tjs.spawn()` | - |
| `child_process.exec()` | `tjs.exec()` | - |
| `net.createServer()` | `tjs.listen()` | TCP only |
| `net.connect()` | `tjs.connect()` | TCP only |

## ⚠️ Wichtige Unterschiede zu Node.js

### 1. ES Modules only (kein CommonJS)
```javascript
// ✅ Good (ES Modules)
import { app } from './runtime/bakery-runtime.js';

// ❌ Bad (CommonJS - nicht unterstützt)
const { app } = require('./runtime/bakery-runtime.js');
```

### 2. Uint8Array statt Buffer
```javascript
// ✅ Good
const bytes = new TextEncoder().encode('Hello');
await tjs.writeFile('file.txt', bytes);

// ❌ Bad (Buffer ist Node.js-spezifisch)
const buf = Buffer.from('Hello');
await tjs.writeFile('file.txt', buf);
```

### 3. Async/Await everywhere
```javascript
// ✅ Good (async/await)
const content = await tjs.readFile('file.txt');

// ❌ Bad (callbacks - nicht unterstützt)
tjs.readFile('file.txt', (err, data) => { ... });
```

### 4. Kein npm mit Node.js Dependencies
```javascript
// ❌ Bad (Node.js-specific packages)
import express from 'express';  // Funktioniert nicht

// ✅ Good (Browser-compatible packages)
import dayjs from 'dayjs';  // Funktioniert!
```

## 💡 Best Practices

1. **Use IPC over HTTP** - Schneller und einfacher
2. **Keep backend logic simple** - txiki.js ist minimal
3. **Use file system for persistence** - Einfach und zuverlässig
4. **Avoid Node.js-specific packages** - Use browser-compatible libs
5. **Test with `bake dev`** - Bun unterstützt mehr, txiki.js weniger

## 🎓 Summary

**Ja, du kannst ein Backend bauen!**
- ✅ Backend Logic (Business Logic, Data Processing)
- ✅ File System (Persistent Storage)
- ✅ System APIs (Platform Info, Process Management)
- ✅ TCP Sockets (Custom Protocols)
- ✅ IPC (Frontend ↔ Backend Communication)

**Aber:**
- ❌ Kein Node.js (use txiki.js APIs)
- ❌ Kein CommonJS (use ES Modules)
- ❌ Kein Buffer (use Uint8Array)
- ❌ Kein npm Node.js packages (use browser-compatible)

**Result:**
- 🎯 Full-Stack Desktop App
- 📦 3.9 MB Single Binary
- 🚀 Native Performance
- ✨ No Node.js for end-users!

