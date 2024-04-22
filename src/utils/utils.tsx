export interface Cell {
  i: number;
  j: number;
  mode: 'empty' | 'occupied' | 'missed' | 'hit';
}


export type Ship = Cell[];

export type Field = Ship[];

export interface AppState {
  mode: 'null' | 'setting' | 'play';
  userField: Field;
  computerField: Field;
}
function generateShips(shipCounts: [number, number][]): Field {
  const fieldSize = 10; // Розмір поля
  const field: Field = [];

  // Ініціалізація порожнього поля
  for (let i = 0; i < fieldSize; i++) {
    const row: Ship = [];
    for (let j = 0; j < fieldSize; j++) {
      row.push({ i, j, mode: 'empty' });
    }
    field.push(row);
  }


  // Генерація розташування кораблів
  for (const [deck, count] of shipCounts) {
    for (let k = 0; k < count; k++) {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
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

function canPlaceShip(field: Field, row: number, col: number, deck: number, orientation: 'horizontal' | 'vertical'): boolean {
  const fieldSize = field.length;
  if (orientation === 'horizontal' && col + deck > fieldSize) return false;
  if (orientation === 'vertical' && row + deck > fieldSize) return false;

  for (let i = 0; i < deck; i++) {
    const newRow = orientation === 'vertical' ? row + i : row;
    const newCol = orientation === 'horizontal' ? col + i : col;

    if (field[newRow][newCol].mode !== 'empty') return false;

    // Перевірка на відстань між кораблями
    for (let r = newRow - 1; r <= newRow + 1; r++) {
      for (let c = newCol - 1; c <= newCol + 1; c++) {
        if (r >= 0 && r < fieldSize && c >= 0 && c < fieldSize && field[r][c].mode !== 'empty') {
          return false;
        }
      }
    }
  }

  return true;
}

function placeShip(field: Field, row: number, col: number, deck: number, orientation: 'horizontal' | 'vertical'): void {
  for (let i = 0; i < deck; i++) {
    const newRow = orientation === 'vertical' ? row + i : row;
    const newCol = orientation === 'horizontal' ? col + i : col;
    field[newRow][newCol].mode = 'occupied';
  }
}

export default generateShips;
