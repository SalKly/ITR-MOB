import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useZodParser } from "./useZodParser";
import { NotificationArraySchema, NotificationSchema, NotificationType } from "../models/Notification";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useInfiniteQuery,
  useQuery,
} from "react-query";

type useNotificationsHook = {
  mostRecentNotifications: NotificationType[];
  archivedNotifications: NotificationType[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  hasNextPage?: boolean;
  isReadyToFetchNextPage: boolean;
  actions: {
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<any, unknown>>;
    refetch: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<InfiniteData<any>, unknown>>;
  };
};
const MOST_RECENT_COUNT = 4;

export const useNotifications = (): useNotificationsHook => {
  const { triggerParser } = useZodParser();
  const { data, isError, isLoading, refetch, hasNextPage, fetchNextPage, isFetching, isRefetching } = useInfiniteQuery({
    queryKey: "fetchNotifications",
    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _page: pageParam,
        },
        signal,
      });
      const parsedData = triggerParser(data, NotificationArraySchema);
      return parsedData;
    },
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 0 ? undefined : allPages.length + 1),
  });

  const allNotifications = useMemo(() => data?.pages.map((data) => data).flat() || [], [data?.pages]);

  const mostRecentNotifications = useMemo(() => allNotifications.slice(0, MOST_RECENT_COUNT), [allNotifications]);

  const archivedNotifications = useMemo(() => allNotifications.slice(MOST_RECENT_COUNT), [allNotifications]);

  const isReadyToFetchNextPage = (hasNextPage && !isError && !isFetching && !isRefetching) || false;

  return {
    mostRecentNotifications,
    archivedNotifications,
    isReadyToFetchNextPage,
    isError,
    isLoading,
    isRefetching,
    hasNextPage,
    isFetching,
    actions: {
      fetchNextPage,
      refetch,
    },
  };
};

type useNotificationByIdHook = {
  currentNotificationData?: NotificationType;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  actions: {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<
      QueryObserverResult<
        {
          image: string;
          publishedAt: string;
          id: number;
          title: string;
          body?: string | undefined;
        },
        unknown
      >
    >;
  };
};

export const useNotificationById = (id: string): useNotificationByIdHook => {
  const { triggerParser } = useZodParser();
  const { data, isError, isLoading, refetch, isFetching, isRefetching } = useQuery(["notificationItem", id], async ({ signal }) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, { signal });
    const parsedData = triggerParser(data, NotificationSchema);
    return parsedData;
  });
  return {
    currentNotificationData: data,
    isError: isError,
    isLoading: isLoading,
    isFetching: isFetching,
    isRefetching: isRefetching,
    actions: {
      refetch: refetch,
    },
  };
};
