import React from 'react';
import styled from 'styled-components';

export interface PasswordStrengthMeterProps {
  /** Nível de força da senha (0-4) */
  strength: number;
  /** Mensagens personalizadas para cada nível de força */
  messages?: {
    tooShort: string;
    weak: string;
    fair: string;
    good: string;
    strong: string;
  };
  /** Classe CSS personalizada */
  className?: string;
}

const StrengthMeter = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
  width: 100%;
`;

const StrengthBars = styled.div`
  display: flex;
  gap: 4px;
  margin-top: ${({ theme }) => theme.space[1]};
`;

const StrengthBar = styled.div<{ $strength: number; $index: number }>`
  flex: 1;
  height: 4px;
  background-color: ${({ theme, $strength, $index }) => {
    if ($strength === 0) return theme.colors.gray[200];
    if ($index < $strength) {
      if ($strength <= 1) return theme.colors.error;
      if ($strength <= 2) return theme.colors.warning;
      if ($strength <= 3) return theme.colors.info;
      return theme.colors.success;
    }
    return theme.colors.gray[200];
  }};
  border-radius: 2px;
  transition: all 0.3s ease;
`;

const StrengthText = styled.span<{ $strength: number }>`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $strength }) => {
    if ($strength === 0) return theme.colors.gray[500];
    if ($strength <= 1) return theme.colors.error;
    if ($strength <= 2) return theme.colors.warning;
    if ($strength <= 3) return theme.colors.info;
    return theme.colors.success;
  }};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: ${({ theme }) => theme.space[1]};
`;

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  strength,
  messages = {
    tooShort: 'Muito curta',
    weak: 'Fraca',
    fair: 'Razoável',
    good: 'Boa',
    strong: 'Forte',
  },
  className,
}) => {
  const getStrengthText = (): string => {
    if (strength === 0) return messages.tooShort;
    if (strength === 1) return messages.weak;
    if (strength === 2) return messages.fair;
    if (strength === 3) return messages.good;
    return messages.strong;
  };

  return (
    <StrengthMeter className={className}>
      <StrengthText $strength={strength}>{getStrengthText()}</StrengthText>
      <StrengthBars>
        {[0, 1, 2, 3].map((index) => (
          <StrengthBar
            key={index}
            $strength={strength}
            $index={index}
            aria-hidden="true"
          />
        ))}
      </StrengthBars>
    </StrengthMeter>
  );
};

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export default PasswordStrengthMeter;
