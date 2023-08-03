import { theme } from 'styles/theme';
import Link from 'next/link';
import styled from 'styled-components';

export default function Header() {
  return (
    <Wrapper>
      <NavBar>
        <Logo>
          <Link href="/">YUZA</Link>
        </Logo>
        <NavList>
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/posts/list">Board</Link>
          </NavItem>

          <NavItem>
            <Link href="/about">About</Link>
          </NavItem>
        </NavList>
      </NavBar>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  padding: 0 3rem;
  background: ${theme.colors.primary};
  height: ${theme.layouts.headerHeight};
  display: grid;
  align-content: center;
`;

const NavBar = styled.nav`
  gap: 50px;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.span`
  font-size: 2rem;
  font-weight: 900;
`;

const NavList = styled.ul`
  gap: 50px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
`;

const NavItem = styled.li`
  transition: 0.2s;
  font-weight: 700;
  &:hover {
    color: ${theme.colors.white};
  }
`;
