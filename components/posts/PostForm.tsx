import { useMemo } from 'react';
import styled from 'styled-components';
import Input from 'components/common/Input';
import TextArea from 'components/common/TextArea';
import Button from 'components/common/Button';

interface PostFormProps {
  type: 'modify' | 'create';
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formTitle?: string;
  title: string;
  contents: string;
  onTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  onContentsChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  onCancelButtonClick: () => void;
}

function PostForm({
  type,
  onSubmit,
  formTitle,
  title,
  contents,
  onTitleChange,
  onContentsChange,
  onCancelButtonClick,
}: PostFormProps) {
  const isSubmittable = title.length > 0 && contents.length > 0;

  const formHeader = useMemo(() => <FormTitle>{formTitle}</FormTitle>, []);

  const formFooter = useMemo(
    () => (
      <ButtonWrapper>
        <Button type="submit" isActivated={isSubmittable} name={type === 'modify' ? 'Modify' : 'Submit'} />
        <Button type="button" isActivated={true} name="Cancel" onClick={onCancelButtonClick} />
      </ButtonWrapper>
    ),
    [isSubmittable],
  );
  return (
    <Form onSubmit={onSubmit}>
      {formHeader}
      <Input name="title" type="title" value={title} onChange={onTitleChange} placeholder="Write title" />
      <ContentsWrapper>
        <TextArea placeholder="Write contents" name="contents" onChange={onContentsChange} value={contents} />
      </ContentsWrapper>
      {formFooter}
    </Form>
  );
}

export default PostForm;

const Form = styled.form`
  width: 100%;
  padding: 2rem 1.5rem;
  height: 100%;
`;

const FormTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ContentsWrapper = styled.div`
  margin-top: 1.5rem;
  height: 60%;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 3rem;
  width: 50%;
  margin: 0 auto;
  max-width: 300px;
`;
