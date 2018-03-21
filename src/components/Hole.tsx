import * as React from 'react';
import styled from 'styled-components';
import { Winner } from '../engine/engine';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  color: Winner;
}

const Hole = ({ className }: InnerProps & ParentProps) => (
  <div className={className} />
);

const getBackgroundColor = (color: Winner): string => {
  switch (color) {
    case 'yellow':
      return '#ff9';
    case 'red':
      return '#900';
    default:
      return '#fff';
  }
};

const StyledHole = styled<ParentProps>(Hole)`
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  flex: 1;
  background: ${props => getBackgroundColor(props.color)};
`;

export default (props: ParentProps) => <StyledHole {...props} />;
