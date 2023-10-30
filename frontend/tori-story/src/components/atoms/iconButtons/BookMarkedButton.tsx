import { BookMarked } from 'lucide-react';
import { cls } from 'utils/cls';

export const BookMarkedButton = () => {
  return (
    <div>
      <button className={cls('rounded-lg p-1 text-orange-50 bg-orange-300 w-fit')}>
        <BookMarked size={30} />
      </button>
    </div>
  );
};
