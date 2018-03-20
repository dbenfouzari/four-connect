import * as React from 'react';
import styled from 'styled-components';
import Row from './Row';
import Col from './Col';
import { Grid, Winner } from '../engine/engine';

interface InnerProps {
  className?: string;
}

interface ParentProps {
  grid: Grid;
  onClick: (x: number, y: number) => () => void;
  winner: Winner;
}

const Game = ({ className, grid, onClick, winner }: InnerProps & ParentProps) => (
  <div className={className}>
    {winner && <span>Got a winner ! {winner}</span>}

    {grid.map((row, rowIndex) => (
      <Row key={rowIndex}>
        { row.map((col, colIndex) => (
          <Col
            key={`${rowIndex} - ${colIndex}`}
            element={col}
            onClick={winner ? () => null : onClick(rowIndex, colIndex)}
          />
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
  margin: 0 auto;
`;

export default (props: ParentProps) => <StyledGame {...props} />;
