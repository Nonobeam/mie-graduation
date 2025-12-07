// Color palette inspired by the graduation website design
export const theme = {
  colors: {
    // Primary beige/tan tones
    primary: '#D4B896',
    primaryDark: '#C9A66B',
    
    // Background cream/off-white
    background: '#F5F1E8',
    backgroundSecondary: '#EDE7D9',
    
    // Accent brown tones
    accent: '#8B6F47',
    accentDark: '#6B5233',
    
    // Text colors
    text: '#3D2E1F',
    textLight: '#6B5233',
    textMuted: '#8B7355',
    
    // UI colors
    white: '#FFFFFF',
    border: '#D4C4A8',
    success: '#7FA060',
    error: '#C4695C',
  },
  
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(61, 46, 31, 0.05)',
    md: '0 4px 6px -1px rgba(61, 46, 31, 0.1)',
    lg: '0 10px 15px -3px rgba(61, 46, 31, 0.1)',
    xl: '0 20px 25px -5px rgba(61, 46, 31, 0.1)',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export default theme;
