/**
 * 🥐 Bakery HTTP Server - SHARED ACROSS ALL PLATFORMS
 * 
 * Universal, high-performance HTTP server for serving embedded assets
 * with all optimizations:
 * - URL decoding (for files with spaces)
 * - writev() scatter-gather I/O
 * - TCP_NODELAY for instant send
 * - Multi-threaded request handling
 * - Pre-cached responses with iovec
 */

#ifndef BAKERY_HTTP_SERVER_H
#define BAKERY_HTTP_SERVER_H

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

namespace bakery {
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
     */
    void buildCache(const std::vector<std::string>& assetPaths) {
        // ⚡ OPTIMIZATION: Pre-allocate cache to avoid rehashing
        cache_.reserve(assetPaths.size() + 10);
        
        for (const auto& path : assetPaths) {
            Asset asset = getAsset_(path);
            if (!asset.data || asset.size == 0) continue;
            
            Response resp;
            resp.body = asset.data;
            resp.bodySize = asset.size;
            
            // Build HTTP headers with aggressive caching
            resp.headers = 
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: " + asset.mimeType + "\r\n"
                "Content-Length: " + std::to_string(asset.size) + "\r\n"
                "Cache-Control: public, max-age=31536000, immutable\r\n"
                "Accept-Ranges: bytes\r\n"
                "Connection: keep-alive\r\n"
                "\r\n";
            
            // Cache with leading slash
            std::string uri = "/" + path;
            
            // ⚡ OPTIMIZATION: Use emplace to avoid copy
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
        writev(fd, resp.iov, 2);
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
};

} // namespace http
} // namespace bakery

#endif // BAKERY_HTTP_SERVER_H

