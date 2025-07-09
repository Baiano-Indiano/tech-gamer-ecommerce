import styled from 'styled-components';

interface FormRowProps {
  /** Número de colunas no grid (padrão: 1) */
  columns?: number;
  /** Espaçamento entre os itens (padrão: 1rem) */
  gap?: string | number;
  /** Margem inferior (padrão: 1rem) */
  marginBottom?: string | number;
  /** Conteúdo do componente */
  children: React.ReactNode;
  /** Estilos adicionais */
  style?: React.CSSProperties;
  /** Classe CSS adicional */
  className?: string;
}

const StyledFormRow = styled.div<{ $columns: number; $gap: string | number; $marginBottom: string | number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: ${({ $gap, theme }) => 
    typeof $gap === 'number' ? theme.space[$gap] || `${$gap}px` : $gap};
  margin-bottom: ${({ $marginBottom, theme }) => 
    typeof $marginBottom === 'number' ? theme.space[$marginBottom] || `${$marginBottom}px` : $marginBottom};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRow: React.FC<FormRowProps> = ({
  columns = 1,
  gap = 1,
  marginBottom = 1,
  children,
  style,
  className,
  ...props
}) => {
  return (
    <StyledFormRow 
      $columns={columns} 
      $gap={gap}
      $marginBottom={marginBottom}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledFormRow>
  );
};

export default FormRow;
