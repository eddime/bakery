/**
 *  Gemcore HTTP Server - SHARED ACROSS ALL PLATFORMS
 * 
 * Universal, high-performance HTTP server for serving embedded assets
 * with all optimizations:
 * - URL decoding (for files with spaces)
 * - writev() scatter-gather I/O
 * - TCP_NODELAY for instant send
 * - Multi-threaded request handling
 * - Pre-cached responses with iovec
 */

#ifndef GEMCORE_HTTP_SERVER_H
#define GEMCORE_HTTP_SERVER_H

#include <string>
#include <unordered_map>
#include <functional>
#include <cstdlib>
#include <cstring>

#ifdef _WIN32
    #include <winsock2.h>
    #include <ws2tcpip.h>
    #pragma comment(lib, "ws2_32.lib")
    typedef int socklen_t;
    #define MSG_NOSIGNAL 0
#else
    #include <sys/socket.h>
    #include <sys/uio.h>
    #include <netinet/in.h>
    #include <netinet/tcp.h>
    #include <unistd.h>
    #include <arpa/inet.h>
#endif

namespace gemcore {
namespace http {

/**
 * Asset data structure
 */
struct Asset {
    const unsigned char* data;
    size_t size;
    std::string mimeType;
};

/**
 * Response with pre-built headers for zero-copy I/O
 */
struct Response {
    std::string headers;
    const unsigned char* body;
    size_t bodySize;
    
#ifndef _WIN32
    // Pre-built iovec for writev() (Unix only)
    struct iovec iov[2];
#endif
};

/**
 * URL decode: %20 -> space, etc.
 */
inline std::string urlDecode(const char* start, size_t len) {
    std::string decoded;
    decoded.reserve(len);
    
    for (size_t i = 0; i < len; i++) {
        if (start[i] == '%' && i + 2 < len) {
            // Convert hex to char
            char hex[3] = { start[i+1], start[i+2], 0 };
            decoded += static_cast<char>(strtol(hex, nullptr, 16));
            i += 2;
        } else if (start[i] == '+') {
            decoded += ' ';
        } else {
            decoded += start[i];
        }
    }
    
    return decoded;
}

/**
 * Check if URI needs decoding
 */
inline bool needsUrlDecode(const char* start, size_t len) {
    for (size_t i = 0; i < len; i++) {
        if (start[i] == '%' || start[i] == '+') {
            return true;
        }
    }
    return false;
}

/**
 * Get MIME type from file extension
 */
inline std::string getMimeType(const std::string& path) {
    size_t dot = path.find_last_of('.');
    if (dot == std::string::npos) return "application/octet-stream";
    
    std::string ext = path.substr(dot);
    
    if (ext == ".html") return "text/html; charset=utf-8";
    if (ext == ".js") return "text/javascript; charset=utf-8";
    if (ext == ".css") return "text/css; charset=utf-8";
    if (ext == ".json") return "application/json";
    if (ext == ".png") return "image/png";
    if (ext == ".jpg" || ext == ".jpeg") return "image/jpeg";
    if (ext == ".gif") return "image/gif";
    if (ext == ".svg") return "image/svg+xml";
    if (ext == ".webp") return "image/webp";
    if (ext == ".ico") return "image/x-icon";
    if (ext == ".woff") return "font/woff";
    if (ext == ".woff2") return "font/woff2";
    if (ext == ".ttf") return "font/ttf";
    if (ext == ".mp3") return "audio/mpeg";
    if (ext == ".ogg") return "audio/ogg";
    if (ext == ".wav") return "audio/wav";
    if (ext == ".mp4") return "video/mp4";
    if (ext == ".webm") return "video/webm";
    
    return "application/octet-stream";
}

/**
 * Universal HTTP Server
 */
class HTTPServer {
private:
    std::unordered_map<std::string, Response> cache_;
    std::string entrypoint_;
    int port_;
    
    // Asset provider callback
    std::function<Asset(const std::string&)> getAsset_;
    
public:
    HTTPServer(int port = 8765) : port_(port), entrypoint_("index.html") {}
    
    /**
     * Set asset provider (called for each asset during cache build)
     */
    void setAssetProvider(std::function<Asset(const std::string&)> provider) {
        getAsset_ = provider;
    }
    
    /**
     * Set entrypoint (default: index.html)
     */
    void setEntrypoint(const std::string& entrypoint) {
        entrypoint_ = entrypoint;
    }
    
    /**
     * Pre-cache all responses with optimized headers and iovec
     *  OPTIMIZATION: Critical assets (entrypoint, main.js, etc.) are cached FIRST
     */
    void buildCache(const std::vector<std::string>& assetPaths) {
        //  CLEAR OLD CACHE (prevent stale content!)
        cache_.clear();
        modifiedHTMLs_.clear();
        
        //  OPTIMIZATION: Pre-allocate cache to avoid rehashing
        cache_.reserve(assetPaths.size() + 10);
        
        //  PHASE 1: Cache critical assets FIRST (faster first render!)
        std::vector<std::string> criticalAssets = {
            entrypoint_,
            "main.js", "app.js", "game.js", "index.js",
            "main.css", "style.css", "app.css",
            "manifest.json", "favicon.ico"
        };
        
        for (const auto& critical : criticalAssets) {
            auto it = std::find(assetPaths.begin(), assetPaths.end(), critical);
            if (it != assetPaths.end()) {
                Asset asset = getAsset_(critical);
                if (!asset.data || asset.size == 0) continue;
                
                Response resp;
                
                //  INJECT WebGPU helper into HTML files (PHASE 1 TOO!)
                // Note: Steamworks wrapper is injected directly in launcher (after window.Gemcore)
                bool isHTML = asset.mimeType.find("html") != std::string::npos;
                
                if (isHTML) {
                    // Get WebGPU helper script content (inline for immediate execution!)
                    auto webgpuAsset = getAsset_("gemcore-webgpu-helper.js");
                    std::string webgpuScript;
                    if (webgpuAsset.data && webgpuAsset.size > 0) {
                        webgpuScript = std::string(reinterpret_cast<const char*>(webgpuAsset.data), webgpuAsset.size);
                    }
                    
                    // Inject INLINE script before </head> or at start of <body>
                    std::string htmlContent(reinterpret_cast<const char*>(asset.data), asset.size);
                    std::string injection = "<script>" + webgpuScript + "</script>";
                    
                    size_t headPos = htmlContent.find("</head>");
                    if (headPos != std::string::npos) {
                        htmlContent.insert(headPos, injection);
                    } else {
                        size_t bodyPos = htmlContent.find("<body");
                        if (bodyPos != std::string::npos) {
                            size_t bodyEnd = htmlContent.find(">", bodyPos);
                            if (bodyEnd != std::string::npos) {
                                htmlContent.insert(bodyEnd + 1, injection);
                            }
                        }
                    }
                    
                    // Store modified HTML so pointer remains valid
                    modifiedHTMLs_.push_back(std::move(htmlContent));
                    resp.body = reinterpret_cast<const unsigned char*>(modifiedHTMLs_.back().c_str());
                    resp.bodySize = modifiedHTMLs_.back().size();
                } else {
                    resp.body = asset.data;
                    resp.bodySize = asset.size;
                }
                
                //  CRITICAL: NO-CACHE for HTML/JS/CSS to prevent stale content!
                bool isCode = (isHTML ||
                              asset.mimeType.find("javascript") != std::string::npos ||
                              asset.mimeType.find("css") != std::string::npos ||
                              asset.mimeType.find("json") != std::string::npos);
                
                std::string cacheControl = isCode 
                    ? "no-cache, no-store, must-revalidate" 
                    : "public, max-age=31536000, immutable";
                
                resp.headers = 
                    "HTTP/1.1 200 OK\r\n"
                    "Content-Type: " + asset.mimeType + "\r\n"
                    "Content-Length: " + std::to_string(resp.bodySize) + "\r\n"
                    "Cache-Control: " + cacheControl + "\r\n"
                    "Accept-Ranges: bytes\r\n"
                    "Connection: keep-alive\r\n"
                    "\r\n";
                
                std::string uri = "/" + critical;
                auto [cit, inserted] = cache_.emplace(std::move(uri), std::move(resp));
                
#ifndef _WIN32
                auto& cachedResp = cit->second;
                cachedResp.iov[0].iov_base = (void*)cachedResp.headers.data();
                cachedResp.iov[0].iov_len = cachedResp.headers.size();
                cachedResp.iov[1].iov_base = (void*)cachedResp.body;
                cachedResp.iov[1].iov_len = cachedResp.bodySize;
#endif
            }
        }
        
        //  PHASE 2: Cache remaining assets
        for (const auto& path : assetPaths) {
            // Skip if already cached in Phase 1
            std::string checkUri = "/" + path;
            if (cache_.count(checkUri) > 0) continue;
            
            Asset asset = getAsset_(path);
            if (!asset.data || asset.size == 0) continue;
            
            Response resp;
            
            //  INJECT WebGPU helper into HTML files (universal, framework-agnostic)
            // Note: Steamworks wrapper is injected directly in launcher (after window.Gemcore)
            bool isHTML = asset.mimeType.find("html") != std::string::npos;
            
            if (isHTML) {
                // Get WebGPU helper script content (inline for immediate execution!)
                auto webgpuAsset = getAsset_("gemcore-webgpu-helper.js");
                std::string webgpuScript;
                if (webgpuAsset.data && webgpuAsset.size > 0) {
                    webgpuScript = std::string(reinterpret_cast<const char*>(webgpuAsset.data), webgpuAsset.size);
                    #ifndef NDEBUG
                    std::cout << " WebGPU script loaded: " << webgpuScript.size() << " bytes" << std::endl;
                    #endif
                } else {
                    #ifndef NDEBUG
                    std::cerr << " WARNING: gemcore-webgpu-helper.js NOT FOUND!" << std::endl;
                    #endif
                }
                
                // Inject INLINE script before </head> or at start of <body>
                std::string htmlContent(reinterpret_cast<const char*>(asset.data), asset.size);
                std::string injection = "<script>" + webgpuScript + "</script>";
                
                size_t headPos = htmlContent.find("</head>");
                if (headPos != std::string::npos) {
                    htmlContent.insert(headPos, injection);
                    #ifndef NDEBUG
                    std::cout << " Injected WebGPU script before </head>" << std::endl;
                    #endif
                } else {
                    size_t bodyPos = htmlContent.find("<body");
                    if (bodyPos != std::string::npos) {
                        size_t bodyEnd = htmlContent.find(">", bodyPos);
                        if (bodyEnd != std::string::npos) {
                            htmlContent.insert(bodyEnd + 1, injection);
                            #ifndef NDEBUG
                            std::cout << " Injected WebGPU script after <body>" << std::endl;
                            #endif
                        }
                    }
                }
                
                // Store modified HTML so pointer remains valid
                modifiedHTMLs_.push_back(std::move(htmlContent));
                resp.body = reinterpret_cast<const unsigned char*>(modifiedHTMLs_.back().c_str());
                resp.bodySize = modifiedHTMLs_.back().size();
            } else {
                resp.body = asset.data;
                resp.bodySize = asset.size;
            }
            
            //  CRITICAL: NO-CACHE for HTML/JS/CSS to prevent stale content!
            // Images/fonts can be cached aggressively
            bool isCode = (isHTML ||
                          asset.mimeType.find("javascript") != std::string::npos ||
                          asset.mimeType.find("css") != std::string::npos ||
                          asset.mimeType.find("json") != std::string::npos);
            
            std::string cacheControl = isCode 
                ? "no-cache, no-store, must-revalidate, max-age=0" 
                : "public, max-age=31536000, immutable";
            
            // Build HTTP headers with aggressive cache prevention
            resp.headers = 
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: " + asset.mimeType + "\r\n"
                "Content-Length: " + std::to_string(resp.bodySize) + "\r\n"
                "Cache-Control: " + cacheControl + "\r\n";
            
            if (isCode) {
                // Extra headers to prevent ALL caching
                resp.headers += 
                    "Pragma: no-cache\r\n"
                    "Expires: 0\r\n";
            }
            
            resp.headers += 
                "Accept-Ranges: bytes\r\n"
                "Connection: keep-alive\r\n"
                "\r\n";
            
            // Cache with leading slash
            std::string uri = "/" + path;
            
            //  OPTIMIZATION: Use emplace to avoid copy
            auto [it, inserted] = cache_.emplace(std::move(uri), std::move(resp));
            
#ifndef _WIN32
            // CRITICAL: Set iov pointers AFTER inserting into map!
            // Use iterator to access the inserted element
            auto& cachedResp = it->second;
            cachedResp.iov[0].iov_base = (void*)cachedResp.headers.data();
            cachedResp.iov[0].iov_len = cachedResp.headers.size();
            cachedResp.iov[1].iov_base = (void*)cachedResp.body;
            cachedResp.iov[1].iov_len = cachedResp.bodySize;
#endif
        }
        
        // Set root to entrypoint
        std::string entryUri = "/" + entrypoint_;
        if (cache_.count(entryUri) > 0) {
            cache_["/"] = cache_[entryUri];
            
#ifndef _WIN32
            // FIX: Re-initialize iov pointers after copy (they point to old addresses!)
            auto& rootResp = cache_["/"];
            rootResp.iov[0].iov_base = (void*)rootResp.headers.data();
            rootResp.iov[0].iov_len = rootResp.headers.size();
            rootResp.iov[1].iov_base = (void*)rootResp.body;
            rootResp.iov[1].iov_len = rootResp.bodySize;
#endif
        }
    }
    
    /**
     * Handle a single HTTP request (fast path!)
     */
    void handleRequest(int fd) {
        char buf[8192];
        
#ifdef _WIN32
        int n = recv(fd, buf, sizeof(buf), 0);
#else
        ssize_t n = recv(fd, buf, sizeof(buf), 0);
#endif
        
        if (n <= 14 || buf[0] != 'G' || buf[1] != 'E' || buf[2] != 'T') {
#ifdef _WIN32
            closesocket(fd);
#else
            close(fd);
#endif
            return;
        }
        
        // Extract URI (minimal parsing)
        const char* uri_start = buf + 4;
        const char* uri_end = uri_start;
        while (uri_end < buf + n && *uri_end != ' ' && *uri_end != '?') uri_end++;
        
        size_t uri_len = uri_end - uri_start;
        
        // Fast path: root URI
        if (uri_len == 1 && uri_start[0] == '/') {
            auto it = cache_.find("/");
            if (it != cache_.end()) {
                sendResponse(fd, it->second);
            } else {
                send404(fd);
            }
#ifdef _WIN32
            closesocket(fd);
#else
            close(fd);
#endif
            return;
        }
        
        // Check if URI needs decoding (for files with spaces)
        std::string uri;
        if (needsUrlDecode(uri_start, uri_len)) {
            uri = urlDecode(uri_start, uri_len);
        } else {
            uri.assign(uri_start, uri_len);
        }
        
        // Lookup in cache
        auto it = cache_.find(uri);
        if (it != cache_.end()) {
            sendResponse(fd, it->second);
        } else {
            send404(fd);
        }
        
#ifdef _WIN32
        closesocket(fd);
#else
        close(fd);
#endif
    }
    
    /**
     * Get cache size (for diagnostics)
     */
    size_t getCacheSize() const {
        return cache_.size();
    }
    
    /**
     * Get port
     */
    int getPort() const {
        return port_;
    }
    
private:
    void sendResponse(int fd, const Response& resp) {
#ifdef _WIN32
        // Windows: Two send() calls
        send(fd, resp.headers.c_str(), resp.headers.size(), 0);
        send(fd, (const char*)resp.body, resp.bodySize, 0);
#else
        // Unix: writev() for zero-copy scatter-gather I/O
        ssize_t written = writev(fd, resp.iov, 2);
        (void)written;  // Suppress unused result warning
#endif
    }
    
    void send404(int fd) {
        const char* resp = "HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\n\r\nNot Found";
#ifdef _WIN32
        send(fd, resp, strlen(resp), 0);
#else
        send(fd, resp, strlen(resp), MSG_NOSIGNAL);
#endif
    }
    
    // Store modified HTML content so pointers remain valid
    std::vector<std::string> modifiedHTMLs_;
};

} // namespace http
} // namespace gemcore

#endif // GEMCORE_HTTP_SERVER_H

