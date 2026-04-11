// Dark mode theme for CanchaYa
export const darkTheme = {
  colors: {
    // Primary
    primary: '#BB86FC', // Purple
    primaryContainer: '#3F0082',
    onPrimary: '#0D0035',
    
    // Secondary
    secondary: '#03DAC6', // Cyan
    secondaryContainer: '#005047',
    onSecondary: '#000000',
    
    // Tertiary
    tertiary: '#FFAA00', // Amber
    tertiaryContainer: '#B36800',
    onTertiary: '#000000',
    
    // Neutral (Greys)
    surface: '#121212', // Dark background
    surfaceVariant: '#1E1E1E',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#CACACA',
    
    // Status Colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Text
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#757575',
    
    // Borders
    border: '#2C2C2C',
    borderLight: '#3C3C3C',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    
    // Disabled
    disabled: '#424242',
    disabledText: '#626262',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  typography: {
    displayLarge: {
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: 0,
      fontWeight: '400',
    },
    displayMedium: {
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      fontWeight: '400',
    },
    displaySmall: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      fontWeight: '400',
    },
    headlineLarge: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      fontWeight: '500',
    },
    headlineMedium: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      fontWeight: '500',
    },
    headlineSmall: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      fontWeight: '500',
    },
    titleLarge: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      fontWeight: '500',
    },
    titleMedium: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    titleSmall: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      fontWeight: '400',
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: '400',
    },
    labelLarge: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
    labelMedium: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    labelSmall: {
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export type Theme = typeof darkTheme;
