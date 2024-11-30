import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Image, Text, View } from "react-native";
import { generateImagePlaceHolderUri } from "../utils/imageUtil";
import CustomHeader from "../components/shared/CustomHeader";

type Props = {};

const _layout = (props: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Notifications",
            header: (props) => <CustomHeader nativeHeaderProps={props} />,
          }}
        />
        <Stack.Screen
          name="notification/[notificationId]"
          options={{
            title: "Notification Details",
            header: (props) => <CustomHeader nativeHeaderProps={props} />,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default _layout;
