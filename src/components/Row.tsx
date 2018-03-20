import * as React from 'react';
import styled from 'styled-components';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Row = ({ className, children }: InnerProps & ParentProps) => (
  <div className={className}>
    {children}
  </div>
);

const StyledRow = styled<InnerProps>(Row)`
  display: flex;
  flex-direction: row;
  flex: 1;
  background: rgb(0, 108, 225);
`;

export default (props: ParentProps) => <StyledRow {...props} />;
