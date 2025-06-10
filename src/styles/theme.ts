// Thème moderne pour l'application e-commerce

export const theme = {
  colors: {
    // Couleurs principales
    primary: {
      light: '#6366F1', // Indigo-500
      main: '#4F46E5',  // Indigo-600
      dark: '#4338CA',  // Indigo-700
    },
    secondary: {
      light: '#10B981', // Emerald-500
      main: '#059669',  // Emerald-600
      dark: '#047857',  // Emerald-700
    },
    accent: {
      light: '#F59E0B', // Amber-500
      main: '#D97706',  // Amber-600
      dark: '#B45309',  // Amber-700
    },
    // Couleurs neutres
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    // Couleurs d'état
    state: {
      success: '#10B981', // Emerald-500
      warning: '#F59E0B', // Amber-500
      error: '#EF4444',   // Red-500
      info: '#3B82F6',    // Blue-500
    },
    // Couleurs de fond
    background: {
      light: '#F9FAFB',   // Neutral-50
      main: '#F3F4F6',    // Neutral-100
      dark: '#E5E7EB',    // Neutral-200
      card: '#FFFFFF',    // White
    }
  },
  // Arrondis
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',  // Complètement rond
  },
  // Ombres
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};

// Classes utilitaires pour les boutons
export const buttonStyles = {
  base: `font-medium rounded-lg transition-all duration-200 flex items-center justify-center`,
  
  // Variantes de taille
  sizes: {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  },
  
  // Variantes de style
  variants: {
    primary: `bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300`,
    secondary: `bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300`,
    accent: `bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:ring-amber-300`,
    outline: `bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-300`,
    ghost: `bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-300`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300`,
  },
  
  // États
  states: {
    disabled: 'opacity-50 cursor-not-allowed',
  },
};

// Classes utilitaires pour les cartes
export const cardStyles = {
  base: `bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg`,
  
  // Variantes de padding
  padding: {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
};

// Classes utilitaires pour les inputs
export const inputStyles = {
  base: `w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`,
  
  // États
  states: {
    error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
    success: 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500',
  },
};

// Classes utilitaires pour les badges
export const badgeStyles = {
  base: `inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium`,
  
  // Variantes de couleur
  variants: {
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-emerald-100 text-emerald-800',
    accent: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
  },
};
