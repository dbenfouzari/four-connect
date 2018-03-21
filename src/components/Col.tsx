import * as React from 'react';
import styled from 'styled-components';
import Hole from './Hole';
import { GridElm } from '../engine/engine';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  children?: JSX.Element | JSX.Element[] | string;
  element: GridElm;
  onClick: () => void;
}

const Col = ({ className, element, onClick }: InnerProps & ParentProps) => {
  // tslint:disable-next-line:no-console
  return (
    <div className={className} onClick={onClick}>
      <Hole color={element.owner} />
    </div>
  );
};

const StyledCol = styled<InnerProps>(Col)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  max-height: 100px;
`;

export default (props: ParentProps) => <StyledCol {...props} />;
