import { Field, CellState, ShipsConfig } from '../../../types';

export const getShipCount = (field: Field): Map<number, number> => {
  const shipCounts = new Map<number, number>();

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j].state === CellState.occupied) {
        let shipSize = 0;

        // Check horizontal
        let col = j;
        while (
          col < field[i].length &&
          field[i][col].state === CellState.occupied
        ) {
          shipSize++;
          col++;
        }

        // If not horizontal, check vertical
        if (shipSize === 1) {
          let row = i;
          while (
            row < field.length &&
            field[row][j].state === CellState.occupied
          ) {
            shipSize++;
            row++;
          }
          shipSize--; // Adjust for double counting the first cell
        }

        // Only count if this is the start of the ship
        if (i === 0 || field[i - 1][j].state !== CellState.occupied) {
          if (j === 0 || field[i][j - 1].state !== CellState.occupied) {
            const currentCount = shipCounts.get(shipSize) || 0;
            shipCounts.set(shipSize, currentCount + 1);
          }
        }
      }
    }
  }

  return shipCounts;
};

export const getIsFieldConfigured = (
  field: Field,
  configuration: ShipsConfig
): boolean => {
  const shipCounts = getShipCount(field);

  // Initialize ship counts to 0 for each deck size
  configuration.forEach(([deck]) => {
    if (!shipCounts.has(deck)) {
      shipCounts.set(deck, 0);
    }
  });

  // Verify counts match configuration
  return configuration.every(([deck, count]) => shipCounts.get(deck) === count);
};
