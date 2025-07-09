import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import type { PasswordInputProps, PasswordStrengthMessages } from './types';
import * as ReactFeather from 'react-feather';

// Criando componentes wrapper tipados para os ícones
const Eye: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ size = 18, ...props }) => {
  return <ReactFeather.Eye size={size} {...props} />;
};

const EyeOff: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ size = 18, ...props }) => {
  return <ReactFeather.EyeOff size={size} {...props} />;
};

// Componente temporário para o medidor de força da senha
interface PasswordStrengthMeterProps {
  strength: number;
  messages?: Partial<PasswordStrengthMessages>;
}

const PasswordStrengthMeter = ({ 
  strength = 0,
  messages 
}: PasswordStrengthMeterProps) => {
  const getStrengthText = () => {
    if (strength < 1) return messages?.weak || 'Muito fraca';
    if (strength < 2) return messages?.weak || 'Fraca';
    if (strength < 3) return messages?.fair || 'Razoável';
    if (strength < 4) return messages?.good || 'Boa';
    return messages?.strong || 'Forte';
  };

  return (
    <div className="password-strength-meter">
      <div 
        className="strength-bar" 
        style={{
          width: `${(strength / 4) * 100}%`,
          backgroundColor: strength < 1 ? '#e53e3e' : strength < 3 ? '#d69e2e' : '#38a169',
          height: '4px',
          borderRadius: '2px',
          marginTop: '0.5rem',
          transition: 'all 0.3s ease'
        }}
      />
      <div style={{
        fontSize: '0.75rem',
        color: strength < 1 ? '#e53e3e' : strength < 3 ? '#d69e2e' : '#38a169',
        marginTop: '0.25rem',
        textAlign: 'right'
      }}>
        {getStrengthText()}
      </div>
    </div>
  );
};

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space[3]};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[500]};
  padding: ${({ theme }) => theme.space[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  transition: all 0.2s;
  z-index: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showToggle = true,
      strengthLevel,
      onStrengthChange,
      strengthMessages,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalStrength, setInternalStrength] = useState(0);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }

      if (onStrengthChange || strengthLevel === undefined) {
        const password = e.target.value;
        const strength = calculatePasswordStrength(password);
        setInternalStrength(strength);
        if (onStrengthChange) {
          onStrengthChange(strength);
        }
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const currentStrength = strengthLevel !== undefined ? strengthLevel : internalStrength;

    return (
      <PasswordInputWrapper>
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          {...props}
          onChange={handlePasswordChange}
        />
        {showToggle && (
          <ToggleButton
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </ToggleButton>
        )}
        <PasswordStrengthMeter 
          strength={currentStrength} 
          messages={strengthMessages} 
        />
      </PasswordInputWrapper>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

/**
 * Calcula a força de uma senha de 0 a 4
 * 0: Muito fraca ou vazia
 * 1: Fraca
 * 2: Razoável
 * 3: Boa
 * 4: Forte
 */
function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Comprimento mínimo
  if (password.length >= 8) strength++;
  
  // Contém letras minúsculas e maiúsculas
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  
  // Contém números
  if (/[0-9]/.test(password)) strength++;
  
  // Contém caracteres especiais
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  return Math.min(strength, 4);
}

export default PasswordInput;
