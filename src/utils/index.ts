// Formatters
export { formatCPF, validateCPF } from './formatters/cpf';
export { formatCurrency, formatPercentage } from './formatters/currency';
export { formatDate, formatDateRelative } from './formatters/date';
export { formatToSlug, capitalize, truncate } from './formatters/string';

// Hooks
export { useDebounce } from './hooks/useDebounce';
export { useMediaQuery } from './hooks/useMediaQuery';

// Validation
export { validateCPF as validateCPFUtil } from './validation/cpf';
export { validateEmail } from './validation/email';
export { validatePassword, type PasswordValidationResult } from './validation/password';

// Search
export { HighlightMatch } from './search/highlight';
export { useHighlight } from './search/useHighlight';
export { debounce, formatPrice, isMobile } from './search';

// Compatibilidade
export * from './compat';
