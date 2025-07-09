import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import type { ButtonProps, Variant } from '../../ui/ui.types';
import Spinner from '../../feedback/Spinner';

type ButtonVariant = Variant | 'outline' | 'ghost' | 'link';

type ButtonBaseProps = {
  $variant?: ButtonVariant;
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $isLoading?: boolean;
  $iconOnly?: boolean;
  $rounded?: boolean | 'full';
  $isDark?: boolean;
};

const ButtonBase = styled.button<ButtonBaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  font-family: inherit;
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  /* Focus state */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Size variants */
  ${({ $size = 'md' }) => {
    switch ($size) {
      case 'sm':
        return css`
          font-size: 0.875rem;
          padding: 0.375rem 0.75rem;
          border-radius: 0.25rem;
          min-height: 2rem;
        `;
      case 'lg':
        return css`
          font-size: 1.125rem;
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          min-height: 3rem;
        `;
      case 'md':
      default:
        return css`
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          min-height: 2.5rem;
        `;
    }
  }}
  
  /* Full width */
  ${({ $fullWidth }) => 
    $fullWidth && 
    css`
      width: 100%;
    `
  }
  
  /* Rounded */
  ${({ $rounded }) => {
    if ($rounded === true) {
      return css`
        border-radius: 9999px;
      `;
    } else if ($rounded === 'full') {
      return css`
        border-radius: 50%;
        aspect-ratio: 1;
        padding: 0;
      `;
    }
    return '';
  }}
  
  /* Icon only */
  ${({ $iconOnly }) => 
    $iconOnly && 
    css`
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    `
  }
  
  /* Variant styles */
  ${({ theme, $variant = 'primary' }) => {
    // Mapeamento de variantes para cores do tema
    const variantColors: Record<ButtonVariant, { bg: string; text: string; hover: string; active: string }> = {
      primary: {
        bg: theme.colors.primary,
        text: theme.colors.white,
        hover: theme.colors.primaryDark,
        active: theme.colors.primaryDark
      },
      secondary: {
        bg: theme.colors.secondary,
        text: theme.colors.white,
        hover: theme.colors.secondaryDark,
        active: theme.colors.secondaryDark
      },
      success: {
        bg: theme.colors.success,
        text: theme.colors.white,
        hover: theme.colors.success,
        active: theme.colors.success
      },
      danger: {
        bg: theme.colors.error,
        text: theme.colors.white,
        hover: theme.colors.error,
        active: theme.colors.error
      },
      warning: {
        bg: theme.colors.warning,
        text: theme.colors.white,
        hover: theme.colors.warning,
        active: theme.colors.warning
      },
      info: {
        bg: theme.colors.info,
        text: theme.colors.white,
        hover: theme.colors.info,
        active: theme.colors.info
      },
      light: {
        bg: theme.colors.gray[100],
        text: theme.colors.gray[900],
        hover: theme.colors.gray[200],
        active: theme.colors.gray[200]
      },
      dark: {
        bg: theme.colors.gray[800],
        text: theme.colors.white,
        hover: theme.colors.gray[700],
        active: theme.colors.gray[700]
      },
      outline: {
        bg: 'transparent',
        text: theme.colors.primary,
        hover: theme.colors.gray[100],
        active: theme.colors.gray[200]
      },
      ghost: {
        bg: 'transparent',
        text: theme.colors.gray[800],
        hover: theme.colors.gray[100],
        active: theme.colors.gray[200]
      },
      link: {
        bg: 'transparent',
        text: theme.colors.primary,
        hover: 'transparent',
        active: 'transparent'
      }
    };

    const colors = variantColors[$variant || 'primary'];

    const isOutline = $variant === 'outline';
    const isGhost = $variant === 'ghost';
    const isLink = $variant === 'link';

    const backgroundColor = isOutline || isGhost || isLink ? 'transparent' : colors.bg;
    const textColor = colors.text;
    const hoverBackgroundColor = isLink ? 'transparent' : colors.hover;
    const activeBackgroundColor = isLink ? 'transparent' : colors.active;
    const borderColor = isOutline ? colors.text : 'transparent';
    const hoverTextColor = isLink ? theme.colors.primaryDark : textColor;

    return css`
      background-color: ${backgroundColor};
      color: ${textColor};
      border: 1px solid ${borderColor};
      transition: all 0.2s ease-in-out;
      text-decoration: ${isLink ? 'underline' : 'none'};
      
      &:not(:disabled) {
        &:hover {
          background-color: ${hoverBackgroundColor};
          color: ${hoverTextColor};
          ${isLink && 'text-decoration: none;'}
        }
        
        &:active {
          background-color: ${activeBackgroundColor};
        }
      }
    `;
  }}
  
  /* Loading state */
  ${({ $isLoading }) => 
    $isLoading && 
    css`
      color: transparent !important;
      pointer-events: none;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `
  }
`;

const IconContainer = styled.span<{ $position: 'start' | 'end' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${({ $position }) => 
    $position === 'start' 
      ? 'margin-right: 0.5rem;' 
      : 'margin-left: 0.5rem;'
  }
  
  svg {
    width: 1.25em;
    height: 1.25em;
    font-size: inherit;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    startIcon,
    endIcon,
    iconOnly = false,
    rounded = false,
    type = 'button',
    disabled = false,
    className,
    style,
    onClick,
    ...rest
  } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled && !isLoading) {
      onClick(e);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {children && <span style={{ visibility: 'hidden' }}>{children}</span>}
          <Spinner 
            size={20} 
            color="currentColor" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} 
          />
        </>
      );
    }
    
    return (
      <>
        {startIcon && (
          <IconContainer $position="start">
            {startIcon}
          </IconContainer>
        )}
        {children}
        {endIcon && (
          <IconContainer $position="end">
            {endIcon}
          </IconContainer>
        )}
      </>
    );
  };

  return (
    <ButtonBase
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      $iconOnly={iconOnly}
      $rounded={rounded}
      disabled={disabled || isLoading}
      className={className}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {renderContent()}
    </ButtonBase>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;
