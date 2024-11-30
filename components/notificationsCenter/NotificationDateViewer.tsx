import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { datetimeToDateFormatter, datetimeToTimeFormatter, hoursDifference } from "../../utils/dateHandlers";
import { typography } from "../../Theme";

const NotificationDateViewer = ({ publishedDate, type }: { publishedDate: Date; type: "fullDate" | "hours" }) => {
  const hoursDiff = hoursDifference(publishedDate);
  const time = datetimeToTimeFormatter(publishedDate);
  const date = datetimeToDateFormatter(publishedDate);

  return (
    <>
      {type == "fullDate" ? (
        <Text style={[typography.textXS, typography.OutfitRegular]}>
          {time} , {date}
        </Text>
      ) : (
        <Text style={[styles.hoursText, typography.textSM, typography.OutfitMedium]}>{`${hoursDiff} hrs later`}</Text>
      )}
    </>
  );
};

export default NotificationDateViewer;

const styles = StyleSheet.create({
  hoursText: {
    paddingHorizontal: 7,
    alignSelf: "flex-start",
    borderRadius: 6,
    color: "white",
    paddingVertical: 4,
    backgroundColor: "#2525257D",
  },
});
