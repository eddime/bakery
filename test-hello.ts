// 🥐 Bakery - First Hello World Test!

import { app, Window } from "./lib/bakery.ts";

console.log("🥐 Starting Bakery Hello World...\n");

app.on("ready", () => {
  console.log("✅ App ready!\n");

  const win = new Window({
    title: "🥐 Bakery - Hello World",
    width: 800,
    height: 600,
    resizable: true,
    debug: true,
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery Hello World</title>
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
            text-align: center;
        }
        
        .container {
            padding: 2rem;
        }
        
        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: fadeInUp 0.6s ease-out;
        }
        
        p {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
        }
        
        .features {
            display: flex;
            gap: 2rem;
            margin-top: 3rem;
            justify-content: center;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }
        
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            min-width: 150px;
            transition: transform 0.3s, background 0.3s;
        }
        
        .feature:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
        }
        
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .feature-text {
            font-size: 0.9rem;
        }
        
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: fadeInUp 0.6s ease-out 0.6s backwards;
        }
        
        button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        button:active {
            transform: scale(0.95);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .status {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 0.5rem;
            font-size: 0.9rem;
            animation: fadeInUp 0.6s ease-out 0.8s backwards;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥐 Bakery</h1>
        <p>Fast · Small · Powerful</p>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🚀</div>
                <div class="feature-text">Lightning Fast</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📦</div>
                <div class="feature-text">5-8 MB Binary</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🎮</div>
                <div class="feature-text">Game Ready</div>
            </div>
        </div>
        
        <div style="margin-top: 3rem;">
            <button onclick="testClick()">
                Click Me! 🎉
            </button>
        </div>
        
        <div class="status" id="status">
            Status: Ready!
        </div>
    </div>
    
    <script>
        let clickCount = 0;
        
        function testClick() {
            clickCount++;
            const status = document.getElementById('status');
            status.textContent = \`Clicked \${clickCount} times! 🎉\`;
            status.style.background = 'rgba(255,255,255,0.2)';
            
            setTimeout(() => {
                status.style.background = 'rgba(255,255,255,0.1)';
            }, 300);
        }
        
        console.log('🥐 Bakery Hello World loaded!');
        console.log('Platform:', navigator.platform);
        console.log('User Agent:', navigator.userAgent);
    </script>
</body>
</html>
  `;

  win.setHTML(html);
  
  console.log("✅ HTML loaded!");
  console.log("🎯 Window should be visible now!\n");
  
  win.run();
});

app.on("window-all-closed", () => {
  console.log("\n👋 All windows closed, exiting...");
  app.quit();
});

