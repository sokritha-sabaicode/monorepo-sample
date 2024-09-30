import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/home/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/ms-ui-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ipse': '360px',      // iPhone SE
        'ipx': '390px',       // iPhone X
        'ip14': '430px',      // iPhone 14 Pro Max
        },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'mybg-linear': 'linear-gradient(to right, #FF5858, #F09819)',
          'mybg-image': "url('../../public/images/Skyscrapers5.jpeg')",
      },
      container: {
        padding: '0.75rem',
        center: true,
        // screens: {
        //   // sm: '640px',
        //   // md: '768px',
        //   // lg: '1024px',
        //   // xl: '1280px',
        // },

      },

      colors: {
        primary: {
          DEFAULT: '#FF7300',
        },
        secondary: {
          DEFAULT: '#27384c',
        },
      },
      keyframes: {
        'back-and-forth': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'back-and-forth': 'back-and-forth 2s ease-in-out infinite ',
      },

      
    },
  },
  plugins: [],
};
export default config;
