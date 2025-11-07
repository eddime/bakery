# 🥐 Bakery

**Blazing fast desktop framework - 1.5 MB, Node.js APIs, Cross-platform**

Bakery is a modern desktop application framework powered by Socket Runtime. Build native apps with HTML, CSS, and JavaScript - with direct access to Node.js APIs!

---

## ✨ Features

- ✅ **Tiny Binary** - Only 1.5 MB (133x smaller than Electron!)
- ✅ **Node.js APIs** - Direct access to `fs`, `path`, `os`, `process` in frontend
- ✅ **Hot Reload** - Instant feedback during development
- ✅ **Cross-Platform** - Build for macOS, Windows, and Linux from any OS
- ✅ **Modern JavaScript** - ES2020+ support with `import`/`export`
- ✅ **No Backend Needed** - Frontend can use Node.js APIs directly!

---

## 🚀 Quick Start

### Install

Bakery requires [Socket Runtime](https://socketsupply.co/) to be installed:

```bash
npm install -g @socketsupply/socket @socketsupply/socket-darwin-x64
```

Then install Bakery CLI:

```bash
cd /Users/eddi/Desktop/miniframework
bun link
```

### Create Your First App

```bash
# Create new project
bake init my-app

# Start development
cd my-app
bake dev

# Build for production
bake build --mac
```

---

## 📖 Usage

### Development

```bash
bake dev                    # Start dev server with hot reload
```

### Building

```bash
bake build --mac            # Build for macOS
bake build --win            # Build for Windows
bake build --linux          # Build for Linux
bake build --platform all   # Build for all platforms
bake build --mac --run      # Build and run
```

---

## 💻 Example App

```html
<!-- src/index.html -->
<!doctype html>
<html>
  <head>
    <title>My Bakery App</title>
  </head>
  <body>
    <h1>Hello from Bakery! 🥐</h1>
    <button onclick="showFiles()">Show Files</button>
    <div id="output"></div>

    <script type="module">
      // Direct Node.js API access!
      import fs from 'socket:fs/promises';
      import path from 'socket:path';
      import os from 'socket:os';

      window.showFiles = async () => {
        const files = await fs.readdir('.');
        const output = document.getElementById('output');
        
        output.innerHTML = `
          <h2>System Info</h2>
          <p>Platform: ${os.platform()}</p>
          <p>Architecture: ${os.arch()}</p>
          
          <h2>Files in current directory:</h2>
          <ul>
            ${files.map(f => `<li>${f}</li>`).join('')}
          </ul>
        `;
      };
    </script>
  </body>
</html>
```

---

## 🎯 Why Bakery?

| Framework | Binary Size | Node.js APIs | Hot Reload | Cross-Platform |
|-----------|-------------|--------------|------------|----------------|
| **Bakery** | **1.5 MB** ✅ | **✅ Direct!** | ✅ | ✅ |
| Electron | 200 MB | ✅ Via IPC | ✅ | ✅ |
| Tauri | 5 MB | ⚠️ Via Rust | ✅ | ✅ |
| Neutralino | 3 MB | ⚠️ Limited | ✅ | ✅ |

**Bakery is 133x smaller than Electron!** 🎉

---

## 📂 Project Structure

```
my-app/
├── socket.ini          # Bakery configuration
├── src/
│   └── index.html      # Your app entry point
├── build/              # Build output (auto-generated)
│   ├── mac/
│   ├── win/
│   └── linux/
└── .gitignore
```

---

## 🔧 Configuration

Edit `socket.ini` to configure your app:

```ini
[build]
name = "my-app"
copy = "src"

[meta]
title = "My App"
version = 1.0.0
bundle_identifier = "com.myapp"

[window]
width = 800
height = 600
```

See [Socket Runtime docs](https://socketsupply.co/guides/) for all options.

---

## 📚 API Reference

Bakery apps have direct access to Socket Runtime's Node.js-compatible APIs:

### File System
```javascript
import fs from 'socket:fs/promises';

const data = await fs.readFile('file.txt', 'utf8');
await fs.writeFile('output.txt', data);
```

### Path
```javascript
import path from 'socket:path';

const fullPath = path.join(__dirname, 'file.txt');
const ext = path.extname('file.txt'); // '.txt'
```

### OS
```javascript
import os from 'socket:os';

console.log(os.platform()); // 'darwin', 'win32', 'linux'
console.log(os.arch());     // 'x64', 'arm64'
console.log(os.cpus());     // CPU info
```

### Process
```javascript
import process from 'socket:process';

console.log(process.platform); // 'darwin'
console.log(process.arch);     // 'x64'
console.log(process.cwd);      // Current directory
console.log(process.pid);      // Process ID
```

---

## 🎨 Examples

Check out the `examples/` directory:

- `hello-world-socket/` - Basic Bakery app
- More coming soon!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🙏 Credits

- Powered by [Socket Runtime](https://socketsupply.co/)
- Inspired by Electron, Tauri, and Neutralino

---

**Built with ❤️ by the Bakery Team**

🥐 **Happy Baking!**
