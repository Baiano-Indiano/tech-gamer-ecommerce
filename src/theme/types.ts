// Base color scale type
export type ColorScale = {
  50: string;
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

// Theme colors interface
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  white: string;
  gray: ColorScale;
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderHover: string;
  borderActive: string;
}

// Theme breakpoints interface
export interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  [key: string]: string;
}

export type ThemeFontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  [key: string]: string;
};

// Interface principal do tema
export interface Theme {
  colors: ThemeColors;
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  fontSizes: ThemeFontSizes;
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  space: {
    [key: number]: string;
  };
  radii: {
    [key: string]: string;
  };
  shadows: {
    [key: string]: string;
  };
  breakpoints: ThemeBreakpoints;
  zIndices: {
    [key: string]: number | string;
  };
  transitions: {
    [key: string]: string;
  };
  // Propriedades adicionais para compatibilidade
  border: string;
  borderHover: string;
}

// Tipo para o tema estendido
export type ExtendedTheme = Theme;
