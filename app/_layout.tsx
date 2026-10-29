import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Jobs" }} />
      <Stack.Screen name="job/[id]" options={{ title: "Job details" }} />
    </Stack>
  );
}
