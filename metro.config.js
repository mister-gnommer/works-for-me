const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: "./global.css",
  // NativeWind's native default is 14; 16 keeps Tailwind's scale at 4 px per step, as on the web.
  inlineRem: 16,
});
