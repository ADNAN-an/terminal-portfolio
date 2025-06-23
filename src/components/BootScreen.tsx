import React from 'react';
import { useBootAnimation } from '../hooks/useBootAnimation';

const BootScreen: React.FC = () => {
  const { bootState, displayedLines, isTransitioning } = useBootAnimation();

  if (!bootState.isBooting && !isTransitioning) return null;

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
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 ${
      isTransitioning ? 'terminal-transition' : ''
    }`}>
      {/* CRT Monitor Frame */}
      <div className={`relative transition-all duration-1000 ${
        isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Monitor Bezel */}
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl">
          <div className="bg-gray-900 p-4 rounded-2xl">
            {/* Screen */}
            <div 
              className={`
                w-[800px] h-[600px] bg-black rounded-lg relative overflow-hidden
                border-2 border-gray-700 ${getStageClasses()}
                ${isTransitioning ? 'terminal-opening' : ''}
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
                <div className={`p-8 font-mono text-green-400 text-sm leading-relaxed transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                  {displayedLines.map((line, index) => (
                    <div 
                      key={index} 
                      className="boot-text mb-1"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        color: line.includes('████') ? '#00ff41' : 
                               line.includes('OK') ? '#00ff41' :
                               line.includes('Ready') ? '#ffff00' :
                               line.includes('Welcome') ? '#00ffff' :
                               line.includes('Starting') ? '#ff6b35' :
                               line.includes('Loading user') ? '#ff6b35' : '#00ff41'
                      }}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                  
                  {/* Cursor */}
                  {bootState.stage === 'loading' && !isTransitioning && (
                    <span className={`cursor-blink ${bootState.showCursor ? 'opacity-100' : 'opacity-0'}`}>
                      █
                    </span>
                  )}
                </div>
              )}

              {/* Terminal opening effect overlay */}
              {isTransitioning && (
                <div className="absolute inset-0 terminal-opening-overlay">
                  <div className="terminal-window-frame">
                    <div className="terminal-title-bar">
                      <div className="terminal-controls">
                        <div className="terminal-button terminal-close"></div>
                        <div className="terminal-button terminal-minimize"></div>
                        <div className="terminal-button terminal-maximize"></div>
                      </div>
                      <div className="terminal-title">Portfolio Terminal</div>
                    </div>
                    <div className="terminal-content-preview">
                      <div className="terminal-prompt-preview">
                        <span className="text-green-400">$</span>
                        <span className="terminal-cursor-preview">█</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          {/* Monitor controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300 ${
              isTransitioning ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'
            }`}></div>
            <div className="w-8 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Power button glow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
            isTransitioning ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-green-500 animate-pulse shadow-green-500/50'
          }`}></div>
        </div>
      </div>

      {/* Ambient lighting */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
        isTransitioning 
          ? 'bg-gradient-radial from-blue-900/30 via-transparent to-black' 
          : 'bg-gradient-radial from-green-900/20 via-transparent to-black'
      }`}></div>
    </div>
  );
};

export default BootScreen;