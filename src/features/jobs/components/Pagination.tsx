import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  /** Zero-based current page. */
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: Props) {
  const isLast = page >= pageCount - 1;
  return (
    <View style={styles.row}>
      {page > 0 && (
        <Arrow label="«" hint="First page" onPress={() => onChange(0)} />
      )}
      <Arrow
        label="‹"
        hint="Previous page"
        disabled={page === 0}
        onPress={() => onChange(page - 1)}
      />
      <Text style={styles.label}>
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
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={hint}
      accessibilityState={{ disabled }}
      style={styles.arrow}
    >
      <Text style={[styles.arrowText, disabled && styles.disabled]}>
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
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  arrow: { paddingHorizontal: 14, paddingVertical: 6 },
  arrowText: { fontSize: 24, color: "#5a00ff" },
  disabled: { color: "#ccc" },
  label: { minWidth: 110, textAlign: "center" },
});
