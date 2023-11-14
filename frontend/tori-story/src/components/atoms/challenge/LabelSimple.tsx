import { cls } from 'utils/cls';

interface LabelProps {
  title: string;
}

const LabelSimple = ({ title, ...etc }: LabelProps) => {
  return (
    <div
      className={cls(
        'flex justify-center items-center underline decoration-orange-400/60 font-bold text-2xl text-orange-900  p-2 rounded-xl'
      )}
      {...etc}
    >
      {title}
    </div>
  );
};

export default LabelSimple;
