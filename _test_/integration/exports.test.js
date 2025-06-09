import { describe, expect, it } from 'bun:test';

describe('Package Exports', () => {
  it('should resolve exports correctly for import', async () => {
    // Test the main export resolves to ESM
    const module = await import('../../dist/index.mjs');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });

  it('should work with package.json exports field', () => {
    const pkg = require('../../package.json');

    // Check exports field is properly configured
    expect(pkg.exports).toBeDefined();
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['.'].import.default).toBe('./dist/index.mjs');
    expect(pkg.exports['.'].require.default).toBe('./dist/index.js');
    expect(pkg.exports['.'].import.types).toBe('./dist/index.d.ts');
    expect(pkg.exports['.'].require.types).toBe('./dist/index.d.ts');
  });

  it('should be marked as ES module', () => {
    const pkg = require('../../package.json');
    expect(pkg.type).toBe('module');
  });

  it('should be marked as side-effect free', () => {
    const pkg = require('../../package.json');
    expect(pkg.sideEffects).toBe(false);
  });

  it('should support modern Node.js versions', () => {
    const pkg = require('../../package.json');
    expect(pkg.engines.node).toMatch(/>=22/);
  });
});
