# Color Combos

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FSiTaggart%2Fcolor-combos%2Fbadge&style=popout)](https://actions-badge.atrox.dev/SiTaggart/color-combos/goto) [![npm version](https://badge.fury.io/js/color-combos.svg)](https://badge.fury.io/js/color-combos) ![last release](https://img.shields.io/github/release-date/SiTaggart/color-combos) ![last commit](https://img.shields.io/github/last-commit/sitaggart/color-combos)

For each color passed, `ColorCombos` will calculate the color contrast ratio and accessibility rating between itself and every other color that was supplied. `ColorCombos` returns an array of colors, and for each color, combinations of other colors passed along with the contrast ratio and accessibility rating.

By default it will return the full details of the colors, but it can set to return only compact details, only unique colors and / or only colors that meet a certain threshold.

The default shape of the returned array can be expressed as:

```ts
[
  {
    color?: number[];
    hex: string;
    model?: string;
    valpha?: number;
    combinations: [
      {
        color?: number[];
        contrast: number;
        hex: string;
        model?: string;
        valpha?: number;
        accessibility: {
          aa: boolean;
          aaLarge: boolean;
          aaa: boolean;
          aaaLarge: boolean;
        };
        apca?: {
          lc: number;
          polarity: 'light-on-dark' | 'dark-on-light';
          readability: {
            fluentText: { thresholdLc: number; meets: boolean };
            bodyText: { thresholdLc: number; meets: boolean };
            contentText: { thresholdLc: number; meets: boolean };
            largeText: { thresholdLc: number; meets: boolean };
            minimumText: { thresholdLc: number; meets: boolean };
            nonText: { thresholdLc: number; meets: boolean };
          };
        };
      }
    ];
  }
];
```

## Installation

```js
import ColorCombos from 'color-combos';
```

## Usage

`ColorCombos` takes two arguments; `colors: string[] | { [name: string]: string }` and optional `options: { compact?: boolean; threshold?: number; uniq?: boolean; }`

```ts
ColorCombos(
  colors: string[] | { [name: string]: string },
  options?: {
    compact?: boolean;
    threshold?: number;
    uniq?: boolean;
  }
)
```

### `colors: string[] | { [name: string]: string }`

The colors argument will accept either an array of colors as strings, or an object of colors where the values are strings.

#### Array

```js
ColorCombos(['#fff', '#000']);
```

#### Object

```js
ColorCombos({
  white: '#fff',
  black: '#000',
});
```

Both of these examples return an array of colors and their combinations as:

```json
[
  {
    "color": [255, 255, 255],
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [0, 0, 0],
        "contrast": 21,
        "hex": "#000000",
        "model": "rgb",
        "valpha": 0.5
      }
    ],
    "hex": "#FFFFFF",
    "model": "rgb",
    "valpha": 0.5
  },
  {
    "color": [0, 0, 0],
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [255, 255, 255],
        "contrast": 21,
        "hex": "#FFFFFF",
        "model": "rgb",
        "valpha": 0.5
      }
    ],
    "hex": "#000000",
    "model": "rgb",
    "valpha": 0.5
  }
]
```

Color strings are supported in a number of formats

#### Supported color formats

- Named: `white`
- Hex: `#fff`
- RGB: `rgb(255, 255, 255)`

#### Passing more than two colors

Passing more than two colors will result in the returned array and combinations increasing in size.

```js
ColorCombos(['#fff', '#ccc', '#000']);
```

returns

```json
[
  {
    "color": [255, 255, 255],
    "combinations": [
      {
        "accessibility": { "aa": false, "aaLarge": false, "aaa": false, "aaaLarge": false },
        "color": [204, 204, 204],
        "contrast": 1.6059285649300714,
        "hex": "#CCCCCC",
        "model": "rgb",
        "valpha": 1
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [0, 0, 0],
        "contrast": 21,
        "hex": "#000000",
        "model": "rgb",
        "valpha": 1
      }
    ],
    "hex": "#FFFFFF",
    "model": "rgb",
    "valpha": 1
  },
  {
    "color": [204, 204, 204],
    "combinations": [
      {
        "accessibility": { "aa": false, "aaLarge": false, "aaa": false, "aaaLarge": false },
        "color": [255, 255, 255],
        "contrast": 1.6059285649300714,
        "hex": "#FFFFFF",
        "model": "rgb",
        "valpha": 1
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [0, 0, 0],
        "contrast": 13.076546777106755,
        "hex": "#000000",
        "model": "rgb",
        "valpha": 1
      }
    ],
    "hex": "#CCCCCC",
    "model": "rgb",
    "valpha": 1
  },
  {
    "color": [0, 0, 0],
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [255, 255, 255],
        "contrast": 21,
        "hex": "#FFFFFF",
        "model": "rgb",
        "valpha": 1
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "color": [204, 204, 204],
        "contrast": 13.076546777106755,
        "hex": "#CCCCCC",
        "model": "rgb",
        "valpha": 1
      }
    ],
    "hex": "#000000",
    "model": "rgb",
    "valpha": 1
  }
]
```

### Optional `options: { compact?: boolean; threshold?: number; uniq?: boolean; }`

`ColorCombos` can take some optional options that can affect the returned array of colors. Options are represented as an object that can have three keys; `compact`, `threshold`, and `uniq`. By default those options are set to:

```json
{
  "compact": false,
  "threshold": 0,
  "uniq": true
}
```

#### `compact: boolean`

If all you're after is the accessibility information for each color combination you can set `compact` to true and `ColorCombos` will omit non-essential information about each color.

```js
ColorCombos(['#fff', '#ccc', '#000'], { compact: true });
```

returns

```json
[
  {
    "combinations": [
      {
        "accessibility": { "aa": false, "aaLarge": false, "aaa": false, "aaaLarge": false },
        "contrast": 1.6059285649300714,
        "hex": "#CCCCCC"
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 21,
        "hex": "#000000"
      }
    ],
    "hex": "#FFFFFF"
  },
  {
    "combinations": [
      {
        "accessibility": { "aa": false, "aaLarge": false, "aaa": false, "aaaLarge": false },
        "contrast": 1.6059285649300714,
        "hex": "#FFFFFF"
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 13.076546777106755,
        "hex": "#000000"
      }
    ],
    "hex": "#CCCCCC"
  },
  {
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 21,
        "hex": "#FFFFFF"
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 13.076546777106755,
        "hex": "#CCCCCC"
      }
    ],
    "hex": "#000000"
  }
]
```

#### `threshold: number`

If you would like to omit color combinations that do not meet a certain color contrast ratio, you can set a contrast ratio `threshold` and `ColorCombos` will omit colors that do not meet it.

```js
ColorCombos(['#fff', '#ccc', '#000'], { compact: true, threshold: 3 });
```

This will omit color combinations that do not meet at least a color contrast ratio of 3:1 and returns:

```json
[
  {
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 21,
        "hex": "#000000"
      }
    ],
    "hex": "#FFFFFF"
  },
  {
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 13.076546777106755,
        "hex": "#000000"
      }
    ],
    "hex": "#CCCCCC"
  },
  {
    "combinations": [
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 21,
        "hex": "#FFFFFF"
      },
      {
        "accessibility": { "aa": true, "aaLarge": true, "aaa": true, "aaaLarge": true },
        "contrast": 13.076546777106755,
        "hex": "#CCCCCC"
      }
    ],
    "hex": "#000000"
  }
]
```

#### `uniq: boolean`

By default, `ColorCombos` will only return uniq colors from the supplied arguments. If you would like it to not omit duplicates, set the `uniq` option to `false`

```js
ColorCombos(['#fff', 'rgb(255,255,255)', '#000'], { compact: true, uniq: false });
```

Even though `#fff` and `rgb(255,255,255)` are the same color, `ColorCombos` will not omit the duplicate from the returned results.

## APCA (WCAG 3 Candidate)

`ColorCombos` includes an `apca` result for each color pair:

- `apca.lc` is the signed APCA Lightness Contrast value (negative = light text on dark background, positive = dark text on light background).
- `apca.readability.*.meets` compares `Math.abs(apca.lc)` against the APCAeasyIntro “Use‑Case Ranges” thresholds:
  - `fluentText`: `Lc 90` (preferred; for fluent/body text columns at ≥14px/400)
  - `bodyText`: `Lc 75` (minimum; for body text columns at ≥18px/400)
  - `contentText`: `Lc 60` (minimum; for content text at ≥24px/400 or ≥16px/700)
  - `largeText`: `Lc 45` (minimum; for large text/headlines at ≥36px/400 or ≥24px/700)
  - `minimumText`: `Lc 30` (absolute minimum; for text not listed above, and large/solid non‑text)
  - `nonText`: `Lc 15` (absolute minimum; for discernible non‑text ≥5px)

### Caveats

- APCA is the candidate contrast method for WCAG 3 and is still under development; these booleans are a convenience check against published guidance, not an official “conformance” result.
- Thresholds are based on the reference font (Helvetica/Arial) and don’t account for font‑specific look‑up tables or other typographic factors (spacing, stroke width, etc).
- Inputs with alpha (e.g. `rgba(...)`) are not composited against a background for APCA; results assume opaque colors.
