import { DifficultyLevel, useGameStore } from '@/store/gameStore';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { ArrowLeft, Save, Smartphone, SmartphoneNfc, Volume1, Volume2, VolumeX } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Options</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volume</Text>
        <View style={styles.volumeContainer}>
          <TouchableOpacity style={styles.volumeButton} onPress={decreaseVolume}>
            <Text style={styles.volumeButtonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.muteButton} onPress={muteVolume}>
            <VolumeX size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={tempVolume}
              onValueChange={setTempVolume}
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#7f8c8d"
              thumbTintColor="#3498db"
            />
          </View>

          <TouchableOpacity style={styles.volumeButton} onPress={increaseVolume}>
            <Text style={styles.volumeButtonText}>+</Text>
          </TouchableOpacity>

          <View style={styles.volumeIcon}>
            {getVolumeIcon()}
          </View>
        </View>
        <Text style={styles.volumeText}>{Math.round(tempVolume * 100)}%</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vibration</Text>
        <View style={styles.vibrationContainer}>
          <View style={styles.vibrationIcon}>
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
          <Text style={styles.vibrationText}>
            {tempVibrationEnabled ? 'Activée' : 'Désactivée'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Niveau de difficulté</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDifficultyMenu(!showDifficultyMenu)}
        >
          <Text style={styles.dropdownText}>{getDifficultyLabel(tempDifficulty)}</Text>
        </TouchableOpacity>

        {showDifficultyMenu && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                tempDifficulty === 'easy' && styles.dropdownItemSelected,
              ]}
              onPress={() => {
                setTempDifficulty('easy');
                setShowDifficultyMenu(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  tempDifficulty === 'easy' && styles.dropdownItemTextSelected,
                ]}
              >
                {getDifficultyLabel('easy')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dropdownItem,
                tempDifficulty === 'medium' && styles.dropdownItemSelected,
              ]}
              onPress={() => {
                setTempDifficulty('medium');
                setShowDifficultyMenu(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  tempDifficulty === 'medium' && styles.dropdownItemTextSelected,
                ]}
              >
                {getDifficultyLabel('medium')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dropdownItem,
                tempDifficulty === 'hard' && styles.dropdownItemSelected,
              ]}
              onPress={() => {
                setTempDifficulty('hard');
                setShowDifficultyMenu(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  tempDifficulty === 'hard' && styles.dropdownItemTextSelected,
                ]}
              >
                {getDifficultyLabel('hard')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Save size={24} color="#fff" />
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#34495e',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ecf0f1',
    marginBottom: 15,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeButton: {
    backgroundColor: '#f39c12',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  muteButton: {
    backgroundColor: '#e74c3c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  volumeIcon: {
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  vibrationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vibrationIcon: {
    flex: 1,
  },
  vibrationText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginLeft: 15,
  },
  dropdown: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7f8c8d',
  },
  dropdownText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  dropdownMenu: {
    marginTop: 10,
    backgroundColor: '#34495e',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#7f8c8d',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
  },
  dropdownItemSelected: {
    backgroundColor: '#3498db',
  },
  dropdownItemText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  dropdownItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 12,
    margin: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  spacer: {
    height: 40,
  },
});
