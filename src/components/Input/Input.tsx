import React, { forwardRef, useState, useEffect, useId } from 'react';
import styled, { css } from 'styled-components';
import { FiAlertCircle, FiCheck, FiLoader } from 'react-icons/fi';
import type { InputProps, InputSize } from './types';

const InputContainer = styled.div<{ $width?: string | number; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width = '100%' }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  position: relative;
`;

const Label = styled.label<{ $required?: boolean; $disabled?: boolean }>`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, $disabled }) => {
    if ($disabled) {
      const gray = theme.colors.gray;
      return typeof gray === 'string' ? gray : gray[400];
    }
    return theme.colors.text;
  }};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  
  &::after {
    content: ${({ $required }) => ($required ? '"*"' : '')};
    color: ${({ theme }) => theme.colors.error};
    font-size: 1.25em;
    line-height: 1;
    margin-left: 0.25rem;
    ${({ $required }) => !$required && 'display: none;'}
  }
  
  /* Melhora o foco para navegação por teclado */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 0.25rem;
  }
`;

const InputWrapper = styled.div<{
  $hasError?: boolean;
  $isFocused?: boolean;
  $disabled?: boolean;
  $isSuccess?: boolean;
  $isWarning?: boolean;
  $size?: InputSize;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme, $hasError, $isFocused, $isSuccess, $isWarning }) => {
    const { colors } = theme;
    
    // Handle error/success/warning states first
    if ($hasError) return colors.error || '#ef4444';
    if ($isSuccess) return colors.success || '#10b981';
    if ($isWarning) return colors.warning || '#f59e0b';
    
    // Handle focused state
    if ($isFocused) return colors.primary;
    
    // Handle default state with gray border
    const gray = colors.gray;
    if (typeof gray === 'string') {
      return gray;
    } else if (gray && typeof gray === 'object') {
      return gray[300] || '#d1d5db';
    }
    
    return '#d1d5db';
  }};
  border-radius: 0.5rem;
  background-color: ${({ theme, $disabled }) => {
    if ($disabled) {
      const gray = theme.colors.gray;
      if (typeof gray === 'string') return gray;
      return gray[100] || '#f3f4f6';
    }
    return theme.colors.background;
  }};
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ $isFocused, $hasError, theme }) => 
    $isFocused && !$hasError 
      ? `0 0 0 3px ${theme.colors.primary}20` 
      : 'none'};
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2.25rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return css`
          height: 3.5rem;
          font-size: 1.125rem;
        `;
      case 'md':
      default:
        return css`
          height: 2.75rem;
          font-size: 1rem;
        `;
    }
  }}
  
  &:hover {
    border-color: ${({ theme, $hasError, $isFocused, $disabled }) => 
      !$disabled && !$isFocused && !$hasError ? theme.colors.gray[400] : ''};
  }
`;

interface StyledInputProps {
  $hasIcon?: boolean;
  $hasRightElement?: boolean;
}

const StyledInput = styled.input<StyledInputProps>(
  ({ $hasIcon, $hasRightElement }) => css`
    flex: 1;
    width: 100%;
    height: 3.5rem;
    padding: 1rem ${$hasRightElement ? '3.5rem' : '1.25rem'} 1rem ${$hasIcon ? '3.5rem' : '1.25rem'};
    font-size: 1.0625rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.625rem;
    transition: all 0.2s ease;
    
    &::placeholder {
      color: ${({ theme }) => 
        typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[400]};
    }
    
    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => 
        typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[500]};
    }
  `
);

const IconContainer = styled.span<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => $position === 'left' ? 'left' : 'right'}: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const StatusIcon = styled.span<{ $type: 'error' | 'success' | 'warning' | 'loading' }>`
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${({ theme, $type }) => {
    const { colors } = theme;
    switch ($type) {
      case 'error':
        return colors.error;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'loading':
        return colors.primary;
      default:
        return 'inherit';
    }
  }};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  ${({ $type }) => $type === 'loading' && css`
    animation: spin 0.8s linear infinite;
  `}
`;

const HelperText = styled.span<{ $hasError: boolean }>`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme, $hasError }) => {
    const { colors } = theme;
    return $hasError ? 
      colors.error : 
      (typeof colors.gray === 'string' ? colors.gray : 
      (colors.gray as Record<number, string>)?.[500] || '#6b7280');
  }};
  margin-top: 0.25rem;
  line-height: 1.4;
  
  /* Melhora a legibilidade para usuários que aumentam a fonte */
  @media (prefers-reduced-motion: no-preference) {
    transition: color 0.2s ease-in-out;
  }
  
  /* Melhora o contraste para melhor legibilidade */
  &[role="alert"] {
    font-weight: 500;
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  rightIcon,
  containerClassName,
  required = false,
  disabled = false,
  isLoading = false,
  isSuccess = false,
  isWarning = false,
  width = '100%',
  size = 'md',
  helperText,
  onFocus,
  onBlur,
  id: propId,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  // Gera um ID único para o input se não for fornecido
  const id = useId();
  const inputId = propId || `input-${id}`;
  
  // Gera IDs para mensagens de ajuda e erro
  const helpTextId = `${inputId}-help`;
  const errorTextId = `${inputId}-error`;
  
  // Determina se deve mostrar mensagem de erro
  const hasError = !!error;
  
  // Combina IDs de descrição fornecidos com os gerados
  const descriptionIds = [
    hasError ? errorTextId : null,
    helperText ? helpTextId : null,
    ariaDescribedBy
  ].filter(Boolean).join(' ');
  const [isFocused, setIsFocused] = useState(false);
  const hasIcon = !!icon;
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  const showStatusIcon = !disabled && (isLoading || isSuccess || isWarning || hasError);
  const statusType = isLoading ? 'loading' : 
    hasError ? 'error' : 
    isSuccess ? 'success' : 
    isWarning ? 'warning' : '';
    
  // Efeito para garantir que o elemento de erro seja anunciado por leitores de tela
  useEffect(() => {
    if (hasError && typeof document !== 'undefined') {
      const errorElement = document.getElementById(errorTextId);
      if (errorElement) {
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'assertive');
      }
    }
  }, [hasError, errorTextId]);
    
  // Determina se deve mostrar o ícone à direita (status ou rightIcon)
  const hasRightElement = showStatusIcon || !!rightIcon;
  
  // Propriedades ARIA para acessibilidade
  const inputAriaProps = {
    'aria-invalid': hasError,
    'aria-required': required || undefined,
    'aria-describedby': descriptionIds || undefined,
    'aria-busy': isLoading || undefined,
    'aria-disabled': disabled || undefined,
  };
  
  return (
    <InputContainer 
      className={containerClassName}
      $width={width || '100%'}
      $disabled={!!disabled}
    >
      {label && (
        <Label 
          htmlFor={inputId}
          $required={required} 
          $disabled={disabled}
        >
          {label}
        </Label>
      )}
      
      <InputWrapper
        $hasError={!!error}
        $isFocused={isFocused}
        $disabled={disabled}
        $isSuccess={isSuccess}
        $isWarning={isWarning}
        $size={size}
      >
        {hasIcon && (
          <IconContainer $position="left">
            {icon}
          </IconContainer>
        )}
        
        <StyledInput
          ref={ref}
          id={inputId}
          $hasIcon={!!hasIcon}
          $hasRightElement={!!hasRightElement}
          disabled={disabled || isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputAriaProps}
          {...props}
        />
        
        {/* Right icon (status or custom rightIcon) */}
        {hasRightElement && (
          <IconContainer $position="right">
            {showStatusIcon && statusType ? (
              <StatusIcon $type={statusType}>
                {isLoading ? (
                  <FiLoader />
                ) : error ? (
                  <FiAlertCircle />
                ) : isSuccess ? (
                  <FiCheck />
                ) : isWarning ? (
                  <FiAlertCircle />
                ) : null}
              </StatusIcon>
            ) : (
              rightIcon
            )}
          </IconContainer>
        )}
      </InputWrapper>
      
      {/* Mensagem de erro com role="alert" para leitores de tela */}
      {hasError && (
        <HelperText 
          id={errorTextId}
          $hasError={true}
          role="alert"
          aria-live="assertive"
        >
          {error}
        </HelperText>
      )}
      
      {/* Mensagem de ajuda normal */}
      {helperText && !hasError && (
        <HelperText 
          id={helpTextId}
          $hasError={false}
        >
          {helperText}
        </HelperText>
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
