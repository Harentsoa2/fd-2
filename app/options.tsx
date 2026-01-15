import { DifficultyLevel, useGameStore } from '@/store/gameStore';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { ArrowLeft, Save, Smartphone, SmartphoneNfc, Volume1, Volume2, VolumeX } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function OptionsScreen() {
  const router = useRouter();
  const {
    tempVolume,
    tempVibrationEnabled,
    tempDifficulty,
    setTempVolume,
    setTempVibrationEnabled,
    setTempDifficulty,
    saveSettings,
    cancelSettings,
  } = useGameStore();

  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  const handleSave = () => {
    saveSettings();
    router.back();
  };

  const handleCancel = () => {
    cancelSettings();
    router.back();
  };

  const increaseVolume = () => {
    const newVolume = Math.min(tempVolume + 0.1, 1);
    setTempVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(tempVolume - 0.1, 0);
    setTempVolume(newVolume);
  };

  const muteVolume = () => {
    setTempVolume(0);
  };

  const getVolumeIcon = () => {
    if (tempVolume === 0) return <VolumeX size={24} color="#fff" />;
    if (tempVolume < 0.5) return <Volume1 size={24} color="#fff" />;
    return <Volume2 size={24} color="#fff" />;
  };

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'easy':
        return 'Facile (10×10, 20 bombes)';
      case 'medium':
        return 'Medium (20×20, 40 bombes)';
      case 'hard':
        return 'Difficile (30×30, 60 bombes)';
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#2c3e50]">
      <View className="flex-row items-center p-5 pt-15 bg-[#34495e]">
        <TouchableOpacity onPress={handleCancel} className="mr-4">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-[#ecf0f1]">Options</Text>
      </View>

      <View className="p-5 border-b border-[#34495e]">
        <Text className="text-lg font-semibold text-[#ecf0f1] mb-4">Volume</Text>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="bg-[#f39c12] w-[50px] h-[50px] rounded-full justify-center items-center"
            onPress={decreaseVolume}
          >
            <Text className="text-white text-2xl font-bold">-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#e74c3c] w-[50px] h-[50px] rounded-full justify-center items-center"
            onPress={muteVolume}
          >
            <VolumeX size={20} color="#fff" />
          </TouchableOpacity>

          <View className="flex-1 mx-2.5">
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={tempVolume}
              onValueChange={setTempVolume}
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#7f8c8d"
              thumbTintColor="#3498db"
            />
          </View>

          <TouchableOpacity
            className="bg-[#f39c12] w-[50px] h-[50px] rounded-full justify-center items-center"
            onPress={increaseVolume}
          >
            <Text className="text-white text-2xl font-bold">+</Text>
          </TouchableOpacity>

          <View className="bg-[#3498db] w-[50px] h-[50px] rounded-full justify-center items-center">
            {getVolumeIcon()}
          </View>
        </View>
        <Text className="text-[#ecf0f1] text-base mt-2.5 text-center">
          {Math.round(tempVolume * 100)}%
        </Text>
      </View>

      <View className="p-5 border-b border-[#34495e]">
        <Text className="text-lg font-semibold text-[#ecf0f1] mb-4">Vibration</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            {tempVibrationEnabled ? (
              <SmartphoneNfc size={24} color="#3498db" />
            ) : (
              <Smartphone size={24} color="#7f8c8d" />
            )}
          </View>
          <Switch
            value={tempVibrationEnabled}
            onValueChange={setTempVibrationEnabled}
            trackColor={{ false: '#7f8c8d', true: '#3498db' }}
            thumbColor="#fff"
          />
          <Text className="text-[#ecf0f1] text-base ml-4">
            {tempVibrationEnabled ? 'Activée' : 'Désactivée'}
          </Text>
        </View>
      </View>

      <View className="p-5 border-b border-[#34495e]">
        <Text className="text-lg font-semibold text-[#ecf0f1] mb-4">Niveau de difficulté</Text>
        <TouchableOpacity
          className="bg-[#34495e] p-4 rounded-lg border border-[#7f8c8d]"
          onPress={() => setShowDifficultyMenu(!showDifficultyMenu)}
        >
          <Text className="text-[#ecf0f1] text-base">{getDifficultyLabel(tempDifficulty)}</Text>
        </TouchableOpacity>

        {showDifficultyMenu && (
          <View className="mt-2.5 bg-[#34495e] rounded-lg overflow-hidden border border-[#7f8c8d]">
            <TouchableOpacity
              className={`p-4 border-b border-[#2c3e50] ${tempDifficulty === 'easy' ? 'bg-[#3498db]' : ''}`}
              onPress={() => {
                setTempDifficulty('easy');
                setShowDifficultyMenu(false);
              }}
            >
              <Text className={`text-base ${tempDifficulty === 'easy' ? 'text-white font-semibold' : 'text-[#ecf0f1]'}`}>
                {getDifficultyLabel('easy')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-4 border-b border-[#2c3e50] ${tempDifficulty === 'medium' ? 'bg-[#3498db]' : ''}`}
              onPress={() => {
                setTempDifficulty('medium');
                setShowDifficultyMenu(false);
              }}
            >
              <Text className={`text-base ${tempDifficulty === 'medium' ? 'text-white font-semibold' : 'text-[#ecf0f1]'}`}>
                {getDifficultyLabel('medium')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-4 border-b border-[#2c3e50] ${tempDifficulty === 'hard' ? 'bg-[#3498db]' : ''}`}
              onPress={() => {
                setTempDifficulty('hard');
                setShowDifficultyMenu(false);
              }}
            >
              <Text className={`text-base ${tempDifficulty === 'hard' ? 'text-white font-semibold' : 'text-[#ecf0f1]'}`}>
                {getDifficultyLabel('hard')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center bg-[#27ae60] p-4.5 rounded-xl m-5 shadow-md"
        onPress={handleSave}
      >
        <Save size={24} color="#fff" />
        <Text className="text-white text-lg font-semibold ml-2.5">Sauvegarder</Text>
      </TouchableOpacity>

      <View className="h-10" />
    </ScrollView>
  );
}
