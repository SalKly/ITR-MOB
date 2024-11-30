import { Animated, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { interpolate } from "../../../utils/interpolate";
import { LinearGradient } from "expo-linear-gradient";

export const Dot = ({ x, index, size }: { x: Animated.Value; index: number; size: number }) => {
  const animatedWidth = useRef(new Animated.Value(10)).current;
  const animatedOpacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const inputRange = [(index - 1) * size, index * size, (index + 1) * size];
    const widthOutputRange = [10, 40, 10];
    const opacityOutputRange = [0.5, 1, 0.5];

    // Define the update functions
    const updateWidth = (value: number) => {
      const interpolatedWidth = interpolate(value, inputRange, widthOutputRange);
      animatedWidth.setValue(interpolatedWidth);
    };

    const updateOpacity = (value: number) => {
      const interpolatedOpacity = interpolate(value, inputRange, opacityOutputRange);
      animatedOpacity.setValue(interpolatedOpacity);
    };

    // Add listeners
    const widthListener = x.addListener(({ value }) => {
      updateWidth(value);
    });

    const opacityListener = x.addListener(({ value }) => {
      updateOpacity(value);
    });

    // Cleanup listeners on unmount
    return () => {
      x.removeListener(widthListener);
      x.removeListener(opacityListener);
    };
  }, [x, index, size]);

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
          opacity: animatedOpacity,
          width: animatedWidth,
        },
      ]}
    >
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#30A9E0", "#04214D"]} style={styles.gradient} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    width: 10,
    height: 8,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Ensure circular gradient
  },
});
