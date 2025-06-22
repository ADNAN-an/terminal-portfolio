import React from 'react';
import Terminal from './components/Terminal';
import BootScreen from './components/BootScreen';
import { useBootAnimation } from './hooks/useBootAnimation';

function App() {
  const { isBootComplete } = useBootAnimation();

  return (
    <>
      <BootScreen />
      {isBootComplete && <Terminal />}
    </>
  );
}

export default App;