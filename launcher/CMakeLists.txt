cmake_minimum_required(VERSION 3.15)
project(GemcoreLauncher)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 🎮 Steamworks Support (optional, controlled by build script)
option(ENABLE_STEAMWORKS "Enable Steamworks integration" OFF)

# Architecture detection for macOS
if(APPLE)
    if(NOT DEFINED CMAKE_OSX_ARCHITECTURES OR CMAKE_OSX_ARCHITECTURES STREQUAL "")
        if(NOT DEFINED TARGET_ARCH)
            execute_process(
                COMMAND uname -m
                OUTPUT_VARIABLE TARGET_ARCH
                OUTPUT_STRIP_TRAILING_WHITESPACE
            )
        endif()
        set(CMAKE_OSX_ARCHITECTURES "${TARGET_ARCH}" CACHE STRING "Build architecture" FORCE)
    endif()
    message(STATUS "🎯 Building for macOS ${CMAKE_OSX_ARCHITECTURES}")
endif()

# Add nlohmann/json
include(FetchContent)
FetchContent_Declare(
  json
  URL https://github.com/nlohmann/json/releases/download/v3.11.3/json.tar.xz
)
FetchContent_MakeAvailable(json)

# Include webview.h
include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)

# 🎮 Include Steamworks SDK
include_directories(${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/public)

# 📦 Include shared headers and steamworks
include_directories(${CMAKE_SOURCE_DIR}/shared)
include_directories(${CMAKE_SOURCE_DIR}/steamworks)

# Platform-specific libraries
if(APPLE)
    find_library(WEBKIT_FRAMEWORK WebKit)
    find_library(COREFOUNDATION_FRAMEWORK CoreFoundation)
    set(WEBVIEW_LIBS ${WEBKIT_FRAMEWORK} ${COREFOUNDATION_FRAMEWORK})
elseif(WIN32)
    set(WEBVIEW_LIBS ole32 oleaut32 uuid gdi32 comctl32 shlwapi ws2_32)
elseif(UNIX)
    # 🎯 Neutralino-style: Use system WebKitGTK via pkg-config
    # Exactly like Neutralino: $(pkg-config --cflags --libs gtk+-3.0 glib-2.0 xcb x11 xrandr)
    
    # Detect if we're cross-compiling (different compiler than host)
    set(IS_CROSS_COMPILING FALSE)
    if(CMAKE_CROSSCOMPILING)
        set(IS_CROSS_COMPILING TRUE)
    elseif(CMAKE_C_COMPILER MATCHES "x86_64-linux-gnu" OR CMAKE_CXX_COMPILER MATCHES "x86_64-linux-gnu")
        # Cross-compiling from ARM64 to x64
        set(IS_CROSS_COMPILING TRUE)
    elseif(CMAKE_C_COMPILER MATCHES "aarch64-linux-gnu" OR CMAKE_CXX_COMPILER MATCHES "aarch64-linux-gnu")
        # Cross-compiling from x64 to ARM64
        set(IS_CROSS_COMPILING TRUE)
    endif()
    
    # Use pkg-config for native Linux builds OR cross-compilation with multiarch
    set(USE_PKG_CONFIG FALSE)
    if(CMAKE_SYSTEM_NAME STREQUAL "Linux" AND NOT APPLE)
        set(USE_PKG_CONFIG TRUE)
    endif()
    
    if(USE_PKG_CONFIG)
        # For cross-compilation, try to find cross-pkg-config
        if(IS_CROSS_COMPILING)
            if(CMAKE_C_COMPILER MATCHES "x86_64-linux-gnu")
                find_program(PKG_CONFIG_EXECUTABLE NAMES x86_64-linux-gnu-pkg-config PATHS /usr/bin)
                if(PKG_CONFIG_EXECUTABLE)
                    set(PKG_CONFIG_PATH "/usr/lib/x86_64-linux-gnu/pkgconfig")
                    message(STATUS "🔧 Using cross-pkg-config for x64: ${PKG_CONFIG_EXECUTABLE}")
                else()
                    # Fallback: try setting PKG_CONFIG_PATH manually
                    set(ENV{PKG_CONFIG_PATH} "/usr/lib/x86_64-linux-gnu/pkgconfig")
                    find_package(PkgConfig)
                    if(NOT PkgConfig_FOUND)
                        message(STATUS "⚠️  Cross-pkg-config not found, trying native pkg-config with PKG_CONFIG_PATH")
                        find_package(PkgConfig REQUIRED)
                    endif()
                endif()
            elseif(CMAKE_C_COMPILER MATCHES "aarch64-linux-gnu")
                find_program(PKG_CONFIG_EXECUTABLE NAMES aarch64-linux-gnu-pkg-config PATHS /usr/bin)
                if(PKG_CONFIG_EXECUTABLE)
                    set(PKG_CONFIG_PATH "/usr/lib/aarch64-linux-gnu/pkgconfig")
                    message(STATUS "🔧 Using cross-pkg-config for ARM64: ${PKG_CONFIG_EXECUTABLE}")
                else()
                    set(ENV{PKG_CONFIG_PATH} "/usr/lib/aarch64-linux-gnu/pkgconfig")
                    find_package(PkgConfig REQUIRED)
                endif()
            else()
                find_package(PkgConfig REQUIRED)
            endif()
        else()
            # Native build
            find_package(PkgConfig REQUIRED)
        endif()
    endif()
    
    if(USE_PKG_CONFIG AND PkgConfig_FOUND)
        # Set PKG_CONFIG_PATH for cross-compilation
        if(IS_CROSS_COMPILING AND CMAKE_C_COMPILER MATCHES "x86_64-linux-gnu")
            set(ENV{PKG_CONFIG_PATH} "/usr/lib/x86_64-linux-gnu/pkgconfig")
        elseif(IS_CROSS_COMPILING AND CMAKE_C_COMPILER MATCHES "aarch64-linux-gnu")
            set(ENV{PKG_CONFIG_PATH} "/usr/lib/aarch64-linux-gnu/pkgconfig")
        endif()
        
        # Try webkit2gtk-4.1 first (newer), then fallback to 4.0
        pkg_check_modules(WEBVIEW_GTK gtk+-3.0 glib-2.0 xcb x11 xrandr)
        pkg_check_modules(WEBVIEW_WEBKIT webkit2gtk-4.1)
        if(NOT WEBVIEW_WEBKIT_FOUND)
            pkg_check_modules(WEBVIEW_WEBKIT webkit2gtk-4.0)
        endif()
        
        if(WEBVIEW_GTK_FOUND AND WEBVIEW_WEBKIT_FOUND)
            # Combine all libraries (like Neutralino does)
            set(WEBVIEW_LIBS 
                ${WEBVIEW_GTK_LIBRARIES}
                ${WEBVIEW_WEBKIT_LIBRARIES}
                pthread
                png
                stdc++fs
                dl
            )
            include_directories(${WEBVIEW_GTK_INCLUDE_DIRS})
            include_directories(${WEBVIEW_WEBKIT_INCLUDE_DIRS})
            add_definitions(${WEBVIEW_GTK_CFLAGS_OTHER})
            add_definitions(${WEBVIEW_WEBKIT_CFLAGS_OTHER})
            add_definitions(-DWEBVIEW_GTK)  # Enable WebView support
            message(STATUS "✅ Found system WebKitGTK (Neutralino-style)")
            message(STATUS "   GTK: ${WEBVIEW_GTK_VERSION}")
            message(STATUS "   WebKit: ${WEBVIEW_WEBKIT_VERSION}")
        else()
            message(STATUS "⚠️  WebKitGTK not found - using minimal build (system browser)")
            if(IS_CROSS_COMPILING)
                message(STATUS "💡 Install x64 libraries: sudo apt-get install libgtk-3-dev:amd64 libwebkit2gtk-4.1-dev:amd64")
            else()
                message(STATUS "💡 Install: sudo apt-get install libgtk-3-dev libwebkit2gtk-4.1-dev")
            endif()
            set(WEBVIEW_LIBS "")
            add_definitions(-DWEBVIEW_STATIC)
            include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
        endif()
    else()
        # pkg-config not available
        message(STATUS "⚠️  pkg-config not available - using minimal build (system browser)")
        message(STATUS "💡 For WebKitGTK support, install pkg-config")
        set(WEBVIEW_LIBS "")
        add_definitions(-DWEBVIEW_STATIC)
        include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
    endif()
endif()

# ==================================================
# 🚀 CLEAN ARCHITECTURE: Shared HTTP Server + Asset Loader
# ==================================================
# All launchers use:
# - gemcore-http-server.h (shared HTTP server with URL decode, writev, etc.)
# - gemcore-asset-loader.h (shared asset loading from embedded/file)
# ==================================================

# ==================================================
# macOS Launchers
# ==================================================

if(APPLE)
    # gemcore-launcher-mac: Uses external gemcore-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(gemcore-launcher-mac platforms/mac/gemcore-launcher-mac.cpp steamworks/gemcore-steamworks.cpp)
        target_compile_definitions(gemcore-launcher-mac PRIVATE ENABLE_STEAMWORKS)
        message(STATUS "🎮 Building macOS launcher WITH Steamworks")
    else()
        add_executable(gemcore-launcher-mac platforms/mac/gemcore-launcher-mac.cpp)
        message(STATUS "📦 Building macOS launcher WITHOUT Steamworks")
    endif()
    
    target_link_libraries(gemcore-launcher-mac 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        pthread
    )
    
    # Link Steamworks only if enabled
    if(ENABLE_STEAMWORKS)
        target_link_libraries(gemcore-launcher-mac 
            ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/osx/libsteam_api.dylib
        )
    endif()
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(gemcore-launcher-mac PRIVATE
        <iostream>
        <string>
        <vector>
        <unordered_map>
        <thread>
        <atomic>
        <chrono>
        <fstream>
    )
    
    # MAXIMUM PERFORMANCE optimizations + startup improvements
    target_compile_options(gemcore-launcher-mac PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    if(CMAKE_OSX_ARCHITECTURES STREQUAL "arm64")
        target_compile_options(gemcore-launcher-mac PRIVATE -mcpu=apple-m1)
    elseif(CMAKE_OSX_ARCHITECTURES STREQUAL "x86_64")
        target_compile_options(gemcore-launcher-mac PRIVATE -march=x86-64 -mtune=generic)
    else()
        target_compile_options(gemcore-launcher-mac PRIVATE -march=native -mtune=native)
    endif()
    
    target_link_options(gemcore-launcher-mac PRIVATE -flto -Wl,-dead_strip)
    
    add_custom_command(TARGET gemcore-launcher-mac POST_BUILD
        COMMAND strip $<TARGET_FILE:gemcore-launcher-mac>
        COMMENT "⚡ Stripping macOS launcher..."
    )
    
    # gemcore-universal-launcher: Wrapper that detects architecture and launches correct binary
    add_executable(gemcore-universal-launcher universal/gemcore-universal-launcher.cpp)
    if(CMAKE_OSX_ARCHITECTURES MATCHES "arm64;x86_64|x86_64;arm64")
        set_target_properties(gemcore-universal-launcher PROPERTIES
            OSX_ARCHITECTURES "arm64;x86_64"
        )
    endif()
    
    target_compile_options(gemcore-universal-launcher PRIVATE -O3)
    
    add_custom_command(TARGET gemcore-universal-launcher POST_BUILD
        COMMAND strip $<TARGET_FILE:gemcore-universal-launcher>
        COMMENT "⚡ Stripping universal launcher..."
    )
endif()

# ==================================================
# Windows Launchers (TODO: Refactor to use shared code)
# ==================================================

if(WIN32)
    # gemcore-launcher-win: Uses external gemcore-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(gemcore-launcher-win platforms/win/gemcore-launcher-win.cpp steamworks/gemcore-steamworks.cpp)
        target_compile_definitions(gemcore-launcher-win PRIVATE ENABLE_STEAMWORKS)
        message(STATUS "🎮 Building Windows launcher WITH Steamworks")
    else()
        add_executable(gemcore-launcher-win platforms/win/gemcore-launcher-win.cpp)
        message(STATUS "📦 Building Windows launcher WITHOUT Steamworks")
    endif()
    
    target_include_directories(gemcore-launcher-win PRIVATE
        ${CMAKE_SOURCE_DIR}/../deps/webview2-headers
        ${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
    
    target_link_libraries(gemcore-launcher-win 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        ws2_32 shlwapi ole32 shell32 user32 version winmm
    )
    
    # Link Steamworks only if enabled
    if(ENABLE_STEAMWORKS)
        target_link_libraries(gemcore-launcher-win 
            ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/win64/steam_api64.lib
        )
    endif()
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(gemcore-launcher-win PRIVATE
        <iostream>
        <string>
        <vector>
        <unordered_map>
        <thread>
        <atomic>
        <chrono>
        <fstream>
    )
    
    # MAXIMUM PERFORMANCE optimizations + startup improvements
    if(MSVC)
        target_compile_options(gemcore-launcher-win PRIVATE /O2 /GL /Gy /DNDEBUG)
        target_link_options(gemcore-launcher-win PRIVATE /LTCG /OPT:REF /OPT:ICF)
    else()
        # MinGW/GCC - SIZE OPTIMIZATION
        target_compile_options(gemcore-launcher-win PRIVATE 
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(gemcore-launcher-win PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for Windows (no DLL dependencies)
        )
        
        add_custom_command(TARGET gemcore-launcher-win POST_BUILD
            COMMAND x86_64-w64-mingw32-strip $<TARGET_FILE:gemcore-launcher-win>
            COMMENT "⚡ Stripping Windows launcher..."
        )
    endif()
    
    # gemcore-universal-launcher-windows-embedded: Single EXE with embedded binaries
    add_executable(gemcore-universal-launcher-windows-embedded universal/gemcore-universal-launcher-windows-embedded.cpp)
    target_link_libraries(gemcore-universal-launcher-windows-embedded shlwapi)
    if(MSVC)
        target_compile_options(gemcore-universal-launcher-windows-embedded PRIVATE /O2)
    else()
        # MinGW: Optimize for size
        target_compile_options(gemcore-universal-launcher-windows-embedded PRIVATE 
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(gemcore-universal-launcher-windows-embedded PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for Windows (no DLL dependencies)
        )
        
        # Strip debug symbols
        add_custom_command(TARGET gemcore-universal-launcher-windows-embedded POST_BUILD
            COMMAND x86_64-w64-mingw32-strip $<TARGET_FILE:gemcore-universal-launcher-windows-embedded>
            COMMENT "⚡ Stripping embedded launcher..."
        )
    endif()
endif()

# ==================================================
# Linux Launcher (WebKitGTK WebView - like Neutralino)
# ==================================================

if(UNIX AND NOT APPLE)
    # gemcore-launcher-linux: Uses external gemcore-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(gemcore-launcher-linux 
            platforms/linux/gemcore-launcher-linux.cpp 
            steamworks/gemcore-steamworks.cpp
            steamworks/steam-api-stubs.cpp  # Weak symbols for cross-compilation
        )
        target_compile_definitions(gemcore-launcher-linux PRIVATE ENABLE_STEAMWORKS STEAM_API_NODLL)
        message(STATUS "🎮 Building Linux launcher WITH Steamworks")
    else()
        add_executable(gemcore-launcher-linux platforms/linux/gemcore-launcher-linux.cpp)
        message(STATUS "📦 Building Linux launcher WITHOUT Steamworks")
    endif()
    
    target_link_libraries(gemcore-launcher-linux 
        ${WEBVIEW_LIBS}
        nlohmann_json::nlohmann_json 
        pthread
        dl
    )
    
    # 🔧 Cross-compilation: Force x86_64 headers when cross-compiling from ARM64
    if(IS_CROSS_COMPILING AND CMAKE_C_COMPILER MATCHES "x86_64-linux-gnu")
        # With -nostdinc, we need to add x86_64 paths explicitly
        # Order matters: C++ paths first, then C paths
        # CRITICAL: Do NOT add /usr/include - it contains ARM64 headers!
        target_include_directories(gemcore-launcher-linux PRIVATE
            /usr/x86_64-linux-gnu/include/c++/15
            /usr/x86_64-linux-gnu/include/x86_64-linux-gnu/c++/15
            /usr/x86_64-linux-gnu/include/c++/15/x86_64-linux-gnu
            /usr/x86_64-linux-gnu/include
            /usr/include/x86_64-linux-gnu
        )
        # Explicitly exclude /usr/include to prevent ARM64 header inclusion
        target_compile_options(gemcore-launcher-linux PRIVATE
            -Wno-unused-command-line-argument
        )
        message(STATUS "🔧 Cross-compiling: Using x86_64 headers with -nostdinc (excluding /usr/include)")
    endif()
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(gemcore-launcher-linux PRIVATE
        <iostream>
        <string>
        <vector>
        <unordered_map>
        <thread>
        <atomic>
        <chrono>
        <fstream>
    )
    
    if(NOT DEFINED TARGET_ARCH OR TARGET_ARCH STREQUAL "")
        execute_process(
            COMMAND uname -m
            OUTPUT_VARIABLE TARGET_ARCH
            OUTPUT_STRIP_TRAILING_WHITESPACE
        )
    endif()
    
    # MAXIMUM PERFORMANCE optimizations + startup improvements
    target_compile_options(gemcore-launcher-linux PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    # Only use -march=native if not cross-compiling
    if(CMAKE_SYSTEM_PROCESSOR STREQUAL CMAKE_HOST_SYSTEM_PROCESSOR)
        target_compile_options(gemcore-launcher-linux PRIVATE -march=native -mtune=native)
    endif()
    
    target_link_options(gemcore-launcher-linux PRIVATE 
        -flto 
        -Wl,--gc-sections
        # Note: Can't use -static-libstdc++ -static-libgcc because we link dynamically to Steam
    )
    
    # Strip debug symbols (use llvm-strip for cross-compilation)
    find_program(LLVM_STRIP llvm-strip)
    if(LLVM_STRIP)
        add_custom_command(TARGET gemcore-launcher-linux POST_BUILD
            COMMAND ${LLVM_STRIP} --strip-all $<TARGET_FILE:gemcore-launcher-linux>
            COMMENT "⚡ Stripping Linux launcher with llvm-strip..."
        )
    else()
        # Fallback to regular strip (might not work for cross-compilation)
        add_custom_command(TARGET gemcore-launcher-linux POST_BUILD
            COMMAND strip $<TARGET_FILE:gemcore-launcher-linux> 2>/dev/null || true
            COMMENT "⚡ Stripping Linux launcher..."
        )
    endif()
    
    # gemcore-universal-launcher-linux: Wrapper that detects architecture (OLD - NOT USED)
    add_executable(gemcore-universal-launcher-linux universal/gemcore-universal-launcher-linux.cpp)
    target_link_libraries(gemcore-universal-launcher-linux)
    target_compile_options(gemcore-universal-launcher-linux PRIVATE -O2)
    
    add_custom_command(TARGET gemcore-universal-launcher-linux POST_BUILD
        COMMAND strip $<TARGET_FILE:gemcore-universal-launcher-linux>
        COMMENT "⚡ Stripping universal launcher..."
    )
    
    # gemcore-universal-launcher-linux-embedded: Extracts embedded resources (NEW!)
    if(BUILD_UNIVERSAL_LAUNCHER_LINUX)
        add_executable(gemcore-universal-launcher-linux-embedded universal/gemcore-universal-launcher-linux-embedded.cpp)
        target_link_libraries(gemcore-universal-launcher-linux-embedded)
        
        # Minimal size optimizations
        target_compile_options(gemcore-universal-launcher-linux-embedded PRIVATE
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(gemcore-universal-launcher-linux-embedded PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for single executable (no .so dependencies)
        )
        
        # Strip debug symbols (use cross-compiler strip for cross-compilation)
        if(CMAKE_CROSSCOMPILING AND CMAKE_STRIP)
            # Cross-compiling: use toolchain strip (e.g., x86_64-linux-musl-strip)
            add_custom_command(TARGET gemcore-universal-launcher-linux-embedded POST_BUILD
                COMMAND ${CMAKE_STRIP} --strip-all $<TARGET_FILE:gemcore-universal-launcher-linux-embedded>
                COMMENT "⚡ Stripping embedded launcher with ${CMAKE_STRIP}..."
            )
        else()
            # Native build: try llvm-strip first, then strip
            find_program(LLVM_STRIP llvm-strip)
            if(LLVM_STRIP)
                add_custom_command(TARGET gemcore-universal-launcher-linux-embedded POST_BUILD
                    COMMAND ${LLVM_STRIP} --strip-all $<TARGET_FILE:gemcore-universal-launcher-linux-embedded>
                    COMMENT "⚡ Stripping embedded launcher with llvm-strip..."
                )
            else()
                add_custom_command(TARGET gemcore-universal-launcher-linux-embedded POST_BUILD
                    COMMAND strip $<TARGET_FILE:gemcore-universal-launcher-linux-embedded> 2>/dev/null || true
                    COMMENT "⚡ Stripping embedded launcher..."
                )
            endif()
        endif()
    endif()
endif()

