import styled from 'styled-components';

export const NoComment = () => {
  return (
    <NoCommentWrapper>
      <div>No Comment</div>
    </NoCommentWrapper>
  );
};

const NoCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem 0 1rem;
  font-size: 3rem;
`;
