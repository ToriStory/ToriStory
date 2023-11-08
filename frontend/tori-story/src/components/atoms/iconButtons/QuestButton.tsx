import { ScrollText } from 'lucide-react';
import { cls } from 'utils/cls';

export const QuestButton = () => {
  return (
    <div>
      <button className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit mb-4')}>
        <ScrollText size={30} />
      </button>
    </div>
  );
};
