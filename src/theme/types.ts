import type { DefaultTheme } from 'styled-components';

export type ColorMode = DefaultTheme['colorMode'];

export type Palette = DefaultTheme['palette'];

export type Color = keyof Palette;