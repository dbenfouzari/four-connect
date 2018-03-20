import {
  Grid,
  getWinning,
  Winner,
  getElementPosition,
  GridElm,
  Pos,
  getSiblingDirection,
  getWinningStateForElm
} from './engine';

describe('Engine', () => {
  describe('getWinning', () => {
    it('should return null if no winner', () => {
      const grid: Grid = [
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
      ];

      const result: Winner = getWinning(grid);
      const expectedResult: Winner = null;

      expect(result).toBe(expectedResult);
    });

    it('should return `yellow` if it wins', () => {
      const grid: Grid = [
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: null }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
        [
          { owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null },
          { owner: null }, { owner: null }, { owner: null }
        ],
      ];

      const result: Winner = getWinning(grid);
      const expectedResult: Winner = 'yellow';

      expect(result).toBe(expectedResult);
    });
  });

  describe('getElementPosition', () => {
    it('should return the correct position', () => {
      const myElement: GridElm = { owner: 'yellow' };
      const grid: Grid = [
        [{ owner: null }, { owner: null }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: null }],
        [{ owner: null }, myElement, { owner: null }],
      ];

      const result: Pos = getElementPosition(grid, myElement);
      const expectedResult: Pos = {
        x: 2,
        y: 1
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getSiblingDirection', () => {
    it('should return `{ x: "0", y: "+1"`', () => {
      const elementPosition: Pos = { x: 0, y: 0 };
      const siblingPosition: Pos = { x: 0, y: 1 };

      const result = getSiblingDirection(elementPosition, siblingPosition);
      const expectedResult = { x: '0', y: '+1' };

      expect(result).toEqual(expectedResult);
    });

    it('should return `{ x: "-1", y: "+1"`', () => {
      const elementPosition: Pos = { x: 1, y: 0 };
      const siblingPosition: Pos = { x: 0, y: 1 };

      const result = getSiblingDirection(elementPosition, siblingPosition);
      const expectedResult = { x: '-1', y: '+1' };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getWinningStateForElm', () => {
    it('should return `true` when row', () => {
      const myElement: GridElm = { owner: 'yellow' };
      const grid: Grid = [
        [myElement, { owner: 'yellow' }, { owner: 'yellow' }, { owner: 'yellow' }],
        [{ owner: 'red' }, { owner: null }, { owner: null }, { owner: null }],
        [{ owner: 'red' }, { owner: null }, { owner: null }, { owner: null }],
        [{ owner: 'red' }, { owner: null }, { owner: null }, { owner: null }],
      ];

      const result = getWinningStateForElm(grid)(myElement);
      const expectedResult = true;

      expect(result).toBe(expectedResult);
    });

    it('should return `true` when column', () => {
      const myElement: GridElm = { owner: 'yellow' };
      const grid: Grid = [
        [myElement, { owner: 'red' }, { owner: 'red' }, { owner: 'red' }],
        [{ owner: 'yellow' }, { owner: null }, { owner: null }, { owner: null }],
        [{ owner: 'yellow' }, { owner: null }, { owner: null }, { owner: null }],
        [{ owner: 'yellow' }, { owner: null }, { owner: null }, { owner: null }],
      ];

      const result = getWinningStateForElm(grid)(myElement);
      const expectedResult = true;

      expect(result).toBe(expectedResult);
    });

    it('should return `true` when diagonal', () => {
      const myElement: GridElm = { owner: 'yellow' };
      const grid: Grid = [
        [myElement, { owner: 'red' }, { owner: 'red' }, { owner: 'red' }],
        [{ owner: null }, { owner: 'yellow' }, { owner: null }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: 'yellow' }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: null }, { owner: 'yellow' }],
      ];

      const result = getWinningStateForElm(grid)(myElement);
      const expectedResult = true;

      expect(result).toBe(expectedResult);
    });

    it('should return `false`', () => {
      const myElement: GridElm = { owner: 'yellow' };
      const grid: Grid = [
        [myElement, { owner: 'red' }, { owner: 'red' }, { owner: 'red' }],
        [{ owner: 'yellow' }, { owner: 'yellow' }, { owner: null }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: 'red' }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: null }, { owner: 'yellow' }],
      ];

      const result = getWinningStateForElm(grid)(myElement);
      const expectedResult = false;

      expect(result).toBe(expectedResult);
    });
  });
});
