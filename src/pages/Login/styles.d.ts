import type { IStyledComponent } from 'styled-components';

type StyledDivProps = {
  $fullWidth?: boolean;
};

type StyledInputProps = {
  $hasError: boolean;
};

type StyledComponentType<Props extends object = Record<string, unknown>> = IStyledComponent<'web', Props>;

declare const FormContainer: StyledComponentType<StyledDivProps>;
declare const Form: StyledComponentType;
declare const FormTitle: StyledComponentType;
declare const FormGroup: StyledComponentType;
declare const FormFooter: StyledComponentType;
declare const StyledInput: StyledComponentType<StyledInputProps>;
declare const StyledLabel: StyledComponentType;
declare const ErrorMessage: StyledComponentType;

export type {
  StyledDivProps,
  StyledInputProps,
  StyledComponentType
};

export {
  FormContainer,
  Form,
  FormTitle,
  FormGroup,
  FormFooter,
  StyledInput,
  StyledLabel,
  ErrorMessage,
};
