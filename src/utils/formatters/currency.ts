import { FormatOptions } from '../types';

/**
 * Formata um valor numérico para moeda
 * @param value Valor a ser formatado
 * @param options Opções de formatação
 * @returns Valor formatado como moeda
 */
export const formatCurrency = (
  value: number,
  options: FormatOptions = {}
): string => {
  const {
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Formata um valor para porcentagem
 * @param value Valor a ser formatado (0 a 1)
 * @param options Opções de formatação
 * @returns Valor formatado como porcentagem
 */
export const formatPercentage = (
  value: number,
  options: Omit<FormatOptions, 'currency'> = {}
): string => {
  const {
    locale = 'pt-BR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};
