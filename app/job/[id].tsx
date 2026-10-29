import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
