// 🥐 Bakery Backend (txiki.js)
// Simple HTTP server using tjs.listen (TCP)

const PORT = 3000;

// Parse HTTP request
function parseRequest(data) {
  const lines = data.split('\r\n');
  const [method, path] = lines[0].split(' ');
  return { method, path };
}

// Create HTTP response
function createResponse(statusCode, headers, body) {
  const statusText = statusCode === 200 ? 'OK' : statusCode === 404 ? 'Not Found' : 'Error';
  let response = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  
  for (const [key, value] of Object.entries(headers)) {
    response += `${key}: ${value}\r\n`;
  }
  
  response += `\r\n${body}`;
  return response;
}

// Handle HTTP request
async function handleRequest(path) {
  // API endpoint
  if (path === '/api/info') {
    const body = JSON.stringify({
      message: 'Bakery Backend Running!',
      runtime: 'txiki.js ' + tjs.version,
      platform: tjs.system.platform,
      pid: tjs.pid,
    });
    
    return createResponse(200, {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Access-Control-Allow-Origin': '*'
    }, body);
  }
  
  // Serve static files from src/
  const srcDir = tjs.cwd() + '/src';
  const filePath = path === '/' ? '/index.html' : path;
  const fullPath = srcDir + filePath;
  
  try {
    const content = await tjs.readFile(fullPath);
    const ext = filePath.split('.').pop();
    
    const contentTypes = {
      'html': 'text/html',
      'js': 'application/javascript',
      'css': 'text/css',
      'json': 'application/json',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'svg': 'image/svg+xml'
    };
    
    return createResponse(200, {
      'Content-Type': contentTypes[ext] || 'text/plain',
      'Content-Length': content.byteLength
    }, new TextDecoder().decode(content));
  } catch (e) {
    const body = 'Not Found: ' + path;
    return createResponse(404, {
      'Content-Type': 'text/plain',
      'Content-Length': body.length
    }, body);
  }
}

// Create TCP server
const server = await tjs.listen({ host: '127.0.0.1', port: PORT });
console.log(`🥐 Bakery Backend (txiki.js) listening on http://localhost:${PORT}`);

// Accept connections
(async () => {
  while (true) {
    const conn = await server.accept();
    
    // Handle connection in background
    (async () => {
      try {
        const buffer = new Uint8Array(8192);
        const nread = await conn.read(buffer);
        
        if (nread > 0) {
          const request = new TextDecoder().decode(buffer.subarray(0, nread));
          const { method, path } = parseRequest(request);
          
          console.log(`${method} ${path}`);
          
          const response = await handleRequest(path);
          await conn.write(new TextEncoder().encode(response));
        }
      } catch (e) {
        console.error('Connection error:', e);
      } finally {
        conn.close();
      }
    })();
  }
})();
