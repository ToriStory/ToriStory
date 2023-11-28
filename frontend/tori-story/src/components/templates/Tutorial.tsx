import TutorialSquirrel from 'assets/images/TutorialSquirrel.png';
import SpeechBubble from 'assets/images/SpeechBubble.png';
import { cls } from 'utils/cls';
import { useState } from 'react';
import { StartTutorial } from 'components/atoms/tutorial/StartTutorial';
import { AssetTutorial } from 'components/atoms/tutorial/AssetTutorial';
import { ButtonTutorial } from 'components/atoms/tutorial/ButtonTutorial';
import { FoxTutorial } from 'components/atoms/tutorial/FoxTutorial';
import { EndTutorial } from 'components/atoms/tutorial/EndTutorial';
import { X } from 'lucide-react';

export const Tutorial = ({ onClose }: { onClose: () => void }) => {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const handelNextClick = () => {
    if (currentTutorial < 4) {
      setCurrentTutorial(currentTutorial + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentTutorial > 0) {
      setCurrentTutorial(currentTutorial - 1);
    }
  };

  return (
    <div className='z-30 bg-black bg-opacity-30 fixed h-full w-full top-0 left-0'>
      <X className='absolute top-16 right-1 z-10' onClick={onClose} />
      {currentTutorial === 1 && (
        <div className='absolute top-[3.9rem] left-2 w-28 h-[7.5rem] border-solid border-4'></div>
      )}
      {currentTutorial === 2 && (
        <div className='absolute top-[3.9rem] right-2 w-14 h-[9.8rem] border-solid border-4'></div>
      )}
      <div className='relative flex w-full h-full justify-center'>
        <div className='absolute bottom-44'>
          <img src={SpeechBubble} alt='말풍선' className='w-80' />
          {currentTutorial < 4 && (
            <button
              onClick={handelNextClick}
              className='absolute p-2 flex z-10 bottom-8 right-2 transform -translate-x-1/2'
            >
              다음
            </button>
          )}
          {currentTutorial > 0 && (
            <button
              onClick={handlePrevClick}
              className='absolute p-2 flex z-10 bottom-8 left-9 transform -translate-x-1/2'
            >
              이전
            </button>
          )}
        </div>
        {currentTutorial === 0 && <StartTutorial />}
        {currentTutorial === 1 && <AssetTutorial />}
        {currentTutorial === 2 && <ButtonTutorial />}
        {currentTutorial === 3 && <FoxTutorial />}
        {currentTutorial === 4 && <EndTutorial />}
      </div>
      <div className={cls('h-full w-full')}>
        <div className={cls('absolute w-full bottom-[3rem] flex items-end justify-center px-4')}>
          {currentTutorial === 3 ? (
            <div
              className={cls('relative  border-solid border-4 bottom-[0.7rem] w-32 pb-3 h-20')}
            />
          ) : (
            <div className={cls('relative bottom-[0.7rem] w-32 pb-3 h-20')} />
          )}
          <img src={TutorialSquirrel} alt='다람쥐' className='ml-[calc(20%-2rem)] h-32' />
        </div>
      </div>
    </div>
  );
};
