export const datetimeToTimeFormatter = (date: Date): string => {
  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const datetimeToDateFormatter = (date: Date): string => {
  return date.toLocaleDateString(["en-GB"], { day: "numeric", month: "short", year: "numeric" });
};

export const hoursDifference = (date: Date): number => {
  const now = new Date();
  const diffInMilliseconds = Math.abs(now.getTime() - date.getTime());
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return Math.floor(diffInHours);
};
