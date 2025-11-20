#!/bin/bash
# Build Linux binaries using Docker (native glibc builds, like Neutralino)

set -e

PROJECT_DIR="${1:-./examples/stress-test}"

echo " Building Linux binaries with Docker (native glibc, like Neutralino)"
echo ""
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo " Docker not found!"
    echo " Install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Build Docker image
echo " Building Docker image..."
docker build -f Dockerfile.linux -t gemcore-linux . || {
    echo " Docker build failed!"
    exit 1
}

echo ""
echo " Building Linux binaries in Docker container..."
docker run --rm -v "$(pwd)":/work gemcore-linux bash -c "./bake linux --dir $PROJECT_DIR"

echo ""
echo " Linux binaries built successfully!"
echo " Output: $PROJECT_DIR/dist/linux/"

