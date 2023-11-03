import { cls } from 'utils/cls';
import ChoiceModal from './ChoiceModal';
import { withdrawalAPI } from 'apis/user';
import { toast } from 'react-toastify';
import { updateToast } from 'utils/toast';
import useAppNavigation from 'hooks/useAppNavigation';

interface WithdrawalModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WithdrawalModal = ({ openModal, setOpenModal }: WithdrawalModalProps) => {
  const navigate = useAppNavigation();

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleWithdrawalButton = async () => {
    setOpenModal(false);
    const res = await withdrawalAPI();
    const withdrawalToastId = toast.loading('탈퇴 처리 중입니다');
    if (res.status === 200) {
      localStorage.removeItem('accessToken');
      updateToast(withdrawalToastId, '탈퇴가 완료되었습니다!', 'success', false, () =>
        navigate.navigateToSignup()
      );
    } else {
      updateToast(withdrawalToastId, `탈퇴에 실패했습니다`, 'error', false);
    }
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'탈퇴하기'}
          okayButtonAction={() => handleWithdrawalButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('py-8 text-center')}>정말로 탈퇴하시겠습니까?</div>
        </ChoiceModal>
      )}
    </>
  );
};
