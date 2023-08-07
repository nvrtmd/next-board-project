import Link from 'next/link';
import styled from 'styled-components';
import { boardApi } from 'api/board';
import { Post } from 'global/types';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import PostItem from 'components/posts/PostItem';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Button from 'components/common/Button';

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
      <ButtonWrapper>
        <Link href="/posts/create">
          <Button type="button" name="Create Post" isActivated={true} />
        </Link>
      </ButtonWrapper>

      <PostList>
        {data?.map((post: Post) => (
          <Link href={{ pathname: '/posts/[postIdx]', query: { postIdx: post.post_idx } }}>
            <PostItem data={post} onClick={() => console.log(123)} key={post.post_idx} />
          </Link>
        ))}
      </PostList>
      <Loading ref={intersectRef} isDisplayed={hasNextPage}>
        LOADING...
      </Loading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
`;

const ButtonWrapper = styled.div`
  width: 20%;
  min-width: 150px;
  max-width: 250px;
  margin: 30px auto 0;
`;

const PostList = styled.div`
  width: 85%;
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Loading = styled.div<LoadingProps>`
  ${({ isDisplayed }) =>
    !isDisplayed &&
    `
    display: none !important;
  `}
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
`;
