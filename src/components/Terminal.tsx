import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, User, ChevronRight } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import { useTheme } from '../hooks/useTheme';
import { portfolioData } from '../data/portfolio';
import ProgressBar from './ProgressBar';

const Terminal: React.FC = () => {
  const { 
    history, 
    currentInput, 
    setCurrentInput, 
    handleKeyDown, 
    isTyping, 
    isDownloading, 
    downloadProgress,
    glitchState
  } = useTerminal();
  const { themeColors } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isDownloading, downloadProgress]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatOutput = (output: string | JSX.Element) => {
    if (typeof output === 'string') {
      return output.split('\n').map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ));
    }
    return output;
  };

  // Build dynamic classes for glitch effects
  const getGlitchClasses = () => {
    const classes = [];
    if (glitchState.isGlitching) classes.push('glitch-active');
    if (glitchState.isFlickering) classes.push('flicker-active');
    if (glitchState.hasLineGlitch) classes.push('glitch-lines');
    return classes.join(' ');
  };

  const getTextGlitchClasses = () => {
    return glitchState.hasTextGlitch ? 'glitch-text' : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 font-mono">
      <div className={`max-w-4xl mx-auto h-screen max-h-[90vh] bg-black/90 backdrop-blur-sm rounded-lg border ${themeColors.border} shadow-2xl ${themeColors.glow} overflow-hidden ${getGlitchClasses()}`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <TerminalIcon className={`w-5 h-5 ${themeColors.primary}`} />
            <span className={`${themeColors.primary} font-semibold ${getTextGlitchClasses()}`}>portfolio@terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className={`h-full p-4 overflow-y-auto bg-black/95 cursor-text relative scanlines ${getGlitchClasses()}`}
          onClick={handleTerminalClick}
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 50%, rgba(0, 255, 65, 0.03) 50%),
              linear-gradient(rgba(0, 255, 65, 0.05) 50%, transparent 50%)
            `,
            backgroundSize: '100px 2px, 3px 100px'
          }}
        >
          {/* Scan lines effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${themeColors.primary.split('-')[1]}-500/5 to-transparent animate-pulse`}></div>
          </div>

          {/* Command History */}
          {history.map((command, index) => (
            <div key={index} className="mb-4">
              {command.command !== 'init' && (
                <div className={`flex items-center ${themeColors.primary} mb-2 ${getTextGlitchClasses()}`}>
                  <User className="w-4 h-4 mr-2" />
                  <span className={themeColors.secondary}>{portfolioData.name.toLowerCase().replace(' ', '')}@portfolio</span>
                  <span className="text-white mx-1">:</span>
                  <span className="text-blue-400">~</span>
                  <ChevronRight className={`w-4 h-4 mx-1 ${themeColors.primary}`} />
                  <span className="text-white">{command.command}</span>
                </div>
              )}
              <div className={`${themeColors.text} leading-relaxed pl-6 ${getTextGlitchClasses()}`}>
                {formatOutput(command.output)}
              </div>
            </div>
          ))}

          {/* Download Progress */}
          {isDownloading && (
            <div className="mb-4 pl-6">
              <ProgressBar progress={downloadProgress} label="Downloading resume" />
            </div>
          )}

          {/* Current Input Line */}
          <div className={`flex items-center ${themeColors.primary} ${getTextGlitchClasses()}`}>
            <User className="w-4 h-4 mr-2" />
            <span className={themeColors.secondary}>{portfolioData.name.toLowerCase().replace(' ', '')}@portfolio</span>
            <span className="text-white mx-1">:</span>
            <span className="text-blue-400">~</span>
            <ChevronRight className={`w-4 h-4 mx-1 ${themeColors.primary}`} />
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent text-white outline-none caret-${themeColors.primary.split('-')[1]}-400 ${getTextGlitchClasses()}`}
              autoComplete="off"
              spellCheck="false"
            />
            <span className={`${themeColors.primary} animate-pulse ml-1 ${getTextGlitchClasses()}`}>
              {isTyping ? '⏳' : '█'}
            </span>
          </div>

          {/* Hint text */}
          <div className={`mt-8 ${themeColors.textSecondary} text-sm ${getTextGlitchClasses()}`}>
            <p>💡 Tip: Use Tab for auto-completion, ↑↓ for command history</p>
            <p>🚀 Try commands: whoami, skills, projects, theme, help</p>
            <p>🎨 Change themes: theme blue | theme amber | theme purple | theme red</p>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${themeColors.primary.split('-')[1]}-500/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>
    </div>
  );
};

export default Terminal;