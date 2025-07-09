import React from 'react';
import { HighlightMatch } from './highlight';

/**
 * Hook que retorna uma função para destacar correspondências de texto
 * @param highlightStyle Estilo a ser aplicado ao texto destacado
 * @returns Função que recebe texto e query e retorna o texto com os destaques
 */
export const useHighlight = (highlightStyle?: React.CSSProperties) => {
  const highlight = React.useCallback((text: string, query: string) => {
    return React.createElement(HighlightMatch, { 
      text, 
      query, 
      highlightStyle 
    });
  }, [highlightStyle]);
  
  return highlight;
};
