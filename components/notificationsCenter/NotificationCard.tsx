import { Image, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { NotificationType } from "../../models/Notification";
import { datetimeToTimeFormatter, datetimeToDateFormatter } from "../../utils/dateHandlers";
import { generateImagePlaceHolderUri } from "../../utils/imageUtil";
import { containerSpacing, typography } from "../../Theme";
import { Link } from "expo-router";
import NotificationDateViewer from "./NotificationDateViewer";

const NotificationCard = ({ data }: { data: NotificationType }) => {
  const { width } = useWindowDimensions();
  const cardSize = width - containerSpacing * 2;

  return (
    <Link href={`notification/${data.id}`}>
      <View style={[styles.cardContainer, { width: cardSize }]}>
        <Image
          style={styles.image}
          source={{
            uri: data.image || generateImagePlaceHolderUri(),
          }}
        />
        <View style={styles.infoContainer}>
          <NotificationDateViewer type="fullDate" publishedDate={new Date(data.publishedAt)} />
          <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title, typography.InterSemiBold, typography.textLG]}>
            {data.title}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={[typography.textSM, typography.OutfitRegular]}>
            {data.body}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 115,
  },
  infoContainer: {
    padding: 12,
  },

  title: {
    marginTop: 8,
    marginBottom: 4,
  },
});
