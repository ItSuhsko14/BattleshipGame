import { FC, ReactNode } from 'react';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  label?: ReactNode;
}

const Counter: FC<CounterProps> = ({ value, onChange, label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {label && <span className="text-xl font-bold">{label}</span>}

      <div className="flex items-center text-xl font-bold justify-center gap-5">
        <button
          className="w-10 bg-white rounded border-blue-500 border h-10"
          onClick={() => onChange(value - 1)}
        >
          -
        </button>
        <span className="w-10 text-center ">{value}</span>
        <button
          className="w-10 h-10 bg-white rounded border-blue-500 border"
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
