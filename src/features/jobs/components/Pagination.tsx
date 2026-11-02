import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "../../../theme";

interface Props {
  /** Zero-based current page. */
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: Props) {
  const colors = useColors();
  const isLast = page >= pageCount - 1;
  // TODO use `total` to calc all pages and show `<< < 1, 2, 3, ... 14, 15 > >>` style OR infinite scroll

  return (
    <View
      style={[
        styles.row,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      {page > 0 && (
        <Arrow label="«" hint="First page" onPress={() => onChange(0)} />
      )}
      <Arrow
        label="‹"
        hint="Previous page"
        disabled={page === 0}
        onPress={() => onChange(page - 1)}
      />
      <Text style={[styles.label, { color: colors.text }]}>
        Page {page + 1} of {pageCount}
      </Text>
      <Arrow
        label="›"
        hint="Next page"
        disabled={isLast}
        onPress={() => onChange(page + 1)}
      />
    </View>
  );
}

function Arrow({
  label,
  hint,
  disabled,
  onPress,
}: {
  label: string;
  hint: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={hint}
      accessibilityState={{ disabled }}
      style={styles.arrow}
    >
      <Text
        style={[
          styles.arrowText,
          { color: disabled ? colors.disabled : colors.primary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  arrow: { paddingHorizontal: 14, paddingVertical: 6 },
  arrowText: { fontSize: 24 },
  label: { minWidth: 110, textAlign: "center" },
});
