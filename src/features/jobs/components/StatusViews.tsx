import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function LoadingView() {
  return (
    <View style={styles.center}>
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
    <View style={styles.center}>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable
          style={styles.button}
          onPress={onAction}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  message: { fontSize: 16, textAlign: "center" },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#5a00ff",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
