/**
 * 🥐 Bakery Launcher
 * Minimal C++ launcher that extracts embedded Socket Runtime and runs it
 */

#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>
#include <vector>
#include <cstdlib>
#include <unistd.h>
#include <sys/stat.h>
#include <nlohmann/json.hpp>
#include <sys/wait.h>

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

using json = nlohmann::json;
namespace fs = std::filesystem;

const std::string MARKER = "\n__BAKERY_EMBEDDED_DATA__\n";

std::string getExecutablePath() {
#ifdef __APPLE__
    char path[1024];
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0) {
        return std::string(path);
    }
#elif defined(__linux__)
    char path[1024];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
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

std::vector<uint8_t> base64Decode(const std::string& encoded) {
    static const std::string base64_chars = 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "0123456789+/";

    std::vector<uint8_t> decoded;
    std::vector<int> T(256, -1);
    
    for (int i = 0; i < 64; i++) T[base64_chars[i]] = i;

    int val = 0, valb = -8;
    for (unsigned char c : encoded) {
        if (T[c] == -1) break;
        val = (val << 6) + T[c];
        valb += 6;
        if (valb >= 0) {
            decoded.push_back(char((val >> valb) & 0xFF));
            valb -= 8;
        }
    }
    return decoded;
}

int main(int argc, char* argv[]) {
    try {
        std::cout << "🥐 Bakery Launcher Starting..." << std::endl;
        
        // 1. Read self
        std::string exePath = getExecutablePath();
        std::cout << "📂 Reading: " << exePath << std::endl;
        
        std::string content = readFile(exePath);
        
        // 2. Find marker (skip the first occurrence which is in our own code!)
        size_t markerPos = content.find(MARKER);
        if (markerPos != std::string::npos) {
            // Try to find the SECOND occurrence
            size_t secondPos = content.find(MARKER, markerPos + MARKER.length());
            if (secondPos != std::string::npos) {
                markerPos = secondPos;
            }
        }
        
        if (markerPos == std::string::npos) {
            std::cerr << "❌ No embedded data found!" << std::endl;
            std::cerr << "This binary doesn't contain embedded Socket Runtime data." << std::endl;
            return 1;
        }
        
        std::cout << "✅ Found embedded data at position " << markerPos << std::endl;
        
        // 3. Extract JSON
        std::string jsonData = content.substr(markerPos + MARKER.length());
        
        // Parse JSON
        json embedded;
        try {
            embedded = json::parse(jsonData);
        } catch (const std::exception& e) {
            std::cerr << "❌ Failed to parse embedded JSON: " << e.what() << std::endl;
            return 1;
        }
        
        std::cout << "✅ Parsed embedded data (version: " << embedded["version"] << ")" << std::endl;
        
        // 4. Create temp directory with .app bundle structure
        std::string tmpDir = "/tmp/bakery-" + std::to_string(getpid());
        std::string appName = embedded["binaryName"].get<std::string>();
        appName = appName.substr(0, appName.find_last_of("-")); // Remove -dev suffix
        
        std::string appBundle = tmpDir + "/" + appName + ".app";
        std::string contentsDir = appBundle + "/Contents";
        std::string macosDir = contentsDir + "/MacOS";
        std::string resourcesDir = contentsDir + "/Resources";
        
        fs::create_directories(macosDir);
        fs::create_directories(resourcesDir);
        std::cout << "📂 Creating app bundle: " << appBundle << std::endl;
        
        // Create Info.plist
        std::string plistPath = contentsDir + "/Info.plist";
        std::string plistContent = R"(<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>)" + embedded["binaryName"].get<std::string>() + R"(</string>
    <key>CFBundleIdentifier</key>
    <string>com.bakery.app</string>
    <key>CFBundleName</key>
    <string>)" + appName + R"(</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
</dict>
</plist>)";
        
        std::ofstream plistFile(plistPath);
        plistFile << plistContent;
        plistFile.close();
        
        // 5. Extract all resources
        auto resources = embedded["resources"];
        std::cout << "📦 Extracting " << resources.size() << " files..." << std::endl;
        
        int extractedCount = 0;
        for (const auto& resource : resources) {
            std::string relativePath = resource["path"];
            std::string base64Data = resource["data"];
            
            std::string filePath = resourcesDir + "/" + relativePath;
            std::string fileDir = fs::path(filePath).parent_path();
            
            // Create directory if needed
            fs::create_directories(fileDir);
            
            // Decode Base64
            std::vector<uint8_t> decoded = base64Decode(base64Data);
            
            // Write file
            std::ofstream outFile(filePath, std::ios::binary);
            outFile.write(reinterpret_cast<const char*>(decoded.data()), decoded.size());
            outFile.close();
            
            extractedCount++;
            if (extractedCount % 20 == 0 || extractedCount == resources.size()) {
                std::cout << "  ✅ Extracted " << extractedCount << "/" << resources.size() << " files" << std::endl;
            }
        }
        
        // 6. Find and extract the binary to MacOS folder
        std::string binaryName = embedded["binaryName"];
        std::string binaryPath = macosDir + "/" + binaryName;
        
        // Binary is also in resources, extract it to tmpDir root
        bool binaryFound = false;
        for (const auto& resource : resources) {
            if (resource["path"] == binaryName) {
                std::string base64Data = resource["data"];
                std::vector<uint8_t> decoded = base64Decode(base64Data);
                
                std::ofstream outFile(binaryPath, std::ios::binary);
                outFile.write(reinterpret_cast<const char*>(decoded.data()), decoded.size());
                outFile.close();
                
                // Make executable
                chmod(binaryPath.c_str(), 0755);
                
                binaryFound = true;
                std::cout << "✅ Extracted binary: " << binaryName << " (" << decoded.size() / 1024 << " KB)" << std::endl;
                break;
            }
        }
        
        if (!binaryFound) {
            std::cerr << "❌ Binary not found in embedded resources!" << std::endl;
            return 1;
        }
        
        // 7. Use 'open' command on macOS to launch the .app bundle properly
        std::cout << "🚀 Launching app bundle: " << appBundle << std::endl;
        std::cout << std::endl;
        
#ifdef __APPLE__
        // On macOS, use 'open' to launch the .app properly
        std::string openCmd = "open \"" + appBundle + "\"";
        int result = system(openCmd.c_str());
        
        if (result != 0) {
            std::cerr << "❌ Failed to open app bundle" << std::endl;
            return 1;
        }
        
        // Wait a bit for the app to start
        sleep(1);
        
        std::cout << "✅ App launched successfully!" << std::endl;
        return 0;
#else
        // On other platforms, execute the binary directly
        // 8. Change to app bundle directory
        chdir(appBundle.c_str());
        
        // 9. Launch Socket Runtime using fork/exec pattern
        std::cout << "🚀 Launching Socket Runtime" << std::endl;
        std::cout << "📂 Binary: " << binaryPath << std::endl;
        std::cout << std::endl;
        
        pid_t pid = fork();
        
        if (pid < 0) {
            std::cerr << "❌ Fork failed!" << std::endl;
            return 1;
        }
        
        if (pid == 0) {
            // Child process - execute Socket Runtime
            std::vector<char*> args;
            args.push_back(const_cast<char*>(binaryPath.c_str()));
            for (int i = 1; i < argc; i++) {
                args.push_back(argv[i]);
            }
            args.push_back(nullptr);
            
            execv(binaryPath.c_str(), args.data());
            
            // If we get here, exec failed
            std::cerr << "❌ Failed to execute Socket Runtime: " << strerror(errno) << std::endl;
            exit(1);
        } else {
            // Parent process - wait for child
            int status;
            waitpid(pid, &status, 0);
            
            if (WIFEXITED(status)) {
                return WEXITSTATUS(status);
            } else {
                return 1;
            }
        }
#endif
        
    } catch (const std::exception& e) {
        std::cerr << "❌ Error: " << e.what() << std::endl;
        return 1;
    }
}

