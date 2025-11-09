/**
 * 🥐 Bakery Universal Launcher (Windows) - WITH EMBEDDED RESOURCES
 * Extracts embedded binaries/assets to TEMP and launches correct architecture
 */

#include <iostream>
#include <string>
#include <fstream>
#include <cstdint>
#include <windows.h>
#include <shlobj.h>

struct EmbeddedData {
    uint64_t x64Offset;
    uint64_t x64Size;
    uint64_t assetsOffset;
    uint64_t assetsSize;
    uint64_t configOffset;
    uint64_t configSize;
};

std::string getExecutablePath() {
    char path[MAX_PATH];
    GetModuleFileNameA(NULL, path, MAX_PATH);
    return std::string(path);
}

std::string getTempDir() {
    char tempPath[MAX_PATH];
    GetTempPathA(MAX_PATH, tempPath);
    
    // Create unique dir for this app
    std::string uniqueDir = std::string(tempPath) + "\\bakery_" + std::to_string(GetCurrentProcessId());
    CreateDirectoryA(uniqueDir.c_str(), NULL);
    
    return uniqueDir;
}

std::string getCPUArchitecture() {
    SYSTEM_INFO sysInfo;
    GetNativeSystemInfo(&sysInfo);
    
    switch (sysInfo.wProcessorArchitecture) {
        case PROCESSOR_ARCHITECTURE_AMD64:
            return "x64";
        case PROCESSOR_ARCHITECTURE_ARM64:
            return "arm64";
        case PROCESSOR_ARCHITECTURE_INTEL:
            return "x86";
        default:
            return "x64";
    }
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
    std::string x64Path = tempDir + "\\bakery-x64.exe";
    std::string assetsPath = tempDir + "\\bakery-assets";
    std::string configPath = tempDir + "\\bakery.config.json";
    
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
    
    // Launch architecture-specific binary
    std::string binaryPath = tempDir + "\\bakery-" + arch + ".exe";
    
    // For now, we only have x64
    if (arch != "x64") {
        std::cerr << "⚠️  Only x64 is currently supported, falling back..." << std::endl;
        binaryPath = x64Path;
    } else {
        binaryPath = x64Path;
    }
    
    // Convert to wide string
    int size = MultiByteToWideChar(CP_UTF8, 0, binaryPath.c_str(), -1, NULL, 0);
    wchar_t* widePath = new wchar_t[size];
    MultiByteToWideChar(CP_UTF8, 0, binaryPath.c_str(), -1, widePath, size);
    
    // Build command line with arguments
    std::wstring cmdLine = widePath;
    for (int i = 1; i < argc; i++) {
        cmdLine += L" ";
        size = MultiByteToWideChar(CP_UTF8, 0, argv[i], -1, NULL, 0);
        wchar_t* wideArg = new wchar_t[size];
        MultiByteToWideChar(CP_UTF8, 0, argv[i], -1, wideArg, size);
        cmdLine += wideArg;
        delete[] wideArg;
    }
    
    // Launch process
    STARTUPINFOW si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    
    if (!CreateProcessW(
        widePath,
        (LPWSTR)cmdLine.c_str(),
        NULL, NULL, FALSE, 0, NULL, NULL,
        &si, &pi
    )) {
        std::cerr << "❌ Failed to launch " << arch << " binary" << std::endl;
        std::cerr << "Error code: " << GetLastError() << std::endl;
        delete[] widePath;
        return 1;
    }
    
    // Wait for process to complete
    WaitForSingleObject(pi.hProcess, INFINITE);
    
    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);
    
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    delete[] widePath;
    
    // Cleanup temp files (optional, Windows will cleanup temp dir eventually)
    DeleteFileA(x64Path.c_str());
    DeleteFileA(assetsPath.c_str());
    DeleteFileA(configPath.c_str());
    RemoveDirectoryA(tempDir.c_str());
    
    return exitCode;
}


