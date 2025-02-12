import { AppContext } from '@/context/app-context';
import { DEFAULT_SHIPS_CONFIG, DEFAULT_FIELD_SIZE, sleep } from '@/lib';
import {
  FieldConfig,
  Player,
  Winner,
  Field,
  Cell,
  CellState,
  Orientation,
} from '@/types';
import { FC, PropsWithChildren, useState, useMemo } from 'react';
import {
  initializeEmptyField,
  getShipCells,
  checkIsShipDestroyed,
  markMissedAdjacentCells,
  checkOccupiedCells,
  getAiShot,
  generateShips,
  canPlaceShip,
} from './helpers';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [fieldConfig, setFieldConfig] = useState<FieldConfig>({
    ships: DEFAULT_SHIPS_CONFIG,
    fieldSize: DEFAULT_FIELD_SIZE,
  });

  const initialField = useMemo(
    () => initializeEmptyField(fieldConfig.fieldSize),
    [fieldConfig.fieldSize]
  );

  const [currentPlayer, setCurrentPlayer] = useState<Player>('user');
  const [winner, setWinner] = useState<Winner>(null);
  const [userField, setUserField] = useState<Field>(initialField);
  const [computerField, setComputerField] = useState<Field>(initialField);

  const updateCellMode = (cell: Cell, field: Field) => {
    switch (cell.state) {
      case CellState.empty:
        field[cell.row][cell.col].state = CellState.missed;
        break;
      case CellState.occupied:
        field[cell.row][cell.col].state = CellState.hit;
        break;
      default:
        break;
    }

    if (field === userField) setUserField([...field]);
    else setComputerField([...field]);
  };

  const computerAttack = async (shot: Cell) => {
    await sleep(500);

    updateCellMode(shot, userField);

    const ship = getShipCells(shot, userField);

    const isShipDestroyed = checkIsShipDestroyed(ship);

    if (isShipDestroyed) {
      markMissedAdjacentCells(ship, userField);
    }

    const isSomeUserShipsAlive = checkOccupiedCells(userField);

    if (!isSomeUserShipsAlive) {
      setWinner('computer');
      return;
    }

    if (userField[shot.row][shot.col].state === CellState.hit) {
      const shot = getAiShot(userField);

      await sleep(2000);
      computerAttack(shot);
    } else {
      setCurrentPlayer('user');
    }
  };

  const onComputerFieldClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLButtonElement;
    const rowIndex = parseInt(target.dataset.rowIndex!);
    const columnIndex = parseInt(target.dataset.columnIndex!);

    const cell = computerField[rowIndex][columnIndex];

    updateCellMode(cell, computerField);

    const ship = getShipCells(cell, computerField);

    const isShipDestroyed = checkIsShipDestroyed(ship);
    if (isShipDestroyed) {
      markMissedAdjacentCells(ship, computerField);
    }

    const isSomeComputerShipsAlive = checkOccupiedCells(computerField);

    if (!isSomeComputerShipsAlive) {
      setWinner('user');
      return;
    }

    if (cell.state === CellState.missed) {
      setCurrentPlayer('computer');
      const shot = getAiShot(userField);

      await computerAttack(shot);
    }
  };

  const generateRandomPlayerField = () => {
    const shipPlacement = generateShips(fieldConfig);
    setUserField(shipPlacement);
  };

  const generateRandomComputerField = () => {
    const shipPlacement = generateShips(fieldConfig);
    setComputerField(shipPlacement);
  };

  const changeFieldSize = (size: number) => {
    if (size < 10) return setFieldConfig({ ...fieldConfig, fieldSize: 10 });
    setFieldConfig({ ...fieldConfig, fieldSize: size });
    setUserField(initializeEmptyField(size));
    setComputerField(initializeEmptyField(size));
  };

  const clearUserField = () => {
    const resetField = initializeEmptyField(fieldConfig.fieldSize);
    setUserField(resetField);
  };

  const resetGame = () => {
    const resetField = initializeEmptyField(DEFAULT_FIELD_SIZE);
    setUserField(resetField);
    setComputerField(resetField);
    setWinner(null);
    setCurrentPlayer('user');
    setFieldConfig({ ...fieldConfig, fieldSize: DEFAULT_FIELD_SIZE });
  };

  const placeShip = (
    row: number,
    col: number,
    size: number,
    orientation: Orientation
  ) => {
    if (!canPlaceShip(userField, row, col, size, orientation)) return;

    const newField = [...userField];
    for (let i = 0; i < size; i++) {
      const newRow = orientation === Orientation.vertical ? row + i : row;
      const newCol = orientation === Orientation.horizontal ? col + i : col;
      newField[newRow][newCol].state = CellState.occupied;
    }

    setUserField(newField);
  };

  const deleteShip = (row: number, col: number) => {
    const newField = [...userField];
    const ship = getShipCells(newField[row][col], newField);
    ship.forEach(cell => {
      newField[cell.row][cell.col].state = CellState.empty;
    });
    setUserField(newField);
  };

  return (
    <AppContext.Provider
      value={{
        currentPlayer,
        winner,
        userField,
        computerField,
        fieldConfig,
        changeFieldSize,
        resetGame,
        generateRandomPlayerField,
        generateRandomComputerField,
        clearUserField,
        onComputerFieldClick,
        placeShip,
        deleteShip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
