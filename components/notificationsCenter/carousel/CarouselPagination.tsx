import { StyleSheet, View, Animated, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import { containerSpacing } from "../../../Theme";
import { CarouselNotificationCard } from "./CarouselNotificationCard";
import { NotificationType } from "../../../models/Notification";
import { Dot } from "./Dot";

const CarouselPagination = ({ data }: { data: NotificationType[] }) => {
  const x = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const size = width - containerSpacing * 2;

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 1, animated: true });
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }, []);

  return (
    <View>
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContainer}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={size}
        overScrollMode={"never"}
        showsHorizontalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {data.map((data, i) => (
          <CarouselNotificationCard key={i} data={data} />
        ))}
      </Animated.ScrollView>
      <View style={styles.paginationContainer}>
        {data.map((_, i) => {
          return <Dot key={i} x={x} index={i} size={size} />;
        })}
      </View>
    </View>
  );
};

export default React.memo(CarouselPagination);

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    overflow: "visible",
  },
  carouselContainer: {
    gap: 2,
    marginTop: 34,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
    marginBottom: 36,
  },
});
