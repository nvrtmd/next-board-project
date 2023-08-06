import { useCallback } from 'react';
import styled from 'styled-components';
import { boardApi } from 'api/board';
import { useInput } from 'hooks/useInput';
import PostForm from 'components/posts/PostForm';
import { CustomError } from 'global/types';
import { useRouter } from 'next/router';

export default function PostCreatePage() {
  const { inputValue: title, handleInputChange: handleTitleChange } = useInput('');
  const { inputValue: contents, handleInputChange: handleContentsChange } = useInput('');
  const router = useRouter();

  const isPostFormInputValid = title.length && contents.length;

  const handlePostFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPostFormInputValid) {
        try {
          await boardApi.createPost({ title, contents });
          alert('created!');
          router.replace('/posts/list');
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
          return;
        }
      }
    },
    [title, contents],
  );

  const handleCancelButtonClick = useCallback(() => confirm('cancel?') && router.push('/posts/list'), []);

  return (
    <Wrapper>
      <PostFormWrapper>
        <PostForm
          onSubmit={handlePostFormSubmit}
          formTitle="- Create Post -"
          title={title}
          onTitleChange={handleTitleChange}
          contents={contents}
          onContentsChange={handleContentsChange}
          onCancelButtonClick={handleCancelButtonClick}
        />
      </PostFormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  display: grid;
  padding: 20px 30px;
`;

const PostFormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: grid;
`;
