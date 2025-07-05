import 'styled-components';
import { Theme } from './types';

declare module 'styled-components' {
  // Estendendo o tema padrão com o nosso tema personalizado
  // Adicionando uma propriedade opcional para garantir que a interface não esteja vazia
  export interface DefaultTheme extends Theme {
    _custom?: true;
  }
}
