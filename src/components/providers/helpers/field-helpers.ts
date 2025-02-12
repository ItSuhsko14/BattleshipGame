import { Field, Cell, CellState, FieldConfig, Orientation } from '@/types';

export function initializeEmptyField(size: number = 10): Field {
  const field: Field = [];
  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push({ row: i, col: j, state: CellState.empty });
    }
    field.push(row);
  }
  return field;
}

function placeShip(
  field: Field,
  row: number,
  col: number,
  deck: number,
  orientation: Orientation
): void {
  for (let i = 0; i < deck; i++) {
    const newRow = orientation === Orientation.vertical ? row + i : row;
    const newCol = orientation === Orientation.horizontal ? col + i : col;
    field[newRow][newCol].state = CellState.occupied;
  }
}

export function generateShips({ fieldSize, ships }: FieldConfig): Field {
  const field: Field = initializeEmptyField(fieldSize);

  for (const [deck, count] of ships) {
    for (let k = 0; k < count; k++) {
      const orientation =
        Math.random() < 0.5 ? Orientation.horizontal : Orientation.vertical;
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * fieldSize);
        const col = Math.floor(Math.random() * fieldSize);
        if (canPlaceShip(field, row, col, deck, orientation)) {
          placeShip(field, row, col, deck, orientation);
          placed = true;
        }
      }
    }
  }

  return field;
}

export function canPlaceShip(
  field: Field,
  row: number,
  col: number,
  deck: number,
  orientation: Orientation
): boolean {
  const fieldSize = field.length;
  if (orientation === Orientation.horizontal && col + deck > fieldSize)
    return false;
  if (orientation === Orientation.vertical && row + deck > fieldSize)
    return false;

  for (let i = 0; i < deck; i++) {
    const newRow = orientation === Orientation.vertical ? row + i : row;
    const newCol = orientation === Orientation.horizontal ? col + i : col;

    if (field[newRow][newCol].state !== CellState.empty) return false;

    // Перевірка на відстань між кораблями
    for (let r = newRow - 1; r <= newRow + 1; r++) {
      for (let c = newCol - 1; c <= newCol + 1; c++) {
        if (
          r >= 0 &&
          r < fieldSize &&
          c >= 0 &&
          c < fieldSize &&
          field[r][c].state !== CellState.empty
        ) {
          return false;
        }
      }
    }
  }

  return true;
}
