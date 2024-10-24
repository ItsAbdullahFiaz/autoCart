import { View, Text, StyleSheet } from "react-native";

const Scan = () => {
  return (
    <View style={styles.container}>
      <Text>(tab) scan</Text>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
