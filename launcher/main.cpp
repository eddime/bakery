/**
 * 🥐 Bakery Launcher
 * Extracts embedded Socket Runtime and runs it
 */

#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>
#include <vector>
#include <cstdlib>
#include <unistd.h>
#include <sys/stat.h>

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

const std::string MARKER = "\n__BAKERY_EMBEDDED_DATA__\n";

std::string getExecutablePath() {
#ifdef __APPLE__
    char path[1024];
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0) {
        return std::string(path);
    }
#endif
    return "";
}

std::string readFile(const std::string& path) {
    std::ifstream file(path, std::ios::binary);
    if (!file) {
        throw std::runtime_error("Cannot open file: " + path);
    }
    return std::string((std::istreambuf_iterator<char>(file)),
                       std::istreambuf_iterator<char>());
}

void base64Decode(const std::string& encoded, std::vector<uint8_t>& decoded) {
    // Simple Base64 decoder (you'd use a library in production)
    // For now, just use system command
    std::string tmpFile = "/tmp/bakery_decode_" + std::to_string(getpid());
    std::string cmd = "echo '" + encoded + "' | base64 -d > " + tmpFile;
    system(cmd.c_str());
    
    std::ifstream file(tmpFile, std::ios::binary);
    decoded = std::vector<uint8_t>((std::istreambuf_iterator<char>(file)),
                                    std::istreambuf_iterator<char>());
    std::filesystem::remove(tmpFile);
}

int main(int argc, char* argv[]) {
    try {
        std::cout << "🥐 Bakery Launcher Starting..." << std::endl;
        
        // 1. Read self
        std::string exePath = getExecutablePath();
        std::string content = readFile(exePath);
        
        // 2. Find marker
        size_t markerPos = content.find(MARKER);
        if (markerPos == std::string::npos) {
            std::cerr << "❌ No embedded data found!" << std::endl;
            return 1;
        }
        
        std::cout << "✅ Found embedded data" << std::endl;
        
        // 3. Extract JSON (embedded data)
        std::string jsonData = content.substr(markerPos + MARKER.length());
        
        // 4. Create temp directory
        std::string tmpDir = "/tmp/bakery-" + std::to_string(getpid());
        std::filesystem::create_directories(tmpDir);
        std::filesystem::create_directories(tmpDir + "/Resources");
        
        std::cout << "📂 Extracting to: " << tmpDir << std::endl;
        
        // 5. Parse JSON and extract files
        // (In production, use nlohmann/json or similar)
        // For now, we'll use a simple approach: call bun to parse JSON
        std::string parseScript = R"(
const fs = require('fs');
const data = JSON.parse(process.argv[1]);
console.log(JSON.stringify({
  binaryName: data.binaryName,
  resourceCount: data.resources.length
}));
)";
        
        // TODO: Actually extract files from JSON
        // For now, just show what we would do:
        std::cout << "📦 Would extract resources here..." << std::endl;
        
        // 6. Make binary executable and run
        std::string binaryPath = tmpDir + "/socket-runtime";
        // chmod +x
        chmod(binaryPath.c_str(), 0755);
        
        // 7. Set environment variable for resources path
        setenv("SOCKET_RESOURCES_PATH", (tmpDir + "/Resources").c_str(), 1);
        
        // 8. Execute
        std::cout << "🚀 Launching Socket Runtime..." << std::endl;
        
        // Build args
        std::vector<char*> args;
        args.push_back(const_cast<char*>(binaryPath.c_str()));
        for (int i = 1; i < argc; i++) {
            args.push_back(argv[i]);
        }
        args.push_back(nullptr);
        
        execv(binaryPath.c_str(), args.data());
        
        // If we get here, exec failed
        std::cerr << "❌ Failed to execute Socket Runtime" << std::endl;
        return 1;
        
    } catch (const std::exception& e) {
        std::cerr << "❌ Error: " << e.what() << std::endl;
        return 1;
    }
}

