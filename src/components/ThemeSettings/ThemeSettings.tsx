import type { FC } from 'react';
import { useColorMode } from '../../theme';
import { FixedContainer, OptionContainer } from './styles';

export const ThemeSettings: FC = () => {
  const { setMatchesSystem, matchesSystem, setColorMode, colorMode } = useColorMode();

  return (
    <FixedContainer>
      <h4>Set color mode</h4>

      <OptionContainer>
        <input
          type='radio'
          id='dark'
          checked={!matchesSystem && colorMode === 'dark'}
          onChange={e => e.target.checked && setColorMode('dark')}
        />
        <label htmlFor='dark'>Dark</label>
      </OptionContainer>

      <OptionContainer>
        <input
          type='radio'
          id='light'
          checked={!matchesSystem && colorMode === 'light'}
          onChange={e => e.target.checked && setColorMode('light')}
        />
        <label htmlFor='light'>Light</label>
      </OptionContainer>

      <OptionContainer>
        <input
          type='radio'
          id='matchesSystem'
          checked={matchesSystem}
          onChange={e => setMatchesSystem(e.target.checked)}
        />
        <label htmlFor='matchesSystem'>System default</label>
      </OptionContainer>
    </FixedContainer>
  );
};