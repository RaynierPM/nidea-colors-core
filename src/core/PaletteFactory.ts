import { Color } from "./Color";
import { ColorMixerOptions } from "./ColorMixer/types";
import { getColorMixer } from "./ColorMixer/utils/getColorMixer";
import { InvalidColorsQuantityError, InvalidParametersError } from "./errors/PaletteFactory";
import { Palette } from "./palette";
import {
  generatePaletteOptions,
  PaletteColorsLimit,
  PaletteEditionOptions,
  PaletteEditType,
  PaletteGenerator,
  PaletteType,
} from "./types";

type paletteFactoryOptions = {
  limits?: {
    min: number;
    max: number;
  };
};

export class PaletteFactory {
  private DEFAULT_MIN_COLORS: number;
  private DEFAULT_MAX_COLORS: number;

  get max() {
    return this.DEFAULT_MAX_COLORS;
  }

  get min() {
    return this.DEFAULT_MIN_COLORS;
  }

  set min(n: number) {
    if (n <= this.max) {
      return;
    }
  }

  set max(n: number) {
    if (n <= this.max) {
      return;
    }
  }

  constructor(options?: paletteFactoryOptions) {
    this.DEFAULT_MAX_COLORS = options?.limits?.max ?? PaletteColorsLimit.MAX;
    this.DEFAULT_MIN_COLORS = options?.limits?.min ?? PaletteColorsLimit.MIN;
  }

  getPaletteGenerator(): PaletteGenerator {
    return (options: generatePaletteOptions) => {
      const {
        lockedColors = [],
        colorsQuantity,
        paletteType,
        baseColor,
        luminosity,
        saturation,
      } = options;

      this.validatePaletteGeneration(
        {
          colorsQuantity: colorsQuantity,
          lockedColors: lockedColors.length,
          baseColor: baseColor,
        },
        paletteType !== PaletteType.RANDOM,
      );

      const colorMixerOption: ColorMixerOptions = {
        baseColor: baseColor || Color.generateRandomColor(),
        colorsQuantity: options.colorsQuantity,
        luminosity,
        saturation,
      };

      const colorMixer = getColorMixer({
        type: paletteType,
        options: colorMixerOption,
      });

      const colors = colorMixer.generateColors();
      return new Palette(colors);
    };
  }

  static editPalette(options: PaletteEditionOptions): Palette {
    const { type, palette, baseColor } = options;
    switch (type) {
      case PaletteEditType.ADD_COLOR:
        palette.addColor(baseColor);
        return palette;
      case PaletteEditType.REMOVE_COLOR:
        palette.removeColor(baseColor);
        return palette;
      default:
        return palette;
    }
  }

  private validatePaletteGeneration(
    {
      colorsQuantity,
      lockedColors,
      baseColor,
    }: {
      colorsQuantity: number;
      lockedColors: number;
      baseColor?: Color;
    },
    needBaseColor = false,
  ): void {
    if (colorsQuantity < this.DEFAULT_MIN_COLORS || colorsQuantity > this.DEFAULT_MAX_COLORS) {
      throw new InvalidColorsQuantityError(colorsQuantity);
    }

    if (lockedColors > colorsQuantity) {
      throw new InvalidParametersError();
    }

    if (needBaseColor && !baseColor) {
      throw new InvalidParametersError();
    }
  }
}
