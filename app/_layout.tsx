import { QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import "../global.css";

import { queryClient } from "../src/api/queryClient";
import { FavouritesProvider } from "../src/features/favourites/FavouritesProvider";

// Puts the job list under a deep-linked job, so its screen gets a back button.
export const unstable_settings = { anchor: "index" };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        {/* Tailwind classes don't reach the headers or screen backgrounds; the navigation theme does. */}
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{ title: "Works For Me – Jobs" }}
            />
            <Stack.Screen name="job/[id]" options={{ title: "Job details" }} />
          </Stack>
        </ThemeProvider>
      </FavouritesProvider>
    </QueryClientProvider>
  );
}
