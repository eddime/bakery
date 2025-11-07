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

# Main executables
add_executable(bakery-launcher
  launcher.cpp
)

add_executable(bakery-launcher-postject
  launcher-postject.cpp
)

# Link JSON library
target_link_libraries(bakery-launcher PRIVATE nlohmann_json::nlohmann_json)
target_link_libraries(bakery-launcher-postject PRIVATE nlohmann_json::nlohmann_json)

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

