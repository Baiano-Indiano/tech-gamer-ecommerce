import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Tipos base para componentes de UI
 */

export interface BaseComponentProps {
  /**
   * Classe CSS adicional para estilização personalizada
   */
  className?: string;
  
  /**
   * Estilos inline para personalização direta
   */
  style?: CSSProperties;
  
  /**
   * ID do elemento para testes e seletores
   */
  'data-testid'?: string;
}

export interface WithChildren {
  /**
   * Conteúdo filho do componente
   */
  children: ReactNode;
}

export interface WithOptionalChildren {
  /**
   * Conteúdo filho opcional do componente
   */
  children?: ReactNode;
}

/**
 * Tipos para componentes de feedback
 */
export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export type Size = 'sm' | 'md' | 'lg';

/**
 * Tipos para componentes de formulário
 */
export interface FormFieldProps extends BaseComponentProps {
  /**
   * Rótulo do campo
   */
  label?: string;
  
  /**
   * Texto de ajuda ou dica
   */
  helperText?: string;
  
  /**
   * Mensagem de erro
   */
  error?: string;
  
  /**
   * Se o campo é obrigatório
   */
  required?: boolean;
  
  /**
   * Se o campo está desabilitado
   */
  disabled?: boolean;
  
  /**
   * Se o campo está em estado de carregamento
   */
  isLoading?: boolean;
  
  /**
   * ID do campo para acessibilidade
   */
  id?: string;
  
  /**
   * Nome do campo para formulários
   */
  name?: string;
}

/**
 * Tipos para componentes de botão
 */
export interface ButtonProps extends BaseComponentProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  /**
   * Conteúdo do botão
   */
  children?: ReactNode;
  
  /**
   * Variante de estilo do botão
   */
  variant?: Variant | 'link' | 'outline' | 'ghost';
  
  /**
   * Tamanho do botão
   */
  size?: Size;
  
  /**
   * Se o botão deve ocupar toda a largura disponível
   */
  fullWidth?: boolean;
  
  /**
   * Se o botão está em estado de carregamento
   */
  isLoading?: boolean;
  
  /**
   * Ícone para ser exibido antes do texto
   */
  startIcon?: ReactNode;
  
  /**
   * Ícone para ser exibido após o texto
   */
  endIcon?: ReactNode;
  
  /**
   * Se o botão deve ser exibido apenas como ícone
   */
  iconOnly?: boolean;
  
  /**
   * Se o botão deve ter bordas arredondadas
   */
  rounded?: boolean | 'full';
}

/**
 * Tipos para componentes de feedback
 */
export interface AlertProps extends BaseComponentProps, WithChildren {
  /**
   * Variante de estilo do alerta
   */
  variant?: Variant;
  
  /**
   * Se o alerta pode ser fechado
   */
  dismissible?: boolean;
  
  /**
   * Função chamada quando o alerta é fechado
   */
  onDismiss?: () => void;
  
  /**
   * Ícone personalizado
   */
  icon?: ReactNode;
}

/**
 * Tipos para componentes de overlay/modal
 */
export interface ModalProps extends BaseComponentProps, WithChildren {
  /**
   * Se o modal está aberto
   */
  isOpen: boolean;
  
  /**
   * Título do modal
   */
  title?: string;
  
  /**
   * Função chamada quando o modal é fechado
   */
  onClose: () => void;
  
  /**
   * Tamanho do modal
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Se o modal deve fechar ao clicar fora
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Se o modal deve fechar ao pressionar ESC
   */
  closeOnEsc?: boolean;
  
  /**
   * Elemento onde o portal do modal será renderizado
   */
  container?: HTMLElement | null;
}

/**
 * Tipos para componentes de notificação/toast
 */
export interface ToastProps extends BaseComponentProps {
  /**
   * Título da notificação
   */
  title?: string;
  
  /**
   * Descrição da notificação
   */
  description?: string;
  
  /**
   * Variante de estilo
   */
  variant?: Variant;
  
  /**
   * Duração em milissegundos até a notificação fechar automaticamente
   */
  duration?: number;
  
  /**
   * Se a notificação pode ser fechada
   */
  isClosable?: boolean;
  
  /**
   * Posição da notificação na tela
   */
  position?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  
  /**
   * Função chamada quando a notificação é fechada
   */
  onClose?: () => void;
  
  /**
   * Ícone personalizado
   */
  icon?: ReactNode;
}

/**
 * Tipos para componentes de carregamento
 */
export interface SpinnerProps extends BaseComponentProps {
  /**
   * Tamanho do spinner em pixels
   */
  size?: number;
  
  /**
   * Cor do spinner
   */
  color?: string;
  
  /**
   * Espessura da borda do spinner
   */
  thickness?: number;
  
  /**
   * Rótulo para acessibilidade
   */
  label?: string;
}

/**
 * Tipos para componentes de skeleton
 */
export interface SkeletonProps extends BaseComponentProps {
  /**
   * Largura do skeleton
   */
  width?: number | string;
  
  /**
   * Altura do skeleton
   */
  height?: number | string;
  
  /**
   * Se o skeleton deve ser circular
   */
  isCircle?: boolean;
  
  /**
   * Número de linhas do skeleton
   */
  count?: number;
  
  /**
   * Espaçamento entre as linhas
   */
  spacing?: number | string;
  
  /**
   * Se deve mostrar a animação de carregamento
   */
  isLoaded?: boolean;
  
  /**
   * Conteúdo a ser exibido quando o carregamento estiver concluído
   */
  children?: ReactNode;
}

/**
 * Tipos para componentes de tooltip
 */
export interface TooltipProps extends BaseComponentProps, WithChildren {
  /**
   * Conteúdo do tooltip
   */
  content: ReactNode;
  
  /**
   * Posição do tooltip em relação ao elemento alvo
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Se o tooltip está aberto (controlado)
   */
  isOpen?: boolean;
  
  /**
   * Se o tooltip deve fechar ao clicar fora
   */
  closeOnClick?: boolean;
  
  /**
   * Offset do tooltip em relação ao alvo
   */
  offset?: [number, number];
  
  /**
   * Atraso para exibir o tooltip (ms)
   */
  delayShow?: number;
  
  /**
   * Atraso para esconder o tooltip (ms)
   */
  delayHide?: number;
}
