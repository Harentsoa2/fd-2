import { useGameStore } from '@/store/gameStore';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ArrowLeft, Flag, RotateCcw } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
    <View className="flex-1 bg-[#2c3e50]">
      <View className="flex-row items-center justify-between p-5 pt-15 bg-[#34495e]">
        <TouchableOpacity onPress={() => router.back()} className="p-1.5">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#ecf0f1]">Démineur</Text>
        <TouchableOpacity onPress={resetGame} className="p-1.5">
          <RotateCcw size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center p-4 bg-[#34495e]">
        <TouchableOpacity
          className={`flex-row items-center p-3 rounded-lg ${flagMode ? 'bg-[#e67e22]' : 'bg-[#3498db]'}`}
          onPress={() => setFlagMode(!flagMode)}
        >
          <Flag size={20} color="#fff" />
          <Text className="text-white text-sm font-semibold ml-2">
            {flagMode ? 'Mode Drapeau' : 'Mode Normal'}
          </Text>
        </TouchableOpacity>

        <View className="bg-[#2c3e50] p-3 rounded-lg">
          <Text className="text-[#ecf0f1] text-base font-semibold">
            {gameStatus === 'playing' ? 'En cours' : gameStatus === 'won' ? 'Gagné!' : 'Perdu!'}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-5" horizontal={true}>
        <ScrollView contentContainerClassName="p-5">
          <View className="items-center justify-center">
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row">
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: getCellColor(cell),
                      borderWidth: 1,
                      borderColor: '#2c3e50',
                    }}
                    className="justify-center items-center"
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    disabled={gameStatus !== 'playing'}
                  >
                    <Text
                      style={{
                        fontSize: cellSize * 0.6,
                        color: cell.isRevealed && !cell.isBomb
                          ? getNumberColor(cell.neighborBombs)
                          : '#fff',
                      }}
                      className="font-bold"
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
