import { FC } from 'react';
import { cn } from '@/lib';
import { useDraggable } from '@dnd-kit/core';
import { Orientation } from '@/types';

interface ShipProps {
  size: number;
  draggable?: boolean;
  orientation?: Orientation;
  id: string;
}

const Ship: FC<ShipProps> = ({
  size,
  draggable = false,
  orientation = Orientation.horizontal,
  id,
}) => {
  const { attributes, listeners, active, setNodeRef } = useDraggable({
    id,
    data: {
      size,
      orientation,
    },
    disabled: !draggable,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn('flex flex-nowrap', {
        'items-center': orientation === Orientation.horizontal,
        'flex-col': orientation === Orientation.vertical,
        'cursor-move': draggable,
        'opacity-50': active,
      })}
      {...attributes}
      {...listeners}
    >
      {Array.from({ length: size }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-blue-900 border border-blue-900 flex items-center justify-center',
            'portrait:h-[2.8vh] portrait:w-[2.8vh]',
            'landscape:h-[3vw] landscape:w-[3vw]',
            'desktop:h-[3vw] desktop:w-[3vw]'
          )}
        />
      ))}
    </div>
  );
};

export default Ship;
