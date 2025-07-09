/**
 * Valida um número de telefone brasileiro
 * @param phone Número de telefone a ser validado (com ou sem formatação)
 * @returns true se o telefone for válido, false caso contrário
 */
export const validatePhone = (phone: string): boolean => {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem entre 10 e 11 dígitos
  if (cleaned.length < 10 || cleaned.length > 11) {
    return false;
  }
  
  // Verifica se o DDD é válido (11 a 99)
  const ddd = parseInt(cleaned.substring(0, 2), 10);
  if (ddd < 11 || ddd > 99) {
    return false;
  }
  
  // Se tiver 11 dígitos, o primeiro dígito após o DDD deve ser 9 para celular
  if (cleaned.length === 11 && cleaned[2] !== '9') {
    return false;
  }
  
  return true;
};
