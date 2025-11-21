# Linux Prebuilt Launchers

## Current Status

**⚠️ These launchers need to be rebuilt WITH Steamworks support!**

Current launchers:
- `gemcore-launcher-linux-x64` (262K) - **WITHOUT Steamworks**
- `gemcore-launcher-linux-arm64` (194K) - **WITHOUT Steamworks**

## How to Rebuild on Linux

```bash
cd /path/to/gemcore/launcher

# ARM64 (native)
rm -rf build-linux-arm64
mkdir build-linux-arm64 && cd build-linux-arm64
cmake .. -DCMAKE_BUILD_TYPE=Release -DENABLE_STEAMWORKS=ON
make gemcore-launcher-linux -j$(nproc)
strip gemcore-launcher-linux
cp gemcore-launcher-linux ../prebuilt/linux/gemcore-launcher-linux-arm64

# x64 (cross-compile)
cd ..
rm -rf build-linux-x64
mkdir build-linux-x64 && cd build-linux-x64
cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/x86_64-linux-gnu.cmake -DCMAKE_BUILD_TYPE=Release -DENABLE_STEAMWORKS=ON
make gemcore-launcher-linux -j$(nproc)
x86_64-linux-gnu-strip gemcore-launcher-linux
cp gemcore-launcher-linux ../prebuilt/linux/gemcore-launcher-linux-x64
```

## Expected Sizes

With Steamworks:
- x64: ~330K (currently 262K)
- ARM64: ~260K (currently 194K)

