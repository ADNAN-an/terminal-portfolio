import React from 'react';
import Terminal from './components/Terminal';
import BootScreen from './components/BootScreen';
import { useBootAnimation } from './hooks/useBootAnimation';

function App() {
  const { isBootComplete } = useBootAnimation();

  return (
    <div className="relative min-h-screen bg-black">
      <BootScreen />
      {isBootComplete && (
        <div className="terminal-entrance">
          <Terminal />
        </div>
      )}
    </div>
  );
}

export default App;