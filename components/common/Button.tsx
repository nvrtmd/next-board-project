import { memo } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ButtonProps {
  onClick?: () => void;
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  isActivated?: boolean;
}

interface ButtonBoxProps {
  isActivated?: boolean;
}

function Button({ onClick, name, isActivated, type }: ButtonProps) {
  return (
    <ButtonBox
      type={type}
      onClick={
        isActivated
          ? onClick
          : () => {
              return;
            }
      }
      isActivated={isActivated}
    >
      {name}
    </ButtonBox>
  );
}

export default memo(Button);

const ButtonBox = styled.button<ButtonBoxProps>`
  width: 100%;
  padding: 1.5rem;
  font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
  font-size: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: 0.2s;
  color: ${theme.colors.black};
  background: ${theme.colors.secondary};
  ${({ isActivated }) =>
    isActivated &&
    `    
  &:hover {
    cursor: pointer;
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
  }
  `}
  ${({ isActivated }) =>
    !isActivated &&
    `    
    background: ${theme.colors.grey} !important;
  `}
`;
