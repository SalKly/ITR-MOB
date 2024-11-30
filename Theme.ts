import { Platform, StyleSheet } from "react-native";

export const containerSpacing = 16;
export const background = "#F1F5F9";
export const Inter_600 = Platform.select({
  android: "Inter_600SemiBold",
  ios: "Inter-SemiBold",
});

export const Inter_500 = Platform.select({
  android: "Inter_500Medium",
  ios: "Inter-Medium",
});

export const Outfit_700 = Platform.select({
  android: "Outfit_700Bold",
  ios: "Outfit-Bold",
});

export const Outfit_500 = Platform.select({
  android: "Outfit_500Medium",
  ios: "Outfit-Medium",
});

export const Outfit_400 = Platform.select({
  android: "Outfit_400Regular",
  ios: "Outfit-Regular",
});

export const typography = StyleSheet.create({
  text2XL: { fontSize: 16 },
  textXL: { fontSize: 15 },
  textLG: { fontSize: 14 },
  textMD: { fontSize: 13 },
  textSM: { fontSize: 11 },
  textXS: { fontSize: 10 },
  InterSemiBold: { fontFamily: Inter_600 },
  InterMedium: { fontFamily: Inter_500 },
  OutfitBold: { fontFamily: Outfit_700 },
  OutfitMedium: { fontFamily: Outfit_500 },
  OutfitRegular: { fontFamily: Outfit_400 },
});
