import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: ${({ theme }) => theme.space['3']};
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.space['4']};
  width: 100%;
  max-width: 40rem;
  
  .error {
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: ${({ theme }) => theme.space['3']};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space['4']};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.space['4']};
  
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.space['1']};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: color 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
  
  button[type="submit"] {
    margin-left: auto;
  }
`;
