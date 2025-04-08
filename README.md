# 🎨 Color Palette Generator

Una herramienta escrita en TypeScript para generar, manipular y serializar paletas de colores. Ideal para proyectos creativos que requieren control y aleatoriedad sobre la composición cromática.

## 🚀 Instalación

```bash
npm install color-palette-generator
```

## 📆 Características

- Creación de colores a partir de valores RGB(A) o hexadecimal.
- Generación aleatoria de colores.
- Serialización y deserialización de paletas.
- Edición de paletas: agregar o remover colores.
- Validaciones incluidas para evitar errores comunes.
- Soporte para distintos tipos de paletas: monocromáticas, análogas, complementarias, etc.

## 🔧 Uso básico

### Crear un color manualmente

```ts
import { Color } from "color-palette-generator";

const rojo = new Color({ red: 255, green: 0, blue: 0 });
console.log(rojo.hexColor); // ff0000
```

### Crear un color desde un valor hexadecimal

```ts
const azul = Color.fromHexColor("0000ff");
```

### Generar un color aleatorio

```ts
const randomColor = Color.generateRandomColor();
```

### Crear una paleta

```ts
import { Palette } from "color-palette-generator";

const paleta = new Palette([rojo, azul]);
console.log(paleta.toString()); // JSON con los colores en hexadecimal
```

### Agregar o eliminar colores

```ts
paleta.addColor(randomColor);
paleta.removeColor(rojo);
```

### Clonar una paleta

```ts
const copia = paleta.clone();
```

## 🧪 Generador de Paletas

Puedes usar `PaletteFactory` para generar automáticamente paletas personalizadas:

```ts
import { PaletteFactory, PaletteType } from "color-palette-generator";

const factory = new PaletteFactory();

const generator = factory.getPaletteGenerator();

const paleta = generator({
  paletteType: PaletteType.MONOCHROMATIC,
  lockedColors: [],
  colorsQuantity: 4,
  baseColor: Color.fromHexColor("3498db"),
});
```

## ✏️ Editar paletas

```ts
import { PaletteFactory, PaletteEditType } from "color-palette-generator";

PaletteFactory.editPalette({
  type: PaletteEditType.ADD_COLOR,
  palette,
  baseColor: newColor,
});
```

## 📚 Tipos de paletas soportadas

- `RANDOM`
- `MONOCHROMATIC`
- `ANALOGOUS`
- `COMPLEMENTARY`
- `TRIADIC`
- `COMPOUND`

## 🛠️ Tipos personalizados

Consulta los tipos disponibles en el archivo `types.ts`, como:

- `PaletteType`
- `PaletteEditType`
- `PaletteEditionOptions`
- `generatePaletteOptions`

## ⚠️ Validaciones

Esta librería incluye validaciones integradas para:

- Colores hexadecimales inválidos.
- Número inválido de colores en la paleta.
- Parámetros faltantes o incorrectos en la generación.

---

## 📄 Licencia

MIT
