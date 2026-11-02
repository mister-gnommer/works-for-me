import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { FavouritesProvider } from "../src/features/favourites/FavouritesProvider";
import { useColors } from "../src/theme";

// Puts the job list under a deep-linked job, so its screen gets a back button.
export const unstable_settings = { anchor: "index" };

export default function RootLayout() {
  const base = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  const { background, card, text, border, primary } = useColors();
  const theme = {
    ...base,
    colors: { ...base.colors, background, card, text, border, primary },
  };

  return (
    <ThemeProvider value={theme}>
      <FavouritesProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Works For Me – Jobs" }}
          />
          <Stack.Screen name="job/[id]" options={{ title: "Job details" }} />
        </Stack>
      </FavouritesProvider>
    </ThemeProvider>
  );
}
