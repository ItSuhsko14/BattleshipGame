import type { Field } from '../AppState/AppContext';

export const computerShoot = (userField: Field) => {
    setTimeout(() => {
        console.log('Хід комп\'ютера!');
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