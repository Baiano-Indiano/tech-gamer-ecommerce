import React, { forwardRef } from 'react';
import styled from 'styled-components';
import type { InputBaseProps } from './types';

const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  margin-bottom: 1rem;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.space[1]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const InputWrapper = styled.div<{ $hasError: boolean; $fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.gray[300])};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s, box-shadow 0.2s;
  overflow: hidden;

  &:focus-within {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 1px
      ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
  }
`;

const StyledInput = styled.input.attrs<{ $hasIcon: boolean; $iconPosition?: 'left' | 'right' }>(({ size }) => ({
  // Converte o tamanho de string para número se necessário
  size: typeof size === 'string' ? undefined : size
}))<{ $hasIcon: boolean; $iconPosition?: 'left' | 'right' }>`
  flex: 1;
  width: 100%;
  padding: ${({ theme, $hasIcon, $iconPosition }) =>
    $hasIcon && $iconPosition === 'left'
      ? `${theme.space[2]} ${theme.space[3]} ${theme.space[2]} ${theme.space[8]}`
      : $hasIcon && $iconPosition === 'right'
      ? `${theme.space[2]} ${theme.space[8]} ${theme.space[2]} ${theme.space[3]}`
      : `${theme.space[2]} ${theme.space[3]}`};
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[800]};
  line-height: 1.5;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => ($position === 'left' ? 'left' : 'right')}: ${({ theme }) => theme.space[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ErrorText = styled.p`
  margin-top: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const HelperText = styled.p`
  margin-top: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

// Tipo personalizado para o tamanho do input
type InputSize = 'small' | 'medium' | 'large';

// Props do nosso componente
interface InputProps extends Omit<InputBaseProps, 'size'> {
  size?: InputSize;
}

// Tipo para as props do input HTML sem a propriedade size
type InputHTMLProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps & InputHTMLProps>(
  ({
    id,
    label,
    error,
    helperText,
    fullWidth = false,
    className,
    icon,
    iconPosition = 'left',
    size,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const hasHelperText = !!helperText || hasError;
    const showHelperText = hasHelperText && (helperText || error);

    // Aplicamos o tamanho como classe CSS
    const sizeClass = size ? `size-${size}` : '';

    // Filtramos as props que serão repassadas para o input
    const inputProps = Object.entries(props).reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (key !== 'size') {
        acc[key] = value;
      }
      return acc;
    }, {}) as InputHTMLProps;

    return (
      <InputContainer $fullWidth={fullWidth} className={`${className || ''} ${sizeClass}`}>
        {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
        <InputWrapper $hasError={hasError} $fullWidth={fullWidth}>
          {icon && (
            <IconWrapper $position={iconPosition}>
              {icon}
            </IconWrapper>
          )}
          <StyledInput
            ref={ref}
            id={inputId}
            $hasIcon={!!icon}
            $iconPosition={iconPosition}
            aria-invalid={hasError}
            aria-describedby={hasHelperText ? `${inputId}-helper` : undefined}
            // Não passamos a propriedade size para o input HTML
            {...inputProps}
          />
        </InputWrapper>
        {showHelperText && (
          <HelperText id={`${inputId}-helper`}>
            {hasError ? <ErrorText>{error}</ErrorText> : helperText}
          </HelperText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
