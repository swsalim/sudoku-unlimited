'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

import { Difficulty, GameState, GameVariant, Grid } from '@/types';

import { recordGameAndCheckAchievements } from '@/lib/achievements/utils';
import {
  clearSavedGame,
  hydrateSave,
  loadGame,
  type SavedGameState,
  saveGame,
} from '@/lib/storage/game-storage';
import {
  consumeHint,
  getAvailableHints,
  getHintRefreshMessage,
  grantEarnedHints,
} from '@/lib/storage/hint-storage';
import { getZenMode, setZenMode } from '@/lib/storage/zen-storage';
import { deepCopy } from '@/lib/utils';

import { generateKillerGrid } from '@/utils/killer-sudoku';
import {
  generateGrid,
  generateSeededGrid,
  getPossibleValuesForVariant,
  isValidMove,
} from '@/utils/sudoku';

import { AchievementToast } from '@/components/achievement-toast';
import { AchievementsDialog } from '@/components/achievements-dialog';
import { Cell } from '@/components/cell';
import { ComboToast } from '@/components/combo-toast';
import { Controls } from '@/components/controls';
import { GameHeader } from '@/components/game-header';
import { StatisticsDialog } from '@/components/statistics-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ZenModeToast } from '@/components/zen-mode-toast';

import SudokuGameSkeleton from './sudoku-game-skeleton';
import { ThemeToast } from './theme-toast';
import { ThemesDialog } from './themes-dialog';

const BASE_SCORE_PER_CORRECT = 10;
const PERFECT_PUZZLE_BONUS = 50;
const TIME_BONUS_THRESHOLD_SEC = 300; // 5 minutes
const TIME_BONUS_POINTS = 100;
const hasUnlimitedHints = false; // Future: premium hook

interface GameMove {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  isNotesMode: boolean;
  mistakes: number;
  score: number;
  combo: number;
}

interface SudokuGameProps {
  initialDifficulty: Difficulty;
  variant?: GameVariant;
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function SudokuGame({ initialDifficulty, variant = GameVariant.CLASSIC }: SudokuGameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [time, setTime] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [moveHistory, setMoveHistory] = useState<GameMove[]>([]);
  const [savedGameOffer, setSavedGameOffer] = useState<SavedGameState | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [usedNotes, setUsedNotes] = useState(false);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<string[]>([]);
  const [newlyUnlockedThemes, setNewlyUnlockedThemes] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [showZenToast, setShowZenToast] = useState(false);
  const [isDailyMode, setIsDailyMode] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showComboToast, setShowComboToast] = useState(false);
  const [comboToShow, setComboToShow] = useState(0);
  const [hintsAvailable, setHintsAvailable] = useState(() =>
    typeof window !== 'undefined' ? getAvailableHints(hasUnlimitedHints) : 3,
  );
  const [hintRefreshMessage, setHintRefreshMessage] = useState(() =>
    typeof window !== 'undefined' ? getHintRefreshMessage() : '',
  );
  const isInitialLoad = useRef(true);

  const handleZenToastDismiss = useCallback(() => setShowZenToast(false), []);
  const handleComboToastDismiss = useCallback(() => setShowComboToast(false), []);

  // Sync hint availability (for Controls display)
  useEffect(() => {
    setHintsAvailable(getAvailableHints(hasUnlimitedHints));
    setHintRefreshMessage(getHintRefreshMessage());
    const t = setInterval(() => setHintRefreshMessage(getHintRefreshMessage()), 60_000);
    return () => clearInterval(t);
  }, [gameState, hintsUsed]); // Re-check when hintsUsed changes

  // Load zen mode preference on mount
  useEffect(() => {
    setIsZenMode(getZenMode());
  }, []);

  const handleShareResult = useCallback(() => {
    if (typeof window === 'undefined' || !gameState) return;
    const url = new URL(window.location.href);
    url.searchParams.set('difficulty', gameState.difficulty.toLowerCase());
    if (gameState.variant === GameVariant.KILLER) {
      url.searchParams.set('variant', 'killer');
    }
    url.searchParams.set('time', String(time));
    url.searchParams.set('score', String(gameState.score));
    url.searchParams.set('mistakes', String(gameState.mistakes));
    if (isDailyMode) {
      url.searchParams.set('daily', '1');
    }
    const variantLabel = gameState.variant === GameVariant.KILLER ? 'killer sudoku' : 'sudoku';
    const text = `I just solved a ${gameState.difficulty.toLowerCase()} ${variantLabel} on sudoku.unlimited in ${formatTime(time)} with score ${
      gameState.score
    }. Try the same run:\n${url.toString()}`;
    navigator.clipboard?.writeText(text).catch(() => {
      // ignore clipboard errors
    });
  }, [gameState, time, isDailyMode]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      const saved = loadGame();
      if (saved) {
        setSavedGameOffer(saved);
      } else {
        startNewGame(initialDifficulty);
        setSavedGameOffer(null);
      }
    } else {
      // User switched difficulty - start fresh
      clearSavedGame();
      setSavedGameOffer(null);
      startNewGame(initialDifficulty);
    }
    // We intentionally omit startNewGame from deps to avoid recreating
    // puzzles unnecessarily; this effect should only react to difficulty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDifficulty]);

  // Auto-save when game state changes (only for in-progress games)
  useEffect(() => {
    if (!gameState || !moveHistory.length || showGameOver || showVictory || savedGameOffer) {
      return;
    }
    saveGame({
      gameState,
      time,
      moveHistory,
    });
  }, [gameState, time, moveHistory, showGameOver, showVictory, savedGameOffer]);

  // Clear save when game ends (victory or game over)
  useEffect(() => {
    if (showGameOver || showVictory) {
      clearSavedGame();
    }
  }, [showGameOver, showVictory]);

  useEffect(() => {
    if (!gameState) return;

    let interval: NodeJS.Timeout;
    if (!gameState.isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    // Zen mode: no game over from mistakes
    if (gameState && !isZenMode && gameState.mistakes >= gameState.maxMistakes) {
      setShowGameOver(true);
    }
  }, [gameState, isZenMode]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState || gameState.isPaused) return;
    setGameState((prev) => (prev ? { ...prev, selectedCell: { row, col } } : null));
  };

  const saveToHistory = useCallback(
    (state: GameMove) => {
      // console.log(deepCopy(state));
      setMoveHistory((prev) => [...prev, deepCopy(state)]);
    },
    [setMoveHistory],
  );

  const handleNumberInput = useCallback(
    (number: number) => {
      if (!gameState || !gameState.selectedCell || gameState.isPaused) return;

      const { row, col } = gameState.selectedCell;
      const newGrid = deepCopy(gameState.grid);
      const cell = newGrid[row][col];

      if (cell.isInitial) return;

      const oldState: GameMove = {
        grid: deepCopy(gameState.grid),
        selectedCell: { ...gameState.selectedCell },
        isNotesMode: gameState.isNotesMode,
        mistakes: gameState.mistakes,
        score: gameState.score,
        combo,
      };

      if (gameState.isNotesMode) {
        setUsedNotes(true);
        const newNotes = new Set(cell.notes);
        if (newNotes.has(number)) {
          newNotes.delete(number);
        } else {
          newNotes.add(number);
        }
        cell.notes = newNotes;

        setGameState((prev) =>
          prev
            ? {
                ...prev,
                grid: newGrid,
              }
            : null,
        );
      } else {
        // Convert the current grid state to numbers for validation
        const gridNumbers = gameState.grid.map((row) =>
          row.map((cell) => (cell.value === null ? 0 : cell.value)),
        );
        // Check if the move is valid
        const isValid = isValidMove(gridNumbers, row, col, number, gameState.solution, {
          variant: gameState.variant,
          cages: gameState.killerCages,
        });

        cell.value = number;
        cell.notes = new Set();
        cell.hasError = !isValid;

        if (!isValid) {
          setCombo(0);
          setGameState((prev) =>
            prev
              ? {
                  ...prev,
                  grid: newGrid,
                  mistakes: prev.mistakes + 1,
                  score: Math.max(0, prev.score - 10),
                }
              : null,
          );

          if (gameState.mistakes + 1 >= gameState.maxMistakes) {
            setShowGameOver(true);
          }
        } else {
          const newCombo = combo + 1;
          const points = BASE_SCORE_PER_CORRECT * newCombo;
          setCombo(newCombo);
          if (newCombo >= 2) {
            setComboToShow(newCombo);
            setShowComboToast(true);
          }
          setGameState((prev) =>
            prev
              ? {
                  ...prev,
                  grid: newGrid,
                  score: prev.score + points,
                }
              : null,
          );
        }
      }

      saveToHistory(oldState);
    },
    [gameState, saveToHistory, combo],
  );

  const handleUndo = () => {
    if (moveHistory.length <= 1) return; // Cannot undo initial state

    const newHistory = [...moveHistory];
    const previousState = newHistory[newHistory.length - 1];

    setCombo(previousState.combo ?? 0);
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            grid: deepCopy(previousState.grid),
            selectedCell: previousState.selectedCell ? { ...previousState.selectedCell } : null,
            isNotesMode: previousState.isNotesMode,
          }
        : null,
    );

    newHistory.pop();
    setMoveHistory(newHistory);
  };

  const handleErase = useCallback(() => {
    if (!gameState || gameState.isPaused || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;

    const oldState: GameMove = {
      grid: deepCopy(gameState.grid),
      selectedCell: { ...gameState.selectedCell },
      isNotesMode: gameState.isNotesMode,
      mistakes: gameState.mistakes,
      score: gameState.score,
      combo,
    };

    const newGrid = deepCopy(gameState.grid);
    newGrid[row][col].value = null;
    newGrid[row][col].notes = new Set();
    newGrid[row][col].hasError = false;

    setGameState((prev) => (prev ? { ...prev, grid: newGrid } : null));
    saveToHistory(oldState);
  }, [gameState, saveToHistory, combo]);

  const handleHint = () => {
    if (!gameState || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;
    const cell = gameState.grid[row][col];

    if (cell.isInitial || cell.value) return;
    if (!consumeHint(hasUnlimitedHints)) {
      // No hints left - could show toast; for now just return
      return;
    }

    setHintsUsed((prev) => prev + 1);
    setHintsAvailable(getAvailableHints(hasUnlimitedHints));

    const oldState: GameMove = {
      grid: deepCopy(gameState.grid),
      selectedCell: { ...gameState.selectedCell },
      isNotesMode: gameState.isNotesMode,
      mistakes: gameState.mistakes,
      score: gameState.score,
      combo,
    };

    const gridNumbers = gameState.grid.map((r) => r.map((c) => c.value || 0));
    const possibleValues = getPossibleValuesForVariant(gridNumbers, row, col, {
      variant: gameState.variant,
      cages: gameState.killerCages,
    });

    // console.log(`possibleValues`, possibleValues);

    if (possibleValues.length === 0) return;

    const newGrid = deepCopy(gameState.grid);
    newGrid[row][col] = {
      ...cell,
      notes: new Set(possibleValues),
    };

    const newScore = Math.max(0, gameState.score - 5); // Small penalty for using hint

    setGameState((prev) =>
      prev
        ? {
            ...prev,
            grid: newGrid,
            score: newScore,
          }
        : null,
    );

    saveToHistory({
      ...oldState,
      grid: newGrid,
      score: newScore,
    } as GameMove);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState || gameState.isPaused || !gameState.selectedCell) return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(Number.parseInt(e.key));
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handleErase();
      } else if (e.key.toLowerCase() === 'n') {
        setGameState((prev) => (prev ? { ...prev, isNotesMode: !prev.isNotesMode } : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleErase, handleNumberInput]);

  const getDailySeed = (difficulty: Difficulty) => {
    const today = new Date();
    const yyyyMmDd = today.toISOString().slice(0, 10); // e.g. 2026-03-18
    return `${yyyyMmDd}-${difficulty}`;
  };

  const startNewGame = (difficulty: Difficulty, options?: { dailyMode?: boolean }) => {
    clearSavedGame();
    setSavedGameOffer(null);

    const useDaily = options?.dailyMode ?? isDailyMode;
    const generated =
      variant === GameVariant.KILLER
        ? generateKillerGrid(difficulty)
        : useDaily
          ? generateSeededGrid(difficulty, getDailySeed(difficulty))
          : generateGrid(difficulty);
    let { grid } = generated;
    const { solution } = generated;

    // Dev helper: on /dev-demo, start with a nearly complete board (2 empty cells)
    if (typeof window !== 'undefined' && window.location.pathname === '/dev-demo') {
      const solvedGrid: Grid = solution.map((row) =>
        row.map((value) => ({
          value,
          notes: new Set<number>(),
          isInitial: true,
          hasError: false,
        })),
      );

      const empties = [
        { row: 4, col: 4 },
        { row: 7, col: 7 },
      ];

      for (const { row, col } of empties) {
        solvedGrid[row][col] = {
          value: null,
          notes: new Set<number>(),
          isInitial: false,
          hasError: false,
        };
      }

      grid = solvedGrid;
    }

    const maxMistakesAllowed = isZenMode ? 999 : 3;
    const initialState: GameState = {
      grid,
      solution,
      difficulty,
      variant,
      killerCages:
        variant === GameVariant.KILLER
          ? (generated as ReturnType<typeof generateKillerGrid>).cages
          : undefined,
      selectedCell: null,
      isPaused: false,
      isNotesMode: false,
      mistakes: 0,
      maxMistakes: maxMistakesAllowed,
      score: 0,
      history: [],
    };

    setGameState(initialState);
    setMoveHistory([
      {
        grid,
        selectedCell: null,
        isNotesMode: false,
        mistakes: 0,
        score: 0,
        combo: 0,
      },
    ]);
    setTime(0);
    setShowGameOver(false);
    setShowVictory(false);
    setHintsUsed(0);
    setUsedNotes(false);
    setNewlyUnlockedAchievements([]);
    setCombo(0);
    setHintsAvailable(getAvailableHints(hasUnlimitedHints));
  };

  const resetGame = () => {
    if (!gameState) return;

    const resetGrid: Grid = gameState.grid.map((row) =>
      row.map((cell) =>
        cell.isInitial
          ? { ...cell, notes: new Set(), hasError: false }
          : { value: null, notes: new Set(), isInitial: false, hasError: false },
      ),
    );

    const initialState: GameState = {
      ...gameState,
      grid: resetGrid,
      selectedCell: null,
      isPaused: false,
      isNotesMode: false,
      mistakes: 0,
      score: 0,
    };

    setGameState(initialState);
    setMoveHistory([
      {
        grid: deepCopy(resetGrid),
        selectedCell: null,
        isNotesMode: false,
        mistakes: 0,
        score: 0,
        combo: 0,
      },
    ]);
    setTime(0);
    setShowGameOver(false);
    setShowVictory(false);
    setHintsUsed(0);
    setUsedNotes(false);
    setCombo(0);
    setHintsAvailable(getAvailableHints(hasUnlimitedHints));
  };

  const isHighlighted = (row: number, col: number) => {
    if (!gameState || !gameState.selectedCell) return false;
    const { row: selectedRow, col: selectedCol } = gameState.selectedCell;
    return row === selectedRow || col === selectedCol || isInSameBox(row, col);
  };

  const isSameNumber = (row: number, col: number) => {
    if (!gameState || !gameState.selectedCell) return false;
    const { row: selectedRow, col: selectedCol } = gameState.selectedCell;
    const selectedValue = gameState.grid[selectedRow][selectedCol].value;
    return selectedValue !== null && selectedValue === gameState.grid[row][col].value;
  };

  const isInSameBox = (row: number, col: number) => {
    if (!gameState || !gameState.selectedCell) return false;
    const { row: selectedRow, col: selectedCol } = gameState.selectedCell;
    const boxRow = Math.floor(row / 3);
    const boxCol = Math.floor(col / 3);
    const selectedBoxRow = Math.floor(selectedRow / 3);
    const selectedBoxCol = Math.floor(selectedCol / 3);
    return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
  };

  const getCageAt = (row: number, col: number) => {
    return gameState?.killerCages?.find((cage) =>
      cage.cells.some((cell) => cell.row === row && cell.col === col),
    );
  };

  const isCageStartCell = (
    cage: NonNullable<GameState['killerCages']>[number],
    row: number,
    col: number,
  ) => {
    const firstCell = [...cage.cells].sort((a, b) => a.row * 9 + a.col - (b.row * 9 + b.col))[0];
    return firstCell.row === row && firstCell.col === col;
  };

  const checkGameCompletion = useCallback(() => {
    if (!gameState || showVictory) return;

    // Check if all cells are filled and valid
    const isComplete = gameState.grid.every((row) =>
      row.every((cell) => cell.value !== null && !cell.hasError),
    );

    if (isComplete) {
      let finalScore = gameState.score;
      const isPerfect = gameState.mistakes === 0;
      const isFast = time <= TIME_BONUS_THRESHOLD_SEC;

      if (isPerfect) finalScore += PERFECT_PUZZLE_BONUS;
      if (isFast) finalScore += TIME_BONUS_POINTS;

      grantEarnedHints(1);

      setShowVictory(true);
      setGameState((prev) => (prev ? { ...prev, isPaused: true, score: finalScore } : null));
    }
  }, [gameState, showVictory, time]);

  useEffect(() => {
    checkGameCompletion();
  }, [gameState?.grid, checkGameCompletion, showVictory]);

  // Record game and check achievements on victory
  useEffect(() => {
    if (!showVictory || !gameState) return;
    const unlocks = recordGameAndCheckAchievements({
      difficulty: gameState.difficulty,
      timeSeconds: time,
      mistakes: gameState.mistakes,
      hintsUsed,
      usedNotes,
    });
    if (unlocks.achievementIds.length > 0) {
      setNewlyUnlockedAchievements(unlocks.achievementIds);
    }
    if (unlocks.themeIds.length > 0) {
      setNewlyUnlockedThemes(unlocks.themeIds);
    }
  }, [showVictory, gameState, time, hintsUsed, usedNotes]);

  if (!gameState) {
    return (
      <>
        <div className="relative z-10">
          <SudokuGameSkeleton />
          <AlertDialog open={!!savedGameOffer}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Resume saved game?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have an in-progress {savedGameOffer?.gameState.difficulty} puzzle
                  {savedGameOffer ? ` (${formatTime(savedGameOffer.time)})` : ''}. Resume or start a
                  new game?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => {
                    if (!savedGameOffer) return;
                    const { gameState: gs, time: t, moveHistory: mh } = hydrateSave(savedGameOffer);
                    setGameState(gs);
                    setTime(t);
                    setMoveHistory(mh);
                    setSavedGameOffer(null);
                  }}>
                  Resume
                </AlertDialogAction>
                <AlertDialogAction
                  onClick={() => {
                    clearSavedGame();
                    setSavedGameOffer(null);
                    startNewGame(initialDifficulty);
                  }}>
                  Start New
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative z-10">
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 300}
            height={typeof window !== 'undefined' ? window.innerHeight : 300}
            numberOfPieces={showVictory ? 300 : 0}
            recycle={!showVictory}
          />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="relative rounded-2xl border border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] p-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] sm:p-6">
            <GameHeader
              difficulty={gameState.difficulty.toLowerCase()}
              mistakes={gameState.mistakes}
              maxMistakes={gameState.maxMistakes}
              score={gameState.score}
              time={formatTime(time)}
              isPaused={gameState.isPaused}
              isZenMode={isZenMode}
              isDailyMode={isDailyMode}
              onPauseToggle={() =>
                setGameState((prev) => (prev ? { ...prev, isPaused: !prev.isPaused } : null))
              }
              routeBase={variant === GameVariant.KILLER ? '/killer-sudoku' : ''}
              onOpenAchievements={() => setShowAchievements(true)}
              onOpenStats={() => setShowStats(true)}
              onOpenThemes={() => setShowThemes(true)}
              onDailyToggle={
                variant === GameVariant.KILLER
                  ? undefined
                  : () => {
                      const nextDaily = !isDailyMode;
                      setIsDailyMode(nextDaily);
                      startNewGame(gameState.difficulty as Difficulty, { dailyMode: nextDaily });
                    }
              }
              onZenModeToggle={() => {
                const next = !isZenMode;
                setIsZenMode(next);
                setZenMode(next);
                if (next) {
                  setShowZenToast(true);
                } else {
                  setShowZenToast(false);
                }
                if (gameState) {
                  setGameState((prev) => (prev ? { ...prev, maxMistakes: next ? 999 : 3 } : null));
                }
              }}
            />

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
              <div className="grid w-fit max-w-full shrink-0 grid-cols-9 overflow-hidden rounded-xl border-2 border-[color:var(--sudoku-board-border)] bg-[color:var(--sudoku-board-bg)] font-[var(--sudoku-board-font)] shadow-inner">
                {gameState.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const highlighted = isHighlighted(rowIndex, colIndex);
                    const sameNumber = isSameNumber(rowIndex, colIndex);
                    const cage = getCageAt(rowIndex, colIndex);
                    return (
                      <Cell
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        isSelected={
                          gameState.selectedCell?.row === rowIndex &&
                          gameState.selectedCell?.col === colIndex
                        }
                        isHighlighted={highlighted}
                        isSameNumber={sameNumber}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        tabIndex={0}
                        role="gridcell"
                        aria-selected={
                          gameState.selectedCell?.row === rowIndex &&
                          gameState.selectedCell?.col === colIndex
                        }
                        cageSum={
                          cage && isCageStartCell(cage, rowIndex, colIndex) ? cage.sum : undefined
                        }
                        cageBorders={
                          gameState.variant === GameVariant.KILLER && cage
                            ? {
                                top: !cage.cells.some(
                                  (cageCell) =>
                                    cageCell.row === rowIndex - 1 && cageCell.col === colIndex,
                                ),
                                right: !cage.cells.some(
                                  (cageCell) =>
                                    cageCell.row === rowIndex && cageCell.col === colIndex + 1,
                                ),
                                bottom: !cage.cells.some(
                                  (cageCell) =>
                                    cageCell.row === rowIndex + 1 && cageCell.col === colIndex,
                                ),
                                left: !cage.cells.some(
                                  (cageCell) =>
                                    cageCell.row === rowIndex && cageCell.col === colIndex - 1,
                                ),
                              }
                            : undefined
                        }
                        className={`${colIndex % 3 === 2 && colIndex !== 8 ? (gameState.variant === GameVariant.KILLER ? 'border-r-2 border-r-stone-500 sm:border-r-[3px]' : 'border-r-2 border-r-stone-400 sm:border-r-2') : ''} ${rowIndex % 3 === 2 && rowIndex !== 8 ? (gameState.variant === GameVariant.KILLER ? 'border-b-2 border-b-stone-500 sm:border-b-[3px]' : 'border-b-2 border-b-stone-400 sm:border-b-[3px]') : ''}`}
                      />
                    );
                  }),
                )}
              </div>

              <Controls
                onUndo={handleUndo}
                onErase={handleErase}
                onToggleNotes={() =>
                  setGameState((prev) =>
                    prev ? { ...prev, isNotesMode: !prev.isNotesMode } : null,
                  )
                }
                onHint={handleHint}
                isNotesMode={gameState.isNotesMode}
                onNumberClick={handleNumberInput}
                onNewGame={() => startNewGame(gameState.difficulty as Difficulty)}
                onReset={resetGame}
                hintsAvailable={hintsAvailable}
                hintRefreshMessage={hintRefreshMessage}
              />
            </div>

            {gameState.variant === GameVariant.KILLER && (
              <p className="mt-4 max-w-3xl text-center text-base text-stone-600 dark:text-stone-400 md:text-left">
                Killer mode: each cage must sum to its corner clue, and numbers cannot repeat inside
                the same cage.
              </p>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              You&rsquo;ve reached the maximum number of mistakes. Would you like to start a new
              game?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => startNewGame(gameState.difficulty as Difficulty)}>
              New Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showVictory}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            <AlertDialogDescription>
              You&rsquo;ve completed the puzzle in {formatTime(time)}.
              {gameState.mistakes === 0 && (
                <>
                  {' '}
                  <strong>Perfect puzzle</strong> (+{PERFECT_PUZZLE_BONUS} pts)
                </>
              )}
              {time <= TIME_BONUS_THRESHOLD_SEC && (
                <>
                  {' '}
                  <strong>Speed bonus</strong> (+{TIME_BONUS_POINTS} pts)
                </>
              )}{' '}
              Final score: {gameState.score} points. Would you like to start a new game?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleShareResult}>Copy share link</AlertDialogAction>
            <AlertDialogAction onClick={() => startNewGame(gameState.difficulty as Difficulty)}>
              New Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {newlyUnlockedAchievements.length > 0 && (
        <AchievementToast
          achievementIds={newlyUnlockedAchievements}
          onDismiss={() => setNewlyUnlockedAchievements([])}
        />
      )}

      {newlyUnlockedThemes.length > 0 && (
        <ThemeToast themeIds={newlyUnlockedThemes} onDismiss={() => setNewlyUnlockedThemes([])} />
      )}

      {showZenToast && <ZenModeToast onDismiss={handleZenToastDismiss} />}

      {showComboToast && <ComboToast combo={comboToShow} onDismiss={handleComboToastDismiss} />}

      <AchievementsDialog open={showAchievements} onOpenChange={setShowAchievements} />
      <StatisticsDialog open={showStats} onOpenChange={setShowStats} />
      <ThemesDialog open={showThemes} onOpenChange={setShowThemes} />
    </>
  );
}
