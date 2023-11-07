import { cls } from 'utils/cls';

const Label = ({ title }: { title: string }) => {
  return (
    <div>
      <h2
        className={cls(
          ' flex justify-center items-center underline decoration-orange-400/60 font-bold text-2xl text-orange-900  p-2 rounded-xl'
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default Label;
