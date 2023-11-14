import { cls } from 'utils/cls';

interface BottomProps {
  icon?: React.ReactElement;
  content?: string | number;
}

const BottomLeft = ({ icon, content }: BottomProps) => {
  return (
    <div className={cls('flex items-center text-orange-700 text-lg gap-2')}>
      {icon && <div>{icon}</div>}
      <div>{content}</div>
    </div>
  );
};

export default BottomLeft;
