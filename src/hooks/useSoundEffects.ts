import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [getAudioContext]);

  const playTyping = useCallback(() => {
    // Random typing sound frequencies
    const frequencies = [800, 850, 900, 950, 1000];
    const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
    playBeep(frequency, 0.05, 0.05);
  }, [playBeep]);

  const playCommand = useCallback(() => {
    // Success sound - ascending notes
    playBeep(600, 0.1, 0.08);
    setTimeout(() => playBeep(800, 0.1, 0.08), 50);
  }, [playBeep]);

  const playError = useCallback(() => {
    // Error sound - descending notes
    playBeep(400, 0.15, 0.1);
    setTimeout(() => playBeep(300, 0.15, 0.1), 75);
  }, [playBeep]);

  return {
    playTyping,
    playCommand,
    playError
  };
};