set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR x86_64)

set(CMAKE_C_COMPILER "x86_64-linux-gnu-gcc")
set(CMAKE_CXX_COMPILER "x86_64-linux-gnu-g++")
set(CMAKE_ASM_COMPILER "x86_64-linux-gnu-gcc")
set(CMAKE_AR "x86_64-linux-gnu-ar")
set(CMAKE_RANLIB "x86_64-linux-gnu-ranlib")
set(CMAKE_STRIP "x86_64-linux-gnu-strip")

# Critical: Force x86_64 headers, not ARM64
# Use -idirafter to push ARM64 headers to the end, and -I to prioritize x86_64
set(CMAKE_C_FLAGS_INIT "-m64 -I/usr/include/x86_64-linux-gnu -idirafter /usr/include")
set(CMAKE_CXX_FLAGS_INIT "-m64 -I/usr/include/x86_64-linux-gnu -idirafter /usr/include")

# Also set sysroot to prevent ARM64 header inclusion
set(CMAKE_SYSROOT "/usr/x86_64-linux-gnu")

# Find root path mode
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

# Set PKG_CONFIG for cross-compilation
set(ENV{PKG_CONFIG_PATH} "/usr/lib/x86_64-linux-gnu/pkgconfig")
set(ENV{PKG_CONFIG_SYSROOT_DIR} "")

