import { cls } from 'utils/cls';

interface BottomButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const BottomButton = ({ title, onClick, className }: BottomButtonProps) => {
  return (
    <div className={cls('p-1 px-4 bg-orange-400 rounded-lg text-white')} onClick={onClick}>
      <div className={className ? className : ''}></div>
      {title}
    </div>
  );
};

export default BottomButton;
