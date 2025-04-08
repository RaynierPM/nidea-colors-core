# 🎨 nidea-colors

A tool written in TypeScript for generating, manipulating, and serializing color palettes. Ideal for creative projects that require control and randomness over color composition.

## 🚀 Installation

```bash
npm install nidea-colors
```

## 🗖️ Features

- Create colors from RGB(A) or hexadecimal values.
- Generate random colors.
- Serialize and deserialize palettes.
- Edit palettes: add or remove colors.
- Built-in validations to avoid common mistakes.
- Support for different palette types: monochromatic, analogous, complementary, etc.

## 🔧 Basic Usage

### Create a color manually

```ts
import { Color } from "nidea-colors";

const red = new Color({ red: 255, green: 0, blue: 0 });
console.log(red.hexColor); // ff0000
```

### Create a color from a hexadecimal value

```ts
const blue = Color.fromHexColor("0000ff");
```

### Generate a random color

```ts
const randomColor = Color.generateRandomColor();
```

### Create a palette

```ts
import { Palette } from "nidea-colors";

const palette = new Palette([red, blue]);
console.log(palette.toString()); // JSON with colors in hexadecimal
```

### Add or remove colors

```ts
palette.addColor(randomColor);
palette.removeColor(red);
```

### Clone a palette

```ts
const copy = palette.clone();
```

## 🧪 Palette Generator

You can use `PaletteFactory` to automatically generate custom palettes:

```ts
import { PaletteFactory, PaletteType } from "nidea-colors";

const factory = new PaletteFactory();

const generator = factory.getPaletteGenerator();

const palette = generator({
  paletteType: PaletteType.MONOCHROMATIC,
  lockedColors: [],
  colorsQuantity: 4,
  baseColor: Color.fromHexColor("3498db"),
});
```

## ✏️ Edit palettes

```ts
import { PaletteFactory, PaletteEditType } from "nidea-colors";

PaletteFactory.editPalette({
  type: PaletteEditType.ADD_COLOR,
  palette,
  baseColor: newColor,
});
```

## 📚 Supported palette types

- `RANDOM`
- `MONOCHROMATIC`
- `ANALOGOUS`
- `COMPLEMENTARY`
- `TRIADIC`
- `COMPOUND`

## 👀 Real example 🌈

🫵 can see and test the funcionalities 👉[here](https://nidea-colors.netlify.app/)👈.

## 🛠️ Custom Types

Check out the available types in the `types.ts` file, such as:

- `PaletteType`
- `PaletteEditType`
- `PaletteEditionOptions`
- `generatePaletteOptions`

## ⚠️ Validations

This library includes built-in validations for:

- Invalid hexadecimal colors.
- Invalid number of colors in the palette.
- Missing or incorrect parameters during generation.

## 🔧 Known issues

- This cromatic circle is based on RGB color model,
  so the colors generated will be different
  from the ones you can see on traditional color pickers.
  > Traditional pickers are based on additive color model,
  > as RYB (🟥​🟨​🟦​), the goal its improve it later.

---

## 📄 License

MIT
