import { ActivityIndicator, Pressable, Text, View } from "react-native";

export function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <ActivityIndicator size="large" />
    </View>
  );
}

interface MessageViewProps {
  message: string;
  /** Button text; the button shows only together with `onAction`. */
  actionLabel?: string;
  onAction?: () => void;
}

export function MessageView({
  message,
  actionLabel,
  onAction,
}: MessageViewProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <Text className="text-center text-base dark:text-ink-dark">
        {message}
      </Text>
      {actionLabel && onAction ? (
        <Pressable
          className="rounded-lg bg-brand px-5 py-2.5"
          onPress={onAction}
          accessibilityRole="button"
        >
          <Text className="font-semibold text-white">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
