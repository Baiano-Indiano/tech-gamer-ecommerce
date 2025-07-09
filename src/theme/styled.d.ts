import 'styled-components';
import { Theme } from './types';

declare module 'styled-components' {
  // Estendendo o tema padrão com o nosso tema personalizado
  export interface DefaultTheme extends Theme {
    // Adicionando propriedades adicionais que podem ser necessárias
    // e que não estão na interface Theme original
    colors: Theme['colors'] & {
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
