import { createGlobalStyle } from 'styled-components';
import { ThemeHelpers } from './helpers';

export const RootStyles = createGlobalStyle`
  *, *:before, *:after, *::placeholder {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    color: ${ThemeHelpers.color('textMain')};
  }
  
  #root {
    height: 100vh;
    width: 100vw;
  }
  
  html {
    font-size: ${({ theme }) => theme.fontSize};
  }
`;