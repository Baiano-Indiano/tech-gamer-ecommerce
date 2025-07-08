import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      error: string;
      primary: string;
      primaryDark: string;
      gray: Record<string, string>;
      text: string;
      [key: string]: unknown;
    };
    space: Record<string, string>;
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    radii: Record<string, string>;
    shadows: Record<string, string>;
    transitions: Record<string, string>;
    [key: string]: unknown;
  }
}
