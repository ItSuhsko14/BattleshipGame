import Button from '@/components/ui/button';
import { FC } from 'react';

interface MenuViewProps {
  onStartSetup: () => void;
}

const MenuView: FC<MenuViewProps> = ({ onStartSetup }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center font-bold text-blue-900">
        Лютий бій
      </h1>
      <span className="text-xs max-w-md mt-1 mb-4 text-gray-500">
        Вітаю у грі Лютий бій! Гра розроблена як технічне завдання спеціально
        для ютуб канала Сергія Бабіча. Для початку гри натисніть "Почати гру" та
        отримуйте задоволення!
      </span>

      <Button onClick={onStartSetup}>Почати нову гру</Button>
    </div>
  );
};

export default MenuView;
