# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**color-combos** is a modern TypeScript npm package that calculates color contrast ratios and accessibility ratings for color combinations. It supports both WCAG 2.x and WCAG 3.0 APCA (Advanced Perceptual Contrast Algorithm) standards, helping developers ensure their color choices meet accessibility guidelines.

**Modern Features:**
- 🎯 **ESM-first** with CommonJS fallback via dual package exports
- 🚀 **Built with Bun** for fast development and native TypeScript support
- 📦 **Tree-shakeable** - marked as side-effect free
- 🎪 **Node.js 24.12.0** support with modern JavaScript features
- 🔧 **Full TypeScript** support with comprehensive type definitions

## Key Commands

### Development
```bash
# Install dependencies
bun install

# Run tests
bun test

# Build for production
bun run build

# Build for development (with source maps)
bun run build:dev

# Lint code
bun run lint

# Format code
bun run format:fix

# Check bundle size
bun run size
```

### Testing
- **Unit Tests**: Use Bun's native test runner, located in `src/_test_/`
- **Integration Tests**: Test compiled code in `_test_/integration/`
  - `cjs.test.js` - Tests CommonJS build (`dist/index.js`)
  - `esm.test.js` - Tests ESM build (`dist/index.mjs`)
  - `exports.test.js` - Tests package exports
  - `types.test.ts` - Tests TypeScript definitions
  - `node-compat.test.js` - Tests Node.js compatibility
- Run all tests: `bun run test:all` (unit → build → integration)
- Run specific test: `bun test --test-name-pattern="pattern"`

## Architecture

The entire library is contained in `src/index.ts` which exports a single default function `ColorCombos`. Key aspects:

1. **Input Handling**: Accepts colors as array (`['#fff', '#000']`) or object (`{ primary: '#fff' }`)
2. **Color Processing**: Uses the `color` library to parse various formats (hex, rgb, hsl, named colors)
3. **Contrast Calculation**: Computes both WCAG 2.x ratios and APCA Lc values between all color pairs
4. **WCAG 2.x Compliance**: Checks against AA (4.5:1), AA Large (3:1), AAA (7:1), and AAA Large (4.5:1) standards
5. **APCA Support**: Returns Lc value, polarity (light-on-dark/dark-on-light), and readability threshold checks
6. **Options**: Supports `compact` mode, `threshold` filtering, and `uniq` duplicate removal

## Build Configuration

- **Bun**: Native bundler that outputs both ESM (`dist/index.mjs`) and CJS (`dist/index.js`) formats
- **TypeScript**: Targets ESNext with strict mode enabled, using Bun's native TypeScript support
- **Bundle Size**: Must stay under 13kB (enforced by size-limit)
- **Build Script**: Custom `build.ts` script uses Bun's build API for bundling and `oxc-transform` for declaration files

## Release Process

- Uses semantic-release for automated versioning
- Releases from `main` branch only
- Git hooks via Husky ensure code quality before commits
