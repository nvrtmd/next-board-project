import { memo, useMemo } from 'react';
import styled from 'styled-components';
import TextArea from 'components/common/TextArea';
import Button from 'components/common/Button';

interface CommentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  comment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formTitle?: string;
  type: 'modify' | 'create';
  onCancelButtonClick?: () => void;
  isActivated?: boolean;
}

interface ButtonWrapperProps {
  type: 'modify' | 'create';
}

function CommentForm({
  onSubmit,
  onCommentChange,
  comment,
  formTitle,
  type,
  onCancelButtonClick,
  isActivated,
}: CommentFormProps) {
  const isSubmittable = comment.length > 0;

  const formHeader = useMemo(() => formTitle && <FormTitle>{formTitle}</FormTitle>, []);

  const formFooter = useMemo(
    () => (
      <ButtonWrapper type={type}>
        <Button name={type === 'modify' ? 'Modify' : 'Write comment'} type="submit" isActivated={isSubmittable} />
        {type === 'modify' && <Button name="Cancel" type="button" onClick={onCancelButtonClick} isActivated={true} />}
      </ButtonWrapper>
    ),
    [isActivated],
  );

  return (
    <Form onSubmit={onSubmit}>
      {formHeader}
      <CommentWrapper>
        <TextArea placeholder="Write comment" name="comment" onChange={onCommentChange} value={comment} />
      </CommentWrapper>
      {formFooter}
    </Form>
  );
}

export default memo(CommentForm);

const Form = styled.form``;

const FormTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const CommentWrapper = styled.div`
  height: 100px;
  margin-bottom: 0.8rem;
`;

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  ${({ type }) =>
    type === 'modify' &&
    `    
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  `}
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
  max-width: 300px;
`;
