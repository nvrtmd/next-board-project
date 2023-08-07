import { useRouter } from 'next/router';
import { boardApi } from 'api/board';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import PostArea from 'components/posts/PostArea';
import { useInput } from 'hooks/useInput';
import { useState } from 'react';
import PostForm from 'components/posts/PostForm';
import { CustomError } from 'global/types';
import Button from 'components/common/Button';
import { CommentForm } from 'components/posts/CommentForm';
import { theme } from 'styles/theme';
import { NoComment } from '@/components/posts/NoComment';

export default function PostPage() {
  const router = useRouter();
  const postIdx = router.query.postIdx as string;
  const queryClient = useQueryClient();
  const { inputValue: title, handleInputChange: handleTitleChange, setInputValue: setTitle } = useInput('');
  const { inputValue: contents, handleInputChange: handleContentsChange, setInputValue: setContents } = useInput('');
  const { inputValue: comment, handleInputChange: handleCommentChange } = useInput('');
  const [isModifying, setIsModifying] = useState(false);
  const { data, isLoading } = useQuery(['postData', postIdx], () => boardApi.getPostData(postIdx), {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postIdx) {
    return <div>Invalid post index.</div>;
  }

  const handleModifyClick = () => {
    setIsModifying(true);
    setTitle(data.post_title);
    setContents(data.post_contents);
  };

  const isPostFormInputValid = title.length && contents.length;

  const handlePostModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPostFormInputValid && postIdx) {
      try {
        await boardApi.modifyPost(postIdx, { title, contents });
        alert('modify!');
        queryClient.invalidateQueries(['postData', postIdx]);
        setIsModifying(false);
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (confirm('Delete?')) {
        await boardApi.deletePost(postIdx);
        alert('Deleted!');
        router.replace('/posts/list');
      } else {
        return;
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
    }
  };

  const handleCancelButtonClick = () => {
    if (confirm('cancel?')) {
      setIsModifying(false);
    }
  };

  const handleCommentFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (comment.length <= 0) {
        alert('Empty!');
        return;
      }
      if (postIdx) {
        await boardApi.createComment(postIdx, { contents: comment });
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
  };

  return (
    <Wrapper>
      {isModifying ? (
        <PostFormWrapper>
          <PostForm
            type="modify"
            onSubmit={handlePostModify}
            title={title}
            contents={contents}
            onTitleChange={handleTitleChange}
            onContentsChange={handleContentsChange}
            onCancelButtonClick={handleCancelButtonClick}
          />
        </PostFormWrapper>
      ) : (
        <>
          <PostAreaWrapper>
            <PostArea data={data} />
            {data?.post_writer.member_id === 'user' && (
              <ButtonWrapper>
                <Button onClick={handleModifyClick} name="Modify" isActivated />
                <Button onClick={handleDeleteClick} name="Delete" isActivated />
              </ButtonWrapper>
            )}
          </PostAreaWrapper>
          <CommentForm
            type="modify"
            onSubmit={handleCommentFormSubmit}
            comment={comment}
            onCommentChange={handleCommentChange}
            isActivated={comment.length > 0}
          />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  display: grid;
  padding: 50px 30px;
`;

const PostAreaWrapper = styled.div`
  border-bottom: 2px solid ${theme.colors.lightGrey};
  margin-bottom: 30px;
`;

const PostFormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: grid;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 3rem;
  width: 50%;
  margin: 0 auto;
  max-width: 300px;
`;
