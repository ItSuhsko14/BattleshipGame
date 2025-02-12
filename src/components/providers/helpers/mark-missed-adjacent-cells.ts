import { CellState, Cell, Field } from '@/types';

export const markMissedAdjacentCells = (shipCells: Cell[], field: Field) => {
  const adjacentOffsets = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

  for (const cell of shipCells) {
    for (const offset of adjacentOffsets) {
      const adjacentRow = cell.row + offset.row;
      const adjacentCol = cell.col + offset.col;

      if (
        adjacentRow >= 0 &&
        adjacentRow < field.length &&
        adjacentCol >= 0 &&
        adjacentCol < field[0].length &&
        field[adjacentRow][adjacentCol].state !== CellState.hit
      ) {
        field[adjacentRow][adjacentCol].state = CellState.missed;
      }
    }
  }
};
