import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

// @ts-ignore bu satırdaki hatayı yok sayacaktır
const config: Config = {
  darkMode: 'class', // darkMode ayarını 'class' olarak bırakıyoruz.
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
      "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
      "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", 
      "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", 
      "winter", "dim", "nord", "sunset",
    ],
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    daisyui,
    require("@tailwindcss/forms"),
  ],
};

export default config;
