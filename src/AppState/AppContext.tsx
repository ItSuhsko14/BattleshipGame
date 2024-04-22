import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { Board, Ship } from "../utils/utils";

interface AppContextProps {
    mode: 'null' | 'setting' | 'play';
    userField: UserData;
    computerField: string[][];
    setMode: (mode: 'null' | 'setting' | 'play') => void;
    setComputerField: Dispatch<SetStateAction<string[][]>>;
    setUserField: Dispatch<SetStateAction<UserData>>;
}

interface UserData {
    board: Board; // Дані поля користувача
    ships: Ship[]; // Дані про кораблі
}
export interface GameData {
  boardSize: number;
  userData: UserData; // Додайте дані поля користувача до об'єкту даних гри
}

const AppContext = createContext<AppContextProps>({
    mode: 'setting',
    userField: { board: [], ships: [] },
    computerField: [],
    setMode: () => {},
    setComputerField: () => {},
    setUserField: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'null' | 'setting' | 'play'>('setting');
    const [userField, setUserField] = useState<UserData>({ board: [], ships: [] });
    const [computerField, setComputerField] = useState<string[][]>([]);

    const value: AppContextProps = {
        mode,
        userField,
        computerField,
        setMode,
        setComputerField,
        setUserField,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
