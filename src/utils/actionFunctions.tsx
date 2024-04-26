import type { Field, Cell } from '../AppState/AppContext';


export const computerShoot = (userField: Field, prevShot: { i: number, j: number } | null) => {
    let i, j;
    if (prevShot) makeOneMoreShoot();
    do {
        const randomI = Math.floor(Math.random() * 10);
        const randomJ = Math.floor(Math.random() * 10);
        i = randomI;
        j = randomJ;
    } while (userField[i][j].mode === 'missed' || userField[i][j].mode === 'hit');
    
    return { i, j };
};


export const checkOccupiedCells = (field: Field): boolean => {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j].mode === 'occupied') {
                return true;
            }
        }
    }
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

    checkAdjacentCells(i, j);
    return shipCells;
};


export const isShipDestroyed = (i: number, j: number, field: Cell[][], shipCells: { row: number, col: number }[]): boolean => {
    if (shipCells.length === 0) {
        return false;
    }

    const checkAdjacentCells = (row: number, col: number) => {
        if (row < 0 || row >= field.length || col < 0 || col >= field[0].length) {
            return;
        }
        checkAdjacentCells(i, j);

    }
    for (const cell of shipCells) {
        if (field[cell.row][cell.col].mode !== 'hit') {
            return false;
        }
    }
    return true;
}

export const markMissedAdjacentCells = (shipCells: { row: number, col: number }[], field: Cell[][]) => {
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
                field[adjacentRow][adjacentCol].mode !== 'hit'
            ) {
                field[adjacentRow][adjacentCol].mode = 'missed';
            }
        }
    }
};

const makeOneMoreShoot = () => {}



