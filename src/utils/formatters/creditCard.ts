import type { Formatter } from '../types/common';

/**
 * Formata um número de cartão de crédito para o formato XXXX XXXX XXXX XXXX
 * @param cardNumber Número do cartão a ser formatado
 * @returns Número do cartão formatado
 */
export const formatCreditCardNumber: Formatter<string> = (cardNumber) => {
  // Remove tudo que não for dígito
  const cleaned = cardNumber.replace(/\D/g, '');
  
  // Limita a 16 dígitos
  const limited = cleaned.slice(0, 16);
  
  // Aplica a formatação
  return limited.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

/**
 * Formata a data de validade do cartão para o formato MM/AA
 * @param expiryDate Data de validade no formato MM/AA ou MMAA
 * @returns Data de validade formatada
 */
export const formatCardExpiry: Formatter<string> = (expiryDate) => {
  // Remove tudo que não for dígito
  const cleaned = expiryDate.replace(/\D/g, '');
  
  // Limita a 4 dígitos
  const limited = cleaned.slice(0, 4);
  
  // Aplica a formatação
  return limited.replace(/(\d{2})(\d{1,2})/, '$1/$2');
};
