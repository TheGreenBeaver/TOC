import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { ChildrenWrapper } from '../utilTypes';
import { ColorModeProvider } from './ColorModeContext';
import { ControlledThemeProvider } from './ControlledThemeProvider';
import { RootStyles } from './RootStyles';

export const ThemeEngine: ChildrenWrapper = ({ children }) => (
  <ColorModeProvider>
    <ControlledThemeProvider>
      <RootStyles />
      {children}
    </ControlledThemeProvider>
  </ColorModeProvider>
);