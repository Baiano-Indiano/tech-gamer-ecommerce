/**
 * Expressão regular para validar e-mail
 * Fonte: https://emailregex.com/
 */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\d-]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Valida um endereço de e-mail
 * @param email Endereço de e-mail a ser validado
 * @returns true se o e-mail for válido, false caso contrário
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};
