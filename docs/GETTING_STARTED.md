# ⚡ Getting Started with Zippy

## Installation

### Prerequisites

- **Bun** >= 1.0.0
- **CMake** >= 3.20
- **C/C++ Compiler**
  - macOS: Xcode Command Line Tools
  - Linux: GCC or Clang
  - Windows: MinGW-w64 or MSVC

### Platform-Specific Dependencies

**macOS:**
```bash
brew install cmake
xcode-select --install
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt install cmake build-essential libgtk-4-dev libwebkitgtk-6.0-dev
```

**Linux (Fedora):**
```bash
sudo dnf install cmake gcc-c++ gtk4-devel webkitgtk6.0-devel
```

**Windows:**
```bash
# Install MSYS2, then in MSYS2 shell:
pacman -S mingw-w64-x86_64-cmake mingw-w64-x86_64-gcc
```

### Install Zippy

```bash
# Install Zippy CLI globally
npm install -g zippy-cli

# Or use with npx
npx zippy-cli init my-app
```

## Create Your First App

```bash
# Create new Zippy app
zippy init my-app
cd my-app

# Install dependencies
bun install

# Run in development mode
zippy dev
```

## Project Structure

```
my-app/
├── src/
│   ├── main.ts           # Main entry point
│   ├── index.html        # Frontend HTML
│   └── styles.css        # Frontend styles
├── assets/
│   └── icon.png          # App icon
├── zippy.config.ts       # Configuration
├── package.json
└── tsconfig.json
```

## Hello World

### main.ts

```typescript
import { app, Window } from 'zippy:app';

app.on('ready', () => {
    const win = new Window({
        title: 'My Zippy App',
        width: 1200,
        height: 800,
    });
    
    win.loadFile('./index.html');
    win.show();
});

app.on('window-all-closed', () => {
    app.quit();
});
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello Zippy!</h1>
    <button onclick="alert('🚀 It works!')">
        Click Me
    </button>
</body>
</html>
```

## Configuration

Edit `zippy.config.ts`:

```typescript
export default {
    app: {
        name: 'my-app',
        version: '1.0.0',
    },
    
    window: {
        title: 'My App',
        width: 1200,
        height: 800,
        resizable: true,
    },
    
    build: {
        entry: './src/main.ts',
        outDir: './dist',
        minify: true,
        
        // Build for multiple platforms
        targets: ['linux-x64', 'darwin-arm64', 'windows-x64'],
    },
};
```

## Development

```bash
# Start dev server with hot reload
zippy dev

# Open DevTools
zippy dev --devtools
```

## Building

```bash
# Build for current platform
zippy build

# Build for specific platform
zippy build --target linux-x64

# Build for all platforms
zippy build --all

# Clean build
zippy build --clean --all
```

## Running Your App

```bash
# Development
zippy dev

# Production binary
./dist/my-app
```

## Communication: Frontend ↔ Backend

### Backend (main.ts)

```typescript
import { app, ipc } from 'zippy:app';

// Handle IPC messages
ipc.handle('get-data', async () => {
    return { message: 'Hello from backend!' };
});

ipc.handle('save-file', async (data) => {
    await fs.writeFile('file.txt', data);
    return { success: true };
});
```

### Frontend (HTML)

```html
<script>
// Call backend function
const data = await zippy.invoke('get-data');
console.log(data.message);

// Send data to backend
await zippy.invoke('save-file', 'Hello World!');
</script>
```

## Next Steps

- Read the [API Documentation](./API.md)
- Check out [Examples](../examples/)
- Learn about [Performance Optimization](./PERFORMANCE.md)
- Understand the [Architecture](./ARCHITECTURE.md)

## Common Issues

### WebView not found (Linux)

```bash
# Install WebKitGTK
sudo apt install libwebkitgtk-6.0-4
```

### Build fails on Windows

Make sure you're using MSYS2 MinGW64 shell, not regular CMD/PowerShell.

### App crashes on startup

Check the logs:
```bash
zippy dev --verbose
```

## Getting Help

- 📖 [Documentation](https://zippy.dev/docs)
- 💬 [Discord](https://discord.gg/zippy)
- 🐛 [GitHub Issues](https://github.com/zippy/zippy/issues)
- 🐦 [Twitter](https://twitter.com/zippydev)

---

Happy coding with Zippy! ⚡

