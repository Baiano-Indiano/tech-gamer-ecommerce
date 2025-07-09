/**
 * Valida um CEP (Código de Endereçamento Postal) brasileiro
 * @param cep CEP a ser validado (com ou sem formatação)
 * @returns true se o CEP for válido, false caso contrário
 */
export const validateCEP = (cep: string): boolean => {
  // Remove caracteres não numéricos
  const cleaned = cep.replace(/\D/g, '');
  
  // Verifica se tem 8 dígitos
  if (cleaned.length !== 8) {
    return false;
  }
  
  // Verifica se não é uma sequência de números iguais
  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  return true;
};
