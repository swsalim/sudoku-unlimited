'use client';

import { useEffect, useState } from 'react';

import { Difficulty, GameState, Grid } from '@/types';

import { deepCopy } from '@/utils/helpers';
import { generateGrid, getPossibleValues, isValidMove } from '@/utils/sudoku';

import { Cell } from '@/components/cell';
import { Controls } from '@/components/controls';
import { GameHeader } from '@/components/game-header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface GameMove {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  isNotesMode: boolean;
  mistakes: number;
  score: number;
}

export default function SudokuGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [time, setTime] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [moveHistory, setMoveHistory] = useState<GameMove[]>([]);

  useEffect(() => {
    startNewGame(Difficulty.EASY);
  }, []);

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
    if (gameState && gameState.mistakes >= gameState.maxMistakes) {
      setShowGameOver(true);
    }
  }, [gameState]);

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
  }, [gameState]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState || gameState.isPaused) return;
    setGameState((prev) => (prev ? { ...prev, selectedCell: { row, col } } : null));
  };

  const saveToHistory = (state: GameMove) => {
    // console.log(deepCopy(state));
    setMoveHistory((prev) => [...prev, deepCopy(state)]);
  };

  const handleNumberInput = (number: number) => {
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
    };

    if (gameState.isNotesMode) {
      const newNotes = new Set(cell.notes);
      if (newNotes.has(number)) {
        newNotes.delete(number);
      } else {
        newNotes.add(number);
      }
      cell.notes = newNotes;
    } else {
      // Convert the current grid state to numbers for validation
      const gridNumbers = gameState.grid.map((row) =>
        row.map((cell) => (cell.value === null ? 0 : cell.value)),
      );
      // Check if the move would be valid
      const isValid = isValidMove(gridNumbers, row, col, number);

      cell.value = number;
      cell.notes = new Set();
      cell.hasError = !isValid;

      if (!isValid) {
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
        setGameState((prev) =>
          prev
            ? {
                ...prev,
                grid: newGrid,
                score: prev.score + 10,
              }
            : null,
        );
      }
    }

    saveToHistory(oldState);
    // console.log(moveHistory);
    // console.log(`gameState`, gameState);
  };

  const handleUndo = () => {
    if (moveHistory.length <= 1) return; // Cannot undo initial state

    const newHistory = [...moveHistory];
    const previousState = newHistory[newHistory.length - 1];

    // console.log(`previousState`, previousState);
    // console.log(`newHistory`, newHistory);
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            grid: deepCopy(previousState.grid),
            selectedCell: previousState.selectedCell ? { ...previousState.selectedCell } : null,
            isNotesMode: previousState.isNotesMode,
            // mistakes: previousState.mistakes,
            // score: previousState.score,
          }
        : null,
    );

    newHistory.pop(); // Remove current state
    setMoveHistory(newHistory);
  };

  const handleErase = () => {
    if (!gameState || gameState.isPaused || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;

    const oldState: GameMove = {
      grid: deepCopy(gameState.grid),
      selectedCell: { ...gameState.selectedCell },
      isNotesMode: gameState.isNotesMode,
      mistakes: gameState.mistakes,
      score: gameState.score,
    };

    const newGrid = deepCopy(gameState.grid);
    newGrid[row][col].value = null;
    newGrid[row][col].notes = new Set();
    newGrid[row][col].hasError = false;

    setGameState((prev) => (prev ? { ...prev, grid: newGrid } : null));
    saveToHistory(oldState);
  };

  const handleHint = () => {
    if (!gameState || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;
    const cell = gameState.grid[row][col];

    if (cell.isInitial || cell.value) return;

    const oldState: GameMove = {
      grid: deepCopy(gameState.grid),
      selectedCell: { ...gameState.selectedCell },
      isNotesMode: gameState.isNotesMode,
      mistakes: gameState.mistakes,
      score: gameState.score,
    };

    const gridNumbers = gameState.grid.map((row) => row.map((cell) => cell.value || 0));
    const possibleValues = getPossibleValues(gridNumbers, row, col);

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
    });
  };

  const startNewGame = (difficulty: Difficulty) => {
    const newGrid = generateGrid(difficulty);

    const initialState: GameState = {
      grid: newGrid,
      difficulty,
      selectedCell: null,
      isPaused: false,
      isNotesMode: false,
      mistakes: 0,
      maxMistakes: 3,
      score: 0,
      history: [],
    };

    setGameState(initialState);
    setMoveHistory([
      {
        grid: newGrid,
        selectedCell: null,
        isNotesMode: false,
        mistakes: 0,
        score: 0,
      },
    ]);
    setTime(0);
    setShowGameOver(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <GameHeader
        difficulty={gameState.difficulty}
        mistakes={gameState.mistakes}
        maxMistakes={gameState.maxMistakes}
        score={gameState.score}
        time={formatTime(time)}
        isPaused={gameState.isPaused}
        onPauseToggle={() =>
          setGameState((prev) => (prev ? { ...prev, isPaused: !prev.isPaused } : null))
        }
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
        <div className="grid w-fit grid-cols-9 border-4 border-green-900 bg-green-50/50">
          {gameState.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const highlighted = isHighlighted(rowIndex, colIndex);
              const sameNumber = isSameNumber(rowIndex, colIndex);
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
                  className={`${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-4 border-r-green-900' : ''} ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-4 border-b-green-900' : ''}`}
                />
              );
            }),
          )}
        </div>

        <Controls
          onUndo={handleUndo}
          onErase={handleErase}
          onToggleNotes={() =>
            setGameState((prev) => (prev ? { ...prev, isNotesMode: !prev.isNotesMode } : null))
          }
          onHint={handleHint}
          isNotesMode={gameState.isNotesMode}
          onNumberClick={handleNumberInput}
          onNewGame={() => startNewGame(gameState.difficulty as Difficulty)}
        />
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
    </div>
  );
}
