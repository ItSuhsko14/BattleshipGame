import { Cell, CellState, Field, Orientation } from '@/types';
import { useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { canPlaceShip } from '@/components/providers/helpers/field-helpers';

interface DragData {
  size: number;
}

export const useDragShip = (field: Field, orientation: Orientation) => {
  const [previewPosition, setPreviewPosition] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [dragData, setDragData] = useState<DragData | null>(null);
  const [active, setActive] = useState(false);

  useDndMonitor({
    onDragStart(event) {
      setActive(true);
      setDragData(event.active.data.current as DragData);
    },
    onDragMove(event) {
      if (!event.active.data.current) return;

      const droppableId = event.over?.id.toString() || '';
      const match = droppableId.match(/field-droppable-(\d+)-(\d+)/);

      if (match) {
        const [, row, col] = match;
        setPreviewPosition({ row: parseInt(row), col: parseInt(col) });
      }

      setDragData(event.active.data.current as DragData);
    },
    onDragEnd() {
      setActive(false);
      setPreviewPosition(null);
      setDragData(null);
    },
    onDragCancel() {
      setActive(false);
      setPreviewPosition(null);
      setDragData(null);
    },
  });

  const isPartOfPreview = (row: number, col: number): boolean => {
    if (!previewPosition || !dragData || !active) return false;

    const { size } = dragData;
    const { row: startRow, col: startCol } = previewPosition;

    if (orientation === Orientation.horizontal) {
      return row === startRow && col >= startCol && col < startCol + size;
    } else {
      return col === startCol && row >= startRow && row < startRow + size;
    }
  };

  const getCellProps = (cell: Cell) => {
    const isDisabled = [CellState.missed, CellState.hit].includes(cell.state);

    const isPreview = isPartOfPreview(cell.row, cell.col);
    const isValid =
      isPreview && dragData && previewPosition
        ? canPlaceShip(
            field,
            previewPosition.row,
            previewPosition.col,
            dragData.size,
            orientation
          )
        : true;

    return {
      isDisabled,
      isPreview,
      isValid,
    };
  };

  return {
    getCellProps,
  };
};
