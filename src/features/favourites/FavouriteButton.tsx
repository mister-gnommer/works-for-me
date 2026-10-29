import { Pressable, StyleSheet, Text } from "react-native";

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
      <Text style={[styles.star, active && styles.active]}>
        {active ? "★" : "☆"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  star: { fontSize: 26, color: "#999" },
  active: { color: "#e5293b" },
});
