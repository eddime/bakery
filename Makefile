# ⚡ Zippy Makefile
# Convenient shortcuts for common tasks

.PHONY: help install build build-all clean dev test

help:
	@echo "⚡ Zippy Framework"
	@echo ""
	@echo "Available targets:"
	@echo "  make install     - Install dependencies"
	@echo "  make build       - Build for current platform"
	@echo "  make build-all   - Build for all platforms"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make dev         - Start development server"
	@echo "  make test        - Run tests"
	@echo "  make fmt         - Format code"

install:
	@echo "📦 Installing dependencies..."
	bun install
	git submodule update --init --recursive

build:
	@echo "🔨 Building Zippy..."
	bun run build

build-all:
	@echo "🌍 Building for all platforms..."
	bun run build --all

clean:
	@echo "🧹 Cleaning..."
	rm -rf build dist tmp
	bun run clean

dev:
	@echo "🚀 Starting development server..."
	bun run dev

test:
	@echo "🧪 Running tests..."
	bun test

fmt:
	@echo "✨ Formatting code..."
	bun run format

