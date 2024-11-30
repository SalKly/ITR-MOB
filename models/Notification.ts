import { z } from "zod";
import { generateImagePlaceHolderUri } from "../utils/imageUtil";

const getRelativeDate = (id: number, maxDaysOffset: number): string => {
  const baseDate = new Date();
  const daysOffset = id % maxDaysOffset;
  const relativeDate = new Date(baseDate.getTime() - daysOffset * 24 * 60 * 60 * 1000);
  return relativeDate.toISOString();
};

export const NotificationSchema = z
  .object({
    id: z.number(),
    title: z.string().min(1),
    body: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    image: generateImagePlaceHolderUri(),
    publishedAt: getRelativeDate(data.id, 7), // Random ISO datetime
  }));
export const NotificationArraySchema = z.array(NotificationSchema);

export type NotificationType = z.infer<typeof NotificationSchema>;
export type BaseNotificationType = z.input<typeof NotificationSchema>;
