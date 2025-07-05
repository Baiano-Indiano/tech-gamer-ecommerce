import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  /**
   * Tamanho do spinner em pixels
   * @default 20
   */
  size?: number;
  
  /**
   * Cor do spinner
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Espessura da borda do spinner
   * @default 2
   */
  thickness?: number;
  
  /**
   * Classe CSS adicional
   */
  className?: string;
  
  /**
   * Estilos inline
   */
  style?: React.CSSProperties;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ $size: number; $color: string; $thickness: number }>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: ${({ $thickness }) => $thickness}px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${({ $color }) => $color};
  animation: ${spin} 0.8s ease-in-out infinite;
`;

/**
 * Componente de spinner para indicar carregamento
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  color = 'currentColor',
  thickness = 2,
  className,
  style,
}) => {
  return (
    <SpinnerContainer 
      $size={size} 
      $color={color} 
      $thickness={thickness}
      className={className}
      style={style}
      role="status"
      aria-label="Carregando..."
    >
      <span className="sr-only">Carregando...</span>
    </SpinnerContainer>
  );
};

export default Spinner;
