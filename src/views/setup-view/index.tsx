import Button from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { getIsFieldConfigured } from '@/views/setup-view/helpers';
import { FC, useMemo } from 'react';
import SetupSection from '@/components/widgets/setup-section/setup-section';
import Field from '@/components/widgets/field';
import { useDragShip } from '@/components/widgets/field/hooks/use-drag-ship';
import { useOrientation } from '@/components/widgets/setup-section/hooks/use-orientation';

interface SetupViewProps {
  onStartGame: () => void;
}

const SetupView: FC<SetupViewProps> = ({ onStartGame }) => {
  const { userField, generateRandomPlayerField, fieldConfig, clearUserField } =
    useAppContext();
  const { orientation, toggleOrientation } = useOrientation();
  const { getCellProps } = useDragShip(userField, orientation);

  const isPlayerFieldReady = useMemo(
    () => getIsFieldConfigured(userField, fieldConfig.ships),
    [fieldConfig.ships, userField]
  );

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <h1 className="text-4xl font-bold text-blue-900">Налаштування</h1>
      <span className="text-xs text-center max-w-md mt-1 mb-4 text-gray-500">
        Перетягніть кораблі на поле або натисніть "Розставити" для випадкового
        розміщення. Натисніть пробіл для зміни орієнтації корабля. Натисніть
        "Погнали" для початку гри
      </span>

      <div className="flex w-full flex-col md:flex-row max-w-5xl gap-5 justify-center items-center">
        <SetupSection
          orientation={orientation}
          toggleOrientation={toggleOrientation}
        />
        <Field field={userField} getCellProps={getCellProps} />
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={clearUserField}>Очистити</Button>
        <Button onClick={generateRandomPlayerField}>Розставити</Button>
        <Button onClick={onStartGame} disabled={!isPlayerFieldReady}>
          Погнали
        </Button>
      </div>
    </div>
  );
};

export default SetupView;
