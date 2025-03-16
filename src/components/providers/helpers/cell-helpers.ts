import { Field, CellState, Cell } from '@/types';

export const checkOccupiedCells = (field: Field): boolean => {
  return field.some(row => row.some(cell => cell.state === CellState.occupied));
};

export const checkIsShipDestroyed = (shipCells: Cell[]): boolean => {
  if (shipCells.length === 0) {
    return false;
  }

  return shipCells.every(cell => cell.state === CellState.hit);
};
