import type { StyledProps } from 'styled-components';
import type { Color } from './types';
import isNumber from 'lodash/isNumber';

const singleSize = (scale: number | string = 1) =>
  <Props extends object>({ theme }: StyledProps<Props>): string => isNumber(scale)
    ? `${theme.sizeStep * scale}px`
    : scale;

const size = (...scales: (number | string)[]) =>
  <Props extends object>(props: StyledProps<Props>): string => scales.length
    ? scales.map(scale => singleSize(scale)(props)).join(' ')
    : singleSize()(props);

const color = (colorKey: Color) =>
  <Props extends object>({ theme }: StyledProps<Props>): string => theme.palette[colorKey];

const border = <Props extends object>(props: StyledProps<Props>) =>
  `${props.theme.border.width}px ${color('border')(props)}`;

const transition = (...attrs: string[]) => <Props extends object>({ theme }: StyledProps<Props>): string => `
  transition: ${theme.animation};
  transition-property: ${attrs.join(', ') || 'all'};
`;

export const ThemeHelpers = {
  color,
  size,
  border,
  transition,
};