import { ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import { isQuestExistenceAtom } from 'stores/questStore';
import { isReceivedReward } from 'apis/challengeApi';
import { useAtom } from 'jotai';
import Modal from '../modals/Modal';
import { QuestModal } from 'components/molecules/modals/QuestModal';
import { LoginModal } from 'components/molecules/modals/LoginModal';

export const QuestButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestExistence, setIsQuestExistence] = useAtom(isQuestExistenceAtom);
  const accessToken = localStorage.getItem('accessToken');

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIsQuestExistence = async () => {
    if (accessToken) {
      const res = await isReceivedReward();
      if (res.status === 200) {
        setIsQuestExistence(res.data.data.unclaimedRewards);
      }
    }
  };

  useEffect(() => {
    handleIsQuestExistence();
  });

  return (
    <>
      <div onClick={handleModalOpen} className={cls('relative')}>
        {isQuestExistence && (
          <>
            <div
              className={cls(
                'rounded-full w-3 h-3 absolute bg-red-400 z-10 -top-1 -right-1 animate-ping'
              )}
            />
            <span className='absolute z-10 -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-red-400'></span>
          </>
        )}
        <button className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit')}>
          <ScrollText size={30} />
        </button>
      </div>
      {isModalOpen &&
        (accessToken ? (
          <Modal setIsModalOpen={setIsModalOpen}>
            <QuestModal setIsModalOpen={setIsModalOpen} />
          </Modal>
        ) : (
          <LoginModal openModal={isModalOpen} setOpenModal={setIsModalOpen} />
        ))}
    </>
  );
};
