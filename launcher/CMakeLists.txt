cmake_minimum_required(VERSION 3.15)
project(BakeryLauncher)

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
    
    # Only use pkg-config on native Linux builds (not cross-compilation from macOS)
    # Skip pkg-config if we're on macOS (cross-compiling) or if CMAKE_CROSSCOMPILING is set
    set(USE_PKG_CONFIG FALSE)
    if(CMAKE_SYSTEM_NAME STREQUAL "Linux" AND NOT APPLE AND NOT CMAKE_CROSSCOMPILING)
        set(USE_PKG_CONFIG TRUE)
    endif()
    
    if(USE_PKG_CONFIG)
        find_package(PkgConfig REQUIRED)
    endif()
    
    if(USE_PKG_CONFIG AND PkgConfig_FOUND)
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
            message(STATUS "💡 Install: sudo apt-get install libgtk-3-dev libwebkit2gtk-4.1-dev")
            set(WEBVIEW_LIBS "")
            add_definitions(-DWEBVIEW_STATIC)
            include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
        endif()
    else()
        # Cross-compilation or pkg-config not available
        message(STATUS "⚠️  pkg-config not available - using minimal build (system browser)")
        message(STATUS "💡 For WebKitGTK support, build on Linux or install pkg-config")
        set(WEBVIEW_LIBS "")
        add_definitions(-DWEBVIEW_STATIC)
        include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
    endif()
endif()

# ==================================================
# 🚀 CLEAN ARCHITECTURE: Shared HTTP Server + Asset Loader
# ==================================================
# All launchers use:
# - bakery-http-server.h (shared HTTP server with URL decode, writev, etc.)
# - bakery-asset-loader.h (shared asset loading from embedded/file)
# ==================================================

# ==================================================
# macOS Launchers
# ==================================================

if(APPLE)
    # bakery-launcher-mac: Uses external bakery-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(bakery-launcher-mac platforms/mac/bakery-launcher-mac.cpp steamworks/bakery-steamworks.cpp)
        target_compile_definitions(bakery-launcher-mac PRIVATE ENABLE_STEAMWORKS)
        message(STATUS "🎮 Building macOS launcher WITH Steamworks")
    else()
        add_executable(bakery-launcher-mac platforms/mac/bakery-launcher-mac.cpp)
        message(STATUS "📦 Building macOS launcher WITHOUT Steamworks")
    endif()
    
    target_link_libraries(bakery-launcher-mac 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        pthread
    )
    
    # Link Steamworks only if enabled
    if(ENABLE_STEAMWORKS)
        target_link_libraries(bakery-launcher-mac 
            ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/osx/libsteam_api.dylib
        )
    endif()
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(bakery-launcher-mac PRIVATE
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
    target_compile_options(bakery-launcher-mac PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    if(CMAKE_OSX_ARCHITECTURES STREQUAL "arm64")
        target_compile_options(bakery-launcher-mac PRIVATE -mcpu=apple-m1)
    elseif(CMAKE_OSX_ARCHITECTURES STREQUAL "x86_64")
        target_compile_options(bakery-launcher-mac PRIVATE -march=x86-64 -mtune=generic)
    else()
        target_compile_options(bakery-launcher-mac PRIVATE -march=native -mtune=native)
    endif()
    
    target_link_options(bakery-launcher-mac PRIVATE -flto -Wl,-dead_strip)
    
    add_custom_command(TARGET bakery-launcher-mac POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-launcher-mac>
        COMMENT "⚡ Stripping macOS launcher..."
    )
    
    # bakery-universal-launcher: Wrapper that detects architecture and launches correct binary
    add_executable(bakery-universal-launcher universal/bakery-universal-launcher.cpp)
    if(CMAKE_OSX_ARCHITECTURES MATCHES "arm64;x86_64|x86_64;arm64")
        set_target_properties(bakery-universal-launcher PROPERTIES
            OSX_ARCHITECTURES "arm64;x86_64"
        )
    endif()
    
    target_compile_options(bakery-universal-launcher PRIVATE -O3)
    
    add_custom_command(TARGET bakery-universal-launcher POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-universal-launcher>
        COMMENT "⚡ Stripping universal launcher..."
    )
endif()

# ==================================================
# Windows Launchers (TODO: Refactor to use shared code)
# ==================================================

if(WIN32)
    # bakery-launcher-win: Uses external bakery-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(bakery-launcher-win platforms/win/bakery-launcher-win.cpp steamworks/bakery-steamworks.cpp)
        target_compile_definitions(bakery-launcher-win PRIVATE ENABLE_STEAMWORKS)
        message(STATUS "🎮 Building Windows launcher WITH Steamworks")
    else()
        add_executable(bakery-launcher-win platforms/win/bakery-launcher-win.cpp)
        message(STATUS "📦 Building Windows launcher WITHOUT Steamworks")
    endif()
    
    target_include_directories(bakery-launcher-win PRIVATE
        ${CMAKE_SOURCE_DIR}/deps/webview/core/include/webview/detail/platform/windows/webview2-headers
        ${CMAKE_SOURCE_DIR}/deps/webview/core/include)
    
    target_link_libraries(bakery-launcher-win 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        ws2_32 shlwapi ole32 shell32 user32 version winmm
    )
    
    # Link Steamworks only if enabled
    if(ENABLE_STEAMWORKS)
        target_link_libraries(bakery-launcher-win 
            ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/win64/steam_api64.lib
        )
    endif()
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(bakery-launcher-win PRIVATE
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
        target_compile_options(bakery-launcher-win PRIVATE /O2 /GL /Gy /DNDEBUG)
        target_link_options(bakery-launcher-win PRIVATE /LTCG /OPT:REF /OPT:ICF)
    else()
        # MinGW/GCC - SIZE OPTIMIZATION
        target_compile_options(bakery-launcher-win PRIVATE 
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(bakery-launcher-win PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for Windows (no DLL dependencies)
        )
        
        add_custom_command(TARGET bakery-launcher-win POST_BUILD
            COMMAND x86_64-w64-mingw32-strip $<TARGET_FILE:bakery-launcher-win>
            COMMENT "⚡ Stripping Windows launcher..."
        )
    endif()
    
    # bakery-universal-launcher-windows-embedded: Single EXE with embedded binaries
    add_executable(bakery-universal-launcher-windows-embedded universal/bakery-universal-launcher-windows-embedded.cpp)
    target_link_libraries(bakery-universal-launcher-windows-embedded shlwapi)
    if(MSVC)
        target_compile_options(bakery-universal-launcher-windows-embedded PRIVATE /O2)
    else()
        # MinGW: Optimize for size
        target_compile_options(bakery-universal-launcher-windows-embedded PRIVATE 
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(bakery-universal-launcher-windows-embedded PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for Windows (no DLL dependencies)
        )
        
        # Strip debug symbols
        add_custom_command(TARGET bakery-universal-launcher-windows-embedded POST_BUILD
            COMMAND x86_64-w64-mingw32-strip $<TARGET_FILE:bakery-universal-launcher-windows-embedded>
            COMMENT "⚡ Stripping embedded launcher..."
        )
    endif()
endif()

# ==================================================
# Linux Launcher (WebKitGTK WebView - like Neutralino)
# ==================================================

if(UNIX AND NOT APPLE)
    # bakery-launcher-linux: Uses external bakery-assets file (universal for all games!)
    if(ENABLE_STEAMWORKS)
        add_executable(bakery-launcher-linux 
            platforms/linux/bakery-launcher-linux.cpp 
            steamworks/bakery-steamworks.cpp
            steamworks/steam-api-stubs.cpp  # Weak symbols for cross-compilation
        )
        target_compile_definitions(bakery-launcher-linux PRIVATE ENABLE_STEAMWORKS STEAM_API_NODLL)
        message(STATUS "🎮 Building Linux launcher WITH Steamworks")
    else()
        add_executable(bakery-launcher-linux platforms/linux/bakery-launcher-linux.cpp)
        message(STATUS "📦 Building Linux launcher WITHOUT Steamworks")
    endif()
    
    target_link_libraries(bakery-launcher-linux 
        ${WEBVIEW_LIBS}
        nlohmann_json::nlohmann_json 
        pthread
        dl
    )
    
    # Like Neutralino: Use -no-pie for Linux binaries (works on all distros!)
    # Position Independent Executable flag
    target_link_options(bakery-launcher-linux PRIVATE 
        -no-pie
    )
    message(STATUS "🔗 Using -no-pie (like Neutralino, works on all Linux distros)")
    
    # ⚡ OPTIMIZATION: Precompiled headers for faster builds
    target_precompile_headers(bakery-launcher-linux PRIVATE
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
    
    # Like Neutralino: Simple optimization flags
    target_compile_options(bakery-launcher-linux PRIVATE
        -Os  # Optimize for size (like Neutralino)
        -DNDEBUG
    )
    
    target_link_options(bakery-launcher-linux PRIVATE 
        -Wl,--gc-sections
    )
    
    # Strip debug symbols (use llvm-strip for cross-compilation)
    find_program(LLVM_STRIP llvm-strip)
    if(LLVM_STRIP)
        add_custom_command(TARGET bakery-launcher-linux POST_BUILD
            COMMAND ${LLVM_STRIP} --strip-all $<TARGET_FILE:bakery-launcher-linux>
            COMMENT "⚡ Stripping Linux launcher with llvm-strip..."
        )
    else()
        # Fallback to regular strip (might not work for cross-compilation)
        add_custom_command(TARGET bakery-launcher-linux POST_BUILD
            COMMAND strip $<TARGET_FILE:bakery-launcher-linux> 2>/dev/null || true
            COMMENT "⚡ Stripping Linux launcher..."
        )
    endif()
    
    # bakery-universal-launcher-linux: Wrapper that detects architecture (OLD - NOT USED)
    add_executable(bakery-universal-launcher-linux universal/bakery-universal-launcher-linux.cpp)
    target_link_libraries(bakery-universal-launcher-linux)
    target_compile_options(bakery-universal-launcher-linux PRIVATE -O2)
    
    add_custom_command(TARGET bakery-universal-launcher-linux POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-universal-launcher-linux>
        COMMENT "⚡ Stripping universal launcher..."
    )
    
    # bakery-universal-launcher-linux-embedded: Extracts embedded resources (NEW!)
    if(BUILD_UNIVERSAL_LAUNCHER_LINUX)
        add_executable(bakery-universal-launcher-linux-embedded universal/bakery-universal-launcher-linux-embedded.cpp)
        target_link_libraries(bakery-universal-launcher-linux-embedded)
        
        # Minimal size optimizations
        target_compile_options(bakery-universal-launcher-linux-embedded PRIVATE
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(bakery-universal-launcher-linux-embedded PRIVATE 
            -Wl,--gc-sections
            -no-pie  # Like Neutralino: Position Independent Executable (works on all Linux distros!)
        )
        
        # Strip debug symbols (use cross-compiler strip for cross-compilation)
        if(CMAKE_CROSSCOMPILING AND CMAKE_STRIP)
            # Cross-compiling: use toolchain strip (e.g., x86_64-linux-musl-strip)
            add_custom_command(TARGET bakery-universal-launcher-linux-embedded POST_BUILD
                COMMAND ${CMAKE_STRIP} --strip-all $<TARGET_FILE:bakery-universal-launcher-linux-embedded>
                COMMENT "⚡ Stripping embedded launcher with ${CMAKE_STRIP}..."
            )
        else()
            # Native build: try llvm-strip first, then strip
            find_program(LLVM_STRIP llvm-strip)
            if(LLVM_STRIP)
                add_custom_command(TARGET bakery-universal-launcher-linux-embedded POST_BUILD
                    COMMAND ${LLVM_STRIP} --strip-all $<TARGET_FILE:bakery-universal-launcher-linux-embedded>
                    COMMENT "⚡ Stripping embedded launcher with llvm-strip..."
                )
            else()
                add_custom_command(TARGET bakery-universal-launcher-linux-embedded POST_BUILD
                    COMMAND strip $<TARGET_FILE:bakery-universal-launcher-linux-embedded> 2>/dev/null || true
                    COMMENT "⚡ Stripping embedded launcher..."
                )
            endif()
        endif()
    endif()
endif()

