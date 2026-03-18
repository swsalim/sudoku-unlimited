import { GameState, Grid } from '@/types';

const STORAGE_KEY = 'sudoku-save';

/** Serializable cell (notes as array for JSON) */
interface SerializableCell {
  value: number | null;
  notes: number[];
  isInitial: boolean;
  hasError: boolean;
}

type SerializableGrid = SerializableCell[][];

/** Full state persisted to localStorage */
export interface SavedGameState {
  gameState: {
    grid: SerializableGrid;
    solution: number[][];
    selectedCell: { row: number; col: number } | null;
    isNotesMode: boolean;
    mistakes: number;
    maxMistakes: number;
    score: number;
    difficulty: string;
    isPaused: boolean;
    history: SerializableGrid[];
  };
  time: number;
  moveHistory: Array<{
    grid: SerializableGrid;
    selectedCell: { row: number; col: number } | null;
    isNotesMode: boolean;
    mistakes: number;
    score: number;
  }>;
}

function gridToSerializable(grid: Grid): SerializableGrid {
  return grid.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      notes: Array.from(cell.notes),
      isInitial: cell.isInitial,
      hasError: cell.hasError,
    })),
  );
}

function serializableToGrid(s: SerializableGrid): Grid {
  return s.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      notes: new Set(cell.notes),
      isInitial: cell.isInitial,
      hasError: cell.hasError,
    })),
  );
}

/** Runtime move history (Grid with Set<number> notes) */
export interface GameMoveForSave {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  isNotesMode: boolean;
  mistakes: number;
  score: number;
}

export function saveGame(state: {
  gameState: GameState;
  time: number;
  moveHistory: GameMoveForSave[];
}): void {
  if (typeof window === 'undefined') return;

  const saved: SavedGameState = {
    gameState: {
      ...state.gameState,
      grid: gridToSerializable(state.gameState.grid),
      history: state.gameState.history.map(gridToSerializable),
    },
    time: state.time,
    moveHistory: state.moveHistory.map((m) => ({
      ...m,
      grid: gridToSerializable(m.grid),
    })),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export function loadGame(): SavedGameState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedGameState;
    if (!parsed?.gameState?.grid) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function clearSavedGame(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function hasSavedGame(): boolean {
  return loadGame() !== null;
}

/** Convert loaded save into runtime GameState and move history */
export function hydrateSave(saved: SavedGameState): {
  gameState: GameState;
  time: number;
  moveHistory: Array<{
    grid: Grid;
    selectedCell: { row: number; col: number } | null;
    isNotesMode: boolean;
    mistakes: number;
    score: number;
    combo: number;
  }>;
} {
  const { gameState: s, time, moveHistory } = saved;
  return {
    gameState: {
      grid: serializableToGrid(s.grid),
      solution: s.solution,
      selectedCell: s.selectedCell,
      isNotesMode: s.isNotesMode,
      mistakes: s.mistakes,
      maxMistakes: s.maxMistakes,
      score: s.score,
      difficulty: s.difficulty,
      isPaused: s.isPaused,
      history: s.history.map(serializableToGrid),
    },
    time,
    moveHistory: moveHistory.map((m) => ({
      ...m,
      grid: serializableToGrid(m.grid),
      combo: (m as { combo?: number }).combo ?? 0,
    })),
  };
}
