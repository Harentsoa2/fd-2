import { create } from 'zustand';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface Cell {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborBombs: number;
}

interface GameSettings {
  volume: number;
  vibrationEnabled: boolean;
  difficulty: DifficultyLevel;
}

interface GameState extends GameSettings {
  grid: Cell[][];
  gameStatus: 'playing' | 'won' | 'lost';
  tempVolume: number;
  tempVibrationEnabled: boolean;
  tempDifficulty: DifficultyLevel;

  setVolume: (volume: number) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;

  setTempVolume: (volume: number) => void;
  setTempVibrationEnabled: (enabled: boolean) => void;
  setTempDifficulty: (difficulty: DifficultyLevel) => void;
  saveSettings: () => void;
  cancelSettings: () => void;

  initializeGrid: () => void;
  revealCell: (row: number, col: number) => void;
  toggleFlag: (row: number, col: number) => void;
  resetGame: () => void;
}

const getDifficultyConfig = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'easy':
      return { rows: 10, cols: 10, bombs: 20 };
    case 'medium':
      return { rows: 20, cols: 20, bombs: 40 };
    case 'hard':
      return { rows: 30, cols: 30, bombs: 60 };
  }
};

const createEmptyGrid = (rows: number, cols: number): Cell[][] => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      neighborBombs: 0,
    }))
  );
};

const placeBombs = (grid: Cell[][], bombCount: number, rows: number, cols: number) => {
  let bombsPlaced = 0;
  while (bombsPlaced < bombCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!grid[row][col].isBomb) {
      grid[row][col].isBomb = true;
      bombsPlaced++;
    }
  }
};

const calculateNeighborBombs = (grid: Cell[][], rows: number, cols: number) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row][col].isBomb) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              grid[newRow][newCol].isBomb
            ) {
              count++;
            }
          }
        }
        grid[row][col].neighborBombs = count;
      }
    }
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  volume: 0.5,
  vibrationEnabled: true,
  difficulty: 'easy',
  grid: [],
  gameStatus: 'playing',
  tempVolume: 0.5,
  tempVibrationEnabled: true,
  tempDifficulty: 'easy',

  setVolume: (volume) => set({ volume }),
  setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),
  setDifficulty: (difficulty) => {
    set({ difficulty });
    get().initializeGrid();
  },

  setTempVolume: (volume) => set({ tempVolume: volume }),
  setTempVibrationEnabled: (enabled) => set({ tempVibrationEnabled: enabled }),
  setTempDifficulty: (difficulty) => set({ tempDifficulty: difficulty }),

  saveSettings: () => {
    const { tempVolume, tempVibrationEnabled, tempDifficulty } = get();
    set({
      volume: tempVolume,
      vibrationEnabled: tempVibrationEnabled,
      difficulty: tempDifficulty,
    });
    get().initializeGrid();
  },

  cancelSettings: () => {
    const { volume, vibrationEnabled, difficulty } = get();
    set({
      tempVolume: volume,
      tempVibrationEnabled: vibrationEnabled,
      tempDifficulty: difficulty,
    });
  },

  initializeGrid: () => {
    const { difficulty } = get();
    const config = getDifficultyConfig(difficulty);
    const grid = createEmptyGrid(config.rows, config.cols);
    placeBombs(grid, config.bombs, config.rows, config.cols);
    calculateNeighborBombs(grid, config.rows, config.cols);
    set({ grid, gameStatus: 'playing' });
  },

  revealCell: (row, col) => {
    const { grid, gameStatus } = get();
    if (gameStatus !== 'playing') return;

    const cell = grid[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    const newGrid = [...grid.map(r => [...r])];
    newGrid[row][col].isRevealed = true;

    if (cell.isBomb) {
      set({ grid: newGrid, gameStatus: 'lost' });
      return;
    }

    if (cell.neighborBombs === 0) {
      const reveal = (r: number, c: number) => {
        if (r < 0 || r >= newGrid.length || c < 0 || c >= newGrid[0].length) return;
        if (newGrid[r][c].isRevealed || newGrid[r][c].isFlagged) return;

        newGrid[r][c].isRevealed = true;

        if (newGrid[r][c].neighborBombs === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              reveal(r + i, c + j);
            }
          }
        }
      };

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          reveal(row + i, col + j);
        }
      }
    }

    const won = newGrid.every((r, ri) =>
      r.every((c, ci) => c.isBomb || c.isRevealed)
    );

    set({ grid: newGrid, gameStatus: won ? 'won' : 'playing' });
  },

  toggleFlag: (row, col) => {
    const { grid, gameStatus } = get();
    if (gameStatus !== 'playing') return;

    const cell = grid[row][col];
    if (cell.isRevealed) return;

    const newGrid = [...grid.map(r => [...r])];
    newGrid[row][col].isFlagged = !cell.isFlagged;
    set({ grid: newGrid });
  },

  resetGame: () => {
    get().initializeGrid();
  },
}));
