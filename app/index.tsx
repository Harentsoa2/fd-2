import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'expo-router';
import { Bomb, HelpCircle, Play, RotateCcw, Settings } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
  const router = useRouter();
  const { hasSavedGame, loadSettings, checkSavedGame, loadSavedGame, initializeGrid } = useGameStore();

  useEffect(() => {
    const loadData = async () => {
      await loadSettings();
      await checkSavedGame();
    };
    loadData();
  }, []);

  const handleNewGame = () => {
    initializeGrid();
    router.push('/game');
  };

  const handleContinueGame = async () => {
    await loadSavedGame();
    router.push('/game');
  };

  return (
    <View className="flex-1 bg-[#2c3e50] justify-center items-center p-5">
      <View className="items-center mb-16">
        <Bomb size={80} color="#e74c3c" />
        <Text className="text-5xl font-bold text-[#ecf0f1] mt-5" style={{ letterSpacing: 2 }}>
          DÉMINEUR
        </Text>
        <Text className="text-lg text-[#95a5a6] mt-1">Minesweeper</Text>
      </View>

      <View className="w-full max-w-[300px]">
        <TouchableOpacity
          className="flex-row items-center bg-[#3498db] p-4 rounded-xl mb-4 shadow-md"
          onPress={handleNewGame}
        >
          <Play size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-4">Nouveau jeu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center p-4 rounded-xl mb-4 shadow-md ${hasSavedGame ? 'bg-[#27ae60]' : 'bg-[#7f8c8d]'}`}
          onPress={handleContinueGame}
          disabled={!hasSavedGame}
        >
          <RotateCcw size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-4">Continuer le jeu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-[#3498db] p-4 rounded-xl mb-4 shadow-md"
          onPress={() => router.push('/options')}
        >
          <Settings size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-4">Options</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-[#3498db] p-4 rounded-xl mb-4 shadow-md"
          onPress={() => router.push('/help')}
        >
          <HelpCircle size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-4">Aide</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}