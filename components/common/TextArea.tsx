import { memo } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface TextAreaProps {
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
  isDisabled?: boolean;
}

function TextArea({ placeholder, name, onChange, value, isDisabled }: TextAreaProps) {
  return <TextAreaBox name={name} placeholder={placeholder} onChange={onChange} value={value} disabled={isDisabled} />;
}

export default memo(TextArea);

const TextAreaBox = styled.textarea`
  padding: 1rem;
  outline: none;
  resize: none;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.lightGrey};
  border-radius: 5px;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
  transition: 0.2s;
  &:focus {
    border: 2px solid ${theme.colors.primary};
  }
`;
