import React from 'react';
import { useBootAnimation } from '../hooks/useBootAnimation';

const BootScreen: React.FC = () => {
  const { bootState, displayedLines } = useBootAnimation();

  if (!bootState.isBooting && bootState.stage === 'complete') return null;

  const getStageClasses = () => {
    switch (bootState.stage) {
      case 'power-on':
        return 'crt-boot';
      case 'system-check':
        return 'crt-flicker';
      case 'loading':
        return 'screen-glow';
      case 'transition':
        return 'terminal-transition';
      default:
        return '';
    }
  };

  const isTransitioning = bootState.stage === 'transition';

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 ${
      isTransitioning ? 'transform scale-110 opacity-90' : ''
    }`}>
      {/* CRT Monitor Frame */}
      <div className={`relative transition-all duration-1500 ${
        isTransitioning ? 'transform scale-95 rotate-1' : ''
      }`}>
        {/* Monitor Bezel */}
        <div className={`bg-gray-800 p-8 rounded-3xl shadow-2xl transition-all duration-1000 ${
          isTransitioning ? 'bg-gray-900 shadow-4xl' : ''
        }`}>
          <div className={`bg-gray-900 p-4 rounded-2xl transition-all duration-1000 ${
            isTransitioning ? 'bg-black' : ''
          }`}>
            {/* Screen */}
            <div 
              className={`
                w-[800px] h-[600px] bg-black rounded-lg relative overflow-hidden
                border-2 border-gray-700 transition-all duration-1500 ${getStageClasses()}
                ${isTransitioning ? 'border-green-500/50 shadow-lg shadow-green-500/20' : ''}
              `}
            >
              {/* Static noise overlay for power-on */}
              {bootState.stage === 'power-on' && (
                <div className="absolute inset-0 static-bg opacity-20"></div>
              )}

              {/* Transition overlay */}
              {isTransitioning && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
              )}

              {/* Scanlines */}
              <div className={`absolute inset-0 scanlines pointer-events-none transition-opacity duration-1000 ${
                isTransitioning ? 'opacity-75' : ''
              }`}></div>

              {/* Boot content */}
              {bootState.stage !== 'power-on' && (
                <div className={`p-8 font-mono text-green-400 text-sm leading-relaxed transition-all duration-1000 ${
                  isTransitioning ? 'transform translate-y-2 opacity-80' : ''
                }`}>
                  {displayedLines.map((line, index) => (
                    <div 
                      key={index} 
                      className={`boot-text mb-1 transition-all duration-500 ${
                        isTransitioning ? 'text-green-300' : ''
                      }`}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        color: line.includes('████') ? '#00ff41' : 
                               line.includes('OK') ? '#00ff41' :
                               line.includes('Ready') ? '#ffff00' :
                               line.includes('Welcome') ? '#00ffff' :
                               line.includes('Terminal ready') ? '#00ff88' : '#00ff41'
                      }}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                  
                  {/* Cursor */}
                  {(bootState.stage === 'loading' || bootState.stage === 'transition') && (
                    <span className={`cursor-blink transition-all duration-500 ${
                      bootState.showCursor ? 'opacity-100' : 'opacity-0'
                    } ${isTransitioning ? 'text-green-300' : ''}`}>
                      █
                    </span>
                  )}

                  {/* Transition message */}
                  {isTransitioning && (
                    <div className="mt-4 text-center text-green-300 animate-pulse">
                      <div className="text-lg">Initializing Terminal Interface...</div>
                      <div className="mt-2 text-sm opacity-75">Please wait while we prepare your workspace</div>
                    </div>
                  )}
                </div>
              )}

              {/* Screen glow effect */}
              <div className={`absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent pointer-events-none transition-all duration-1000 ${
                isTransitioning ? 'from-green-500/10' : ''
              }`}></div>

              {/* Terminal opening effect */}
              {isTransitioning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="terminal-opening-effect"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Monitor controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <div className={`w-3 h-3 bg-red-500 rounded-full shadow-lg transition-all duration-500 ${
              isTransitioning ? 'animate-pulse' : ''
            }`}></div>
            <div className={`w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse transition-all duration-500 ${
              isTransitioning ? 'bg-green-400 shadow-green-400/50' : ''
            }`}></div>
            <div className={`w-8 h-3 bg-gray-600 rounded-full transition-all duration-500 ${
              isTransitioning ? 'bg-gray-500' : ''
            }`}></div>
          </div>
        </div>

        {/* Power button glow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50 transition-all duration-500 ${
            isTransitioning ? 'bg-green-400 shadow-green-400/70' : ''
          }`}></div>
        </div>
      </div>

      {/* Ambient lighting */}
      <div className={`absolute inset-0 bg-gradient-radial from-green-900/20 via-transparent to-black pointer-events-none transition-all duration-1000 ${
        isTransitioning ? 'from-green-800/30' : ''
      }`}></div>

      {/* Transition particles */}
      {isTransitioning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      )}
    </div>
  );
};

export default BootScreen;