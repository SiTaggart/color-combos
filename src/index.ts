import { calcAPCA } from 'apca-w3';
import Color from 'color';
import uniq from 'lodash.uniq';

// fontLookupAPCA is exported but not in @types/apca-w3
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fontLookupAPCA } = require('apca-w3') as {
  fontLookupAPCA: (contrast: number, places?: number) => (string | number)[];
};

interface ComboColor {
  color: number[];
  model: string;
  valpha: number;
  hex: () => string;
  contrast: (color: ComboColor) => number;
}

export interface Accessibility {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface ApcaEvaluation {
  thresholdLc: number;
  meets: boolean;
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface MinimumFontSize {
  100: number | 'prohibited';
  200: number | 'prohibited';
  300: number | 'prohibited';
  400: number | 'prohibited';
  500: number | 'prohibited';
  600: number | 'prohibited';
  700: number | 'prohibited';
  800: number | 'prohibited';
  900: number | 'prohibited';
}

export interface ApcaOptions {
  fontSize?: number;
  fontWeight?: FontWeight;
}

export interface FontRequirement {
  fontSize: number;
  fontWeight: FontWeight;
  minimumFontSize: number | 'prohibited';
  meetsRequirement: boolean;
}

export interface ApcaAccessibility {
  lc: number;
  polarity: 'light-on-dark' | 'dark-on-light';
  minimumFontSize: MinimumFontSize;
  fontRequirement?: FontRequirement;
  readability: {
    fluentText: ApcaEvaluation;
    bodyText: ApcaEvaluation;
    contentText: ApcaEvaluation;
    largeText: ApcaEvaluation;
    minimumText: ApcaEvaluation;
    nonText: ApcaEvaluation;
  };
}

export interface Combination {
  accessibility: Accessibility;
  color?: number[];
  contrast: number;
  hex: string;
  model?: string;
  valpha?: number;
  apca?: ApcaAccessibility;
}

export interface ColorCombo {
  color?: number[];
  combinations: Combination[];
  hex: string;
  model?: string;
  valpha?: number;
}

interface Options {
  threshold?: number;
  compact?: boolean;
  uniq?: boolean;
  apca?: ApcaOptions;
}

const ColorCombos = (
  colors: string[] | { [name: string]: string },
  options: Options = {}
): ColorCombo[] | false => {
  let arr: ComboColor[] = [];
  let results: ColorCombo[] = [];

  const MINIMUMS: {
    aa: number;
    aaLarge: number;
    aaa: number;
    aaaLarge: number;
  } = {
    aa: 4.5,
    aaLarge: 3,
    aaa: 7,
    aaaLarge: 4.5,
  };

  const DEFAULT_OPTIONS: Options = {
    threshold: 0,
    compact: false,
    uniq: true,
  };

  const combinedOptions = Object.assign<Options, Options>(DEFAULT_OPTIONS, options);

  if (Array.isArray(colors)) {
    let uniqueColors = colors;
    if (combinedOptions.uniq) {
      uniqueColors = uniq(colors);
    }

    if (uniqueColors !== undefined) {
      arr = uniqueColors.map((color) => Color(color) as unknown as ComboColor);
    }
  } else if (typeof colors === 'object') {
    arr = Object.keys(colors).map((key) => Color(colors[key]) as unknown as ComboColor);

    if (combinedOptions.uniq) {
      arr = uniq(arr);
    }
  } else {
    // biome-ignore lint/suspicious/noConsole: maintain backward compatibility
    console.error('Must provide an array or object');
    return false;
  }

  results = arr.map((color): ColorCombo => {
    const result: ColorCombo = combinedOptions.compact
      ? {
          hex: '',
          combinations: [],
        }
      : {
          color: color.color,
          model: color.model,
          valpha: color.valpha,
          hex: '',
          combinations: [],
        };

    result.hex = color.hex();

    result.combinations = arr
      .filter((bg): boolean => color !== bg)
      .filter((bg): boolean => {
        if (combinedOptions.threshold !== undefined) {
          return color.contrast(bg) > combinedOptions.threshold;
        }
        return true;
      })
      .map((bg): Combination => {
        let combination: Combination = combinedOptions.compact
          ? {
              accessibility: {
                aa: false,
                aaLarge: false,
                aaa: false,
                aaaLarge: false,
              },
              hex: '',
              contrast: 0,
            }
          : {
              accessibility: {
                aa: false,
                aaLarge: false,
                aaa: false,
                aaaLarge: false,
              },
              hex: '',
              contrast: 0,
              color: bg.color,
              model: bg.model,
              valpha: bg.valpha,
            };

        combination = Object.assign(combination, {
          hex: bg.hex(),
          contrast: color.contrast(bg),
        });

        combination.accessibility = {
          aa: combination.contrast >= MINIMUMS.aa,
          aaLarge: combination.contrast >= MINIMUMS.aaLarge,
          aaa: combination.contrast >= MINIMUMS.aaa,
          aaaLarge: combination.contrast >= MINIMUMS.aaaLarge,
        };

        const apcaLcRaw = calcAPCA(color.hex(), bg.hex());
        if (typeof apcaLcRaw === 'number') {
          const apcaLc = apcaLcRaw;
          const absLc = Math.abs(apcaLc);

          // Get font size lookup from APCA
          // Returns: [lc, 100, 200, 300, 400, 500, 600, 700, 800, 900]
          // Values 999/777 = prohibited (too low contrast or non-text only)
          const fontLookup = fontLookupAPCA(apcaLc);
          const parseSize = (val: string | number | undefined): number | 'prohibited' => {
            if (typeof val === 'number' && val < 400) {
              return val;
            }
            return 'prohibited';
          };

          const minimumFontSize: MinimumFontSize = {
            100: parseSize(fontLookup[1]),
            200: parseSize(fontLookup[2]),
            300: parseSize(fontLookup[3]),
            400: parseSize(fontLookup[4]),
            500: parseSize(fontLookup[5]),
            600: parseSize(fontLookup[6]),
            700: parseSize(fontLookup[7]),
            800: parseSize(fontLookup[8]),
            900: parseSize(fontLookup[9]),
          };

          const apca: ApcaAccessibility = {
            lc: apcaLc,
            polarity: apcaLc < 0 ? 'light-on-dark' : 'dark-on-light',
            minimumFontSize,
            readability: {
              fluentText: { thresholdLc: 90, meets: absLc >= 90 },
              bodyText: { thresholdLc: 75, meets: absLc >= 75 },
              contentText: { thresholdLc: 60, meets: absLc >= 60 },
              largeText: { thresholdLc: 45, meets: absLc >= 45 },
              minimumText: { thresholdLc: 30, meets: absLc >= 30 },
              nonText: { thresholdLc: 15, meets: absLc >= 15 },
            },
          };

          // Add font requirement check if fontSize and fontWeight provided
          if (combinedOptions.apca?.fontSize && combinedOptions.apca?.fontWeight) {
            const { fontSize, fontWeight } = combinedOptions.apca;
            const minSize = minimumFontSize[fontWeight];
            apca.fontRequirement = {
              fontSize,
              fontWeight,
              minimumFontSize: minSize,
              meetsRequirement: minSize !== 'prohibited' && fontSize >= minSize,
            };
          }

          combination.apca = apca;
        }

        return combination;
      });

    return result;
  });

  return results;
};

export default ColorCombos;
