import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { typography } from "../../Theme";
const CustomHeader = ({ nativeHeaderProps }: { nativeHeaderProps: NativeStackHeaderProps }) => {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} colors={["#38A9D9", "#529E96", "#205063"]}>
      <Image style={styles.imageStyle} source={require("../../assets/headerImage.png")} />
      <SafeAreaView>
        <View style={styles.titleContainer}>
          {nativeHeaderProps.back ? <AntDesign onPress={nativeHeaderProps.navigation.goBack} name="leftcircle" size={24} color="white" /> : undefined}
          <Text style={[styles.title, typography.text2XL, typography.InterMedium]}>{nativeHeaderProps.options.title}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 110,
    justifyContent: "flex-end",
    paddingBottom: 24,
    paddingLeft: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    color: "white",
  },
  imageStyle: {
    alignSelf: "flex-end",
    position: "absolute",
  },
});
