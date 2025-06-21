import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label = 'Progress' }) => {
  const { themeColors } = useTheme();
  
  const progressWidth = Math.min(Math.max(progress, 0), 100);
  const progressChars = Math.floor(progressWidth / 2);
  const totalChars = 50;
  
  const filledBar = '█'.repeat(progressChars);
  const emptyBar = '░'.repeat(totalChars - progressChars);
  
  return (
    <div className="font-mono">
      <div className={`${themeColors.text} mb-1`}>
        {label}: {progressWidth.toFixed(1)}%
      </div>
      <div className="flex items-center space-x-2">
        <span className={themeColors.textSecondary}>[</span>
        <span className={themeColors.primary}>{filledBar}</span>
        <span className={themeColors.textSecondary}>{emptyBar}</span>
        <span className={themeColors.textSecondary}>]</span>
      </div>
    </div>
  );
};

export default ProgressBar;