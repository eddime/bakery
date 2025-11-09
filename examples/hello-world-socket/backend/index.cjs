// 🥐 Bakery Backend (Node.js)
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('Request:', req.url);
  
  // API endpoint
  if (req.url === '/api/info') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      message: 'Bakery Backend Running!',
      nodejs: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd()
    }));
    return;
  }
  
  // Serve static files from src/
  // In production: backend/ and src/ are both in Resources/
  const srcDir = path.join(__dirname, '..', 'src');
  let filePath = path.join(srcDir, req.url === '/' ? 'index.html' : req.url);
  
  // Security: prevent directory traversal
  const resolvedPath = path.resolve(filePath);
  const resolvedSrcDir = path.resolve(srcDir);
  if (!resolvedPath.startsWith(resolvedSrcDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // Determine content type
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    
    const contentType = contentTypes[ext] || 'text/plain';
    const content = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } else {
    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + req.url);
  }
});

server.listen(3000, () => {
  console.log('🥐 Bakery Backend listening on http://localhost:3000');
});
