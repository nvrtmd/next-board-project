import { ReactNode } from 'react';
import Header from 'components/layout/Header';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  width: 100%;
  height: calc(100vh - ${theme.layouts.headerHeight});
`;
