import { compose, withState, withHandlers, withProps } from 'recompose';
import { Grid, Player, getWinning, Winner } from '../engine/engine';
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
    owner: 'red'
  }, {
    owner: 'yellow'
  }],
];

interface GameProps {
  nextPlayer: Player;
  setNextPlayer: (color: string) => void;
  onClick: (x: number, y: number) => () => void;
  grid: Grid;
  setGrid: (nextGrid: Grid) => void;
  winner: Winner;
}

interface ParentProps {
}

const onClick = ({ nextPlayer, setNextPlayer, setGrid, grid }: GameProps) => (x: number, y: number) => () => {
  const nextGrid: Grid = [...grid];
  nextGrid[x][y] = {owner: nextPlayer};

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
    winner: getWinning(grid)
  }))
)(Game);
