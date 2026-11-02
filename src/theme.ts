import { useColorScheme } from "react-native";

// Text and icon pairs meet WCAG AA contrast (4.5:1 text, 3:1 icons) on `card` and `background`.
const palettes = {
  light: {
    background: "#f2f2f2",
    card: "#fff",
    text: "#000",
    muted: "#555",
    border: "#ccc",
    disabled: "#ccc",
    primary: "#5a00ff",
    onPrimary: "#fff",
    star: "#888",
    favourite: "#e5293b",
  },
  dark: {
    background: "#000",
    card: "#1c1c1e",
    text: "#fff",
    muted: "#ababab",
    border: "#38383a",
    disabled: "#48484a",
    primary: "#b69cff",
    onPrimary: "#000",
    star: "#8e8e93",
    favourite: "#ff4d5e",
  },
};

/** Returns the colour palette for the phone's current light/dark setting. */
export function useColors() {
  return palettes[useColorScheme() === "dark" ? "dark" : "light"];
}
