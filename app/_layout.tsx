import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useMusicManager } from '@/hooks/useMusicManager';
import { initDatabase } from '@/store/database';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';

export default function RootLayout() {
  useFrameworkReady();
  useMusicManager();

  useEffect(() => {
    initDatabase().catch(err => console.error('Failed to init DB:', err));
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
