import { Orientation } from '@/types';
import { useEffect, useState } from 'react';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.horizontal
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setOrientation(prev =>
          prev === Orientation.horizontal
            ? Orientation.vertical
            : Orientation.horizontal
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleOrientation = () => {
    setOrientation(prev =>
      prev === Orientation.horizontal
        ? Orientation.vertical
        : Orientation.horizontal
    );
  };

  return { orientation, toggleOrientation };
};
