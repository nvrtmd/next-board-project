import { boardApi } from 'api/board';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Post } from '@/global/types';

export default function PostListPage() {
  const PAGE_SIZE = 2;
  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    ['postList'],
    ({ pageParam = 0 }) => boardApi.getPostList(pageParam, PAGE_SIZE),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.data?.data.length === PAGE_SIZE) {
          return allPages.length * PAGE_SIZE;
        }
        return undefined;
      },
    },
  );

  return (
    <div>
      {data?.pages.map((page) => {
        return page?.data.data.map((post: Post) => (
          <div key={post.post_idx}>
            <h3>
              {post.post_idx} {post.post_title}
            </h3>
          </div>
        ));
      })}

      {hasNextPage && <div onClick={() => fetchNextPage()}>다음 게시글</div>}
    </div>
  );
}
