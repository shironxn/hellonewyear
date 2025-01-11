import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1024px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["nord"],
  },
  plugins: [daisyui],
} satisfies Config;
