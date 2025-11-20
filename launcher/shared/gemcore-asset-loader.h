/**
 *  Gemcore Asset Loader - SHARED ACROSS ALL PLATFORMS
 * 
 * Loads assets from:
 * 1. Embedded C++ arrays (embedded-assets.h)
 * 2. External binary file (gemcore-assets)  WITH XOR DECRYPTION
 */

#ifndef GEMCORE_ASSET_LOADER_H
#define GEMCORE_ASSET_LOADER_H

#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>
#include <fstream>
#include <cstring>
#include "gemcore-http-server.h"

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

#ifdef _WIN32
#include <windows.h>
#include <shlwapi.h>
#endif

namespace gemcore {
namespace assets {

/**
 *  XOR Decryption with multi-key rotation (matches TypeScript version!)
 */
inline void xorDecrypt(uint8_t* data, size_t len, const uint8_t* key, size_t keyLen) {
    // Multi-key rotation for better security (same algorithm as TypeScript)
    for (size_t i = 0; i < len; i++) {
        // Use position-dependent key rotation
        size_t keyIdx = (i + (i >> 8)) % keyLen;
        data[i] ^= key[keyIdx];
    }
}

/**
 * Get executable directory (cross-platform)
 */
inline std::string getExecutableDir() {
    char path[1024];
    
#ifdef _WIN32
    GetModuleFileNameA(NULL, path, sizeof(path));
    PathRemoveFileSpecA(path);
    return std::string(path);
#elif __APPLE__
    uint32_t size = sizeof(path);
    if (_NSGetExecutablePath(path, &size) == 0) {
        // Remove executable name
        std::string p(path);
        size_t pos = p.find_last_of('/');
        if (pos != std::string::npos) {
            return p.substr(0, pos);
        }
    }
    return ".";
#else
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len != -1) {
        path[len] = '\0';
        // Remove executable name
        std::string p(path);
        size_t pos = p.find_last_of('/');
        if (pos != std::string::npos) {
            return p.substr(0, pos);
        }
    }
    return ".";
#endif
}

/**
 * Check if string ends with suffix
 */
inline bool endsWith(const std::string& str, const std::string& suffix) {
    if (suffix.size() > str.size()) return false;
    return str.compare(str.size() - suffix.size(), suffix.size(), suffix) == 0;
}

/**
 * Asset container
 */
struct AssetData {
    std::vector<unsigned char> data;
    std::string path;
    std::string mimeType;
};

/**
 * Embedded Asset Loader (from embedded-assets.h)
 */
class EmbeddedAssetLoader {
private:
    std::unordered_map<std::string, AssetData> assets_;
    
public:
    /**
     * Load from embedded C++ arrays
     * Template to support any embedded asset structure
     */
    template<typename AssetStruct>
    bool load(const AssetStruct* embeddedAssets, size_t count) {
        std::cout << " Loading " << count << " embedded assets..." << std::endl;
        
        for (size_t i = 0; i < count; i++) {
            const auto& embedded = embeddedAssets[i];
            
            AssetData asset;
            asset.path = embedded.path;
            
            // Decode base64 if needed (some embedders use base64)
            // For now assume raw binary data
            asset.data.assign(
                (const unsigned char*)embedded.data,
                (const unsigned char*)embedded.data + embedded.size
            );
            
            asset.mimeType = http::getMimeType(asset.path);
            
            assets_[asset.path] = std::move(asset);
        }
        
        std::cout << " Loaded " << assets_.size() << " embedded assets" << std::endl;
        return true;
    }
    
    /**
     * Get asset by path
     */
    http::Asset getAsset(const std::string& path) const {
        auto it = assets_.find(path);
        if (it != assets_.end()) {
            return {
                it->second.data.data(),
                it->second.data.size(),
                it->second.mimeType
            };
        }
        return { nullptr, 0, "" };
    }
    
    /**
     * Get all asset paths
     */
    std::vector<std::string> getAllPaths() const {
        std::vector<std::string> paths;
        paths.reserve(assets_.size());
        for (const auto& kv : assets_) {
            paths.push_back(kv.first);
        }
        return paths;
    }
    
    size_t size() const { return assets_.size(); }
};

/**
 * Shared Asset Loader (from gemcore-assets file)
 */
class SharedAssetLoader {
private:
    std::unordered_map<std::string, AssetData> assets_;
    
public:
    /**
     * Load from external gemcore-assets file (with XOR decryption!)
     */
    bool load() {
        std::string execDir = getExecutableDir();
        std::string assetsPath = execDir + "/gemcore-assets";
        
        std::ifstream file(assetsPath, std::ios::binary);
        if (!file) {
            std::cerr << " Failed to open gemcore-assets at: " << assetsPath << std::endl;
            return false;
        }
        
        //  Read magic header (9 bytes: "GEMCORE1\0")
        char magicHeader[9];
        file.read(magicHeader, 9);
        
        if (std::memcmp(magicHeader, "GEMCORE1\0", 9) != 0) {
            std::cerr << " Invalid gemcore-assets file (wrong magic header)" << std::endl;
            return false;
        }
        
        #ifndef NDEBUG
        std::cout << " Encrypted assets detected" << std::endl;
        #endif
        
        //  Read encryption key (32 bytes)
        uint8_t encryptionKey[32];
        file.read((char*)encryptionKey, 32);
        
        // Read file count
        uint32_t fileCount;
        file.read((char*)&fileCount, 4);
        
        #ifndef NDEBUG
        std::cout << " Loading " << fileCount << " assets from gemcore-assets..." << std::endl;
        #endif
        
        uint32_t loaded = 0;
        uint32_t skipped = 0;
        
        //  OPTIMIZATION: Pre-allocate assets map
        assets_.reserve(fileCount);
        
        //  OPTIMIZATION: Load all assets first, then decrypt in parallel
        std::vector<AssetData> tempAssets;
        tempAssets.reserve(fileCount);
        
        // PHASE 1: Sequential read from file (I/O bound)
        for (uint32_t i = 0; i < fileCount; i++) {
            // Read path length
            uint32_t pathLen;
            file.read((char*)&pathLen, 4);
            
            if (!file) {
                std::cerr << "  File stream error at asset " << i << "/" << fileCount << std::endl;
                break;
            }
            
            if (pathLen == 0 || pathLen > 4096) {
                std::cerr << "  Invalid path length at asset " << i << ": " << pathLen << std::endl;
                break;
            }
            
            // Read path
            std::string path(pathLen, '\0');
            file.read(&path[0], pathLen);
            
            // Read size (uint64)
            uint64_t size64;
            file.read((char*)&size64, 8);
            
            if (!file) {
                std::cerr << "  Failed to read size for " << path << std::endl;
                break;
            }
            
            if (size64 > 100ULL * 1024 * 1024) {  // Max 100MB per file
                std::cerr << "  File too large: " << path << " (" << (size64/1024/1024) << " MB, skipping)" << std::endl;
                // Skip this file's data
                file.seekg(size64, std::ios::cur);
                skipped++;
                continue;
            }
            
            // Read ENCRYPTED data (don't decrypt yet!)
            AssetData asset;
            asset.path = std::move(path);
            asset.data.resize(static_cast<size_t>(size64));
            file.read((char*)asset.data.data(), asset.data.size());
            
            if (!file) {
                std::cerr << "  Failed to read data for " << asset.path << std::endl;
                skipped++;
                continue;
            }
            
            tempAssets.push_back(std::move(asset));
            loaded++;
        }
        
        file.close();
        
        // PHASE 2: Parallel decryption (CPU bound)
        if (!tempAssets.empty()) {
            const size_t numThreads = std::min<size_t>(
                std::thread::hardware_concurrency(),
                std::max<size_t>(1, tempAssets.size() / 50)  // At least 50 assets per thread
            );
            
            if (numThreads > 1) {
                std::vector<std::thread> workers;
                workers.reserve(numThreads);
                
                for (size_t t = 0; t < numThreads; t++) {
                    workers.emplace_back([&tempAssets, &encryptionKey, t, numThreads]() {
                        for (size_t i = t; i < tempAssets.size(); i += numThreads) {
                            xorDecrypt(tempAssets[i].data.data(), tempAssets[i].data.size(), encryptionKey, 32);
                        }
                    });
                }
                
                for (auto& worker : workers) {
                    worker.join();
                }
            } else {
                // Single-threaded fallback
                for (auto& asset : tempAssets) {
                    xorDecrypt(asset.data.data(), asset.data.size(), encryptionKey, 32);
                }
            }
            
            // PHASE 3: Move to final map with MIME types
            for (auto& asset : tempAssets) {
                asset.mimeType = http::getMimeType(asset.path);
                assets_[asset.path] = std::move(asset);
            }
        }
        
        #ifndef NDEBUG
        if (skipped > 0) {
            std::cout << "  Skipped " << skipped << " assets" << std::endl;
        }
        std::cout << " Loaded " << assets_.size() << " shared assets" << std::endl;
        #endif
        
        return true;
    }
    
    /**
     * Get asset by path
     */
    http::Asset getAsset(const std::string& path) const {
        auto it = assets_.find(path);
        if (it != assets_.end()) {
            return {
                it->second.data.data(),
                it->second.data.size(),
                it->second.mimeType
            };
        }
        return { nullptr, 0, "" };
    }
    
    /**
     * Get all asset paths
     */
    std::vector<std::string> getAllPaths() const {
        std::vector<std::string> paths;
        paths.reserve(assets_.size());
        for (const auto& kv : assets_) {
            paths.push_back(kv.first);
        }
        return paths;
    }
    
    size_t size() const { return assets_.size(); }
};

} // namespace assets
} // namespace gemcore

#endif // GEMCORE_ASSET_LOADER_H

