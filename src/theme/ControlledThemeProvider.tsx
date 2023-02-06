import { useColorMode } from './ColorModeContext';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './theme';
import { useMemo } from 'react';
import type { ChildrenWrapper } from '../utilTypes';

export const ControlledThemeProvider: ChildrenWrapper = ({ children }) => {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => getTheme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};