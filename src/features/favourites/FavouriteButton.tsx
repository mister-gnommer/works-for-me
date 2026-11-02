import { Pressable, StyleSheet, Text } from "react-native";

import { useColors } from "../../theme";
import { useFavourites } from "./FavouritesProvider";

export function FavouriteButton({ jobId }: { jobId: string }) {
  const { isFavourite, toggle } = useFavourites();
  const active = isFavourite(jobId);
  const colors = useColors();
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
        style={[
          styles.star,
          { color: active ? colors.favourite : colors.star },
        ]}
      >
        {active ? "★" : "☆"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  star: { fontSize: 26 },
});
