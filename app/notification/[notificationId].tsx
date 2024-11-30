import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useNotificationById } from "../../hooks/notificationHooks";
import { generateImagePlaceHolderUri } from "../../utils/imageUtil";
import NotificationDateViewer from "../../components/notificationsCenter/NotificationDateViewer";
import Spinner from "../../components/shared/Spinner";
import ErrorComp from "../../components/shared/ErrorComp";
import { containerSpacing, typography } from "../../Theme";

const Notification = () => {
  const id = useLocalSearchParams<{ notificationId?: string }>();
  const { currentNotificationData, isLoading, isFetching, isError, actions } = useNotificationById(id.notificationId || "");
  const { refetch } = actions;
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (!currentNotificationData || isError) {
    return <ErrorComp message="Couldn't get the notification data please try again" action={refetch} />;
  }

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: currentNotificationData?.image || generateImagePlaceHolderUri(),
        }}
      />
      <View style={styles.textContainer}>
        <NotificationDateViewer type="fullDate" publishedDate={new Date(currentNotificationData.publishedAt)} />
        <Text style={[styles.title, typography.text2XL, typography.InterSemiBold]}>{currentNotificationData.title}</Text>
        <Text style={[typography.textMD, typography.OutfitRegular]}>{currentNotificationData.body}</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 167,
    marginBottom: 16,
  },
  textContainer: {
    paddingLeft: containerSpacing,
  },
  title: {
    marginTop: 8,
    marginBottom: 6,
  },
});
