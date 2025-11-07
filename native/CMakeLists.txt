cmake_minimum_required(VERSION 3.15)
project(bakery-runtime)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Detect platform
if(APPLE)
    set(WEBVIEW_PLATFORM "WEBVIEW_COCOA=1")
    set(WEBVIEW_LIBS "-framework WebKit")
elseif(WIN32)
    set(WEBVIEW_PLATFORM "WEBVIEW_EDGE=1")
    set(WEBVIEW_LIBS "")
elseif(UNIX)
    set(WEBVIEW_PLATFORM "WEBVIEW_GTK=1")
    find_package(PkgConfig REQUIRED)
    pkg_check_modules(WEBKIT2 REQUIRED webkit2gtk-4.0)
    set(WEBVIEW_LIBS ${WEBKIT2_LIBRARIES})
    include_directories(${WEBKIT2_INCLUDE_DIRS})
endif()

# Include webview header
include_directories(${CMAKE_SOURCE_DIR}/../deps/webview)

# Add executable
add_executable(bakery-runtime main.cpp)

# Set webview platform
target_compile_definitions(bakery-runtime PRIVATE ${WEBVIEW_PLATFORM})

# Link libraries
if(APPLE)
    target_link_libraries(bakery-runtime ${WEBVIEW_LIBS})
elseif(WIN32)
    target_link_libraries(bakery-runtime ws2_32 ole32 oleaut32 uuid gdi32)
elseif(UNIX)
    target_link_libraries(bakery-runtime ${WEBVIEW_LIBS} pthread)
endif()

# Set output name based on platform and architecture
if(APPLE)
    if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm64|aarch64")
        set_target_properties(bakery-runtime PROPERTIES OUTPUT_NAME "bakery-darwin-arm64")
    else()
        set_target_properties(bakery-runtime PROPERTIES OUTPUT_NAME "bakery-darwin-x64")
    endif()
elseif(WIN32)
    set_target_properties(bakery-runtime PROPERTIES OUTPUT_NAME "bakery-windows-x64")
elseif(UNIX)
    set_target_properties(bakery-runtime PROPERTIES OUTPUT_NAME "bakery-linux-x64")
endif()

# Strip symbols for smaller binary
if(NOT CMAKE_BUILD_TYPE STREQUAL "Debug")
    if(APPLE OR UNIX)
        target_link_options(bakery-runtime PRIVATE -s)
    endif()
endif()

