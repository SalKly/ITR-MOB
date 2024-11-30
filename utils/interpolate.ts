export const interpolate = (value: number, inputRange: number[], outputRange: number[]) => {
  const rangeIndex = inputRange.findIndex((rangeValue, i) => value >= rangeValue && value <= inputRange[i + 1]);

  if (rangeIndex === -1 || rangeIndex === inputRange.length - 1) {
    return outputRange[rangeIndex === -1 ? 0 : outputRange.length - 1];
  }
  const [inputStart, inputEnd] = [inputRange[rangeIndex], inputRange[rangeIndex + 1]];
  const [outputStart, outputEnd] = [outputRange[rangeIndex], outputRange[rangeIndex + 1]];
  const progress = (value - inputStart) / (inputEnd - inputStart);

  return outputStart + progress * (outputEnd - outputStart);
};
