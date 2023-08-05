import styled from 'styled-components';
import moment from 'moment';
import { theme } from 'styles/theme';
import { Post } from 'global/types';
import { memo } from 'react';

interface PostAreaProps {
  data: Post;
}

function PostArea({ data }: PostAreaProps) {
  return (
    <>
      <Header>
        <Title>{data.post_title}</Title>
        <Writer>by {data.post_writer ? data.post_writer.member_nickname : 'deleted account'}</Writer>
        <UpdatedDate>
          <div>{data.updatedAt && moment(data.updatedAt).format('YY.MM.DD HH:mm')}</div>
        </UpdatedDate>
      </Header>
      <Body>{data.post_contents}</Body>
    </>
  );
}

export default memo(PostArea);

const Header = styled.div`
  border-bottom: 1px solid ${theme.colors.black};
  padding-bottom: 0.5rem;
  line-height: 1.4;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const Writer = styled.div`
  font-size: 1.7rem;
`;

const UpdatedDate = styled.div`
  font-size: 1.35rem;
`;

const Body = styled.div`
  padding: 1rem 0 2rem;
  min-height: 20rem;
  font-size: 1.55rem;
  line-height: 1.35;
`;
