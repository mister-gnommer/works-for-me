const preset = require("jest-expo/jest-preset");

// Shift times on screen depend on the time zone; pin it so tests pass on any machine and in CI.
process.env.TZ = "UTC";

// pinned MSW 2 because ver 3 is ESM only, drop this when jest supports ESM
const esmOnly = ["msw", "@mswjs", "@open-draft", "rettime", "until-async"];

module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    ...preset.moduleNameMapper,
    // Tailwind's CSS is compiled by Metro; tests check behaviour, not styles.
    "\\.css$": "<rootDir>/src/test/emptyModule.js",
  },
  transform: {
    ...preset.transform,
    "\\.mjs$": preset.transform["\\.[jt]sx?$"],
  },
  transformIgnorePatterns: [
    preset.transformIgnorePatterns[0].replace("))", `|${esmOnly.join("|")}))`),
    ...preset.transformIgnorePatterns.slice(1),
  ],
};
