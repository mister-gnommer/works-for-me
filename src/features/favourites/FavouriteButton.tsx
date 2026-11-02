import { Pressable, Text } from "react-native";

import { useFavourites } from "./FavouritesProvider";

export function FavouriteButton({ jobId }: { jobId: string }) {
  const { isFavourite, toggle } = useFavourites();
  const active = isFavourite(jobId);
  return (
    <Pressable
      onPress={() => toggle(jobId)}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={
        active ? "Remove from favourites" : "Add to favourites"
      }
      accessibilityState={{ selected: active }}
    >
      <Text
        className={`text-[26px] ${active ? "text-favourite" : "text-faint"}`}
      >
        {active ? "★" : "☆"}
      </Text>
    </Pressable>
  );
}
