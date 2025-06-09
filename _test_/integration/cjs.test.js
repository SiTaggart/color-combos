import { describe, expect, it } from 'bun:test';

// Test CommonJS build
const ColorCombos = require('../../dist/index.js').default || require('../../dist/index.js');

describe('ColorCombos CJS Integration', () => {
  const mockColorArray = ['white', 'red'];
  const mockColorObject = {
    white: 'white',
    red: 'red',
  };
  const mockThresholdColors = ['#FFFFFF', '#1276CE', '#A6A6A6', '#12CE54'];
  const mockRGB = ['rgb(255,255,255)', 'rgb(0,25,255)'];
  const mockRGBa = ['rgb(255,255,255)', 'rgba(0,25,255, 0.4)'];
  const mockHSL = ['hsl(134,90%, 76%)', 'hsl(4,90%, 40%)'];

  it('should return some color combos from an array of colors', () => {
    const result = ColorCombos(mockColorArray);
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#FF0000');
    expect(result[0].combinations[0].contrast).toBeCloseTo(3.998476770753998, 5);
  });

  it('should return some color combos from an object of colors', () => {
    const result = ColorCombos(mockColorObject);
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#FF0000');
    expect(result[0].combinations[0].contrast).toBeCloseTo(3.998476770753998, 5);
  });

  it('should return false if not passed an array or object', () => {
    expect(ColorCombos('#ddd')).toBe(false);
  });

  it('should return a compact combo when passed compact option', () => {
    const result = ColorCombos(mockColorObject, { compact: true });
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#FF0000');
    // In compact mode, only hex and combinations are returned
    expect(result[0].color).toBeUndefined();
    expect(result[0].model).toBeUndefined();
    expect(result[0].valpha).toBeUndefined();
  });

  it('should filter out duplicates by default', () => {
    const result = ColorCombos(['white', 'red', 'white'], { compact: true });
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#FF0000');
  });

  it('should not filter out duplicates when uniq is false', () => {
    const result = ColorCombos(['white', 'red', 'white'], {
      compact: true,
      uniq: false,
    });
    expect(result).toHaveLength(3);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#FF0000');
    expect(result[2].hex).toBe('#FFFFFF');
  });

  it('should only return combinations that meet a contrast threshold', () => {
    const result = ColorCombos(mockThresholdColors, {
      compact: true,
      threshold: 3.5,
    });
    expect(result).toHaveLength(4);

    // Only combinations meeting threshold should be included
    const whiteCombo = result.find((c) => c.hex === '#FFFFFF');
    expect(whiteCombo.combinations).toHaveLength(1);
    expect(whiteCombo.combinations[0].hex).toBe('#1276CE');
    expect(whiteCombo.combinations[0].contrast).toBeGreaterThan(3.5);
  });

  it('should work with rgb values', () => {
    const result = ColorCombos(mockRGB, { compact: true });
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#0019FF');
  });

  it('should work with rgba values', () => {
    const result = ColorCombos(mockRGBa, { compact: true });
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#FFFFFF');
    expect(result[1].hex).toBe('#0019FF');
  });

  it('should work with hsl values', () => {
    const result = ColorCombos(mockHSL, { compact: true });
    expect(result).toHaveLength(2);
    expect(result[0].hex).toBe('#8BF9A4');
    expect(result[1].hex).toBe('#C2160A');
  });

  it('should provide correct accessibility ratings', () => {
    const result = ColorCombos(['white', 'black']);
    const whiteCombo = result.find((c) => c.hex === '#FFFFFF');
    const blackCombo = whiteCombo.combinations.find((c) => c.hex === '#000000');

    expect(blackCombo.accessibility.aa).toBe(true);
    expect(blackCombo.accessibility.aaLarge).toBe(true);
    expect(blackCombo.accessibility.aaa).toBe(true);
    expect(blackCombo.accessibility.aaaLarge).toBe(true);
    expect(blackCombo.contrast).toBe(21);
  });

  it('should include all properties in non-compact mode', () => {
    const result = ColorCombos(['white']);
    expect(result[0]).toHaveProperty('color');
    expect(result[0]).toHaveProperty('model');
    expect(result[0]).toHaveProperty('valpha');
    expect(result[0]).toHaveProperty('hex');
    expect(result[0]).toHaveProperty('combinations');
  });
});
