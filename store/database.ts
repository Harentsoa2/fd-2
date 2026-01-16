import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'minesweeper.db';

export interface SavedGame {
  id: number;
  grid: string; // JSON stringified grid
  gameStatus: string;
  difficulty: string;
  timestamp: number;
}

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS saved_game (
      id INTEGER PRIMARY KEY NOT NULL,
      grid TEXT NOT NULL,
      gameStatus TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
  `);
  return db;
};

export const saveGameToDB = async (grid: any, gameStatus: string, difficulty: string) => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const gridJson = JSON.stringify(grid);
    const timestamp = Date.now();

    // On ne garde qu'une seule sauvegarde (id=1)
    await db.runAsync(
      'INSERT OR REPLACE INTO saved_game (id, grid, gameStatus, difficulty, timestamp) VALUES (?, ?, ?, ?, ?)',
      [1, gridJson, gameStatus, difficulty, timestamp]
    );
  } catch (error) {
    console.error('Error saving game to SQLite:', error);
  }
};

export const getSavedGameFromDB = async (): Promise<SavedGame | null> => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const result = await db.getFirstAsync<SavedGame>('SELECT * FROM saved_game WHERE id = 1');
    return result;
  } catch (error) {
    console.error('Error getting game from SQLite:', error);
    return null;
  }
};

export const deleteSavedGameFromDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync('DELETE FROM saved_game WHERE id = 1');
  } catch (error) {
    console.error('Error deleting game from SQLite:', error);
  }
};
