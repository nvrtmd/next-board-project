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

  const handleEditClick = () => {
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
        // router.replace(`/posts/${postIdx}`);
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
    }
  };

  const handleCancelButtonClick = () => {
    if (confirm('cancel?')) {
      // router.replace(`/posts/${postIdx}`);
      setIsModifying(false);
    }
  };

  return (
    <Wrapper>
      {isModifying ? (
        <PostForm
          type="modify"
          onSubmit={handlePostModify}
          title={title}
          contents={contents}
          onTitleChange={handleTitleChange}
          onContentsChange={handleContentsChange}
          onCancelButtonClick={handleCancelButtonClick}
        />
      ) : (
        <>
          <PostArea data={data} />
          {data?.post_writer.member_id === 'user' && (
            <ButtonWrapper>
              <Button onClick={handleEditClick} name="Modify" isActivated />
            </ButtonWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  padding: 50px 30px;
`;

const ButtonWrapper = styled.div`
  padding: 3rem;
  width: 50%;
  margin: 0 auto;
  max-width: 300px;
`;
