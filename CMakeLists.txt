cmake_minimum_required(VERSION 3.20)
project(zippy VERSION 0.1.0 LANGUAGES C CXX)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Build options
option(ZIPPY_BUILD_SHARED "Build shared library" OFF)
option(ZIPPY_ENABLE_LTO "Enable Link Time Optimization" ON)
option(ZIPPY_STRIP_BINARY "Strip debug symbols for smaller binary" ON)

# Platform detection
if(APPLE)
    set(ZIPPY_PLATFORM "darwin")
elseif(WIN32)
    set(ZIPPY_PLATFORM "windows")
else()
    set(ZIPPY_PLATFORM "linux")
endif()

# Architecture detection
if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm64|aarch64|ARM64")
    set(ZIPPY_ARCH "arm64")
elseif(CMAKE_SYSTEM_PROCESSOR MATCHES "x86_64|AMD64")
    set(ZIPPY_ARCH "x64")
else()
    message(FATAL_ERROR "Unsupported architecture: ${CMAKE_SYSTEM_PROCESSOR}")
endif()

message(STATUS "Building Zippy for ${ZIPPY_PLATFORM}-${ZIPPY_ARCH}")

# Dependencies
add_subdirectory(deps/txiki.js EXCLUDE_FROM_ALL)

# Webview library
find_library(WEBVIEW_LIBRARY 
    NAMES webview libwebview
    PATHS ${CMAKE_SOURCE_DIR}/deps/webview/build
    NO_DEFAULT_PATH
)

if(NOT WEBVIEW_LIBRARY)
    message(STATUS "WebView library not found, will build from source")
    add_subdirectory(deps/webview)
endif()

# Zippy runtime library
add_library(zippy_runtime STATIC
    src/runtime/txiki_wrapper.c
    src/webview/webview_ffi.c
    src/ipc/zero_copy.c
    src/api/app.c
    src/api/window.c
)

target_include_directories(zippy_runtime PUBLIC
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_SOURCE_DIR}/deps/txiki.js/include
    ${CMAKE_SOURCE_DIR}/deps/webview
)

target_link_libraries(zippy_runtime
    txiki
    ${WEBVIEW_LIBRARY}
)

# Zippy executable
add_executable(zippy
    src/main.c
)

target_link_libraries(zippy
    zippy_runtime
)

# Link Time Optimization
if(ZIPPY_ENABLE_LTO)
    set_property(TARGET zippy PROPERTY INTERPROCEDURAL_OPTIMIZATION TRUE)
    set_property(TARGET zippy_runtime PROPERTY INTERPROCEDURAL_OPTIMIZATION TRUE)
endif()

# Strip binary for release builds
if(ZIPPY_STRIP_BINARY AND CMAKE_BUILD_TYPE STREQUAL "Release")
    if(APPLE)
        add_custom_command(TARGET zippy POST_BUILD
            COMMAND strip -x $<TARGET_FILE:zippy>
            COMMENT "Stripping debug symbols (macOS)"
        )
    elseif(UNIX)
        add_custom_command(TARGET zippy POST_BUILD
            COMMAND strip --strip-all $<TARGET_FILE:zippy>
            COMMENT "Stripping debug symbols (Linux)"
        )
    elseif(WIN32)
        add_custom_command(TARGET zippy POST_BUILD
            COMMAND ${CMAKE_STRIP} --strip-all $<TARGET_FILE:zippy>
            COMMENT "Stripping debug symbols (Windows)"
        )
    endif()
endif()

# Installation
install(TARGETS zippy
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
)

# Runtime bundles for cross-compilation
install(DIRECTORY ${CMAKE_BINARY_DIR}/
    DESTINATION runtimes/${ZIPPY_PLATFORM}-${ZIPPY_ARCH}
    FILES_MATCHING PATTERN "zippy*"
)

