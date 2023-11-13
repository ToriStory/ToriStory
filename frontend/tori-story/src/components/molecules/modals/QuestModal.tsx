import { getQuestApi } from 'apis/challengeApi';
import { ToriQuestItem } from 'components/atoms/quest/ToriQuestItem';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RewardProps } from 'types/challenge';
import { cls } from 'utils/cls';

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}
export const QuestModal = ({ setIsModalOpen }: ModalProps) => {
  const [questList, setQuestList] = useState<RewardProps[]>([]);

  const handleGetQuestList = async () => {
    const result = await getQuestApi();
    if (result.data.code === 200) {
      setQuestList(result.data.data);
    }
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleGetQuestList();
  }, []);

  return (
    <div className={cls('rounded-lg relative')}>
      <div className={cls('absolute top-1 right-1')} onClick={() => handleCloseModal()}>
        <X className={cls('text-orange-700 font-bold')} />
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
      {questList &&
        questList.map((questItem) => (
          <div key={questItem.questNo}>
            <ToriQuestItem questItem={questItem} />
          </div>
        ))}
    </div>
  );
};
