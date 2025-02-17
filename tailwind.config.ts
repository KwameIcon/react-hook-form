import { FaDeaf } from "react-icons/fa";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryBackground": "rgba(251,252,255,255)",
        "secondaryBackground": "rgba(209,222,249,200)",
        "Patina": "rgba(105,157,147,255)",
        "primary": 'rgba(25,19,89,255)',
      },
      screens: {
        "xxl": "2000px"
      },
      keyframes: {
        slideInFromRight: {
          "0%": { transform: "translateX(100%)", opacity: '0' },
          "100%": { transform: "translateX(0)", opacity: '1' },
        },
        fadeIn: {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' },
        },
        slideFromTop: {
          "0%": { opacity: '0', transform: "translateY(-100%)" },
          "100%": { opacity: '1', transform: "translateY(0%)" },
        }
      },
      animation: {
        animateRgith: 'slideInFromRight 1s ease-in',
        fadeIn: 'fadeIn 0.3s ease-in',
        animateTop: "slideFromTop 1.5s ease-in"
      }
    },
  },
  plugins: [],
} satisfies Config;
