import React from 'react';
import styles from "./field.module.css";
import { Field } from '../../AppState/AppContext';
import type { Cell } from '../../AppState/AppContext';

interface FieldUIProps {
    field: Field;
    onCellClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    isHidden: boolean;
}
    

const FieldUI: React.FC<FieldUIProps> = ({ field, onCellClick, isHidden }) => {
    if (!field || field.length === 0) {
        return null; 
    }

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onCellClick(event);
    };

    const getCellClass = (cell: Cell): string => {
        if (isHidden && cell.mode === 'occupied') {
            return styles.empty;
        }
        return getCellStyle(cell.mode);
    };

    return (
        <div className={styles.fieldContainer}>
            {field.map((row, i) => (
                <div key={i} className={styles.row}>
                    {row.map((cell, j) => (
                        <div key={`${i}-${j}`}
                            className={`${styles.cell} ${getCellClass(cell)}`}
                            data-i={i}
                            data-j={j} 
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
