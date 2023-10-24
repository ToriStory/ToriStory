import { LucidePlusCircle } from 'lucide-react';

export interface AddButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  size?: number;
  className?: string;
}

export const AddButton = ({ onClick, color, size, ...etc }: AddButtonProps) => {
  return (
    <button onClick={onClick} {...etc}>
      <LucidePlusCircle color={color ? color : '#BB490D'} size={size ? size : 24} />
    </button>
  );
};
