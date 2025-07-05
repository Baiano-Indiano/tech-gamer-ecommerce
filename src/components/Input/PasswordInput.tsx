import React, { useState, forwardRef, useEffect, useId, useCallback, useMemo } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';
import { Input } from './Input';
import type { InputProps } from './types';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

// Helper hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Default texts in English (can be overridden via props)
const defaultTexts: Required<PasswordInputTexts> = {
  label: 'Password',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  strongPassword: 'Strong password',
  weakPassword: 'Password is too weak. Please use a stronger password.',
  helperText: 'Use at least 8 characters with a mix of letters, numbers & symbols',
};

export interface PasswordInputTexts {
  /** Texto do rótulo do campo de senha */
  label?: string;
  /** Texto do botão para mostrar senha */
  showPassword?: string;
  /** Texto do botão para ocultar senha */
  hidePassword?: string;
  /** Mensagem de senha forte */
  strongPassword?: string;
  /** Mensagem de erro para senha fraca */
  weakPassword?: string;
  /** Texto de ajuda para o campo de senha */
  helperText?: string;
}

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'icon' | 'label'> {
  /**
   * Whether to show the password strength meter
   * @default true
   * @example
   * ```tsx
   * <PasswordInput showStrengthMeter={true} />
   * ```
   */
  showStrengthMeter?: boolean;
  
  /**
   * Whether to show password requirements
   * @default true
   * @example
   * ```tsx
   * <PasswordInput showRequirements={true} />
   * ```
   */
  showRequirements?: boolean;
  
  /**
   * Minimum acceptable password strength (0-4)
   * @default 2
   * @example
   * ```tsx
   * // Require at least medium strength (2/4)
   * <PasswordInput minStrength={2} />
   * ```
   */
  minStrength?: number;
  
  /**
   * Custom error message for weak password
   * @example
   * ```tsx
   * <PasswordInput strengthErrorMessage="Sua senha precisa ser mais forte!" />
   * ```
   */
  strengthErrorMessage?: string;
  
  /**
   * Callback triggered when password changes or its validation state changes
   * @param password - The current password value
   * @param isValid - Whether the password meets the strength requirements
   * @example
   * ```tsx
   * <PasswordInput 
   *   onPasswordChange={(password, isValid) => {
   *     console.log('Password:', password, 'Valid:', isValid);
   *   }} 
   * />
   * ```
   */
  onPasswordChange?: (password: string, isValid: boolean) => void;
  
  /**
   * Delay in milliseconds before validating the password (debounce)
   * @default 300
   * @example
   * ```tsx
   * // Validate immediately on change
   * <PasswordInput validationDelay={0} />
   * ```
   */
  validationDelay?: number;
  
  /**
   * Custom text content for internationalization
   * @example
   * ```tsx
   * <PasswordInput 
   *   texts={{
   *     label: 'Senha',
   *     showPassword: 'Mostrar senha',
   *     hidePassword: 'Ocultar senha',
   *     helperText: 'Use pelo menos 8 caracteres com letras, números e símbolos'
   *   }} 
   * />
   * ```
   */
  texts?: Partial<PasswordInputTexts>;
  
  /**
   * Custom class name for the wrapper element
   * @example
   * ```tsx
   * <PasswordInput wrapperClassName="my-custom-class" />
   * ```
   */
  wrapperClassName?: string;
}

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  
  /* Estilo para leitores de tela */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Melhora o contraste e a legibilidade */
  button {
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: 0.25rem;
    }
  }
`;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  showStrengthMeter: showStrengthMeterProp = true,
  showRequirements: showRequirementsProp = true,
  minStrength: minStrengthProp = 2,
  strengthErrorMessage,
  onPasswordChange,
  onChange,
  error: externalError,
  helperText: customHelperText = '',
  id: propId,
  'aria-describedby': ariaDescribedBy,
  validationDelay = 300,
  texts: customTexts = {},
  wrapperClassName,
  ...inputProps
}, ref) => {
  const theme = useTheme();
  const texts = { ...defaultTexts, ...customTexts };
  const strengthErrorMessageProp = strengthErrorMessage || texts.weakPassword;
  
  // Get color values from theme with type safety
  const textColor = theme.colors?.text ? 
    (typeof theme.colors.text === 'string' ? theme.colors.text : theme.colors.text[500]) : 
    '#000000';
  // Generate unique IDs for accessibility
  const id = useId();
  const inputId = propId || `password-input-${id}`;
  const helpTextId = `${inputId}-help`;
  const errorTextId = `${inputId}-error`;
  const strengthMeterId = `${inputId}-strength`;
  
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [strengthError, setStrengthError] = useState('');
  const [announceStrength, setAnnounceStrength] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounced password for validation
  const debouncedPassword = useDebounce(password, validationDelay);
  
  // Validate minStrength prop
  if (minStrengthProp < 0 || minStrengthProp > 4) {
    console.warn('PasswordInput: minStrength must be between 0 and 4');
  }
  
  // Memoized values
  const hasStrengthError = useMemo(() => strengthError.length > 0, [strengthError]);
  const error = useMemo(
    () => externalError || (hasStrengthError && isFocused ? strengthError : ''),
    [externalError, hasStrengthError, isFocused, strengthError]
  );
  const hasError = useMemo(() => !!error, [error]);
  const helperText = useMemo(() => {
    if (error) return error;
    if (customHelperText) return customHelperText;
    if (showRequirementsProp) return texts.helperText;
    return '';
  }, [error, customHelperText, showRequirementsProp, texts.helperText]);
  
  // Memoize the password strength validation function with useCallback
  const validatePasswordStrength = useCallback((passwordToValidate: string): boolean => {
    if (!passwordToValidate) {
      setStrengthError('');
      return true;
    }
    
    // Basic password strength validation
    const requirements = {
      minLength: passwordToValidate.length >= 8,
      hasLower: /[a-z]/.test(passwordToValidate),
      hasUpper: /[A-Z]/.test(passwordToValidate),
      hasNumber: /[0-9]/.test(passwordToValidate),
      hasSpecial: /[^A-Za-z0-9]/.test(passwordToValidate),
    };
    
    const requirementCount = Object.values(requirements).filter(Boolean).length;
    const strength = Math.min(Math.floor(requirementCount / 2), 4); // Scale 0-4
    
    if (strength < minStrengthProp) {
      setStrengthError(strengthErrorMessageProp);
      return false;
    }
    
    setStrengthError('');
    return true;
  }, [minStrengthProp, strengthErrorMessageProp]);

  // Effect for password validation on debounced password change
  useEffect(() => {
    if (debouncedPassword && showStrengthMeterProp) {
      const isValid = validatePasswordStrength(debouncedPassword);
      // Notify parent component about password validity
      onPasswordChange?.(debouncedPassword, isValid);
    }
  }, [debouncedPassword, showStrengthMeterProp, validatePasswordStrength, onPasswordChange]);
  
  // Effect for validating password when it changes (immediate feedback)
  useEffect(() => {
    if (password && showStrengthMeterProp) {
      validatePasswordStrength(password);
    }
  }, [password, showStrengthMeterProp, validatePasswordStrength]);
  
  // Cleanup function for effects
  useEffect(() => {
    return () => {
      // Cleanup any resources if needed
    };
  }, []);
  
  // Combine description IDs for accessibility
  const descriptionIds = [
    hasError ? errorTextId : null,
    helperText ? helpTextId : null,
    showStrengthMeterProp ? strengthMeterId : null,
    ariaDescribedBy
  ].filter(Boolean).join(' ');
  
  // Focus management
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (inputProps.onFocus) {
      inputProps.onFocus(e);
    }
  }, [inputProps]);
  
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (showStrengthMeterProp && password) {
      validatePasswordStrength(password);
    }
    if (inputProps.onBlur) {
      inputProps.onBlur(e);
    }
  }, [password, showStrengthMeterProp, inputProps, validatePasswordStrength]);
  

  
  // Effect for announcing password strength changes to screen readers
  useEffect(() => {
    if (announceStrength && password) {
      const timer = setTimeout(() => {
        setAnnounceStrength(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [announceStrength, password]);
  
  // Effect for debounced validation
  useEffect(() => {
    if (debouncedPassword && showStrengthMeterProp) {
      validatePasswordStrength(debouncedPassword);
    }
  }, [debouncedPassword, showStrengthMeterProp, validatePasswordStrength]);

  // Clean input props to avoid passing them to the underlying Input component
  const cleanInputProps = React.useMemo(() => {
    // Create a new object with all properties from inputProps
    const props = { ...inputProps };

    // Remove specific props we don't want to pass down
    const propsToRemove = [
      'showStrengthMeter',
      'showRequirements',
      'minStrength',
      'strengthErrorMessage',
      'onPasswordChange',
      'validationDelay',
      'texts',
      'wrapperClassName'
    ] as const;

    propsToRemove.forEach(prop => {
      if (prop in props) {
        delete props[prop as keyof typeof props];
      }
    });

    return props;
  }, [inputProps]); // Only recalculate when inputProps changes

  // Memoize ARIA attributes for the password input
  const inputAriaProps = React.useMemo(() => ({
    'aria-invalid': hasError,
    'aria-required': inputProps.required,
    'aria-describedby': descriptionIds || undefined,
    'aria-errormessage': hasError ? errorTextId : undefined,
    'aria-autocomplete': 'list' as const,
  }), [hasError, inputProps.required, descriptionIds, errorTextId]);

  
  /**
   * Handles password input changes
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Call the original change handler if provided
    if (onChange) {
      onChange(e);
    }
    
    // Notify about password change
    if (onPasswordChange) {
      const isValid = newPassword.length >= 8; // Minimum 8 characters
      onPasswordChange(newPassword, isValid);
    }
  }, [onChange, onPasswordChange]);
  
  /**
   * Toggles password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  
  // Determine input type based on visibility state
  const inputType = showPassword ? 'text' : 'password';
  
  // Memoize the password visibility toggle button
  const rightIcon = React.useMemo(() => (
    <button
      type="button"
      aria-label={showPassword ? texts.hidePassword : texts.showPassword}
      aria-controls={inputId}
      onClick={togglePasswordVisibility}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePasswordVisibility();
        }
      }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        transition: 'color 0.2s',
      }}
      aria-expanded={showPassword}
      aria-pressed={showPassword}
      title={showPassword ? texts.hidePassword : texts.showPassword}
      tabIndex={0}
    >
      {showPassword ? (
        <FiEyeOff size={20} aria-hidden="true" />
      ) : (
        <FiEye size={20} aria-hidden="true" />
      )}
    </button>
  ), [showPassword, texts.hidePassword, texts.showPassword, togglePasswordVisibility, inputId, textColor]);
  
  return (
    <PasswordWrapper className={wrapperClassName}>
      <Input
        ref={ref as React.Ref<HTMLInputElement>}
        id={inputId}
        type={inputType}
        label={texts.label}
        icon={<FiLock aria-hidden="true" />}
        rightIcon={rightIcon}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
        helperText={helperText}
        autoComplete={inputProps.autoComplete || 'new-password'}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...inputAriaProps}
        {...cleanInputProps}
      />
      
      {/* Password strength meter */}
      {showStrengthMeterProp && (
        <div id={`${inputId}-strength`}>
          <PasswordStrengthMeter
            password={password}
            showRequirements={showRequirementsProp}
          />
        </div>
      )}
    </PasswordWrapper>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
