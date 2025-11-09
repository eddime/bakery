/**
 * 🥐 Bakery Asset Loader - SHARED ACROSS ALL PLATFORMS
 * 
 * Loads assets from:
 * 1. Embedded C++ arrays (embedded-assets.h)
 * 2. External binary file (bakery-assets)
 */

#ifndef BAKERY_ASSET_LOADER_H
#define BAKERY_ASSET_LOADER_H

#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>
#include <fstream>
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
     * Load from external bakery-assets file
     */
    bool load() {
        std::string execDir = getExecutableDir();
        std::string assetsPath = execDir + "/bakery-assets";
        
        std::ifstream file(assetsPath, std::ios::binary);
        if (!file) {
            std::cerr << "❌ Failed to open bakery-assets at: " << assetsPath << std::endl;
            return false;
        }
        
        // Read header (asset count)
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
            
            // Read data
            AssetData asset;
            asset.path = path;
            asset.data.resize(static_cast<size_t>(size64));
            file.read((char*)asset.data.data(), asset.data.size());
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

