import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { typography } from "../../Theme";

const Spinner = ({ size = "large", color = "#000", message }: { size?: "small" | "large"; color?: string; message?: string }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={[styles.message, typography.textSM, typography.InterSemiBold]}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    color: "#333",
  },
});

export default Spinner;
