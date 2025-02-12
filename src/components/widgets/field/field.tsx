import React, { FC } from 'react';
import { cn } from '@/lib';
import { type Field as TField, type Cell as TCell } from '@/types';
import { useAppContext } from '@/context/app-context';
import Cell from './cell';

interface FieldProps {
  field: TField;
  onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isHidden?: boolean;
  disabled?: boolean;
  getCellProps?: (cell: TCell) => {
    isDisabled: boolean;
    isPreview: boolean;
    isValid: boolean;
  };
}

const Field: FC<FieldProps> = ({
  field,
  onCellClick,
  isHidden = false,
  disabled = false,
  getCellProps,
}) => {
  const {
    fieldConfig: { fieldSize },
  } = useAppContext();

  if (!field || field.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center relative',
        'portrait:h-[28vh] portrait:w-[28vh] portrait:mb-[15vh]',
        'landscape:h-[30vw] landscape:w-[30vw]',
        'desktop:h-[30vw] desktop:w-[30vw] desktop:m-[15vw]'
      )}
    >
      {field.map((row, i) => (
        <div
          key={i}
          style={{
            gridTemplateColumns: `repeat(${field.length}, 1fr)`,
          }}
          className={cn(
            'grid gap-0 w-full h-[10%] border-0',
            `portrait:h-[${fieldSize}%] portrait:w-[${fieldSize}%]`,
            `landscape:h-[${fieldSize}%] landscape:w-[${fieldSize}%]`
          )}
        >
          {row.map((cell, j) => {
            const props = getCellProps?.(cell) || {};

            return (
              <Cell
                key={`${i}-${j}`}
                cell={cell}
                disabled={disabled}
                i={i}
                j={j}
                onCellClick={onCellClick}
                isHidden={isHidden}
                {...props}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Field;
