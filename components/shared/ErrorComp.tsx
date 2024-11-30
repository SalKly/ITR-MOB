import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { typography } from "../../Theme";
import Feather from "@expo/vector-icons/Feather";

const ErrorComp = ({ message, action }: { message: string; action: () => void }) => {
  return (
    <View style={styles.errorContainer}>
      <Feather name="alert-triangle" size={24} color="red" style={{ marginBottom: 8 }} />
      <Text style={[typography.textLG, typography.InterSemiBold, styles.textCenter]}>Something went wrong</Text>
      <Text style={[typography.textMD, typography.OutfitRegular, styles.textCenter]}>{message}</Text>
      <Pressable style={styles.retryBtn} onPress={action}>
        <Text style={[typography.textLG, typography.OutfitRegular, { color: "blue" }]}>Retry</Text>
      </Pressable>
    </View>
  );
};

export default ErrorComp;

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    paddingTop: 10,
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  retryBtn: {
    padding: 8,
  },
});
