set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR x86_64)

set(CMAKE_C_COMPILER "x86_64-linux-gnu-gcc")
set(CMAKE_CXX_COMPILER "x86_64-linux-gnu-g++")
set(CMAKE_ASM_COMPILER "x86_64-linux-gnu-gcc")
set(CMAKE_AR "x86_64-linux-gnu-ar")
set(CMAKE_RANLIB "x86_64-linux-gnu-ranlib")
set(CMAKE_STRIP "x86_64-linux-gnu-strip")

# Critical: Force x86_64 headers, not ARM64
# The issue is that math.h includes bits/math-vector.h, and the compiler finds
# the ARM64 version first. We need to ensure x86_64 headers come first.
# Use -isystem to mark x86_64 headers as system headers (searched first)
# and -idirafter to push /usr/include (where ARM64 headers are) to the end
set(CMAKE_C_FLAGS_INIT "-m64 -isystem /usr/include/x86_64-linux-gnu -idirafter /usr/include")
set(CMAKE_CXX_FLAGS_INIT "-m64 -isystem /usr/include/x86_64-linux-gnu -idirafter /usr/include")

# Don't use sysroot - multiarch setups don't need it
# Instead, set library search paths explicitly
set(CMAKE_LIBRARY_PATH "/usr/lib/x86_64-linux-gnu")
set(CMAKE_LINK_DIRECTORIES "/usr/lib/x86_64-linux-gnu")

# Find root path mode
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

# Set PKG_CONFIG for cross-compilation
set(ENV{PKG_CONFIG_PATH} "/usr/lib/x86_64-linux-gnu/pkgconfig")
set(ENV{PKG_CONFIG_SYSROOT_DIR} "")

# Force CMAKE_CROSSCOMPILING to be set
set(CMAKE_CROSSCOMPILING TRUE)

