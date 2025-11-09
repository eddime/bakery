/**
 * 🥐 Bakery Asset Loader - SHARED ACROSS ALL PLATFORMS
 * 
 * Loads assets from:
 * 1. Embedded C++ arrays (embedded-assets.h)
 * 2. External binary file (bakery-assets) 🔒 WITH XOR DECRYPTION
 */

#ifndef BAKERY_ASSET_LOADER_H
#define BAKERY_ASSET_LOADER_H

#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>
#include <fstream>
#include <cstring>
#include <cstdlib>
#include "bakery-http-server.h"

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

#ifdef _WIN32
#include <windows.h>
#include <shlwapi.h>
#endif

namespace bakery {
namespace assets {

/**
 * 🔒 XOR Decryption with multi-key rotation (matches TypeScript version!)
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
        std::cout << "📦 Loading " << count << " embedded assets..." << std::endl;
        
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
        
        std::cout << "✅ Loaded " << assets_.size() << " embedded assets" << std::endl;
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
 * Shared Asset Loader (from bakery-assets file)
 */
class SharedAssetLoader {
private:
    std::unordered_map<std::string, AssetData> assets_;
    
public:
    /**
     * Load from external bakery-assets file (with XOR decryption!)
     */
    bool load() {
        const char* overrideDir = std::getenv("BAKERY_ASSET_DIR");
        std::string baseDir;
        if (overrideDir && overrideDir[0] != '\0') {
            baseDir = overrideDir;
            std::cout << "📦 Using overridden asset directory: " << baseDir << std::endl;
        } else {
            baseDir = getExecutableDir();
        }
        std::string assetsPath = baseDir + "/bakery-assets";
        
        std::ifstream file(assetsPath, std::ios::binary);
        if (!file) {
            std::cerr << "❌ Failed to open bakery-assets at: " << assetsPath << std::endl;
            return false;
        }
        
        // 🔒 Read magic header (8 bytes: "BAKERY1\0")
        char magicHeader[8];
        file.read(magicHeader, 8);
        
        if (std::memcmp(magicHeader, "BAKERY1\0", 8) != 0) {
            std::cerr << "❌ Invalid bakery-assets file (wrong magic header)" << std::endl;
            return false;
        }
        
        std::cout << "🔐 Encrypted assets detected" << std::endl;
        
        // 🔑 Read encryption key (32 bytes)
        uint8_t encryptionKey[32];
        file.read((char*)encryptionKey, 32);
        
        // Read file count
        uint32_t fileCount;
        file.read((char*)&fileCount, 4);
        
        std::cout << "📦 Loading " << fileCount << " assets from bakery-assets..." << std::endl;
        
        uint32_t loaded = 0;
        uint32_t skipped = 0;
        
        // Read each file
        for (uint32_t i = 0; i < fileCount; i++) {
            // Read path length
            uint32_t pathLen;
            file.read((char*)&pathLen, 4);
            
            if (!file) {
                std::cerr << "⚠️  File stream error at asset " << i << "/" << fileCount << std::endl;
                break;
            }
            
            if (pathLen == 0 || pathLen > 4096) {
                std::cerr << "⚠️  Invalid path length at asset " << i << ": " << pathLen << std::endl;
                break;
            }
            
            // Read path
            std::string path(pathLen, '\0');
            file.read(&path[0], pathLen);
            
            // Read size (uint64)
            uint64_t size64;
            file.read((char*)&size64, 8);
            
            if (!file) {
                std::cerr << "⚠️  Failed to read size for " << path << std::endl;
                break;
            }
            
            if (size64 > 100ULL * 1024 * 1024) {  // Max 100MB per file
                std::cerr << "⚠️  File too large: " << path << " (" << (size64/1024/1024) << " MB, skipping)" << std::endl;
                // Skip this file's data
                file.seekg(size64, std::ios::cur);
                skipped++;
                continue;
            }
            
            // Read ENCRYPTED data
            AssetData asset;
            asset.path = path;
            asset.data.resize(static_cast<size_t>(size64));
            file.read((char*)asset.data.data(), asset.data.size());
            
            // 🔓 Decrypt the data using XOR with the embedded key!
            xorDecrypt(asset.data.data(), asset.data.size(), encryptionKey, 32);
            
            asset.mimeType = http::getMimeType(path);
            
            if (!file) {
                std::cerr << "⚠️  Failed to read data for " << path << std::endl;
                skipped++;
                continue;
            }
            
            assets_[path] = std::move(asset);
            loaded++;
        }
        
        if (skipped > 0) {
            std::cout << "⚠️  Skipped " << skipped << " assets" << std::endl;
        }
        
        std::cout << "✅ Loaded " << assets_.size() << " shared assets" << std::endl;
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
} // namespace bakery

#endif // BAKERY_ASSET_LOADER_H

