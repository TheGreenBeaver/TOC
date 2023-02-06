import type { FC } from 'react';
import { ThemeEngine } from './theme';
import { Pages } from './pages';

export const App: FC = () => (
  <ThemeEngine>
    <Pages />
  </ThemeEngine>
);