import React from 'react';
import styled from 'styled-components';

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | '';

const PasswordStrengthContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

const StrengthBars = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 0.5rem;
`;

interface StrengthBarProps {
  strength: PasswordStrength;
  index: number;
}

const getStrengthColor = (strength: PasswordStrength, index: number) => {
  if (strength === '') return '#e2e8f0';
  
  const strengthLevels = {
    'weak': 1,
    'fair': 2,
    'good': 3,
    'strong': 4
  };
  
  return index < strengthLevels[strength] ? 
    getColorByStrength(strength) : '#e2e8f0';
};

const getColorByStrength = (strength: PasswordStrength) => {
  switch (strength) {
    case 'weak':
      return '#ef4444'; // red-500
    case 'fair':
      return '#f59e0b'; // amber-500
    case 'good':
      return '#3b82f6'; // blue-500
    case 'strong':
      return '#10b981'; // emerald-500
    default:
      return '#e2e8f0'; // gray-200
  }
};

const getStrengthText = (strength: PasswordStrength) => {
  switch (strength) {
    case 'weak':
      return 'Senha fraca';
    case 'fair':
      return 'Senha razoável';
    case 'good':
      return 'Boa senha';
    case 'strong':
      return 'Senha forte';
    default:
      return '';
  }
};

const StrengthBar = styled.div<StrengthBarProps>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background-color: ${props => getStrengthColor(props.strength, props.index)};
  transition: background-color 0.3s ease;
`;

const StrengthText = styled.span<{ strength: PasswordStrength }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => getColorByStrength(props.strength) || '#64748b'};
`;

const RequirementsList = styled.ul`
  margin-top: 0.75rem;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #64748b;
`;

const RequirementItem = styled.li<{ isValid: boolean }>`
  color: ${props => props.isValid ? '#10b981' : '#64748b'};
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    color: ${props => props.isValid ? '#10b981' : '#e2e8f0'};
    font-weight: bold;
  }
`;

interface PasswordStrengthMeterProps {
  password: string;
  showRequirements?: boolean;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showRequirements = true,
}) => {
  const checkPasswordStrength = (pwd: string): PasswordStrength => {
    if (!pwd) return '';
    
    // Check password strength
    const hasMinLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd);
    
    const strengthScore = [
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChars
    ].filter(Boolean).length;
    
    if (strengthScore <= 2) return 'weak';
    if (strengthScore === 3) return 'fair';
    if (strengthScore === 4) return 'good';
    return 'strong';
  };
  
  const strength = checkPasswordStrength(password);
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(password);
  
  return (
    <PasswordStrengthContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StrengthText strength={strength}>
          {strength ? getStrengthText(strength) : 'Força da senha'}
        </StrengthText>
        {strength && (
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {password.length}/64
          </span>
        )}
      </div>
      
      <StrengthBars>
        {[0, 1, 2, 3].map((index) => (
          <StrengthBar key={index} strength={strength} index={index} />
        ))}
      </StrengthBars>
      
      {showRequirements && (
        <RequirementsList>
          <RequirementItem isValid={hasMinLength}>
            Mínimo de 8 caracteres
          </RequirementItem>
          <RequirementItem isValid={hasUpperCase}>
            Pelo menos 1 letra maiúscula
          </RequirementItem>
          <RequirementItem isValid={hasLowerCase}>
            Pelo menos 1 letra minúscula
          </RequirementItem>
          <RequirementItem isValid={hasNumbers}>
            Pelo menos 1 número
          </RequirementItem>
          <RequirementItem isValid={hasSpecialChars}>
            Pelo menos 1 caractere especial
          </RequirementItem>
        </RequirementsList>
      )}
    </PasswordStrengthContainer>
  );
};

export default PasswordStrengthMeter;
