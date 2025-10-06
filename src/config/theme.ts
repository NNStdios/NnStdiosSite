/**
 * Theme Configuration
 *
 * This file controls all visual aspects of your website including colors, spacing,
 * typography, animations, and effects. Simply edit the values in the themeConfig
 * object below and your changes will be automatically applied throughout the site.
 *
 * How to use:
 * 1. Edit any value in the themeConfig object
 * 2. Save the file
 * 3. Refresh your browser to see the changes
 *
 * Examples:
 * - Change accent color: Set colors.accent to your preferred hex color like '#FF5733'
 * - Adjust spacing: Modify spacing.section to make sections larger or smaller
 * - Update fonts: Change typography.fontSize values to resize text globally
 * - Customize borders: Edit borderRadius values to make corners sharper or rounder
 *
 * Color format: Use hex colors like '#FFFFFF' or rgba like 'rgba(255, 255, 255, 0.5)'
 * Size format: Use CSS units like '1rem', '16px', '2em', etc.
 */

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    accentLight: string;
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    borderLight: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
      onPrimary: string;
    };
    scrollbar: {
      track: string;
      thumb: string;
      thumbHover: string;
    };
    header: {
      background: string;
      border: string;
    };
    button: {
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
    };
    gradient: {
      primary: string;
      secondary: string;
    };
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    full: string;
  };
  spacing: {
    section: string;
    card: string;
    element: string;
    small: string;
    large: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  effects: {
    profilePulseIntensity: number;
    hoverScale: number;
    shadowSmall: string;
    shadowMedium: string;
    shadowLarge: string;
    blurAmount: string;
  };
  header: {
    height: string;
    padding: string;
    logoSize: string;
  };
  typography: {
    fontSize: {
      small: string;
      base: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      hero: string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    primary: '#102840',
    secondary: '#163859',
    accent: '#60A5FA',
    accentLight: '#3B82F6',
    background: '#0F172A',
    surface: '#1E293B',
    surfaceHover: '#334155',
    border: 'rgba(59, 130, 246, 0.2)',
    borderLight: 'rgba(148, 163, 184, 0.1)',
    text: {
      primary: '#F8FAFC',
      secondary: '#E2E8F0',
      muted: '#94A3B8',
      onPrimary: '#FFFFFF'
    },
    scrollbar: {
      track: '#1E293B',
      thumb: '#60A5FA',
      thumbHover: '#3B82F6'
    },
    header: {
      background: 'rgba(15, 23, 42, 0.95)',
      border: 'rgba(59, 130, 246, 0.2)'
    },
    button: {
      primary: '#60A5FA',
      primaryHover: '#3B82F6',
      secondary: '#1E293B',
      secondaryHover: '#334155'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
      secondary: 'linear-gradient(135deg, #1E293B, #334155)'
    }
  },
  borderRadius: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    full: '50%'
  },
  spacing: {
    section: '5rem',
    card: '2rem',
    element: '1rem',
    small: '0.5rem',
    large: '3rem'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.4s ease'
  },
  effects: {
    profilePulseIntensity: 1.1,
    hoverScale: 1.05,
    shadowSmall: '0 2px 4px rgba(0, 0, 0, 0.1)',
    shadowMedium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    shadowLarge: '0 8px 24px rgba(0, 0, 0, 0.3)',
    blurAmount: '10px'
  },
  header: {
    height: '80px',
    padding: '1rem 2rem',
    logoSize: '1.8rem'
  },
  typography: {
    fontSize: {
      small: '0.875rem',
      base: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
      hero: '3.5rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.6',
      relaxed: '1.8'
    }
  }
};