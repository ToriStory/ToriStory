import { getQuestApi, getTotalReward } from 'apis/challengeApi';
import { ToriQuestItem } from 'components/atoms/quest/ToriQuestItem';
import { BadgeCheck, X } from 'lucide-react';
import useSWR from 'swr';
import { RewardProps } from 'types/challenge';
import { cls } from 'utils/cls';
import TotoriTicket from 'assets/images/TotoriTicket.svg';
import { useSetAtom } from 'jotai';
import { totoriCntAtom } from 'stores/dotoriStore';
import { useEffect, useState } from 'react';

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}
export const QuestModal = ({ setIsModalOpen }: ModalProps) => {
  const { data } = useSWR('/api/challenge/quest', () => getQuestApi());
  const setTotoriCnt = useSetAtom(totoriCntAtom);
  const [rewardFlag, setRewardFlag] = useState<boolean | undefined>(
    data?.data.totalQuest.rewardFlag || false
  );

  const handleCloseModal = async () => {
    setIsModalOpen(false);
  };

  const handleClickAllQuestComplete = async () => {
    if (data?.data.totalQuest.compFlag && !data?.data.totalQuest.rewardFlag) {
      const res = await getTotalReward();

      if (res.status === 200) {
        setRewardFlag(true);
        setTotoriCnt((prev) => prev + 1);
      }
    }
  };
  console.log(data?.data.totalQuest.rewardFlag);
  useEffect(() => {
    setRewardFlag(data?.data.totalQuest.rewardFlag);
  }, [data?.data.totalQuest.rewardFlag]);

  return (
    <div className={cls('rounded-lg relative')}>
      <div className={cls('absolute top-1 right-1')} onClick={() => handleCloseModal()}>
        <X fontSize={30} strokeWidth={6} className={cls('text-orange-700 font-bold')} />
      </div>
      <div className={cls('w-1/3 mx-auto my-3')}>
        <h2
          className={cls(
            'text-center underline decoration-orange-400/60 font-bold text-2xl text-orange-900 p-1 rounded-xl -mt-5 bg-white bg-opacity-80 animate__animated animate__bounceIn'
          )}
        >
          퀘스트
        </h2>
      </div>
      {data?.data.questList &&
        data.data.questList.map((questItem: RewardProps) => (
          <div key={questItem.questNo}>
            <ToriQuestItem questItem={questItem} />
          </div>
        ))}
      <div
        className={cls(
          `absolute left-1/2 transform -translate-y-3 -translate-x-1/2 w-fill py-1 px-8 mt-2 rounded-lg  font-medium text-sm text-center  ${
            data?.data.totalQuest.compFlag
              ? rewardFlag
                ? 'text-orange-400 bg-white border-solid border-2 border-gray-300'
                : 'bg-orange-400 text-gray-50'
              : 'bg-orange-100 text-gray-600'
          }`
        )}
        onClick={() => handleClickAllQuestComplete()}
      >
        {rewardFlag ? (
          <div className={cls('py-2.5 px-3.5 animate__bounceIn')}>
            <BadgeCheck />
          </div>
        ) : (
          <>
            <div>모두 달성 시</div>
            <div className={cls('animate__bounceIn')}>
              <img src={TotoriTicket} alt='토토리 티켓' className={cls('mx-auto block')} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
