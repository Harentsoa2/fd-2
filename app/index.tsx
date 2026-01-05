import { useRouter } from 'expo-router';
import { Bomb, HelpCircle, Play, RotateCcw, Settings } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bomb size={80} color="#e74c3c" />
        <Text style={styles.title}>DÉMINEUR</Text>
        <Text style={styles.subtitle}>Minesweeper</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/game')}
        >
          <Play size={24} color="#fff" />
          <Text style={styles.buttonText}>Nouveau jeu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/game')}
        >
          <RotateCcw size={24} color="#fff" />
          <Text style={styles.buttonText}>Continuer le jeu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/options')}
        >
          <Settings size={24} color="#fff" />
          <Text style={styles.buttonText}>Options</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/help')}
        >
          <HelpCircle size={24} color="#fff" />
          <Text style={styles.buttonText}>Aide</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginTop: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#95a5a6',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
});
