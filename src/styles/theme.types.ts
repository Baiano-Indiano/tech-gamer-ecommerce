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
  error: string;
  warning: string;
  info: string;
  white: string;
  
  // Tons de cinza
  gray: {
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
  
  // Cores de fundo
  background: string;
  backgroundSecondary: string;
  
  // Texto
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Bordas
  border: string;
  borderHover: string;
  borderActive: string;
}

export interface ThemeFonts {
  body: string;
  heading: string;
  mono: string;
}

export interface ThemeFontSizes {
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
}

export interface ThemeFontWeights {
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  [key: string]: number;
}

export interface ThemeSpace {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  [key: string]: string;
}

export interface ThemeRadii {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
  [key: string]: string;
}

export interface ThemeShadows {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  outline: string;
  none: string;
  [key: string]: string;
}

export interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  [key: string]: string;
}

export interface ThemeLineHeights {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
  [key: string]: string;
}

export interface ThemeTransitions {
  default: string;
  fast: string;
  slow: string;
  [key: string]: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  fontWeights: ThemeFontWeights;
  space: ThemeSpace;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
  lineHeights: ThemeLineHeights;
  transitions: ThemeTransitions;
}
