import Counter from '@/components/ui/counter';
import { FC, useMemo } from 'react';
import Ship from '../ship';
import { useAppContext } from '@/context/app-context';
import Button from '@/components/ui/button';
import { getShipCount } from '@/views/setup-view/helpers';
import { cn } from '@/lib/cn';
import { Orientation } from '@/types';
import { DragOverlay, useDndContext } from '@dnd-kit/core';

interface SetupSectionProps {
  orientation: Orientation;
  toggleOrientation: () => void;
}

const SetupSection: FC<SetupSectionProps> = ({
  orientation,
  toggleOrientation,
}) => {
  const { active } = useDndContext();

  const { fieldConfig, changeFieldSize, userField } = useAppContext();

  const shipCountMap = useMemo(() => getShipCount(userField), [userField]);

  return (
    <div className="flex flex-col gap-2 mb-auto justify-start items-start">
      {active && active.data.current && (
        <DragOverlay className="opacity-50">
          <Ship
            id={`ship`}
            size={active?.data.current?.size}
            orientation={active?.data.current?.orientation}
          />
        </DragOverlay>
      )}

      <Counter
        label="Розмір поля"
        value={fieldConfig.fieldSize}
        onChange={value => changeFieldSize(value)}
      />

      <div className="flex flex-col gap-4">
        <span>Кількість кораблів</span>
        <div
          className={cn('flex flex-col gap-2', {
            'flex-row': orientation === Orientation.vertical,
          })}
        >
          {[4, 3, 2, 1].map(size => {
            const availableShips =
              fieldConfig.ships[4 - size][1] - (shipCountMap.get(size) || 0);

            return (
              <div
                key={size}
                className={cn('flex items-center gap-2', {
                  'flex-col': orientation === Orientation.vertical,
                })}
              >
                <span>{availableShips}</span>

                <Ship
                  size={size}
                  draggable={availableShips > 0}
                  orientation={orientation}
                  id={`ship-${size}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Button onClick={toggleOrientation}>Змінити орієнтацію (Space)</Button>
    </div>
  );
};

export default SetupSection;
