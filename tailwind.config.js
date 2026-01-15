/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#00DEDE",
          600: "#00ADB5",
          700: "#088C96",
        },
        accent: {
          25: "#FFFCF4",
          50: "#FFFAEB",
          100: "#FFF1C6",
          200: "#FFE088",
          300: "#FFD369",
          400: "#FFB420",
          500: "#F99107",
          600: "#DD6A02",
          700: "#B74906",
          800: "#94370C",
          900: "#7A2F0D",
          950: "#461602",
        },
        warning: {
          300: "#FEC84B",
        },
        gray: {
          25: "#F7F8F8",
          50: "#F4F6F7",
          100: "#E3E8EA",
          200: "#CAD2D7",
          300: "#A4B1BC",
          400: "#788998",
          500: "#5C6D7E",
          600: "#4F5B6B",
          900: "#393E46",
          950: "#21252B",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "cloud-float-1": "cloudFloat1 8s ease-in-out infinite",
        "cloud-float-2": "cloudFloat2 10s ease-in-out infinite",
        "cloud-float-3": "cloudFloat3 12s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "slide-in-up": "slideInUp 0.8s ease-out forwards",
        "slide-in-bottom": "slideInBottom 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        cloudFloat1: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "25%": { transform: "translateX(10px) translateY(-15px)" },
          "50%": { transform: "translateX(-5px) translateY(-25px)" },
          "75%": { transform: "translateX(-10px) translateY(-10px)" },
        },
        cloudFloat2: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "33%": { transform: "translateX(-8px) translateY(-20px)" },
          "66%": { transform: "translateX(12px) translateY(-15px)" },
        },
        cloudFloat3: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "20%": { transform: "translateX(8px) translateY(-12px)" },
          "40%": { transform: "translateX(-6px) translateY(-22px)" },
          "60%": { transform: "translateX(15px) translateY(-8px)" },
          "80%": { transform: "translateX(-10px) translateY(-18px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInBottom: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
