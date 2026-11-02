const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#5a00ff",
        favourite: "#e5293b",
        screen: "#f2f2f2",
        muted: "#555",
        faint: "#999",
        line: "#ccc",
      },
      borderWidth: { hairline: hairlineWidth() },
      // Sizes only: Tailwind's paired line heights would change the spacing of every text.
      fontSize: { base: "16px", "2xl": "24px" },
    },
  },
};
