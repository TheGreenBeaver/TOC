import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme {
    colorMode: 'light' | 'dark',
    palette: {
      primaryMain: string,
      primaryActive1: string,

      textMain: string,
      textActive1: string,

      bgMain: string,
      bgActive1: string,
      bgActive2: string,
      bgActive3: string,

      border: string,
    },
    sizeStep: number,
    animation: string,
    border: {
      width: number,
      radius: number,
    },
    fontSize: number,
  }
}