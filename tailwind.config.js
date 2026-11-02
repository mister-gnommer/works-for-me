const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // `dark` keys are the dark-mode shades; where one exists, it matches React Navigation's DarkTheme.
      colors: {
        brand: { DEFAULT: "#5a00ff", dark: "#a78bfa" },
        favourite: "#e5293b",
        screen: { DEFAULT: "#f2f2f2", dark: "rgb(1, 1, 1)" },
        card: { DEFAULT: "#fff", dark: "rgb(18, 18, 18)" },
        ink: { DEFAULT: "#000", dark: "rgb(229, 229, 231)" },
        muted: { DEFAULT: "#555", dark: "#a1a1a6" },
        faint: "#999",
        line: { DEFAULT: "#ccc", dark: "rgb(39, 39, 41)" },
      },
      borderWidth: { hairline: hairlineWidth() },
      // Sizes only: Tailwind's paired line heights would change the spacing of every text.
      fontSize: { base: "16px", "2xl": "24px" },
    },
  },
};
