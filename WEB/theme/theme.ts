// Custom Colors from palette.json
export const paletteColors = {
  darkSlateGray: '#6a6f7d',
  moccasin: '#f1dab0',
  steelBlue: '#a6bed5',
  lightBlue: '#bedce4',
  lavenderBlush: '#fbf1f1',
} as const;

// Color variants for different use cases
export const colorVariants = {
  primary: paletteColors.steelBlue,
  secondary: paletteColors.darkSlateGray,
  accent: paletteColors.moccasin,
  background: paletteColors.lavenderBlush,
  light: paletteColors.lightBlue,
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    sans: 'Arial, Helvetica, sans-serif',
    mono: 'monospace',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// Spacing scale
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

// Border radius
export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;
