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
import { theme } from 'styles/theme';
import CommentArea from 'components/posts/CommentArea';

export default function PostPage() {
  const router = useRouter();
  const postIdx = router.query.postIdx as string;
  const queryClient = useQueryClient();
  const { inputValue: title, handleInputChange: handleTitleChange, setInputValue: setTitle } = useInput('');
  const { inputValue: contents, handleInputChange: handleContentsChange, setInputValue: setContents } = useInput('');
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
        data && (
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
            <CommentArea currentUserData="user" />
          </>
        )
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

const CommentListBottom = styled.div``;
