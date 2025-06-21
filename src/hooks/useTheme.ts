import { useState, useEffect } from 'react';

export type Theme = 'green' | 'blue' | 'amber' | 'purple' | 'red';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  glow: string;
  text: string;
  textSecondary: string;
}

const themes: Record<Theme, ThemeColors> = {
  green: {
    primary: 'text-green-400',
    secondary: 'text-green-300',
    accent: 'text-green-500',
    border: 'border-green-500/30',
    glow: 'shadow-green-500/20',
    text: 'text-green-300',
    textSecondary: 'text-green-600/60'
  },
  blue: {
    primary: 'text-blue-400',
    secondary: 'text-blue-300',
    accent: 'text-blue-500',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    text: 'text-blue-300',
    textSecondary: 'text-blue-600/60'
  },
  amber: {
    primary: 'text-amber-400',
    secondary: 'text-amber-300',
    accent: 'text-amber-500',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    text: 'text-amber-300',
    textSecondary: 'text-amber-600/60'
  },
  purple: {
    primary: 'text-purple-400',
    secondary: 'text-purple-300',
    accent: 'text-purple-500',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20',
    text: 'text-purple-300',
    textSecondary: 'text-purple-600/60'
  },
  red: {
    primary: 'text-red-400',
    secondary: 'text-red-300',
    accent: 'text-red-500',
    border: 'border-red-500/30',
    glow: 'shadow-red-500/20',
    text: 'text-red-300',
    textSecondary: 'text-red-600/60'
  }
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('green');

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent<Theme>) => {
      setCurrentTheme(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  return {
    currentTheme,
    themeColors: themes[currentTheme],
    setTheme: setCurrentTheme
  };
};