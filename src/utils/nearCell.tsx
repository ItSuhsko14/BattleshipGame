import type { Field } from '../AppState/AppContext';
const nearCell = (userField: Field, prevShot: { i: number, j: number } | null) => {

    if (prevShot) {
        const offsets = [
            { row: -1, col: 0 }, // вище
            { row: 1, col: 0 },  // нижче
            { row: 0, col: -1 }, // ліворуч
            { row: 0, col: 1 },  // праворуч
        ];

        // Масив для зберігання доступних для вибору сусідніх клітинок
        const availableNeighbors: { i: number, j: number }[] = [];

        for (const offset of offsets) {
            const adjacentRow = prevShot.i + offset.row;
            const adjacentCol = prevShot.j + offset.col;

            // Перевірка, чи координати сусідньої клітинки в межах поля
            if (
                adjacentRow >= 0 && adjacentRow < userField.length &&
                adjacentCol >= 0 && adjacentCol < userField[0].length
            ) {
                const neighborCell = userField[adjacentRow][adjacentCol];

                // Перевірка, чи сусідня клітинка ще не потрапила
                if (neighborCell.mode !== 'missed' && neighborCell.mode !== 'hit') {
                    console.log(availableNeighbors);
                    availableNeighbors.push({ i: adjacentRow, j: adjacentCol });
                }
            }
        }

        console.log(availableNeighbors);
        if (availableNeighbors.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableNeighbors.length);
            console.log(randomIndex);
            console.log(prevShot);
            return availableNeighbors[randomIndex];
        }
    }
}