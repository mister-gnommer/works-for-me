import { Stack } from "expo-router";

import { FavouritesProvider } from "../src/features/favourites/FavouritesProvider";

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
