import { useRouter } from 'expo-router';
import { AlertCircle, ArrowLeft, Bomb, Flag, Target } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Aide</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Target size={32} color="#3498db" />
          </View>
          <Text style={styles.sectionTitle}>But du jeu</Text>
          <Text style={styles.text}>
            Le but du Démineur est de révéler toutes les cases qui ne contiennent pas de bombes,
            sans cliquer sur une seule bombe. Si vous révélez une bombe, vous perdez la partie!
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Bomb size={32} color="#e74c3c" />
          </View>
          <Text style={styles.sectionTitle}>Les bombes</Text>
          <Text style={styles.text}>
            Les bombes sont cachées dans la grille. Lorsque vous révélez une case sans bombe,
            un numéro s'affiche indiquant combien de bombes se trouvent dans les 8 cases
            adjacentes (horizontalement, verticalement et diagonalement).
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Flag size={32} color="#e67e22" />
          </View>
          <Text style={styles.sectionTitle}>Les drapeaux</Text>
          <Text style={styles.text}>
            Activez le mode drapeau pour marquer les cases où vous pensez qu'il y a des bombes.
            Cela vous aide à garder une trace des bombes potentielles sans les révéler.
            Appuyez sur le bouton "Mode Drapeau" pour basculer entre le mode normal et le mode drapeau.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <AlertCircle size={32} color="#f39c12" />
          </View>
          <Text style={styles.sectionTitle}>Comment jouer</Text>
          <Text style={styles.text}>
            1. Appuyez sur une case pour la révéler{'\n'}
            2. Si c'est une bombe, vous perdez{'\n'}
            3. Si ce n'est pas une bombe, un numéro apparaît{'\n'}
            4. Le numéro indique combien de bombes sont autour{'\n'}
            5. Utilisez les drapeaux pour marquer les bombes{'\n'}
            6. Révélez toutes les cases sans bombes pour gagner
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Niveaux de difficulté</Text>
          <View style={styles.difficultyContainer}>
            <View style={styles.difficultyItem}>
              <Text style={styles.difficultyLevel}>Facile</Text>
              <Text style={styles.difficultyInfo}>10×10 cases, 20 bombes</Text>
            </View>
            <View style={styles.difficultyItem}>
              <Text style={styles.difficultyLevel}>Medium</Text>
              <Text style={styles.difficultyInfo}>20×20 cases, 40 bombes</Text>
            </View>
            <View style={styles.difficultyItem}>
              <Text style={styles.difficultyLevel}>Difficile</Text>
              <Text style={styles.difficultyInfo}>30×30 cases, 60 bombes</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils</Text>
          <Text style={styles.text}>
            • Commencez par les coins et les bords{'\n'}
            • Utilisez la logique pour déduire où sont les bombes{'\n'}
            • Marquez les bombes avec des drapeaux{'\n'}
            • Prenez votre temps et réfléchissez avant de cliquer{'\n'}
            • Si une case affiche "0", toutes les cases autour sont sûres
          </Text>
        </View>

        <View style={styles.spacer} />
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
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  iconContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#bdc3c7',
    lineHeight: 24,
  },
  difficultyContainer: {
    marginTop: 10,
  },
  difficultyItem: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  difficultyLevel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 5,
  },
  difficultyInfo: {
    fontSize: 14,
    color: '#bdc3c7',
  },
  spacer: {
    height: 40,
  },
});
