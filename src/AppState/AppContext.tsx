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
    updateCellMode: (i: number, j: number, currentMode: string, field: Field) => void
}>({
    mode: 'null',
    userField: [],
    computerField: [],
    setMode: () => {},
    setUserField: () => {},
    setComputerField: () => {},
    updateCellMode: () => {},
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
        const updatedField: Field = [...field]; 
        updatedField[i] = [...field[i]]; 
        updatedField[i][j] = { ...field[i][j], mode: newMode };
        return updatedField;
    };

    const updateCellMode = (i: number, j: number, currentMode: string, field: Field) => {
        switch (currentMode) {
            case 'empty':
                field[i][j].mode = 'missed';
                break;
            case 'occupied':
                field[i][j].mode = 'hit';
                break;
            default:
                break;
        }
        
        if (field === userField) {
            setUserField([...field]);
        } else if (field === computerField) {
            setComputerField([...field]);
        }
    };

    return (
    <AppContext.Provider value={{
            mode,
            userField,
            computerField,
            setMode,
            setUserField,
            setComputerField,
            updateCellMode,
        }}>
            {children}
        </AppContext.Provider>
    );
}
