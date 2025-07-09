import type { InputHTMLAttributes } from 'react';

// Tipo personalizado para o tamanho do input
type InputSize = 'small' | 'medium' | 'large';

export interface InputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Texto de ajuda ou descrição do campo */
  helperText?: string;
  /** Mensagem de erro a ser exibida */
  error?: string;
  /** Tamanho do input */
  size?: InputSize;
  /** Se o input deve ocupar toda a largura disponível */
  fullWidth?: boolean;
  /** Rótulo do campo */
  label?: string;
  /** Ícone opcional para o input */
  icon?: React.ReactNode;
  /** Posição do ícone */
  iconPosition?: 'left' | 'right';
}

export interface InputGroupProps {
  /** Elementos filhos do grupo */
  children: React.ReactNode;
  /** Direção do agrupamento */
  direction?: 'vertical' | 'horizontal';
  /** Espaçamento entre os itens */
  gap?: string | number;
  /** Se o grupo deve ocupar toda a largura disponível */
  fullWidth?: boolean;
}

/** Propriedades para o componente PasswordInput */
export interface PasswordInputProps extends Omit<InputBaseProps, 'type'> {
  /** Se deve mostrar o botão de alternar visibilidade da senha */
  showToggle?: boolean;
  /** Força um nível específico de força da senha (para uso controlado) */
  strengthLevel?: 0 | 1 | 2 | 3 | 4;
  /** Mensagens customizadas para cada nível de força da senha */
  strengthMessages?: PasswordStrengthMessages;
  /** Callback chamado quando a senha é alterada */
  onStrengthChange?: (strength: number) => void;
}

/** Mensagens de força da senha */
export interface PasswordStrengthMessages {
  /** Mensagem para senha muito curta */
  tooShort: string;
  /** Mensagem para senha fraca */
  weak: string;
  /** Mensagem para senha razoável */
  fair: string;
  /** Mensagem para senha boa */
  good: string;
  /** Mensagem para senha forte */
  strong: string;
}

/** Propriedades para o componente PasswordStrengthMeter */
export interface PasswordStrengthMeterProps {
  /** Nível de força da senha (0-4) */
  strength: number;
  /** Mensagens personalizadas para cada nível de força */
  messages?: Partial<PasswordStrengthMessages>;
  /** Classe CSS personalizada */
  className?: string;
}
