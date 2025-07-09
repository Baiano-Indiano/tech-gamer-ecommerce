import type { Formatter } from '../types/common';

/**
 * Formata um número de telefone para o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * @param phone Número de telefone a ser formatado
 * @returns Telefone formatado
 */
export const formatPhone: Formatter<string> = (phone) => {
  // Remove tudo que não for dígito
  const cleaned = phone.replace(/\D/g, '');
  
  // Limita a 11 dígitos (com DDD e nono dígito)
  const limited = cleaned.slice(0, 11);
  
  // Formatação para celular com nono dígito
  if (limited.length > 10) {
    return limited
      .replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  }
  
  // Formatação para telefone fixo
  if (limited.length > 5) {
    return limited
      .replace(/(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }
  
  // Formatação parcial
  if (limited.length > 2) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  
  return limited;
};
