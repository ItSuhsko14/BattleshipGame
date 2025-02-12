import { CellState, Cell, Field } from '@/types';

export const getShipCells = (cell: Cell, field: Field): Cell[] => {
  const shipCells: Cell[] = [];
  const checked: boolean[][] = new Array(field.length)
    .fill(0)
    .map(() => new Array(field[0].length).fill(false));

  const checkAdjacentCells = (row: number, col: number) => {
    if (
      row < 0 ||
      row >= field.length ||
      col < 0 ||
      col >= field[0].length ||
      checked[row][col]
    ) {
      return;
    }

    checked[row][col] = true;

    if (
      field[row][col].state === CellState.occupied ||
      field[row][col].state === CellState.hit
    ) {
      shipCells.push(field[row][col]);

      const adjacentOffsets = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ];

      for (const offset of adjacentOffsets) {
        const adjacentRow = row + offset.row;
        const adjacentCol = col + offset.col;
        checkAdjacentCells(adjacentRow, adjacentCol);
      }
    }
  };

  checkAdjacentCells(cell.row, cell.col);
  return shipCells;
};
