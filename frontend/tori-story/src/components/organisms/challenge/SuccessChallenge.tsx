import { cls } from 'utils/cls';

const SuccessChallenge = ({ title }: { title: string }) => {
  return (
    <div
      className={cls(
        'flex justify-center items-center p-4 bg-white opacity-80 border-2 border-orange-400 rounded-xl text-xl'
      )}
    >
      {title}
    </div>
  );
};

export default SuccessChallenge;
