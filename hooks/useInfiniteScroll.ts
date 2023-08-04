import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

interface InfiniteScrollReturn<T> {
  data: T[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error?: Error;
}

const useInfiniteScroll = <T>(
  queryKey: QueryKey,
  queryFn: (pageParam: number) => Promise<T[]>,
  pageSize: number,
): InfiniteScrollReturn<T> => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 0 }) => queryFn(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === pageSize) {
          return allPages.length * pageSize;
        }
        return undefined;
      },
    },
  );

  return {
    data: data ? data.pages.flatMap((page) => page) : [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error: error as Error,
  };
};

export default useInfiniteScroll;
