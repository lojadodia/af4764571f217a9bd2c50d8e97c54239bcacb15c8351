module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "2100px",
      },
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        body: [
          "CircularStd",
          "Open Sans",
          "system-ui",
          "sans-serif !important",
        ],
        heading: [
          "CircularStd",
          "Open Sans",
          "system-ui",
          "sans-serif !important",
        ],
      },
      backgroundOpacity: {
        '10': '0.1',
        '20': '0.2',
        '65': '0.65',
        '75': '0.75',
        '85': '0.90', 
        '95': '0.95',
      },
      borderColor: {
        primary: "var(--gossamer-500)",
        neutral: {
          DEFAULT: "#262626",
          100: "#888",
          200: "#d4d4d4",
          300: "#404040",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#525252",
          800: "#171717",
          900: "#111",
        },
        gray: {
          DEFAULT: "#404040",
          100: "#dedede",
          200: "#b2b2b2",
          300: "#b0b0b0",
          400: "#facc15",
          500: "#eab308"
        },
        yellow: {
          DEFAULT: "#404040",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#FBBF24",
          400: "#facc15",
          500: "#eab308"
        },
      },
      placeholderColor: {
        neutral: {
          DEFAULT: "#262626",
          100: "#888",
          200: "#d4d4d4",
          300: "#404040",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#262626",
          800: "#171717",
          900: "#111",
        },
      },
      fontSize: {
        "10px": "0.625rem",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: "var(--gossamer-500)",
        "primary-2": "var(--gossamer-600)",
        dark: {
          DEFAULT: "#111",
          100: "#0a0b1e",
          200: "#16181d",
          500: "#0f1115",
          700: "#202125",
        },
        neutral: {
          DEFAULT: "#262626",
          100: "#888888",
          200: "#d4d4d4",
          300: "#404040",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#262626",
          800: "#171717",
          900: "#111",
        },
        yellow: {
          DEFAULT: "#404040",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#FBBF24",
          400: "#facc15",
          500: "#eab308"
        },
        gossamer: {
          50: "var(--gossamer-50)",
          100: "var(--gossamer-10)",
          200: "var(--gossamer-200)",
          300: "var(--gossamer-300)",
          400: "var(--gossamer-400)",
          500: "var(--gossamer-500)",
          600: "var(--gossamer-600)",
          700: "var(--gossamer-700)",
          800: "var(--gossamer-800)",
          900: "var(--gossamer-900)",
        },
        social: {
          facebook: "#3b5998",
          twitter: "#1da1f2",
          instagram: "#e1306c",
          youtube: "#ff0000",
        },
      },
      textColor: {
        primary:  "var(--gossamer-500)",
        body: "#6B7280",
        heading: "#1F2937",
        gray: "#aaa",
        disabled: "#b2b2b2",
        neutral: {
          DEFAULT: "#ddd",
          100: "#888888",
          200: "#d4d4d4",
          300: "#404040",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#262626",
          800: "#171717",
          900: "#111",
        },
      },
      minHeight: {
        580: "580px",
        140: "35rem", // 560px
        40: "10rem", // 140px
        6: "2.5rem",
      },
      height: {
        4.5: "1.125rem",
        13: "3.125rem",
        14: "3.5rem",
        22: "5.25rem",
        47: "10rem",
        56: "14rem",
        64: "16rem",
        double: "200%",
      },
      maxHeight: {
        "70vh": "70vh",
        "85vh": "85vh",
        140: "35rem", // 560px
      },
      maxWidth: {
        1920: "1920px",
      },
      minWidth: {
        150: "150px",
      },
      borderRadius: {
        DEFAULT: "5px",
      },
      inset: {
        22: "5.25rem",
      },
      strokeWidth: {
        2.5: "2.5",
      },
      boxShadow: {
        300: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
        350: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        400: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0",
        500: "rgba(0, 0, 0, 0.17) 0px 0px 12px",
        700: "rgba(0, 0, 0, 0.08) 0px 2px 16px",
        900: "rgba(0, 0, 0, 0.05) 0px 21px 36px",
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '11': '2.75rem',
      }
    },
  },
  plugins: [],
};
