/**
 * 🥐 Bakery Native Launcher
 * C++ WebView + Socket Runtime Backend
 * 
 * Architecture:
 * - Native WebView (WKWebView/WebView2/WebKitGTK)
 * - Socket Runtime as HTTP server
 * - webview.bind() for window control
 * - fetch() for Socket Runtime APIs
 */

#include "webview/webview.h"
#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include <cstdlib>

#ifdef _WIN32
#include <windows.h>
#include <process.h>
#else
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>
#endif

class BakeryLauncher {
private:
    webview::webview* webview;
    pid_t socketRuntimePid;
    int serverPort;
    std::string windowTitle;
    
public:
    BakeryLauncher(const std::string& title = "Bakery App", int port = 3000) 
        : socketRuntimePid(-1), serverPort(port), windowTitle(title) {
        
        std::cout << "🥐 Bakery Native Launcher Starting..." << std::endl;
        
        // Create WebView
        webview = new webview::webview(true, nullptr);
        webview->set_title(title);
        webview->set_size(1200, 800, WEBVIEW_HINT_NONE);
        
        std::cout << "✅ WebView created" << std::endl;
    }
    
    ~BakeryLauncher() {
        // Cleanup
        if (socketRuntimePid > 0) {
            std::cout << "🧹 Stopping Socket Runtime..." << std::endl;
#ifdef _WIN32
            // Windows: terminate process
            HANDLE hProcess = OpenProcess(PROCESS_TERMINATE, FALSE, socketRuntimePid);
            if (hProcess) {
                TerminateProcess(hProcess, 0);
                CloseHandle(hProcess);
            }
#else
            // Unix: send SIGTERM
            kill(socketRuntimePid, SIGTERM);
            waitpid(socketRuntimePid, nullptr, 0);
#endif
        }
        delete webview;
    }
    
    bool startSocketRuntime() {
        std::cout << "🚀 Starting Socket Runtime on port " << serverPort << "..." << std::endl;
        
#ifdef _WIN32
        // Windows: use CreateProcess
        STARTUPINFO si = { sizeof(si) };
        PROCESS_INFORMATION pi;
        
        std::string cmd = "socket-runtime.exe --port " + std::to_string(serverPort);
        
        if (CreateProcess(NULL, (LPSTR)cmd.c_str(), NULL, NULL, FALSE, 
                         CREATE_NO_WINDOW, NULL, NULL, &si, &pi)) {
            socketRuntimePid = pi.dwProcessId;
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
        } else {
            std::cerr << "❌ Failed to start Socket Runtime" << std::endl;
            return false;
        }
#else
        // Unix: use fork + exec
        socketRuntimePid = fork();
        
        if (socketRuntimePid == 0) {
            // Child process
            std::string portArg = "--port=" + std::to_string(serverPort);
            execlp("ssc", "ssc", "dev", "-r", portArg.c_str(), nullptr);
            
            // If exec fails
            std::cerr << "❌ Failed to exec Socket Runtime" << std::endl;
            exit(1);
        } else if (socketRuntimePid < 0) {
            std::cerr << "❌ Failed to fork" << std::endl;
            return false;
        }
#endif
        
        // Wait for Socket Runtime to start
        std::cout << "⏳ Waiting for Socket Runtime to start..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(2));
        
        std::cout << "✅ Socket Runtime started (PID: " << socketRuntimePid << ")" << std::endl;
        return true;
    }
    
    void setupWindowBindings() {
        std::cout << "🔧 Setting up window control bindings..." << std::endl;
        
        // Bind setTitle
        webview->bind("bakerySetTitle", [](std::string seq, std::string req, void* arg) -> std::string {
            auto* launcher = static_cast<BakeryLauncher*>(arg);
            
            // Parse JSON: {"title": "My App"}
            // Simple parsing (find "title" value)
            size_t start = req.find("\"title\":\"") + 9;
            size_t end = req.find("\"", start);
            
            if (start != std::string::npos && end != std::string::npos) {
                std::string title = req.substr(start, end - start);
                launcher->setTitle(title);
                std::cout << "✅ Window title set to: " << title << std::endl;
            }
            
            return "{\"success\":true}";
        }, this);
        
        // Bind setSize
        webview->bind("bakerySetSize", [](std::string seq, std::string req, void* arg) -> std::string {
            auto* launcher = static_cast<BakeryLauncher*>(arg);
            
            // Parse JSON: {"width": 1280, "height": 720}
            size_t widthPos = req.find("\"width\":") + 8;
            size_t heightPos = req.find("\"height\":") + 9;
            
            int width = std::stoi(req.substr(widthPos, req.find(",", widthPos) - widthPos));
            int height = std::stoi(req.substr(heightPos, req.find("}", heightPos) - heightPos));
            
            launcher->setSize(width, height);
            std::cout << "✅ Window size set to: " << width << "x" << height << std::endl;
            
            return "{\"success\":true}";
        }, this);
        
        // Bind setFullscreen
        webview->bind("bakerySetFullscreen", [](std::string seq, std::string req, void* arg) -> std::string {
            auto* launcher = static_cast<BakeryLauncher*>(arg);
            
            // Parse JSON: {"enabled": true}
            bool enabled = req.find("true") != std::string::npos;
            
            launcher->setFullscreen(enabled);
            std::cout << "✅ Fullscreen set to: " << (enabled ? "true" : "false") << std::endl;
            
            return "{\"success\":true}";
        }, this);
        
        std::cout << "✅ Window bindings ready!" << std::endl;
    }
    
    void setTitle(const std::string& title) {
        windowTitle = title;
        webview->set_title(title);
    }
    
    void setSize(int width, int height) {
        webview->set_size(width, height, WEBVIEW_HINT_NONE);
    }
    
    void setFullscreen(bool enabled) {
        // Note: webview.h doesn't have built-in fullscreen
        // We need platform-specific code or use maximize
        std::cout << "⚠️  Fullscreen not yet implemented in webview.h" << std::endl;
    }
    
    void run() {
        // Start Socket Runtime
        if (!startSocketRuntime()) {
            std::cerr << "❌ Failed to start Socket Runtime, exiting..." << std::endl;
            return;
        }
        
        // Setup bindings
        setupWindowBindings();
        
        // Navigate to Socket Runtime
        std::string url = "http://localhost:" + std::to_string(serverPort);
        std::cout << "🌐 Loading: " << url << std::endl;
        webview->navigate(url);
        
        // Inject Bakery API
        std::string bakeryAPI = R"(
            window.Bakery = {
                window: {
                    setTitle: (title) => window.bakerySetTitle({title}),
                    setSize: (width, height) => window.bakerySetSize({width, height}),
                    setFullscreen: (enabled) => window.bakerySetFullscreen({enabled})
                }
            };
            console.log('🥐 Bakery Native API ready!');
        )";
        webview->init(bakeryAPI);
        
        // Run
        std::cout << "🚀 Starting WebView..." << std::endl;
        webview->run();
        
        std::cout << "✅ Bakery closed" << std::endl;
    }
};

int main(int argc, char* argv[]) {
    BakeryLauncher launcher("🥐 Bakery Native", 3000);
    launcher.run();
    return 0;
}

