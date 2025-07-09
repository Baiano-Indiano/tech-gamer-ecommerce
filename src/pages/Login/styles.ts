import styled from 'styled-components';

// Define the theme types for better type safety
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      primaryDark: string;
      error: string;
      text: {
        primary: string;
        secondary: string;
      };
      border: string;
      gray: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
    space: {
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '6': string;
      [key: string]: string;
    };
    fontSizes: {
      sm: string;
      base: string;
      xl: string;
      '2xl': string;
      [key: string]: string;
    };
    radii: {
      sm: string;
      [key: string]: string;
    };
    shadows: {
      sm: string;
      [key: string]: string;
    };
  }
}

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: ${({ theme }) => theme.space['3']};
`;

const BaseForm = styled.form`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.space['4']};
  width: 100%;
  max-width: 40rem;
`;

export const Form = BaseForm;
export const StyledForm = BaseForm;

export const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space['4']};
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space['1']};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.space['4']};

  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.space['2']};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: ${({ theme }) => theme.space['2']} ${({ theme }) => theme.space['3']};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: ${({ theme }) => theme.fontSizes.base};
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const FormFooter = styled.div`
  margin-top: ${({ theme }) => theme.space['6']};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: ${({ theme }) => theme.space['1']};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space['2']};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;
