import type { ThemeColors, ThemeFonts, ThemeFontSizes, ThemeFontWeights, ThemeSpace, ThemeRadii, ThemeShadows, ThemeBreakpoints, ThemeLineHeights, ThemeTransitions, Theme } from './theme.types';

// Cores
export const colors: ThemeColors = {
  // Cores principais
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#3b82f6',
  
  // Cores secundárias
  secondary: '#4f46e5',
  secondaryDark: '#4338ca',
  secondaryLight: '#6366f1',
  
  // Cores de feedback
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  white: '#ffffff',
  
  // Tons de cinza
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Cores de fundo
  background: '#ffffff',
  backgroundSecondary: '#f8fafc',
  
  // Texto
  text: '#1e293b',
  textSecondary: '#4b5563',
  textTertiary: '#6b7280',
  
  // Bordas
  border: '#e5e7eb',
  borderHover: '#d1d5db',
  borderActive: '#9ca3af',
};

// Tipografia
export const fonts: ThemeFonts = {
  body: '"Inter", system-ui, -apple-system, sans-serif',
  heading: '"Inter", system-ui, -apple-system, sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const fontSizes: ThemeFontSizes = {
  xs: '1.2rem',
  sm: '1.4rem',
  base: '1.6rem',
  lg: '1.8rem',
  xl: '2.0rem',
  '2xl': '2.4rem',
  '3xl': '3.0rem',
  '4xl': '3.6rem',
  '5xl': '4.8rem',
};

export const fontWeights: ThemeFontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Espaçamentos
export const space: ThemeSpace = {
  0: '0',
  1: '0.8rem',
  2: '1.6rem',
  3: '2.4rem',
  4: '3.2rem',
  5: '4.8rem',
  6: '6.4rem',
  8: '8.0rem',
  10: '10.0rem',
  12: '12.0rem',
  16: '16.0rem',
};

// Bordas
export const radii: ThemeRadii = {
  none: '0',
  sm: '0.4rem',
  base: '0.8rem',
  md: '1.2rem',
  lg: '1.6rem',
  xl: '2.4rem',
  '2xl': '3.2rem',
  full: '9999px',
};

// Sombras
export const shadows: ThemeShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(59, 130, 246, 0.5)',
  none: 'none',
};

// Breakpoints
export const breakpoints: ThemeBreakpoints = {
  mobile: '320px',
  tablet: '640px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Alturas de linha
export const lineHeights: ThemeLineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
};

// Transições
export const transitions: ThemeTransitions = {
  default: 'all 0.2s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  slow: 'all 0.3s ease-in-out',
};

// Tema principal
const baseTheme: Omit<Theme, 'border' | 'borderHover' | 'borderActive'> = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  space,
  radii,
  shadows,
  breakpoints,
  lineHeights,
  transitions,
};

export const theme = {
  ...baseTheme,
  border: colors.border,
  borderHover: colors.borderHover,
  borderActive: colors.borderActive,
} as const;

export default theme;
