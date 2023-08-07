import { memo } from 'react';
import styled from 'styled-components';

function NoComment() {
  return (
    <NoCommentWrapper>
      <div>No Comment</div>
    </NoCommentWrapper>
  );
}

export default memo(NoComment);

const NoCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem 0 1rem;
  font-size: 3rem;
`;
