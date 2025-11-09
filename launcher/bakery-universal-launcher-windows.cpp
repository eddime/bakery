/**
 * 🥐 Bakery Universal Launcher (Windows)
 * Detects CPU architecture (x64/ARM64/x86) and launches correct binary
 */

#include <iostream>
#include <string>
#include <windows.h>
#include <process.h>

std::string getExecutablePath() {
    char path[MAX_PATH];
    GetModuleFileNameA(NULL, path, MAX_PATH);
    
    // Remove filename, keep directory
    std::string fullPath(path);
    size_t lastSlash = fullPath.find_last_of("\\/");
    if (lastSlash != std::string::npos) {
        return fullPath.substr(0, lastSlash);
    }
    return "";
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
        case PROCESSOR_ARCHITECTURE_ARM:
            return "arm"; // ARM32 (rare on Windows)
        default:
            return "x64"; // Fallback to x64
    }
}

std::string getExecutableName() {
    char path[MAX_PATH];
    GetModuleFileNameA(NULL, path, MAX_PATH);
    
    std::string fullPath(path);
    size_t lastSlash = fullPath.find_last_of("\\/");
    if (lastSlash != std::string::npos) {
        std::string filename = fullPath.substr(lastSlash + 1);
        size_t lastDot = filename.find_last_of(".");
        if (lastDot != std::string::npos) {
            return filename.substr(0, lastDot); // Remove .exe
        }
        return filename;
    }
    return "bakery";
}

int main(int argc, char* argv[]) {
    std::string arch = getCPUArchitecture();
    std::string execPath = getExecutablePath();
    std::string execName = getExecutableName();
    
    // Path to architecture-specific binary (e.g., candy-catch-x64.exe)
    std::string binaryPath = execPath + "\\" + execName + "-" + arch + ".exe";
    
    // Convert to wide string for Windows API
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
        std::cerr << "Failed to launch " << arch << " binary: " << binaryPath << std::endl;
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
    
    return exitCode;
}


