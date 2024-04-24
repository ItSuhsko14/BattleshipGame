import type { Field, Cell } from '../AppState/AppContext';

export const computerShoot = (userField: Field) => {
    setTimeout(() => {
        
    }, 2000 )
    let i, j;
    do {
        const randomI = Math.floor(Math.random() * 10);
        const randomJ = Math.floor(Math.random() * 10);
        i = randomI;
        j = randomJ;
    } while (userField[i][j].mode === 'missed' && 'hit');
    
    return { i, j };
};

export const checkOccupiedCells = (field: Field): boolean => {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j].mode === 'occupied') {
                console.log('Ще є не підбиті кораблі!');
                return true;
            }
        }
    }
    console.log('Всі кораблі підбиті!');
    return false;
};
export const getShipCells = (i: number, j: number, field: Cell[][]): { row: number, col: number }[] => {
    const shipCells: { row: number, col: number }[] = [];
    const checked: boolean[][] = new Array(field.length).fill(0).map(() => new Array(field[0].length).fill(false));

    const checkAdjacentCells = (row: number, col: number) => {
        if (row < 0 || row >= field.length || col < 0 || col >= field[0].length || checked[row][col]) {
            return;
        }

        checked[row][col] = true;

        if (field[row][col].mode === 'occupied' || field[row][col].mode === 'hit') {
            shipCells.push({ row, col });
            const adjacentOffsets = [
                { row: -1, col: 0 }, // вище
                { row: 1, col: 0 },  // нижче
                { row: 0, col: -1 }, // ліворуч
                { row: 0, col: 1 },  // праворуч
            ];
            for (const offset of adjacentOffsets) {
                const adjacentRow = row + offset.row;
                const adjacentCol = col + offset.col;
                checkAdjacentCells(adjacentRow, adjacentCol);
            }
        }
    };

    return shipCells;
};

export const isShipDestroyed = (i: number, j: number, field: Cell[][], shipCells: { row: number, col: number }[]): boolean => {
    const checkAdjacentCells = (row: number, col: number) => {
        if (row < 0 || row >= field.length || col < 0 || col >= field[0].length ) {
            return;
        }
    checkAdjacentCells(i, j);
    for (const cell of shipCells) {
        if (field[cell.row][cell.col].mode !== 'hit') {
            return false; 
        }
    }
    }
    return true; 
}
    


const markMissedAdjacentCells = (i: number, j: number, field: Cell[][]) => {
    const adjacentOffsets = [
        { row: -1, col: 0 }, // вище
        { row: 1, col: 0 },  // нижче
        { row: 0, col: -1 }, // ліворуч
        { row: 0, col: 1 },  // праворуч
    ];

    for (const offset of adjacentOffsets) {
        const adjacentRow = i + offset.row;
        const adjacentCol = j + offset.col;

        
        if (
            adjacentRow >= 0 &&
            adjacentRow < field.length &&
            adjacentCol >= 0 &&
            adjacentCol < field[0].length
        ) {
        
            if (field[adjacentRow][adjacentCol].mode === 'empty') {
                field[adjacentRow][adjacentCol].mode = 'missed';
            }
            // Якщо знайдена поручна клітина має режим 'hit', рекурсивно викликаємо цю функцію для неї
            else if (field[adjacentRow][adjacentCol].mode === 'hit') {
                markMissedAdjacentCells(adjacentRow, adjacentCol, field);
            }
        }
    }
};

export const makeShipDestroy = (i: number, j: number, field: Cell[][]): void => {
    console.log('makeShipDestroy');
    
    markMissedAdjacentCells(i, j, field);
};

