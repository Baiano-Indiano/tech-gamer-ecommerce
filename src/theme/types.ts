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
  // Cores principais
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Cores secundárias
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  
  // Cores de feedback
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;
  
  // Cores neutras
  white: string;
  black: string;
  gray: ColorScale;
  gray100: string;
  gray700: string;
  
  // Cores de fundo
  background: string;
  backgroundSecondary: string;
  backgroundDark: string;
  backgroundSecondaryDark: string;
  
  // Cores de texto
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDark: string;
  textSecondaryDark: string;
  
  // Cores de borda
  border: string;
  borderHover: string;
  borderActive: string;
  borderDark: string;
  borderHoverDark: string;
  borderActiveDark: string;
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
