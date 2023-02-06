import type { DefaultTheme } from 'styled-components';
import type { ColorMode, Palette } from './types';

const lightPalette: Palette = {
  primaryMain: '#307fff',
  primaryActive1: '#2f7af3',

  textMain: 'rgb(25, 25, 28)',
  textActive1: '#ffffff',

  bgMain: '#ffffff',
  bgActive1: '#f9f9f9',
  bgActive2: '#f4f4f4',
  bgActive3: '#e8e8e8',

  border: '#d1d1d2',
};

const darkPalette: Palette = {
  primaryMain: '#307fff',
  primaryActive1: '#3b86ff',

  textMain: 'rgba(255, 255, 255, 0.8)',
  textActive1: '#ffffff',

  bgMain: '#19191c',
  bgActive1: '#1f1f21',
  bgActive2: '#252528',
  bgActive3: '#303033',

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

