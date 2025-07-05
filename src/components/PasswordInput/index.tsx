import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showStrengthMeter?: boolean;
  showRequirements?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
`;

const InputWrapper = styled.div<{ $hasError: boolean; $isFocused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${({ $hasError, $isFocused }) => 
    $hasError ? '#ef4444' : $isFocused ? '#3b82f6' : '#e2e8f0'};
  border-radius: 0.5rem;
  transition: all 0.2s;
  background-color: white;
  box-shadow: ${({ $isFocused }) => 
    $isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'none'};
  
  &:hover {
    border-color: ${({ $hasError }) => $hasError ? '#ef4444' : '#94a3b8'};
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1e293b;
  background: transparent;
  
  &::placeholder {
    color: #94a3b8;
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    background-color: #f8fafc;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #94a3b8;
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  min-height: 1rem;
`;

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  showStrengthMeter = true,
  showRequirements = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper 
        $hasError={!!error}
        $isFocused={isFocused}
      >
        <InputIcon>
          <FiLock size={20} />
        </InputIcon>
        <StyledInput
          {...props}
          type={showPassword ? 'text' : 'password'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={password}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />
        <ToggleButton
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </ToggleButton>
      </InputWrapper>
      
      {showStrengthMeter && password && (
        <PasswordStrengthMeter 
          password={password}
          showRequirements={showRequirements}
        />
      )}
      
      {error && (
        <ErrorMessage id={`${props.id}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}
    </InputContainer>
  );
};

export default PasswordInput;
