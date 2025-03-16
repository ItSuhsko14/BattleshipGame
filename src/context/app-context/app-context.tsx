import { createContext } from 'react';
import { Field, FieldConfig, Orientation, Player, Winner } from '@/types';

const AppContext = createContext<{
  currentPlayer: Player;
  winner: Winner | null;
  userField: Field;
  computerField: Field;
  resetGame: () => void;
  generateRandomPlayerField: () => void;
  generateRandomComputerField: () => void;
  clearUserField: () => void;
  onComputerFieldClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fieldConfig: FieldConfig;
  changeFieldSize: (size: number) => void;
  placeShip: (
    row: number,
    col: number,
    size: number,
    orientation: Orientation
  ) => void;
  deleteShip: (row: number, col: number) => void;
}>(null!);

export default AppContext;
