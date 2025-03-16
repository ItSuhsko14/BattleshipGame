import Button from '@/components/ui/button';
import Field from '@/components/widgets/field';
import { useAppContext } from '@/context/app-context/use-app-context';
import { FC } from 'react';

interface GameViewProps {
  onEndGame: () => void;
}

const GameView: FC<GameViewProps> = ({ onEndGame }) => {
  const { currentPlayer, userField, computerField, onComputerFieldClick } =
    useAppContext();

  return (
    <div className="flex flex-col text-center items-center justify-center">
      <span className="text-3xl">
        {currentPlayer === 'user' ? 'Ваш хід' : "Ходить Комп'ютер"}
      </span>

      <div className="flex justify-around items-center m-auto w-full h-auto text-blue-900 md:landscape:flex-row md:landscape:w-[70vw] md:portrait:flex-col md:portrait:h-[70vh]">
        <div>
          <h2 className="m-0 text-[3vh]">Ваше поле</h2>
          <Field field={userField} isHidden={false} disabled />
        </div>
        <div>
          <h2 className="m-0 text-[3vh]">Комп'ютер</h2>
          <Field
            field={computerField}
            onCellClick={onComputerFieldClick}
            isHidden
            disabled={currentPlayer === 'computer'}
          />
        </div>
      </div>

      <div className="mt-4 w-fit">
        <Button onClick={onEndGame}>Завершити гру</Button>
      </div>
    </div>
  );
};

export default GameView;
