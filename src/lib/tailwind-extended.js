// Extended Tailwind utility classes
const plugin = require('tailwindcss/plugin')

exports.extendedUtilities = plugin(function({ addUtilities }) {
  const utilities = {
    // Font sizes
    '.text-3xl': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
    '.text-2xl': {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
    '.text-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
    '.text-4xl': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
    
    // Font weights
    '.font-bold': {
      fontWeight: '700',
    },
    '.font-semibold': {
      fontWeight: '600',
    },
    '.font-medium': {
      fontWeight: '500',
    },
    
    // Margins
    '.mb-4': {
      marginBottom: '1rem',
    },
    '.mb-3': {
      marginBottom: '0.75rem',
    },
    '.mb-2': {
      marginBottom: '0.5rem',
    },
    '.m-4': {
      margin: '1rem',
    },
    
    // Padding
    '.p-4': {
      padding: '1rem',
    },
    '.px-4': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    '.py-2': {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    
    // Borders
    '.rounded-md': {
      borderRadius: '0.375rem',
    },
    '.rounded-lg': {
      borderRadius: '0.5rem',
    },
    
    // Background colors with opacity
    '.bg-primary\\/90': {
      backgroundColor: 'hsl(var(--primary) / 0.9)',
    },
    '.bg-primary\\/10': {
      backgroundColor: 'hsl(var(--primary) / 0.1)',
    },
    '.bg-background\\/80': {
      backgroundColor: 'hsl(var(--background) / 0.8)',
    },
    '.bg-background\\/60': {
      backgroundColor: 'hsl(var(--background) / 0.6)',
    },
    '.bg-background\\/50': {
      backgroundColor: 'hsl(var(--background) / 0.5)',
    },
    '.bg-background\\/40': {
      backgroundColor: 'hsl(var(--background) / 0.4)',
    },
    '.bg-card\\/50': {
      backgroundColor: 'hsl(var(--card) / 0.5)',
    },
    '.bg-card\\/30': {
      backgroundColor: 'hsl(var(--card) / 0.3)',
    },
    
    // Border with opacity
    '.border-primary\\/20': {
      borderColor: 'hsl(var(--primary) / 0.2)',
    },
    '.border-border\\/40': {
      borderColor: 'hsl(var(--border) / 0.4)',
    },
    
    // White text
    '.text-white': {
      color: 'white',
    },
    
    // Shadow
    '.shadow-lg': {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    '.shadow-xl': {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    
    // Hover variants
    '.hover\\:bg-primary\\/90:hover': {
      backgroundColor: 'hsl(var(--primary) / 0.9)',
    },
    '.hover\\:bg-primary\\/10:hover': {
      backgroundColor: 'hsl(var(--primary) / 0.1)',
    },
    '.hover\\:bg-muted:hover': {
      backgroundColor: 'hsl(var(--muted))',
    },
    '.hover\\:bg-muted\\/50:hover': {
      backgroundColor: 'hsl(var(--muted) / 0.5)',
    },
    '.hover\\:bg-accent:hover': {
      backgroundColor: 'hsl(var(--accent))',
    },
    '.hover\\:text-primary:hover': {
      color: 'hsl(var(--primary))',
    },
    '.hover\\:underline:hover': {
      textDecoration: 'underline',
    },
    '.hover\\:shadow-xl:hover': {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    '.hover\\:scale-105:hover': {
      transform: 'scale(1.05)',
    },
    '.hover\\:-translate-y-1:hover': {
      transform: 'translateY(-0.25rem)',
    },
    
    // Flex utilities
    '.flex': {
      display: 'flex',
    },
    '.flex-col': {
      flexDirection: 'column',
    },
    '.items-center': {
      alignItems: 'center',
    },
    '.justify-center': {
      justifyContent: 'center',
    },
    '.justify-between': {
      justifyContent: 'space-between',
    },
    '.gap-2': {
      gap: '0.5rem',
    },
    '.gap-4': {
      gap: '1rem',
    },
    
    // Width/height
    '.w-full': {
      width: '100%',
    },
    '.h-full': {
      height: '100%',
    },
    '.min-h-screen': {
      minHeight: '100vh',
    },
    
    // Transitions
    '.transition-colors': {
      transitionProperty: 'color, background-color, border-color',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
    },
    '.transition-all': {
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
    },
    
    // Additional background utilities
    '.backdrop-blur-sm': {
      backdropFilter: 'blur(4px)',
    },
    '.backdrop-blur-md': {
      backdropFilter: 'blur(12px)',
    },
    '.backdrop-blur-xl': {
      backdropFilter: 'blur(24px)',
    },
    
    // Additional text utilities
    '.text-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    '.text-base': {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    '.text-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
  }
  
  addUtilities(utilities)
}) 