import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface Cell {
    i: number; 
    j: number;
    mode: 'empty' | 'occupied' | 'missed' | 'hit';
}

export type Field = Cell[][];

const AppContext = createContext<{
    mode: 'null' | 'setting' | 'play';
    userField: Field; 
    computerField: Field; 
    setMode: Dispatch<SetStateAction<'null' | 'setting' | 'play'>>;
    setUserField: Dispatch<SetStateAction<Field>>;
    setComputerField: Dispatch<SetStateAction<Field>>;
}>({
    mode: 'null',
    userField: [],
    computerField: [],
    setMode: () => {},
    setUserField: () => {},
    setComputerField: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'null' | 'setting' | 'play'>('null');
    const [userField, setUserField] = useState<Field>(initializeEmptyField());
    const [computerField, setComputerField] = useState<Field>(initializeEmptyField());

    function initializeEmptyField(): Field {
        const field: Field = [];
        for (let i = 0; i < 10; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 10; j++) {
                row.push({ i, j, mode: 'empty' });
            }
            field.push(row);
        }
        return field;
    }

    const updateFieldState = (i: number, j: number, newMode: Cell['mode'], field: Field): Field => {
        const updatedField: Field = [...field]; // Копіюємо посилання на зовнішній масив
        updatedField[i] = [...field[i]]; // Копіюємо рядок, щоб зробити його мутабельним
        updatedField[i][j] = { ...field[i][j], mode: newMode }; // Змінюємо стан ячейки за заданими координатами
        return updatedField;
    };

    return (
    <AppContext.Provider value={{
            mode,
            userField,
            computerField,
            setMode,
            setUserField,
            setComputerField,
        }}>
            {children}
        </AppContext.Provider>
    );
}
