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

# Platform-specific libraries
if(APPLE)
    find_library(WEBKIT_FRAMEWORK WebKit)
    set(WEBVIEW_LIBS ${WEBKIT_FRAMEWORK})
elseif(WIN32)
    set(WEBVIEW_LIBS ole32 oleaut32 uuid gdi32 comctl32)
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
        # Point to webview headers
        include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)
    endif()
endif()

# ==================================================
# CORE LAUNCHERS
# ==================================================

# bakery-launcher: macOS/Linux (BSD sockets, native)
if(UNIX)
    add_executable(bakery-launcher bakery-launcher.cpp)
    target_link_libraries(bakery-launcher ${WEBVIEW_LIBS} nlohmann_json::nlohmann_json pthread)
    
    # ULTRA optimizations
    target_compile_options(bakery-launcher PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    if(APPLE)
        if(CMAKE_OSX_ARCHITECTURES STREQUAL "arm64")
            target_compile_options(bakery-launcher PRIVATE -mcpu=apple-m1)
        else()
            target_compile_options(bakery-launcher PRIVATE -march=native -mtune=native)
        endif()
        target_link_options(bakery-launcher PRIVATE -flto -Wl,-dead_strip)
    else()
        # Linux
        target_compile_options(bakery-launcher PRIVATE -march=native -mtune=native)
        target_link_options(bakery-launcher PRIVATE -flto -Wl,--gc-sections)
    endif()
    
    add_custom_command(TARGET bakery-launcher POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-launcher>
        COMMENT "⚡ Stripping macOS/Linux launcher..."
    )
endif()

# bakery-launcher-headless: Linux headless (no WebView, opens system browser!)
if(UNIX AND NOT APPLE)
    add_executable(bakery-launcher-headless bakery-launcher-headless.cpp)
    target_link_libraries(bakery-launcher-headless pthread nlohmann_json::nlohmann_json)
    
    target_compile_options(bakery-launcher-headless PRIVATE
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    # Only add -march=native for x86_64, not for cross-compile
    if(NOT CMAKE_CROSSCOMPILING AND CMAKE_SYSTEM_PROCESSOR MATCHES "x86_64|amd64")
        target_compile_options(bakery-launcher-headless PRIVATE -march=native -mtune=native)
    endif()
    
    target_link_options(bakery-launcher-headless PRIVATE
        -flto -Wl,--gc-sections -static-libgcc -static-libstdc++
    )
    
    add_custom_command(TARGET bakery-launcher-headless POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-launcher-headless>
        COMMENT "⚡ Stripping headless launcher..."
    )
endif()

# bakery-launcher-windows: Windows (WinSock2, native)
if(WIN32)
    add_executable(bakery-launcher-windows bakery-launcher-windows.cpp)
    target_link_libraries(bakery-launcher-windows ${WEBVIEW_LIBS} nlohmann_json::nlohmann_json ws2_32 shlwapi)
    
    target_compile_options(bakery-launcher-windows PRIVATE 
        -O3 -flto -ffast-math -fomit-frame-pointer
        -ffunction-sections -fdata-sections -DNDEBUG
        -finline-functions -funroll-loops
    )
    
    target_link_options(bakery-launcher-windows PRIVATE -flto -Wl,--gc-sections)
    
    add_custom_command(TARGET bakery-launcher-windows POST_BUILD
        COMMAND ${CMAKE_STRIP} $<TARGET_FILE:bakery-launcher-windows>
        COMMENT "⚡ Stripping Windows launcher..."
    )
endif()

# ==================================================
# UNIVERSAL LAUNCHERS (wrappers for multi-arch)
# ==================================================

# bakery-universal-launcher: macOS Universal Binary launcher
if(APPLE)
    add_executable(bakery-universal-launcher bakery-universal-launcher.cpp)
    target_compile_options(bakery-universal-launcher PRIVATE -O3 -flto)
    target_link_options(bakery-universal-launcher PRIVATE -flto -Wl,-dead_strip)
    add_custom_command(TARGET bakery-universal-launcher POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-universal-launcher>
        COMMENT "⚡ Stripping universal launcher..."
    )
endif()

# bakery-universal-launcher-linux: Linux Universal Binary launcher (AppRun)
if(UNIX AND NOT APPLE)
    add_executable(bakery-universal-launcher-linux bakery-universal-launcher-linux.cpp)
    target_compile_options(bakery-universal-launcher-linux PRIVATE -O3 -flto)
    target_link_options(bakery-universal-launcher-linux PRIVATE -flto -Wl,--gc-sections)
    add_custom_command(TARGET bakery-universal-launcher-linux POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-universal-launcher-linux>
        COMMENT "⚡ Stripping Linux universal launcher..."
    )
endif()

# bakery-universal-launcher-windows: Windows Universal Binary launcher (multi-file)
if(WIN32)
    add_executable(bakery-universal-launcher-windows bakery-universal-launcher-windows.cpp)
    target_compile_options(bakery-universal-launcher-windows PRIVATE -O3 -flto)
    target_link_options(bakery-universal-launcher-windows PRIVATE -flto -static -Wl,--gc-sections)
    add_custom_command(TARGET bakery-universal-launcher-windows POST_BUILD
        COMMAND ${CMAKE_STRIP} $<TARGET_FILE:bakery-universal-launcher-windows>
        COMMENT "⚡ Stripping Windows universal launcher..."
    )
endif()

# bakery-universal-launcher-windows-embedded: Windows single-EXE launcher
if(WIN32)
    add_executable(bakery-universal-launcher-windows-embedded bakery-universal-launcher-windows-embedded.cpp)
    target_compile_options(bakery-universal-launcher-windows-embedded PRIVATE -O3 -flto)
    target_link_options(bakery-universal-launcher-windows-embedded PRIVATE -flto -static -Wl,--gc-sections)
    add_custom_command(TARGET bakery-universal-launcher-windows-embedded POST_BUILD
        COMMAND ${CMAKE_STRIP} $<TARGET_FILE:bakery-universal-launcher-windows-embedded>
        COMMENT "⚡ Stripping Windows embedded launcher..."
    )
endif()

# ==================================================
# SHARED ASSETS MODE (for macOS universal builds)
# ==================================================

if(BAKERY_SHARED_ASSETS AND UNIX)
    add_executable(bakery-launcher-shared bakery-launcher-shared.cpp)
    target_link_libraries(bakery-launcher-shared ${WEBVIEW_LIBS} nlohmann_json::nlohmann_json pthread)
    
    if(APPLE)
        if(CMAKE_OSX_ARCHITECTURES STREQUAL "arm64")
            target_compile_options(bakery-launcher-shared PRIVATE
                -O3 -mcpu=apple-m1 -flto -ffast-math -fomit-frame-pointer
                -ffunction-sections -fdata-sections -DNDEBUG
            )
        else()
            target_compile_options(bakery-launcher-shared PRIVATE
                -O3 -march=native -mtune=native -flto -ffast-math -fomit-frame-pointer
                -ffunction-sections -fdata-sections -DNDEBUG
            )
        endif()
        target_link_options(bakery-launcher-shared PRIVATE -flto -Wl,-dead_strip)
    endif()
    
    add_custom_command(TARGET bakery-launcher-shared POST_BUILD
        COMMAND strip $<TARGET_FILE:bakery-launcher-shared>
        COMMENT "⚡ Stripping shared launcher..."
    )
endif()
