import * as React from 'react';
import styled from 'styled-components';
import Hole from './Hole';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  children?: JSX.Element | JSX.Element[] | string;
}

const Col = ({ className, children }: InnerProps & ParentProps) => (
  <div className={className}>
    <Hole>
      {children}
    </Hole>
  </div>
);

const StyledCol = styled<InnerProps>(Col)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  max-height: 100px;
`;

export default (props: ParentProps) => <StyledCol {...props} />;
