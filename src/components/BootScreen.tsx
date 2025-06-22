import React from 'react';
import { useBootAnimation } from '../hooks/useBootAnimation';

const BootScreen: React.FC = () => {
  const { bootState, displayedLines } = useBootAnimation();

  if (!bootState.isBooting) return null;

  const getStageClasses = () => {
    switch (bootState.stage) {
      case 'power-on':
        return 'crt-boot';
      case 'system-check':
        return 'crt-flicker';
      case 'loading':
        return 'screen-glow';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* CRT Monitor Frame */}
      <div className="relative">
        {/* Monitor Bezel */}
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl">
          <div className="bg-gray-900 p-4 rounded-2xl">
            {/* Screen */}
            <div 
              className={`
                w-[800px] h-[600px] bg-black rounded-lg relative overflow-hidden
                border-2 border-gray-700 ${getStageClasses()}
              `}
            >
              {/* Static noise overlay for power-on */}
              {bootState.stage === 'power-on' && (
                <div className="absolute inset-0 static-bg opacity-20"></div>
              )}

              {/* Scanlines */}
              <div className="absolute inset-0 scanlines pointer-events-none"></div>

              {/* Boot content */}
              {bootState.stage !== 'power-on' && (
                <div className="p-8 font-mono text-green-400 text-sm leading-relaxed">
                  {displayedLines.map((line, index) => (
                    <div 
                      key={index} 
                      className="boot-text mb-1"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        color: line.includes('████') ? '#00ff41' : 
                               line.includes('OK') ? '#00ff41' :
                               line.includes('Ready') ? '#ffff00' :
                               line.includes('Welcome') ? '#00ffff' : '#00ff41'
                      }}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                  
                  {/* Cursor */}
                  {bootState.stage === 'loading' && (
                    <span className={`cursor-blink ${bootState.showCursor ? 'opacity-100' : 'opacity-0'}`}>
                      █
                    </span>
                  )}
                </div>
              )}

              {/* Screen glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          {/* Monitor controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
            <div className="w-8 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Power button glow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
        </div>
      </div>

      {/* Ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/20 via-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default BootScreen;