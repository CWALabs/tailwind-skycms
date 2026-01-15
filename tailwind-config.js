// Tailwind CSS Configuration
// This file is loaded once and cached across all SkyCMS pages

tailwind.config = {
  theme: {
    extend: {
      // Custom brand colors
      colors: {
        brand: {
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#00BCD4',  // Primary brand color
          600: '#0097A7',
          700: '#00838F',
          800: '#006064',
          900: '#004D40'
        },
        accent: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFC107',  // Primary accent color
          500: '#FFA000',
          600: '#FF8F00',
          700: '#FF6F00',
          800: '#E65100',
          900: '#BF360C'
        }
      },

      // Custom fonts
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },

      // Custom animations
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-in'
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  }
};
