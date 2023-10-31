import { cls } from 'utils/cls';
import ChoiceModal from './ChoiceModal';
import useAppNavigation from 'hooks/useAppNavigation';

interface LoginModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ openModal, setOpenModal }: LoginModalProps) => {
  const navigate = useAppNavigation();
  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleMoveToLoginButton = () => {
    setOpenModal(false);
    navigate.navigateToSignin();
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'로그인하기'}
          okayButtonAction={() => handleMoveToLoginButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('p-4 text-center')}>
            <div>로그인해야 사용하실 수 있는 서비스입니다.</div>
            <div>
              <b>로그인 하시겠습니까?</b>
            </div>
          </div>
        </ChoiceModal>
      )}
    </>
  );
};
