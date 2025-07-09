// Form components
export * from './input';

export { default as FormRow } from './FormRow';
export * from './FormRow';

// Re-export all form components as a namespace
export * as Form from './input';

// Import components for default export
import Input from './input/Input';
import PasswordInput from './input/PasswordInput';
import InputGroup from './input/InputGroup';
import PasswordStrengthMeter from './input/PasswordStrengthMeter';
import FormRow from './FormRow';

// Default export for easier imports
export default {
  Input,
  PasswordInput,
  InputGroup,
  PasswordStrengthMeter,
  FormRow,
};
