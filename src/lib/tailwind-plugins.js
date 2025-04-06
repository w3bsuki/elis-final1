// Custom Tailwind CSS plugins
const plugin = require('tailwindcss/plugin')

// Animation delays and custom utilities
exports.customUtilities = plugin(function({ addUtilities }) {
  const utilities = {
    // Animation delays
    '.animation-delay-1000': {
      'animation-delay': '1s',
    },
    '.animation-delay-2000': {
      'animation-delay': '2s',
    },
    '.animation-delay-3000': {
      'animation-delay': '3s',
    },
    '.animation-delay-4000': {
      'animation-delay': '4s',
    },
    '.animation-delay-5000': {
      'animation-delay': '5s',
    },
    '.animation-delay-6000': {
      'animation-delay': '6s',
    },
    
    // Text shadows
    '.text-shadow-sm': {
      'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow': {
      'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow-lg': {
      'text-shadow': '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow-none': {
      'text-shadow': 'none',
    },
    
    // 3D transforms
    '.perspective-1000': {
      'perspective': '1000px',
    },
    '.transform-style-3d': {
      'transform-style': 'preserve-3d',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
    '.rotate-y-180': {
      'transform': 'rotateY(180deg)',
    },
    '.rotate-x-180': {
      'transform': 'rotateX(180deg)',
    },
    '.rotate-y-\\[-15deg\\]': {
      'transform': 'rotateY(-15deg)',
    },
    '.flip-transition': {
      'transition': 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    
    // Backdrop filters
    '.backdrop-blur-sm': {
      'backdrop-filter': 'blur(4px)',
      '-webkit-backdrop-filter': 'blur(4px)',
    },
    
    // Common Shadcn component classes
    // Card Component
    '.border': {
      'border-width': '1px',
      'border-style': 'solid',
    },
    '.border-t': {
      'border-top-width': '1px',
      'border-top-style': 'solid',
    },
    '.border-b': {
      'border-bottom-width': '1px',
      'border-bottom-style': 'solid',
    },
    '.border-l': {
      'border-left-width': '1px',
      'border-left-style': 'solid',
    },
    '.border-r': {
      'border-right-width': '1px',
      'border-right-style': 'solid',
    },
    
    // Popover/Sheet Utilities
    '.inset-0': {
      'inset': '0',
    },
    '.fixed': {
      'position': 'fixed',
    },
    '.absolute': {
      'position': 'absolute',
    },
    '.relative': {
      'position': 'relative',
    },
    '.sticky': {
      'position': 'sticky',
    },
    '.z-10': {
      'z-index': '10',
    },
    '.z-50': {
      'z-index': '50',
    },
    '.overflow-hidden': {
      'overflow': 'hidden',
    },
    
    // Data attributes for component states
    '[data-state=open]': {},
    '[data-state=closed]': {},
    '[data-state=checked]': {},
    
    // Arbitrary variants
    '.data-\\[state=open\\]:animate-in': {
      animationName: 'enter',
      animationDuration: '150ms',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      animationFillMode: 'forwards',
    },
    '.data-\\[state=closed\\]:animate-out': {
      animationName: 'exit',
      animationDuration: '150ms',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      animationFillMode: 'forwards',
    },
  }
  
  addUtilities(utilities)
}) 