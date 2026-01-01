# Personal GitHub Page

Ultra-minimal personal GitHub page built with vanilla JavaScript and Bun.

**Build size: ~1.3 KB** (target: < 10 KB)

## Tech Stack

- **Vanilla JavaScript** - No frameworks
- **Bun** - Build tool, bundler, and test runner
- **GitHub Actions** - CI/CD with automated testing and deployment

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Run tests
bun test

# Build for production
bun run build

# Check build size
bun run size
```

## Project Structure

```
├── src/
│   ├── index.html    # HTML template
│   ├── styles.css    # CSS styles
│   └── main.js       # JavaScript
├── scripts/
│   ├── build.ts      # Build script (inlines & minifies)
│   ├── dev.ts        # Dev server
│   └── check-size.ts # Size validation
├── tests/
│   ├── build.test.ts # Build validation tests
│   └── source.test.ts # Source file tests
└── dist/             # Build output
```

## Build Process

The build script:
1. Reads HTML, CSS, and JS source files
2. Minifies CSS and JS using Bun's bundler
3. Inlines all assets into a single HTML file
4. Validates the output is under 10 KB
5. Outputs to `dist/index.html`

## License

MIT
