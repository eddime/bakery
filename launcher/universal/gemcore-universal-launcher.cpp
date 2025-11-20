/**
 *  Gemcore Universal Launcher (macOS)
 * Detects CPU architecture (x64/ARM64) and launches correct binary
 */

#include <iostream>
#include <string>
#include <cstring>
#include <cstdlib>
#include <sys/sysctl.h>
#include <unistd.h>
#include <libgen.h>
#include <mach-o/dyld.h>

std::string getExecutablePath() {
    char path[1024];
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0) {
        char* pathCopy = strdup(path);
        std::string result = std::string(dirname(pathCopy));
        free(pathCopy);
        return result;
    }
    return "";
}

std::string getExecutableName() {
    char path[1024];
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0) {
        char* pathCopy = strdup(path);
        std::string result = std::string(basename(pathCopy));
        free(pathCopy);
        return result;
    }
    return "";
}

std::string getCPUArchitecture() {
    size_t size;
    sysctlbyname("hw.optional.arm64", nullptr, &size, nullptr, 0);
    
    if (size > 0) {
        uint64_t hasArm64;
        size = sizeof(hasArm64);
        sysctlbyname("hw.optional.arm64", &hasArm64, &size, nullptr, 0);
        
        if (hasArm64) {
            return "arm64";
        }
    }
    
    return "x86_64";
}

int main(int argc, char* argv[]) {
    std::string arch = getCPUArchitecture();
    std::string execPath = getExecutablePath();
    std::string execName = getExecutableName();
    
    // Path to architecture-specific binary
    // e.g. if launcher is "candy-catch", look for "candy-catch-arm64"
    std::string binaryPath = execPath + "/" + execName + "-" + arch;
    
    // Execute the correct binary
    execv(binaryPath.c_str(), argv);
    
    // If execv fails
    std::cerr << "Failed to launch " << arch << " binary: " << binaryPath << std::endl;
    return 1;
}

