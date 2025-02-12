import { useAppContext } from '@/context/app-context';
import { cn } from '@/lib';
import { CellState, type Cell } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { FC } from 'react';

interface CellProps {
  cell: Cell;
  disabled?: boolean;
  i: number;
  j: number;
  isValid?: boolean;
  isPreview?: boolean;
  isHidden: boolean;
  onCellClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Cell: FC<CellProps> = ({
  cell,
  disabled,
  i,
  j,
  isValid,
  isPreview,
  isHidden,
  onCellClick,
}) => {
  const { deleteShip } = useAppContext();

  const { setNodeRef } = useDroppable({
    id: `field-droppable-${i}-${j}`,
    disabled,
    data: { row: i, col: j },
  });

  return (
    <button
      ref={setNodeRef}
      onDoubleClick={() => deleteShip(i, j)}
      className={cn(
        'relative border border-blue-900 transition-all duration-500 ease-in-out hover:transform disabled:cursor-not-allowed',
        {
          // occupied
          'bg-blue-900': cell.state === CellState.occupied,
          // dot mark
          "bg-yellow-300 after:content-[''] after:absolute after:w-[2px] after:h-[2px] after:bg-black after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2":
            cell.state === CellState.missed,
          // x mark
          "bg-red-500 before:content-[''] before:absolute before:w-full before:h-[0.1px] before:bg-[rgb(97,97,97)] before:top-1/2 before:left-0 before:rotate-45 after:content-[''] after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(97,97,97)] after:top-1/2 after:right-0 after:-rotate-45":
            cell.state === CellState.hit,
          'bg-white':
            !isPreview &&
            (cell.state === CellState.empty ||
              (isHidden && cell.state === CellState.occupied)),
        },
        // dnd
        {
          'bg-blue-500': isPreview && isValid,
          'bg-red-500': isPreview && !isValid,
        }
      )}
      data-row-index={i}
      data-column-index={j}
      onClick={onCellClick}
      disabled={disabled}
    />
  );
};

export default Cell;
