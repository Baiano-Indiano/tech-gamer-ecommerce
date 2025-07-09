import React from 'react';
import styled from 'styled-components';
import type { InputGroupProps } from './types';

const StyledInputGroup = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $gap: string | number;
  $fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'vertical' ? 'column' : 'row')};
  gap: ${({ $gap, theme }) => 
    typeof $gap === 'number' ? theme.space[$gap] || `${$gap}px` : $gap};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  align-items: ${({ $direction }) => ($direction === 'vertical' ? 'stretch' : 'flex-start')};

  & > * {
    margin: 0;
    ${({ $direction }) => $direction === 'horizontal' && 'flex: 1; min-width: 0;'}
  }
`;

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  direction = 'vertical',
  gap = 3,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledInputGroup
      $direction={direction}
      $gap={gap}
      $fullWidth={fullWidth}
      role="group"
      {...props}
    >
      {children}
    </StyledInputGroup>
  );
};

InputGroup.displayName = 'InputGroup';

export default InputGroup;
