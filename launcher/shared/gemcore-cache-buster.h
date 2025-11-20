/**
 * 🥐 Gemcore Cache Buster
 * Shared utility to generate cache-busting timestamps
 */

#ifndef GEMCORE_CACHE_BUSTER_H
#define GEMCORE_CACHE_BUSTER_H

#include <string>
#include <ctime>

namespace gemcore {
    /**
     * Generate a cache-busting timestamp string
     * Uses current Unix timestamp to ensure fresh loads on every build
     */
    inline std::string getCacheBuster() {
        return std::to_string(std::time(nullptr));
    }
}

#endif // GEMCORE_CACHE_BUSTER_H

