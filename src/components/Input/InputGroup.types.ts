import type { ReactNode } from 'react';
import type { InputProps } from './types';

type BaseInputGroupProps = Omit<InputProps, 'ref' | 'icon' | 'rightIcon'>;

/**
 * Props para o componente InputGroup
 */
interface InputGroupProps extends BaseInputGroupProps {
  /**
   * Elemento para ser exibido no início do input
   */
  startIcon?: ReactNode;
  
  /**
   * Elemento para ser exibido no final do input
   */
  endIcon?: ReactNode;
  
  /**
   * Define se o input ocupa toda a largura disponível
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Define se o medidor de força da senha deve ser exibido
   * @default false
   */
  showStrengthMeter?: boolean;
}

// Exporta o tipo para ser usado em outros arquivos
export type { InputGroupProps };

// Exporta um valor padrão para compatibilidade com imports existentes
const InputGroupDefaultExport: InputGroupProps = { label: '' };
export default InputGroupDefaultExport;
