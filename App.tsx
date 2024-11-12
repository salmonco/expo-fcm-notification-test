import { StyleSheet, View } from "react-native";
import FCMTestScreen from "./screens/FCMTestScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <FCMTestScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
