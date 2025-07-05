import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FiCheck, FiX } from 'react-icons/fi';

export interface PasswordStrengthMeterProps {
  /**
   * A senha a ser analisada
   */
  password: string;
  
  /**
   * Se deve mostrar os requisitos da senha
   * @default true
   */
  showRequirements?: boolean;
  
  /**
   * Classe CSS adicional para o container
   */
  className?: string;
}

interface StrengthLevel {
  label: string;
  color: string;
  minScore: number;
}

const strengthLevels: StrengthLevel[] = [
  { label: 'Muito fraca', color: '#ef4444', minScore: 0 },
  { label: 'Fraca', color: '#f59e0b', minScore: 1 },
  { label: 'Razoável', color: '#fbbf24', minScore: 2 },
  { label: 'Boa', color: '#22c55e', minScore: 3 },
  { label: 'Forte', color: '#10b981', minScore: 4 },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;
`;

const StrengthBar = styled.div`
  display: flex;
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 3px;
  overflow: hidden;
`;

interface StrengthSegmentProps {
  $active: boolean;
  $color: string;
  $width: string;
}

const StrengthSegment = styled.div<StrengthSegmentProps>`
  height: 100%;
  background-color: ${({ $active, $color }) => ($active ? $color : 'transparent')};
  width: ${({ $width }) => $width};
  transition: all 0.3s ease;
  
  &:not(:last-child) {
    margin-right: 2px;
  }
`;

const StrengthText = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
  text-align: right;
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RequirementItem = styled.li<{ $valid?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme, $valid }) => ($valid ? theme.colors.success : theme.colors.gray[600])};
  
  svg {
    flex-shrink: 0;
  }
`;

/**
 * Componente que exibe a força de uma senha e os requisitos
 */
export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showRequirements = true,
  className,
}) => {
  // Analisa a senha e retorna um escore de 0 a 4
  const { score, requirements } = useMemo(() => {
    if (!password) {
      return { score: 0, requirements: {
        minLength: false,
        hasLower: false,
        hasUpper: false,
        hasNumber: false,
        hasSpecial: false,
      } };
    }
    
    // Verifica os requisitos da senha
    const requirements = {
      minLength: password.length >= 8,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
    
    // Calcula o escore baseado nos requisitos atendidos
    const requirementCount = Object.values(requirements).filter(Boolean).length;
    const score = Math.min(Math.floor(requirementCount * 0.8), 4); // Escala de 0-4
    
    return { score, requirements };
  }, [password]);
  
  // Encontra o nível de força atual
  const currentLevel = strengthLevels.reduce((prev, current) => 
    score >= current.minScore ? current : prev
  );
  
  // Calcula a largura de cada segmento da barra
  const segmentWidth = 100 / strengthLevels.length;
  
  return (
    <Container className={className}>
      <StrengthBar>
        {strengthLevels.map((level) => (
          <StrengthSegment
            key={level.label}
            $active={score >= level.minScore}
            $color={level.color}
            $width={`${segmentWidth}%`}
            aria-hidden="true"
          />
        ))}
      </StrengthBar>
      
      <StrengthText $color={currentLevel.color}>
        Força: {currentLevel.label}
      </StrengthText>
      
      {showRequirements && (
        <RequirementsList>
          <RequirementItem $valid={requirements.minLength}>
            {requirements.minLength ? (
              <FiCheck size={14} />
            ) : (
              <FiX size={14} />
            )}
            Pelo menos 8 caracteres
          </RequirementItem>
          <RequirementItem $valid={requirements.hasLower}>
            {requirements.hasLower ? (
              <FiCheck size={14} />
            ) : (
              <FiX size={14} />
            )}
            Pelo menos 1 letra minúscula
          </RequirementItem>
          <RequirementItem $valid={requirements.hasUpper}>
            {requirements.hasUpper ? (
              <FiCheck size={14} />
            ) : (
              <FiX size={14} />
            )}
            Pelo menos 1 letra maiúscula
          </RequirementItem>
          <RequirementItem $valid={requirements.hasNumber}>
            {requirements.hasNumber ? (
              <FiCheck size={14} />
            ) : (
              <FiX size={14} />
            )}
            Pelo menos 1 número
          </RequirementItem>
          <RequirementItem $valid={requirements.hasSpecial}>
            {requirements.hasSpecial ? (
              <FiCheck size={14} />
            ) : (
              <FiX size={14} />
            )}
            Pelo menos 1 caractere especial
          </RequirementItem>
        </RequirementsList>
      )}
    </Container>
  );
};

export default PasswordStrengthMeter;
