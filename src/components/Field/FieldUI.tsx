import React from 'react';
import styles from "./field.module.css";
import { Field } from '../../AppState/AppContext';

interface FieldUIProps {
   field: Field;
}

const FieldUI: React.FC<FieldUIProps> = ({ field }) => {
    // Перевірка, чи є поле не пустим
    if (!field || field.length === 0) {
        return null; // Повертаємо null, якщо поле порожнє
    }

    // Відображення ігрового поля на основі даних зі стану контексту
    return (
        <div className={styles.fieldContainer}>
            {field.map((row, i) => (
                <div key={i} className={styles.row}>
                    {row.map((cell, j) => (
                        <div key={`${i}-${j}`} className={`${styles.cell} ${getCellStyle(cell.mode)}`}></div>
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
