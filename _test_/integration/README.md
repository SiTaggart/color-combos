# Integration Tests

This directory contains integration tests that verify the compiled code in the `dist/` directory works correctly.

## Test Files

- **`cjs.test.js`** - Tests the CommonJS build (`dist/index.js`)
- **`esm.test.js`** - Tests the ESM build (`dist/index.mjs`)  
- **`types.test.ts`** - Tests TypeScript definitions work correctly
- **`node-compat.test.js`** - Tests Node.js compatibility and module loading

## Running Tests

```bash
# Run all tests (unit → build → integration)
bun run test:all

# Run only integration tests (requires build first)
bun run build && bun run test:integration

# Run specific integration test
bun test test/integration/cjs.test.js
```

## What These Tests Verify

1. **Functional Parity** - Both CJS and ESM builds produce identical results
2. **API Compatibility** - All options and return values work as expected
3. **TypeScript Support** - Type definitions are correct and complete
4. **Module Loading** - Both `require()` and `import` work correctly
5. **Cross-Format Consistency** - Same inputs produce same outputs across formats

These tests ensure that the compiled code matches the behavior of the source TypeScript code and works correctly in different Node.js environments.