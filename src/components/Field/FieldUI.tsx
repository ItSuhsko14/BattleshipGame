import React from 'react';
import styles from "./field.module.css";
import { Field } from '../../AppState/AppContext';

interface FieldUIProps {
    field: Field;
    onCellClick: (i: number, j: number) => void;
}

const FieldUI: React.FC<FieldUIProps> = ({ field, onCellClick }) => {
    // Перевірка, чи є поле не пустим
    if (!field || field.length === 0) {
        return null; // Повертаємо null, якщо поле порожнє
    }

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const i = parseInt(event.currentTarget.dataset.i!);
        const j = parseInt(event.currentTarget.dataset.j!);
        onCellClick(i, j);
    };

    // Відображення ігрового поля на основі даних зі стану контексту
    return (
        <div className={styles.fieldContainer}>
            {field.map((row, i) => (
                <div key={i} className={styles.row}>
                    {row.map((cell, j) => (
                        <div key={`${i}-${j}`}
                            className={`${styles.cell} 
                            ${getCellStyle(cell.mode)}`}
                            onClick={(e) => handleCellClick(e)}
                        >
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// Функція для визначення стилів клітинки в залежності від її режиму
const getCellStyle = (mode: string): string => {
    switch (mode) {
        case 'occupied':
            return styles.occupied;
        case 'missed':
            return styles.missed;
        case 'hit':
            return styles.hit;
        default:
            return styles.empty;
    }
};

export default FieldUI;
