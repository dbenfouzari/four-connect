import * as React from 'react';
import styled from 'styled-components';
import Row from './Row';
import Col from './Col';

interface InnerProps {
  className?: string;
}

interface ParentProps {}

const GRID = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const Game = ({ className }: InnerProps) => (
  <div className={className}>
    {GRID.map((row, rowIndex) => (
      <Row key={rowIndex}>
        { row.map((col, colIndex) => (
          <Col key={colIndex} />
        )) }
      </Row>
    ))}
  </div>
);

const StyledGame = styled<InnerProps>(Game)`
  max-width: 700px;
  min-width: 700px;
  max-height: 600px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

export default (props: ParentProps) => <StyledGame {...props} />;
