import { DndContext } from '@dnd-kit/core';
import { useAppContext } from '@/context/app-context';
import { Orientation } from '@/types';
import { DragEndEvent } from '@dnd-kit/core';
import { FC, PropsWithChildren } from 'react';

const ShipDndProvider: FC<PropsWithChildren> = ({ children }) => {
  const { placeShip } = useAppContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over) {
      const { size, orientation } = active.data.current as {
        size: number;
        orientation: Orientation;
      };
      const { row, col } = over.data.current as { row: number; col: number };
      placeShip(row, col, size, orientation);
    }
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};

export default ShipDndProvider;
