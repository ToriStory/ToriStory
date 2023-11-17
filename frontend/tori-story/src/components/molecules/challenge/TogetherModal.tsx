import ChoiceModal from '../modals/ChoiceModal';
import { cls } from 'utils/cls';
import { CustomChallengeProps } from 'types/challenge';
import { useNavigate } from 'react-router-dom';
import { createChallengePage } from 'constants/pathname';

interface TogetherModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  customChallenge: CustomChallengeProps | undefined;
}

export const TogetherModal = ({ openModal, setOpenModal, customChallenge }: TogetherModalProps) => {
  const navigate = useNavigate();

  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  //모달 열린 후 페이지 이동하는 부분
  const handleJoinButton = () => {
    const content = customChallenge?.content;
    navigate(createChallengePage.path, {
      state: {
        content: content,
        id: customChallenge?.id,
      },
    });
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'참여하기'}
          okayButtonAction={() => handleJoinButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('my-4 text-center')}>
            <div className={cls('font-bold text-lg text-gray-800')}>
              도전명: {customChallenge?.content}
            </div>
            <div>함께 도전하시겠습니까?</div>
          </div>
        </ChoiceModal>
      )}
    </>
  );
};
