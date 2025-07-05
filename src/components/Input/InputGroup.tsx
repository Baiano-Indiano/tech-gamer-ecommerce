import React, { forwardRef } from 'react';
import styled from 'styled-components';

type InputGroupBaseProps = {
  /**
   * Ícone a ser exibido no início do grupo de entrada
   */
  startIcon?: React.ReactNode;
  
  /**
   * Ícone a ser exibido no final do grupo de entrada
   */
  endIcon?: React.ReactNode;
  
  /**
   * Classe CSS adicional para o container do grupo
   */
  className?: string;
  
  /**
   * Estilos inline para o container do grupo
   */
  style?: React.CSSProperties;
  
  /**
   * Se o grupo deve ocupar toda a largura disponível
   * @default true
   */
  fullWidth?: boolean;
  
  /**
   * Texto de ajuda ou dica para o campo
   */
  helperText?: string;
  
  /**
   * Mensagem de erro a ser exibida
   */
  error?: string;
  
  /**
   * Se o campo é obrigatório
   */
  required?: boolean;
  
  /**
   * ID do campo para associação com a label
   */
  id?: string;
};

type InputGroupProps = InputGroupBaseProps & {
  /**
   * Rótulo do campo
   */
  label?: string;
  
  /**
   * Conteúdo do grupo (geralmente um Input ou PasswordInput)
   */
  children: React.ReactNode;
};

const InputGroupContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};
  position: relative;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    &[required]::after {
      content: '*';
      color: ${({ theme }) => theme.colors.error};
      margin-left: 0.25rem;
    }
  }
`;

const InputWrapper = styled.div<{ $hasStartIcon: boolean; $hasEndIcon: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  
  /* Estilo para garantir que o input interno ocupe toda a largura */
  & > div {
    width: 100%;
  }
`;

const IconContainer = styled.span<{ $position: 'start' | 'end' }>`
  position: absolute;
  ${({ $position }) => ($position === 'start' ? 'left' : 'right')}: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  z-index: 1;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const StyledInput = styled.div<{ $hasStartIcon: boolean; $hasEndIcon: boolean }>`
  flex: 1;
  width: 100%;
  
  /* Ajusta o padding dos inputs internos baseado nos ícones */
  .input-container {
    width: 100%;
    
    input {
      padding-left: ${({ $hasStartIcon }) => ($hasStartIcon ? '3rem' : '1rem')} !important;
      padding-right: ${({ $hasEndIcon }) => ($hasEndIcon ? '3rem' : '1rem')} !important;
    }
  }
`;

/**
 * Componente InputGroup que permite adicionar ícones e agrupar elementos de entrada
 */
const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(({
  startIcon,
  endIcon,
  className,
  style,
  fullWidth = true,
  label,
  helperText,
  error,
  required,
  id,
  children,
}, ref) => {
  const hasStartIcon = !!startIcon;
  const hasEndIcon = !!endIcon;
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Clona o elemento filho para adicionar props adicionais
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        id: inputId,
        ...(required && { required: true }),
        ...(error && { error: true }),
        style: { width: '100%', ...child.props.style },
      });
    }
    return child;
  });
  
  return (
    <InputGroupContainer 
      ref={ref}
      className={className}
      style={style}
      $fullWidth={fullWidth}
    >
      {label && (
        <label htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true" />}
        </label>
      )}
      
      <InputWrapper 
        $hasStartIcon={hasStartIcon}
        $hasEndIcon={hasEndIcon}
      >
        {hasStartIcon && (
          <IconContainer $position="start" aria-hidden="true">
            {startIcon}
          </IconContainer>
        )}
        
        <StyledInput 
          $hasStartIcon={hasStartIcon}
          $hasEndIcon={hasEndIcon}
          className="input-container"
        >
          {enhancedChildren}
        </StyledInput>
        
        {hasEndIcon && (
          <IconContainer $position="end" aria-hidden="true">
            {endIcon}
          </IconContainer>
        )}
      </InputWrapper>
      
      {helperText && !error && (
        <div className="helper-text" style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          marginTop: '0.25rem'
        }}>
          {helperText}
        </div>
      )}
      
      {error && (
        <div className="error-text" style={{
          fontSize: '0.75rem',
          color: '#ef4444',
          marginTop: '0.25rem'
        }}>
          {error}
        </div>
      )}
    </InputGroupContainer>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
