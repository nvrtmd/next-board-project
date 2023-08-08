import styled from 'styled-components';

export default function HomePage() {
  return (
    <Wrapper>
      <Title>Hello, World!</Title>
      <Subtitle>This is board project built by Next.js</Subtitle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  text-align: center;
  line-height: 1.5;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 2rem;
`;

const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 1.8rem;
`;
