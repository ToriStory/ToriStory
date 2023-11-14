import { orange50 } from 'constants/color';
import { Pen } from 'lucide-react';
import { cls } from 'utils/cls';

export interface AddButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  color?: string;
  size?: number;
  className?: string;
}

export const AddButton = ({ onClick, title, color, size, ...etc }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        'flex items-center px-3 py-1 gap- rounded-full border-2 border-orange-100 bg-orange-500 text-white'
      )}
      {...etc}
    >
      <Pen
        color={color ? color : orange50}
        size={size ? size : 16}
        strokeWidth={2}
        className={cls('mr-2')}
      />
      <span>{title}</span>
    </button>
  );
};
