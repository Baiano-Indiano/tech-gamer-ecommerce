import styled from 'styled-components';

export const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 5%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[5]};
  text-align: center;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
