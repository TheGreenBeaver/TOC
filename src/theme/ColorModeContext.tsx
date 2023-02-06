import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import type { ColorMode } from './types';
import { usePersistentState } from 'any-fish';
import { useMediaQuery } from '../hooks';
import type { ChildrenWrapper } from '../utilTypes';
import noop from 'lodash/noop';

type ContextType = {
  colorMode: ColorMode,
  setColorMode: (newMode: ColorMode) => void,
  matchesSystem: boolean,
  setMatchesSystem: (newMatchesSystem: boolean) => void,
};

const ColorModeContext = createContext<ContextType>({
  colorMode: 'light',
  setColorMode: noop,
  matchesSystem: false,
  setMatchesSystem: noop,
});

export const ColorModeProvider: ChildrenWrapper = ({ children }) => {
  const userPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const userPreferredMode: ColorMode = userPrefersDark ? 'dark' : 'light';

  const [colorMode, setColorMode] = usePersistentState(userPreferredMode, 'ColorMode');
  const [matchesSystem, setMatchesSystem] = usePersistentState(true, 'MatchesSystem');

  useEffect(() => {
    if (matchesSystem) {
      setColorMode(userPreferredMode);
    }
  }, [userPreferredMode, matchesSystem, setColorMode]);

  const changeColorMode = useCallback((newColorMode: ColorMode) => {
    setColorMode(newColorMode);
    setMatchesSystem(false);
  }, [setColorMode, setMatchesSystem]);

  const contextValue = useMemo<ContextType>(() => ({
    colorMode,
    setColorMode: changeColorMode,
    matchesSystem,
    setMatchesSystem,
  }), [colorMode, matchesSystem, changeColorMode, setMatchesSystem]);

  return <ColorModeContext.Provider value={contextValue}>{children}</ColorModeContext.Provider>;
};

export const useColorMode = () => useContext(ColorModeContext);