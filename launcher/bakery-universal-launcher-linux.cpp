/**
 * 🥐 Bakery Universal Launcher (Linux AppImage)
 * Detects CPU architecture (x86_64/aarch64) and launches correct binary
 */

#include <iostream>
#include <string>
#include <cstring>
#include <cstdlib>
#include <unistd.h>
#include <sys/utsname.h>
#include <sys/wait.h>
#include <libgen.h>

std::string getExecutableDir() {
    char path[4096];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
        char* dir = dirname(path);
        return std::string(dir);
    }
    return ".";
}

std::string getExecutableName() {
    char path[4096];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
        char* name = basename(path);
        
        // Remove "AppRun" if that's the name
        std::string execName(name);
        if (execName == "AppRun") {
            // Get parent directory name
            char* dirPath = strdup(path);
            char* dir = dirname(dirPath);
            char* parentName = basename(dir);
            
            // Remove .AppDir suffix if present
            std::string appName(parentName);
            size_t pos = appName.find(".AppDir");
            if (pos != std::string::npos) {
                appName = appName.substr(0, pos);
            }
            
            free(dirPath);
            return appName;
        }
        
        return execName;
    }
    return "bakery";
}

std::string getCPUArchitecture() {
    struct utsname buffer;
    if (uname(&buffer) != 0) {
        return "x86_64"; // Fallback
    }
    
    std::string machine(buffer.machine);
    
    if (machine == "x86_64" || machine == "amd64") {
        return "x86_64";
    } else if (machine == "aarch64" || machine == "arm64") {
        return "aarch64";
    } else if (machine == "armv7l" || machine == "armv7") {
        return "armv7";
    }
    
    return "x86_64"; // Default fallback
}

int main(int argc, char* argv[]) {
    std::string arch = getCPUArchitecture();
    std::string execDir = getExecutableDir();
    std::string execName = getExecutableName();
    
    // Path to architecture-specific binary (e.g., candy-catch-x86_64)
    std::string binaryPath = execDir + "/" + execName + "-" + arch;
    
    // Check if binary exists
    if (access(binaryPath.c_str(), X_OK) != 0) {
        std::cerr << "❌ Failed to find " << arch << " binary: " << binaryPath << std::endl;
        std::cerr << "💡 Available architectures:" << std::endl;
        
        // Try to find available binaries
        std::string x64Path = execDir + "/" + execName + "-x86_64";
        std::string armPath = execDir + "/" + execName + "-aarch64";
        
        if (access(x64Path.c_str(), X_OK) == 0) {
            std::cerr << "   ✓ x86_64" << std::endl;
        }
        if (access(armPath.c_str(), X_OK) == 0) {
            std::cerr << "   ✓ aarch64" << std::endl;
        }
        
        return 1;
    }
    
    // Build arguments
    char** newArgv = new char*[argc + 1];
    newArgv[0] = strdup(binaryPath.c_str());
    for (int i = 1; i < argc; i++) {
        newArgv[i] = argv[i];
    }
    newArgv[argc] = nullptr;
    
    // Execute binary
    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        execv(binaryPath.c_str(), newArgv);
        // If execv returns, it failed
        std::cerr << "❌ Failed to execute: " << binaryPath << std::endl;
        return 1;
    } else if (pid > 0) {
        // Parent process - wait for child
        int status;
        waitpid(pid, &status, 0);
        
        // Cleanup
        free(newArgv[0]);
        delete[] newArgv;
        
        if (WIFEXITED(status)) {
            return WEXITSTATUS(status);
        }
        return 1;
    } else {
        std::cerr << "❌ Failed to fork process" << std::endl;
        return 1;
    }
}

