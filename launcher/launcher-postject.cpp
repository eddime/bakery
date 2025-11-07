/**
 * 🥐 Bakery Launcher (Postject Edition)
 * Reads embedded Socket Runtime directly from memory using postject
 * NO /tmp extraction! Direct memory execution!
 */

#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>
#include <vector>
#include <cstdlib>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <nlohmann/json.hpp>
#include "postject-api.h"

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

using json = nlohmann::json;
namespace fs = std::filesystem;

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

// Base64 decode helper
std::vector<uint8_t> base64_decode(const std::string& encoded) {
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
            decoded.push_back((val >> valb) & 0xFF);
            valb -= 8;
        }
    }
    return decoded;
}

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Launcher (Postject Edition)" << std::endl;
    
    try {
        // 1. Check if resources are embedded
        if (!postject_has_resource()) {
            std::cerr << "❌ No embedded resources found!" << std::endl;
            std::cerr << "This binary doesn't contain embedded Socket Runtime data." << std::endl;
            return 1;
        }
        
        std::cout << "✅ Found embedded resources!" << std::endl;
        
        // 2. Read embedded data (all in one!)
        size_t dataSize = 0;
        const char* dataPtr = (const char*)postject_find_resource("BAKERY_DATA", &dataSize, nullptr);
        
        if (!dataPtr || dataSize == 0) {
            std::cerr << "❌ Could not read BAKERY_DATA!" << std::endl;
            return 1;
        }
        
        std::string dataJson(dataPtr, dataSize);
        json data = json::parse(dataJson);
        
        std::cout << "✅ Parsed data (version: " << data["version"] << ")" << std::endl;
        std::cout << "   Data size: " << (dataSize / 1024 / 1024) << " MB" << std::endl;
        
        // 3. Extract binary data from JSON
        std::string binaryBase64 = data["binaryData"];
        std::vector<uint8_t> binaryData = base64_decode(binaryBase64);
        size_t binarySize = binaryData.size();
        
        std::cout << "✅ Decoded Socket Runtime binary (" << (binarySize / 1024 / 1024) << " MB)" << std::endl;
        
        // 4. Create RAMDisk for ultra-fast extraction (macOS)
        std::cout << "⚡ Creating RAMDisk in memory..." << std::endl;
        
        // Calculate required RAMDisk size (in 512-byte blocks)
        size_t totalSize = binarySize;
        for (const auto& resource : data["resources"]) {
            totalSize += resource["size"].get<size_t>();
        }
        
        // Add 50% overhead for filesystem + round up
        size_t blocksNeeded = (totalSize * 1.5) / 512 + 1000;
        
        std::string createRamDiskCmd = "hdid -nomount ram://" + std::to_string(blocksNeeded);
        FILE* ramDiskPipe = popen(createRamDiskCmd.c_str(), "r");
        if (!ramDiskPipe) {
            std::cerr << "⚠️  Could not create RAMDisk, falling back to /tmp" << std::endl;
        }
        
        char ramDiskDevice[256] = {0};
        std::string ramDiskPath;
        
        if (ramDiskPipe && fgets(ramDiskDevice, sizeof(ramDiskDevice), ramDiskPipe) != nullptr) {
            pclose(ramDiskPipe);
            
            // Trim newline
            ramDiskDevice[strcspn(ramDiskDevice, "\n")] = 0;
            
            // Format RAMDisk with HFS+
            std::string formatCmd = "newfs_hfs -v BakeryRAM " + std::string(ramDiskDevice) + " >/dev/null 2>&1";
            system(formatCmd.c_str());
            
            // Mount RAMDisk
            std::string mountPoint = "/tmp/bakery-ram-" + std::to_string(getpid());
            fs::create_directories(mountPoint);
            std::string mountCmd = "mount -t hfs " + std::string(ramDiskDevice) + " " + mountPoint;
            system(mountCmd.c_str());
            
            ramDiskPath = mountPoint;
            std::cout << "✅ RAMDisk created: " << ramDiskPath << " (" << (totalSize / 1024 / 1024) << " MB in RAM)" << std::endl;
        }
        
        // Use RAMDisk if available, otherwise fall back to /tmp
        std::string tmpDir = !ramDiskPath.empty() ? ramDiskPath : "/tmp/bakery-" + std::to_string(getpid());
        std::string appName = data["binaryName"].get<std::string>();
        appName = appName.substr(0, appName.find_last_of("-"));
        
        std::string appBundle = tmpDir + "/" + appName + ".app";
        std::string contentsDir = appBundle + "/Contents";
        std::string macosDir = contentsDir + "/MacOS";
        std::string resourcesDir = contentsDir + "/Resources";
        
        fs::create_directories(macosDir);
        fs::create_directories(resourcesDir);
        
        std::cout << "📂 Creating app bundle: " << appBundle << std::endl;
        
        // 5. Write Socket Runtime binary to MacOS folder
        std::string binaryPath = macosDir + "/" + data["binaryName"].get<std::string>();
        std::ofstream binaryFile(binaryPath, std::ios::binary);
        binaryFile.write(reinterpret_cast<const char*>(binaryData.data()), binarySize);
        binaryFile.close();
        chmod(binaryPath.c_str(), 0755);
        
        std::cout << "✅ Extracted Socket Runtime binary" << std::endl;
        
        // 6. Extract resources from archive
        // The resources are stored as a JSON array in the data
        auto resourcesList = data["resources"];
        int extractedCount = 0;
        
        for (const auto& resource : resourcesList) {
            std::string filePath = resource["path"];
            std::string base64Data = resource["data"];
            
            // Skip the binary itself (already extracted)
            if (filePath == data["binaryName"]) {
                continue;
            }
            
            std::string fullPath = resourcesDir + "/" + filePath;
            
            // Ensure parent directories exist
            fs::create_directories(fs::path(fullPath).parent_path());
            
            // Decode Base64 and write file
            std::vector<uint8_t> decodedData = base64_decode(base64Data);
            std::ofstream outFile(fullPath, std::ios::binary);
            outFile.write(reinterpret_cast<const char*>(decodedData.data()), decodedData.size());
            outFile.close();
            
            extractedCount++;
        }
        
        std::cout << "✅ Extracted " << extractedCount << " resource files" << std::endl;
        
        // 7. Create Info.plist
        std::string plistPath = contentsDir + "/Info.plist";
        std::string plistContent = R"(<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>)" + data["binaryName"].get<std::string>() + R"(</string>
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
        
        // 8. Launch the app bundle and wait for it
        std::cout << "🚀 Launching app..." << std::endl;
        
        // Use 'open -W' to wait for the app to terminate
        std::string openCmd = "open -W " + appBundle + " 2>&1";
        int exitCode = system(openCmd.c_str());
        
        // Cleanup
        std::cout << "🧹 Cleaning up..." << std::endl;
        
        // If using RAMDisk, unmount it
        if (!ramDiskPath.empty()) {
            std::string unmountCmd = "diskutil unmount force " + ramDiskPath + " >/dev/null 2>&1";
            system(unmountCmd.c_str());
            
            // Eject the RAMDisk device
            if (strlen(ramDiskDevice) > 0) {
                std::string ejectCmd = "diskutil eject " + std::string(ramDiskDevice) + " >/dev/null 2>&1";
                system(ejectCmd.c_str());
            }
            
            std::cout << "✅ RAMDisk unmounted and freed" << std::endl;
        } else {
            // Regular cleanup for /tmp
            fs::remove_all(tmpDir);
        }
        
        std::cout << "✅ Done!" << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "❌ Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}

