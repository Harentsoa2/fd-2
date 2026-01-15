import { useRouter } from 'expo-router';
import { AlertCircle, ArrowLeft, Bomb, Flag, Target } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#2c3e50]">
      <View className="flex-row items-center p-5 pt-15 bg-[#34495e]">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-[#ecf0f1]">Aide</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-5 border-b border-[#34495e]">
          <View className="mb-2.5">
            <Target size={32} color="#3498db" />
          </View>
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">But du jeu</Text>
          <Text className="text-base text-[#bdc3c7]" style={{ lineHeight: 24 }}>
            Le but du Démineur est de révéler toutes les cases qui ne contiennent pas de bombes,
            sans cliquer sur une seule bombe. Si vous révélez une bombe, vous perdez la partie!
          </Text>
        </View>

        <View className="p-5 border-b border-[#34495e]">
          <View className="mb-2.5">
            <Bomb size={32} color="#e74c3c" />
          </View>
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">Les bombes</Text>
          <Text className="text-base text-[#bdc3c7]" style={{ lineHeight: 24 }}>
            Les bombes sont cachées dans la grille. Lorsque vous révélez une case sans bombe,
            un numéro s'affiche indiquant combien de bombes se trouvent dans les 8 cases
            adjacentes (horizontalement, verticalement et diagonalement).
          </Text>
        </View>

        <View className="p-5 border-b border-[#34495e]">
          <View className="mb-2.5">
            <Flag size={32} color="#e67e22" />
          </View>
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">Les drapeaux</Text>
          <Text className="text-base text-[#bdc3c7]" style={{ lineHeight: 24 }}>
            Activez le mode drapeau pour marquer les cases où vous pensez qu'il y a des bombes.
            Cela vous aide à garder une trace des bombes potentielles sans les révéler.
            Appuyez sur le bouton "Mode Drapeau" pour basculer entre le mode normal et le mode drapeau.
          </Text>
        </View>

        <View className="p-5 border-b border-[#34495e]">
          <View className="mb-2.5">
            <AlertCircle size={32} color="#f39c12" />
          </View>
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">Comment jouer</Text>
          <Text className="text-base text-[#bdc3c7]" style={{ lineHeight: 24 }}>
            1. Appuyez sur une case pour la révéler{'\n'}
            2. Si c'est une bombe, vous perdez{'\n'}
            3. Si ce n'est pas une bombe, un numéro apparaît{'\n'}
            4. Le numéro indique combien de bombes sont autour{'\n'}
            5. Utilisez les drapeaux pour marquer les bombes{'\n'}
            6. Révélez toutes les cases sans bombes pour gagner
          </Text>
        </View>

        <View className="p-5 border-b border-[#34495e]">
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">Niveaux de difficulté</Text>
          <View className="mt-2.5">
            <View className="bg-[#34495e] p-4 rounded-lg mb-2.5">
              <Text className="text-lg font-semibold text-[#3498db] mb-1.5">Facile</Text>
              <Text className="text-sm text-[#bdc3c7]">10×10 cases, 20 bombes</Text>
            </View>
            <View className="bg-[#34495e] p-4 rounded-lg mb-2.5">
              <Text className="text-lg font-semibold text-[#3498db] mb-1.5">Medium</Text>
              <Text className="text-sm text-[#bdc3c7]">20×20 cases, 40 bombes</Text>
            </View>
            <View className="bg-[#34495e] p-4 rounded-lg mb-2.5">
              <Text className="text-lg font-semibold text-[#3498db] mb-1.5">Difficile</Text>
              <Text className="text-sm text-[#bdc3c7]">30×30 cases, 60 bombes</Text>
            </View>
          </View>
        </View>

        <View className="p-5 border-b border-[#34495e]">
          <Text className="text-xl font-semibold text-[#ecf0f1] mb-2.5">Conseils</Text>
          <Text className="text-base text-[#bdc3c7]" style={{ lineHeight: 24 }}>
            • Commencez par les coins et les bords{'\n'}
            • Utilisez la logique pour déduire où sont les bombes{'\n'}
            • Marquez les bombes avec des drapeaux{'\n'}
            • Prenez votre temps et réfléchissez avant de cliquer{'\n'}
            • Si une case affiche "0", toutes les cases autour sont sûres
          </Text>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
