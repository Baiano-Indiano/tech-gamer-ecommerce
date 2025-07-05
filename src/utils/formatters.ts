/**
 * Formata um número de CPF (apenas números) para o formato XXX.XXX.XXX-XX
 * @param cpf Número de CPF a ser formatado
 * @returns CPF formatado
 */
export const formatCPF = (cpf: string): string => {
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
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned[i - 1]) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  return remainder === parseInt(cleaned[10]);
};

/**
 * Formata um número de telefone para o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * @param phone Número de telefone a ser formatado
 * @returns Telefone formatado
 */
export const formatPhone = (phone: string): string => {
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

/**
 * Formata uma data para o formato YYYY-MM-DD (para inputs do tipo date)
 * @param date Data a ser formatada
 * @returns Data formatada
 */
export const formatDateForInput = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Formata uma data para exibição no formato DD/MM/YYYY
 * @param date Data a ser formatada
 * @returns Data formatada
 */
export const formatDateDisplay = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formata um valor monetário para o formato brasileiro (R$ 1.234,56)
 * @param value Valor a ser formatado
 * @param decimals Número de casas decimais (padrão: 2)
 * @returns Valor formatado
 */
export const formatCurrency = (value: number | string, decimals = 2): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  
  if (Number.isNaN(number)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Formata um CEP para o formato XXXXX-XXX
 * @param cep Número do CEP a ser formatado
 * @returns CEP formatado
 */
export const formatCEP = (cep: string): string => {
  // Remove tudo que não for dígito
  const cleaned = cep.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  const limited = cleaned.slice(0, 8);
  
  // Aplica a formatação
  return limited.replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

/**
 * Valida um endereço de e-mail
 * @param email Endereço de e-mail a ser validado
 * @returns true se o e-mail for válido, false caso contrário
 */
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Formata um número de cartão de crédito para o formato XXXX XXXX XXXX XXXX
 * @param cardNumber Número do cartão a ser formatado
 * @returns Número do cartão formatado
 */
export const formatCreditCardNumber = (cardNumber: string): string => {
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
export const formatCardExpiry = (expiryDate: string): string => {
  // Remove tudo que não for dígito
  const cleaned = expiryDate.replace(/\D/g, '');
  
  // Limita a 4 dígitos
  const limited = cleaned.slice(0, 4);
  
  // Aplica a formatação
  return limited.replace(/(\d{2})(\d{1,2})/, '$1/$2');
};
