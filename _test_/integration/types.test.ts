import { describe, expect, it } from 'bun:test';
import ColorCombos from '../../dist/index.mjs';

// This file tests that TypeScript definitions work correctly
describe('ColorCombos TypeScript Integration', () => {
  it('should accept array of colors', () => {
    const colors: string[] = ['red', 'blue', 'green'];
    const result = ColorCombos(colors);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should accept object of colors', () => {
    const colors: Record<string, string> = {
      primary: '#FF0000',
      secondary: '#00FF00',
      tertiary: '#0000FF',
    };
    const result = ColorCombos(colors);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should accept options parameter', () => {
    const colors = ['white', 'black'];

    // Test with all options
    const result1 = ColorCombos(colors, {
      compact: true,
      threshold: 4.5,
      uniq: false,
    });
    expect(result1).toBeDefined();

    // Test with partial options
    const result2 = ColorCombos(colors, { compact: true });
    expect(result2).toBeDefined();

    // Test with no options
    const result3 = ColorCombos(colors);
    expect(result3).toBeDefined();
  });

  it('should return properly typed results', () => {
    const result = ColorCombos(['white', 'black']);

    // Check structure of result
    if (result && result[0]) {
      expect(typeof result[0].hex).toBe('string');
      expect(Array.isArray(result[0].combinations)).toBe(true);
      expect(Array.isArray(result[0].color)).toBe(true);
      expect(typeof result[0].model).toBe('string');
      expect(typeof result[0].valpha).toBe('number');

      // Check combinations structure
      if (result[0].combinations[0]) {
        const combo = result[0].combinations[0];
        expect(typeof combo.hex).toBe('string');
        expect(typeof combo.contrast).toBe('number');
        expect(typeof combo.accessibility.aa).toBe('boolean');
        expect(typeof combo.accessibility.aaLarge).toBe('boolean');
        expect(typeof combo.accessibility.aaa).toBe('boolean');
        expect(typeof combo.accessibility.aaaLarge).toBe('boolean');

        // Check APCA structure (apca is optional, but readability fields are required when present)
        expect(combo.apca).toBeDefined();
        expect(typeof combo.apca?.lc).toBe('number');
        expect(['light-on-dark', 'dark-on-light']).toContain(combo.apca?.polarity);
        expect(combo.apca?.readability).toBeDefined();
        expect(typeof combo.apca?.readability.bodyText.thresholdLc).toBe('number');
        expect(typeof combo.apca?.readability.bodyText.meets).toBe('boolean');
      }
    }
  });

  it('should return properly typed compact results', () => {
    const result = ColorCombos(['white', 'black'], { compact: true });

    if (result && result[0]) {
      expect(typeof result[0].hex).toBe('string');
      expect(Array.isArray(result[0].combinations)).toBe(true);
      // In compact mode, these should not exist
      expect(result[0].color).toBeUndefined();
      expect(result[0].model).toBeUndefined();
      expect(result[0].valpha).toBeUndefined();
    }
  });
});
