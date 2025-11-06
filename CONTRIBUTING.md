# Contributing to Bakery

Thank you for your interest in contributing to Bakery! 🚀

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/bakery.git
cd bakery
```

2. Install dependencies
```bash
bun install
```

3. Initialize submodules
```bash
git submodule update --init --recursive
```

4. Build the project
```bash
bun run build
```

## Project Structure

- `src/` - Core C/C++ source code
  - `runtime/` - txiki.js integration
  - `webview/` - WebView FFI bindings
  - `ipc/` - Zero-copy IPC implementation
  - `api/` - Framework APIs
- `lib/` - JavaScript library code
- `scripts/` - Build and development scripts
- `examples/` - Example applications
- `docs/` - Documentation

## Making Changes

1. Create a feature branch
```bash
git checkout -b feature/my-feature
```

2. Make your changes

3. Test your changes
```bash
bun test
bun run build
```

4. Commit with descriptive messages
```bash
git commit -m "feat: add new feature"
```

5. Push and create a pull request
```bash
git push origin feature/my-feature
```

## Code Style

- C/C++: Follow existing style (use `clang-format`)
- TypeScript: Use Prettier (included in package.json)
- Commit messages: Follow Conventional Commits

## Testing

- Add tests for new features
- Ensure all tests pass before submitting PR
- Test on multiple platforms when possible

## Documentation

- Update docs for API changes
- Add examples for new features
- Keep README up to date

## Questions?

Feel free to open an issue or join our Discord!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

