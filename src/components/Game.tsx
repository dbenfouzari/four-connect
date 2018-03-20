import * as React from 'react';
import styled from 'styled-components';
import Row from './Row';
import Col from './Col';
import { Grid } from '../engine/engine';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  grid: Grid;
  onClick: (x: number, y: number) => () => void;
}

const Game = ({ className, grid, onClick }: InnerProps & ParentProps) => (
  <div className={className}>
    {grid.map((row, rowIndex) => (
      <Row key={rowIndex}>
        { row.map((col, colIndex) => (
          <Col key={`${rowIndex} - ${colIndex}`} element={col} onClick={onClick(rowIndex, colIndex)} />
        )) }
      </Row>
    ))}
  </div>
);

const StyledGame = styled<ParentProps>(Game)`
  max-width: 700px;
  min-width: 700px;
  max-height: 600px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

export default (props: ParentProps) => <StyledGame {...props} />;
