// 🥐 Bakery Dev Server
// WebSocket server for hot reload without restarting the window

import { watch } from 'fs';

export class DevServer {
  private watcher: any = null;
  private clients: Set<any> = new Set();
  private server: any = null;

  constructor(private watchPaths: string[]) {}

  async start(port: number = 35729) {
    // Create WebSocket server for hot reload
    this.server = Bun.serve({
      port,
      fetch: this.handleRequest.bind(this),
      websocket: {
        open: (ws: any) => {
          this.clients.add(ws);
          console.log('🔌 Hot reload client connected');
        },
        close: (ws: any) => {
          this.clients.delete(ws);
          console.log('🔌 Hot reload client disconnected');
        },
        message: () => {},
      },
    });

    console.log(`🔥 Hot reload server running on ws://localhost:${port}`);

    // Watch for file changes
    this.startWatching();
  }

  private handleRequest(req: Request, server: any) {
    const url = new URL(req.url);
    
    // Upgrade to WebSocket
    if (url.pathname === '/hot-reload') {
      const upgraded = server.upgrade(req);
      if (!upgraded) {
        return new Response('Upgrade failed', { status: 500 });
      }
      return undefined;
    }

    return new Response('Bakery Dev Server', { status: 200 });
  }

  private startWatching() {
    for (const path of this.watchPaths) {
      const watcher = watch(path, { recursive: true }, (event, filename) => {
        if (!filename) return;
        
        // Watch relevant files
        if (
          filename.endsWith('.ts') ||
          filename.endsWith('.js') ||
          filename.endsWith('.html') ||
          filename.endsWith('.css')
        ) {
          console.log(`\n📝 Changed: ${filename}`);
          // Small delay to ensure file is written
          setTimeout(() => {
            this.notifyClients({ type: 'reload', file: filename });
          }, 50);
        }
      });
      
      if (!this.watcher) {
        this.watcher = watcher;
      }
    }
  }

  private notifyClients(data: any) {
    const message = JSON.stringify(data);
    this.clients.forEach(client => {
      try {
        client.send(message);
      } catch (err) {
        console.error('Failed to send to client:', err);
      }
    });
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
    if (this.server) {
      this.server.stop();
    }
    this.clients.clear();
  }
}

