import type { Formatter } from '../types';

/**
 * Formata um número de CPF (apenas números) para o formato XXX.XXX.XXX-XX
 * @param cpf Número de CPF a ser formatado
 * @returns CPF formatado
 */
export const formatCPF: Formatter<string> = (cpf) => {
  // Remove tudo que não for dígito
  const cleaned = cpf.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limited = cleaned.slice(0, 11);
  
  // Aplica a formatação
  return limited
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

/**
 * Valida um número de CPF
 * @param cpf Número de CPF a ser validado (com ou sem formatação)
 * @returns true se o CPF for válido, false caso contrário
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleaned = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos e não é uma sequência de números iguais
  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
    return false;
  }
  
  // Validação dos dígitos verificadores
  let sum = 0;
  let remainder: number;
  
  // Primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned[i - 1]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cleaned[9])) {
    return false;
  }
  
  // Segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  return remainder === parseInt(cleaned[10]);
};
