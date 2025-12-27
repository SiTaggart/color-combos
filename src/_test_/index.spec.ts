import { describe, expect, it } from 'bun:test';
import ColorCombos from '..';

describe('ColorCombos', (): void => {
  const mockColorArray = ['white', 'red'];
  const mockColorObject = {
    white: 'white',
    red: 'red',
  };
  const mockThresholdColors = ['#FFFFFF', '#1276CE', '#A6A6A6', '#12CE54'];
  const mockRGB = ['rgb(255,255,255)', 'rgb(0,25,255)'];
  const mockRGBa = ['rgb(255,255,255)', 'rgba(0,25,255, 0.4)'];
  const mockHSL = ['hsl(134,90%, 76%)', 'hsl(4,90%, 40%)'];

  it('should return some color combos from an array of colors', (): void => {
    expect(ColorCombos(mockColorArray)).toEqual([
      {
        color: [255, 255, 255],
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            color: [255, 0, 0],
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
            model: 'rgb',
            valpha: 1,
          },
        ],
        hex: '#FFFFFF',
        model: 'rgb',
        valpha: 1,
      },
      {
        color: [255, 0, 0],
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            color: [255, 255, 255],
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
            model: 'rgb',
            valpha: 1,
          },
        ],
        hex: '#FF0000',
        model: 'rgb',
        valpha: 1,
      },
    ]);
  });

  it('should return some color combos from an object of colors', (): void => {
    expect(ColorCombos(mockColorObject)).toEqual([
      {
        color: [255, 255, 255],
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            color: [255, 0, 0],
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
            model: 'rgb',
            valpha: 1,
          },
        ],
        hex: '#FFFFFF',
        model: 'rgb',
        valpha: 1,
      },
      {
        color: [255, 0, 0],
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            color: [255, 255, 255],
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
            model: 'rgb',
            valpha: 1,
          },
        ],
        hex: '#FF0000',
        model: 'rgb',
        valpha: 1,
      },
    ]);
  });

  it('should return return false if not passed an array or object', (): void => {
    // @ts-ignore
    expect(ColorCombos('#ddd')).toEqual(false);
  });

  it('should return a compact combo when passed compact', (): void => {
    expect(ColorCombos(mockColorObject, { compact: true })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
          },
        ],
        hex: '#FF0000',
      },
    ]);
  });

  it('should filter out dupes', (): void => {
    expect(ColorCombos(['white', 'red', 'white'], { compact: true })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
          },
        ],
        hex: '#FF0000',
      },
    ]);
  });

  it('should not filter out dupes when passed uniq false', (): void => {
    expect(ColorCombos(['white', 'red', 'white'], { compact: true, uniq: false })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
          },
          {
            accessibility: {
              aa: false,
              aaLarge: false,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 0,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 'prohibited',
                200: 'prohibited',
                300: 'prohibited',
                400: 'prohibited',
                500: 'prohibited',
                600: 'prohibited',
                700: 'prohibited',
                800: 'prohibited',
                900: 'prohibited',
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: false },
                largeText: { thresholdLc: 45, meets: false },
                minimumText: { thresholdLc: 30, meets: false },
                nonText: { thresholdLc: 15, meets: false },
              },
            },
            contrast: 1,
            hex: '#FFFFFF',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
          },
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 64.126_215_381_791_67,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 69,
                200: 46,
                300: 34,
                400: 22.5,
                500: 19.5,
                600: 17.5,
                700: 15.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FFFFFF',
          },
        ],
        hex: '#FF0000',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: false,
              aaLarge: false,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: 0,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 'prohibited',
                200: 'prohibited',
                300: 'prohibited',
                400: 'prohibited',
                500: 'prohibited',
                600: 'prohibited',
                700: 'prohibited',
                800: 'prohibited',
                900: 'prohibited',
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: false },
                largeText: { thresholdLc: 45, meets: false },
                minimumText: { thresholdLc: 30, meets: false },
                nonText: { thresholdLc: 15, meets: false },
              },
            },
            contrast: 1,
            hex: '#FFFFFF',
          },
          {
            accessibility: {
              aa: false,
              aaLarge: true,
              aaa: false,
              aaaLarge: false,
            },
            apca: {
              lc: -69.620_962_879_648_45,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 64,
                200: 44,
                300: 28,
                400: 19.75,
                500: 18.5,
                600: 16.5,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 3.998_476_770_753_998_5,
            hex: '#FF0000',
          },
        ],
        hex: '#FFFFFF',
      },
    ]);
  });

  it('should only return combonations that meet a contrast threshold', (): void => {
    expect(ColorCombos(mockThresholdColors, { compact: true, threshold: 3.5 })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: false,
              aaaLarge: true,
            },
            apca: {
              lc: -77.206_163_603_585_89,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 58,
                200: 40,
                300: 24,
                400: 18,
                500: 16,
                600: 15,
                700: 14,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: true },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 4.658_034_537_943_552,
            hex: '#1276CE',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: false,
              aaaLarge: true,
            },
            apca: {
              lc: 71.745_456_986_788_7,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 63,
                200: 43,
                300: 27,
                400: 19,
                500: 17.5,
                600: 16,
                700: 14.5,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 4.658_034_537_943_552,
            hex: '#FFFFFF',
          },
        ],
        hex: '#1276CE',
      },
      { combinations: [], hex: '#A6A6A6' },
      { combinations: [], hex: '#12CE54' },
    ]);
  });

  it('should work with rgb values', (): void => {
    expect(ColorCombos(mockRGB, { compact: true })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: true,
              aaaLarge: true,
            },
            apca: {
              lc: -90.151_482_995_425_85,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 48,
                200: 32,
                300: 21,
                400: 16,
                500: 15.5,
                600: 14.5,
                700: 14,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: true },
                bodyText: { thresholdLc: 75, meets: true },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 8.129_916_711_550_36,
            hex: '#0019FF',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: true,
              aaaLarge: true,
            },
            apca: {
              lc: 85.278_874_035_337_82,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 52,
                200: 34,
                300: 22,
                400: 16.5,
                500: 15.625,
                600: 14.625,
                700: 14,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: true },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 8.129_916_711_550_36,
            hex: '#FFFFFF',
          },
        ],
        hex: '#0019FF',
      },
    ]);
  });

  it('should work with rgba values', (): void => {
    expect(ColorCombos(mockRGBa, { compact: true })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: true,
              aaaLarge: true,
            },
            apca: {
              lc: -90.151_482_995_425_85,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 48,
                200: 32,
                300: 21,
                400: 16,
                500: 15.5,
                600: 14.5,
                700: 14,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: true },
                bodyText: { thresholdLc: 75, meets: true },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 8.129_916_711_550_36,
            hex: '#0019FF',
          },
        ],
        hex: '#FFFFFF',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: true,
              aaaLarge: true,
            },
            apca: {
              lc: 85.278_874_035_337_82,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 52,
                200: 34,
                300: 22,
                400: 16.5,
                500: 15.625,
                600: 14.625,
                700: 14,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: true },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 8.129_916_711_550_36,
            hex: '#FFFFFF',
          },
        ],
        hex: '#0019FF',
      },
    ]);
  });

  it('should work with hsl values', (): void => {
    expect(ColorCombos(mockHSL, { compact: true })).toEqual([
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: false,
              aaaLarge: true,
            },
            apca: {
              lc: -65.147_511_775_050_09,
              polarity: 'light-on-dark',
              minimumFontSize: {
                100: 68,
                200: 46,
                300: 32,
                400: 21.75,
                500: 19,
                600: 17,
                700: 15,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 4.739_544_356_484_656,
            hex: '#C2160A',
          },
        ],
        hex: '#8BF9A4',
      },
      {
        combinations: [
          {
            accessibility: {
              aa: true,
              aaLarge: true,
              aaa: false,
              aaaLarge: true,
            },
            apca: {
              lc: 61.546_709_853_263_27,
              polarity: 'dark-on-light',
              minimumFontSize: {
                100: 71,
                200: 47,
                300: 39,
                400: 23.5,
                500: 20.5,
                600: 18,
                700: 16,
                800: 16,
                900: 18,
              },
              readability: {
                fluentText: { thresholdLc: 90, meets: false },
                bodyText: { thresholdLc: 75, meets: false },
                contentText: { thresholdLc: 60, meets: true },
                largeText: { thresholdLc: 45, meets: true },
                minimumText: { thresholdLc: 30, meets: true },
                nonText: { thresholdLc: 15, meets: true },
              },
            },
            contrast: 4.739_544_356_484_656,
            hex: '#8BF9A4',
          },
        ],
        hex: '#C2160A',
      },
    ]);
  });

  it('should include fontRequirement when fontSize and fontWeight are provided', (): void => {
    const result = ColorCombos(['white', 'red'], {
      compact: true,
      apca: { fontSize: 16, fontWeight: 400 },
    });
    expect(result).not.toBe(false);
    if (result) {
      const combo1 = result[0]?.combinations[0];
      const combo2 = result[1]?.combinations[0];
      // white on red: Lc -69.62, min font size at 400 is 19.75
      // 16px < 19.75px, so meetsRequirement should be false
      expect(combo1?.apca?.fontRequirement).toEqual({
        fontSize: 16,
        fontWeight: 400,
        minimumFontSize: 19.75,
        meetsRequirement: false,
      });

      // red on white: Lc 64.12, min font size at 400 is 22.5
      // 16px < 22.5px, so meetsRequirement should be false
      expect(combo2?.apca?.fontRequirement).toEqual({
        fontSize: 16,
        fontWeight: 400,
        minimumFontSize: 22.5,
        meetsRequirement: false,
      });
    }
  });

  it('should return meetsRequirement true when font size meets minimum', (): void => {
    const result = ColorCombos(['white', 'red'], {
      compact: true,
      apca: { fontSize: 24, fontWeight: 400 },
    });
    expect(result).not.toBe(false);
    if (result) {
      const combo1 = result[0]?.combinations[0];
      const combo2 = result[1]?.combinations[0];
      // white on red: min font size at 400 is 19.75, 24px >= 19.75px
      expect(combo1?.apca?.fontRequirement?.meetsRequirement).toBe(true);
      // red on white: min font size at 400 is 22.5, 24px >= 22.5px
      expect(combo2?.apca?.fontRequirement?.meetsRequirement).toBe(true);
    }
  });

  it('should return meetsRequirement false when contrast is too low', (): void => {
    // Two very similar colors with low contrast
    const result = ColorCombos(['#808080', '#909090'], {
      compact: true,
      apca: { fontSize: 48, fontWeight: 400 },
    });
    expect(result).not.toBe(false);
    if (result) {
      const combo1 = result[0]?.combinations[0];
      // Low contrast should return 'prohibited' for minimum font size
      expect(combo1?.apca?.fontRequirement?.meetsRequirement).toBe(false);
      expect(combo1?.apca?.fontRequirement?.minimumFontSize).toBe('prohibited');
    }
  });
});
