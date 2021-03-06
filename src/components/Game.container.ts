import { compose, withState, withHandlers, withProps } from 'recompose';
import { Grid, Player, getWinner, Winner, findFreeCell, Pos } from '../engine/engine';
import Game from './Game';

const initialGrid: Grid = [
  [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }], [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }], [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }], [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }], [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }], [{
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }, {
    owner: null
  }],
];

interface GameProps {
  nextPlayer: Player;
  setNextPlayer: (color: string) => void;
  onClick: (y: number) => () => void;
  grid: Grid;
  setGrid: (nextGrid: Grid) => void;
  winner: Winner;
}

interface ParentProps {
}

const onClick = ({ nextPlayer, setNextPlayer, setGrid, grid }: GameProps) => (y: number) => () => {
  const nextGrid: Grid = [...grid];
  const x: Pos['x'] | null = findFreeCell(grid)(y);

  (nextGrid[(x as number)] || [])[y] = { owner: nextPlayer };

  setGrid(nextGrid);

  switch (nextPlayer) {
    case 'red':
      setNextPlayer('yellow');
      break;
    default:
      setNextPlayer('red');
      break;
  }
};

export default compose<GameProps & ParentProps, ParentProps>(
  withState('grid', 'setGrid', initialGrid),
  withState('nextPlayer', 'setNextPlayer', 'red'),
  withHandlers({ onClick }),
  withProps(({ grid }) => ({
    winner: getWinner(grid)
  }))
)(Game);
