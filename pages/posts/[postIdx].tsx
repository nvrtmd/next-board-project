import { useRouter } from 'next/router';
import { boardApi } from 'api/board';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import PostArea from 'components/posts/PostArea';

export default function PostPage() {
  const router = useRouter();
  const postIdx = router.query.postIdx as string;

  const { data, isLoading } = postIdx
    ? useQuery(['postData'], () => boardApi.getPostData(postIdx), {
        refetchOnWindowFocus: false,
      })
    : { data: undefined, isLoading: true };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postIdx) {
    return <div>Invalid post index.</div>;
  }

  return (
    <Wrapper>
      <PostArea data={data} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: red;
  min-height: 100%;
  padding: 50px 30px;
`;
