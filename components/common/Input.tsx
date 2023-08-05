import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface InputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  readOnly?: boolean;
}

function Input({ name, placeholder, onChange, onBlur, type, value, readOnly }: InputProps) {
  return (
    <InputBox
      name={name}
      type={type}
      id={name}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
    />
  );
}

export default memo(Input);

const InputBox = styled.input`
  border-radius: 8px;
  font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
  padding: 1rem;
  border: 2px solid ${theme.colors.lightGrey};
  width: 100%;
  font-size: 1.4rem;
`;
