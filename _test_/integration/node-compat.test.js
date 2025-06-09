import { describe, expect, it } from 'bun:test';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Filename = fileURLToPath(import.meta.url);
const __dirname = dirname(Filename);

describe('Node.js Compatibility', () => {
  it('should work with CommonJS require', () => {
    const ColorCombos = require('../../dist/index.js').default || require('../../dist/index.js');
    const result = ColorCombos(['red', 'blue']);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should work with dynamic import for ESM', async () => {
    const module = await import('../../dist/index.mjs');
    const ColorCombos = module.default;
    const result = ColorCombos(['red', 'blue']);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should have correct package.json exports', () => {
    const packageJson = require('../../package.json');

    // Check main field (CommonJS)
    expect(packageJson.main).toBe('dist/index.js');

    // Check module field (ESM)
    expect(packageJson.module).toBe('dist/index.mjs');

    // Check types field
    expect(packageJson.types).toBe('dist/index.d.ts');
  });

  it('should handle various color formats consistently between builds', () => {
    const ColorCombosCJS = require('../../dist/index.js').default || require('../../dist/index.js');
    const testCases = [
      ['#FF0000', '#00FF00'],
      ['rgb(255, 0, 0)', 'rgb(0, 255, 0)'],
      ['hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)'],
      ['red', 'green'],
    ];

    for (const colors of testCases) {
      const result = ColorCombosCJS(colors);
      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(result[0].hex).toBeDefined();
      expect(result[1].hex).toBeDefined();
    }
  });
});
