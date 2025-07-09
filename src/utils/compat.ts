// Este arquivo é mantido para compatibilidade com código existente
// Novos componentes devem importar diretamente dos módulos específicos

// Re-exportações de formatters
import { 
  formatCPF, 
  validateCPF, 
  validateEmail 
} from './formatters';

// Re-exportações de searchUtils
import { 
  debounce,
  formatPrice
} from './search';

// Exporta tudo o que era exportado anteriormente
export {
  formatCPF,
  validateCPF,
  validateEmail,
  debounce,
  formatPrice
};
