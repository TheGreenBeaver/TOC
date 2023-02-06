import type { DefaultTheme } from 'styled-components';
import type { ColorMode, Palette } from './types';

const lightPalette: Palette = {
  primaryMain: '#307fff',
  primaryActive1: '#3784ff',

  textMain: '#191919',
  textActive1: '#ffffff',

  bgMain: '#ffffff',
  bgActive1: '#f9f9f9',
  bgActive2: '#f4f4f4',
  bgActive3: '#ececec',

  border: '#D1D1D2',
};

const darkPalette: Palette = {
  primaryMain: '#307fff',
  primaryActive1: '#3784ff',

  textMain: '#ffffff',
  textActive1: '#ffffff',

  bgMain: '#000000',
  bgActive1: '#1e1e1e',
  bgActive2: '#2d2d2d',
  bgActive3: '#383838',

  border: '#474749',
};

const palette: Record<ColorMode, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};

export const getTheme = (colorMode: ColorMode): DefaultTheme => ({
  colorMode,
  palette: palette[colorMode],
  sizeStep: 8,
  animation: '150ms ease-in-out',
  border: {
    width: 2,
    radius: 2,
  },
  fontSize: 14,
});

