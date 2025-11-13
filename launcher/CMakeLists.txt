cmake_minimum_required(VERSION 3.15)
project(BakeryLauncher)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

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

# Platform-specific libraries
if(APPLE)
    find_library(WEBKIT_FRAMEWORK WebKit)
    find_library(COREFOUNDATION_FRAMEWORK CoreFoundation)
    set(WEBVIEW_LIBS ${WEBKIT_FRAMEWORK} ${COREFOUNDATION_FRAMEWORK})
elseif(WIN32)
    set(WEBVIEW_LIBS ole32 oleaut32 uuid gdi32 comctl32 shlwapi ws2_32)
elseif(UNIX)
    # Try to find GTK/WebKit via pkg-config (for native Linux builds)
    find_package(PkgConfig)
    if(PkgConfig_FOUND AND NOT DEFINED WEBVIEW_LIBRARIES)
        pkg_check_modules(WEBVIEW gtk+-3.0 webkit2gtk-4.0)
        if(WEBVIEW_FOUND)
            set(WEBVIEW_LIBS ${WEBVIEW_LIBRARIES})
            include_directories(${WEBVIEW_INCLUDE_DIRS})
            message(STATUS "✅ Found GTK/WebKit2GTK")
        else()
            message(STATUS "⚠️  GTK/WebKit2GTK not found - using minimal build")
            set(WEBVIEW_LIBS "")
            add_definitions(-DWEBVIEW_STATIC)
        endif()
    else()
        # Cross-compile mode - skip WebView headers
        message(STATUS "🔨 Cross-compile mode - minimal WebView")
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
    add_executable(bakery-launcher-mac bakery-launcher-mac.cpp bakery-steamworks.cpp)
    
    # 🎮 Link Steamworks SDK
    target_link_libraries(bakery-launcher-mac 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        pthread
        ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/osx/libsteam_api.dylib
    )
    
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
    add_executable(bakery-universal-launcher bakery-universal-launcher.cpp)
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
    add_executable(bakery-launcher-win bakery-launcher-win.cpp bakery-steamworks.cpp)
    target_include_directories(bakery-launcher-win PRIVATE
        ${CMAKE_SOURCE_DIR}/deps/webview/core/include/webview/detail/platform/windows/webview2-headers
        ${CMAKE_SOURCE_DIR}/deps/webview/core/include)
    
    # 🎮 Link Steamworks SDK
    target_link_libraries(bakery-launcher-win 
        ${WEBVIEW_LIBS} 
        nlohmann_json::nlohmann_json 
        ws2_32 shlwapi ole32 shell32 user32 version winmm
        ${CMAKE_SOURCE_DIR}/../deps/steamworks/sdk/redistributable_bin/win64/steam_api64.lib
    )
    
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
    add_executable(bakery-universal-launcher-windows-embedded bakery-universal-launcher-windows-embedded.cpp)
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
# Linux Launcher (Headless - opens system browser)
# ==================================================

if(UNIX AND NOT APPLE)
    # bakery-launcher-linux: Uses external bakery-assets file (universal for all games!)
    add_executable(bakery-launcher-linux 
        bakery-launcher-linux.cpp 
        bakery-steamworks.cpp
        steam-api-stubs.cpp  # Weak symbols for cross-compilation
    )
    
    # 🎮 Steamworks SDK
    # Uses weak symbols to allow linking without libsteam_api.so
    # At runtime, if Steam library is available, it will be used
    target_compile_definitions(bakery-launcher-linux PRIVATE STEAM_API_NODLL)
    
    target_link_libraries(bakery-launcher-linux 
        nlohmann_json::nlohmann_json 
        pthread
        dl
    )
    
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
    
    # MAXIMUM PERFORMANCE optimizations + startup improvements
    target_compile_options(bakery-launcher-linux PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    # Only use -march=native if not cross-compiling
    if(CMAKE_SYSTEM_PROCESSOR STREQUAL CMAKE_HOST_SYSTEM_PROCESSOR)
        target_compile_options(bakery-launcher-linux PRIVATE -march=native -mtune=native)
    endif()
    
    target_link_options(bakery-launcher-linux PRIVATE 
        -flto 
        -Wl,--gc-sections
        # Note: Can't use -static-libstdc++ -static-libgcc because we link dynamically to Steam
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
    add_executable(bakery-universal-launcher-linux bakery-universal-launcher-linux.cpp)
    target_link_libraries(bakery-universal-launcher-linux)
    target_compile_options(bakery-universal-launcher-linux PRIVATE -O2)
    
    add_custom_command(TARGET bakery-universal-launcher-linux POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-universal-launcher-linux>
        COMMENT "⚡ Stripping universal launcher..."
    )
    
    # bakery-universal-launcher-linux-embedded: Extracts embedded resources (NEW!)
    if(BUILD_UNIVERSAL_LAUNCHER_LINUX)
        add_executable(bakery-universal-launcher-linux-embedded bakery-universal-launcher-linux-embedded.cpp)
        target_link_libraries(bakery-universal-launcher-linux-embedded)
        
        # Minimal size optimizations
        target_compile_options(bakery-universal-launcher-linux-embedded PRIVATE
            -Os -DNDEBUG
            -ffunction-sections -fdata-sections
        )
        target_link_options(bakery-universal-launcher-linux-embedded PRIVATE 
            -Wl,--gc-sections
            -static-libstdc++ -static-libgcc  # Required for single executable (no .so dependencies)
        )
        
        # Strip debug symbols
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

