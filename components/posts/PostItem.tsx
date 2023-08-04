import { memo } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { theme } from 'styles/theme';
import { Post } from 'global/types';

interface PostItemProps {
  data: Post;
  onClick: (postIdx: number) => void;
}

function PostItem({ data, onClick }: PostItemProps) {
  return (
    <Wrapper onClick={() => onClick(data.post_idx)}>
      <Index>{data.post_idx}</Index>
      <Title>
        {data.post_title.length > 10 ? data.post_title.substring(0, 10) + '...' : data.post_title}
        <CommentsCount> ({data.comments_count})</CommentsCount>
      </Title>
      <Contents>
        {data.post_contents.length > 10 ? data.post_contents.substring(0, 10) + '...' : data.post_contents}
      </Contents>
      <DetailInfo>
        <div>by {data.post_writer ? data.post_writer.member_nickname : 'deleted account'}</div>
        <div>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</div>
      </DetailInfo>
    </Wrapper>
  );
}

export default memo(PostItem);

const Wrapper = styled.div`
  border: 3px solid ${theme.colors.primary};
  max-width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0px ${theme.colors.lightGrey};
  -webkit-box-shadow: 5px 5px 10px 0px ${theme.colors.lightGrey};
  -moz-box-shadow: 5px 5px 10px 0px ${theme.colors.lightGrey};
  &:hover,
  &:hover > div > div,
  &:hover > div {
    color: ${theme.colors.white};
    transition: 0.2s;
    cursor: pointer;
  }
  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const Index = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.grey};
`;

const Title = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
`;

const CommentsCount = styled.div`
  color: ${theme.colors.grey};
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const Contents = styled.div`
  font-size: 1.45rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailInfo = styled.div`
  color: ${theme.colors.grey};
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  @media screen and (max-width: 300px) {
    display: none;
  }
`;
