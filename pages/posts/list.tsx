import { boardApi } from 'api/board';
import { Post } from 'global/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function PostListPage() {
  const PAGE_SIZE = 3;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteScroll<Post>(
    ['postList'],
    (pageParam) => boardApi.getPostList(pageParam, PAGE_SIZE),
    PAGE_SIZE,
  );

  return (
    <div>
      {data?.map((post: Post) => (
        <div key={post.post_idx}>
          <h3>
            {post.post_idx} {post.post_title}
          </h3>
        </div>
      ))}

      {hasNextPage && <div onClick={() => fetchNextPage()}>다음 게시글</div>}
    </div>
  );
}
