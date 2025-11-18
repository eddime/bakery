/**
 * 🥐 Bakery Universal Launcher (Linux) - WITH EMBEDDED RESOURCES
 * Extracts embedded binaries/assets to /tmp and launches correct architecture
 */

#include <iostream>
#include <string>
#include <fstream>
#include <cstdint>
#include <cstring>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/utsname.h>
#include <sys/wait.h>
#include <limits.h>
#include <dlfcn.h>

struct EmbeddedData {
    uint64_t x64Offset;
    uint64_t x64Size;
    uint64_t assetsOffset;
    uint64_t assetsSize;
    uint64_t configOffset;
    uint64_t configSize;
    uint64_t steamSoOffset;
    uint64_t steamSoSize;
};

std::string getExecutablePath() {
    char path[PATH_MAX];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
        return std::string(path);
    }
    return "";
}

std::string getTempDir() {
    // Create unique dir for this app
    std::string uniqueDir = std::string("/tmp/bakery_") + std::to_string(getpid());
    mkdir(uniqueDir.c_str(), 0755);
    return uniqueDir;
}

std::string getCPUArchitecture() {
    struct utsname buffer;
    if (uname(&buffer) == 0) {
        std::string machine(buffer.machine);
        
        if (machine == "x86_64" || machine == "amd64") {
            return "x64";
        } else if (machine == "aarch64" || machine == "arm64") {
            return "arm64";
        }
    }
    return "x64"; // Default to x64
}

bool readEmbeddedData(const std::string& exePath, EmbeddedData& data) {
    std::ifstream file(exePath, std::ios::binary);
    if (!file) return false;
    
    // Find magic signature "BAKERY_EMBEDDED" from the end
    file.seekg(-8192, std::ios::end); // Search last 8KB
    char buffer[8192];
    file.read(buffer, 8192);
    
    const char* magic = "BAKERY_EMBEDDED";
    size_t magicLen = 16; // Including null terminator
    
    // Find magic
    bool found = false;
    int64_t magicPos = -1;
    for (int i = 0; i < 8192 - 16; i++) {
        if (memcmp(buffer + i, magic, magicLen) == 0) {
            found = true;
            magicPos = file.tellg();
            magicPos = magicPos - 8192 + i + magicLen;
            break;
        }
    }
    
    if (!found) return false;
    
    // Read header
    file.seekg(magicPos, std::ios::beg);
    file.read((char*)&data.x64Offset, 8);
    file.read((char*)&data.x64Size, 8);
    file.read((char*)&data.assetsOffset, 8);
    file.read((char*)&data.assetsSize, 8);
    file.read((char*)&data.configOffset, 8);
    file.read((char*)&data.configSize, 8);
    file.read((char*)&data.steamSoOffset, 8);
    file.read((char*)&data.steamSoSize, 8);
    
    return true;
}

bool extractFile(const std::string& exePath, uint64_t offset, uint64_t size, const std::string& outPath) {
    std::ifstream in(exePath, std::ios::binary);
    if (!in) return false;
    
    std::ofstream out(outPath, std::ios::binary);
    if (!out) return false;
    
    in.seekg(offset, std::ios::beg);
    
    const size_t BUFFER_SIZE = 1024 * 1024; // 1MB buffer
    char* buffer = new char[BUFFER_SIZE];
    
    uint64_t remaining = size;
    while (remaining > 0) {
        size_t toRead = (remaining < BUFFER_SIZE) ? (size_t)remaining : BUFFER_SIZE;
        in.read(buffer, toRead);
        out.write(buffer, toRead);
        remaining -= toRead;
    }
    
    delete[] buffer;
    
    // Make executable
    chmod(outPath.c_str(), 0755);
    
    return true;
}

int main(int argc, char* argv[]) {
    std::string exePath = getExecutablePath();
    std::string arch = getCPUArchitecture();
    std::string tempDir = getTempDir();
    
    // Read embedded data
    EmbeddedData data;
    if (!readEmbeddedData(exePath, data)) {
        std::cerr << "❌ Failed to read embedded data!" << std::endl;
        return 1;
    }
    
    // Extract files
    std::string x64Path = tempDir + "/bakery-x64";
    std::string assetsPath = tempDir + "/bakery-assets";
    std::string configPath = tempDir + "/bakery.config.json";
    
    if (data.x64Size > 0) {
        if (!extractFile(exePath, data.x64Offset, data.x64Size, x64Path)) {
            std::cerr << "❌ Failed to extract x64 binary!" << std::endl;
            return 1;
        }
    }
    
    if (data.assetsSize > 0) {
        if (!extractFile(exePath, data.assetsOffset, data.assetsSize, assetsPath)) {
            std::cerr << "❌ Failed to extract assets!" << std::endl;
            return 1;
        }
    }
    
    if (data.configSize > 0) {
        if (!extractFile(exePath, data.configOffset, data.configSize, configPath)) {
            std::cerr << "❌ Failed to extract config!" << std::endl;
            return 1;
        }
    }
    
    // Extract Steam .so if embedded
    if (data.steamSoSize > 0) {
        std::string steamSoPath = tempDir + "/libsteam_api.so";
        if (!extractFile(exePath, data.steamSoOffset, data.steamSoSize, steamSoPath)) {
            std::cerr << "⚠️  Failed to extract Steam library (Steamworks may not work)" << std::endl;
            // Don't fail - app can run without Steam
        } else {
            std::cout << "✅ Extracted Steam library to: " << steamSoPath << std::endl;
            
            // Set LD_LIBRARY_PATH so the launcher can find libsteam_api.so
            std::string ldPath = tempDir;
            const char* existingLdPath = getenv("LD_LIBRARY_PATH");
            if (existingLdPath && strlen(existingLdPath) > 0) {
                ldPath += ":" + std::string(existingLdPath);
            }
            setenv("LD_LIBRARY_PATH", ldPath.c_str(), 1);
            
            std::cout << "✅ Set LD_LIBRARY_PATH=" << ldPath << std::endl;
        }
    }
    
    // Launch architecture-specific binary
    std::string binaryPath = tempDir + "/bakery-" + arch;
    
    // For now, we only have x64
    if (arch != "x64") {
        std::cerr << "⚠️  Only x64 is currently supported, falling back..." << std::endl;
        binaryPath = x64Path;
    } else {
        binaryPath = x64Path;
    }
    
    // Build arguments
    char** args = new char*[argc + 1];
    args[0] = const_cast<char*>(binaryPath.c_str());
    for (int i = 1; i < argc; i++) {
        args[i] = argv[i];
    }
    args[argc] = nullptr;
    
    // Fork and exec
    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        execv(binaryPath.c_str(), args);
        
        // If we get here, exec failed
        std::cerr << "❌ Failed to launch " << arch << " binary" << std::endl;
        return 1;
    } else if (pid > 0) {
        // Parent process - wait for child
        int status;
        waitpid(pid, &status, 0);
        
        // Cleanup temp files
        unlink(x64Path.c_str());
        unlink(assetsPath.c_str());
        unlink(configPath.c_str());
        
        std::string steamSoPath = tempDir + "/libsteam_api.so";
        unlink(steamSoPath.c_str());
        
        rmdir(tempDir.c_str());
        
        delete[] args;
        
        return WIFEXITED(status) ? WEXITSTATUS(status) : 1;
    } else {
        std::cerr << "❌ Failed to fork process" << std::endl;
        delete[] args;
        return 1;
    }
}



