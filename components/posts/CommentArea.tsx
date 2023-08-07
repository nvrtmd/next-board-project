import { useRouter } from 'next/router';
import { boardApi } from 'api/board';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useInput } from 'hooks/useInput';
import { useEffect, useRef, memo } from 'react';
import { CustomError, Comment } from 'global/types';
import CommentForm from 'components/posts/CommentForm';
import NoComment from 'components/posts/NoComment';
import CommentItem from 'components/posts/CommentItem';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

interface CommentAreaProps {
  currentUserData: string | null;
}

interface LoadingProps {
  isDisplayed?: boolean;
}

function CommentArea({ currentUserData }: CommentAreaProps) {
  const router = useRouter();
  const postIdx = router.query.postIdx as string;
  const intersectRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 5;
  const { inputValue: comment, handleInputChange: handleCommentChange, setInputValue: setComment } = useInput('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = useInfiniteScroll<Comment>(
    ['commentList', postIdx],
    (pageParam) => boardApi.getCommentList(postIdx, pageParam, PAGE_SIZE),
    PAGE_SIZE,
  );
  const queryClient = useQueryClient();

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

  const handleCommentFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (comment.length <= 0) {
        alert('Empty!');
        return;
      }
      if (postIdx) {
        await boardApi.createComment(postIdx, { contents: comment });
        queryClient.invalidateQueries(['commentList', postIdx]);
        setComment('');
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
  };
  return (
    <Wrapper>
      <CommentForm
        type="create"
        onSubmit={handleCommentFormSubmit}
        comment={comment}
        onCommentChange={handleCommentChange}
        isActivated={comment.length > 0}
      />
      {data?.length > 0 ? (
        data.map((comment: Comment) => (
          <CommentItem
            key={comment.comment_idx}
            data={comment}
            isCommentWriter={comment.comment_writer.member_id === currentUserData}
          />
        ))
      ) : (
        <NoComment />
      )}
      <Loading ref={intersectRef} isDisplayed={hasNextPage}>
        LOADING...
      </Loading>
    </Wrapper>
  );
}

export default memo(CommentArea);

export const Wrapper = styled.div`
  padding: 1rem 0 0;
  margin-top: 2rem;
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
