import { Cell, CellState, Field } from '@/types';

const getRandomIndex = (fieldSize: number) =>
  Math.floor(Math.random() * fieldSize);

export const getAiShot = (userField: Field): Cell => {
  let rowI, colJ;

  const fieldSize = userField[0].length;

  // Helper function to check if a cell is within bounds
  const isInBounds = (row: number, col: number) =>
    row >= 0 && row < userField.length && col >= 0 && col < userField[0].length;

  // Helper function to find partially hit ships
  const findPartiallyHitShip = () => {
    for (let row = 0; row < userField.length; row++) {
      for (let col = 0; col < userField[row].length; col++) {
        const cell = userField[row][col];
        if (cell.state === CellState.hit) {
          const directions = [
            [-1, 0], // up
            [1, 0], // down
            [0, -1], // left
            [0, 1], // right
          ];
          // Shuffle directions randomly
          const shuffledDirections = [...directions].sort(
            () => Math.random() - 0.5
          );

          for (const [dx, dy] of shuffledDirections) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (
              isInBounds(newRow, newCol) &&
              (userField[newRow][newCol].state === CellState.empty ||
                userField[newRow][newCol].state === CellState.occupied)
            ) {
              return userField[newRow][newCol];
            }
          }
        }
      }
    }
    return null;
  };

  const partialHitCell = findPartiallyHitShip();
  if (partialHitCell) {
    return partialHitCell;
  }

  // Otherwise, find a random available cell
  do {
    rowI = getRandomIndex(fieldSize);
    colJ = getRandomIndex(fieldSize);
  } while (
    userField[rowI][colJ].state === CellState.missed ||
    userField[rowI][colJ].state === CellState.hit
  );

  return userField[rowI][colJ];
};
