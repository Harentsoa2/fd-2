import { useGameStore } from '@/store/gameStore';
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

export function useMusicManager() {
  const volume = useGameStore((state) => state.volume);

  const player = useAudioPlayer(
    require('@/assets/musique/sound.mp3')
  );

  useEffect(() => {
    if (!player) return;

    player.loop = true;
    player.volume = volume;
    player.play();

    return () => {
      player.pause();
    };
  }, [player]);

  useEffect(() => {
    if (player) {
      player.volume = volume;
    }
  }, [volume, player]);

  return null;
}
