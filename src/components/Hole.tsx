import * as React from 'react';
import styled from 'styled-components';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  children?: JSX.Element | JSX.Element[] | string;
}

const Hole = ({ className, children }: InnerProps & ParentProps) => (
  <div className={className}>
    {children}
  </div>
);

const StyledHole = styled<InnerProps>(Hole)`
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  flex: 1;

  &:empty {
    background: #fff;
  }

  background: #04f;
`;

export default (props: ParentProps) => <StyledHole {...props} />;
