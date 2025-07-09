import type { Formatter } from '../types';

/**
 * Converte uma string para slug (formato-url)
 * @param text Texto a ser convertido
 * @returns String em formato slug
 */
export const formatToSlug: Formatter = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Capitaliza a primeira letra de cada palavra em uma string
 * @param text Texto a ser capitalizado
 * @returns Texto capitalizado
 */
export const capitalize: Formatter = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Trunca um texto adicionando "..." se ultrapassar o tamanho máximo
 * @param text Texto a ser truncado
 * @param maxLength Tamanho máximo do texto
 * @returns Texto truncado se necessário
 */
export const truncate = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
