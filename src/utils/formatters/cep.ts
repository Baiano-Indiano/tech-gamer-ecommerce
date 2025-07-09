import type { Formatter } from '../types/common';

/**
 * Formata um CEP para o formato XXXXX-XXX
 * @param cep Número do CEP a ser formatado
 * @returns CEP formatado
 */
export const formatCEP: Formatter<string> = (cep) => {
  // Remove tudo que não for dígito
  const cleaned = cep.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  const limited = cleaned.slice(0, 8);
  
  // Aplica a formatação
  return limited.replace(/(\d{5})(\d{1,3})/, '$1-$2');
};
