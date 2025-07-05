import type { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label do campo
   */
  label: string;
  
  /**
   * Texto de ajuda ou dica para o campo
   */
  helperText?: string;
  
  /**
   * Mensagem de erro a ser exibida
   */
  error?: string;
  
  /**
   * Ícone a ser exibido no lado esquerdo do input
   */
  icon?: React.ReactNode;

  /**
   * Elemento a ser exibido no lado direito do input (ex: ícone de olho para senha)
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Classes adicionais para o container do input
   */
  containerClassName?: string;
  
  /**
   * Se o campo é obrigatório
   * @default false
   */
  required?: boolean;
  
  /**
   * Se o campo está desabilitado
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Se o campo está em estado de carregamento
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Se o campo está em estado de sucesso
   * @default false
   */
  isSuccess?: boolean;
  
  /**
   * Se o campo está em estado de aviso
   * @default false
   */
  isWarning?: boolean;
  
  /**
   * Largura do input
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Tamanho do input
   * @default 'md'
   */
  size?: InputSize;
}

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /**
   * Se deve mostrar o medidor de força da senha
   * @default true
   */
  showStrengthMeter?: boolean;
  
  /**
   * Se deve mostrar os requisitos da senha
   * @default true
   */
  showRequirements?: boolean;
  
  /**
   * Função chamada quando a senha muda
   */
  onPasswordChange?: (password: string) => void;
}

export interface InputGroupProps {
  /**
   * Conteúdo do grupo de inputs
   */
  children: React.ReactNode;
  
  /**
   * Se o grupo está desabilitado
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Classes adicionais
   */
  className?: string;
  
  /**
   * Estilos inline
   */
  style?: React.CSSProperties;
}
