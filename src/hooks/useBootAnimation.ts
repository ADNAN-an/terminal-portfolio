import { useState, useEffect } from 'react';

// Separate types for booting and booted states
export type BootingState = {
  isBooting: true;
  stage: 'power-on' | 'system-check' | 'loading' | 'transition' | 'fade-out';
  currentLine: number;
  showCursor: boolean;
};

export type BootedState = {
  isBooting: false;
  stage: 'complete';
  currentLine: number;
  showCursor: boolean;
};

// Union type
export type BootState = BootingState | BootedState;

const bootSequence = [
  { text: "BIOS Version 2.1.4 - Copyright (C) 1985-2024 RetroTech Corp.", delay: 100 },
  { text: "Memory Test: 640K OK", delay: 200 },
  { text: "Extended Memory: 15360K OK", delay: 150 },
  { text: "", delay: 100 },
  { text: "Detecting Hardware...", delay: 300 },
  { text: "  CPU: Intel 80486DX-33MHz", delay: 150 },
  { text: "  RAM: 16MB", delay: 100 },
  { text: "  VGA: Compatible Display Adapter", delay: 150 },
  { text: "  HDD: 540MB IDE Drive", delay: 200 },
  { text: "", delay: 100 },
  { text: "Loading Operating System...", delay: 400 },
  { text: "████████████████████████████████ 100%", delay: 800 },
  { text: "", delay: 200 },
  { text: "RetroOS v3.11 Ready", delay: 300 },
  { text: "Initializing Terminal Interface...", delay: 500 },
  { text: "", delay: 200 },
  { text: "Welcome to Portfolio Terminal", delay: 300 },
  { text: "", delay: 200 },
  { text: "Starting terminal session...", delay: 400 },
  { text: "Loading user interface...", delay: 300 },
  { text: "", delay: 100 },
  { text: "Terminal ready.", delay: 200 },
];

export const useBootAnimation = () => {
  const [bootState, setBootState] = useState<BootState>({
    isBooting: true,
    stage: 'power-on',
    currentLine: -1,
    showCursor: true
  });

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    const runBootSequence = async () => {
      // Power-on stage
      setBootState(prev => ({ ...prev, stage: 'power-on' }));

      // Wait for CRT power-on animation
      await new Promise(resolve => {
        timeouts.push(setTimeout(resolve, 1500));
      });

      // System check stage
      setBootState(prev => ({ ...prev, stage: 'system-check' }));

      // Wait for flicker effect
      await new Promise(resolve => {
        timeouts.push(setTimeout(resolve, 300));
      });

      // Loading stage - display boot sequence
      setBootState(prev => ({ ...prev, stage: 'loading' }));

      let cumulativeDelay = 0;
      bootSequence.forEach((line, index) => {
        cumulativeDelay += line.delay;
        timeouts.push(setTimeout(() => {
          setDisplayedLines(prev => [...prev, line.text]);
          setBootState(prev => ({ ...prev, currentLine: index }));
        }, cumulativeDelay));
      });

      // Transition stage - prepare for terminal opening
      timeouts.push(setTimeout(() => {
        setBootState(prev => ({ ...prev, stage: 'transition' }));
      }, cumulativeDelay + 500));

      // Fade out stage
      timeouts.push(setTimeout(() => {
        setBootState(prev => ({ ...prev, stage: 'fade-out' }));
      }, cumulativeDelay + 2000));

      // Complete boot sequence after fade out
      timeouts.push(setTimeout(() => {
        setBootState({
          isBooting: false,
          stage: 'complete',
          currentLine: bootSequence.length,
          showCursor: false
        });
      }, cumulativeDelay + 3000)); // Extended time for smooth transition
    };

    runBootSequence();

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setBootState(prev => ({ ...prev, showCursor: !prev.showCursor }));
    }, 500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  return {
    bootState,
    displayedLines,
    isBootComplete: !bootState.isBooting
  };
};