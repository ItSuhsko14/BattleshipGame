import GameOverModal from '@/components/widgets/game-over-modal';
import { useAppContext } from '@/context/app-context';
import { Mode } from '@/types';
import { useState } from 'react';
import GameView from './views/game-view';
import MenuView from './views/menu-view';
import SetupView from './views/setup-view';
import ShipDndProvider from './components/providers/ship-dnd-provider';

function App() {
  const [mode, setMode] = useState<Mode>(Mode.null);
  const { generateRandomComputerField,resetGame } = useAppContext();

  const handleEndGame = () => {
    resetGame()
    setMode(Mode.null)
  };

  return (
    <main className="flex justify-center flex-col items-center w-full max-w-7xl mx-auto min-h-screen">
      {mode === Mode.null && (
        <MenuView
          onStartSetup={() => {
            setMode(Mode.setting);
          }}
        />
      )}

      {mode === Mode.setting && (
        <ShipDndProvider>
          <SetupView
            onStartGame={() => {
              generateRandomComputerField();
              setMode(Mode.play);
            }}
          />
        </ShipDndProvider>
      )}

      {mode === Mode.play && <GameView onEndGame={handleEndGame} />}

      <GameOverModal onClose={handleEndGame} />
    </main>
  );
}

export default App;
