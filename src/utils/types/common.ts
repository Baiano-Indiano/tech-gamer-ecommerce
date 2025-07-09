/**
 * Tipo para funções de formatação
 */
export type Formatter<T = string> = (value: T) => string;

/**
 * Opções para funções de formatação
 */
export interface FormatOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}
