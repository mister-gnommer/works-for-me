import { Pressable, Text, View } from "react-native";

interface Props {
  /** Zero-based current page. */
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: Props) {
  const isLast = page >= pageCount - 1;
  // TODO use `total` to calc all pages and show `<< < 1, 2, 3, ... 14, 15 > >>` style OR infinite scroll

  return (
    <View className="flex-row items-center justify-center gap-2 border-t-hairline border-line bg-card p-3 dark:border-line-dark dark:bg-card-dark">
      {page > 0 && (
        <Arrow label="«" hint="First page" onPress={() => onChange(0)} />
      )}
      <Arrow
        label="‹"
        hint="Previous page"
        disabled={page === 0}
        onPress={() => onChange(page - 1)}
      />
      <Text className="min-w-[110px] text-center dark:text-ink-dark">
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
      className="px-3.5 py-1.5"
    >
      <Text
        className={`text-2xl ${disabled ? "text-line dark:text-neutral-700" : "text-brand dark:text-brand-dark"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
