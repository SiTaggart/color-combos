import { describe, expect, it } from 'bun:test';

describe('Package Exports', () => {
  it('should resolve exports correctly for import', async () => {
    // Test the main export resolves to ESM
    const module = await import('../../dist/index.mjs');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });
});
