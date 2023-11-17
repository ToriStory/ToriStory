import { RewardProps } from 'types/challenge';
import { cls } from 'utils/cls';
import Dotori from 'assets/images/Dotori.png';
import { getReward, isReceivedReward } from 'apis/challengeApi';
import { dotoriCntAtom } from 'stores/dotoriStore';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { isQuestExistenceAtom } from 'stores/questStore';
import { BadgeCheck } from 'lucide-react';

export const ToriQuestItem = ({ questItem }: { questItem: RewardProps }) => {
  const setDotoriCnt = useSetAtom(dotoriCntAtom);
  const [isCompleted, setIsCompleted] = useState(questItem.rewardFlag);
  const setIsQuestExistence = useSetAtom(isQuestExistenceAtom);

  const handleComplete = async () => {
    if (questItem.compFlag && !questItem.rewardFlag) {
      const result = await getReward(questItem.questNo);
      if (result.status === 200) {
        setDotoriCnt((prev) => prev + 2);
        setIsCompleted(true);
        const result = await isReceivedReward();
        if (result.status === 200) {
          setIsQuestExistence(result.data.data.unclaimedRewards);
        }
      }
    }
  };

  return (
    <div className={cls('rounded-lg my-2 border-2 relative')}>
      <div className={cls('px-4 py-2')}>{questItem.questTitle}</div>
      <div
        className={cls(
          `absolute flex inset-y-0 right-0 p-2 rounded-r-md questItem.rewardFlag w-16 justify-center items-center  ${
            questItem.compFlag
              ? questItem.rewardFlag
                ? 'border-l-2 border-orange-50 text-orange-300'
                : 'bg-orange-400 text-white'
              : 'bg-orange-50 text-gray-500'
          }`
        )}
        onClick={() => handleComplete()}
      >
        {isCompleted ? (
          <BadgeCheck />
        ) : questItem.compFlag || questItem.compCnt === -1 ? (
          <div className={cls('flex items-center justify-center text-center')}>
            <img
              src={Dotori}
              alt='dotorio'
              width={24}
              className={cls(
                `object-cover animate__animated animate__swing ${
                  !questItem.compFlag && 'grayscale-[40%]'
                }`
              )}
            />
            <span>x 2</span>
          </div>
        ) : (
          <div className={cls('flex items-center')}>{questItem.compCnt} / 3</div>
        )}
      </div>
    </div>
  );
};
