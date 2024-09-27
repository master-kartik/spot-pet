import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      colors: {
        coral: {
          DEFAULT: '#FF7F50', // Primary accent color
        },
        sky: {
          DEFAULT: '#87CEEB', // Secondary accent color
        },
        olive: {
          DEFAULT: '#808000', // Tertiary accent color
        },
        softWhite: {
          DEFAULT: '#F5F5F5', // Primary background color (Light Mode)
          dark: '#F5F5F5', // Primary text color (Dark Mode)
        },
        charcoal: {
          DEFAULT: '#333333', // Primary text color (Light Mode)
          dark: '#333333', // Primary background color (Dark Mode)
        },
        deepTeal: {
          DEFAULT: '#008080', // Secondary accent color (Dark Mode)
        },
      },
      fontFamily: {
        neueregrade:[ 'var(--font-neueregrade)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
          // neueRegrade: ['Neue Regrade', 'sans-serif'],
          // sans: ['var(--font-neueregrade)'],
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
  
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

