import { useState, memo } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { boardApi } from 'api/board';
import { useInput } from 'hooks/useInput';
import CommentForm from 'components/posts/CommentForm';
import { theme } from 'styles/theme';
import { Comment, CustomError } from 'global/types';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

interface CommentItemProps {
  data: Comment;
  isCommentWriter: boolean;
}

function CommentItem({ data, isCommentWriter }: CommentItemProps) {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const router = useRouter();
  const postIdx = router.query.postIdx as string;
  const { inputValue: comment, handleInputChange: handleCommentChange, setInputValue: setComment } = useInput(
    data.comment_contents,
  );
  const queryClient = useQueryClient();

  const handleModifyClick = () => {
    setComment(data.comment_contents);
    setIsModifying((prev) => !prev);
  };

  const isCommentFormInputValid = comment.length;

  const handleCommentModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCommentFormInputValid && postIdx) {
      try {
        await boardApi.modifyComment(postIdx, data.comment_idx, { contents: comment });
        alert('modify!');
        queryClient.invalidateQueries(['commentData']);
        setIsModifying(false);
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
    }
  };

  const handleCancelClick = () => {
    if (confirm('cancel?')) {
      setIsModifying(false);
    }
  };

  const handleDeleteClick = async () => {
    if (confirm('delete?')) {
      try {
        await boardApi.deleteComment(postIdx, data.comment_idx);
        alert('deleted!');
        queryClient.invalidateQueries(['commentData']);
        setIsModifying(false);
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
    }
  };

  return (
    <CommentsWrapper>
      {isModifying ? (
        <CommentForm
          type="modify"
          onSubmit={handleCommentModify}
          comment={comment}
          onCommentChange={handleCommentChange}
          onCancelButtonClick={handleCancelClick}
        />
      ) : (
        <>
          <CommentWriter>{data.comment_writer.member_nickname}</CommentWriter>
          <CommentContents>{data.comment_contents}</CommentContents>
          <CommentInfo>
            <CommentUpdatedDate>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</CommentUpdatedDate>
            {isCommentWriter && (
              <ButtonWrapper>
                <TextButton onClick={handleModifyClick}>Modify</TextButton>&nbsp;
                <TextButton onClick={handleDeleteClick}>Delete</TextButton>
              </ButtonWrapper>
            )}
          </CommentInfo>
        </>
      )}
    </CommentsWrapper>
  );
}

export default memo(CommentItem);

const CommentsWrapper = styled.div`
  background: ${theme.colors.lightGrey};
  margin: 1rem 0;
  padding: 1.5rem;
  border-radius: 5px;
  line-height: 1.4;
`;

const CommentWriter = styled.div`
  font-size: 1.4rem;
`;

const CommentContents = styled.div`
  font-size: 1.8rem;
`;

const CommentInfo = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
`;

const CommentUpdatedDate = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TextButton = styled.div`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
