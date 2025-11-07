cmake_minimum_required(VERSION 3.15)
project(BakeryLauncher)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add nlohmann/json for JSON parsing
include(FetchContent)
FetchContent_Declare(
  json
  URL https://github.com/nlohmann/json/releases/download/v3.11.3/json.tar.xz
)
FetchContent_MakeAvailable(json)

# Include webview.h from deps
include_directories(${CMAKE_SOURCE_DIR}/../deps/webview/core/include)

# Platform-specific libraries for webview
if(APPLE)
    find_library(WEBKIT_FRAMEWORK WebKit)
    set(WEBVIEW_LIBS ${WEBKIT_FRAMEWORK})
elseif(WIN32)
    set(WEBVIEW_LIBS ole32 oleaut32 uuid gdi32 comctl32)
elseif(UNIX)
    find_package(PkgConfig REQUIRED)
    pkg_check_modules(WEBVIEW REQUIRED gtk+-3.0 webkit2gtk-4.0)
    set(WEBVIEW_LIBS ${WEBVIEW_LIBRARIES})
    include_directories(${WEBVIEW_INCLUDE_DIRS})
endif()

# Main executables
add_executable(bakery-launcher
  launcher.cpp
)

add_executable(bakery-launcher-postject
  launcher-postject.cpp
)

add_executable(bakery-native
  bakery-native.cpp
)

add_executable(test-native-simple
  test-native-simple.cpp
)

add_executable(test-inline
  test-inline.cpp
)

add_executable(test-with-config
  test-with-config.cpp
)

add_executable(bakery-native-final
  bakery-native-final.cpp
)

add_executable(bakery-simple
  bakery-simple.cpp
)

add_executable(bakery-dev
  bakery-dev.cpp
)

# Link JSON library
target_link_libraries(bakery-launcher PRIVATE nlohmann_json::nlohmann_json)
target_link_libraries(bakery-launcher-postject PRIVATE nlohmann_json::nlohmann_json)

# Link webview libraries for bakery-native and tests
target_link_libraries(bakery-native PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(test-native-simple PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(test-inline PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(test-with-config PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(bakery-native-final PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(bakery-simple PRIVATE ${WEBVIEW_LIBS})
target_link_libraries(bakery-dev PRIVATE ${WEBVIEW_LIBS})

# Link JSON for config parsing
target_link_libraries(bakery-native-final PRIVATE nlohmann_json::nlohmann_json)
target_link_libraries(bakery-simple PRIVATE nlohmann_json::nlohmann_json)
target_link_libraries(bakery-dev PRIVATE nlohmann_json::nlohmann_json)

# Aggressive optimization flags for maximum performance
if(CMAKE_BUILD_TYPE STREQUAL "Release")
  # Maximum optimization
  target_compile_options(bakery-launcher PRIVATE 
    -O3                    # Maximum optimization
    -march=native          # CPU-specific optimizations
    -flto                  # Link-Time Optimization
    -ffast-math           # Fast math operations
    -DNDEBUG              # Disable assertions
  )
  
  target_compile_options(bakery-launcher-postject PRIVATE 
    -O3 
    -march=native 
    -flto
    -ffast-math
    -DNDEBUG
  )
  
  # Link-time optimization
  target_link_options(bakery-launcher PRIVATE -flto)
  target_link_options(bakery-launcher-postject PRIVATE -flto)
  
  # Strip on build
  add_custom_command(TARGET bakery-launcher-postject POST_BUILD
    COMMAND strip $<TARGET_FILE:bakery-launcher-postject>
    COMMENT "Stripping binary..."
  )
endif()

