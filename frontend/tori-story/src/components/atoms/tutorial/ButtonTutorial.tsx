import { cls } from 'utils/cls';
import { BookMarked, Gift, ScrollText } from 'lucide-react';

export const ButtonTutorial = () => {
  return (
    <div className='absolute bottom-60'>
      오른쪽 상단에 있는 버튼에 대해 설명해줄게~
      <div className='flex'>
        <div className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit mr-1')}>
          <ScrollText size={15} />
        </div>
        <p>퀘스트: 퀘스트를 통해 도토리를 얻을 수 있어!</p>
      </div>
      <div className='flex'>
        <div className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit mr-1')}>
          <BookMarked size={15} />
        </div>
        <p>토리도감: 토리를 입양할 수 있어!</p>
      </div>
      <div className='flex'>
        <div className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit mr-1')}>
          <Gift size={15} />
        </div>
        <p>토토리: 도토리, 다양한 티켓, 토리를 얻을 수 있어!</p>
      </div>
    </div>
  );
};
