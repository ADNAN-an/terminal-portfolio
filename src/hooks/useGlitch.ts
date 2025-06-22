import { useState, useEffect, useCallback } from 'react';

export interface GlitchState {
  isGlitching: boolean;
  isFlickering: boolean;
  hasTextGlitch: boolean;
  hasLineGlitch: boolean;
}

export const useGlitch = () => {
  const [glitchState, setGlitchState] = useState<GlitchState>({
    isGlitching: false,
    isFlickering: false,
    hasTextGlitch: false,
    hasLineGlitch: false,
  });

  const triggerGlitch = useCallback((type: keyof GlitchState, duration: number = 100) => {
    setGlitchState(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setGlitchState(prev => ({ ...prev, [type]: false }));
    }, duration);
  }, []);

  const triggerRandomGlitch = useCallback(() => {
    const glitchTypes: Array<keyof GlitchState> = ['isGlitching', 'isFlickering', 'hasTextGlitch', 'hasLineGlitch'];
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    const duration = Math.random() * 150 + 50; // 50-200ms
    
    triggerGlitch(randomType, duration);
  }, [triggerGlitch]);

  const triggerCommandGlitch = useCallback(() => {
    // Slight chance of glitch on command execution
    if (Math.random() < 0.15) { // 15% chance
      triggerRandomGlitch();
    }
  }, [triggerRandomGlitch]);

  const triggerTypingGlitch = useCallback(() => {
    // Very small chance of glitch while typing
    if (Math.random() < 0.02) { // 2% chance
      triggerGlitch('isFlickering', 50);
    }
  }, [triggerGlitch]);

  // Random ambient glitches
  useEffect(() => {
    const interval = setInterval(() => {
      // Random glitch every 8-15 seconds
      if (Math.random() < 0.08) { // 8% chance every second = roughly every 12.5 seconds on average
        triggerRandomGlitch();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [triggerRandomGlitch]);

  // Occasional screen flicker
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.03) { // 3% chance every 2 seconds
        triggerGlitch('isFlickering', 30);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [triggerGlitch]);

  // Rare intense glitch sequence
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.005) { // 0.5% chance every 5 seconds = very rare
        // Trigger multiple glitches in sequence
        triggerGlitch('isGlitching', 80);
        setTimeout(() => triggerGlitch('hasTextGlitch', 120), 50);
        setTimeout(() => triggerGlitch('hasLineGlitch', 100), 100);
        setTimeout(() => triggerGlitch('isFlickering', 60), 150);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [triggerGlitch]);

  return {
    glitchState,
    triggerGlitch,
    triggerRandomGlitch,
    triggerCommandGlitch,
    triggerTypingGlitch,
  };
};