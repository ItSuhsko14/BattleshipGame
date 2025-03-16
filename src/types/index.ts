export interface Cell {
  row: number;
  col: number;
  state: CellState;
}

export type Field = Cell[][];

export enum Mode {
  null = 'null',
  setting = 'setting',
  play = 'play',
}

export enum CellState {
  empty = 'empty',
  occupied = 'occupied',
  missed = 'missed',
  hit = 'hit',
}

export enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type Player = 'user' | 'computer';

export type Winner = Player | null;

//  where [number, number] is [deck, count]
//  deck is the number of cells in the ship
//  count is the number of ships of this deck
export type ShipsConfig = [number, number][];

export type FieldConfig = { ships: ShipsConfig; fieldSize: number };
