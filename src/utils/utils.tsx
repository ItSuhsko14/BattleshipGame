type CellState = 'empty' | 'ship' | 'hit' | 'miss';

interface Cell {
  state: CellState;
}

export interface Ship {
  length: number;
  position: [number, number]; // Координати початку корабля
  orientation: 'horizontal' | 'vertical';
}

export type Board = Cell[][];

interface UserData {
    board: Board; // Дані поля користувача
    ships: Ship[]; // Дані про кораблі
}

export interface GameData {
    boardSize: number;
    userData: UserData; // Додайте дані поля користувача до об'єкту даних гри
}

export function generateEmptyBoard(boardSize: number): Board {
    const board: Board = [];
    for (let i = 0; i < boardSize; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < boardSize; j++) {
        row.push({ state: 'empty' });
      }
      board.push(row);
    }
    return board;
  }
  
  function getRandomOrientation(): 'horizontal' | 'vertical' {
    return Math.random() < 0.5 ? 'horizontal' : 'vertical';
  }
  
  function placeShip(board: Board, ship: Ship): void {
    const [row, col] = ship.position;
    const { length, orientation } = ship;
  
    for (let i = 0; i < length; i++) {
      const newRow = orientation === 'vertical' ? row + i : row;
      const newCol = orientation === 'horizontal' ? col + i : col;
      board[newRow][newCol].state = 'ship';
    }
  }
  
  export function generateShips(boardSize: number, shipLengths: number[]): Ship[] {
    const ships: Ship[] = [];
    for (const length of shipLengths) {
      const orientation = getRandomOrientation();
      const position: [number, number] = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
      ships.push({ length, position, orientation });
    }
    return ships;
  }
  
  export function generateGameData(boardSize: number, shipLengths: number[]): GameData {
    const userData: UserData = {
        board: generateEmptyBoard(boardSize), // Генеруємо порожнє поле користувача
        ships: generateShips(boardSize, shipLengths), // Генеруємо кораблі
    };

    return {
        boardSize,
        userData,
    };
}
  

  