export type Player = 'red' | 'yellow';
export type Winner = Player | null;
export type GridElm = {
  owner: Player | null;
};
export type GridRow = GridElm[];
export type Grid = GridRow[];
export type Pos = {
  x: number;
  y: number;
};
type DirectionGap = '+1' | '0' | '-1';
export type Direction = {
  x: DirectionGap;
  y: DirectionGap;
};

const getGridElement = (grid: Grid) => (pos: Pos): GridElm => {
  /**
   * Below commented code should be used when using Immutable.JS
   */
  // if (grid.getIn) {
  //   return grid.getIn([pos.x < 0 ? undefined : pos.x, pos.y < 0 ? undefined : pos.y ]);
  // }

  return (grid[pos.x] || [])[pos.y];
};

/**
 *
 * @param grid The grid that will be parsed
 * @param position The grid item to search for siblings
 * @returns An array of grid elements
 */
export const getSiblings = (grid: Grid, pos: Pos): GridElm[] => {
  const N =  getGridElement(grid)({ x: pos.x - 1, y: pos.y     });
  const NE = getGridElement(grid)({ x: pos.x - 1, y: pos.y + 1 });
  const E =  getGridElement(grid)({ x: pos.x    , y: pos.y + 1 });
  const SE = getGridElement(grid)({ x: pos.x + 1, y: pos.y + 1 });
  const S =  getGridElement(grid)({ x: pos.x + 1, y: pos.y     });
  const SO = getGridElement(grid)({ x: pos.x + 1, y: pos.y - 1 });
  const O =  getGridElement(grid)({ x: pos.x    , y: pos.y - 1 });
  const NO = getGridElement(grid)({ x: pos.x - 1, y: pos.y - 1 });

  return [
    N, NE, E, SE, S, SO, O, NO
  ].filter(i => i && i.hasOwnProperty('owner'));
};

/**
 *
 * @param grid The grid that will be parsed
 * @param element The element the position will be searched for
 * @returns Element position
 */
export const getElementPosition = (grid: Grid, element: GridElm): Pos => {
  let elmPos: Pos = {x: 0, y: 0};

  grid.forEach((row, rowIndex) => {
    const index = row.findIndex((elm: GridElm) => elm === element);
    if (index > -1) {
      elmPos = {
        x: rowIndex,
        y: index
      };
    }
  });

  return elmPos;
};

/**
 *
 * @param grid The grid that will be parsed
 * @param position The grid item to search for siblings
 */
export const getColorSiblings = (grid: Grid, pos: Pos): Pos[] => {
  const siblings = getSiblings(grid, pos);
  const elementColor = getGridElement(grid)(pos).owner;
  const friendSiblings = siblings.filter(item => item.owner === elementColor);

  return friendSiblings.map(el => getElementPosition(grid, el));
};

/**
 *
 * @param elementPosition The element position
 * @param siblingPosition The sibling element position
 * @returns The direction { x, y }
 */
export const getSiblingDirection = (elementPosition: Pos, siblingPosition: Pos): Direction => {
  const xGap: number = siblingPosition.x - elementPosition.x;
  const yGap: number = siblingPosition.y - elementPosition.y;

  const getDirectionFor = (gap: number): DirectionGap => {
    switch (gap) {
      case 1:
        return '+1';
      case -1:
        return '-1';
      default:
        return '0';
    }
  };

  return {
    x: getDirectionFor(xGap),
    y: getDirectionFor(yGap)
  };
};

export const getNextElementInDirection = (grid: Grid, elementPosition: Pos, direction: Direction): GridElm => {
  // tslint:disable-next-line:no-eval
  return (grid[elementPosition.x + eval(direction.x)] || [])[elementPosition.y + eval(direction.y)];
};

export const getWinningStateForElm = (grid: Grid) => (element: GridElm): boolean => {
  const elementPosition: Pos = getElementPosition(grid, element);
  const siblings: Pos[] = getColorSiblings(grid, elementPosition);

  for (let i = 0; i < siblings.length; i++) {
    const siblingPosition: Pos = siblings[i];
    const direction = getSiblingDirection(elementPosition, siblingPosition);
    const nextElementInDirection1: GridElm = getNextElementInDirection(grid, elementPosition, direction);
    const nextElementInDirection2: GridElm =
      getNextElementInDirection(grid, getElementPosition(grid, nextElementInDirection1), direction);
    const nextElementInDirection3: GridElm =
      getNextElementInDirection(grid, getElementPosition(grid, nextElementInDirection2), direction);

    if (
      nextElementInDirection1 && nextElementInDirection1.owner === element.owner &&
      nextElementInDirection2 && nextElementInDirection2.owner === element.owner &&
      nextElementInDirection3 && nextElementInDirection3.owner === element.owner
    ) {
        return true;
      }
  }

  return false;
};

export const findFreeCell = (grid: Grid) => (y: Pos['y']) => {
  let x = null;

  for (let i = 0; i < grid.length; i++) {
    if (grid[grid.length - i - 1][y].owner === null) {
      x = grid.length - i - 1;
      break;
    }
  }

  return x;
};

/**
 *
 * @param grid The grid that will be parsed to find winning element
 * @returns Winning player color
 */
export const getWinner = (grid: Grid): Winner => {
  let winner: Winner = null;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const gridElm: GridElm = grid[x][y];

      if (gridElm.owner && getWinningStateForElm(grid)(gridElm) === true) {
        winner = gridElm.owner;
        break;
      }
    }

    if (winner) {
      break;
    }
  }

  return winner;
};
