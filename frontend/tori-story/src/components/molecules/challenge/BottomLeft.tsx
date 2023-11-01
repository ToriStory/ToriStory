import { cls } from 'utils/cls';

interface BottomProps {
  icon: React.ReactElement;
  content: string;
}

const BottomLeft = ({ icon, content }: BottomProps) => {
  return (
    <div className={cls('flex items-center text-orange-700')}>
      <div className='mr-2'>{icon}</div>
      <div>{content}</div>
    </div>
  );
};

export default BottomLeft;
