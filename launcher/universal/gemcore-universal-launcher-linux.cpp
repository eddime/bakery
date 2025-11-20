/**
 * 🥐 Gemcore Universal Launcher - Linux
 * Detects CPU architecture and launches the correct binary
 */

#include <iostream>
#include <string>
#include <sys/utsname.h>
#include <unistd.h>
#include <limits.h>

std::string getExecutableDir() {
    char path[PATH_MAX];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
        std::string p(path);
        size_t pos = p.find_last_of('/');
        if (pos != std::string::npos) {
            return p.substr(0, pos);
        }
    }
    return ".";
}

std::string detectArchitecture() {
    struct utsname buffer;
    if (uname(&buffer) == 0) {
        std::string machine(buffer.machine);
        
        if (machine == "x86_64" || machine == "amd64") {
            return "x86_64";
        } else if (machine == "aarch64" || machine == "arm64") {
            return "aarch64";
        } else if (machine == "armv7l" || machine == "armv7") {
            return "armv7";
        }
    }
    return "unknown";
}

int main(int argc, char* argv[]) {
    std::string arch = detectArchitecture();
    std::string execDir = getExecutableDir();
    
    std::cout << "🥐 Gemcore Universal Launcher (Linux)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << "🔍 Detected architecture: " << arch << std::endl;
    std::cout << std::endl;
    
    // Determine which binary to launch
    std::string binaryName;
    
    if (arch == "x86_64") {
        binaryName = "Runner-x86_64";  // Will be replaced by build script
    } else if (arch == "aarch64") {
        binaryName = "Runner-aarch64";
    } else {
        std::cerr << "❌ Unsupported architecture: " << arch << std::endl;
        std::cerr << "💡 Supported: x86_64, aarch64" << std::endl;
        return 1;
    }
    
    std::string binaryPath = execDir + "/" + binaryName;
    
    std::cout << "🚀 Launching: " << binaryName << std::endl;
    std::cout << std::endl;
    
    // Execute the architecture-specific binary
    char* args[argc + 1];
    args[0] = const_cast<char*>(binaryPath.c_str());
    for (int i = 1; i < argc; i++) {
        args[i] = argv[i];
    }
    args[argc] = nullptr;
    
    execv(binaryPath.c_str(), args);
    
    // If we get here, execv failed
    std::cerr << "❌ Failed to launch " << binaryName << std::endl;
    std::cerr << "💡 Make sure the binary exists and is executable" << std::endl;
    return 1;
}
