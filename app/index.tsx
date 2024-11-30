import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NotificationCard from "../components/notificationsCenter/NotificationCard";
import { background, containerSpacing, typography } from "../Theme";
import CarouselPagination from "../components/notificationsCenter/carousel/CarouselPagination";
import { useNotifications } from "../hooks/notificationHooks";
import { NotificationType } from "../models/Notification";
import Spinner from "../components/shared/Spinner";
import ErrorComp from "../components/shared/ErrorComp";

const ListFooter = ({ isLoading, isError, refetch }: { isLoading: boolean; isError: boolean; refetch: () => void }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorComp message="Unable to load notifications. Please check your connection and try again." action={refetch} />;
  }
  return null;
};

const ListRenderItem = React.memo(({ data }: { data: NotificationType }) => {
  return <NotificationCard data={data} />;
});

const NotificationsCenter = () => {
  const { mostRecentNotifications, archivedNotifications, isLoading, actions, isError, isFetching, isReadyToFetchNextPage } = useNotifications();
  const { fetchNextPage, refetch } = actions;
  return (
    <FlatList<NotificationType>
      style={styles.listContainer}
      onEndReached={() => {
        if (isReadyToFetchNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      initialNumToRender={4}
      ListFooterComponent={<ListFooter isError={isError} isLoading={isFetching || isLoading} refetch={refetch} />}
      ListHeaderComponent={<CarouselPagination data={mostRecentNotifications} />}
      contentContainerStyle={styles.listItems}
      data={archivedNotifications}
      renderItem={({ item }) => <ListRenderItem data={item} />}
    />
  );
};

export default NotificationsCenter;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: background,
    flex: 1,
  },
  listItems: {
    paddingHorizontal: containerSpacing,
    gap: 12,
  },
});
