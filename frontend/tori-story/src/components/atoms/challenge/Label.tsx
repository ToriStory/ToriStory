import { cls } from 'utils/cls';
import FlowerLabel from 'assets/images/FlowerLabel.png';

interface LabelProps {
  title: string;
  className?: string;
}

const Label = ({ title, className = cls('w-52') }: LabelProps) => {
  return (
    <div className={cls('relative flex justify-center items-center')}>
      <h2 className={cls('absolute mb-2 text-white text-lg z-20')}>{title}</h2>
      <img className={cls(className)} src={FlowerLabel} alt={title} />
    </div>
  );
};

export default Label;
