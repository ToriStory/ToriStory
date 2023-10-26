import { orange400 } from 'constants/color';
import { LucidePlusSquare } from 'lucide-react';

export interface AddSquareButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const AddSquareButton = ({
  onClick,
  color,
  size,
  strokeWidth,
  className,
  ...etc
}: AddSquareButton) => {
  return (
    <button onClick={onClick} className={className ? className : ''} {...etc}>
      <LucidePlusSquare
        strokeWidth={strokeWidth ? strokeWidth : 2}
        color={color ? color : orange400}
        size={size ? size : 24}
      />
    </button>
  );
};
