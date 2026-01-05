import { useGameStore } from '@/store/gameStore';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ArrowLeft, Flag, RotateCcw } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameScreen() {
  const router = useRouter();
  const {
    grid,
    gameStatus,
    vibrationEnabled,
    difficulty,
    initializeGrid,
    revealCell,
    toggleFlag,
    resetGame,
  } = useGameStore();

  const [flagMode, setFlagMode] = useState(false);

  useEffect(() => {
    if (grid.length === 0) {
      initializeGrid();
    }
  }, []);

  useEffect(() => {
    if (gameStatus === 'won') {
      Alert.alert('Victoire!', 'Vous avez gagné! Félicitations!', [
        { text: 'Rejouer', onPress: resetGame },
        { text: 'Menu', onPress: () => router.back() },
      ]);
    } else if (gameStatus === 'lost') {
      Alert.alert('Perdu!', 'Vous avez touché une bombe!', [
        { text: 'Rejouer', onPress: resetGame },
        { text: 'Menu', onPress: () => router.back() },
      ]);
    }
  }, [gameStatus]);

  const handleCellPress = async (row: number, col: number) => {
    const cell = grid[row][col];

    if (flagMode) {
      toggleFlag(row, col);
    } else {
      if (cell.isBomb && !cell.isRevealed && vibrationEnabled) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      revealCell(row, col);
    }
  };

  const getCellSize = () => {
    switch (difficulty) {
      case 'easy':
        return 35;
      case 'medium':
        return 18;
      case 'hard':
        return 12;
    }
  };

  const getCellColor = (cell: any) => {
    if (cell.isRevealed) {
      if (cell.isBomb) {
        return '#e74c3c';
      }
      return '#95a5a6';
    }
    return '#34495e';
  };

  const getCellContent = (cell: any) => {
    if (cell.isFlagged) {
      return '🚩';
    }
    if (cell.isRevealed) {
      if (cell.isBomb) {
        return '💣';
      }
      if (cell.neighborBombs > 0) {
        return cell.neighborBombs.toString();
      }
    }
    return '';
  };

  const getNumberColor = (num: number) => {
    const colors = ['', '#2980b9', '#27ae60', '#e74c3c', '#8e44ad', '#d35400', '#16a085', '#c0392b', '#7f8c8d'];
    return colors[num] || '#000';
  };

  const cellSize = getCellSize();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Démineur</Text>
        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
          <RotateCcw size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.modeButton, flagMode && styles.modeButtonActive]}
          onPress={() => setFlagMode(!flagMode)}
        >
          <Flag size={20} color="#fff" />
          <Text style={styles.modeButtonText}>
            {flagMode ? 'Mode Drapeau' : 'Mode Normal'}
          </Text>
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {gameStatus === 'playing' ? 'En cours' : gameStatus === 'won' ? 'Gagné!' : 'Perdu!'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        horizontal={true}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: getCellColor(cell),
                      },
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    disabled={gameStatus !== 'playing'}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        {
                          fontSize: cellSize * 0.6,
                          color: cell.isRevealed && !cell.isBomb
                            ? getNumberColor(cell.neighborBombs)
                            : '#fff',
                        },
                      ]}
                    >
                      {getCellContent(cell)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#34495e',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  resetButton: {
    padding: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#34495e',
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: '#e67e22',
  },
  modeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusContainer: {
    backgroundColor: '#2c3e50',
    padding: 12,
    borderRadius: 8,
  },
  statusText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontWeight: 'bold',
  },
});
