export type CellValue = number | null;
export type Notes = Set<number>;

export interface Cell {
  value: CellValue;
  notes: Notes;
  isInitial: boolean;
  hasError: boolean;
}

export type Grid = Cell[][];

export interface GameState {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  isNotesMode: boolean;
  mistakes: number;
  maxMistakes: number;
  score: number;
  difficulty: string;
  isPaused: boolean;
  history: Grid[];
}

// export type Difficulty =
//   | 'Easy'
//   | 'Medium'
//   | 'Hard'
//   | 'Expert'
//   | 'Master'
//   | 'Extreme';

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXPERT = 'Expert',
  MASTER = 'Master',
  EXTREME = 'Extreme',
}
