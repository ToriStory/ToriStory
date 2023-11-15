import { getQuestApi } from 'apis/challengeApi';
import { ToriQuestItem } from 'components/atoms/quest/ToriQuestItem';
import { X } from 'lucide-react';
import useSWR from 'swr';
import { RewardProps } from 'types/challenge';
import { cls } from 'utils/cls';

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}
export const QuestModal = ({ setIsModalOpen }: ModalProps) => {
  const { data } = useSWR('/api/challenge/quest', () => getQuestApi());

  const handleCloseModal = async () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cls('rounded-lg relative')}>
      <div className={cls('absolute top-1 right-1')} onClick={() => handleCloseModal()}>
        <X fontSize={30} strokeWidth={6} className={cls('text-orange-700 font-bold')} />
      </div>
      {/* <div
        className={cls('absolute w-fit py-1 px-3 mt-2 rounded-lg bg-orange-200 font-jua text-sm')}
      >
        {data.data.questCompCnt}/5
      </div> */}
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
    </div>
  );
};
