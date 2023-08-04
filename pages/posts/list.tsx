import styled from 'styled-components';
import { boardApi } from 'api/board';
import { Post } from 'global/types';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import PostItem from 'components/posts/PostItem';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
interface LoadingProps {
  isDisplayed?: boolean;
}

export default function PostListPage() {
  const PAGE_SIZE = 10;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteScroll<Post>(
    ['postList'],
    (pageParam) => boardApi.getPostList(pageParam, PAGE_SIZE),
    PAGE_SIZE,
  );
  const intersectRef = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(intersectRef, {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  });

  useEffect(() => {
    if (isIntersect) {
      fetchNextPage();
    }
  }, [isIntersect]);

  return (
    <Wrapper>
      <PostList>
        {data?.map((post: Post) => (
          <PostItem data={post} onClick={() => console.log(123)} key={post.post_idx} />
        ))}
      </PostList>
      <VisibleCitiesLoading ref={intersectRef} isDisplayed={hasNextPage}>
        LOADING...
      </VisibleCitiesLoading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
`;

const PostList = styled.div`
  width: 85%;
  display: grid;
  max-width: 800px;
  margin: 0 auto;
`;

const VisibleCitiesLoading = styled.div<LoadingProps>`
  ${({ isDisplayed }) =>
    !isDisplayed &&
    `
    display: none !important;
  `}
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
`;
