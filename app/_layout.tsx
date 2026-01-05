import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useMusicManager } from '@/hooks/useMusicManager';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  useFrameworkReady();
  useMusicManager();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}


