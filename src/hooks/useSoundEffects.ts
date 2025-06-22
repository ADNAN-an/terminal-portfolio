import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createNoise = useCallback((audioContext: AudioContext, duration: number, volume: number = 0.1) => {
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { whiteNoise, gainNode };
  }, []);

  const playRetroBeep = useCallback((frequency: number, duration: number, volume: number = 0.08, waveType: OscillatorType = 'square') => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      // Create that classic lo-fi sound with filtering
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(frequency * 2, audioContext.currentTime);
      filterNode.Q.setValueAtTime(1, audioContext.currentTime);

      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = waveType;

      // Classic envelope with quick attack and decay
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [getAudioContext]);

  const playMechanicalClick = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      
      // Create mechanical keyboard click with multiple frequency components
      const frequencies = [2800, 3200, 1200];
      const durations = [0.008, 0.012, 0.015];
      
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filterNode = audioContext.createBiquadFilter();
          
          // High-pass filter for that crisp click
          filterNode.type = 'highpass';
          filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
          
          oscillator.connect(filterNode);
          filterNode.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'square';
          
          const volume = 0.03 - (index * 0.008); // Decreasing volume
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.001);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + durations[index]);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + durations[index]);
        }, index * 2);
      });
      
      // Add subtle noise for mechanical texture
      const { whiteNoise } = createNoise(audioContext, 0.01, 0.008);
      const filterNode = audioContext.createBiquadFilter();
      filterNode.type = 'bandpass';
      filterNode.frequency.setValueAtTime(4000, audioContext.currentTime);
      filterNode.Q.setValueAtTime(10, audioContext.currentTime);
      
      whiteNoise.disconnect();
      whiteNoise.connect(filterNode);
      filterNode.connect(audioContext.destination);
      whiteNoise.start(audioContext.currentTime);
      whiteNoise.stop(audioContext.currentTime + 0.01);
      
    } catch (error) {
      // Silently fail
    }
  }, [getAudioContext, createNoise]);

  const playRetroStartup = useCallback(() => {
    // Classic computer startup sequence
    setTimeout(() => playRetroBeep(220, 0.15, 0.06, 'square'), 0);
    setTimeout(() => playRetroBeep(330, 0.15, 0.06, 'square'), 150);
    setTimeout(() => playRetroBeep(440, 0.25, 0.08, 'square'), 300);
  }, [playRetroBeep]);

  const playRetroError = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      
      // Classic error sound - harsh buzzer
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      // Harsh low-pass filter
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
      filterNode.Q.setValueAtTime(5, audioContext.currentTime);
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Frequency modulation for that classic error buzz
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(120, audioContext.currentTime + 0.1);
      oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.2);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.25);
      
      // Add some static/noise
      setTimeout(() => {
        const { whiteNoise } = createNoise(audioContext, 0.05, 0.02);
        whiteNoise.start(audioContext.currentTime);
        whiteNoise.stop(audioContext.currentTime + 0.05);
      }, 100);
      
    } catch (error) {
      // Silently fail
    }
  }, [getAudioContext, createNoise]);

  const playModemHandshake = useCallback(() => {
    // Classic modem connection sounds
    try {
      const audioContext = getAudioContext();
      const duration = 0.8;
      
      // Create the classic modem screech
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filterNode = audioContext.createBiquadFilter();
          
          filterNode.type = 'bandpass';
          filterNode.frequency.setValueAtTime(1200 + (i * 200), audioContext.currentTime);
          filterNode.Q.setValueAtTime(3, audioContext.currentTime);
          
          oscillator.connect(filterNode);
          filterNode.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(1200 + (i * 150) + Math.random() * 100, audioContext.currentTime);
          oscillator.type = 'sawtooth';
          
          const volume = 0.04 * (1 - i * 0.1);
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        }, i * 80);
      }
      
      // Add static throughout
      const { whiteNoise } = createNoise(audioContext, duration, 0.015);
      const filterNode = audioContext.createBiquadFilter();
      filterNode.type = 'highpass';
      filterNode.frequency.setValueAtTime(2000, audioContext.currentTime);
      
      whiteNoise.disconnect();
      whiteNoise.connect(filterNode);
      filterNode.connect(audioContext.destination);
      whiteNoise.start(audioContext.currentTime);
      whiteNoise.stop(audioContext.currentTime + duration);
      
    } catch (error) {
      // Silently fail
    }
  }, [getAudioContext, createNoise]);

  const playTyping = useCallback(() => {
    // Authentic mechanical keyboard sound with variation
    const variations = [
      () => playMechanicalClick(),
      () => {
        // Slightly different pitch for variation
        playRetroBeep(2600, 0.008, 0.025, 'square');
        setTimeout(() => playRetroBeep(1800, 0.006, 0.015, 'square'), 2);
      },
      () => {
        // Another variation
        playRetroBeep(3000, 0.007, 0.02, 'square');
        setTimeout(() => playRetroBeep(2200, 0.005, 0.012, 'square'), 1);
      }
    ];
    
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    randomVariation();
  }, [playMechanicalClick, playRetroBeep]);

  const playCommand = useCallback(() => {
    // Success sound with retro computer feel
    const commandSounds = [
      () => playRetroStartup(),
      () => {
        // Alternative: Classic "ding" with harmonics
        playRetroBeep(800, 0.1, 0.06, 'sine');
        setTimeout(() => playRetroBeep(1200, 0.08, 0.04, 'sine'), 50);
      },
      () => {
        // Alternative: Retro game-style success
        playRetroBeep(523, 0.08, 0.05, 'square'); // C
        setTimeout(() => playRetroBeep(659, 0.08, 0.05, 'square'), 80); // E
        setTimeout(() => playRetroBeep(784, 0.12, 0.06, 'square'), 160); // G
      }
    ];
    
    const randomSound = commandSounds[Math.floor(Math.random() * commandSounds.length)];
    randomSound();
  }, [playRetroStartup, playRetroBeep]);

  const playError = useCallback(() => {
    const errorSounds = [
      () => playRetroError(),
      () => {
        // Alternative: Classic "bonk" sound
        playRetroBeep(180, 0.2, 0.1, 'sawtooth');
        setTimeout(() => playRetroBeep(120, 0.15, 0.08, 'sawtooth'), 100);
      },
      () => {
        // Alternative: Harsh buzz
        playRetroBeep(200, 0.3, 0.09, 'square');
      }
    ];
    
    const randomSound = errorSounds[Math.floor(Math.random() * errorSounds.length)];
    randomSound();
  }, [playRetroError, playRetroBeep]);

  // Special sound for specific commands
  const playSpecialCommand = useCallback((command: string) => {
    switch (command.toLowerCase()) {
      case 'resume':
        playModemHandshake();
        break;
      case 'clear':
        // Static burst for clear
        try {
          const audioContext = getAudioContext();
          const { whiteNoise } = createNoise(audioContext, 0.1, 0.03);
          const filterNode = audioContext.createBiquadFilter();
          filterNode.type = 'highpass';
          filterNode.frequency.setValueAtTime(8000, audioContext.currentTime);
          
          whiteNoise.disconnect();
          whiteNoise.connect(filterNode);
          filterNode.connect(audioContext.destination);
          whiteNoise.start(audioContext.currentTime);
          whiteNoise.stop(audioContext.currentTime + 0.1);
        } catch (error) {
          // Silently fail
        }
        break;
      default:
        playCommand();
    }
  }, [playModemHandshake, playCommand, getAudioContext, createNoise]);

  return {
    playTyping,
    playCommand: playSpecialCommand,
    playError,
    playRetroStartup,
    playModemHandshake
  };
};