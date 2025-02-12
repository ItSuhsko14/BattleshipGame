import MUIButton from '@mui/material/Button';
import { FC, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
