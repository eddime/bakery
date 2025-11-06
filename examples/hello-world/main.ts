// ⚡ Zippy Hello World Example
// The simplest Zippy app

import { app, Window } from 'bakery:app';

console.log('🚀 Starting Zippy Hello World...');

app.on('ready', async () => {
    console.log('✅ App ready!');
    
    // Create main window
    const win = new Window({
        title: '⚡ Zippy Hello World',
        width: 800,
        height: 600,
        resizable: true,
    });
    
    // Load HTML content
    win.setHTML(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Zippy Hello World</title>
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
                }
                
                p {
                    font-size: 1.5rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }
                
                .features {
                    display: flex;
                    gap: 2rem;
                    margin-top: 3rem;
                    justify-content: center;
                }
                
                .feature {
                    background: rgba(255,255,255,0.1);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    backdrop-filter: blur(10px);
                    min-width: 150px;
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
                    transition: transform 0.2s;
                }
                
                button:hover {
                    transform: scale(1.05);
                }
                
                button:active {
                    transform: scale(0.95);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>⚡ Zippy</h1>
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
                    <button onclick="alert('Hello from Zippy! 🚀')">
                        Click Me!
                    </button>
                </div>
            </div>
        </body>
        </html>
    `);
    
    win.show();
});

app.on('window-all-closed', () => {
    console.log('👋 All windows closed, exiting...');
    app.quit();
});

