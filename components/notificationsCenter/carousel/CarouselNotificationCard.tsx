import { ImageBackground, Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { NotificationType } from "../../../models/Notification";
import { datetimeToTimeFormatter, datetimeToDateFormatter } from "../../../utils/dateHandlers";
import { generateImagePlaceHolderUri } from "../../../utils/imageUtil";
import { containerSpacing, typography } from "../../../Theme";
import NotificationDateViewer from "../NotificationDateViewer";
import { Link } from "expo-router";

export const CarouselNotificationCard = ({ data }: { data: NotificationType }) => {
  const { width } = useWindowDimensions();
  const cardSize = width - containerSpacing * 2;

  return (
    <Link href={`notification/${data.id}`}>
      <ImageBackground
        source={{
          uri: data.image || generateImagePlaceHolderUri(),
        }}
        style={[styles.cardContainer, { width: cardSize }]}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.4,
          }}
        ></View>
        <View style={styles.infoContainer}>
          <NotificationDateViewer publishedDate={new Date(data.publishedAt)} type="hours" />
          <View>
            <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title, typography.textLG, typography.InterSemiBold]}>
              {data.title}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.description, typography.textMD, typography.OutfitRegular]}>
              {data.body}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    alignSelf: "center",
    overflow: "hidden",
    height: 200,
  },

  infoContainer: {
    paddingTop: 10,
    paddingBottom: 17,
    paddingLeft: containerSpacing,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    color: "white",
    marginBottom: 2,
  },
  description: {
    color: "white",
  },
});
