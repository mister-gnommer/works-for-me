import { Stack } from "expo-router";

import { FavouritesProvider } from "../src/features/favourites/FavouritesProvider";

// Puts the job list under a deep-linked job, so its screen gets a back button.
export const unstable_settings = { anchor: "index" };

export default function RootLayout() {
  return (
    <FavouritesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Works For Me – Jobs" }} />
        <Stack.Screen name="job/[id]" options={{ title: "Job details" }} />
      </Stack>
    </FavouritesProvider>
  );
}
